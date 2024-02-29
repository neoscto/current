import React from 'react';
import { useTranslation } from 'react-i18next';

const Licensed = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center align-center flex-1 md:flex-none  mx-auto rounded-[30px] bg-[#01092299] lg:px-20 px-5 py-5">
      <div className=" flex flex-col gap-3 lg:gap-7">
        <div className="flex justify-center align-center flex-1 md:flex-none h-12 ">
          <p className="text-base text-white font-medium me-4 lg:me-11 whitespace-nowrap flex items-center">
            {t('Footer.license')}
          </p>
          <div className="flex align-center flex-wrap">
            <img
              src="Footer/CNMC.png"
              alt="Neos logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0"
            />
            <img
              src="Footer/OMIE-removebg-preview.png"
              alt="Neos logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full mx-4 my-2 md:my-0 brightness-0 invert"
            />
            <img
              src="Footer/REE-removebg-preview.png"
              alt="Neos logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0"
            />
          </div>
        </div>
        <div className="flex justify-center align-center flex-1 md:flex-none h-12 ">
          <p className="text-base text-white font-medium me-4 lg:me-11 whitespace-nowrap flex items-center">
            {t('Trusted by')}
          </p>
          <div className="flex align-center flex-wrap">
            <img
              src="investor/investor3.png"
              alt="Neos logo"
              className=" object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0"
            />
            <img
              src="investor/investor1.png"
              alt="Neos logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full mx-4 my-2 md:my-0 brightness-0 invert"
            />
            <img
              src="investor/investor2.png"
              alt="Neos logo"
              className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Licensed;
