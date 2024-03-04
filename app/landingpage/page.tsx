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
                url={'https://player.gotolstoy.com/imcd6drjfnsgh'}
                autoPlay={true}
                muted={true}
                controls={true}
              />
            </div>
          </div>
          <div className="rounded-[30px] bg-[#01092299] max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[970px] w-full mx-auto md:max-h-[455px] lg:max-h-[455px] h-full relative md:mt-[4em] lg:mt-[3.5em] lg:mb-[4.9em] md:mb-[4.9em]">
            <div className="grid grid-cols-8 gap-4 h-full">
              <div className="hidden sm:hidden md:block lg:block md:col-span-4 lg:col-span-3 relative">
                <VideoPreview
                  custonClass={
                    'max-h-[600px]  absolute w-[85%] lg:mt-[-2em] md:mt-[-2em] h-[520px] sm:mt-[-0.9em]  rounded-[20px] overflow-hidden'
                  }
                  url={'https://player.gotolstoy.com/imcd6drjfnsgh'}
                  autoPlay={true}
                  muted={true}
                  controls={true}
                />
              </div>
              <div className=" col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-5 flex justify-center lg:justify-start items-center">
                <div className=" pr-8 p-3 sm:py-0  md:my-12 lg:my-20 text-center md:text-left lg:text-left">
                  <h6 className="font-bold text-white text-xl md:text-2xl lg:text-3xl my-1 ">
                    {t('Pre-Sale Launch!')}
                  </h6>
                  <p className="font-normal ml-2 sm:ml-0 text-left text-sm md:text-base lg:text-xl text-white my-1 ">
                    {t(
                      'We’re thrilled to announce that pre-sales for our virtual solar installations start later this month! Unlock our special launch discount by calculating your savings.'
                    )}
                  </p>
                  <ul className=" ml-5 md:ml-0 font-normal text-left text-sm md:text-md lg:text-xl text-white list-disc my-2">
                    <li>
                      {t(
                        'The cheapest source of electricity, for your home or business.'
                      )}
                    </li>
                    <li>
                      {t(
                        'No installation required: no rooftop panels, no in-home setup.'
                      )}
                    </li>
                    <li>
                      {t(
                        'Instant connection: receive your electricity right away.'
                      )}
                    </li>
                  </ul>
                  <div className="flex my-4">
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
