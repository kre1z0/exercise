import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { softGreen, coolGreyTwo } from '../../assets/theme';

const CheckComment = ({ isActive, ...props }) => (
    <SvgIcon {...props} viewBox="0 0 16 16">
        <path
            fill={isActive ? softGreen : coolGreyTwo}
            d="M15,0H1A1,1,0,0,0,0,1V12a1,1,0,0,0,1,1h9.67l3.73,2.8A1,1,0,0,0,16,15V1A1,1,0,0,0,15,0ZM14,13l-2.4-1.8A1,1,0,0,0,11,11H2V2H14Z"
        />
        <path
            fill={isActive ? softGreen : coolGreyTwo}
            d="M5,6h6a1,1,0,0,0,0-2H5A1,1,0,0,0,5,6Z"
        />
        <path
            fill={isActive ? softGreen : coolGreyTwo}
            d="M5,9h6a1,1,0,0,0,0-2H5A1,1,0,0,0,5,9Z"
        />
    </SvgIcon>
);

export default CheckComment;
