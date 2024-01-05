"use client";
import NeosButton from "@/components/NeosButton"
import MainContainer from "@/components/sharedComponents/MainContainer"
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter()

  return (
    <MainContainer>
      <div>
        <div className="block md:hidden lg:hidden relative flex justify-center items-center mt-4 mb-6">
          <video src="https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4" controls className="max-h-[300px] h-full z-10 absolute w-[160px]">
          </video>
          <img src='landingpage/iPhone.png' alt="NEOS logo" className="w-[208px] max-w-full" />
        </div>
        <div className="rounded-[30px] bg-[#01092299] max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[970px] w-full mx-auto max-h-[177px] md:max-h-[455px] lg:max-h-[455px] h-full relative md:mt-[10em] lg:mt-[8em]">
          <div className="grid grid-cols-8 gap-4 h-full">
            <div className="hidden sm:hidden md:block lg:block md:col-span-4 lg:col-span-3 relative">
              <img src='landingpage/iPhone.png' alt="NEOS logo" className="absolute -left-1 sm:-top-[12rem] md:-top-[9.4rem] lg:-top-[9.8em] max-w-full" />
              <video src="https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4" controls className="max-h-[600px] h-full z-10 absolute w-[85%] -top-10 left-5">
              </video>
            </div>
            <div className="col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-5 px-5 md:px-4 lg:px-10 leading-[48px] flex justify-center lg:justify-start items-center pt-5 pb-5 md:mb-24  md:mt-20 lg:mb-24  lg:mt-24">
              <div className=" text-center md:text-left lg:text-left">
                <h6 className="font-bold text-white text-xl md:text-[2em] lg:text-[2.6em] leading-[6px]  md:leading-[46px] lg:leading-[46px]">
                  Welcome to the Future
                </h6>
                <p className="font-normal text-sm md:text-md lg:text-xl text-white mt-4 md:mt-3.5 lg:mt-3.5 mb-6 md:mb-11 lg:mb-11">
                  Discover Virtual Solar. No installation. Cheap energy. Instant connection.
                </p>
                <div className="flex">
                  <NeosButton category="fill" title="LEARN MORE" onClick={() => router.push('/description')} />
                  <NeosButton category="outline" sx={{ ml: 2 }} title="GET QUOTE" onClick={() => router.push('/getoffer')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default LandingPage