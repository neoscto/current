"use client";
import Link from "next/link";
import Image from "next/image";
import neoslogo from "@/public/neos-logo.png";
import NeosButton from "@/components/NeosButton";
import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import NeosSelect from "../NeosSelect";
import english from "@/public/flags/gb-eng.svg";
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
    <div className="xl:max-w-[1200px] px-6 md:px-10 xl:px-0 mx-auto w-full py-4 lg:py-6 flex justify-between items-center ">
      <Image
        src={neoslogo}
        alt="NEOS logo"
        width={0}
        height={0}
        className=" w-24 md:w-32 -ms-1 md:ms-0 lg:ms-0 cursor-pointer object-contain"
        onClick={() => router.push("/")}
        unoptimized
      />

      <div className="items-center select-container ml-4 md:ml-0 sm:flex flex">
        <Link
          href="/faq"
          className="font-bold border-[1px] rounded-[10px] text-center text-lg md:text-xl lg:text-xl text-white ml-0 sm:ml-[15px] mr-[10px] md:mr-[16px] px-4 py-1 relative sm:static"
        >
          {t("Home.nav.faqs")}
        </Link>
        <NeosSelect
          className="  -ml-1 mx-1"
          value={language}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            dispath(setLanguage(e.target.value as string));
            i18n.changeLanguage(language as string);
          }}
          defaultValue={language}
        >
          {[
            { name: "Spanish", flag: "🇪🇸", value: "es" },
            { name: "English", flag: "🇬🇧", value: "en" },
            { name: "Portuguese", flag: "🇵🇹", value: "pt" },
          ].map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              sx={{ display: "flex", fontWeight: "500" }}
            >
              <Image
                src={item.flag}
                alt="NEOS logo"
                width={20}
                className="mr-2 "
                objectFit="contain"
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
