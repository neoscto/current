'use client';
import React from 'react';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { Box, Typography } from '@mui/material';

const cookies = () => {
  return (
    <MainContainer>
      <Box sx={{ width: '100%' }}>
        <div className="rounded-[30px] bg-[#01092299] max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white">
          <div className="w-[94%] mx-auto py-6 md:py-9 lg:py-9">
            <Typography variant="h4" className="text-center" gutterBottom>
              Cookies
            </Typography>
            <div
              className="scroll-bar"
              style={{
                height: '49vh',
                // overflowY: "scroll",
                paddingRight: '0.4rem'
              }}
            >
              Coming soon...
            </div>
          </div>
        </div>
      </Box>
    </MainContainer>
  );
};

export default cookies;
