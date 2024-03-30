import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function POST(_request: Request, _response: Response) {
  const body = await _request.json();
  const charge = await stripe.charges.create({
    amount: parseInt((body.amount * 100).toFixed(0), 10),
    currency: 'GBP',
    source: 'tok_visa',
    // ...(process.env.NODE_ENV === 'development'
    //   ? { source: 'tok_visa' }
    //   : { source: body.token }),
    metadata: { userOffer: body.offerId, user: body.userId }
  });
  return new NextResponse(
    JSON.stringify({ status: charge.status, chargeId: charge.id }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    }
  );
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
