import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import dataset from './polynomial.json';


export const PolynomialGraph = ({
    showDatasets, showRegLine, compareRegLine
}) => {
    const xAxis = { title: 'X'};
    const yAxis = { title: 'Y'};

    const generatePlotData = (i) => {
        const index = dataset['index'];
        const key = index[i];
        const data = dataset[key];
        const x = data['x'];
        const y = data['y'];
        if (data['xAxis']) {
            xAxis['range'] = data['xAxis'];
        }
        if (data['yAxis']) {
            yAxis['range'] = data['yAxis'];
        }

        const plot = [{
            x: data[x],
            y: data[y],
            mode: 'markers',
            opacity: 0.50,
            marker: {
                color: data['fillcolor'],
                line: { width: 1, color: data['bordercolor'] },
                size: 10,
                symbol: data['symbol']
            },
            name: key
        }];

        if (['mystery', 'real', 'real2'].includes(key) &&
            Array.isArray(compareRegLine)
        ){
            compareRegLine.forEach(reg => {
                const regData = data[reg];
                if (regData && regData.line) {
                    plot.push({
                        type: 'scatter',
                        mode: 'line',
                        x: regData.line.x,
                        y: regData.line.y,
                        marker: { color: regData['bordercolor'] },
                        name: `${reg.charAt(0).toUpperCase()
                            + reg.slice(1)} Reg.`
                    });
                }
            });
        } else if (showRegLine[i]) {
            plot.push({
                type: 'scatter',
                mode: 'line',
                x: data.line.x,
                y: data.line.y,
                marker: { color: data['bordercolor'] },
                name: key.slice(0, 3) + '. Reg.'
            });
        }

        return plot;
    };

    const plotData = [];
    if (Array.isArray(showDatasets) && showDatasets.includes(true)) {
        for (const [i, data] of showDatasets.entries()) {
            if (data) {
                generatePlotData(i).forEach(x => plotData.push(x));
            }
        }
    } else {
        plotData.push({
            x: [1],
            y: [1],
            mode: 'text',
            text: ['Choose a dataset to begin'],
        });
    }
    return (
        <Plot
            data={plotData}
            layout={{
                title: dataset['title'],
                font: { textcase: 'word caps' },
                xaxis: xAxis,
                yaxis: yAxis,
                legend: { orientation: 'h', xanchor: 'center', x: 0.5, y: 1.18 }
            }}
            style={{ height: '88%', width: '100%' }}
            config={{ responsive: true }}
        />
    );
};

PolynomialGraph.propTypes = {
    compareRegLine: PropTypes.string,
    showRegLine: PropTypes.arrayOf(PropTypes.bool).isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired
};