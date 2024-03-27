export const maxDuration = 30;
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createCanvas, registerFont } from 'canvas';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import path from 'path';
import { SavingRecord } from '@/lib/types';

const resolved1 = path.resolve('./fonts/Roboto-Regular.ttf');
const resolved2 = path.resolve('./fonts/Roboto-Bold.ttf');
console.log('Path to font file', resolved1);
registerFont(resolved1, { family: 'Roboto' });
registerFont(resolved2, { family: 'Roboto' });
Chart.register(annotationPlugin);
Chart.defaults.font.size = 25;
Chart.defaults.font.family = 'Roboto';
export async function POST(request: Request) {
  try {
    const { cumulativeSavings, globalPrice } = await request.json();

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
    ctx.font = '25px "Roboto"';

    const configuration = {
      type: 'bar',
      data: {
        labels: cumulativeSavings.map((record: SavingRecord) => record.years),
        datasets: [
          {
            label: 'Cumulative Savings',
            data: cumulativeSavings.map(
              (record: SavingRecord) => record.saving
            ),
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
    return new NextResponse(canvas.toDataURL());
  } catch (error) {
    return new NextResponse('Error generating chart', { status: 500 });
  }
}
