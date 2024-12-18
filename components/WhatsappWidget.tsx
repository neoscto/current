import { ButtonBase } from '@mui/material';
import Image from 'next/image';

const WhatsappWidget = () => {
  return (
    <div className="fixed right-2 bottom-2 z-20">
      <ButtonBase
        component="a"
        href="https://wa.me/34637181832"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/whatsapp.png"
          alt="Whatsapp Logo"
          width={70}
          height={70}
          className="object-contain"
        />
      </ButtonBase>
    </div>
  );
};

export default WhatsappWidget;
