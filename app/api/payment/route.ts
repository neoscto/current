import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function POST(_request: Request, _response: Response) {
  const body = await _request.json();
  const charge = await stripe.charges.create({
    amount: parseInt((body.amount * 100).toFixed(0), 10),
    currency: 'GBP',
    ...(process.env.NODE_ENV === 'development'
      ? { source: 'tok_visa' }
      : { source: body.token }),
    metadata: { offerId: body.offerId }
  });
  return new NextResponse(
    JSON.stringify({ status: charge.status, chargeId: charge.id }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
