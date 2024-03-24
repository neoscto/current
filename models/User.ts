import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  prop
} from '@typegoose/typegoose';
import mongoose, { Document } from 'mongoose';

export type UserSchemaProps = {
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
};

type UserSchemaMethods = {};

export type UserSchemaType = UserSchemaProps &
  UserSchemaMethods & {
    _id: mongoose.Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
  };

export type UserDocument = Document & UserSchemaType;

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'users'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
@index({ email: 1 })
class UserSchema {
  @prop({ required: true, unique: true })
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

  @prop({ default: new Date() })
  createdAt: Date;

  @prop({ default: new Date() })
  updatedAt: Date;
}

const User = getModelForClass(UserSchema);
export { User, UserSchema };
