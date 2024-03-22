import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add your stripe secret key here
export async function POST(_request: Request, _response: Response) {
  const sig = _request.headers.get('stripe-signature');
  let event;

  try {
    const body = await _request.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    return new NextResponse('Webhook Error', { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'charge.succeeded':
      const chargeCaptured = event.data.object;
      const offerId = chargeCaptured.metadata.offerId;
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users-offers/${offerId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ paid: true })
        }
      );
      break;
    case 'charge.expired':
      const chargeExpired = event.data.object;
      // Then define and call a function to handle the event charge.expired
      break;
    case 'charge.failed':
      const chargeFailed = event.data.object;
      // Then define and call a function to handle the event charge.failed
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new NextResponse('Payment Succeeded', {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
