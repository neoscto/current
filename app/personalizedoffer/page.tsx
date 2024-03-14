'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { setUserData } from '@/features/common/commonSlice';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useHandleForm from '@/hooks/useHandleForm';
import { offerStep1Schema } from '@/utils/validations/offers.validation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid } from '@mui/material';
import NeosTextField from '@/components/NeosTextField';
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
import { calculateSolarPaybackPeriod } from '@/features/calculateSolarPaybackPeriod';
import YourOffer from '../youoffer/page';
import { Button } from '@mantine/core';
import useDocusignService from '@/hooks/useDocusign';
import ProgressBar from '@/components/ProgressBar';

const validateCUPS = (cups: string): boolean | string => {
  const cupsArray = cups.toUpperCase().replace(/\s/g, '').split(',');

  for (const cup of cupsArray) {
    if (!cup.startsWith('ES')) {
      return cupsArray.length === 1
        ? 'You made a mistake in your CUPS, please enter a valid CUPS'
        : 'You made a mistake in at least one of your CUPS, please enter valid CUPS';
    }
    if (cup.length > 22) {
      return 'You’ve entered more than one CUPS, please separate your CUPS with commas';
    }

    // Check if the length is either 20 or 22 characters
    if (cup.length !== 20 && cup.length !== 22) {
      return cupsArray.length === 1
        ? 'You made a mistake in your CUPS, please enter a valid CUPS'
        : 'You made a mistake in at least one of your CUPS, please enter valid CUPS';
    }
  }
  return true;
};

const PersonalizedOffer = () => {
  const dispath = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStep = searchParams.get('activeStep') || 0;

  const formikInitialValues = {
    offerType: '',
    numberOfPeople: '',
    cups: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    dialCode: '34',
    numberofpeopleAdditionValue: 1
  };

  const [data, setData] = useState({
    total_price_before_tax: 0,
    neos_installation_tax: 0,
    number_of_panels: 0,
    required_capacity: 0,
    total_price_after_tax: 0,
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
    neos_not_provider_elephants_carbon_capture: 0,
    save_yearly_w_neos: [{ years: 0, saving: '' }],
    save_yearly_without_neos: [{ years: 0, saving: '' }]
  });

  const [buttonLoading, setLoading] = useState<boolean>(false);

  const [serverError, setServerError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');

  const handleyourSaving = async () => {
    formik.setFieldValue('offerType', 'Personalized');

    if (validateCUPS(formik.values.cups) !== true) {
      formik.setFieldError('cups', validateCUPS(formik.values.cups));
      return;
    }

    const response = await formik.validateForm();

    if (Object.keys(response).length > 0) {
      if (response.phoneNumber) {
        setPhoneNumberError(response.phoneNumber);
      }
      return;
    }
    setPhoneNumberError('');

    setLoading(true);

    try {
      const newData = await calculateSolarPaybackPeriod(
        'Personalized',
        formik.values.numberOfPeople,
        formik.values.cups
      );
      if (newData) setData(newData);

      setServerError('');
    } catch (error) {
      setLoading(false);
      setServerError('Please try one more time?');
      return;
    }

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
      const response = await fetch(`api/users-offers/${offerData?._id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (data) {
        saveDataToSessionStorage('UserOffer', data.data);
        setShowForm('yourOffer');
      }
      setLoading(false);
      return;
    }
    formik.handleSubmit();
    setLoading(false);
  };
  const [showForm, setShowForm] = useState<string>('poffer');

  const [formik, isLoading]: any = useHandleForm({
    method: 'POST',
    apiEndpoint: '/api/users-offers',
    formikInitialValues,
    validationSchema: offerStep1Schema,
    handleSuccessResponce
  });
  function handleSuccessResponce(res: any) {
    saveDataToSessionStorage('UserOffer', res.data);
    setShowForm('yourOffer');
    const arrayData = Object.keys(res.data);
    arrayData.forEach((key: any) => {
      formik.setFieldValue(key, res.data[key] || '');
    });
  }

  const { t } = useTranslation();

  useEffect(() => {
    formik.setFieldValue('offerType', 'Personalized');
    dispath(setUserData(formik.values));
  }, [formik.values]);

  const { loading, signature, signingUrl, downloadPdf } =
    useDocusignService(formik);

  return (
    <MainContainer>
      <div className=" my-4 xl:max-w-[1200px] max-w-[calc(100%_-_40px)] relative rounded-[30px] bg-[#01092299] w-full mx-auto bg-white overflow-hidden">
        <Box sx={{ width: '100%' }}>
          <ProgressBar
            activeStep={activeStep}
            initialForm="soffer" // poffer
            setShowForm={setShowForm}
            showForm={showForm}
          />
          {showForm === 'poffer' && (
            <div className="  w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9 my-14 md:my-0">
              <div className="w-[100%] md:w-[85%] lg:w-[85%]  mx-auto ">
                <h1 className="font-bold text-3xl mb-8 md:mb-11 lg:mb-11 text-center">
                  {t('Get-offer.Personalized Offer')}
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
                      <p className="font-sm text-[#2D9CDB] mt-1">
                        {formik.values.cups
                          ? null
                          : t('Get-offer-form.field-desc')}
                      </p>
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
                      defaultCountry="ES"
                      onCountryChange={(country: Country) => {
                        const dialCode = getCountryCallingCode(country);
                        formik.setFieldValue('dialCode', dialCode);
                      }}
                      onChange={(value) => {
                        formik.setFieldValue('phoneNumber', value);
                      }}
                    />
                    <p className="text-xs text-[#d32f2f] mt-1 ml-3">
                      {formik.values.phoneNumber
                        ? isValidPhoneNumber(formik.values.phoneNumber)
                          ? undefined
                          : t('Invalid phone number')
                        : t(`${phoneNumberError}`)}
                    </p>
                  </Grid>
                </Grid>
                <div className="text-center mt-14">
                  <Button
                    variant="filled"
                    size="lg"
                    style={{
                      backgroundColor: '#FD7C7C',
                      borderRadius: '16px',
                      height: '56px'
                    }}
                    classNames={{}}
                    onClick={() => handleyourSaving()}
                    loading={buttonLoading}
                  >
                    {t('Calculate-saving-btn')}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {showForm === 'yourOffer' && (
            <div className="mt-8 md:mt-0">
              <YourOffer data={data} />
            </div>
          )}
        </Box>
      </div>
    </MainContainer>
  );
};

export default PersonalizedOffer;
