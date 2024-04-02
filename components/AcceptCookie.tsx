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

  const handleReject = () => {
    setShow(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieAccept', 'false');
    }
  };

  return (
    <>
      {show && (
        <div className="fixed bottom-0 w-full bg-white bg-opacity-75 border-t border-gray-300 p-2 flex items-center justify-center text-sm">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-blue-900">{t('Home.cookie.description')}</p>
            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={handleAccept}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                {t('Home.cookie.acceptBtn')}
              </button>
              <button
                onClick={handleReject}
                className="bg-transparent text-black px-4 py-2 rounded hover:bg-gray-200 focus:outline-none shadow"
              >
                {t('Home.cookie.rejectBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptCookie;
