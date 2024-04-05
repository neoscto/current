'use client';
import { closeModal } from '@/features/modals/previewContractSlice';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import NeosButton from '../NeosButton';
import { PLAN_TYPE } from '@/utils/utils';
import PdfViewer from '../PdfViewer';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { setUserData } from '@/features/common/commonSlice';
import CloseIcon from '@mui/icons-material/Close';

const PreviewContract = () => {
  const { userData } = useSelector((state: any) => state.commonSlice);
  const { open } = useSelector((state: any) => state.previewContractSlice);
  const [isChecked, setIsChecked] = useState(false);
  const [isGeneratingContract, setIsGeneratingContract] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const fileUrl =
    userData.plan === PLAN_TYPE.Neos
      ? './contracts/neos-preview-contract.pdf'
      : './contracts/current-preview-contract.pdf';

  const dispatch = useDispatch();
  const router = useRouter();
  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch(closeModal());
    }, 200);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        userData.plan === PLAN_TYPE.Neos
          ? 'Modelo de Contrato - Instalación Neos y Suministro Neos.pdf'
          : 'Modelo de Contrato - Instalación Neos y Suministro Actual.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => window.URL.revokeObjectURL(url), 0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateContract = async () => {
    if (!userData._id) return router.push('/getoffer');
    if (!isChecked) {
      setError(t('preview-contract.error-msg'));
      return;
    }
    setIsGeneratingContract(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users-offers`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            offerData: {
              user: userData._id,
              totalPanels: userData.totalPanels,
              capacityPerPanel: userData.capacityPerPanel,
              totalCapacity: userData.totalCapacity,
              estimateProduction: userData.estimateProduction,
              totalPayment: userData.totalPayment,
              typeConsumption: userData.typeConsumption,
              plan: userData.plan,
              offerType: userData.offerType,
              clickedOnGenerate: true,
              hasReadContract: true
            },
            offerId: userData.offerId
          })
        }
      );
      const { offer } = await response.json();
      if (offer) {
        dispatch(setUserData({ offerId: offer._id }));
        handleCloseModal();
        router.push('/getoffer?activeStep=1');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGeneratingContract(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200
        }
      }}
    >
      <Fade in={open}>
        <Box className="bg-white absolute top-1/2 left-1/2 w-full md:w-4/5 lg:w-3/5 xl:w-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-black p-4 shadow-xl rounded-lg h-[98%] md:h-[95%]">
          <Box
            className="flex justify-end w-full cursor-pointer"
            onClick={handleCloseModal}
          >
            <CloseIcon className="w-6 h-6" />
          </Box>
          <Box
            className={`overflow-y-auto h-[59%] min-[400px]:h-[63%] lg:h-[67%] flex justify-center items-center overflow-x-auto lg:overflow-x-hidden`}
          >
            <PdfViewer fileUrl={fileUrl} />
          </Box>
          <Box className="my-5 flex items-center justify-center pr-2">
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography className="text-sm">
              {userData.plan === PLAN_TYPE.Neos
                ? t('preview-contract.neos')
                : t('preview-contract.current')}
            </Typography>
          </Box>
          <Typography className="text-red-500 text-sm text-center">
            {error}
          </Typography>
          <Box className="flex justify-center items-center gap-2 mt-4">
            <NeosButton
              id="btn"
              category="colored"
              className={
                'p-3 min-[400px]:p-4 text-[11px] md:text-sm leading-4 font-semibold w-fit'
              }
              buttonsize="lg"
              title={t('preview-contract.download-contract')}
              onClick={handleDownload}
            />
            <NeosButton
              id="btn"
              category="colored"
              className={
                '!bg-[#cccccc] hover:!bg-gray-400 !text-[#666666] p-3 min-[400px]:p-4 text-sm md:text-[14px] leading-4 font-semibold w-fit !border-none'
              }
              buttonsize="lg"
              title={t('preview-contract.generate-my-contract')}
              onClick={handleGenerateContract}
              isLoading={isGeneratingContract}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PreviewContract;
