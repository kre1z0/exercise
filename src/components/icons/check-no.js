import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { redOrange, coolGreyTwo } from '../../assets/theme';

const CheckNoIcon = ({ isActive, ...props }) => (
    <SvgIcon {...props} viewBox="0 0 16 16">
        <path
            fill={isActive ? redOrange : coolGreyTwo}
            d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14a6,6,0,1,1,6-6A6,6,0,0,1,8,14Z"
        />
        <path
            fill={isActive ? redOrange : coolGreyTwo}
            d="M10.83,5.17a1,1,0,0,0-1.41,0L8,6.59,6.59,5.17A1,1,0,0,0,5.17,6.59L6.59,8,5.17,9.41a1,1,0,1,0,1.41,1.41L8,9.41l1.41,1.41a1,1,0,0,0,1.41-1.41L9.41,8l1.41-1.41A1,1,0,0,0,10.83,5.17Z"
        />
    </SvgIcon>
);

export default CheckNoIcon;
