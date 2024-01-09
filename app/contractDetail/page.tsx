"use client";
import NeosButton from "@/components/NeosButton";
import React, { useEffect } from "react";
import EmailSuccess from "../emailSuccess/page";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { setFormBack } from "@/features/common/commonSlice";

const ContractDetail = ({ handleNext, formik, showForm, setShowForm }: any) => {
  const displayValue = Number(formik?.values?.numberOfPeople) + 1;
  const dispatch = useDispatch();

  const labelStyle = "font-medium text-base text-black";
  const infoStyle = "text-base font-normal text-[#373737]";
  // const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setShowForm("yourDetails");
  }, []);
  return (
    <>
      {showForm === "yourDetails" ? (
        <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto bg-white">
          <div className="flex flex-col-reverse md:flex-row  justify-center">
            <div className="w-full md:w-3/6 mb-10 md:mb-0">
              <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5">
                {t("Details.title")}
              </h1>
              <div className="w-full border border-[#E0E0E0] rounded-3xl py-2.5 px-4 md:px-6">
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>
                      {t("Get-offer-form.first-name")}
                    </p>
                    <p className={infoStyle}>
                      {formik?.values?.firstName || "-"}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>
                      {t("Get-offer-form.last-name")}
                    </p>
                    <p className={infoStyle}>
                      {formik?.values?.lastName || "-"}
                    </p>
                  </div>
                </div>
                {/* Email and phone */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex flex-col md:flex-row">
                  <div className="w-full md:w-3/5">
                    <p className={labelStyle}>{t("Get-offer-form.email")}</p>
                    <p className={infoStyle}>
                      {formik?.values?.emailAddress || "-"}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>{t("Get-offer-form.phone")}</p>
                    <p className={infoStyle}>
                      {formik?.values?.phoneNumber || "-"}
                    </p>
                  </div>
                </div>
                {/* cpus */}
                <div className="border-b border-[#E0E0E0] py-3.5 flex">
                  <div className="w-full">
                    <p className={labelStyle}>{t("Get-offer-form.cups")}</p>
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
                    <p className={labelStyle}>{t("Get-offer-form.address")}</p>
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
                    <p className={labelStyle}>{t("Get-offer-form.postcode")}</p>
                    <p className={infoStyle}>
                      {
                        // userData?.firstName ||
                        "984 493"
                      }
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 border-t border-[#E0E0E0] mt-2.5 pt-2.5 md:border-t-0 md:mt-0 md:pt-0">
                    <p className={labelStyle}>{t("Get-offer-form.city")}</p>
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
                  {t("Get-offer-form.form-t&c")}
                  <span className="text-[#FD7C7C]"> NEOS </span>
                  <Link
                    href="/termsOfUse"
                    target="_blank"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {t("Get-offer-form.form-t&c-txt")}
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
                    {t("Your-offer.title")}: €{displayValue}
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
                      title={t("Get-offer-form.view-contract-txt")}
                      onClick={() => {
                        const isChecked = document.getElementById(
                          "link-checkbox"
                        ) as HTMLInputElement | null;

                        if (isChecked && isChecked?.checked) {
                          setShowForm("emailSuccess");
                          dispatch(setFormBack("emailDetails"));
                        } else {
                          alert(t("Details.alert"));
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
        ""
      )}
      {showForm === "emailSuccess" ? (
        <EmailSuccess handleNext={handleNext} formik={formik} />
      ) : (
        ""
      )}
    </>
  );
};

export default ContractDetail;
