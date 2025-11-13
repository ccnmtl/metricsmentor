import React from 'react';
import Plot from 'react-plotly.js';
import dataset from './logarithm.json';
import PropTypes from 'prop-types';

export const LogarithmGraph = ({ selectedModel, selectedFit }) => {

    if (!selectedModel) {
        return (
            <Plot
                data={[
                    {
                        x: [1],
                        y: [1],
                        mode: 'text',
                        text: ['Select a model to begin'],
                    }
                ]}
                layout={{
                    title: 'Logarithm Regression Models',
                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' },
                    font: { textcase: 'word caps' },
                    legend: {
                        orientation: 'h',
                        xanchor: 'center',
                        x: 0.5,
                        y: 1.18
                    },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '85%' }}
            />
        );
    }

    const model = dataset[selectedModel];
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
        }
    ];

    if (fitData && fitData.line) {
        plotData.push({
            x: fitData.line.x,
            y: fitData.line.y,
            mode: 'lines',
            line: { color: model.bordercolor },
            name: `${selectedFit.replace('Fit', '')} Fit`
        });
    }

    return (
        <Plot
            data={plotData}
            layout={{
                title: model.title,
                xaxis: { title: 'X' },
                yaxis: { title: 'Y' },
                legend: { orientation: 'h' },
            }}
            config={{ responsive: true }}
            style={{ width: '100%', height: '85%' }}
        />
    );
};

LogarithmGraph.propTypes = {
    selectedModel: PropTypes.string,
    selectedFit: PropTypes.string
};
