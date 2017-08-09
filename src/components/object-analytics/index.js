import React, { Component } from 'react';

import FilterPanel from './filter-panel';
import ObjectAnalyticHeader from './object-analytic-header';
import LineChart from './line-chart';

import {
    data,
    labels,
    greenLineValue,
    redLineValue,
} from '../../components/object-analytics/test-data';

import styles from './object-analytic.scss';

class ObjectAnalyticItem extends Component {
    state = {
        activePanelId: this.props.activePanelId,
        data: this.props.data,
        labels: this.props.labels,
        greenLineValue: this.props.greenLineValue,
        redLineValue: this.props.redLineValue,
    };

    onPanelClick = id => {
        this.setState({
            greenLineValue: greenLineValue[id],
            redLineValue: redLineValue[id],
            activePanelId: id,
            data: data[id],
            labels: labels[id],
        });
    };

    render() {
        const { title, icon } = this.props;

        const {
            activePanelId,
            data,
            greenLineValue,
            redLineValue,
            labels,
        } = this.state;

        return (
            <div className={styles.objectAnalyticItem}>
                <ObjectAnalyticHeader icon={icon} title={title} />
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
                    greenLineValue={greenLineValue}
                    redLineValue={redLineValue}
                    data={data}
                    labels={labels}
                />
            </div>
        );
    }
}

export default ObjectAnalyticItem;
