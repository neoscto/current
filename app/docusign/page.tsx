"use client";
import NeosButton from "@/components/NeosButton";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { saveDataToSessionStorage } from "@/utils/utils";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface OfferData {
  numberOfPeople: string;
  cups: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  numberofpeopleAdditionValue: number;
}
const EmailSuccess = ({}: any) => {
  const displayValue = 3;
  const { t } = useTranslation();
  const router = useRouter();
  const handleNext = () => {
    window.parent.postMessage("changeRoute", "*");
  };
  const searchParams = useSearchParams();
  const event = searchParams.get("event");

  const gotToHomePage = () => {
    window.parent.postMessage("gotToHomePage", "*");
  };
  const [offerData, setOfferData] = useState<OfferData | undefined>(undefined);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        isLoading(true);
        const offerId = searchParams.get("offer");
        if (!offerId) {
          throw new Error(`Offer not found!`);
        }
        const response = await fetch(`/api/users-offers/${offerId}`);

        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }

        const data = await response.json();
        setOfferData(data.data);
        saveDataToSessionStorage("UserOffer", data.data);
      } catch (error) {
        // Handling any errors that occurred during the fetch
        console.error("Error fetching data:", error);
      } finally {
        isLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-[100%] md:w-[80%] lg:w-[50%]  mx-auto flex flex-col justify-center items-center pb-12 px-5">
      <div className="w-12 h-12 relative">
        {/* <Image src="/success.png" alt="user image" fill /> */}
        {event === "signing_complete" ? (
          <Image src="/success.png" alt="user image" fill />
        ) : (
          <Image src="/stop.png" alt="user image" fill />
        )}
      </div>
      <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5">
        {event === "signing_complete"
          ? t("Email-success.title")
          : t("Email-failed.title")}
      </h1>
      <label className="ms-2 text-sm font-medium text-[#4F4F4F] text-center ">
        {event === "signing_complete"
          ? t("Email-success.send-email-txt1") || " "
          : t("Email-failed.send-email-txt1") || " "}
        <a
          href="#"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          {offerData?.emailAddress || ""}
        </a>{" "}
        {t("Email-success.send-email-txt2")}
      </label>
      <div className="flex justify-center items-center relative w-full md:w-3/6 mb-8">
        <div className="inline-block">
          <img src="description.png" alt="Description image" />
          <div className="-mt-12 text-center">
            <h1 className="text-lg md:2xl lg:text-3xl font-bold">
              {t("Your-offer.title")}: €
              {Number(
                offerData?.numberOfPeople
                  ? offerData?.numberOfPeople
                  : offerData?.cups
              ) + 1}
            </h1>
            {/* <p className="text-sm md:text-base lg:text-base mt-1 text-[#4F4F4F] font-medium mt-0">
                            With Commercialisation Agreement
                        </p> */}
          </div>
        </div>
      </div>
      <div className="w-full border border-[#E0E0E0] rounded-xl py-3 px-5 flex justify-between flex-col md:flex-row items-center ">
        <div className="flex items-center">
          <Image src="/pdfIcon.png" alt="user image" width={34} height={34} />
          <p className="text-sm font-medium text-[#171717] ms-2">
            Solardetails.pdf
          </p>
        </div>
        <div className="w-full md:w-fit mt-4 md:mt-0">
          {event === "signing_complete" ? (
            <NeosButton
              category="colored"
              title={t("Email-success.sign-contract-txt")}
              onClick={() => handleNext()}
            />
          ) : (
            <NeosButton
              category="colored"
              title={t("Email-failed.sign-contract-txt")}
              onClick={() => gotToHomePage()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSuccess;
