'use client';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { Box, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { privacyPolicyData } from './constant';

const cookies = () => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Box sx={{ width: '100%' }}>
        <div className="rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white my-10">
          <div className="w-[94%] mx-auto py-6 md:py-9 lg:py-9">
            <Typography variant="h4" className="text-center" gutterBottom>
              {t('cookies.title')}
            </Typography>
            <div className=" flex flex-col gap-4">
              {privacyPolicyData.map((data, index) => (
                <div key={index}>
                  <h1 className="font-bold text-lg">
                    {t(`privacyPolicy.subtitle${index}`)}
                  </h1>
                  {t(`privacyPolicy.content${index}`) && (
                    <p> {parse(t(`privacyPolicy.content${index}`))}</p>
                  )}
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

export default cookies;
