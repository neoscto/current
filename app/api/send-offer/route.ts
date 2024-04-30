import { transporter } from '@/config/nodemailer';
import connectDB from '@/lib/connect-db';
import { PreSaleUser } from '@/models/PresaleUser';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
  if (req.method === 'POST') {
    const body = await req.json();

    try {
      const response = await transporter.sendMail({
        from: process.env.EMAIL,
        to: body.email,
        subject: 'offer',
        text: 'test'
      });
      console.log({ response });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: any) {
      console.log(error);
      NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
  }

  return NextResponse.json({ error: 'Bad request' }, { status: 400 });
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get('origin');
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400'
    }
  });

  return response;
}
