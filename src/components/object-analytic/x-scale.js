import React from 'react';

import { coolGreyTwo, softGreen } from '../../assets/theme';

import styles from './x-scale.scss';

const XScale = ({ labels, paddingRight, width, activePointIndex }) => {
    return (
        <div className={styles.xScale}>
            {labels.map((label, index) => {
                const translate =
                    index * (width - paddingRight) / (labels.length - 1);
                return (
                    <span
                        style={{
                            color: index === activePointIndex
                                ? softGreen
                                : coolGreyTwo,
                            transform: `translateX(${translate}px)`,
                        }}
                        className="xScale-item"
                        key={`${label}-${index}`}
                    >
                        <span>
                            {label}
                        </span>
                    </span>
                );
            })}
        </div>
    );
};

export default XScale;
