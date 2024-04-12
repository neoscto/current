'use client';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const Content = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="bg-[#01092299] text-white md:max-w-md lg:max-w-2xl w-full p-6 md:p-8 lg:p-12 flex flex-col gap-5 rounded-r-3xl md:rounded-l-none rounded-l-3xl">
      <h1 className="font-bold text-white text-lg md:text-2xl lg:text-3xl md:text-left text-center">
        {t('Save 75% on Electricity with Neos Virtual Solar!')}
      </h1>
      <p className="font-normal text-base md:text-base lg:text-xl">
        {t(
          "Calculate how much you would save if you had a Virtual Solar Installation that delivers electricity from a solar park directly to your home or business."
        )}
      </p>
      <ul className="ml-3 list-disc font-normal text-base md:text-base lg:text-xl">
        <li>
          {t("It costs less yet generates more electricity than rooftop panels.")}
        </li>
        <li>
          {t("It doesn't require a physical installation at your location, so you can start receiving clean energy today.")}
        </li>
        <li>{t('You can assign your Virtual Solar Installation to your loved ones or to other locations at any time.')}</li>
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
          className="hover:opacity-70 bg-white text-black font-semibold py-3 px-1 md:px-4 rounded-xl"
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
          className="hover:opacity-70 bg-white text-black font-semibold py-3 px-1 md:px-4 rounded-xl w-full text-center text-xs"
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
