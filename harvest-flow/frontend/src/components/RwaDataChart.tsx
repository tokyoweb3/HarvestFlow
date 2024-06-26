import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { DailyDeviceSummary } from "@harvest-flow/utils";

const RwaDataChart: React.FC<{dailyStats : DailyDeviceSummary[]}> = ({dailyStats}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const data: ChartData<'bar' | 'line'> = convertData(dailyStats);

  const options: ChartOptions<'bar' | 'line'> = {
    scales: {
      'y-hours': {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' h';
          },
        },
      },
      'y-mileage': {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' km';
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-[1000px]">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

const convertData = (dataset: DailyDeviceSummary[]): ChartData<'bar' | 'line'> => {
  // Get all dates from the dataset
  const dates = dataset.map(item => new Date(item.date).getTime());

  // Create a set of all dates in the range
  const startDate = new Date(Math.min(...dates));
  const endDate = new Date(Math.max(...dates));
  const allDates: string[] = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    allDates.push(d.toISOString().split('T')[0]);
  }

  // Map the dataset by date
  const dataMap = new Map(dataset.map(item => [item.date, item]));

  // Create the output data structure
  const labels = allDates.map(date => new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }));

  const mileageData = allDates.map(date => dataMap.get(date)?.dailyMileage || 0);
  const drivingtimeData = allDates.map(date => dataMap.get(date)?.dailyDrivingTime / 3600 || 0);

  return {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'MILEAGES',
        data: mileageData,
        borderColor: 'rgba(230, 185, 95, 1)',
        backgroundColor: 'rgba(230, 185, 95, 1)',
        borderWidth: 3,
        fill: false,
        yAxisID: 'y-mileage',
        pointRadius: 0,
        pointHitRadius: 10,
      },
      {
        type: 'bar' as const,
        label: 'HOURS',
        data: drivingtimeData,
        backgroundColor: 'rgba(53, 90, 180, 1)',
        yAxisID: 'y-hours',
      },
    ],
  };
};

export default RwaDataChart;
