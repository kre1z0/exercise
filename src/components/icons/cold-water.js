import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { softGreen, steel } from '../../assets/theme';

const ColdWaterIcon = props => (
    <SvgIcon {...props} viewBox="0 0 42 42">
        <path
            fill={softGreen}
            d="M20.31,31.08a1,1,0,0,1-.61-0.21,6.86,6.86,0,0,1-1.31-9.64l4.88-6.48a1,1,0,0,1,.8-0.4h0a1,1,0,0,1,.8.4l4.89,6.49a7,7,0,0,1,.64,1,1,1,0,0,1-1.78.92,4.9,4.9,0,0,0-.46-0.72L24.07,17,20,22.44a4.83,4.83,0,0,0-1,3,4.88,4.88,0,0,0,1.94,3.89A1,1,0,0,1,20.31,31.08Z"
            transform="translate(-3.52 -3.35)"
        />
        <path
            fill={steel}
            d="M31.07,28.35H29.49l1.12-1.12a1,1,0,0,0-1.41-1.41l-1.12,1.12V25.35a1,1,0,0,0-2,0v1.59l-1.12-1.12a1,1,0,0,0-1.41,1.41l1.12,1.12H23.07a1,1,0,0,0,0,2h1.59l-1.12,1.12a1,1,0,1,0,1.41,1.41l1.12-1.12v1.59a1,1,0,0,0,2,0V31.76l1.12,1.12a1,1,0,1,0,1.41-1.41l-1.12-1.12h1.59A1,1,0,0,0,31.07,28.35Z"
            transform="translate(-3.52 -3.35)"
        />
    </SvgIcon>
);

export default ColdWaterIcon;
