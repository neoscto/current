import React from 'react'
import { useTranslation } from "react-i18next";

const Licensed = () => {

    const { t } = useTranslation();

    return (
        <div className="flex justify-between align-center flex-1 md:flex-none lg:flex-none mx-auto rounded-[30px] bg-[#01092299] lg:px-20 px-5 py-5">
            <p className="text-base text-white font-medium me-4 lg:me-11 whitespace-nowrap flex items-center">
                {t("Footer.license")}
            </p>
            <div className="flex align-center flex-wrap">
                <img
                    src="Footer/CNMC.png"
                    alt="NEOS logo"
                    className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0"
                />
                <img
                    src="Footer/OMIE-removebg-preview.png"
                    alt="NEOS logo"
                    className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full mx-4 my-2 md:my-0 brightness-0 invert"
                />
                <img
                    src="Footer/REE-removebg-preview.png"
                    alt="NEOS logo"
                    className="object-contain max-w-[60px] md:max-w-[80px] lg:max-w-[120px] w-full invert brightness-0"
                />
            </div>
        </div>
    )
}

export default Licensed