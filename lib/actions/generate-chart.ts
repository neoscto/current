'use server';

import { registerFont, createCanvas } from 'canvas';
import Chart from 'chart.js/auto';
import { Record } from './parse-csv';
import { SavingRecord } from '../types';
import annotationPlugin from 'chartjs-plugin-annotation';
import path from 'path';

Chart.register(annotationPlugin);
const fontPath = path.join(process.cwd(), 'public', 'Roboto-Regular.ttf');
try {
  registerFont(fontPath, { family: 'Roboto' });
  console.log(`Font registered from path: ${fontPath}`);
} catch (err) {
  console.error(`Failed to register font from path: ${fontPath}`, err);
}
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
    ctx.font = "20px 'Roboto'";
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
            font: { family: 'Roboto', size: 10 },
            title: {
              display: true,
              text: 'Producción (KWh)',
              font: {
                size: 8 * scale,
                family: 'Roboto'
              }
            }
          },
          x: {
            grid: { display: false },
            font: { family: 'Roboto', size: 10 },
            title: {
              display: true,
              text: 'Hora',
              font: {
                size: 6 * scale,
                family: 'Roboto'
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Producción ${title}`,
            font: {
              size: 10 * scale,
              family: 'Roboto'
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
    new Chart(ctx as any, configuration as any);
    return canvas.toDataURL();
  } catch (error) {
    console.error(error);
  }
};

export const generatePaybackChart = async (
  cumulativeSavings: SavingRecord[],
  globalPrice: number
) => {
  try {
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
    ctx.font = "20px 'Roboto'";

    const configuration = {
      type: 'bar',
      data: {
        labels: cumulativeSavings.map((record) => record.years),
        datasets: [
          {
            label: 'Cumulative Savings',
            data: cumulativeSavings.map((record) => record.saving),
            backgroundColor: '#002e1e'
          }
        ]
      },
      options: {
        scales: {
          x: {
            grid: { display: false },
            font: { family: 'Roboto', size: 10 },
            title: {
              display: true,
              text: 'Año',
              font: { size: 12, family: 'Roboto' }
            }
          },
          y: {
            grid: { display: false },
            font: { family: 'Roboto', size: 10 },
            beginAtZero: true,
            title: {
              display: true,
              text: 'Ahorro (€)',
              font: { size: 12, family: 'Roboto' }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Ahorro Acumulado',
            font: { size: 20, family: 'Roboto' }
          },
          legend: {
            display: true
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: globalPrice,
                yMax: globalPrice,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                label: {
                  content: 'Price',
                  enabled: true,
                  color: 'rgb(255, 99, 132)',
                  position: 'end',
                  xAdjust: 10,
                  yAdjust: -6
                }
              }
            }
          },
          maintainAspectRatio: false,
          responsive: false,
          animation: false,
          background: 'transparent'
        }
      }
    };
    new Chart(ctx as any, configuration as any);
    return canvas.toDataURL();
  } catch (error) {
    console.error(error);
  }
};
