import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { softGreen, steel } from '../../assets/theme';

const VisitorsIcon = props => (
    <SvgIcon {...props} viewBox="0 0 42 42">
        <path
            fill={softGreen}
            d="M23.06,23.19a4.51,4.51,0,1,0-6.62,0c-2.41.81-4.07,2.47-4.07,4.38v2.1a1.71,1.71,0,0,0,1.41,1.7H25.89c0.75,0,1.25-.68,1.25-1.7v-2.1C27.13,25.65,25.47,24,23.06,23.19Zm-5.82-3a2.51,2.51,0,1,1,2.51,2.51A2.52,2.52,0,0,1,17.24,20.15Zm7.9,9.21H14.36V27.57c0-1.38,2.21-2.91,5.39-2.91s5.39,1.53,5.39,2.91v1.79Z"
            transform="translate(-3.36 -3.35)"
        />
        <path
            fill={steel}
            d="M33.25,24.52a3.77,3.77,0,0,0,.81-2.33A3.81,3.81,0,1,0,30.24,26h0c2.35,0,4.11,1.12,4.11,2.13v1.24h-4.1a1,1,0,0,0,0,2h4.91a1.34,1.34,0,0,0,1.2-1.56V28.13C36.36,26.55,35.12,25.21,33.25,24.52Zm-4.8-2.33A1.81,1.81,0,1,1,30.25,24,1.81,1.81,0,0,1,28.44,22.19Z"
            transform="translate(-3.36 -3.35)"
        />
    </SvgIcon>
);

export default VisitorsIcon;
