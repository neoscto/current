import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import React from 'react';

const SelectBox = styled(Select)(() => ({
  color: '#333333',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#fff',
  textTransform: 'capitalize',
  fontFamily: 'inherit',
  fontWeight: 700,

  '& .custom-input-class': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '16px !important'
  },
  svg: {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',

    height: '36px'
  }
}));

interface NeosSelectProps {}

const NeosSelect = (props: any) => {
  const { value, defaultValue, ...otherProps } = props;
  return (
    <FormControl
      size="small"
      variant="outlined"
      sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
    >
      <SelectBox
        {...otherProps}
        value={value}
        defaultValue={defaultValue}
        inputProps={{
          className: 'custom-input-class'
        }}
        MenuProps={{
          sx: {
            fontSize: '14px',

            '&& .MuiList-root': {
              backgroundColor: '#fff',
              fontSize: '14px',
              color: '#000'
            },
            '&& .MuiMenuItem-root:hover': {
              backgroundColor: '#febfbf',
              color: '#fff'
            },
            '&& .MuiMenuItem-root': {
              fontSize: '14px',
              padding: '14px'
            },
            '&& .Mui-selected': {
              backgroundColor: '#FD7C7C !important',
              color: '#fff',
              fontSize: '14px'
            },
            '&& .Mui-selected:hover': {
              backgroundColor: '#FD7C7C',
              color: '#fff',
              opacity: 1,
              fontSize: '14px'
            },
            '&& .css-6hp17o-MuiList-root-MuiMenu-list': {
              paddingTop: 0,
              paddingBottom: 0
            }
          }
        }}
      >
        {props.children}
      </SelectBox>
    </FormControl>
  );
};
export default NeosSelect;
