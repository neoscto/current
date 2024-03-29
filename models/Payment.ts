import type { Ref } from '@typegoose/typegoose';
import {
  ModelOptions,
  Severity,
  getModelForClass,
  prop
} from '@typegoose/typegoose';
import mongoose, { Document } from 'mongoose';
import { UserSchema } from './User';
import { UserOfferSchema } from './UsersOffers';

enum PaymentStatus {
  Succeeded = 'succeeded',
  Pending = 'pending',
  Failed = 'failed',
  RequiresPaymentMethod = 'requires_payment_method',
  RequiresConfirmation = 'requires_confirmation',
  RequiresAction = 'requires_action',
  Processing = 'processing',
  Canceled = 'canceled',
  RequiresCapture = 'requires_capture'
}

export type PaymentSchemaProps = {
  user: () => string;
  userOffer: () => string;
  status: PaymentStatus;
  amountPaid: number;
  transactionId: string;
  paymentDate?: Date;
};

type PaymentSchemaMethods = {};

export type PaymentSchemaType = PaymentSchemaProps &
  PaymentSchemaMethods & {
    _id: mongoose.Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
  };

export type PaymentDocument = Document & PaymentSchemaType;

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'payments'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class PaymentSchema {
  @prop({ ref: () => UserSchema, required: true })
  user: Ref<PaymentSchema>;

  @prop({ ref: () => UserOfferSchema, required: true, unique: true })
  userOffer: Ref<PaymentSchema>;

  @prop({ required: true })
  amountPaid: number;

  @prop({ enum: PaymentStatus, default: 'pending' })
  status: string;

  @prop({ required: true })
  transactionId: string;

  @prop({ default: new Date() })
  paymentDate: Date;

  @prop({ default: new Date() })
  createdAt: Date;

  @prop({ default: new Date() })
  updatedAt: Date;
}

const Payment = getModelForClass(PaymentSchema);
export { Payment, PaymentSchema };
