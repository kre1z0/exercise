import React from 'react';

import styles from './y-scale.scss';

const YScale = ({ height, paddingTop, paddingBottom, stepSize }) => {
    const ticksAmount = 5;
    return (
        <div
            style={{
                height: height - paddingTop - paddingBottom,
                marginTop: paddingTop,
            }}
            className={styles.yScale}
        >
            <div className="yScale-helper" />
            {Array.from({ length: ticksAmount }, (_, index) => {
                const translate =
                    index * (height - paddingTop - paddingBottom) / ticksAmount;
                return (
                    <span
                        style={{
                            transform: `translateY(-${translate}px)`,
                        }}
                        key={index}
                        className="yScale-item"
                    >
                        <span>
                            {stepSize * index}
                        </span>
                    </span>
                );
            })}
        </div>
    );
};

export default YScale;
