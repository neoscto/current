import * as yup from 'yup';
// const phoneRegExp = /^\+[0-9]{6,14}[0-9]$/;

// const phoneValidation = yup
//   .string()
//   .matches(phoneRegExp, "offer.validation.phoneNumber.valid");
let EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

export const offerStep1Schema = yup.object().shape({
  offerType: yup.string().required(),
  firstName: yup.string().required('offer.validation.firstName.required'),
  lastName: yup.string().required('offer.validation.lastName.required'),
  emailAddress: yup
    .string()
    .matches(EMAIL_REGX, 'offer.validation.email.valid')
    .required('offer.validation.email.required'),
  phoneNumber: yup.string().required('offer.validation.phoneNumber.required'),
  cups: yup
    .string()
    .min(1, 'offer.validation.cups.required')
    .when('offerType', {
      is: (v: string) => v === 'Personalized',
      then: (schema) => schema.required('offer.validation.cups.required')
    }),

  numberOfPeople: yup.number().when('offerType', {
    is: (v: string) => v === 'Standard',
    then: (schema) =>
      schema
        .required('offer.validation.numberOfPeople.required')
        .min(1, 'offer.validation.numberOfPeople.min')
  })
});

export type OfferStep1SchemaType = yup.InferType<typeof offerStep1Schema>;
