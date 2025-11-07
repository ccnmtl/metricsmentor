import React from 'react';
import Plot from 'react-plotly.js';
import dataset from './logarithm.json';
import PropTypes from 'prop-types';

export const LogarithmGraph = ({ selectedModel, selectedFit }) => {
    const model = dataset[selectedModel];
    if (!model) return null;

    const x = model.X;
    const y = model.Y;
    const fitData = model[selectedFit];

    const plotData = [
        {
            x,
            y,
            mode: 'markers',
            marker: {
                color: model.fillcolor,
                size: 10,
                symbol: model.symbol
            },
            name: 'Observed Data'
        },
        fitData && fitData.line && {
            x: fitData.line.x,
            y: fitData.line.y,
            mode: 'line',
            line: { color: model.bordercolor },
            name: `${selectedFit.replace('Fit', '')} Fit`
        }
    ].filter(Boolean);

    return (
        <Plot
            data={plotData}
            layout={{
                title: model.title,
                xaxis: { title: 'X' },
                yaxis: { title: 'Y' },
                legend: { orientation: 'h' }
            }}
            config={{ responsive: true }}
            style={{ width: '100%', height: '85%' }}
        />
    );
};

LogarithmGraph.propTypes = {
    selectedModel: PropTypes.string.isRequired,
    selectedFit: PropTypes.string.isRequired
};