import React from 'react';

import styles from './images-carousel.scss';

const Images = ({ images, currentIndex, width }) => {
    return (
        <div
            style={{ width: width, height: width }}
            className={styles.imagesBlock}
        >
            {images.map(({ original }, index) => {
                return (
                    <div
                        className={styles.imageWrapper}
                        key={index}
                        style={{
                            width: width,
                            height: width,
                            transform: `translateX(${(index - currentIndex) *
                                100}%)`,
                        }}
                    >
                        <img
                            style={{
                                maxWidth: width,
                                maxHeight: width,
                            }}
                            key={original}
                            src={original}
                            alt=""
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Images;
