import React from 'react';

import styles from './buttons.scss';

export const LeftNav = ({ ...props }) => {
    return (
        <button {...props} className={styles.leftNav}>
            <svg viewBox="0 0 24 24">
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
                <path d="M0-.5h24v24H0z" fill="none" />
            </svg>
        </button>
    );
};

export const RightNav = ({ ...props }) => {
    return (
        <button {...props} className={styles.rightNav}>
            <svg viewBox="0 0 24 24">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                <path d="M0-.25h24v24H0z" fill="none" />
            </svg>
        </button>
    );
};
