import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { coolGreyTwo } from '../../assets/theme';

const CompareReport = ({ ...props }) => (
    <SvgIcon {...props} viewBox="0 0 14 16">
        <path
            fill={coolGreyTwo}
            d="M16.14,6.08a1,1,0,0,0-.05-0.27l0-.09a1,1,0,0,0-.19-0.28h0l-4-4h0a1,1,0,0,0-.28-0.19l-0.1,0a1,1,0,0,0-.26-0.05H3.41A1.3,1.3,0,0,0,2.15,2.5V15.77a1.3,1.3,0,0,0,1.26,1.37H14.89a1.3,1.3,0,0,0,1.26-1.37V6.14S16.14,6.1,16.14,6.08Zm-12,9.06v-12h6v3a1,1,0,0,0,1,1h3v8h-10Z"
            transform="translate(-2.15 -1.14)"
        />
        <path
            fill={coolGreyTwo}
            d="M6.15,9.14h0a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1v-3A1,1,0,0,0,6.15,9.14Z"
            transform="translate(-2.15 -1.14)"
        />
        <rect
            fill={coolGreyTwo}
            x="6"
            y="6"
            width="2"
            height="6.99"
            rx="1"
            ry="1"
        />
        <path
            fill={coolGreyTwo}
            d="M12.15,10.14h0a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1v-2A1,1,0,0,0,12.15,10.14Z"
            transform="translate(-2.15 -1.14)"
        />
    </SvgIcon>
);

export default CompareReport;
