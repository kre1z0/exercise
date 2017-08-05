import React from 'react';

import styles from './y-scale.scss';

const YScale = ({
    height,
    paddingTop,
    paddingBottom,
    stepSize,
    yTicksAmount,
}) => {
    return (
        <div
            style={{
                height: height - paddingTop - paddingBottom,
                marginTop: paddingTop,
            }}
            className={styles.yScale}
        >
            <div className="yScale-helper" />
            {Array.from({ length: yTicksAmount }, (_, index) => {
                const translate =
                    index *
                    (height - paddingTop - paddingBottom) /
                    yTicksAmount;
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
