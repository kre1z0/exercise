import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { softGreen, coolGreyTwo } from '../../assets/theme';

const CheckYesIcon = ({ isActive, ...props }) => (
    <SvgIcon {...props} viewBox="0 0 16 16">
        <path
            fill={isActive ? softGreen : coolGreyTwo}
            d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14a6,6,0,1,1,6-6A6,6,0,0,1,8,14Z"
        />
        <path
            fill={isActive ? softGreen : coolGreyTwo}
            d="M9.74,5.73,7.11,8.79l-.9-.9A1,1,0,0,0,4.79,9.31L6.46,11a1,1,0,0,0,.71.29h0a1,1,0,0,0,.72-.35L11.26,7a1,1,0,0,0-1.52-1.3Z"
        />
    </SvgIcon>
);

export default CheckYesIcon;
