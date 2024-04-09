'use client';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const Content = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="bg-[#01092299] text-white md:max-w-md lg:max-w-2xl w-full p-6 md:p-8 lg:p-12 flex flex-col gap-5 rounded-r-3xl md:rounded-l-none rounded-l-3xl">
      <h1 className="font-bold text-white text-xl md:text-2xl lg:text-3xl md:text-left text-center">
        {t('Save 75% On Your Electricity Bill Today!')}
      </h1>
      <p className="font-normal text-sm md:text-base lg:text-xl">
        {t(
          'Buy a Virtual Solar Installation and receive electricity generated in our solar parks straight to your home or business, without the need for any on-site installation.'
        )}
      </p>
      <ul className="ml-3 list-disc font-normal text-sm md:text-base lg:text-xl">
        <li>
          {t("Costs less yet generates more electricity than rooftop panels, and cuts your monthly electricity bills by 75% for 25 years.")}
        </li>
        <li>
          {t("You’re already connected to the electrical grid, so you're all set to receive power immediately.")}
        </li>
        <li>{t('You can transfer your Virtual Solar Installation to your loved ones or to other locations at any time.')}</li>
      </ul>
      {/* for desktop */}
      <div className="hidden md:flex flex-row gap-3 text-xs md:text-sm lg:text-base md:ml-3">
        <button
          className="hover:opacity-70 bg-white text-black font-semibold py-3 px-1 md:px-4 rounded-xl"
          onClick={() => router.push('/description')}
          style={{ marginTop: '0.5rem' }}
        >
          {t('Home.btn1txt')}
        </button>
        <button
          className="hover:opacity-70 bg-transparent text-white font-semibold py-3 px-1 md:px-4 rounded-xl border-2 border-white"
          onClick={() => router.push('/getoffer')}
          style={{ marginTop: '0.5rem' }}
        >
          {t('Home.btn2txt')}
        </button>
      </div >
      {/* for mobile */}
      < div className="flex md:hidden flex-row gap-3 text-3xs sm:text-2xs md:text-sm lg:text-base" >
        <button
          className="hover:opacity-70 bg-white text-black font-semibold py-3 px-1 md:px-4 rounded-xl w-full text-center text-xs"
          onClick={() => router.push('/description')}
          style={{ marginTop: '0.5rem' }}
        >
          {t('Home.btn1txt')}
        </button>
        <button
          className="hover:opacity-70 bg-transparent text-white font-semibold py-3 px-1 md:px-4 rounded-xl border-2 border-white w-full text-center text-xs"
          onClick={() => router.push('/getoffer')}
          style={{ marginTop: '0.5rem' }}
        >
          {t('Home.btn2txt')}
        </button>
      </div >
    </div >
  );
};

export default Content;
