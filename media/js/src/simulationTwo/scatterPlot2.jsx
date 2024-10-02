import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';
// import axios from 'axios';


export const ScatterPlot2 = ({controls, data, labelIndex, param}) => {

    let x1_values = [];
    let y_values = [];
    if (data) {
        x1_values = data[param.x_1];
        y_values = data[param.y];
    }

    const [selectedAltLines, setSelectedAltLines] = useState([]);

    // /**
    //  * !!DEV CODE!!: Use to extract the regression data for new data sets
    //  */
    // const minMax = function(arr) {
    //     return arr.reduce(function(p, v) {
    //         return ([p[0] < v ? p[0] : v, v < p[1] ? p[1] : v]);
    //     }, [Infinity, -Infinity]);
    // };

    // useEffect(() => {
    //     axios.post('/calc_regression/', {
    //         x_values: x1_values,
    //         y_values: y_values,
    //     }).then((response) => {
    //         const d = response.data;
    //         const xRange = minMax(x1_values);
    //         console.log('xRange:', xRange);
    //         console.log(param.x_1, d, 'yRange:',
    //             [xRange[0] * d.slope + d.intercept,
    //                 xRange[1] * d.slope + d.intercept]);
    //     });
    //     for (let col of param.option) {
    //         axios.post('/calc_multi_regression/', {
    //             x1_values: x1_values,
    //             x2_values: data[col],
    //             y_values: y_values,
    //         }).then((response) => {
    //             const d = response.data;
    //             const xRange = minMax(x1_values);
    //             console.log(col, d, 'yRange:',
    //                 [xRange[0] * d.slope_x1 + d.intercept,
    //                     xRange[1] * d.slope_x1 + d.intercept]);
    //         });
    //     }
    // }, [data]);

    useEffect(() => {
        const altLines = [];
        if (controls) {
            Object.entries(controls).forEach(([key, value]) => {
                if (value) {
                    altLines.push(param.lines[key]);
                }
            });
        }
        setSelectedAltLines(altLines);
    }, [controls]);

    const linedata = (y, color) => ({
        type: 'scatter',
        marker: { color },
        mode: 'lines',
        x: param.xRange,
        y: y,
    });

    const labelPos = (range) => {
        return range[1] + (range[1] - range[0]) * 0.02;
    };

    const lineLabel = (line) => ({
        mode: 'text',
        text: [`x1 & ${line.label}`],
        textfont: { color: 'black' },
        textposition: 'top center',
        x: [labelPos(param.xRange)],
        y: [line.y[1]],
    });

    if (data) {
        return (
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
                    {
                        mode: 'text',
                        text: ['x1'],
                        textfont: { color: 'black' },
                        textposition: 'top center',
                        x: [labelPos(param.xRange)],
                        y: [param.lines[param.x_1].y[1]],
                    },
                    linedata(param.lines[param.x_1].y, 'black'),
                    ...selectedAltLines.map((line) =>
                        linedata(line.y, line.color)),
                    ...selectedAltLines.map((line) =>
                        lineLabel(line, line.color)),
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
                    dragmode: false,
                }}
                useResizeHandler={true}
                style={{ height: '88%' }}
                config={{
                    scrollZoom: false,
                    displayModeBar: true,
                    modeBarButtonsToRemove: [
                        'toImage', 'resetCameraLastSave3d', 'select2d',
                        'lasso2d', 'autoScale2d'],
                }}
            />
        );
    } else {
        return (
            <Plot
                data={[{
                    x: [1],
                    y: [1],
                    mode: 'text',
                    text: ['Choose a dataset to begin'],
                }]}
                layout={{
                    title: 'Omitted Variable Bias',
                    showlegend: false,
                    xaxis: { showticklabels: false },
                    yaxis: { showticklabels: false },
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
        );
    }
};

ScatterPlot2.propTypes = {
    controls: PropTypes.object.isRequired,
    data: PropTypes.object,
    labelIndex: PropTypes.object.isRequired,
    param: PropTypes.object,
};