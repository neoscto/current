'use client';
import NeosTextField from '@/components/NeosTextField';
import ProgressBar from '@/components/ProgressBar';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { calculateSolarPaybackPeriod } from '@/features/calculateSolarPaybackPeriod';
import { setUserData } from '@/features/common/commonSlice';
import useDocusignService from '@/hooks/useDocusign';
import useHandleForm from '@/hooks/useHandleForm';
import { AppDispatch } from '@/store/store';
import { cupsErrorTypes, validateCUPS } from '@/utils/utils';
import { offerStep1Schema } from '@/utils/validations/offers.validation';
import { Button } from '@mantine/core';
import { CircularProgress, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput, {
  Country,
  getCountryCallingCode,
  isValidPhoneNumber
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import YourOffer from '../youoffer/page';

const PersonalizedOffer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStep = searchParams.get('activeStep') || 0;

  const [showForm, setShowForm] = useState<string>('poffer');
  const [cupsError, setCupsError] = useState('');

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

  const [data, setData] = useState<any>({});
  const [cupsCode, setCupsCode] = useState('');

  const [buttonLoading, setLoading] = useState<boolean>(false);

  const [serverError, setServerError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const { t } = useTranslation();

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
      if (newData?.error) {
        switch (newData.type) {
          case cupsErrorTypes.INSUFFICIENT_HISTORY:
          case cupsErrorTypes.NEGATIVE_SAVINGS:
          case cupsErrorTypes.API_ISSUE:
            formik.setFieldError('cups', newData.message);
            break;
          case cupsErrorTypes.MULTIPLE_ISSUES:
            formik.setFieldError('cups', newData.message);
            setCupsCode(newData.cupsCode);
            break;
        }
        setLoading(false);
        return;
      } else if (newData) {
        console.log('New Data: ', newData);
        setData(newData);
        dispatch(
          setUserData({
            ...formik?.values,
            totalPanels: newData.number_of_panels,
            capacityPerPanel: '440 Wp',
            totalCapacity: newData.vsi_required_capacity,
            estimateProduction: newData.vsi_required_capacity! * 2000,
            totalPayment: newData.total_price_after_tax,
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

  useEffect(() => {
    router.refresh();
  }, []);
  const [formik, isLoading]: any = useHandleForm({
    method: 'POST',
    apiEndpoint: '/api/users-offers',
    formikInitialValues,
    validationSchema: offerStep1Schema,
    handleSuccessResponce
  });
  async function handleSuccessResponce(res: any) {
    dispatch(setUserData({ ...res.offer, offerType: 'Personalized' }));
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
          offerType: 'Personalized',
          totalPanels: data.number_of_panels,
          capacityPerPanel: '440 Wp',
          totalCapacity: data.vsi_required_capacity,
          estimateProduction: data.vsi_required_capacity * 2000,
          totalPayment: data.total_price_after_tax,
          typeConsumption: data.type_consumption_point
        })
      }
    );
  }

  useEffect(() => {
    formik.setFieldValue('offerType', 'Personalized');
    // dispatch(setUserData(formik.values));
  }, [formik.values]);

  const { loading, signature, signingUrl, downloadPdf } =
    useDocusignService(formik);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <CircularProgress className="w-8 h-8" />
      </div>
    );
  }

  return (
    <MainContainer>
      <div className=" my-4 xl:max-w-[1200px] max-w-[calc(100%_-_40px)] relative rounded-[30px] bg-[#01092299] w-full mx-auto bg-white overflow-hidden">
        <Box sx={{ width: '100%' }}>
          <ProgressBar
            activeStep={activeStep}
            initialForm="poffer"
            setShowForm={setShowForm}
            showForm={showForm}
          />

          {showForm === 'poffer' && (
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
                        {formik.values.cups
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
                      height: '56px'
                    }}
                    classNames={{}}
                    onClick={() => handleyourSaving()}
                    loading={buttonLoading || isLoading}
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
