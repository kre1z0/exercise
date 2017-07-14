import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Images from './images';
import { LeftNav, RightNav } from './buttons';

import styles from './images-carousel.scss';

class ImagesCarousel extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    state = {
        currentIndex: 0,
        width: 0,
    };

    componentDidMount() {
        const offsetWidth = this.carousel.offsetWidth;
        this.setState({
            width: offsetWidth,
        });
    }

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
        const { currentIndex, width } = this.state;
        return (
            <div
                ref={c => {
                    this.carousel = c;
                }}
                className={styles.imagesCarousel}
            >
                <Images
                    width={width}
                    currentIndex={currentIndex}
                    images={items}
                />
                <LeftNav onTouchTap={this.onPrev} />
                <RightNav onTouchTap={this.onNext} />
            </div>
        );
    }
}

export default ImagesCarousel;
