import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';


export const ScatterPlot2 = ({controls, data, labelIndex, param}) => {

    const x1_values = data[param.x_1];
    const y_values = data[param.y];

    const [selectedAltLines, setSelectedAltLines] = useState([]);

    useEffect(() => {
        const altLines = [];
        Object.entries(controls).forEach(([key, value]) => {
            if (value) {
                altLines.push(param.lines[key]);
            }
        });
        setSelectedAltLines(altLines);
    }, [controls]);

    const linedata = function(y, color) {
        return {
            type: 'scatter',
            mode: 'lines',
            x: param.xRange,
            y: y,
            marker: { color },
        };
    };

    return (
        <>
            <Plot
                data={[
                    {
                        type: 'scatter',
                        mode: 'markers',
                        x: x1_values,
                        y: y_values,
                        marker: {
                            color: 'teal',
                            size: 10,
                            line: {
                                width: 1,
                                color: 'blue',
                            },
                        },
                    },
                    linedata(param.lines[param.x_1].y, 'black'),
                    ...selectedAltLines.map((line) =>
                        linedata(line.y, line.color)),
                ]}
                layout={{
                    title: 'Omitted Variable Bias',
                    showlegend: false,
                    xaxis: { title: labelIndex[param.x_1], minallowed: 0},
                    yaxis: {
                        title: labelIndex[param.y],
                        scaleratio: 1,
                        minallowed: 0,
                    },
                    dragmode: 'pan',
                }}
                useResizeHandler={true}
                style={{ height: '88%' }}
                config={{
                    scrollZoom: true,
                    displayModeBar: true,
                    modeBarButtonsToRemove: [
                        'toImage', 'resetCameraLastSave3d', 'select2d',
                        'lasso2d', 'autoScale2d'],
                }}
            />
        </>
    );
};

ScatterPlot2.propTypes = {
    controls: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    labelIndex: PropTypes.object.isRequired,
    param: PropTypes.object.isRequired,
};