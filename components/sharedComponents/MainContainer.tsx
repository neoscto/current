"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VideoPlayer from "@/app/videoPlayer/page";
import { useTranslation } from "react-i18next";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const [lang, setlang] = useState("es");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang as string);
    }
  }, [lang, i18n.language]);
  return (
    <div className="landing-page-container w-full flex flex-col min-h-[100vh] relative">
      <Navbar setlang={setlang} lang={lang} />
      <div className="flex-1 flex justify-center items-center">{children}</div>
      <div className="mt-12">
        <Footer />
      </div>
      <VideoPlayer />
    </div>
  );
};

export default MainContainer;
