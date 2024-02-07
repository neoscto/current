"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import NeosButton from "@/components/NeosButton";
import { useTranslation } from "react-i18next";
import VideoPreview from "@/app/videoPlayer/preview";

const Congrats = ({ generatePDF }: any) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto flex flex-col lg:flex-row pb-14 mt-5">
      <div className="mx-auto flex flex-col justify-center items-center w-full lg:w-3/6">
        <div className="w-12 h-12 relative">
          <Image src="/success.png" alt="user image" fill />
        </div>
        <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5 mt-2">
          {t("congrats.title")}
        </h1>
        <label className="ext-sm font-normal text-[#828282] text-center ">
          {t("congrats.desc1")}
          <br></br>
          {t("congrats.desc2")}
        </label>
        <div className="w-full border border-[#E0E0E0] rounded-xl py-3 px-4 flex justify-between items-center my-7">
          <div className="flex items-center">
            <Image src="/pdfIcon.png" alt="user image" width={34} height={34} />
            <p className="text-sm font-medium text-[#171717] ms-2">
              Solardetails.pdf
            </p>
          </div>
          <NeosButton
            sx={{ width: "140px!important" }}
            category="colored"
            title={t("Email-success.download-txt")}
            onClick={generatePDF}
          />
        </div>
      </div>

      <div className="mx-auto flex justify-center items-center w-full lg:w-3/6">
        <div className="relative w-full lg:h-[347px] max-w-[310px] lg:max-w-[223px] h-[405px] video-container !rounded-3xl overflow-hidden">
          <VideoPreview
            custonClass="lg:max-h-[347px] h-full lg:w-[223px] w-[310px] max-h-[405px]"
            url="https://videos.gotolstoy.com/public/41532226-45a4-45f6-a10f-a313cb492bc8/6c2ed4e4-393f-415d-8c6f-495ee6f13e80/6c2ed4e4-393f-415d-8c6f-495ee6f13e80.mp4"
            controls={false}
            muted
            autoPlay
          />
        </div>
      </div>
    </div>
  );
};

export default Congrats;
