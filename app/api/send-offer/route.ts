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
