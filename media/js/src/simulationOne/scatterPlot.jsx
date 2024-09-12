import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import seedrandom from 'seedrandom';
import axios from 'axios';
import PropTypes from 'prop-types';
// import { saveAs } from 'file-saver';

// const isSuperUser = window.MetricsMentor.currentUser.is_superuser;

export const ScatterPlot = ({ N, yCorrelation, seed, setAppRvalue,
    setSlope, setIntercept, setStderror, plotType, setSlopes,
    setStderrs, xCorrelation, setAppRvalue3d, setIntercept3d
}) => {
    const [data, setData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);

    const generateData = () => {
        if (N < 50 || N > 500) {
            return [];
        }
        const rng = seedrandom(seed);

        let generatedData = [];
        if (typeof yCorrelation === 'number') {
            for (let i = 0; i < N; i++) {
                const x = Math.round((rng() * 100 - 50) * 2);
                const y = Math.round(yCorrelation * x + Math.sqrt(
                    1 - Math.pow(yCorrelation, 2)) * (rng() * 100 - 50) * 2);
                generatedData.push({ x, y });
            }
        }

        if (plotType === '3d') {
            generatedData = generatedData.map(point => ({
                ...point,
                z: Math.round(xCorrelation * point.x + Math.sqrt(
                    1 - Math.pow(xCorrelation, 2)) * (rng() * 100 - 50) * 2)
            }));
        }

        return generatedData;
    };

    const calculateRegression = async() => {
        if (N < 50 || N > 500) {
            return setRegressionLine({
                type: 'surface',
                mode: 'lines',
                x: [],
                y: [],
                marker: { color: 'red' },
            });
        }
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

                const { slope_x1, slope_x2, intercept,
                    stderr, rvalue } = response.data;
                setSlopes([slope_x1, slope_x2]);
                setIntercept3d(intercept);
                setStderrs(stderr);
                setAppRvalue3d(rvalue);

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

    // const exportCSV = () => {
    //     let headers = ['x', 'y'];
    //     if (plotType === '3d') {
    //         headers.push('z');
    //     }

    //     const dataRows = data.map(point => {
    //         let row = [point.x, point.y];
    //         if (plotType === '3d') {
    //             row.push(point.z);
    //         }
    //         return row.join(',');
    //     });

    //     const csv = [headers.join(','), ...dataRows].join('\n');
    //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    //     saveAs(blob, 'scatterplot_data.csv');
    // };

    useEffect(() => {
        if (N) {
            setData(generateData());
        }
    }, [N, yCorrelation, xCorrelation, seed, plotType]);

    useEffect(() => {
        if (data.length > 0) {
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
                    ...(plotType === '3d' ? {
                        scene: {
                            xaxis: {
                                title: 'X1',
                                dtick: 25,
                                range: [Math.min(...data.map(
                                    point => point.x)),
                                Math.max(...data.map(
                                    point => point.x))]
                            },
                            yaxis: {
                                title: 'Y',
                                dtick: 25,
                                range: [Math.min(...data.map(
                                    point => point.y)) - 10,
                                Math.max(...data.map(
                                    point => point.y)) + 10]
                            },
                            zaxis: {
                                title: 'X2',
                                dtick: 25,
                                range: [Math.min(...data.map(
                                    point => point.z)),
                                Math.max(...data.map(
                                    point => point.z))]
                            }
                        }
                    } : {
                        xaxis: {
                            title: 'X Axis',
                            dtick: 25,
                        },
                        yaxis: {
                            title: 'Y Axis',
                            dtick: 25,
                        }
                    }),
                    ...(plotType === '2d' ? { dragmode: false } : {}),
                }}

                useResizeHandler={true}
                style={{ height: '80%' }}
                config={{
                    scrollZoom: true,
                    displayModeBar: true,
                    modeBarButtonsToRemove: [
                        'toImage', 'resetCameraLastSave3d', 'select2d',
                        'lasso2d', 'autoScale2d'],
                }}
            />
            {/* {isSuperUser && (
                <div className="text-end me-5">
                    <button className="btn btn-sm btn-secondary"
                        onClick={exportCSV}>Export CSV</button>
                </div>
            )} */}
        </>
    );
};

ScatterPlot.propTypes = {
    N: PropTypes.number.isRequired,
    yCorrelation: PropTypes.number.isRequired,
    seed: PropTypes.string.isRequired,
    setAppRvalue: PropTypes.func,
    setSlope: PropTypes.func,
    setIntercept: PropTypes.func,
    setStderror: PropTypes.func,
    plotType: PropTypes.oneOf(['2d', '3d']).isRequired,
    setSlopes: PropTypes.func,
    setStderrs: PropTypes.func,
    xCorrelation: PropTypes.number,
    setAppRvalue3d: PropTypes.func,
    setIntercept3d: PropTypes.func,
};