"use client";
import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import { styled, Theme } from '@mui/system';
import theme from '@/styles/theme';

interface ButtonNeosProps {
    category: 'fill' | 'outline' | 'colored';
    sx?: any;
    className?: any;
    title: string;
    onClick?:any;
    type?:any;
    disabled?:any;
    id?: string
}

const getButtonStyles = (category: 'fill' | 'outline' | 'colored') => {
    switch (category) {
        case 'fill':
            return {
                padding: theme.spacing(1.7, 2, 1.7, 2),
                border: `1px solid #fff`,
                color: "#000",
                backgroundColor: `#fff!important`,
                '&:hover': {
                    backgroundColor: `#fff!important`,
                    opacity: .5
                },
                "&:disabled": {
                    backgroundColor: '#fff',
                    opacity: .7
                },

            };
        case 'outline':
            return {
                padding: theme.spacing(1.7, 2, 1.7, 2),
                border: `1px solid #fff`,
                color: '#fff',
                backgroundColor: 'transparent!important',
                '&:hover': {
                    opacity: .7
                },
                "&:disabled": {
                    backgroundColor: '#fff',
                    opacity: .6
                },
            };
        case 'colored':
            return {
                border: `1px solid ${theme.palette.primary.main}`,
                color: '#fff',
                backgroundColor: `${theme.palette.primary.main}!important`,
                padding: theme.spacing(1.7, 2, 1.7, 2.4),
                '&:hover': {
                    backgroundColor: `${theme.palette.primary.dark}!important`,
                },
                "&:disabled": {
                    backgroundColor: theme.palette.primary.light,
                },
            };
        default:
            return {};
    }
};



const DTPrimaryBtn = styled(Button)(({ category }: { category: 'fill' | 'outline' | 'colored' }) => ({
    textTransform: 'uppercase',
    fontSize: '1em',
    borderRadius: '0.93em',
    textAlign: 'center',
    fontWeight:600,
    ...getButtonStyles(category),
    [theme.breakpoints.down('md')]: {
        fontSize: '.8em',
        padding: "10px",
        width: "100%",
    fontWeight:500,
    },
}));

const NeosButton = (props: ButtonNeosProps) => {
    const { category, title, ...otherProps } = props;

    return (
        <DTPrimaryBtn category={category} {...otherProps}>
            {title}
        </DTPrimaryBtn>
    );
};

export default NeosButton;
