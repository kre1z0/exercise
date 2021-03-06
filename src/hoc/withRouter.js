import React, { Component } from 'react';
import getDisplayName from './getDisplayName';

import { withRouter } from 'react-router-dom';

export default function(EnhancedComponent) {
    class Enhancer extends Component {
        isHome = () => this.props.location.pathname === '/';
        goHome = () => this.props.history.push('/');

        isHeroes = () => this.props.location.pathname.includes('/heroes');
        goHeroes = () => this.props.history.push('/heroes');

        isSorting = () => this.props.location.pathname.includes('/sorting');
        goSorting = () => this.props.history.push('/sorting');

        isGallery = () => this.props.location.pathname.includes('/gallery');
        goGallery = () => this.props.history.push('/gallery');

        render() {
            return (
                <EnhancedComponent
                    isHome={this.isHome}
                    goHome={this.goHome}
                    isHeroes={this.isHeroes}
                    goHeroes={this.goHeroes}
                    isSorting={this.isSorting}
                    goSorting={this.goSorting}
                    isGallery={this.isGallery}
                    goGallery={this.goGallery}
                    {...this.state}
                    {...this.props}
                />
            );
        }
    }

    Enhancer.displayName = `withRouter(${getDisplayName(EnhancedComponent)})`;

    return withRouter(Enhancer);
}
