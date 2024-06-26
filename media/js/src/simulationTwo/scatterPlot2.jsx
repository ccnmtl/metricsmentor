import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

// const LINE_COLOR = ['black', 'red', 'blue', 'green', 'purple', 'orange'];

export const ScatterPlot2 = ({ setAppRvalue,
    setSlope, setIntercept, setStderror, data, controls, x1, y
}) => {
    const [regressionLine, setRegressionLine] = useState(null);

    const y_values = data[y];
    const x_values = data[x1];

    const calculateRegression = async() => {
        try {
            const response = await axios.post('/calc_regression/', {
                y_values,
                x_values,
            });
            const { slope, intercept, stderr, rvalue } = response.data;

            setSlope(slope);
            setIntercept(intercept);
            setStderror(stderr);
            setAppRvalue(rvalue);

            // Calculate regression line for 2D plot
            const xMin = Math.min(...x_values);
            const xMax = Math.max(...x_values);
            setRegressionLine({
                type: 'scatter',
                mode: 'lines',
                x: [xMin, xMax],
                y: [slope * xMin + intercept, slope * xMax + intercept],
                marker: { color: 'black' },
            });

        } catch (error) {
            console.error('Error calculating regression:', error);
        }
    };

    const exportCSV = () => {
        let headers = ['x', 'y'];
        const dataRows = data.map(point => {
            let row = [point[x1], point[y]];
            return row.join(',');
        });

        const csv = [headers.join(','), ...dataRows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'ScatterPlot2_data.csv');
    };

    useEffect(() => {
        if(y_values.length > 0) {
            calculateRegression();
        }
    }, [controls, data]);

    return (
        <>
            <Plot
                data={[
                    {
                        type: 'scatter',
                        mode: 'markers',
                        x: x_values,
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
                    regressionLine,
                ]}
                layout={{
                    title: 'Single Variable Linear Regression',
                    showlegend: false,
                    xaxis: { title: 'X Axis', minallowed: 0},
                    yaxis: {
                        title: 'Y Axis',
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
            <div className="text-end me-5">
                <button className="btn btn-sm btn-secondary"
                    onClick={exportCSV}>Export CSV</button>
            </div>
        </>
    );
};

ScatterPlot2.propTypes = {
    appRvalue: PropTypes.number,
    controls: PropTypes.object,
    data: PropTypes.object.isRequired,
    setAppRvalue: PropTypes.func,
    setSlope: PropTypes.func,
    setIntercept: PropTypes.func,
    setStderror: PropTypes.func,
    slope: PropTypes.number,
    stderror: PropTypes.number,
    intercept: PropTypes.number,
    x1: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired,
};