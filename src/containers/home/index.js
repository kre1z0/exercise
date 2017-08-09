import React, { Component } from 'react';

import AnalyticsHeader from '../../components/analytics/header';
import {
    ColdWaterIcon,
    AmountIcon,
    VisitorsIcon,
    GasIcon,
    ElectricityIcon,
    HotWaterIcon,
} from '../../components/icons/';
import ObjectAnalyticItem from '../../components/object-analytics/';

import {
    data,
    labels,
    greenLineValue,
    redLineValue,
} from '../../components/object-analytics/test-data';

import styles from './object-analytic.scss';

class Home extends Component {
    render() {
        return (
            <div className={styles.objectAnalytics}>
                <AnalyticsHeader title="Аналитика по объекту Егорьевский завод строительных материалов" />
                <div className="object-analytics-content">
                    <ObjectAnalyticItem
                        activePanelId={2}
                        title="Объём выпуска продукции, кг"
                        icon={<AmountIcon />}
                        greenLineValue={greenLineValue[2]}
                        redLineValue={redLineValue[2]}
                        data={data[2]}
                        labels={labels[2]}
                    />
                    <ObjectAnalyticItem
                        activePanelId={1}
                        title="Количество посетителей завода, чел"
                        icon={<VisitorsIcon />}
                        greenLineValue={greenLineValue[1]}
                        redLineValue={redLineValue[1]}
                        data={data[1]}
                        labels={labels[1]}
                    />
                    <ObjectAnalyticItem
                        activePanelId={3}
                        title="Объём потребления газа, м3"
                        icon={<GasIcon />}
                        greenLineValue={greenLineValue[3]}
                        redLineValue={redLineValue[3]}
                        data={data[3]}
                        labels={labels[3]}
                    />
                    <ObjectAnalyticItem
                        activePanelId={4}
                        title="Объём потребления электроэнергии, кВт/ч"
                        icon={<ElectricityIcon />}
                        greenLineValue={greenLineValue[4]}
                        redLineValue={redLineValue[4]}
                        data={data[4]}
                        labels={labels[4]}
                    />
                    <ObjectAnalyticItem
                        activePanelId={2}
                        title="Объём потребления горячей воды, м3"
                        icon={<HotWaterIcon />}
                        greenLineValue={greenLineValue[2]}
                        redLineValue={redLineValue[2]}
                        data={data[2]}
                        labels={labels[2]}
                    />
                    <ObjectAnalyticItem
                        activePanelId={1}
                        title="Объём потребления холодной воды, м3"
                        icon={<ColdWaterIcon />}
                        greenLineValue={greenLineValue[1]}
                        redLineValue={redLineValue[1]}
                        data={data[1]}
                        labels={labels[1]}
                    />
                </div>
            </div>
        );
    }
}

export default Home;
