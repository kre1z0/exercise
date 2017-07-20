import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';

class LineChart extends Component {
    componentWillMount() {
        Chart.pluginService.register({
            beforeDatasetsDraw: chart => {
                console.log('--> &&&&&&& <--', chart);
                const { greenLine, redLine } = this.props;
                const ctx = chart.chart.ctx;
                // ↓ When using a dashed line, make sure to save and restore the canvas
                // ↓ save
                ctx.save();

                const chartAreaLeft = chart.chartArea.left;
                const chartAreaRight = chart.chartArea.right;
                const chartAreaBottom = chart.chartArea.bottom;

                // addEvent:function (node, eventType, method)
                //console.log('--> chart helper', chart.helpers);

                // ↓ line
                ctx.setLineDash([10, 2]);
                ctx.lineWidth = 3;
                // ↓ green line
                ctx.beginPath();
                ctx.strokeStyle = 'green';
                ctx.moveTo(chartAreaLeft, chartAreaBottom - greenLine);
                ctx.lineTo(chartAreaRight, chartAreaBottom - greenLine);
                ctx.stroke();
                // ↓ red line
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.moveTo(chartAreaLeft, chartAreaBottom - redLine);
                ctx.lineTo(chartAreaRight, chartAreaBottom - redLine);
                ctx.stroke();

                // ↓ restore
                ctx.restore();
            },
        });
    }
    renderVerticalLineFromPoint = ([charElement]) => {
        console.log('--> charElement', charElement);
        if (charElement) {
            const ctx = charElement._chart.ctx;
            const view = charElement._view;
            const chartAreaBottom = charElement._chart.chartArea.bottom;
            const y = view.y;
            const x = view.x;
            const pointRadius = charElement._view.radius;
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'green';
            ctx.moveTo(x, y + pointRadius);
            ctx.lineTo(x, chartAreaBottom);
            ctx.stroke();
        }
    };
    render() {
        const { labels, data, greenLine, redLine } = this.props;
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
            onClick: (e, charElement) =>
                this.renderVerticalLineFromPoint(charElement),
            //hover: {
            //    onHover: (e, charElement) =>
            //        this.renderVerticalLineFromPoint(charElement),
            //},
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
                            //callback: tick => {
                            //    //console.log('--> ticks', tick);
                            //    //if (tick === 250) return null;
                            //    return tick;
                            //},
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
