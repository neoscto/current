"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import NeosButton from "@/components/NeosButton";
import { useTranslation } from "react-i18next";

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
    </div>
  );
};

export default Congrats;
