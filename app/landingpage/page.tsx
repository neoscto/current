'use client';
import React from 'react';
import NeosButton from '@/components/NeosButton';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import VideoPreview from '../videoPlayer/preview';
import Licensed from '@/components/Licensed';
import Trusted from '@/components/Trusted';

const LandingPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <MainContainer>
      <div className="flex flex-col gap-5  mt-12 mb-4 md:mb-12">
        <div>
          <div className=" mt-4">
            <div className=" md:hidden lg:hidden relative flex justify-center items-center mb-6 h-[420px] w-[260px] mt-[-10px] rounded-[12px] overflow-hidden bg-white mx-auto">
              <VideoPreview
                custonClass={
                  'max-h-[420px] h-full z-10 relative w-[260px]  z-[1]'
                }
                url={
                  'https://videos.gotolstoy.com/public/1a4a4880-dbaf-4a4c-91da-c0ae18ec5f3f/42c8eefc-851b-4b4f-8cf5-6a136a084a5d/42c8eefc-851b-4b4f-8cf5-6a136a084a5d.mp4'
                }
                autoPlay={true}
                muted={true}
                controls={true}
              />
            </div>
          </div>
          <div className="rounded-[30px] bg-[#01092299] max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[970px] w-full mx-auto max-h-[177px] md:max-h-[455px] lg:max-h-[455px] h-full relative md:mt-[4em] lg:mt-[3.5em] lg:mb-[4.9em] md:mb-[4.9em]">
            <div className="grid grid-cols-8 gap-4 h-full">
              <div className="hidden sm:hidden md:block lg:block md:col-span-4 lg:col-span-3 relative">
                <VideoPreview
                  custonClass={
                    'max-h-[600px]  absolute w-[85%] lg:mt-[-2em] md:mt-[-2em] h-[520px] sm:mt-[-0.9em]  rounded-[20px] overflow-hidden'
                  }
                  url={
                    'https://videos.gotolstoy.com/public/1a4a4880-dbaf-4a4c-91da-c0ae18ec5f3f/42c8eefc-851b-4b4f-8cf5-6a136a084a5d/42c8eefc-851b-4b4f-8cf5-6a136a084a5d.mp4'
                  }
                  autoPlay={true}
                  muted={true}
                  controls={true}
                />
              </div>
              <div className="  col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-5 px-5 md:px-4 lg:px-10 leading-[48px] flex justify-center lg:justify-start items-center py-6 md:mb-24  md:mt-20 lg:mb-24  lg:mt-24">
                <div className=" text-center md:text-left lg:text-left">
                  <h6 className="font-bold text-white text-xl md:text-[2em] lg:text-[2.6em] leading-[6px]  md:leading-[46px] lg:leading-[46px]">
                    {t('Home.title')}
                  </h6>
                  <p className="font-normal text-sm md:text-md lg:text-xl text-white mt-4 md:mt-3.5 lg:mt-3.5 mb-6 md:mb-11 lg:mb-11">
                    {t('Home.description')}
                  </p>
                  <div className="flex whitespace-nowrap md:whitespace-normal">
                    <NeosButton
                      category="fill"
                      title={t('Home.btn1txt')}
                      onClick={() => router.push('/description')}
                      className="text-[.5em] md:text-[.8em] font-semibold"
                    />
                    <NeosButton
                      category="outline"
                      sx={{ ml: 2 }}
                      title={t('Home.btn2txt')}
                      onClick={() => router.push('/getoffer')}
                      className="text-[.5em] md:text-[.8em] font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Licensed />
        {/* <Trusted /> */}
      </div>
    </MainContainer>
  );
};

export default LandingPage;
