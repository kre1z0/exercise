import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { coolGreyTwo } from '../../assets/theme';

const Delete = ({ ...props }) => (
    <SvgIcon {...props} viewBox="0 0 12 15">
        <path
            fill={coolGreyTwo}
            d="M13,1H11a1,1,0,0,0-1-1H6A1,1,0,0,0,5,1H3A1,1,0,0,0,3,3H13A1,1,0,0,0,13,1Z"
            transform="translate(-2)"
        />
        <path
            fill={coolGreyTwo}
            d="M12,4H4A1,1,0,0,0,3,5v9a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V5A1,1,0,0,0,12,4Zm-1,9H5V6h6v7Z"
            transform="translate(-2)"
        />
    </SvgIcon>
);

export default Delete;
