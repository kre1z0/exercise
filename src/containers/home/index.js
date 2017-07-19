import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { Line, Chart } from 'react-chartjs-2';

import FilterPanel from './filter-panel';

import './analytic.scss';

class Home extends Component {
    state = {
        activePanelId: null,
    };
    componentWillMount() {
        Chart.pluginService.register({
            afterUpdate: chart => {
                console.log('--> afterUpdate', chart);
                //const dataset = chart.config.data.datasets[0];
                //console.log('--> dataset', dataset);
                //const offset = 20;
                //
                //for (let i = 0; i < dataset._meta[0].data.length; ++i) {
                //    const model = dataset._meta[0].data[i]._model;
                //    model.x += offset;
                //    model.controlPointNextX += offset;
                //    model.controlPointPreviousX += offset;
                //}
            },
            afterDatasetsDraw: chart => {
                const ctx = chart.chart.ctx;
                const xAxe = chart.config.options.scales.xAxes[0];
                const xScale = chart.scales[xAxe.id];
                const yAxe = chart.config.options.scales.yAxes[0];
                const yScale = chart.scales[yAxe.id];
                console.log('--> xScale', xScale);
                console.log('--> yScale', yScale);
                // ↓ When using a dashed line, make sure to save and restore the canvas
                // ↓ save
                ctx.save();

                // ↓ line
                ctx.setLineDash([10, 2]);
                ctx.lineWidth = 1;
                // ↓ green line
                ctx.beginPath();
                ctx.strokeStyle = 'green';
                ctx.moveTo(xScale.left, yScale.bottom - 100);
                ctx.lineTo(xScale.right, yScale.bottom - 100);
                ctx.stroke();
                // ↓ red line
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.moveTo(xScale.left, yScale.bottom - 20);
                ctx.lineTo(xScale.right, yScale.bottom - 20);
                ctx.stroke();

                // ↓ restore
                ctx.restore();
            },
        });
    }
    onPanelClick = id => {
        this.setState({
            activePanelId: id,
        });
    };
    render() {
        const months = [
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
        ];

        const data = {
            labels: months,
            datasets: [
                {
                    data: [65, 59, 80, 81, 56, 55, 180, 198, 125, 25, 101, 170],
                    label: '',
                    lineTension: 0,
                    backgroundColor: 'rgba(100, 199, 108, 0.3)',
                    borderColor: 'yellow',
                    // Point ↓
                    pointStyle: 'circle',
                    pointBorderColor: 'green',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'green',
                    pointHoverBorderWidth: 3,
                    pointRadius: 4,
                    // Point ↑
                },
            ],
        };

        const options = {
            animation: false,
            responsive: false,
            layout: {
                padding: {
                    left: 0,
                    right: 50,
                    top: 0,
                    bottom: 0,
                },
            },
            tooltips: {
                //custom: tooltip => {
                //    tooltip.y = tooltip.y - 10;
                //},
                xAlign: 'center',
                yAlign: 'bottom',
                xPadding: 11,
                yPadding: 9,
                caretSize: 7,
                caretPadding: 10,
                cornerRadius: 6,
                callbacks: {
                    title: () => {},
                },
                displayColors: false,
                backgroundColor: 'black',
                bodyFontFamily: 'FedraSans, sans-serif',
                bodyFontStyle: '500',
                bodyFontSize: 14,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            //callback: (label, index, labels) => {
                            //    console.log('--> label', label);
                            //    console.log('--> index', index);
                            //    console.log('--> labels', labels);
                            //},
                            fontSize: 15,
                            fontColor: 'green',
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            //drawOnChartArea: false,
                            //borderDash: [15, 50, 44, 2, 15],
                            drawTicks: false,
                            lineWidth: 1,
                            color: 'blue',
                            zeroLineColor: 'green',
                            zeroLineBorderDash: [30],
                        },
                        //afterFit: humdaysChart => {
                        //    console.log('--> afterFit', humdaysChart);
                        //},
                        afterBuildTicks: humdaysChart => {
                            console.log('--> afterBuildTicks', humdaysChart);
                            humdaysChart.ticks = [];
                            humdaysChart.ticks.push(0);
                            humdaysChart.ticks.push(50);
                            humdaysChart.ticks.push(100);
                            humdaysChart.ticks.push(150);
                            humdaysChart.ticks.push(200);
                            humdaysChart.ticks.push(250); // <-- hide
                        },
                        ticks: {
                            callback: tick => {
                                //console.log('--> ticks', tick);
                                if (tick === 250) return null;
                                return tick;
                            },
                            fontColor: 'red',
                            padding: 25,
                            stepSize: 50,
                            suggestedMax: 250,
                            suggestedMin: 0,
                        },
                    },
                ],
            },
        };

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
                <Line
                    width={1000}
                    height={260}
                    legend={{ display: false }}
                    options={options}
                    data={data}
                />
            </Col>
        );
    }
}

const mapProps = () => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
