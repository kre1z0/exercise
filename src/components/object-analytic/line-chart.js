import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';

import {
    coolGreyTwo,
    paleGrey,
    softGreen,
    redOrange,
} from '../../assets/theme';
import firstPointPaddingLeft from './plugins/first-point-padding-left';

import styles from './line-chart.scss';

class LineChart extends Component {
    state = {
        activePointIndex: null,
    };

    _pixelRatio = window.devicePixelRatio;

    componentWillMount() {
        Chart.pluginService.register([firstPointPaddingLeft]);
    }
    componentDidMount() {
        const style = this.lineChart.chart_instance.canvas.style;
        //console.log('--> componentDidMount', this.lineChart.chart_instance);
        this.pointLine
            .getContext('2d')
            .scale(this._pixelRatio, this._pixelRatio);
        style.zIndex = 2;
        style.position = 'relative';
        this.drawYscale();
        this.dashedLines();
    }
    componentDidUpdate() {
        console.log('--> componentDidUpdate');
        this.drawYscale();
        this.dashedLines();
    }
    dashedLines() {
        const { redLineValue, greenLineValue } = this.props;

        const chart = this.lineChart.chart_instance;
        const ctx = this.dashedLineCanvas.getContext('2d');
        ctx.clearRect(0, 0, chart.width, chart.height);
        const left = chart.chartArea.left;
        const bottom = chart.chartArea.bottom;
        const right = chart.chartArea.right;
        ctx.setLineDash([5, 2]);
        ctx.lineWidth = 1;
        // ↓ fix canvas 1px lineWidth bug
        const halfPixel = 0.5;

        // ↓ red line
        ctx.strokeStyle = redOrange;
        ctx.beginPath();
        ctx.moveTo(left, bottom + halfPixel - redLineValue);
        ctx.lineTo(right, bottom + halfPixel - redLineValue);
        ctx.stroke();

        // ↓ green line
        ctx.strokeStyle = softGreen;
        ctx.beginPath();
        ctx.moveTo(left, bottom + halfPixel - greenLineValue);
        ctx.lineTo(right, bottom + halfPixel - greenLineValue);
        ctx.stroke();
    }
    drawYscale() {
        const { width, height } = this.props;
        const chart = this.lineChart.chart_instance;
        const ctx = chart.ctx;
        const yAxe = chart.config.options.scales.yAxes[0];
        const yScale = chart.scales[yAxe.id];
        const sourceCanvas = ctx.canvas;
        const targetCtx = this.yScaleCanvas.getContext('2d');
        targetCtx.clearRect(0, 0, width, height);
        const leftPaddingLayout = chart.config.options.layout.padding.left;
        // ↓ +1px border and 35 padding layout
        const copyWidth = yScale.width + 1 + leftPaddingLayout;
        const copyHeight = chart.height;
        const yScaleWidth = copyWidth * this._pixelRatio;
        const yScaleHeight = copyHeight * this._pixelRatio;
        // ↓ Canvas not sizing to window inner width & height
        targetCtx.canvas.width = yScaleWidth;
        targetCtx.canvas.height = yScaleHeight;
        targetCtx.canvas.style.width = copyWidth + 'px';
        targetCtx.canvas.style.height = copyHeight + 'px';

        targetCtx.drawImage(
            sourceCanvas,
            0,
            0,
            yScaleWidth,
            yScaleHeight,
            0,
            0,
            yScaleWidth,
            yScaleHeight,
        );
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
    render() {
        const { labels, data, width, height, bgColor } = this.props;
        const { activePointIndex } = this.state;

        const maxNumberOfData = Math.max(...data);
        const stepSize = maxNumberOfData / 4;
        const max = maxNumberOfData + stepSize;
        const paddingRight = 30;
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
            // plugins ↓
            firstPointPaddinLeft: 10,

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
                    top: 0,
                    bottom: 0,
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
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            fontSize: 0,
                        },
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
                <canvas
                    style={{
                        backgroundColor: bgColor,
                    }}
                    ref={c => {
                        this.yScaleCanvas = c;
                    }}
                    className="y-scale-canvas"
                />
                <div className="line-chart-wrapper">
                    <div className="yScale">
                        <span className="yScale-item">
                            200
                        </span>
                        <span className="yScale-item">
                            150
                        </span>
                        <span className="yScale-item">
                            100
                        </span>
                        <span className="yScale-item">
                            50
                        </span>
                        <span className="yScale-item">
                            0
                        </span>
                    </div>
                    <div>
                        <Line
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
                        <div className="xScale">
                            {labels.map((label, index) => {
                                const translate =
                                    index *
                                    (width - paddingRight) /
                                    (labels.length - 1);
                                return (
                                    <span
                                        style={{
                                            color: index === activePointIndex
                                                ? softGreen
                                                : coolGreyTwo,
                                            transform: `translateX(${translate}px)`,
                                        }}
                                        className="xScale-item"
                                        key={`${label}-${index}`}
                                    >
                                        <div>
                                            {label}
                                        </div>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LineChart;
