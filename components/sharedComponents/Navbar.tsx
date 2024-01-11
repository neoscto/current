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

const Navbar = (props: any) => {
  const { setlang, lang } = props;
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang as string);
    }
  }, [lang, i18n.language]);
  return (
    <div className="max-w-[93%]  md:max-w-[88%] lg:max-w-[83%] w-full mx-auto py-4 md: lg:py-6 flex justify-between items-center ">
      <Image
        src={neoslogo}
        alt="NEOS logo"
        width={100}
        className="h-[20px] md:h-auto lg:h-auto -ms-3 md:ms-0 lg:ms-0 cursor-pointer object-contain"
        onClick={() => router.push("/")}
        unoptimized
      />

      <div className="flex items-center select-container">
        <Link
          href="/faq"
          className="font-bold text-xs md:text-xl lg:text-xl text-white mx-6   text-end text-end"
        >
          {t("Home.nav.faqs")}
        </Link>
        <NeosSelect
          className="lg:min-w-[135px] md:min-w-[135px] w-[105px] "
          value={lang}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setlang(e.target.value as string);
          }}
          defaultValue={lang}
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
