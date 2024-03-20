'use server';

import { createCanvas, registerFont } from 'canvas';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { SavingRecord } from '../types';
import { Record } from './parse-csv';

Chart.register(annotationPlugin);
try {
  registerFont('./public/fonts/codec-pro.regular.ttf', { family: 'Codec Pro' });
  console.log('Font registered successfully 🚀')
} catch (error) {
  console.error(error)
}
Chart.defaults.font.size = 25;
Chart.defaults.font.family = 'Codec Pro';
export const generateChart = async (
  records: Record[],
  filterMonth: number,
  title: string
) => {
  try {
    // Define width, height and DPI
    const scale = 2.5;
    const width = 383 * scale;
    const height = 300 * scale;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px "Codec Pro"';
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
            barThickness: 20
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
              text: 'Producción (KWh)'
            }
          },
          x: {
            grid: { display: false },
            title: {
              display: true,
              text: 'Hora'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Producción ${title}`,
            font: {
              size: 35
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
    const width = 700;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '25px "Codec Pro"';

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
            ticks: {
              font: {
                size: 14
              }
            },
            title: {
              display: true,
              text: 'Año',
              font: { size: 14 }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: {
                size: 14
              }
            },
            beginAtZero: true,
            title: {
              display: true,
              text: 'Ahorro (€)',
              font: { size: 14 }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Ahorro Acumulado',
            font: { size: 20 }
          },
          legend: {
            display: true,
            labels: {
              boxWidth: 20,
              padding: 5,
              font: { size: 12 }
            }
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
