import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import ImageGallery from './ImageGallery';

import './styles/image-gallery.scss';
import styles from './gallery.scss';

const imagesArray = [
    'https://s-media-cache-ak0.pinimg.com/736x/5f/75/fa/5f75fa3b95cad18586a3341f4a94f313--cat-siamese-kitty-cats.jpg',
    'http://funkot.ru/wp-content/uploads/2016/02/shotlandskii-vislouhii-kotenok-golova-nabok.jpg',
    'http://cdn.shopify.com/s/files/1/1365/2497/products/inflatable_evil_unicorn_horn_for_cats_grande.jpg?v=1470256514',
    'http://allpets1.com/wp-content/uploads/2014/10/87.jpg',
    'https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg',
    'https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg',
    'http://www.findcatnames.com/wp-content/uploads/2014/10/Black-cat-marvelous-hd-wallpaper.jpg',
    'http://static.boredpanda.com/blog/wp-content/uploads/2015/07/A-visit-to-the-worlds-only-black-cat-cafe1__880.jpg',
];

class Home extends Component {
    state = {
        width: 0,
    };

    componentDidMount() {
        this.handleDocumentResize();
        window.addEventListener('resize', this.handleDocumentResize);
        document.addEventListener('keydown', this.onKeyPress);
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('touchend', this.handleDocumentClick);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleDocumentResize);
        document.removeEventListener('keydown', this.onKeyPress);
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('touchend', this.handleDocumentClick);
    }

    handleDocumentClick = e => {
        const inside = this.carousel.contains(e.target);
        if (!inside) {
            console.log('--> out');
        }
    };

    handleDocumentResize = () => {
        const width = this.carousel.clientWidth;
        this.setState({
            width,
        });
        //const elements = document.getElementsByClassName('image-gallery-image');
        //for (var i = 0; i < elements.length; i++) {
        //    elements[i].childNodes[0].style.maxWidth = width + 'px';
        //    elements[i].childNodes[0].style.maxHeight = width + 'px';
        //}
    };

    render() {
        const { width } = this.state;
        return (
            <Col md="6">
                <div
                    ref={c => {
                        this.carousel = c;
                    }}
                    className={styles.imagesCarousel}
                >
                    <ImageGallery
                        width={width}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        items={imagesArray.map(image => ({
                            original: image,
                            thumbnail: image,
                        }))}
                        slideInterval={2000}
                    />
                </div>
            </Col>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
