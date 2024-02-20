import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import moment from "moment";
import neoslogo from "@/public/neos-logo.png";
import AcceptCookie from "../AcceptCookie";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <AcceptCookie /> */}
      <div className="bg-[#01092299]">
        <div className="xl:max-w-[1200px] w-full xl:px-0 px-5 mx-auto py-5 flex gap-6 flex-col md:flex-row ">
          {/* Left Container */}
          <div className="md:max-w-[calc(33%_-_8px)] max-w-full w-full flex flex-col gap-2 md:items-start items-center">
            <Link
              href="mailto:contact@neosenergy.co"
              className="flex gap-1.5 items-center text-white invert brightness-0"
            >
              <MailOutlineIcon />
              <span>contact@neosenergy.co</span>
            </Link>

            <Link
              href="tel:+34 900 732 890"
              className="flex gap-1.5 items-center invert brightness-0"
            >
              <CallIcon />
              <span>+34 900 732 890</span>
            </Link>

            <span className="text-white font-medium items-center lg:flex hidden">
              {t("Footer.copyright")} {moment(new Date()).format("YYYY")} Neos.{" "}
              {t("Footer.rights")}
            </span>
          </div>

          {/* middle Container */}
          <div className="hidden md:flex justify-center items-center max-w-[calc(33%_-_8px)] w-full">
            <Image
              src={neoslogo}
              alt="NEOS logo"
              width={100}
              className="h-[20px] md:h-auto lg:h-auto -ms-1 md:ms-0 lg:ms-0 cursor-pointer object-contain"
              priority
            />
          </div>

          {/* Right Container */}
          <div className="md:max-w-[calc(33%_-_8px)] w-full flex flex-col gap-2 md:items-end items-center">
            {/* Social media Links */}
            <div className="flex flex-row gap-2">
              <Link
                href="https://www.instagram.com/neos.energy/"
                className="invert brightness-0"
              >
                <InstagramIcon />
              </Link>

              <Link
                href="https://www.linkedin.com/company/neos-energy/"
                className="invert brightness-0"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="https://twitter.com/Neos_Energy"
                className="invert brightness-0"
              >
                <XIcon />
              </Link>
            </div>

            <Link
              href="/privacy-policy"
              className="text-base text-white font-medium"
            >
              {t("Footer.policy")}
            </Link>

            <Link
              href="/terms-of-use"
              className="text-base text-white font-medium"
            >
              {t("Footer.terms")}
            </Link>
          </div>

          <p className="text-white font-medium items-center flex lg:hidden text-center w-auto mx-auto">
            {t("Footer.copyright")} {moment(new Date()).format("YYYY")} Neos.{" "}
            {t("Footer.rights")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
