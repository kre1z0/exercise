import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { softGreen, steel } from '../../assets/theme';

const ElectricityIcon = props => (
    <SvgIcon {...props} viewBox="0 0 42 42">
        <path
            fill={softGreen}
            d="M30.86,24.35a1,1,0,0,0-2,0,4,4,0,1,1-8,0,1,1,0,0,0-2,0,6,6,0,0,0,5,5.91v2.09a1,1,0,0,0,2,0V30.26A6,6,0,0,0,30.86,24.35Z"
            transform="translate(-3.86 -3.35)"
        />
        <path
            fill={steel}
            d="M30.86,20.35h-2v-3a1,1,0,0,0-2,0v3h-4v-3a1,1,0,0,0-2,0v3h-2a1,1,0,0,0,0,2h12A1,1,0,0,0,30.86,20.35Z"
            transform="translate(-3.86 -3.35)"
        />
    </SvgIcon>
);

export default ElectricityIcon;
