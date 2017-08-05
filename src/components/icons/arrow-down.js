import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { coolGreyTwo } from '../../assets/theme';

const ArrowDown = ({ ...props }) => (
    <SvgIcon {...props} viewBox="0 0 10 6">
        <path
            fill={coolGreyTwo}
            d="M12.63,5a1,1,0,0,0-1.41,0L7.93,8.29,4.63,5A1,1,0,0,0,3.22,6.41l4,4a1,1,0,0,0,1.41,0l4-4A1,1,0,0,0,12.63,5Z"
            transform="translate(-2.93 -4.7)"
        />
    </SvgIcon>
);

export default ArrowDown;
