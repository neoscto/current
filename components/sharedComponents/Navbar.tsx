'use client';
import Link from 'next/link';
import Image from 'next/image';
import neoslogo from '@/public/neos-logo.png';
import NeosButton from '@/components/NeosButton';
import { MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import english from '@/public/flags/gb.svg';
import portugal from '@/public/flags/pt.svg';
import spanish from '@/public/flags/es.svg';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setLanguage } from '@/features/common/commonSlice';
import NeosSelect from '../NeosSelect';

interface NavbarProps {
  isHomepage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isHomepage = false }) => {
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
    <div className={`${isHomepage ? 'mt-9' : ''} xl:max-w-[1200px] px-6 md:px-10 xl:px-0 mx-auto w-full py-4 lg:py-6 flex justify-between items-center`}>
      <Image
        src={neoslogo}
        alt="Neos logo"
        width={0}
        height={0}
        className=" w-24 md:w-32 -ms-1 md:ms-0 lg:ms-0 cursor-pointer object-contain"
        onClick={() => router.push('/')}
        unoptimized
      />

      <div className="items-center select-container gap-x-2 flex">
        <Link
          href="/faq"

          className=" hover:opacity-70 font-bold border-2 border-white rounded-lg text-center text-sm md:text-base  text-white px-3"
          style={{ paddingTop: '0.4rem', paddingBottom: '0.4rem' }}
        >
          {t('Home.nav.faq')}
        </Link>
        <NeosSelect
          className="hover:opacity-70"
          value={language}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            dispath(setLanguage(e.target.value as string));
            i18n.changeLanguage(language as string);
          }}
          defaultValue={language}
        >
          {[
            { name: 'Español', flag: spanish, value: 'es' },
            { name: 'English', flag: english, value: 'en' }
          ].map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              sx={{ display: 'flex', fontWeight: '500' }}
            >
              <Image
                src={item.flag}
                alt="Neos logo"
                width={20}
                className="mr-2 "
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
