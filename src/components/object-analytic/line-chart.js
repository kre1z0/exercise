import React, { PureComponent } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ceil from 'lodash/ceil';

import { paleGrey, softGreen, redOrange } from '../../assets/theme';
import firstPointPaddingLeft from './plugins/first-point-padding-left';
import XScale from './x-scale';
import YScale from './y-scale';

import styles from './line-chart.scss';

const ceilMaxNumberOfData = data => {
    const max = Math.max(...data);
    const lengthOfNumber = Math.floor(max).toString().length;

    let operator = -lengthOfNumber;

    if (lengthOfNumber === 1 || lengthOfNumber === 2) operator += 0;
    else if (lengthOfNumber === 3) operator += 1;
    else operator += 2;

    return ceil(max, operator);
};

class LineChart extends PureComponent {
    static defaultProps = {
        height: 233,
        data: [],
        labels: [],
    };

    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    state = {
        activePointIndex: null,
        scrolledToEnd: false,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 10,
        yTicksAmount: 5,
    };

    _pixelRatio = window.devicePixelRatio;

    componentWillMount() {
        Chart.pluginService.register([firstPointPaddingLeft]);
    }

    componentDidMount() {
        this.drawDashedLines();
    }

    componentDidUpdate() {
        this.drawDashedLines();
    }

    calculateWidth() {
        const { id, labels } = this.props;
        const { paddingRight } = this.state;
        const pointWidth = id === 1 || id === 2 ? 85 : 180;
        return labels.length * pointWidth - paddingRight;
    }

    calculateMaxAndStepSize() {
        const { yTicksAmount } = this.state;
        const { data } = this.props;
        const maxNumberOfData = ceilMaxNumberOfData(data);
        const stepSize = maxNumberOfData / (yTicksAmount - 1);
        const max = maxNumberOfData + stepSize;

        return {
            stepSize,
            max,
        };
    }

    drawDashedLines() {
        const { redLineValue, greenLineValue } = this.props;
        const { max, stepSize } = this.calculateMaxAndStepSize();

        const chart = this.lineChart.chart_instance;
        const top = chart.chartArea.top;
        const left = chart.chartArea.left;
        const bottom = chart.chartArea.bottom;
        const right = chart.chartArea.right;
        const getPixels = value => Math.round((bottom - top) / max * value);
        const ticks = Array.from({ length: max / stepSize }, (_, index) => {
            return stepSize * index;
        });

        // ↓ fix if lines have the same height with ticks
        let fixRedLine = 0;
        let fixGreenLine = 0;

        ticks.forEach(number => {
            if (number === redLineValue) fixRedLine = 1;
            if (number === greenLineValue) fixGreenLine = 1;
        });

        const ctx = this.dashedLineCanvas.getContext('2d');
        ctx.save();
        ctx.scale(this._pixelRatio, this._pixelRatio);

        ctx.clearRect(0, 0, chart.width, chart.height);
        ctx.setLineDash([5, 2]);
        ctx.lineWidth = 1;
        // ↓ fix canvas 1px lineWidth bug
        const halfPixel = 0.5;

        // ↓ red line
        ctx.strokeStyle = redOrange;
        ctx.beginPath();
        ctx.moveTo(
            left,
            bottom + halfPixel - fixRedLine - getPixels(redLineValue),
        );
        ctx.lineTo(
            right,
            bottom + halfPixel - fixRedLine - getPixels(redLineValue),
        );
        ctx.stroke();

        // ↓ green line
        ctx.strokeStyle = softGreen;
        ctx.beginPath();
        ctx.moveTo(
            left,
            bottom + halfPixel - fixGreenLine - getPixels(greenLineValue),
        );
        ctx.lineTo(
            right,
            bottom + halfPixel - fixGreenLine - getPixels(greenLineValue),
        );
        ctx.stroke();
        ctx.restore();
    }

    onHoverPoint = ([charElement]) => {
        const ctx = this.pointLine.getContext('2d');
        const chart = this.lineChart.chart_instance;
        ctx.save();
        ctx.scale(this._pixelRatio, this._pixelRatio);

        if (charElement) {
            const activePointIndex = charElement._index;

            this.setState({ activePointIndex });

            if (activePointIndex === 0) {
                chart.tooltip._options.xAlign = 'left';
                chart.tooltip._options.yAlign = 'center';
            } else {
                chart.tooltip._options.xAlign = 'center';
                chart.tooltip._options.yAlign = 'bottom';
            }
            const chartAreaBottom = chart.chartArea.bottom;
            const view = charElement._view;
            const y = view.y;
            const x = view.x;
            const pointRadius = charElement._view.radius;
            ctx.lineWidth = 1;
            ctx.strokeStyle = softGreen;

            ctx.clearRect(0, 0, chart.width, chart.height);
            const halfPixel = 0.5;
            ctx.beginPath();
            ctx.moveTo(Math.floor(x) + halfPixel, y + pointRadius);
            ctx.lineTo(Math.floor(x) + halfPixel, chartAreaBottom + 1);
            ctx.stroke();
        } else {
            this.setState({ activePointIndex: null });
            ctx.clearRect(0, 0, chart.width, chart.height);
        }
        ctx.restore();
    };

    onBodyScroll = ({ target }) => {
        if (target.scrollWidth === target.scrollLeft + target.clientWidth) {
            this.setState({
                scrolledToEnd: true,
            });
        } else {
            this.setState({
                scrolledToEnd: false,
            });
        }
    };

    render() {
        const { labels, data, height, id } = this.props;
        const {
            activePointIndex,
            scrolledToEnd,
            paddingRight,
            paddingTop,
            paddingBottom,
            yTicksAmount,
        } = this.state;

        const width = this.calculateWidth();
        const { stepSize, max } = this.calculateMaxAndStepSize();

        const dataSet = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    label: '',
                    lineTension: 0,
                    backgroundColor: 'rgba(100, 199, 108, 0.3)',
                    borderColor: softGreen,
                    borderWidth: 3,
                    // Point ↓
                    pointStyle: 'circle',
                    pointRadius: 4,
                    pointBorderColor: softGreen,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: softGreen,
                    pointHoverBorderWidth: 3,
                    // Point ↑
                },
            ],
        };

        const options = {
            // plugin ↓
            firstPointPaddinLeft: 10,

            maintainAspectRatio: false,
            legend: {
                display: false,
            },

            hover: {
                onHover: (e, charElement) => this.onHoverPoint(charElement),
            },
            animation: false,
            responsive: false,
            layout: {
                padding: {
                    left: 0,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom,
                },
            },
            tooltips: {
                bodyFontFamily: 'FedraSans, sans-serif',
                bodyFontSize: 14,
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
                backgroundColor: 'rgba(20, 23, 26, 0.85)',
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            drawTicks: false,
                            lineWidth: 1,
                            color: paleGrey,
                            zeroLineColor: paleGrey,
                        },
                        afterBuildTicks: chart => {
                            const copyTicksArray = chart.ticks.slice();
                            // ↓ hide last tick yScale
                            copyTicksArray.splice(0, 1);
                            chart.ticks = copyTicksArray;
                        },
                        ticks: {
                            display: false,
                            max: max,
                            min: 0,
                            stepSize: stepSize,
                        },
                    },
                ],
            },
        };

        return (
            <div className={styles.lineChart}>
                <YScale
                    yTicksAmount={yTicksAmount}
                    paddingBottom={paddingBottom}
                    stepSize={stepSize}
                    data={data}
                    height={height}
                    paddingTop={paddingTop}
                />
                <div
                    onScroll={this.onBodyScroll}
                    className="line-chart-container"
                >
                    <div className="line-chart-block">
                        <div className="main-chart">
                            <Line
                                key={id}
                                ref={c => {
                                    this.lineChart = c;
                                }}
                                width={width}
                                height={height}
                                options={options}
                                data={dataSet}
                            />
                        </div>
                        <canvas
                            width={width * this._pixelRatio}
                            height={height * this._pixelRatio}
                            style={{
                                width: width,
                                height: height,
                            }}
                            ref={c => {
                                this.dashedLineCanvas = c;
                            }}
                            className="dashed-line-canvas"
                        />
                        <canvas
                            width={width * this._pixelRatio}
                            height={height * this._pixelRatio}
                            style={{
                                width: width,
                                height: height,
                            }}
                            ref={c => {
                                this.pointLine = c;
                            }}
                            className="point-line-canvas"
                        />
                        <XScale
                            labels={labels}
                            paddingRight={paddingRight}
                            width={width}
                            activePointIndex={activePointIndex}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: scrolledToEnd ? 'none' : 'block',
                        width: paddingRight,
                        height: height,
                    }}
                    className="line-chart-helper"
                />
            </div>
        );
    }
}

export default LineChart;
