"use client";
import React from 'react'
import Image from 'next/image'
import NeosButton from '@/components/NeosButton'
import CheckoutForm from '../payment/page';

const Success = ({ generatePDF }: any) => {

    return (
            <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto flex flex-col lg:flex-row pb-14">
                <div className="mx-auto flex flex-col justify-center items-center w-full lg:w-3/6">
                    <div className='w-12 h-12 relative'>
                        <Image src="/success.png" alt="user image" fill />
                    </div>
                    <h1 className="text-lg md:2xl lg:text-3xl font-bold mb-3.5 mt-2">
                        Success!
                    </h1>
                    <label className="ext-sm font-normal text-[#828282] text-center ">
                        You have successfully signed the contract.<br></br>
                        You can download below the signed contract.
                    </label>
                    <div className="w-full border border-[#E0E0E0] rounded-xl py-3 px-4 flex justify-between items-center my-7">
                        <div className='flex items-center'>
                            <Image src="/pdfIcon.png" alt="user image" width={34} height={34} />
                            <p className="text-sm font-medium text-[#171717] ms-2">Solardetails.pdf</p>
                        </div>
                        <NeosButton sx={{ width: "140px!important" }} category="colored" title="DOWNLOAD" onClick={generatePDF} />
                    </div>
                </div>
                <div className="w-full w-6/6 lg:w-3/6 px-0 md:px-9">
                    <div className='p-6'>
                        <CheckoutForm />
                    </div>
                </div>
            </div>
    )
}

export default Success