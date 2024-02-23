'use client';
import { Grid } from '@mui/material';
import { GetOfferCardData } from '@/utils/StaticData';
import NeosTextField from '@/components/NeosTextField';
import NeosButton from '@/components/NeosButton';
import OfferCard from './offerCard';
import { useTranslation } from 'react-i18next';
import {
  getDataFromSessionStorage,
  saveDataToSessionStorage
} from '@/utils/utils';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  Country,
  getCountryCallingCode,
  isValidPhoneNumber
} from 'react-phone-number-input';
import { useState } from 'react';
import { calculateSolarPaybackPeriod } from '@/features/calculateSolarPaybackPeriod';
import YourOffer from '../youoffer/page';

const validateCUPS = (cups: string): boolean => {
  // Check if the CUPS starts with "ES"
  if (!cups.startsWith('ES')) {
    return false;
  }

  // Check if the length is either 20 or 22 characters
  if (cups.length !== 20 && cups.length !== 22) {
    return false;
  }

  // If both conditions are satisfied, return true
  return true;
};

interface GetOfferProps {
  formik: any;
  handleChange: any;
  handleNext: any;
  setShowForm: any;
  showForm: any;
  signature: any;
}

const GetOffer: React.FC<GetOfferProps> = ({
  formik,
  handleChange,
  handleNext,
  setShowForm,
  showForm,
  signature
}) => {
  const [data, setData] = useState({
    total_price_before_tax: 0,
    neos_installation_tax: 0,
    number_of_panels: 0,
    required_capacity: 0,
    tableData: [
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      },
      {
        neosPanelProvider: '',
        neosPanelKeepProvider: '',
        rooftopPanelKeepProvider: '',
        keepProvider: ''
      }
    ],
    percent_savings_year1_w_neos: 0,
    percent_savings_year1_without_neos: 0,
    savings_retail_w_neos: 0,
    savings_retail_without_neos: 0,
    payback_w_neos: 0,
    payback_without_neos: 0,
    neos_total_emissions_saved_in_tons: 0,
    neos_not_provider_total_emissions_saved_in_tons: 0,
    neos_elephants_carbon_capture: 0,
    neos_not_provider_elephants_carbon_capture: 0
  });

  const handleyourSaving = async () => {
    const newData = await calculateSolarPaybackPeriod(
      formik.values.numberOfPeople,
      formik.values.cups
    );

    setData(newData);

    const offerData: any = getDataFromSessionStorage('UserOffer');
    if (offerData) {
      const updatedData = {
        firsName: formik?.values?.firstName,
        lastName: formik.values.lastName,
        emailAddress: formik.values.emailAddress,
        numberOfPeople: formik.values.numberOfPeople,
        phoneNumber: formik.values.phoneNumber,
        dialCode: formik.values.dialCode,
        cups: formik.values.cups
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users-offers/${offerData?._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedData)
        }
      );
      const data = await response.json();
      if (data) {
        saveDataToSessionStorage('UserOffer', data.data);
        setShowForm('yourOffer');
      }
      return;
    }
    formik.handleSubmit();
  };
  const chooseOfferType = async (type: string) => {
    switch (type) {
      case 'soffer':
        formik.setFieldValue('offerType', 'Standard');
        break;
      case 'poffer':
        formik.setFieldValue('offerType', 'Personalised');
        break;
      default:
        break;
    }
    setShowForm(type);
    // formik.setErrors({});
  };

  const { t } = useTranslation();
  return (
    <>
      {showForm == 'soffer' && (
        <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9">
          <div className="w-[100%] md:w-[85%] lg:w-[85%]  mx-auto mt-6 md:mt-16 lg:mt-16 ">
            <h1 className="font-bold text-3xl mb-8 md:mb-11 lg:mb-11 text-center">
              {t('Get-offer.Standard Offer')}
            </h1>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.field-label1')}
                  type="number"
                  name="numberOfPeople"
                  value={formik.values.numberOfPeople}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.numberOfPeople)}
                  helperText={t(formik.errors.numberOfPeople)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.first-name')}
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.firstName)}
                  helperText={t(formik.errors.firstName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.last-name')}
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.lastName)}
                  helperText={t(formik.errors.lastName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.email')}
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.emailAddress)}
                  helperText={t(formik.errors.emailAddress)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <label className="text-sm text-black  font-medium mb-1.5 block">
                  {t('Get-offer-form.phone')}
                </label>
                <PhoneInput
                  placeholder={t('Get-offer-form.form-placeholder')}
                  name="phoneNumber"
                  className="border border-[#E0E0E0] rounded-[8px] p-3 w-full"
                  international
                  value={formik.values.phoneNumber}
                  countryCallingCodeEditable={false}
                  defaultCountry="GB"
                  onCountryChange={(country: Country) => {
                    const dialCode = getCountryCallingCode(country);
                    formik.setFieldValue('dialCode', dialCode);
                  }}
                  onChange={(value) => {
                    formik.setFieldValue('phoneNumber', value);
                  }}
                />
                <p className="font-sm text-[#2D9CDB] mt-1">
                  {formik.values.phoneNumber
                    ? isValidPhoneNumber(formik.values.phoneNumber)
                      ? undefined
                      : 'Invalid phone number'
                    : null}
                </p>
              </Grid>
            </Grid>
            <div className="text-center mt-14 ">
              <NeosButton
                category="colored"
                title={t('Calculate-saving-btn')}
                onClick={() => handleyourSaving()}
              />
            </div>
          </div>
        </div>
      )}

      {showForm == 'poffer' && (
        <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9">
          <div className="w-[100%] md:w-[85%] lg:w-[85%]  mx-auto mt-6 md:mt-16 lg:mt-16 ">
            <h1 className="font-bold text-3xl mb-8 md:mb-11 lg:mb-11 text-center">
              {t('Get-offer.Personalised Offer')}
            </h1>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.cups')}
                  type="text"
                  name="cups"
                  value={formik.values.cups}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.cups)}
                  helperText={t(formik.errors.cups)}
                />
                <p className="font-sm text-[#2D9CDB] mt-1">
                  {t('Get-offer-form.field-desc')}
                </p>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.first-name')}
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.firstName)}
                  helperText={t(formik.errors.firstName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.last-name')}
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.lastName)}
                  helperText={t(formik.errors.lastName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <NeosTextField
                  placeholder={t('Get-offer-form.form-placeholder')}
                  label={t('Get-offer-form.email')}
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.emailAddress)}
                  helperText={t(formik.errors.emailAddress)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <label className="text-sm text-black  font-medium mb-1.5 block">
                  {t('Get-offer-form.phone')}
                </label>
                <PhoneInput
                  placeholder={t('Get-offer-form.form-placeholder')}
                  name="phoneNumber"
                  className="border border-[#E0E0E0] rounded-[8px] p-3 w-full"
                  international
                  value={formik.values.phoneNumber}
                  countryCallingCodeEditable={false}
                  defaultCountry="GB"
                  onCountryChange={(country: Country) => {
                    const dialCode = getCountryCallingCode(country);
                    formik.setFieldValue('dialCode', dialCode);
                  }}
                  onChange={(value) => {
                    formik.setFieldValue('phoneNumber', value);
                  }}
                />
                <p className="font-sm text-[#2D9CDB] mt-1">
                  {formik.values.phoneNumber
                    ? isValidPhoneNumber(formik.values.phoneNumber)
                      ? undefined
                      : 'Invalid phone number'
                    : null}
                </p>
              </Grid>
            </Grid>
            <div className="text-center mt-14">
              <NeosButton
                category="colored"
                title={t('Calculate-saving-btn')}
                onClick={() => handleyourSaving()}
              />
            </div>
          </div>
        </div>
      )}
      {showForm == 'allOffers' && (
        <div className=" w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9">
          <div className="my-11 lg:my-12">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              direction={{ xs: 'column-reverse', sm: 'row' }}
            >
              {GetOfferCardData.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <OfferCard Data={item} setShowForm={chooseOfferType} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
      {showForm == 'yourOffer' && (
        <YourOffer handleNext={handleNext} data={data} />
      )}
    </>
  );
};

export default GetOffer;
