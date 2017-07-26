export default {
    afterUpdate: chart => {
        if (chart.config.options.firstPointPaddinLeft) {
            const dataFirstPoint = chart.getDatasetMeta(0).data[0];
            const paddingLeft = chart.config.options.firstPointPaddinLeft;
            dataFirstPoint._model.x = chart.chartArea.left + paddingLeft;
        }
    },
    beforeDatasetsDraw: chart => {
        if (chart.config.options.firstPointPaddinLeft) {
            const ctx = chart.ctx;
            const paddingLeft = chart.config.options.firstPointPaddinLeft;
            const datasets = chart.config.data.datasets[0];
            const borderWidth = datasets.borderWidth;
            const pointBorderWidth = datasets.pointBorderWidth;
            const borderColor = datasets.borderColor;
            const pointRadius = datasets.pointRadius;
            const dataFirstPoint = chart.getDatasetMeta(0).data[0];
            const y = dataFirstPoint._model.y;
            const firstPointY = chart.getDatasetMeta(0).data[0]._model.y;
            const chartAreaBottom = chart.chartArea.bottom;
            const halfPixel = 0.5;

            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = borderColor;
            ctx.beginPath();
            ctx.fillStyle = datasets.backgroundColor;
            ctx.rect(
                chart.chartArea.left + 1,
                firstPointY,
                paddingLeft - 1,
                chartAreaBottom - firstPointY,
            );
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(chart.chartArea.left + 1, y + halfPixel);
            ctx.lineTo(
                chart.chartArea.left +
                    2 +
                    paddingLeft -
                    pointRadius -
                    pointBorderWidth,
                y + halfPixel,
            );
            ctx.stroke();
        }
    },
};
