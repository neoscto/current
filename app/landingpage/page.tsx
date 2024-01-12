"use client";
import React from "react";
import NeosButton from "@/components/NeosButton";
import MainContainer from "@/components/sharedComponents/MainContainer";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import VideoPreview from "../videoPlayer/preview";

const LandingPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <MainContainer>
      <div>
        <div className="block md:hidden lg:hidden relative flex justify-center items-center mt-4 mb-6">
          <VideoPreview
            custonClass={
              "max-h-[330px] h-full z-10 absolute w-[160px] mt-[-10px] z-[1]"
            }
            url={
              "https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4"
            }
          />
          <img
            src="landingpage/iPhone.png"
            alt="NEOS logo"
            className="w-[208px] max-w-full"
          />
        </div>
        <div className="rounded-[30px] bg-[#01092299] max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[970px] w-full mx-auto max-h-[177px] md:max-h-[455px] lg:max-h-[455px] h-full relative md:mt-[4em] lg:mt-[3.5em] lg:mb-[4.9em] md:mb-[4.9em]">
          <div className="grid grid-cols-8 gap-4 h-full">
            <div className="hidden sm:hidden md:block lg:block md:col-span-4 lg:col-span-3 relative">
              <img
                src="landingpage/iPhone.png"
                alt="NEOS logo"
                className="absolute -left-1 sm:-top-[12rem] md:top-[-5em] lg:-top-[5.2em] max-w-full"
              />
              <VideoPreview
                custonClass={
                  "max-h-[600px]  z-10 absolute w-[85%] lg:mt-[-2em] md:mt-[-2em] left-5 h-[520px] sm:mt-[-0.9em] z-[1]"
                }
                url={
                  "https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4"
                }
              />
            </div>
            <div className="col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-5 px-5 md:px-4 lg:px-10 leading-[48px] flex justify-center lg:justify-start items-center pt-5 pb-5 md:mb-24  md:mt-20 lg:mb-24  lg:mt-24">
              <div className=" text-center md:text-left lg:text-left">
                <h6 className="font-bold text-white text-xl md:text-[2em] lg:text-[2.6em] leading-[6px]  md:leading-[46px] lg:leading-[46px]">
                  {t("Home.title")}
                </h6>
                <p className="font-normal text-sm md:text-md lg:text-xl text-white mt-4 md:mt-3.5 lg:mt-3.5 mb-6 md:mb-11 lg:mb-11">
                  {t("Home.description")}
                </p>
                <div className="flex">
                  <NeosButton
                    category="fill"
                    title={t("Home.btn1txt")}
                    onClick={() => router.push("/description")}
                    className="text-[.6em] md:text-[.8em] font-semibold"
                  />
                  <NeosButton
                    category="outline"
                    sx={{ ml: 2 }}
                    title={t("Home.btn2txt")}
                    onClick={() => router.push("/getoffer")}
                    className="text-[.6em] md:text-[.8em] font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default LandingPage;
