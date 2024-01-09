import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  prop,
} from "@typegoose/typegoose";
import mongoose, { Document } from "mongoose";

enum OfferType {
  Standard = "Standard",
  Personalised = "Personalised",
}

export type UsersOffersSchemaProps = {
  offerType: OfferType;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cups: number;
  numberOfPeople: number;
  numberOfPeopleAdditionValue: number;
  address: string;
  city: string;
  postcode: string;
  termsConditionRead?: boolean;
  contractSign?: boolean;
  contractSignAt?: Date;
  esign?: string;
};

type UsersOffersSchemaMethods = {};

export type UsersOffersSchemaType = UsersOffersSchemaProps &
  UsersOffersSchemaMethods & {
    _id: mongoose.Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
  };

export type UsersOffersDocument = Document & UsersOffersSchemaType;

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "usersOffers",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ email: 1 })
class UsersOffersSchema {
  @prop({ required: true, enum: OfferType })
  offerType: OfferType;

  @prop({ required: true })
  emailAddress: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  phoneNumber: string;

  @prop({ required: false })
  cups: number;

  @prop({ required: false })
  numberOfPeople: number;

  @prop({ required: false })
  numberOfPeopleAdditionValue: number;

  @prop({ required: false })
  address: string;

  @prop({ required: false })
  city: string;

  @prop({ required: false })
  postcode: string;

  @prop({ default: false })
  termsConditionRead: boolean;

  @prop({ default: false })
  contractSign: boolean;

  @prop()
  contractSignAt: Date;

  @prop()
  esign: string;

  @prop({ default: new Date() })
  createdAt: Date;

  @prop({ default: new Date() })
  updatedAt: Date;
}

const UsersOffers = getModelForClass(UsersOffersSchema);
export { UsersOffers, UsersOffersSchema };
