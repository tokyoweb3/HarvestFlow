import axios from "axios";
import * as process from "node:process";
import { DeviceSummary } from "@harvest-flow/utils";

const GMS_CLOUD_CLIENT_ID = process.env.GMS_CLOUD_CLIENT_ID!;
const GMS_CLOUD_CLIENT_SECRET = process.env.GMS_CLOUD_CLIENT_SECRET!;

let gmsCloudToken: string | null = null;
let gmsCloudTokenExpiresAt: number | null = null;

const GMS_CLOUD_BASE_URL = 'https://api.cloud-gms.com';
const GMS_CLOUD_REQUEST_TOKEN_URL = GMS_CLOUD_BASE_URL + '/v1/oauth2/token';
const GMS_CLOUD_GET_DEVICE_SUMMARY_URL = GMS_CLOUD_BASE_URL + 'v3/stats/devices/summary';

async function requestToken() {
  console.debug('Requesting access token');

  const authResponse = await axios.post(GMS_CLOUD_REQUEST_TOKEN_URL,
    { grant_type: 'client_credentials' },
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      auth: {
        username: GMS_CLOUD_CLIENT_ID,
        password: GMS_CLOUD_CLIENT_SECRET
      }
    }
  )

  gmsCloudToken = authResponse.data.access_token;
  gmsCloudTokenExpiresAt = Date.now() + authResponse.data.expires_in * 1000;

}

export async function getAccessToken() {
  if (!gmsCloudToken || !gmsCloudTokenExpiresAt || Date.now() > gmsCloudTokenExpiresAt) {
    await requestToken();
  }

  return gmsCloudToken;
}

export async function getDeviceSummary(deviceId: string)  {
  console.debug('Getting device summary for device:', deviceId);

  const token = await getAccessToken();

  const accessToken = await getAccessToken();
  const response = await axios.get(GMS_CLOUD_GET_DEVICE_SUMMARY_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      "device": deviceId
    }
  });

  if (response.status !== 200) {
    throw new Error('Failed to get device summary');
  }

  if (!(response.data?.length > 0)) {
    throw new Error('Device not found');
  }

  const deviceData = response.data.find((device: any) => device.deviceId === deviceId);

  const summaryData : DeviceSummary = {
    deviceId: deviceData.deviceId,
    totalMileage: deviceData.totalMileage,
    totalDrivingTime: deviceData.totalDrivingTime
  }

  console.debug('Device summary:', summaryData);

  return summaryData;
}