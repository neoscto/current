'use client';
import React from 'react';
import MainContainer from '@/components/sharedComponents/MainContainer';
import Licensed from '@/components/Licensed';
import TolstoyHero from './TolstoyHero';
import Content from './Content';
import ScrollingBanner from '@/components/ScrollingBanner';

const LandingPage = () => {
  return (
    <MainContainer>
      <ScrollingBanner />
      <div className=" flex flex-col gap-6 my-8 mx-4 md:mx-8">
        <div className="relative flex flex-col gap-6 md:gap-0 md:flex-row justify-center items-center">
          <TolstoyHero />
          <div className="transform -translate-x-3 pl-2">
            <Content />
          </div>
        </div>
        <Licensed />
      </div>
    </MainContainer>
  );
};

export default LandingPage;
