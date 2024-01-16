import * as yup from "yup";
// const phoneRegExp = /^\+[0-9]{6,14}[0-9]$/;

// const phoneValidation = yup
//   .string()
//   .matches(phoneRegExp, "offer.validation.phoneNumber.valid");

export const offerStep1Schema = yup.object().shape({
  offerType: yup.string().required(),
  firstName: yup.string().required("offer.validation.firstName.required"),
  lastName: yup.string().required("offer.validation.lastName.required"),
  emailAddress: yup
    .string()
    .email("offer.validation.email.valid")
    .required("offer.validation.email.required"),
  phoneNumber: yup.string().required("offer.validation.phoneNumber.required"),
  cups: yup.number().when("offerType", {
    is: (v: string) => v === "Personalised",
    then: (schema) => schema.required("offer.validation.cups.required"),
  }),
  numberOfPeople: yup.number().when("offerType", {
    is: (v: string) => v === "Standard",
    then: (schema) =>
      schema.required("offer.validation.numberOfPeople.required"),
  }),
});

export type OfferStep1SchemaType = yup.InferType<typeof offerStep1Schema>;
