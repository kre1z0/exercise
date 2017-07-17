import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import ImageLoader from '../../components/img-loader/img-loader';

class Home extends Component {
    render() {
        const gg = 0;
        console.log('--> gg', !!gg);
        return (
            <Col md="6">
                <ImageLoader />
            </Col>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
