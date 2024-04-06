'use client';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const Content = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="bg-[#01092299] text-white md:max-w-md lg:max-w-2xl w-full p-6 md:p-8 lg:p-12 flex flex-col gap-5 rounded-r-3xl md:rounded-l-none rounded-l-3xl">
      <h1 className="font-bold text-white text-xl md:text-2xl lg:text-3xl md:text-left text-center">
        {t('We Are Live!')}
      </h1>
      <p className="font-normal text-sm md:text-base lg:text-xl   ">
        {t(
          'We are thrilled to announce that sales for our virtual solar installations are live! Calculate your savings and get exclusive access to our first solar parks.'
        )}
      </p>
      <ul className=" ml-3 list-disc font-normal text-sm md:text-base lg:text-xl ">
        <li>
          {t('The cheapest source of electricity, for your home or business.')}
        </li>
        <li>
          {t('No installation required: no rooftop panels, no in-home setup.')}
        </li>
        <li>{t('Instant connection: receive your electricity right away.')}</li>
      </ul>
      {/* for desktop */}
      <div className="hidden md:flex flex-row gap-3 text-xs md:text-sm lg:text-base">
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
      </div>
      {/* for mobile */}
      <div className="flex md:hidden flex-row gap-3 text-3xs sm:text-2xs md:text-sm lg:text-base">
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
      </div>
    </div>
  );
};

export default Content;
