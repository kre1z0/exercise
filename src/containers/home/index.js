import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <Col md="6">
                home
            </Col>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
