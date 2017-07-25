import React, { Component } from 'react';

import FilterPanel from './filter-panel';
import LineChart from './line-chart';

import './object-analytic.scss';

class ObjectAnalyticItem extends Component {
    state = {
        activePanelId: null,
        data: [333, 59, 710, 56, 55, 180, 198, 125, 25, 101, 350, 230],
        redLine: 20,
        greenLine: 100,
    };
    onPanelClick = id => {
        this.setState({
            redLine: 40,
            greenLine: id * 50,
            activePanelId: id,
            data: [444, 59, 25, 500, 545, 45, 77, 77, 55, 55, 350],
        });
    };
    render() {
        const { activePanelId } = this.state;

        return (
            <div>
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
                    width={1000}
                    height={260}
                    redLineValue={this.state.redLine}
                    greenLineValue={this.state.greenLine}
                    data={this.state.data}
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
            </div>
        );
    }
}

export default ObjectAnalyticItem;
