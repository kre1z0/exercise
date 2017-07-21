import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';

class LineChart extends Component {
    componentWillMount() {
        Chart.pluginService.register({
            beforeDatasetsDraw: chart => {
                console.log('--> <--', chart);
                const { greenLineValue, redLineValue } = this.props;

                const ctx = chart.chart.ctx;

                const chartAreaLeft = chart.chartArea.left;
                const chartAreaRight = chart.chartArea.right;
                const chartAreaBottom = chart.chartArea.bottom;
                const xAxe = chart.config.options.scales.xAxes[0];
                const xScale = chart.scales[xAxe.id];

                console.log('--> this', this.firstAndLastTicksLabel);
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'red';
                ctx.font = '12px FedraSans, sans-serif';
                ctx.textAlign = 'start';
                ctx.fillText('first', xScale.left, xScale.bottom - 11);
                ctx.textAlign = 'end';
                ctx.fillText('last', xScale.right, xScale.bottom - 11);

                if (greenLineValue && redLineValue) {
                    // ↓ When using a dashed line, make sure to save and restore the canvas
                    ctx.save();
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
                    ctx.restore();

                    // ↓ vertical line after hover a point
                    if (this._verticalLine) {
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'blue';
                        ctx.beginPath();
                        ctx.moveTo(
                            this._verticalLine.x + halfPixel,
                            this._verticalLine.y + this._verticalLine.radius,
                        );
                        ctx.lineTo(
                            this._verticalLine.x + halfPixel,
                            chartAreaBottom,
                        );
                        ctx.stroke();
                    }
                }
            },
        });
    }

    _verticalLine = null;

    renderVerticalLineFromPoint = ([charElement]) => {
        if (charElement) {
            const view = charElement._view;
            const y = view.y;
            const x = view.x;
            const pointRadius = charElement._view.radius;
            this._verticalLine = {
                x: x,
                y: y,
                radius: pointRadius,
            };
        } else {
            this._verticalLine = null;
        }
    };

    render() {
        const { labels, data } = this.props;
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
            hover: {
                onHover: (e, charElement) =>
                    this.renderVerticalLineFromPoint(charElement),
            },
            animation: false,
            responsive: false,
            layout: {
                padding: {
                    left: 0,
                    right: 25,
                    top: 0,
                    bottom: 0,
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
                            // ↓ hide first tick
                            chart.ticks.splice(0, 1, '');
                            // ↓ hide last tick
                            chart.ticks.splice(chart.ticks.length - 1, 1, '');
                        },
                        ticks: {
                            fontFamily: 'FedraSans, sans-serif',
                            fontSize: 12,
                            fontColor: 'green',
                        },
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            drawTicks: false,
                            lineWidth: 1,
                            color: 'blue',
                            zeroLineColor: 'green',
                            zeroLineBorderDash: [30],
                        },
                        afterBuildTicks: chart => {
                            // ↓ hide last tick
                            chart.ticks.splice(0, 1);
                        },
                        ticks: {
                            fontSize: 12,
                            fontFamily: 'FedraSans, sans-serif',
                            fontColor: 'red',
                            padding: 50,
                            max: max,
                            min: 0,
                            stepSize: stepSize,
                        },
                    },
                ],
            },
        };
        return (
            <Line
                width={1000}
                height={260}
                legend={{ display: false }}
                options={options}
                data={dataSet}
            />
        );
    }
}

export default LineChart;
