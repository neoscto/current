import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="px-4 md:px-18 lg:px-28 py-4  flex justify-between align-center bg-white">
        {/* <Image src={neoslogo} alt="NEOS logo" width={100} /> */}
        <Link
          href="/faq"
          className="text-black font-medium  hidden md:flex items-center me-3"
        >
          {t("Footer.copyright")} 2023 Neos
        </Link>
        <div className="flex justify-between align-center flex-1 md:flex-none lg:flex-none">
          <p className="text-base text-black font-medium me-4 lg:me-11 whitespace-nowrap flex items-center">
            {t("Footer.license")}
          </p>
          <div className="flex align-center flex-wrap">
            <img
              src="Footer/CNMC.png"
              alt="NEOS logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full"
            />
            <img
              src="Footer/OMIE-removebg-preview.png"
              alt="NEOS logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full mx-4 my-2 md:my-0"
            />
            <img
              src="Footer/REE-removebg-preview.png"
              alt="NEOS logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Link
            href="/privacyPolicy"
            className="text-base text-black font-medium  hidden md:block lg:block md:mx-2 lg:mx-5"
          >
            {t("Footer.policy")}
          </Link>
          <Link
            href="/termsOfUse"
            className="text-base text-black font-medium  hidden md:block lg:block"
          >
            {t("Footer.terms")}
          </Link>
        </div>
      </div>
      <div className="px-4 md:px-18 lg:px-28 py-4 flex justify-between align-center bg-white block md:hidden lg:hidden border-t-2 border-inherit">
        <Link href="/faq" className="text-base text-black font-medium">
          {t("Footer.copyright")} 2023 Neos
        </Link>
        <Link
          href="/termsOfUse"
          className="text-base text-black font-medium mx-3"
        >
          {t("Footer.terms")}
        </Link>
        <Link
          href="/privacyPolicy"
          className="text-base text-black font-medium"
        >
          {" "}
          {t("Footer.policy")}
        </Link>
      </div>
    </>
  );
};

export default Footer;
