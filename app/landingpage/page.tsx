'use client';
import React from 'react';
import MainContainer from '@/components/sharedComponents/MainContainer';
import Licensed from '@/components/Licensed';
import TolstoyHero from './TolstoyHero';
import Content from './Content';

const LandingPage = () => {
  return (
    <MainContainer>
      <div className=" flex flex-col gap-10 my-8 mx-4 md:mx-8">
        <div className=" flex flex-col gap-4 md:gap-0 md:flex-row justify-center items-center">
          <TolstoyHero />
          <Content />
        </div>
        <Licensed />
      </div>
    </MainContainer>
  );
};

export default LandingPage;
