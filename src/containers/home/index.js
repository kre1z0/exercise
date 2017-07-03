import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    componentDidMount() {
        console.log('!!!!!');
    }

    render() {
        return (
            <div>
                home
            </div>
        );
    }
}

const mapProps = ({ twitch }) => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
