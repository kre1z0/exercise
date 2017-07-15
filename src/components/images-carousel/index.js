import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

import Images from './images';
import { LeftNav, RightNav } from './buttons';

import styles from './images-carousel.scss';

class ImagesCarousel extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    static defaultProps = {
        items: [],
    };

    state = {
        currentIndex: 0,
        width: 0,
        percent: 0,
    };

    componentDidMount() {
        this.handleDocumentResize();
        window.addEventListener('resize', this.handleDocumentResize);
        document.addEventListener('keydown', this.onKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleDocumentResize);
        document.removeEventListener('keydown', this.onKeyPress);
    }

    _handleSwiping(index, _, delta) {
        const { width } = this.state;
        let offsetPercentage = index * (delta / width * 100);
        if (Math.abs(offsetPercentage) >= 100) {
            offsetPercentage = index * 100;
        }
        this.setState({
            percent: offsetPercentage,
        });
    }

    _handleOnSwipedTo = index => {
        const { percent } = this.state;
        if (index < 0 && percent > 50) {
            this.setState(state => ({
                currentIndex: state.currentIndex - 1,
            }));
        } else if (index > 0 && percent < -50) {
            this.setState(state => ({
                currentIndex: state.currentIndex + 1,
            }));
        }
        this.setState({
            percent: 0,
        });
    };

    onKeyPress = ({ keyCode }) => {
        const left = keyCode === 37;
        const right = keyCode === 39;
        if (left) this.onPrev();
        if (right) this.onNext();
    };

    handleDocumentResize = () => {
        const width = this.carousel.clientWidth;
        this.setState({
            width,
        });
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

    render() {
        const { items } = this.props;
        const { currentIndex, width, percent } = this.state;
        console.log('--> state', this.state.percent);
        return (
            <div
                ref={c => {
                    this.carousel = c;
                }}
                className={styles.imagesCarousel}
            >
                <Swipeable
                    className={styles.imagesCarouselSwipe}
                    key="swipeable"
                    delta={1}
                    onSwipingLeft={(_, delta) =>
                        this._handleSwiping(-1, _, delta)}
                    onSwipingRight={(_, delta) =>
                        this._handleSwiping(1, _, delta)}
                    onSwipedLeft={() => this._handleOnSwipedTo(1)}
                    onSwipedRight={() => this._handleOnSwipedTo(-1)}
                >
                    <Images
                        percent={percent}
                        width={width}
                        currentIndex={currentIndex}
                        images={items}
                    />
                    <LeftNav onTouchTap={this.onPrev} />
                    <RightNav onTouchTap={this.onNext} />
                </Swipeable>
            </div>
        );
    }
}

export default ImagesCarousel;
