'use client';
import YourOffer from '@/app/youoffer/page';
import NeosTextField from '@/components/NeosTextField';
import TolstoyWidget from '@/components/TolstoyWidget';
import { calculateSolarPaybackPeriod } from '@/features/calculateSolarPaybackPeriod';
import { setUserData } from '@/features/common/commonSlice';
import useHandleForm from '@/hooks/useHandleForm';
import { ISolarPaybackData } from '@/lib/types';
import { AppDispatch } from '@/store/store';
import { cupsErrorTypes, validateCUPS } from '@/utils/utils';
import { offerStep1Schema } from '@/utils/validations/offers.validation';
import { Button } from '@mantine/core';
import { CircularProgress, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput, {
  Country,
  getCountryCallingCode,
  isValidPhoneNumber
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';

const PersonalizedForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: any) => state.commonSlice);

  const [showForm, setShowForm] = useState<string>('poffer');

  const formikInitialValues = {
    // offerType: '',
    // numberOfPeople: '',
    _id: userData._id || undefined,
    cups: userData.cups || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    emailAddress: userData.emailAddress || '',
    phoneNumber: userData.phoneNumber || '',
    dialCode: userData.dialCode || '34'
    // numberofpeopleAdditionValue: 1
  };
  //@ts-ignore
  const [data, setData] = useState<ISolarPaybackData>({
    total_price_before_tax: 0,
    neos_installation_tax: 0,
    number_of_panels: 0,
    required_capacity: 0,
    vsi_required_capacity: 0,
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
    yearly_consumption: 0,
    neos_total_emissions_saved_in_tons: 0,
    neos_not_provider_total_emissions_saved_in_tons: 0,
    neos_elephants_carbon_capture: 0,
    neos_not_provider_elephants_carbon_capture: 0,
    save_yearly_w_neos: [{ years: 0, saving: '' }],
    save_yearly_without_neos: [{ years: 0, saving: '' }],
    total_savings_w_neos: 0,
    type_consumption_point: ''
  });
  const [cupsCode, setCupsCode] = useState('');

  const [buttonLoading, setLoading] = useState<boolean>(false);

  const [serverError, setServerError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const { t } = useTranslation();

  const handleyourSaving = async () => {
    // formik.setFieldValue('offerType', 'Personalized');

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
      //@ts-ignore
      const newData: ISolarPaybackData = await calculateSolarPaybackPeriod({
        offerType: 'Personalized',
        user_cups_code: formik.values.cups
      });
      if (newData?.error) {
        switch (newData.type) {
          case cupsErrorTypes.INSUFFICIENT_HISTORY:
          case cupsErrorTypes.NEGATIVE_SAVINGS:
          case cupsErrorTypes.API_ISSUE:
            formik.setFieldError('cups', newData.message);
            break;
          case cupsErrorTypes.MULTIPLE_ISSUES:
            formik.setFieldError('cups', newData.message);
            setCupsCode(newData.cupsCode as string);
            break;
        }
        setLoading(false);
        return;
      } else {
        //@ts-ignore
        setData(newData);
        const vsiRequiredCapacity = newData.vsi_required_capacity ?? 0;
        dispatch(
          setUserData({
            ...formik?.values,
            totalPanels: newData.number_of_panels,
            capacityPerPanel: '440 Wp',
            totalCapacity: newData.vsi_required_capacity,
            estimateProduction: vsiRequiredCapacity * 2000,
            totalPayment: newData.total_price_after_tax,
            neosTotalEmissionSaved: newData.neos_total_emissions_saved_in_tons,
            paybackWithNeos: newData.payback_w_neos,
            percentSavings: newData.percent_savings_w_neos,
            totalSavingsWithNeos: newData.total_savings_w_neos,
            yearlyConsumption: newData.yearly_consumption,
            typeConsumption: newData.type_consumption_point
          })
        );
      }
      setShowForm('yourOffer');
      setServerError('');
    } catch (error) {
      setLoading(false);
      setServerError('Please try one more time?');

      return;
    }
    formik.handleSubmit();
    setLoading(false);
  };

  const [formik, isLoading]: any = useHandleForm({
    method: 'POST',
    apiEndpoint: '/api/users-offers',
    formikInitialValues,
    validationSchema: offerStep1Schema,
    handleSuccessResponce
  });
  async function handleSuccessResponce(res: any) {
    // dispatch(setUserData({ ...res.offer, offerType: 'Personalized' }));
    dispatch(setUserData({ ...res.offer }));
    setShowForm('yourOffer');
    const arrayData = Object.keys(res.offer);
    arrayData.forEach((key: any) => {
      formik.setFieldValue(key, res.offer[key] || '');
    });
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers/${res.offer.id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...res.offer,
          // offerType: 'Personalized',
          totalPanels: data.number_of_panels,
          capacityPerPanel: '440 Wp',
          totalCapacity: data.vsi_required_capacity,
          //@ts-ignore
          estimateProduction: data.vsi_required_capacity * 2000,
          totalPayment: data.total_price_after_tax,
          neosTotalEmissionSaved: data.neos_total_emissions_saved_in_tons,
          paybackWithNeos: data.payback_w_neos,
          percentSavings: data.percent_savings_w_neos,
          totalSavingsWithNeos: data.total_savings_w_neos,
          yearlyConsumption: data.yearly_consumption,
          typeConsumption: data.type_consumption_point
        })
      }
    );
  }

  // useEffect(() => {
  //   formik.setFieldValue('offerType', 'Personalized');
  //   // dispatch(setUserData(formik.values));
  // }, [formik.values]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center w-full h-screen">
  //       <CircularProgress className="w-8 h-8" />
  //     </div>
  //   );
  // }
  return (
    <div className="my-4 xl:max-w-[1200px] max-w-[calc(100%_-_40px)] relative rounded-[30px] bg-[#01092299] w-full mx-auto bg-white overflow-hidden">
      <Box sx={{ width: '100%' }}>
        {/* <ProgressBar
            activeStep={activeStep}
            initialForm="poffer"
            setShowForm={setShowForm}
            showForm={showForm}
          /> */}

        {showForm === 'poffer' && (
          <>
            <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto pb-6 md:pb-9 lg:pb-9 my-14 max-md:mb-4 md:my-0">
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
                      helperText={t(formik.errors.cups, {
                        cups_code: cupsCode
                      })}
                    />
                    <p className="font-sm text-[#2D9CDB] mt-1">
                      <p className="font-sm text-[#2D9CDB] mt-1">
                        {formik.values.cups || userData?.cups
                          ? null
                          : t('Get-offer-form.field-desc')}
                      </p>
                    </p>
                    {/* {cupsError && (
                      <p className="text-sm text-red-600">{cupsError}</p>
                    )} */}
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
                      height: '56px',
                      width: '100%',
                      maxWidth: '275px'
                    }}
                    classNames={{}}
                    onClick={() => handleyourSaving()}
                    loading={buttonLoading || isLoading}
                    className="!text-base md:!text-[18px] !leading-[18px]"
                  >
                    {t('Calculate-saving-btn')}
                  </Button>
                </div>
              </div>
            </div>
            <TolstoyWidget src="https://player.gotolstoy.com/y90k387w8fwhy" />
          </>
        )}
        {showForm === 'yourOffer' && (
          <div className="mt-8 md:mt-0">
            <YourOffer data={data} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default PersonalizedForm;
