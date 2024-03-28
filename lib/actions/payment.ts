'use server';
export const maxDuration = 20;
export const dynamic = 'force-dynamic';

import { Payment, PaymentSchemaProps } from '@/models/Payment';

export const createPayment = async (paymentData: PaymentSchemaProps) => {
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
