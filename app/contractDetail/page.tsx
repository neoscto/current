"use client";
import NeosButton from "@/components/NeosButton";
import React, { useState } from "react";
import EmailSuccess from "../emailSuccess/page";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";

const ContractDetail = ({ handleNext }: any) => {
  const { userData } = useSelector((state: RootState) => state.commonSlice);
  const displayValue = Number(userData?.numberOfPeople) + 1;

  const labelStyle = "font-medium text-base text-black";
  const infoStyle = "text-base font-normal text-[#373737]";

  const [currentView, setCurrentView] = useState(true);
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      {currentView ? (
        <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white">
          <div className="flex flex-col-reverse md:flex-row  justify-center">
            <div className="w-full md:w-3/6 mb-10 md:mb-0">
              <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5">
                Your Details
              </h1>
              <div className="w-full border border-[#E0E0E0] rounded-3xl py-2.5 px-4 md:px-6">
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>First Name</p>
                    <p className={infoStyle}>{userData?.firstName || "-"}</p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>Last Name</p>
                    <p className={infoStyle}>{userData?.lastName || "-"}</p>
                  </div>
                </div>
                {/* Email and phone */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>Email Address</p>
                    <p className={infoStyle}>{userData?.emailAddress || "-"}</p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>Phone Number</p>
                    <p className={infoStyle}>{userData?.phoneNumber || "-"}</p>
                  </div>
                </div>
                {/* cpus */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex">
                  <div className="w-full">
                    <p className={labelStyle}>CUPS</p>
                    <p className={infoStyle}>
                      {
                        // userData?.firstName ||
                        "05"
                      }
                    </p>
                  </div>
                </div>
                {/* Address */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex">
                  <div className="w-full ">
                    <p className={labelStyle}>Address</p>
                    <p className={infoStyle}>
                      {
                        // userData?.firstName ||
                        "2972 Westheimer Rd. Santa Ana, Illinois 85486"
                      }
                    </p>
                  </div>
                </div>
                {/* Post Code and City */}
                <div className="py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>Postcode</p>
                    <p className={infoStyle}>
                      {
                        // userData?.firstName ||
                        "984 493"
                      }
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>City</p>
                    <p className={infoStyle}>
                      {
                        // userData?.firstName ||
                        "New York, USK"
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start my-3.5">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  className="mt-[3px] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  className="ms-2 text-[#4F4F4F]"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  By ticking, you are confirming that you have read, understood
                  and agree <span className="text-[#FD7C7C]"> NEOS </span>
                  <Link
                    href="/termsOfUse"
                    target="_blank"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                  .
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center relative w-full md:w-3/6 pb-10">
              <div className="inline-block md:px-4">
                <img src="description.png" alt="Description image" />
                <div className="-mt-12 text-center">
                  <h1 className="text-lg md:2xl lg:text-3xl font-bold">
                    Price to Pay: €{displayValue}
                  </h1>
                  {/* <div className='inline-flex'>
                                        <input id="link-checkbox" type="checkbox" value="" className="mt-[3px] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  " />
                                        <select id="countries" className="border-0 text-[#4F4F4F] text-sm md:text-base font-medium rounded-lg dark:text-white focus:outline-none ">
                                            <option >Choose a country</option>
                                            <option value="US" selected>Commercialisation Agreement</option>
                                        </select>
                                    </div> */}
                  <div className="block">
                    <NeosButton
                      sx={{ mt: 3 }}
                      category="colored"
                      title="VIEW CONTACT"
                      onClick={() => {
                        const isChecked = document.getElementById(
                          "link-checkbox"
                        ) as HTMLInputElement | null;

                        if (isChecked && isChecked?.checked) {
                          setCurrentView(false);
                        } else {
                          alert("please check terms.");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmailSuccess handleNext={handleNext} />
      )}
    </>
  );
};

export default ContractDetail;
