import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

import ObjectAnalyticItem from '../../components/object-analytic/';

import './analytic.scss';

class Home extends Component {
    render() {
        return (
            <Col md="6" style={{ background: '#fff', padding: 0 }}>
                <ObjectAnalyticItem />
                <ObjectAnalyticItem />
            </Col>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
