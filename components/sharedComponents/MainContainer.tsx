'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';

interface MainContainerProps {
  isHomepage?: boolean;
  children: React.ReactNode;
}

const notRestrictedPages = [
  '/',
  '/description',
  '/getoffer',
  '/faq',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookies',
  '/standardoffer',
  '/personalizedoffer'
];

const MainContainer: React.FC<MainContainerProps> = ({ isHomepage = false, children }) => {
  const { language } = useSelector((state: RootState) => state.commonSlice);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!notRestrictedPages.includes(pathname)) {
      router.push('/');
    }
  }, [pathname]);

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language as string);
    }
  }, [language, i18n.language]);

  return (
    <div className="landing-page-container w-full flex flex-col  min-h-screen relative">
      <Navbar isHomepage={isHomepage} />

      <div className="flex-1 flex justify-center items-center">{children}</div>

      <Footer />
    </div>
  );
};

export default MainContainer;
