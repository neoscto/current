'use client';
import React from 'react';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { termsAndConditionsData } from './constant';
import parse from 'html-react-parser';

const termsOfUse = () => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Box sx={{ width: '100%' }}>
        <div className="rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white my-8">
          <div className="w-[94%] mx-auto py-6 md:py-9 lg:py-9">
            <Typography
              variant="h4"
              className="text-center !mb-12"
              gutterBottom
            >
              {t('termsAndConditions.title')}
            </Typography>
            <div className=" flex flex-col gap-4">
              {termsAndConditionsData.map((data, index) => (
                <div key={index}>
                  <h1 className=" font-bold text-lg">
                    {' '}
                    {t(`termsAndConditions.subtitle${index}`)}
                  </h1>
                  <p> {parse(t(`termsAndConditions.content${index}`))}</p>
                </div>
              ))}
              {/* <Typography>Coming soon...</Typography> */}
            </div>
          </div>
        </div>
      </Box>
    </MainContainer>
  );
};

export default termsOfUse;
