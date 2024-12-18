'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const steps = [
  'Receive Your Offer',
  'Sign Your Contract',
  'Enjoy Solar Energy'
];

const ProgressBar = ({
  activeStep,
  initialForm,
  showForm,
  setShowForm
}: any) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleFormBack = () => {
    if (showForm === 'yourOffer') {
      setShowForm(initialForm);
    } else {
      router.back();
    }
  };

  const [skipped, setSkipped] = useState<Set<number>>(new Set<number>());

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };
  return (
    <div className=" flex flex-row items-center justify-center">
      <span onClick={() => handleFormBack()} className="  ml-2 sm:mx-4">
        <ArrowBackIcon className=" cursor-pointer sm:text-3xl text-2xl" />
      </span>
      <div className="max-w-[630px] w-full mx-auto py-4 sm:py-8">
        <Stepper activeStep={Number(activeStep)}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                key={label}
                {...stepProps}
                sx={{
                  '& .MuiStepLabel-root': {
                    flexDirection: ['column', 'row'],
                    height: '36px',
                    alignItems: 'center'
                  },
                  '@media (max-width: 700px)': {
                    '& .MuiStepLabel-root': {
                      flexDirection: 'column',
                      height: '32px'
                    },
                    '& .MuiStepLabel-label': {
                      marginLeft: '-10px',
                      fontSize: ['10px', '12px']
                    },
                    svg: {
                      paddingLeft: '2px'
                    }
                  },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: '#fff'
                  },
                  '& .MuiStepLabel-label': {
                    color: '#000',
                    fontSize: ['10px', '14px'],
                    fontWeight: 500,
                    marginTop: '4px',
                    textAlign: 'center',
                    marginLeft: '0px'
                  },
                  svg: {
                    width: '30px',
                    height: '30px',

                    color: '#EAEAED'
                  }
                }}
              >
                <StepLabel
                  {...labelProps}
                  className="w-16 sm:w-24 md:w-auto flex item"
                >
                  {t(label)}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    </div>
  );
};

export default ProgressBar;
