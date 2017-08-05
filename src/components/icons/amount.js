import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { softGreen, steel } from '../../assets/theme';

const AmountIcon = props => (
    <SvgIcon {...props} viewBox="0 0 42 42">
        <path
            fill={softGreen}
            d="M32.62,17.5h-16a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h3v2h-3a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h5a1,1,0,1,0,0-2h-4v-2h4a1,1,0,1,0,0-2v-2h6a1,1,0,0,0,2,0h3a1,1,0,0,0,1-1v-4A1,1,0,0,0,32.62,17.5Zm-12,4h-3v-2h6v2h-3Zm11,0h-6v-2h6v2Z"
            transform="translate(-3.62 -3.5)"
        />
        <path
            fill={steel}
            d="M32.62,31.5h-8a1,1,0,0,1-1-1v-4a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v4A1,1,0,0,1,32.62,31.5Zm-7-2h6v-2h-6v2Z"
            transform="translate(-3.62 -3.5)"
        />
    </SvgIcon>
);

export default AmountIcon;
