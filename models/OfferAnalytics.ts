import type { Ref } from '@typegoose/typegoose';
import {
  ModelOptions,
  Severity,
  getModelForClass,
  prop
} from '@typegoose/typegoose';
import mongoose, { Document } from 'mongoose';
import { UserOfferSchema } from './UsersOffers';

export type OfferAnalyticsProps = {
  userOffer: () => any;
  termsConditionRead?: boolean;
  contractSign?: boolean;
  contractSignAt?: Date;
  clickedOnGenerate?: boolean;
  filledInfo?: boolean;
  paid?: boolean;
};

type OfferAnalyticsSchemaMethods = {};

export type OfferAnalyticsSchemaType = OfferAnalyticsProps &
  OfferAnalyticsSchemaMethods & {
    _id: mongoose.Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
  };

export type OfferAnalyticsDocument = Document & OfferAnalyticsSchemaType;

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'offer_analytics'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class OfferAnalyticsSchema {
  @prop({ ref: () => UserOfferSchema, required: true, unique: true })
  userOffer: Ref<UserOfferSchema>;

  @prop({ default: false, required: false })
  termsConditionRead: boolean;

  @prop({ default: false, required: false })
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

const OfferAnalytics = getModelForClass(OfferAnalyticsSchema);
export { OfferAnalytics, OfferAnalyticsSchema };
