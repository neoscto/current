'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MainContainer from '@/components/sharedComponents/MainContainer';
import GetOffer from './GetOffer';
import ContractDetail from '../contractDetail/page';
import Success from '../success/page';
import { pdfGenerate } from './pdfGenerator';
import { setUserData } from '@/features/common/commonSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useHandleForm from '@/hooks/useHandleForm';
import { offerStep1Schema } from '@/utils/validations/offers.validation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useDocusignService from '@/hooks/useDocusign';
import { saveDataToSessionStorage } from '@/utils/utils';
import { CircularProgress } from '@mui/material';
import Congrats from '@/components/Congrats';
import ProgressBar from '@/components/ProgressBar';

const steps = [
  'Receive Your Offer',
  'Sign Your Contract',
  'Enjoy Solar Energy'
];

interface FormData {
  numberOfPeople: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dialCode: string;
  numberofpeopleAdditionValue: number;
}

const HorizontalLinearStepper = () => {
  const dispath = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStep = searchParams.get('activeStep') || 0;
  const { userData } = useSelector((state: any) => state.commonSlice);

  const formikInitialValues = {
    offerType: '',
    numberOfPeople: '',
    cups: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    dialCode: '34',
    numberofpeopleAdditionValue: 1,
    nie: '',
    address: '',
    addressNo: '',
    city: '',
    province: '',
    country: '',
    postcode: ''
  };
  const [showForm, setShowForm] = useState<string>('allOffers');

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
      formik.setFieldValue(key, res.data[key]);
    });
  }
  const { loading, signature, signingUrl, downloadPdf, isPDFLoading } =
    useDocusignService(formik);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data === 'redirect_success_url') {
        // const updateUserOffer = async () => {
        //   console.log('User Offer: ', userData);
        //   return await fetch('/api/users-offers', {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify({
        //       offerData: {
        //         user: userData._id,
        //         contractSign: true,
        //         contractSignAt: new Date()
        //       },
        //       offerId: userData.offerId
        //     })
        //   });
        // };
        // updateUserOffer();
        window.location.href = '/getoffer?activeStep=2';
        window.removeEventListener('message', (event) => {});
      }
    });
  }, [signingUrl]);

  const [skipped, setSkipped] = useState<Set<number>>(new Set<number>());

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(Number(activeStep))) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(Number(activeStep));
    }

    router.push(
      pathname +
        '?' +
        createQueryString('activeStep', (Number(activeStep) + 1).toString())
    );
    setSkipped(newSkipped);
  };

  const handleReset = (): void => {
    router.push(
      pathname + '?' + createQueryString('activeStep', (0).toString())
    );
  };

  const [formData, setFormData] = useState<FormData>({
    numberOfPeople: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    dialCode: '34',
    numberofpeopleAdditionValue: 1
  });

  const handleChange = (key: string) => (event: any) => {
    if (key === 'numberOfPeople') {
      setFormData((prevData) => ({
        ...prevData,
        [key]: event.target.value.toString(),
        ['numberofpeopleAdditionValue']: event.target.value.toString()
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: event.target.value
      }));
    }
  };

  // useEffect(() => {
  //   dispath(setUserData(formik.values));
  // }, [formik.values]);

  return (
    <MainContainer>
      <div className=" my-4 xl:max-w-[1200px] max-w-[calc(100%_-_40px)] relative rounded-[30px] bg-[#01092299] w-full mx-auto bg-white overflow-hidden">
        <Box sx={{ width: '100%' }}>
          <ProgressBar activeStep={activeStep} />
          {signingUrl || loading ? (
            signingUrl ? (
              <div className="w-[90%] mx-auto border-[2px] mb-5">
                <iframe
                  src={signingUrl}
                  width="100%"
                  height="800px"
                  className="mt-4 p-6"
                ></iframe>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2 justify-center items-center h-screen">
                <p className="text-center p-2 w-full max-sm:-ml-1">
                  We are loading contract document. Please do not click
                  anywhere.
                </p>
                <CircularProgress />
              </div>
            )
          ) : activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {Number(activeStep) == 0 && <GetOffer />}
              {Number(activeStep) == 1 && (
                <ContractDetail
                  handleNext={handleNext}
                  formik={formik}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  signature={signature}
                />
              )}
              {Number(activeStep) == 2 && (
                <Success
                  generatePDF={downloadPdf}
                  setShowForm={setShowForm}
                  showForm={showForm}
                  signature={signature}
                  isPDFLoading={isPDFLoading}
                />
              )}
              {Number(activeStep) == 3 && (
                <Congrats
                  generatePDF={downloadPdf}
                  setShowForm={setShowForm}
                  showForm={showForm}
                  signature={signature}
                  isPDFLoading={isPDFLoading}
                />
              )}
              {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button 
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box> */}
            </React.Fragment>
          )}
        </Box>
      </div>
    </MainContainer>
  );
};

export default HorizontalLinearStepper;
