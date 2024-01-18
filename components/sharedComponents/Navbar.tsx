"use client";
import Link from "next/link";
import Image from "next/image";
import neoslogo from "@/public/neos-logo.png";
import NeosButton from "@/components/NeosButton";
import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import NeosSelect from "../NeosSelect";
import english from "@/public/flags/gb-eng.png";
import portugal from "@/public/flags/pt.png";
import spanish from "@/public/flags/spanish.png";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setLanguage } from "@/features/common/commonSlice";

const Navbar = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const dispath = useDispatch<AppDispatch>();
  const { language }: any = useSelector(
    (state: RootState) => state.commonSlice
  );

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language as string);
    }
  }, [language, i18n.language]);
  return (
    <div className="max-w-[98%] md:max-w-[96%] lg:max-w-[96%] w-full py-4 mx-auto lg:py-6 flex justify-between items-center ">
      <Image
        src={neoslogo}
        alt="NEOS logo"
        width={100}
        className="h-[20px] md:h-auto lg:h-auto -ms-1 md:ms-0 lg:ms-0 cursor-pointer object-contain"
        onClick={() => router.push("/")}
        unoptimized
      />

      <div className="items-center select-container ml-4 md:ml-0 sm:flex">
        <Link
          href="/faq"
          className="font-bold text-xs md:text-xl lg:text-xl text-white ml-0 sm:ml-[15px] mr-[10px]  relative sm:static top-[3px] text-end"
        >
          {t("Home.nav.faqs")}
        </Link>
        <NeosSelect
          className="lg:min-w-[135px] md:min-w-[135px] w-[105px] -ml-1"
          value={language}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            dispath(setLanguage(e.target.value as string));
            i18n.changeLanguage(language as string);
          }}
          defaultValue={language}
        >
          {[
            { name: "Spanish", flag: spanish, value: "es" },
            { name: "English", flag: english, value: "en" },
            { name: "Portuguese", flag: portugal, value: "pt" },
          ].map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              sx={{ display: "flex", fontWeight: "500" }}
            >
              <Image
                src={item.flag}
                alt="NEOS logo"
                className="w-3 h-3 mr-2 "
              />
              {item.name}
            </MenuItem>
          ))}
        </NeosSelect>
      </div>
    </div>
  );
};

export default Navbar;
