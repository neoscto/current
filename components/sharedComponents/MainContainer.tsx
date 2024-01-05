"use client";
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import VideoPlayer from '@/app/videoPlayer/page';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="landing-page-container w-full flex flex-col min-h-[100vh] relative">
      <Navbar />
      <div className='flex-1 flex justify-center items-center'>
        {children}
      </div>
      <div className="mt-12">
        <Footer />
      </div>
      <VideoPlayer/>
    </div>
  );
};

export default MainContainer;
