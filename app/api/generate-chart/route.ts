export const maxDuration = 30; // 5 seconds
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createCanvas, registerFont } from 'canvas';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { SavingRecord } from '@/lib/types';
import { Record } from '@/lib/actions/parse-csv';
import path from 'path';

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
    const { records, filterMonth, title } = await request.json();
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
    ctx.font = '20px "Anton"';

    const filteredRecords = records.filter(
      (record: any) => record.month === filterMonth
    );

    // Create the chart configuration
    const configuration = {
      type: 'bar',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => i),
        datasets: [
          {
            label: 'Production',
            data: filteredRecords.map((rec: any) => rec.production),
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
    return new NextResponse(canvas.toDataURL());
  } catch (error) {
    return new NextResponse('Error generating chart', { status: 500 });
  }
}
