import React from 'react';
import { CircleIcon } from '../../components/icons/';

import styles from './object-analytic-header.scss';

const ObjectAnalyticHeader = ({ title, icon }) => {
    return (
        <div className={styles.objectAnalyticHeader}>
            <div className="icon">
                <div className="circle">
                    <CircleIcon />
                </div>
                {icon}
            </div>
            <h2 className="title">{title}</h2>
        </div>
    );
};

export default ObjectAnalyticHeader;
