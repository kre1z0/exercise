import React from 'react';

import styles from './images-carousel.scss';

const Images = ({ images, currentIndex }) => {
    return (
        <div className={styles.imagesBlock}>
            {images.map(({ original }, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            transform: `translateX(${(index - currentIndex) *
                                100}%)`,
                        }}
                        className={styles.imageWrapper}
                    >
                        <img
                            className={styles.image}
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
