import React, { Component } from 'react';
import { connect } from 'react-redux';

import ImagesCarousel from '../../components/images-carousel';

const imagesArray = [
    'http://funkot.ru/wp-content/uploads/2016/02/shotlandskii-vislouhii-kotenok-golova-nabok.jpg',
    'http://allpets1.com/wp-content/uploads/2014/10/87.jpg',
    'https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg',
    'https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg',
    'http://www.findcatnames.com/wp-content/uploads/2014/10/Black-cat-marvelous-hd-wallpaper.jpg',
    'http://static.boredpanda.com/blog/wp-content/uploads/2015/07/A-visit-to-the-worlds-only-black-cat-cafe1__880.jpg',
];

class Home extends Component {
    render() {
        return (
            <div>
                <ImagesCarousel
                    items={imagesArray.map(image => ({
                        original: image,
                        thumbnail: image,
                    }))}
                />
            </div>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
