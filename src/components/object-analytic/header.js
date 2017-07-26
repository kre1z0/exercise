import React from 'react';

import styles from './header.scss';

const Header = ({ title }) => {
    return (
        <div className={styles.objectAnalyticHeader}>
            <h2 className="title">{title}</h2>
        </div>
    );
};

export default Header;
