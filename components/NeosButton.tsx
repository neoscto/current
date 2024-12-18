'use client';
import theme from '@/styles/theme';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

interface ButtonNeosProps {
  category: 'fill' | 'outline' | 'colored';
  sx?: any;
  className?: any;
  title: string;
  onClick?: any;
  type?: any;
  disabled?: any;
  id?: string;
  buttonsize?: 'sm' | 'lg';
  isLoading?: boolean;
}

const getButtonStyles = (category: 'fill' | 'outline' | 'colored') => {
  switch (category) {
    case 'fill':
      return {
        padding: theme.spacing(1.7, 2, 1.7, 2),
        border: `1px solid #fff`,
        color: '#000',
        backgroundColor: `#fff !important`,
        '&:hover': {
          backgroundColor: `#fff !important`,
          opacity: 0.5
        },
        '&:disabled': {
          backgroundColor: '#fff',
          opacity: 0.7
        }
      };
    case 'outline':
      return {
        padding: theme.spacing(1.7, 2, 1.7, 2),
        border: `1px solid #fff`,
        color: '#fff',
        backgroundColor: 'transparent !important',
        '&:hover': {
          opacity: 0.7
        },
        '&:disabled': {
          backgroundColor: '#fff',
          opacity: 0.6
        }
      };
    case 'colored':
      return {
        border: `1px solid ${theme.palette.primary.main}`,
        color: '#fff',
        backgroundColor: `${theme.palette.primary.main} !important`,
        padding: theme.spacing(1.7, 2, 1.7, 2.4),
        '&:hover': {
          backgroundColor: `${theme.palette.primary.dark} !important`
        },
        '&:disabled': {
          border: '1px solid #999999',
          backgroundColor: '#cccccc !important',
          color: '#666666'
        }
      };

    default:
      return {};
  }
};

const DTPrimaryBtn = styled(Button)(
  ({
    category,
    buttonsize
  }: {
    category: 'fill' | 'outline' | 'colored';
    buttonsize?: 'sm' | 'lg';
  }) => ({
    textTransform: 'uppercase',
    fontSize: '1em',
    borderRadius: '0.93em',
    textAlign: 'center',
    fontWeight: 600,
    minWidth:
      buttonsize === 'lg' ? '160px' : buttonsize === 'sm' ? '100px' : '140px',
    ...getButtonStyles(category),
    [theme.breakpoints.down('md')]: {
      fontSize: '.8em',
      padding: '10px',
      width: '100%',
      fontWeight: 500
    }
  })
);

const NeosButton = (props: ButtonNeosProps) => {
  const { category, buttonsize, title, isLoading, ...otherProps } = props;

  return (
    <DTPrimaryBtn category={category} buttonsize={buttonsize} {...otherProps}>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <>
            <CircularProgress
              color="inherit"
              sx={{
                width: '24px !important',
                height: '24px !important'
              }}
            />
          </>
        ) : (
          <span>{title}</span>
        )}
      </div>
    </DTPrimaryBtn>
  );
};

export default NeosButton;
