"use client";
import NeosButton from "@/components/NeosButton";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface UserInfo {
  numberofpeopleAdditionValue?: number;
}

const EmailSuccess = ({ handleNext }: any) => {
  const { userData } = useSelector((state: RootState) => state.commonSlice);
  const displayValue = Number(userData?.numberOfPeople) + 1;

  return (
    <div className="w-[100%] md:w-[80%] lg:w-[50%]  mx-auto flex flex-col justify-center items-center pb-12 px-5">
      <div className="w-12 h-12 relative">
        <Image src="/success.png" alt="user image" fill />
      </div>
      <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5 mt-2">
        Success!
      </h1>
      <label className="ms-2 text-sm font-medium text-[#4F4F4F] text-center ">
        You have received an email to{" "}
        <a
          href="#"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          xxx@gmail.com
        </a>{" "}
        with the steps to sign the contract. Come back here once you’ve signed
        it. You can also view the contract here.
      </label>
      <div className="flex justify-center items-center relative w-full md:w-3/6 mb-8">
        <div className="inline-block">
          <img src="description.png" alt="Description image" />
          <div className="-mt-12 text-center">
            <h1 className="text-lg md:2xl lg:text-3xl font-bold">
              Price to Pay: €{displayValue}
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
          <NeosButton
            category="colored"
            title="SIGN CONTRACT"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSuccess;
