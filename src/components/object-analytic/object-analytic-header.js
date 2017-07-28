import React from 'react';

import styles from './header.scss';

const ObjectAnalyticHeader = ({ title }) => {
    return (
        <div className={styles.objectAnalyticHeader}>
            <h2 className="title">{title}</h2>
        </div>
    );
};

export default ObjectAnalyticHeader;
