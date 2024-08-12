import axios from 'axios';
import * as process from 'node:process';
import type { DailyDeviceSummary, DeviceSummary } from '@harvest-flow/utils';
import type { DeviceReportsResponse, DeviceSummaryResponse } from './types';

const GMS_CLOUD_CLIENT_ID = process.env.GMS_CLOUD_CLIENT_ID!;
const GMS_CLOUD_CLIENT_SECRET = process.env.GMS_CLOUD_CLIENT_SECRET!;

let gmsCloudToken: string | null = null;
let gmsCloudTokenExpiresAt: number | null = null;

const GMS_CLOUD_BASE_URL = 'https://api.cloud-gms.com';
const GMS_CLOUD_REQUEST_TOKEN_URL = GMS_CLOUD_BASE_URL + '/v1/oauth2/token';
const GMS_CLOUD_GET_DEVICE_SUMMARY_URL = GMS_CLOUD_BASE_URL + '/v3/stats/devices/summary';

async function requestToken() {
  console.debug('Requesting access token');

  if (GMS_CLOUD_CLIENT_ID == '' || GMS_CLOUD_CLIENT_SECRET == '') {
    throw new Error('Missing GMS_CLOUD env vars');
  }
  const authResponse = await axios.post(
    GMS_CLOUD_REQUEST_TOKEN_URL,
    { grant_type: 'client_credentials' },
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      auth: {
        username: GMS_CLOUD_CLIENT_ID,
        password: GMS_CLOUD_CLIENT_SECRET,
      },
    }
  );

  gmsCloudToken = authResponse.data.access_token;
  gmsCloudTokenExpiresAt = Date.now() + authResponse.data.expires_in * 1000;
}

export async function getAccessToken() {
  if (!gmsCloudToken || !gmsCloudTokenExpiresAt || Date.now() > gmsCloudTokenExpiresAt) {
    await requestToken();
  }

  return gmsCloudToken;
}

export async function getDeviceSummary(deviceId: number) {
  console.debug('Getting device summary for device:', deviceId);

  const accessToken = await getAccessToken();
  const response = await axios.get(GMS_CLOUD_GET_DEVICE_SUMMARY_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      'device[]': deviceId,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to get device summary');
  }

  const responseBody: DeviceSummaryResponse = response.data;

  if (responseBody.err) {
    console.error('Error:', responseBody.err);
    throw new Error(responseBody.err);
  }

  if (!(responseBody.data?.length > 0)) {
    console.error('Invalid response:', response.data);
    throw new Error(response.data?.err || 'Failed to get device summary');
  }

  console.debug('Response:', responseBody);

  const deviceData = responseBody.data.find(device => device.deviceId === deviceId);

  if (!deviceData) {
    throw new Error('Device not found');
  }

  const summaryData: DeviceSummary = {
    deviceId: deviceData.deviceId,
    totalMileage: deviceData.totalMileage,
    totalDrivingTime: deviceData.totalDrivingtime,
    operationStarted: new Date(deviceData.firstCommunicatedAt),
  };

  console.debug('Device summary:', summaryData);

  return summaryData;
}

export async function getDailyHistory(deviceId: number): Promise<DailyDeviceSummary[]> {
  console.debug('Getting daily history for device:', deviceId);

  const accessToken = await getAccessToken();

  const response = await axios.get(`${GMS_CLOUD_BASE_URL}/v3/stats/devices/${deviceId}/reports `, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to get device reports');
  }

  const responseBody: DeviceReportsResponse = response.data;

  if (responseBody.err) {
    console.error('Error:', responseBody.err);
    throw new Error(responseBody.err);
  }

  if (!(responseBody.data?.length > 0)) {
    console.error('Invalid response:', response.data);
    throw new Error(response.data?.err || 'Failed to get device reports');
  }

  console.debug('Response:', responseBody);

  return responseBody.data.map(report => ({
    date: report.datetime,
    dailyMileage: report.mileage,
    dailyDrivingTime: report.drivingtime,
  }));
}
