import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { silver, strongSilver, softGreen } from '../../assets/theme';

const TaskIcon = ({ isActive, ...props }) => (
    <SvgIcon {...props} viewBox="0 0 23 21.93">
        <path
            fill={isActive ? strongSilver : silver}
            d="M18.49,23A1,1,0,0,1,18,22.85l-6-3.17L6,22.85a1,1,0,0,1-1.45-1.05l1.15-6.71L3.22,12.69a1,1,0,1,1,1.4-1.43L7.45,14a1,1,0,0,1,.29.88l-0.9,5.23,4.7-2.47a1,1,0,0,1,.93,0l4.7,2.47-0.9-5.23A1,1,0,0,1,16.55,14l2.83-2.76a1,1,0,1,1,1.4,1.43l-2.46,2.39,1.15,6.71A1,1,0,0,1,18.49,23Z"
            transform="translate(-0.5 -1.04)"
        />
        <path
            fill={isActive ? softGreen : silver}
            d="M22.5,10.62H22.36L15.1,9.56A1,1,0,0,1,14.35,9L12,4.25,9.65,9a1,1,0,0,1-.75.55L1.64,10.61a1,1,0,0,1-.29-2l6.73-1,3-6.1a1,1,0,0,1,1.79,0l3,6.1,6.73,1A1,1,0,0,1,22.5,10.62Z"
            transform="translate(-0.5 -1.04)"
        />
    </SvgIcon>
);

export default TaskIcon;
