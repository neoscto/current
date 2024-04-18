import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  prop
} from '@typegoose/typegoose';
import mongoose, { Document } from 'mongoose';

enum OFFER_TYPE {
  Standard = 'Standard',
  Personalized = 'Personalized'
}

export type UserOfferSchemaProps = {
  // user: () => mongoose.Types.ObjectId;
  _id?: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referralCode?: string;
  dialCode: string;
  address?: string;
  addressNo?: string;
  city?: string;
  province?: string;
  country?: string;
  nie?: string;
  postcode?: string;
  cups?: string;
  noOfPeople?: boolean;
  numberOfPeopleAdditionValue?: boolean;
  offerType?: OFFER_TYPE;
  plan?: string;
  totalPanels?: number;
  capacityPerPanel?: string;
  totalCapacity?: number;
  estimateProduction?: number;
  totalPayment?: number;
  neosTotalEmissionSaved?: number;
  paybackWithNeos?: number;
  percentSavingsYear1WithNeos?: number;
  totalSavingsWithNeos?: number;
  yearlyConsumption?: number;
  typeConsumption?: string;
  envelopeId?: string;
  termsConditionRead?: boolean;
  contractSign?: boolean;
  contractSignAt?: Date;
  clickedOnGenerate?: boolean;
  filledInfo?: boolean;
  paid?: boolean;
  hasReadContract?: boolean;
  downloadedOffer?: boolean;
  iban?: string;
  bic?: string;
  switching?: string;
  powerConsumptionValues?: string[];
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
  @prop({ required: true })
  emailAddress: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  phoneNumber: string;

  @prop({ required: true })
  dialCode: string;

  @prop({ required: false })
  cups: string;

  @prop({ required: false })
  numberOfPeople: number;

  @prop({ required: false })
  numberOfPeopleAdditionValue: number;

  @prop({ required: false })
  address: string;

  @prop({ required: false })
  addressNo: string;

  @prop({ required: false })
  city: string;

  @prop({ required: false })
  country: string;

  @prop({ required: false })
  nie: string;

  @prop({ required: false })
  province: string;

  @prop({ required: false })
  postcode: string;

  @prop({ required: false })
  referralCode: string;

  @prop({ required: false })
  offerType: OFFER_TYPE;

  @prop({ required: false })
  plan: string;

  @prop({ required: false })
  totalPanels: number;

  @prop({ required: false })
  capacityPerPanel: string;

  @prop({ required: false })
  totalCapacity: number;

  @prop({ required: false })
  estimateProduction: number;

  @prop({ required: false })
  totalPayment: number;

  @prop({ required: false })
  neosTotalEmissionSaved: number;

  @prop({ required: false })
  paybackWithNeos: number;

  @prop({ required: false })
  percentSavingsYear1WithNeos: number;

  @prop({ required: false })
  totalSavingsWithNeos: number;

  @prop({ required: false })
  yearlyConsumption: number;

  @prop({ required: false })
  typeConsumption: string;

  @prop({ required: false })
  envelopeId: string;

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

  @prop({ default: false })
  hasReadContract: boolean;

  @prop({ default: false })
  downloadedOffer: boolean;

  @prop({ required: false })
  iban: string;

  @prop({ required: false })
  bic: string;

  @prop({ required: false, default: 'C1' })
  switching: string;

  @prop({ required: false })
  powerConsumptionValues: string[];

  @prop({ default: new Date() })
  createdAt: Date;

  @prop({ default: new Date() })
  updatedAt: Date;
}

const UserOffer = getModelForClass(UserOfferSchema);
export { UserOffer, UserOfferSchema };
