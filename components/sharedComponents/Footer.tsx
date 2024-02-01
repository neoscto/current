import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white">

      <div className="xl:max-w-[1200px] w-full xl:px-0 px-5 mx-auto py-5 flex gap-4 flex-col md:flex-row ">

        {/* Left Container */}
        <div className="md:max-w-[calc(50%_-_8px)] max-w-full w-full flex flex-col gap-2 md:items-start items-center">
          <Link href='mailto:contact@neosenergy.co' className="flex gap-1.5 items-center">
            <MailOutlineIcon />
            <span>contact@neosenergy.co</span>
          </Link>

          <Link href='tel:+34 900 732 890' className="flex gap-1.5 items-center">
            <CallIcon />
            <span>+34 900 732 890</span>
          </Link>

          <Link href="/faq" className="text-black font-medium items-center me-3">
            {t("Footer.copyright")} 2023 Neos
          </Link>
        </div>

        {/* Right Container */}
        <div className="md:max-w-[calc(50%_-_8px)] w-full flex flex-col gap-2 md:items-end items-center">

          {/* Social media Links */}
          <div className="flex flex-row gap-2">
            <Link href='#'>
              <InstagramIcon />
            </Link>

            <Link href='#'>
              <LinkedInIcon />
            </Link>
            <Link href='#'>
              <XIcon />
            </Link>
          </div>

          <Link
            href="/privacyPolicy"
            className="text-base text-black font-medium"
          >
            {t("Footer.policy")}
          </Link>

          <Link
            href="/termsOfUse"
            className="text-base text-black font-medium"
          >
            {t("Footer.terms")}
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Footer;
