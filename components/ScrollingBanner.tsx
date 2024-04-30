import React from 'react';
import { useTranslation } from 'react-i18next';

const ScrollingBanner = () => {
    const { t } = useTranslation();
    const message = t('Home.urgencyBanner');
    return (
        <div className="fixed top-0 left-0 right-0 h-10 bg-[#01092299] text-white flex items-center z-50">
            <div className="whitespace-nowrap animate-marquee mx-auto">
                {Array(1000).fill(message).map((item, index) => (
                    <span key={index} style={{ marginRight: '22rem' }}>{item}</span>
                ))}
            </div>
        </div>
    );
};

export default ScrollingBanner;