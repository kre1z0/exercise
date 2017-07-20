import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

import FilterPanel from './filter-panel';
import LineChart from './line-chart';

import './analytic.scss';

class Home extends Component {
    state = {
        activePanelId: null,
        data: [65, 59, 710, 56, 55, 180, 198, 125, 25, 101, 350],
        redLine: 100,
        greenLine: 20,
    };
    onPanelClick = id => {
        this.setState({
            redLine: 40,
            greenLine: id * 50,
            activePanelId: id,
            data: [444, 59, 25, 4, 545, 45, 77, 77, 55, 55, 350],
        });
    };
    render() {
        const { activePanelId } = this.state;

        return (
            <Col md="6" style={{ background: '#fff' }}>
                <FilterPanel
                    onTouchTap={this.onPanelClick}
                    activePanelId={activePanelId}
                    items={[
                        {
                            id: 1,
                            label: 'Неделя',
                            amount: 200,
                            percent: 7,
                        },
                        {
                            id: 2,
                            label: 'Месяц',
                            amount: 200,
                            percent: 0,
                        },
                        {
                            id: 3,
                            label: 'Квартал',
                            amount: 1000,
                            percent: 7,
                        },
                        {
                            id: 4,
                            label: 'Год',
                            amount: 2000,
                            percent: -2,
                        },
                    ]}
                />
                <LineChart
                    data={this.state.data}
                    redLine={this.state.redLine}
                    greenLine={this.state.greenLine}
                    labels={[
                        'Янв',
                        'Фев',
                        'Мар',
                        'Апр',
                        'Май',
                        'Июн',
                        'Июл',
                        'Авг',
                        'Сен',
                        'Окт',
                        'Ноя',
                        'Дек',
                    ]}
                />
            </Col>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
