import React from 'react';
import Plot from 'react-plotly.js';

export const ScatterPlot = () => {
    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    mode: 'markers',
                    marker: { size: 12 },
                },
            ]}
            layout={{
                title: 'Generic Scatter Plot',
                xaxis: { title: 'X Axis' },
                yaxis: { title: 'Y Axis' },
            }
            }
            config={{ responsive: true }}
        />
    );
};