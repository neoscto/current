import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  prop
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import mongoose, { Document } from 'mongoose';
import { UserSchema } from './User';

enum OfferType {
  Standard = 'Standard',
  Personalized = 'Personalized'
}

export type UserOfferSchemaProps = {
  user: () => string;
  typeOffer: OfferType;
  plan: string;
  totalPanels: number;
  capacityPerPanel: string;
  totalCapacity: number;
  estimateProduction: number;
  totalPayment: number;
  typeConsumption: string;
  envelopeId: string;
};

type UserOfferSchemaMethods = {};

export type UserOfferSchemaType = UserOfferSchemaProps &
  UserOfferSchemaMethods & {
    _id: mongoose.Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
  };

export type UserOfferDocument = Document & UserOfferSchemaType;

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'user_offers'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
@index({ email: 1 })
class UserOfferSchema {
  @prop({ required: true, ref: () => UserSchema })
  user: Ref<UserSchema>;

  @prop({ required: true })
  typeOffer: OfferType;

  @prop({ required: true })
  plan: string;

  @prop({ required: true })
  totalPanels: number;

  @prop({ required: true })
  capacityPerPanel: string;

  @prop({ required: true })
  totalCapacity: number;

  @prop({ required: true })
  estimateProduction: number;

  @prop({ required: true })
  totalPayment: number;

  @prop({ required: true })
  typeConsumption: string;

  @prop({ required: true })
  envelopeId: string;

  @prop({ default: new Date() })
  createdAt: Date;

  @prop({ default: new Date() })
  updatedAt: Date;
}

const UserOffer = getModelForClass(UserOfferSchema);
export { UserOffer, UserOfferSchema };
