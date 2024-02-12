// create nextjs component to accept cookie
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NeosButton from './NeosButton';

const AcceptCookie = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookieAccept = localStorage.getItem('cookieAccept');
      if (!cookieAccept) {
        setShow(true);
      }
    }
  }, []);

  const handleAccept = () => {
    setShow(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieAccept', 'true');
    }
  };

  return (
    <>
      {show && (
        <div className="fixed bottom-0 w-full bg-[#000000] text-white p-4 text-center z-10">
          <p>{t('Home.cookie.description')}</p>
          <NeosButton
            className={'px-[24px] py-[14px] text-sm leading-4 font-semibold'}
            category="colored"
            title={t("Home.cookie.acceptBtn")}
            onClick={() => handleAccept()}
          />
        </div>
      )}
    </>
  );
};

export default AcceptCookie;