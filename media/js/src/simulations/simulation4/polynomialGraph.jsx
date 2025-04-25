import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import dataset from './polynomial.json';


export const PolynomialGraph = ({
    showDatasets, showRegLine, mysteryRegLine
}) => {

    const generatePlotData = (i) => {
        const index = dataset['index'];
        const key = index[i];
        const data = dataset[key];
        const x = data['x'];
        const y = data['y'];

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

        if (key === 'mystery' && Array.isArray(mysteryRegLine)) {
            mysteryRegLine.forEach(reg => {
                const regData = data[reg];
                if (regData && regData.line) {
                    plot.push({
                        type: 'scatter',
                        mode: 'line',
                        x: regData.line.x,
                        y: regData.line.y,
                        marker: { color: data['bordercolor'] },
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
    if (showDatasets != null) {
        for (const [i, data] of showDatasets.entries()) {
            if (data) {
                generatePlotData(i).forEach(x => plotData.push(x));
            }
        }
    }
    return (
        <Plot
            data={plotData}
            layout={{
                title: dataset['title'],
                font: { textcase: 'word caps' },
                xaxis: { title: 'X' },
                yaxis: { title: 'Y' },
                legend: { orientation: 'h', xanchor: 'center', x: 0.5, y: 1.18 }
            }}
            config={{ responsive: true }}
        />
    );
};

PolynomialGraph.propTypes = {
    mysteryRegLine: PropTypes.string,
    showRegLine: PropTypes.arrayOf(PropTypes.bool).isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired
};