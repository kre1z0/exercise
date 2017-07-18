import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';

import Control from './control';

import './analytic.scss';

class Home extends Component {
    state = {
        selected: 'Месяц',
    };
    componentDidMount() {
        //console.log('-->', allMonths);
    }
    select = month => {
        this.setState({
            selected: month,
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
                tooltipTemplate:
                    '<%if (label){%><%=value%><%} else {%> No data <%}%>',
                xAlign: 'center',
                yAlign: 'bottom',
                xPadding: 7,
                yPadding: 7,
                caretSize: 5,
                cornerRadius: 2,
                callbacks: {
                    title: () => {},
                    label: (tooltipItem, data) => {
                        console.log('--> tooltipItem', tooltipItem);
                        console.log('--> data', data);
                        return 1;
                    },
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
                        scaleLabel: {
                            display: true,
                        },
                        ticks: {
                            fontColor: 'green',
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            drawTicks: false,
                            lineWidth: 1,
                            color: 'green',
                        },
                        ticks: {
                            fontColor: 'red',
                            padding: 25,
                            stepSize: 50,
                            suggestedMax: 300,
                            suggestedMin: 0,
                        },
                    },
                ],
            },
        };

        const data = {
            labels: months,
            datasets: [
                {
                    label: '',
                    lineTension: 0,
                    backgroundColor: 'rgba(233, 255, 0, 0.4)',
                    borderColor: 'green',
                    // Point
                    pointBorderColor: 'green',
                    pointBackgroundColor: 'red',
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'green',
                    pointHoverBorderColor: 'red',
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 2,
                    data: [65, 59, 80, 81, 56, 55, 200, 198, 125, 25, 101, 170],
                },
            ],
        };

        const { selected } = this.state;

        return (
            <Col md="6">
                <Control
                    onTouchTap={this.select}
                    items={['Неделя', 'Месяц', 'Квартал', 'Год']}
                    isActive={selected}
                />
                <Line
                    width={1000}
                    height={400}
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
