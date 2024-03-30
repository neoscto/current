import { NextResponse } from 'next/server';
import connectDB from '@/lib/connect-db';
import { User } from '@/models/User';

export async function GET(
  _request: Request,
  { params }: { params: { code: string } }
) {
  await connectDB();
  const data = await User.findOne({ referralCode: params.code }).lean().exec();
  if (data && data.referralCode === params.code) {
    return new NextResponse(JSON.stringify({ isValidCode: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new NextResponse(JSON.stringify({ isValidCode: false }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
