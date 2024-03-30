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
