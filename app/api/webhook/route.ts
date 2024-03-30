import { NextResponse } from 'next/server';
import { UserOffer, UserOfferSchemaProps } from '@/models/UsersOffers';
import { Payment, PaymentSchemaProps } from '@/models/Payment';
import { stringToObjectId } from '@/lib/api-response';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createOrUpdateUserOffer = async (
  offerData: UserOfferSchemaProps,
  offerId?: string
) => {
  try {
    if (!offerData.user) throw new Error("User can't be empty 😔");
    if (offerId) {
      const existingUserOffer = await UserOffer.findByIdAndUpdate(
        stringToObjectId(offerId),
        { $set: offerData },
        { new: true }
      )
        .lean()
        .exec();
      return existingUserOffer;
    }
    const userOffer = await UserOffer.create(offerData);
    return userOffer;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user offer 😔');
  }
};

const createPayment = async (paymentData: PaymentSchemaProps) => {
  try {
    const { user, userOffer, transactionId, status, amountPaid } = paymentData;
    if (!user || !userOffer || !transactionId || !status || !amountPaid) {
      throw new Error('Invalid payment data');
    }
    const payment = await Payment.create({
      user,
      userOffer,
      transactionId,
      status,
      amountPaid
    });
    if (!payment) {
      throw new Error('Payment not created');
    }
    return JSON.parse(JSON.stringify(payment));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create payment');
  }
};

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
      await createOrUpdateUserOffer({ user, paid: true }, userOffer);
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
