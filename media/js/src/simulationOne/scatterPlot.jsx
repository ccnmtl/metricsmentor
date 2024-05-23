import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import seedrandom from 'seedrandom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

export const ScatterPlot = ({ N, correlation, seed, setAppRvalue,
    setSlope, setIntercept, setStderror, plotType, slopes, setSlopes,
    stderrs, setStderrs
}) => {
    const [data, setData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);

    const generateData = () => {
        const rng = seedrandom(seed);

        let generatedData = [];
        if (typeof correlation === 'number') {
            for (let i = 0; i < N; i++) {
                const x = Math.round((rng() * 100 - 50) * 2);
                const y = Math.round(correlation * x + Math.sqrt(
                    1 - Math.pow(correlation, 2)) * (rng() * 100 - 50) * 2);
                generatedData.push({ x, y });
            }
        }

        if (plotType === '3d') {
            generatedData = generatedData.map(point => ({
                ...point,
                z: Math.round(correlation * point.x + Math.sqrt(
                    1 - Math.pow(correlation, 2)) * (rng() * 100 - 50) * 2)
            }));
        }

        return generatedData;
    };

    // eslint-disable-next-line max-len
    // const calculateRegressionPlane = (x_values, y_values, slope_x1, slope_x2, intercept) => {
    //     const regressionPlane = [];
    //     for (let i = 0; i < x_values.length; i++) {
    //         for (let j = 0; j < y_values.length; j++) {
    //             const z =
    //              slope_x1 * x_values[i] + slope_x2 * y_values[j] + intercept;
    //             regressionPlane.push(z);
    //         }
    //     }
    //     return regressionPlane;
    // };

    const calculateRegression = async() => {
        const x_values = data.map(point => point.x);
        const y_values = data.map(point => point.y);
        const z_values = plotType === '3d'
            ? data.map(point => point.z)
            : undefined;

        try {

            if (plotType === '3d' && z_values[0]) {

                // eslint-disable-next-line max-len
                const response = await axios.post('/calc_multi_regression/', {
                    x1_values: x_values,
                    x2_values: y_values,
                    y_values: z_values,
                });

                const { slope_x1, slope_x2, intercept, stderr } = response.data;
                setSlopes([slope_x1, slope_x2]);
                setIntercept(intercept);
                setStderrs(stderr);

                // Generate a grid of x and y values
                const x_grid = [...new Set(x_values)].sort((a, b) => a - b);
                const y_grid = [...new Set(y_values)].sort((a, b) => a - b);

                // Generate a 2D array of z values
                // eslint-disable-next-line max-len
                const z_grid = x_grid.map(x => y_grid.map(y => slope_x1 * x + slope_x2 * y + intercept));

                setRegressionLine({
                    type: 'surface',
                    x: x_grid,
                    y: y_grid,
                    z: z_grid,
                    colorscale: [[0, 'rgb(0,0,0)'], [1, 'rgb(0,0,0)']],
                    showscale: false,
                    opacity: 0.5,
                });

            } else {
                const response = await axios.post('/calc_regression/', {
                    x_values,
                    y_values,
                });
                const { slope, intercept, stderr, rvalue } = response.data;

                setSlope(slope);
                setIntercept(intercept);
                setStderror(stderr);
                setAppRvalue(rvalue);

                // Calculate regression line for 2D plot
                setRegressionLine({
                    type: 'scatter',
                    mode: 'lines',
                    x: [Math.min(...x_values), Math.max(...x_values)],
                    // eslint-disable-next-line max-len
                    y: [slope * Math.min(...x_values) + intercept, slope * Math.max(
                        ...x_values) + intercept],
                    marker: { color: 'red' },
                });
            }

        } catch (error) {
            console.error('Error calculating regression:', error);
        }
    };

    const exportCSV = () => {
        let headers = ['x', 'y'];
        if (plotType === '3d') {
            headers.push('z');
        }

        const dataRows = data.map(point => {
            let row = [point.x, point.y];
            if (plotType === '3d') {
                row.push(point.z);
            }
            return row.join(',');
        });

        const csv = [headers.join(','), ...dataRows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'scatterplot_data.csv');
    };

    useEffect(() => {
        if(N) {
            setData(generateData());
        }
    }, [N, correlation, seed, plotType]);

    useEffect(() => {
        if(data.length > 0) {
            calculateRegression();
        }
    }, [data, plotType]);

    return (
        <>
            <Plot
                data={[
                    {
                        type: (plotType === '3d') ? 'scatter3d' : 'scatter',
                        mode: 'markers',
                        x: data.map(point => point.x),
                        y: data.map(point => point.y),
                        z: (plotType === '3d')
                            ? data.map(point => point.z)
                            : undefined,
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
                    xaxis: {
                        title: 'X Axis',
                        dtick: 25,
                        range: [Math.min(...data.map(point => point.y)),
                            Math.max(...data.map(point => point.y))]
                    },
                    yaxis: {
                        title: 'Y Axis',
                        scaleanchor: 'x',
                        scaleratio: 1,
                        dtick: 25,
                        range: [Math.min(...data.map(point => point.y)) - 10,
                            Math.max(...data.map(point => point.y)) + 10]
                    },
                    ...(plotType === '2d' ? { dragmode: 'pan' } : {}),
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

ScatterPlot.propTypes = {
    N: PropTypes.number.isRequired,
    correlation: PropTypes.number.isRequired,
    seed: PropTypes.string.isRequired,
    appRvalue: PropTypes.number,
    setAppRvalue: PropTypes.func,
    setSlope: PropTypes.func,
    setIntercept: PropTypes.func,
    setStderror: PropTypes.func,
    slope: PropTypes.number,
    stderror: PropTypes.number,
    intercept: PropTypes.number,
    plotType: PropTypes.oneOf(['2d', '3d']).isRequired,
    slopes: PropTypes.arrayOf(PropTypes.number),
    setSlopes: PropTypes.func,
    stderrs: PropTypes.arrayOf(PropTypes.number),
    setStderrs: PropTypes.func
};