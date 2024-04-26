'use client';
import Congrats from '@/components/Congrats';
import ProgressBar from '@/components/ProgressBar';
import PersonalizedForm from '@/components/forms/PersonalizedForm';
import MainContainer from '@/components/sharedComponents/MainContainer';
import useDocusignService from '@/hooks/useDocusign';
import useHandleForm from '@/hooks/useHandleForm';
import { saveDataToSessionStorage } from '@/utils/utils';
import { detailFormSchema } from '@/utils/validations/offers.validation';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import ContractDetail from '../contractDetail/page';
import Success from '../success/page';

const steps = [
  'Receive Your Offer',
  'Sign Your Contract',
  'Enjoy Solar Energy'
];

interface FormData {
  // numberOfPeople: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dialCode: string;
  // numberofpeopleAdditionValue: number;
}

const HorizontalLinearStepper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStep = searchParams.get('activeStep') || 0;

  const formikInitialValues = {
    // offerType: '',
    // numberOfPeople: '',
    cups: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    dialCode: '34',
    // numberofpeopleAdditionValue: 1,
    nie: '',
    address: '',
    addressNo: '',
    city: '',
    province: '',
    country: '',
    postcode: '',
    iban: '',
    bic: ''
  };
  const [showForm, setShowForm] = useState<string>('allOffers');

  const [formik, isLoading]: any = useHandleForm({
    method: 'POST',
    apiEndpoint: '/api/users-offers',
    formikInitialValues,
    validationSchema: detailFormSchema,
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
        window.location.href = '/personalizedoffer?activeStep=2';
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

  return (
    <MainContainer>
      <div className=" my-4 xl:max-w-[1200px] max-w-[calc(100%_-_40px)] relative rounded-[30px] bg-[#01092299] w-full mx-auto bg-white overflow-hidden">
        <Box sx={{ width: '100%' }}>
          <ProgressBar activeStep={activeStep} setShowForm={setShowForm} />
          {signingUrl || loading ? (
            signingUrl ? (
              <div className="w-[90%] mx-auto border-[2px] mb-5 mt-[60px] md:mt-0">
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
                  We are loading your personalized contract. Please do not click
                  anywhere else.
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
              {Number(activeStep) == 0 && <PersonalizedForm />}
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
