import React, { Component } from 'react';

import FilterPanel from './filter-panel';
import ObjectAnalyticHeader from './object-analytic-header';
import LineChart from './line-chart';

import styles from './object-analytic.scss';

class ObjectAnalyticItem extends Component {
    state = {
        activePanelId: 1,
        data: [333, 59, 710, 56, 55, 180, 198, 125, 25, 101, 350],
        labels: [
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
        ],
        redLine: 150,
        greenLine: 300,
    };

    onPanelClick = id => {
        this.setState({
            redLine: 40 * 2,
            greenLine: id * 50,
            activePanelId: id,
            data: [444 * id, 59, 25, 500, 545, 45, 77, 77],
            labels: [
                'I/2016',
                'II/2016',
                'III/2016',
                'IV/2016',
                'I/2017',
                'II/2017',
                'III/2017',
                'IV/2017',
            ],
        });
    };

    render() {
        const { title } = this.props;
        const { activePanelId, data, greenLine, redLine, labels } = this.state;

        return (
            <div className={styles.objectAnalyticItem}>
                <ObjectAnalyticHeader title={title} />
                <FilterPanel
                    onTouchTap={this.onPanelClick}
                    activePanelId={activePanelId}
                    items={[
                        {
                            id: 1,
                            label: 'Неделя',
                            percent: 7,
                            value: 200,
                        },
                        {
                            id: 2,
                            label: 'Месяц',
                            percent: 0,
                            value: 200,
                        },
                        {
                            id: 3,
                            label: 'Квартал',
                            percent: 7,
                            value: 1000,
                        },
                        {
                            id: 4,
                            label: 'Год',
                            percent: -2,
                            value: 2000,
                        },
                    ]}
                />
                <LineChart
                    id={activePanelId}
                    redLineValue={redLine}
                    greenLineValue={greenLine}
                    data={data}
                    labels={labels}
                />
            </div>
        );
    }
}

export default ObjectAnalyticItem;
