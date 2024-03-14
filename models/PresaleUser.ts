import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  prop,
} from "@typegoose/typegoose";
import mongoose, { Document } from "mongoose";

export type PreSaleUserSchemaProps = {
  user: string;
};

type PreSaleUserSchemaMethods = {};

export type PreSaleUserSchemaType = PreSaleUserSchemaProps &
  PreSaleUserSchemaMethods & {
    _id: mongoose.Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
  };

export type PreSaleUserDocument = Document & PreSaleUserSchemaType;

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "preSaleUsers",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ user: 1 })
class PreSaleUserSchema {
  @prop({ required: true, unique: true })
  user: string;

  @prop({ default: new Date() })
  createdAt: Date;

  @prop({ default: new Date() })
  updatedAt: Date;
}

const PreSaleUser = getModelForClass(PreSaleUserSchema);
export { PreSaleUser, PreSaleUserSchema };
