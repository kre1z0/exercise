import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { softGreen, coolGreyTwo } from '../../assets/theme';

const dashes = {
    desc: (
        <g>
            <path
                xmlns="http://www.w3.org/2000/svg"
                d="M5.94,3.25h-5a1,1,0,0,0,0,2h5A1,1,0,0,0,5.94,3.25Z"
                transform="translate(0.06 -2.23)"
            />
            <path
                xmlns="http://www.w3.org/2000/svg"
                d="M5.94,11.25h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,5.94,11.25Z"
                transform="translate(0.06 -2.23)"
            />
        </g>
    ),
    asc: (
        <g>
            <path
                xmlns="http://www.w3.org/2000/svg"
                d="M5.94,3.38h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,5.94,3.38Z"
                transform="translate(0.06 -2.35)"
            />
            <path
                xmlns="http://www.w3.org/2000/svg"
                d="M5.94,11.38h-5a1,1,0,0,0,0,2h5A1,1,0,0,0,5.94,11.38Z"
                transform="translate(0.06 -2.35)"
            />
        </g>
    ),
};

const SortIcon = ({ isActive, sort, ...props }) => (
    <SvgIcon
        color={isActive ? softGreen : coolGreyTwo}
        {...props}
        viewBox="0 0 16 12"
    >
        <path
            d="M15.64,9.64a1,1,0,0,0-1.41,0l-1.29,1.29V3.35a1,1,0,0,0-2,0v7.58L9.64,9.64a1,1,0,0,0-1.41,1.41l3,3a1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,15.64,9.64Z"
            transform="translate(0.06 -2.35)"
        />
        {dashes[sort]}
        <path
            d="M5.94,7.38h-3a1,1,0,0,0,0,2h3A1,1,0,0,0,5.94,7.38Z"
            transform="translate(0.06 -2.35)"
        />
    </SvgIcon>
);

SortIcon.defaultProps = {
    sort: 'asc',
};

export default SortIcon;
