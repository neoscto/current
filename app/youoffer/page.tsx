"use client";
import NeosButton from "@/components/NeosButton";
import { CompareOfferList, HowItWorksList } from "@/utils/StaticData";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const YourOffer = ({ handleNext }: any) => {
  const { userData } = useSelector((state: RootState) => state.commonSlice);
  const displayValue = Number(userData?.numberOfPeople) + 1;

  return (
    <div>
      <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white">
        <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center">
          <div className="flex justify-center items-center relative w-full md:w-3/6">
            <div className="inline-block">
              <img src="description.png" alt="Description image" />
              <div className="-mt-12 text-center">
                <h1 className="text-lg md:2xl lg:text-3xl font-bold">
                  Price to Pay: €{displayValue}
                </h1>
                <p className="text-sm md:text-base lg:text-base mt-1 text-[#828282] font-medium mt-0">
                  for 25 years of solar power
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full md:w-3/6">
            <div className="max-w-full md:max-w-[320px] w-full md:ps-5 pt-4 md:pt-0">
              <h1 className="text-lg md:2xl lg:text-3xl font-bold ">
                Your Offer
              </h1>
              <p className="text-sm md:text-base lg:text-base mt-1 text-[#828282] font-medium mt-0">
                {displayValue} Panels (Equivalent to {displayValue}KWp)
                {/* {(displayValue * 3.2).toFixed(2)}KWp) */}
              </p>
              <div className="my-2 md:my-5">
                <p className="text-base text-black font-normal">
                  • €{displayValue} yearly savings (€{displayValue} total
                  savings)
                </p>
                <p className="text-base text-black font-normal my-2 md:my-2.5">
                  • {displayValue} years payback
                </p>
                <p className="text-base text-black font-normal">
                  • {displayValue}% of consumption covered by
                </p>
              </div>
              <NeosButton
                sx={{ width: "100%", mt: 1 }}
                category="colored"
                title="generate contract"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
        <div className="max-w-full lg:max-w-[508px] w-full border border-[#E0E0E0] p-4 my-3 lg:mt-2 rounded-3xl mx-auto lg:mx-0 lg:ml-auto">
          <div className="flex justify-center md:justify-between items-center md:items-start flex-1 flex-col md:flex-row">
            <p className="text-base text-black font-medium me-4 lg:me-11 whitespace-nowrap">
              Licensed by
            </p>
            <div className="flex align-center flex-wrap">
              <img
                src="Footer/CNMC.png"
                alt="NEOS logo"
                className="object-contain w-[45px]"
              />
              <img
                src="Footer/OMIE-removebg-preview.png"
                alt="NEOS logo"
                className="object-contain w-[45px] mx-4"
              />
              <img
                src="Footer/REE-removebg-preview.png"
                alt="NEOS logo"
                className="object-contain w-[100px]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-7">
          <div className="md:w-3/6 border border-[#E0E0E0] rounded-3xl px-4 py-7 md:mr-3">
            <h1 className="text-base md:2xl  font-bold text-center mb-7">
              How it works?
            </h1>
            <ul className="ps-4 work-list-marker">
              {HowItWorksList.map((item, index) => (
                <li key={index} className="text-sm text-black mb-4 list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ms-1 md:w-3/6">
            <div className="w-full border border-[#E0E0E0] rounded-3xl px-4 py-7 mt-5 md:mt-0">
              <h1 className="text-base md:2xl  font-bold text-center mb-7">
                Compare Our Offer
              </h1>
              <ul className="ps-4 work-list-marker">
                {CompareOfferList.map((item, index) => (
                  <li key={index} className="text-sm text-black mb-4 list-disc">
                    {`${displayValue}% ${item}`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center flex-col items-center bg-[#E7F5FA]  rounded-3xl pt-5 mt-5 pb-7 px-5">
              <h1 className="text-base md:2xl  font-bold text-center w-[220px]">
                Review your proposal with your Solar Expert
              </h1>
              <div className="w-12 h-12 relative my-4">
                <Image src="/user_demo.png" alt="user image" fill />
              </div>
              <p className="text-sm font-medium">Sebastian Gonzalez</p>
              <p className="font-normal text-sm">sebastian@solarmente.se</p>
              <NeosButton
                sx={{ mt: 2 }}
                category="colored"
                title="TALK TO YOUE EXPERT"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourOffer;
