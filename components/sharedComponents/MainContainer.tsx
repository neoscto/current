"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VideoPlayer from "@/app/videoPlayer/page";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const { language } = useSelector((state: RootState) => state.commonSlice);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language as string);
    }
  }, [language, i18n.language]);
  return (
    <div className="landing-page-container w-full flex flex-col min-h-[100vh] relative">
      <Navbar  />
      <div className="flex-1 flex justify-center items-center">{children}</div>
      <div className="mt-12">
        <Footer />
      </div>
      <VideoPlayer />
    </div>
  );
};

export default MainContainer;
