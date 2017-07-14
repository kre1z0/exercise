import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Images from './images';

import styles from './images-carousel.scss';

class ImagesCarousel extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    state = {
        currentIndex: 0,
    };

    onPrev = () => {
        const size = this.props.items.length;
        const { currentIndex } = this.state;
        if (currentIndex === 0) {
            this.setState({
                currentIndex: size - 1,
            });
        } else {
            this.setState({
                currentIndex: currentIndex - 1,
            });
        }
    };

    onNext = () => {
        const size = this.props.items.length;
        const { currentIndex } = this.state;
        if (currentIndex + 1 === size) {
            this.setState({
                currentIndex: 0,
            });
        } else {
            this.setState({
                currentIndex: currentIndex + 1,
            });
        }
    };

    static defaultProps = {
        items: [],
    };

    render() {
        const { items } = this.props;
        const { currentIndex } = this.state;
        return (
            <div className={styles.imagesCarousel}>
                <Images currentIndex={currentIndex} images={items} />
                <button onTouchTap={this.onPrev} className={styles.leftNav}>
                    {'<'}
                </button>
                <button onTouchTap={this.onNext} className={styles.rightNav}>
                    {'>'}
                </button>
            </div>
        );
    }
}

export default ImagesCarousel;
