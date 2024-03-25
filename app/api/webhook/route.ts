import { createOrUpdateOfferAnalytics } from '@/lib/actions/offer-analytics';
import { createPayment } from '@/lib/actions/payment';
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
      const { userOffer, user } = chargeCaptured.metadata;
      await createPayment({
        userOffer,
        user,
        status: chargeCaptured.status,
        transactionId: chargeCaptured.id,
        amountPaid: Number((chargeCaptured.amount / 100).toFixed(2))
      });
      await createOrUpdateOfferAnalytics({ userOffer, paid: true });
      break;
    case 'charge.expired':
      const chargeExpired = event.data.object;
      console.log(`Charge expired for Charge ID: ${chargeExpired.id}`);
      break;
    case 'charge.failed':
      const chargeFailed = event.data.object;
      console.error(
        `Charge failed for Charge ID: ${chargeFailed.id} with error: ${chargeFailed.failure_message}`
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new NextResponse('Payment Succeeded', {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
