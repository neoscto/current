'use server';

import { createCanvas } from 'canvas';
import Chart from 'chart.js/auto';
import { Record } from './parse-csv';

export const generateChart = async (
  records: Record[],
  filterMonth: number,
  title: string
) => {
  try {
    // Define width, height and DPI
    const scale = 2;
    const width = 383 * scale;
    const height = 300 * scale;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // Filter records by month
    const filteredRecords = records.filter(
      (record) => record.month === filterMonth
    );

    // Create the chart configuration
    const configuration = {
      type: 'bar',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => i),
        datasets: [
          {
            label: 'Production',
            data: filteredRecords.map((rec) => rec.production),
            backgroundColor: '#002e1e',
            barThickness: 10 * scale
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: false },
            title: {
              display: true,
              text: 'Producción (KWh)',
              font: {
                size: 8 * scale
              }
            }
          },
          x: {
            grid: { display: false },
            title: {
              display: true,
              text: 'Hora',
              font: {
                size: 6 * scale
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Producción ${title}`,
            font: {
              size: 10 * scale
            }
          },
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        responsive: false,
        animation: false,
        background: 'transparent'
      }
    };
    new Chart(ctx, configuration);
    return canvas.toDataURL();
  } catch (error) {
    console.error(error);
  }
};
