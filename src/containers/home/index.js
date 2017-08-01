import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Alert } from 'reactstrap';

import ObjectAnalyticItem from '../../components/object-analytic/';
import ImageLoader from '../../components/img-loader/img-loader';

import styles from './analytic.scss';

class Home extends Component {
    render() {
        return (
            <Col md="12">
                <Alert className={styles.newClass} color="success">
                    <strong>Well done!</strong>
                    You successfully read this important alert message.
                </Alert>
                <Col md="12" style={{ padding: 0 }}>
                    <ImageLoader />
                </Col>
                <Col md="7" style={{ padding: 0 }}>
                    <ObjectAnalyticItem title="Объём выпуска продукции, кг" />
                </Col>
                <Col md="7" style={{ padding: 0 }}>
                    <ObjectAnalyticItem title="Объём выпуска продукции, кг" />
                </Col>
            </Col>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
