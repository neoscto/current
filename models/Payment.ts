import type { Ref } from '@typegoose/typegoose';
import {
  ModelOptions,
  Severity,
  getModelForClass,
  prop
} from '@typegoose/typegoose';
import mongoose, { Document } from 'mongoose';

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
  paymentDate: Date;
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
    collection: 'offer_analytics'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class PaymentSchema {
  @prop({ ref: () => PaymentSchema, required: false, unique: true })
  userOffer: Ref<PaymentSchema>;

  @prop({ default: false })
  termsConditionRead: boolean;

  @prop({ default: false })
  contractSign: boolean;

  @prop()
  contractSignAt: Date;

  @prop({ default: false })
  clickedOnGenerate: boolean;

  @prop({ default: false })
  filledInfo: boolean;

  @prop({ default: false })
  paid: boolean;

  @prop({ default: new Date() })
  createdAt: Date;

  @prop({ default: new Date() })
  updatedAt: Date;
}

const Payment = getModelForClass(PaymentSchema);
export { Payment, PaymentSchema };
