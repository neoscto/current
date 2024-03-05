'use client';
import React from 'react';
import NeosButton from '@/components/NeosButton';
import MainContainer from '@/components/sharedComponents/MainContainer';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import VideoPreview from '../videoPlayer/preview';
import Licensed from '@/components/Licensed';
import Trusted from '@/components/Trusted';

const VIDEO_URL =
  'https://videos.gotolstoy.com/public/1a4a4880-dbaf-4a4c-91da-c0ae18ec5f3f/473c2922-a01d-4ec3-8c9e-64f88b6d9dd5/473c2922-a01d-4ec3-8c9e-64f88b6d9dd5.mp4';

// components/TolstoyHero.js

const TolstoyHero = () => {
  return (
    <>
      {/* <div
        id="tolstoy-container"
        className="max-h-[600px]  absolute w-[85%] lg:mt-[-2em] md:mt-[-2em] h-[520px] sm:mt-[-0.9em]  rounded-[20px] overflow-hidden"
        // style={{
        //   lineHeight: 0,
        //   overflow: 'hidden',
        //   height: '100%',
        //   width: '100%',
        //   textAlign: 'center'
        // }}
      > */}
      <iframe
        id="tolstoy"
        src="https://player.gotolstoy.com/k71mlzqzwrqzo?host"
        style={{ width: '100%', height: '540px', maxWidth: '960px' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay *; clipboard-write *;camera *; microphone *; encrypted-media *; fullscreen *; display-capture *;"
      ></iframe>
      <script src="https://widget.gotolstoy.com/script.js" defer></script>
      {/* </div> */}
    </>
  );
};

const LandingPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <MainContainer>
      <div className="flex flex-col gap-5  mt-12 mb-4 md:mb-12">
        <div>
          <div className=" mt-4">
            <div className=" md:hidden lg:hidden relative flex justify-center items-center mb-6 h-[540px] max-w-[310px] w-[85%] rounded-[20px] overflow-hidden bg-white mx-auto">
              <div className="   w-full h-full  rounded-[20px] overflow-hidden">
                <TolstoyHero />
              </div>
            </div>
          </div>
          <div className="rounded-[30px] bg-[#01092299] max-w-[90%] sm:max-w-[600px] md:max-w-[90%] lg:max-w-[970px] w-full mx-auto md:max-h-[480px] lg:max-h-[455px] h-full relative md:mt-[4em] lg:mt-[3.5em] lg:mb-[4.9em] md:mb-[4.9em]">
            <div className="grid grid-cols-8 gap-4 h-full">
              <div className="hidden sm:hidden md:block lg:block md:col-span-4 lg:col-span-3 relative">
                <div className="max-h-[600px]  absolute w-[85%] lg:mt-[-2em] md:mt-[-2em] h-[520px] sm:mt-[-0.9em]  rounded-[20px] overflow-hidden">
                  <TolstoyHero />
                </div>
              </div>
              <div className=" col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-5 flex justify-center lg:justify-start items-center">
                <div className="  p-3 sm:py-0 my-4  md:my-12 lg:my-16 text-center md:text-left lg:text-left">
                  <h6 className="font-bold text-white text-xl md:text-2xl lg:text-3xl my-4 md:my-2 ">
                    {t('Pre-Sale Launch!')}
                  </h6>
                  <div className=" my-6">
                    <p className="font-normal ml-2 sm:ml-0 text-left text-sm md:text-base lg:text-xl text-white md:my-1 ">
                      {t(
                        'We’re thrilled to announce that pre-sales for our virtual solar installations start later this month! Unlock our special launch discount by calculating your savings.'
                      )}
                    </p>
                    <ul className=" ml-5 md:ml-3 font-normal text-left text-sm md:text-md lg:text-xl text-white list-disc my-2">
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
                  </div>
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
