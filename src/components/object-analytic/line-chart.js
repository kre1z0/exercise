import React, { PureComponent } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { paleGrey, softGreen, redOrange } from '../../assets/theme';
import firstPointPaddingLeft from './plugins/first-point-padding-left';
import XScale from './x-scale';
import YScale from './y-scale';

import styles from './line-chart.scss';

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
        yScaleTicks: [],
    };

    _pixelRatio = window.devicePixelRatio;

    componentWillMount() {
        Chart.pluginService.register([firstPointPaddingLeft]);
    }

    componentDidMount() {
        this.setStyles();
        this.dashedLines();
    }

    componentDidUpdate() {
        this.setStyles();
        this.dashedLines();
        const chart = this.lineChart.chart_instance;
        const yAxis = chart.config.options.scales.yAxes[0];
        const yScaleTicks = chart.scales[yAxis.id].ticks;
        console.log('--> componentDidUpdate', yScaleTicks);
        console.log('--> chart', chart);
    }

    setStyles() {
        const style = this.lineChart.chart_instance.canvas.style;
        this.pointLine
            .getContext('2d')
            .scale(this._pixelRatio, this._pixelRatio);
        this.dashedLineCanvas
            .getContext('2d')
            .scale(this._pixelRatio, this._pixelRatio);
        style.zIndex = 2;
        style.position = 'relative';
    }

    dashedLines() {
        const { redLineValue, greenLineValue, max } = this.props;

        const chart = this.lineChart.chart_instance;
        const top = chart.chartArea.top;
        const left = chart.chartArea.left;
        const bottom = chart.chartArea.bottom;
        const right = chart.chartArea.right;
        const getPixels = value => Math.round((bottom - top) / max * value);

        const ctx = this.dashedLineCanvas.getContext('2d');
        ctx.clearRect(0, 0, chart.width, chart.height);
        ctx.setLineDash([5, 2]);
        ctx.lineWidth = 1;
        // ↓ fix canvas 1px lineWidth bug
        const halfPixel = 0.5;

        // ↓ red line
        ctx.strokeStyle = redOrange;
        ctx.beginPath();
        ctx.moveTo(left, bottom + halfPixel - getPixels(redLineValue));
        ctx.lineTo(right, bottom + halfPixel - getPixels(redLineValue));
        ctx.stroke();

        // ↓ green line
        ctx.strokeStyle = softGreen;
        ctx.beginPath();
        ctx.moveTo(left, bottom + halfPixel - getPixels(greenLineValue));
        ctx.lineTo(right, bottom + halfPixel - getPixels(greenLineValue));
        ctx.stroke();
    }

    onHoverPoint = ([charElement]) => {
        const ctx = this.pointLine.getContext('2d');
        const chart = this.lineChart.chart_instance;

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
        const { activePointIndex, scrolledToEnd, yScaleTicks } = this.state;

        const paddingRight = 30;
        const paddingTop = 20;
        const paddingBottom = 10;
        const pointWidth = id === 1 || id === 2 ? 85 : 180;
        const width = labels.length * pointWidth - paddingRight;

        const getMaxTick = data => {
            const max = Math.max(...data);
            const lengthOfNumber = Math.floor(max).toString().length;
            const array = Array.from({ length: lengthOfNumber }, (_, index) => {
                if (index === 0) return 1;
                else return 0;
            });
            const operator = Number(array.join(''));
            return Math.ceil(max / operator) * operator;
        };
        const decimalAdjust = value => {
            let exp = Math.floor(value).toString().length - 1;
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math.ceil(value);
            }
            value = +value;
            exp = +exp;
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            value = value.toString().split('e');
            value = Math.ceil(
                +(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)),
            );
            value = value.toString().split('e');
            value = +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
            return value;
        };
        console.log('-->', decimalAdjust(888));

        const yTicksAmount = 5;
        const maxNumberOfData = getMaxTick(data);
        const stepSize = maxNumberOfData / (yTicksAmount - 1);
        const max = maxNumberOfData + stepSize;

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
                    yScaleTicks={yScaleTicks}
                    height={height}
                    paddingTop={paddingTop}
                />
                <div
                    onScroll={this.onBodyScroll}
                    className="line-chart-container"
                >
                    <div className="line-chart-block">
                        <Line
                            /* need for rerender width */
                            key={id}
                            ref={c => {
                                this.lineChart = c;
                            }}
                            width={width}
                            height={height}
                            options={options}
                            data={dataSet}
                        />
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
