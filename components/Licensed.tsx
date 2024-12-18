import React from 'react';
import { useTranslation } from 'react-i18next';

const Licensed = () => {
  const { t } = useTranslation();

  return (
    <div className=" grid grid-cols-4 gap-x-2 gap-y-3 md:gap-y-7 mx-auto rounded-[30px] bg-[#01092299] md:px-20 px-5 py-5">
      <div className=" flex justify-center items-center h-8 md:h-11 lg:h-16 ">
        <p className="text-xs md:text-base text-white font-medium whitespace-nowrap text-center mr-1">
          {t('Footer.license')}
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <img
          src="Footer/CNMC.png"
          alt="Neos logo"
          className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0 ml-4"
        />
      </div>
      <div className=" flex justify-center items-center">
        <img
          src="Footer/OMIE-removebg-preview.png"
          alt="Neos logo"
          className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full  brightness-0 invert ml-4"
        />
      </div>
      <div className=" flex justify-center items-center">
        <img
          src="Footer/REE-removebg-preview.png"
          alt="Neos logo"
          className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0 ml-3"
        />
      </div>

      <div className=" flex justify-center items-center h-8 md:h-11 lg:h-16 ">
        <p className="text-xs md:text-base text-white font-medium whitespace-nowrap text-center mr-1">
          {t('Backed by')}
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <img
          src="investor/investor3.png"
          alt="Neos logo"
          className=" object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0 ml-4"
        />
      </div>
      <div className=" flex justify-center items-center">
        <img
          src="investor/investor1.png"
          alt="Neos logo"
          className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full  brightness-0 invert ml-4"
        />
      </div>
      <div className=" flex justify-center items-center">
        <img
          src="investor/investor2.png"
          alt="Neos logo"
          className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0 ml-3"
        />
      </div>
    </div>
  );
};

export default Licensed;
