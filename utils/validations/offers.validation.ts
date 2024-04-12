import * as yup from 'yup';
// const phoneRegExp = /^\+[0-9]{6,14}[0-9]$/;

// const phoneValidation = yup
//   .string()
//   .matches(phoneRegExp, "offer.validation.phoneNumber.valid");
let EMAIL_REGX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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

const SPAIN_IBAN_REGEX = /^ES\d{2}\d{20}$/;
const BIC_REGEX = /^[A-Za-z]{4}[A-Za-z]{2}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;

export const detailFormSchema = yup.object().shape({
  cups: yup.string().min(1, 'offer.validation.cups.required'),
  iban: yup
    .string()
    .matches(SPAIN_IBAN_REGEX, 'offer.validation.iban.invalid')
    .required('offer.validation.iban.required')
    .max(24, 'offer.validation.iban.invalid-length'),
  bic: yup
    .string()
    .matches(BIC_REGEX, 'offer.validation.bic.invalid')
    .min(8, 'offer.validation.bic.invalid-length')
    .max(11, 'offer.validation.bic.invalid-length')
    .required('offer.validation.bic.required')
});
