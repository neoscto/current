import { NextResponse } from 'next/server';

// const stripe = require('stripe')('sk_test_51OSMbhE3ValX33mMlw1SRT12cl9D1kTxo6vO1yofNjQrPP4RUr2ncUdfMXAsJdd2RrT8EqVGxCTaGEDsCXkl3d6d00HOgQxLuB'); // Add your stripe secret key here
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add your stripe secret key here
export async function POST(_request: Request, _response: Response) {
  const body = await _request.json();
  console.log('Body: ', body);
  const charge = await stripe.charges.create({
    amount: parseInt((body.amount * 100).toFixed(0), 10),
    currency: 'GBP',
    // source: body.token
    source: 'tok_visa',
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
