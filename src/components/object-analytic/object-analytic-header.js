import React from 'react';
import ColdWaterIcon from '../../components/icons/cold-water';
import CircleIcon from '../../components/icons/circle';

import styles from './object-analytic-header.scss';

const ObjectAnalyticHeader = ({ title }) => {
    return (
        <div className={styles.objectAnalyticHeader}>
            <div className="icon">
                <div className="circle">
                    <CircleIcon
                        style={{
                            width: 42,
                            height: 42,
                        }}
                    />
                </div>
                <ColdWaterIcon
                    style={{
                        width: 42,
                        height: 42,
                    }}
                />
            </div>
            <h2 className="title">{title}</h2>
        </div>
    );
};

export default ObjectAnalyticHeader;
