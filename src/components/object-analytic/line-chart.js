import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';

import firstPointPaddingLeft from './plugins/first-point-padding-left';
import styles from './line-chart.scss';

class LineChart extends Component {
    _pixelRatio = window.devicePixelRatio;

    componentWillMount() {
        Chart.pluginService.register(firstPointPaddingLeft);
    }
    componentDidMount() {
        const style = this.lineChart.chart_instance.canvas.style;
        this.pointLine
            .getContext('2d')
            .scale(this._pixelRatio, this._pixelRatio);
        this.lineCanvas
            .getContext('2d')
            .scale(this._pixelRatio, this._pixelRatio);
        style.zIndex = 1;
        style.position = 'relative';
        this.drawYscale();
        this.dashedLinesAndlabels();
    }
    componentDidUpdate() {
        this.drawYscale();
        this.dashedLinesAndlabels();
    }
    dashedLinesAndlabels() {
        const { labels, width, height } = this.props;
        const chart = this.lineChart.chart_instance;
        const chartAreaLeft = chart.chartArea.left;
        const chartAreaRight = chart.chartArea.right;
        const chartAreaBottom = chart.chartArea.bottom;
        const ctx = this.lineCanvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        const { greenLineValue, redLineValue } = this.props;
        if (greenLineValue && redLineValue) {
            ctx.setLineDash([5, 2]);
            // ↓ fix canvas 1px lineWidth bug
            const halfPixel = 0.5;

            // ↓ green line
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.moveTo(
                chartAreaLeft,
                chartAreaBottom + halfPixel - greenLineValue,
            );
            ctx.lineTo(
                chartAreaRight,
                chartAreaBottom + halfPixel - greenLineValue,
            );
            ctx.stroke();

            // ↓ red line
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(
                chartAreaLeft,
                chartAreaBottom + halfPixel - redLineValue,
            );
            ctx.lineTo(
                chartAreaRight,
                chartAreaBottom + halfPixel - redLineValue,
            );
            ctx.stroke();
        }
        const firstTickLabel = labels[0];
        const lastTickLabel = labels[labels.length - 1];
        const xAxe = chart.config.options.scales.xAxes[0];
        const xScale = chart.scales[xAxe.id];
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = 'green';
        ctx.font = '12px FedraSans, sans-serif';
        ctx.textAlign = 'start';
        ctx.fillText(
            firstTickLabel,
            xScale.left + 1,
            xScale.bottom - xScale.height / 4,
        );
        ctx.textAlign = 'end';
        ctx.fillText(
            lastTickLabel,
            xScale.right,
            xScale.bottom - xScale.height / 4,
        );
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
        const { width, height, labels } = this.props;
        const ctx = this.pointLine.getContext('2d');

        if (charElement) {
            ctx.clearRect(0, 0, width, height);
            const chart = charElement._chart;
            const index = charElement._index;
            const ticks = charElement._xScale.ticks;
            if (index === 0) {
                charElement._chart.tooltip._options.xAlign = 'left';
                charElement._chart.tooltip._options.yAlign = 'center';
            } else {
                charElement._chart.tooltip._options.xAlign = 'center';
                charElement._chart.tooltip._options.yAlign = 'bottom';
            }
            const chartAreaBottom = chart.chartArea.bottom;
            const view = charElement._view;
            const y = Math.floor(view.y);
            const x = Math.floor(view.x);
            const pointRadius = charElement._view.radius;
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#64c76c';
            const halfPixel = 0.5;
            ctx.beginPath();
            ctx.moveTo(x + halfPixel, y + pointRadius);
            ctx.lineTo(x + halfPixel, chartAreaBottom);
            ctx.stroke();
            ticks[index] = '';
            const xScale = charElement._xScale;
            ctx.textBaseline = 'alphabetic';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'green';
            ctx.font = '12px FedraSans, sans-serif';
            ctx.fillText(labels[index], x, xScale.bottom - xScale.height / 4);
        } else {
            const chart = this.lineChart.chart_instance;
            ctx.clearRect(0, 0, width, height);
            chart.update();
        }
    };
    render() {
        const { labels, data, width, height, bgColor } = this.props;
        const maxNumberOfData = Math.max(...data);
        const stepSize = maxNumberOfData / 4;
        const max = maxNumberOfData + stepSize;
        const dataSet = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    label: '',
                    lineTension: 0,
                    backgroundColor: 'rgba(100, 199, 108, 0.3)',
                    borderColor: 'rgb(100, 199, 108)',
                    borderWidth: 3,
                    // Point ↓
                    pointStyle: 'circle',
                    pointRadius: 4,
                    pointBorderColor: 'rgb(100, 199, 108)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(100, 199, 108)',
                    pointHoverBorderWidth: 3,
                    // Point ↑
                },
            ],
        };

        const options = {
            // plugins ↓
            firstPointPaddinLeft: 10,

            hover: {
                onHover: (e, charElement) => this.onHoverPoint(charElement),
            },
            animation: false,
            responsive: false,
            backgroundColor: 'red',
            layout: {
                padding: {
                    left: 30,
                    right: 30,
                    top: 20,
                    bottom: 10,
                },
            },
            tooltips: {
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
                bodyFontSize: 14,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        afterBuildTicks: chart => {
                            const copyTicksArray = chart.ticks.slice();
                            // ↓ hide first tick xScale
                            copyTicksArray.splice(0, 1, '');
                            // ↓ hide last tick xScale
                            copyTicksArray.splice(
                                chart.ticks.length - 1,
                                1,
                                '',
                            );
                            chart.ticks = copyTicksArray;
                        },
                        ticks: {
                            fontFamily: 'FedraSans, sans-serif',
                            fontSize: 12,
                            fontColor: 'gray',
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            drawTicks: false,
                            lineWidth: 1,
                            color: 'red',
                            zeroLineColor: 'red',
                        },
                        afterBuildTicks: chart => {
                            const copyTicksArray = chart.ticks.slice();
                            // ↓ hide last tick yScale
                            copyTicksArray.splice(0, 1);
                            chart.ticks = copyTicksArray;
                        },
                        ticks: {
                            fontSize: 12,
                            fontFamily: 'FedraSans, sans-serif',
                            fontColor: 'red',
                            padding: 10,
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
                    <Line
                        ref={c => {
                            this.lineChart = c;
                        }}
                        width={width}
                        height={height}
                        legend={{ display: false }}
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
                            this.lineCanvas = c;
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
                </div>
            </div>
        );
    }
}

export default LineChart;
