import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import dataset from './polynomial.json';


export const PolynomialGraph = ({
    showDatasets, showRegLine, mysteryRegLine
}) => {

    const generatePlotData = (i, mysteryRegLine=null) => {
        const index = dataset['index'];
        const data = dataset[index[i]];
        const x = data['x'];
        const y = data['y'];
        const line = mysteryRegLine ?
            data[mysteryRegLine]['line'] : data['line'];
        const plot = [{
            x: data[x],
            y: data[y],
            mode: 'markers',
            opacity: 0.50,
            marker: {
                color: data['fillcolor'],
                line: { width: 1, color: `${data['bordercolor']}` },
                size: 12,
                symbol: data['symbol']
            },
            name: index[i]
        }];
        if (showRegLine[i]) {
            plot.push({
                type: 'scatter',
                mode: 'line',
                x: line['x'],
                y: line['y'],
                marker: { color: data['bordercolor'] },
                name: index[i].slice(0,3) + '. Reg.'
            });
        }
        return plot;
    };

    const plotData = [];
    if (showDatasets != null) {
        for (const [i, topic] of showDatasets.entries()) {
            if (topic) {
                generatePlotData(i, mysteryRegLine)
                    .forEach(x => plotData.push(x));
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