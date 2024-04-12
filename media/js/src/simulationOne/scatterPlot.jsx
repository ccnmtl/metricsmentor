import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import seedrandom from 'seedrandom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

export const ScatterPlot = ({ N, correlation, seed, setAppRvalue,
    setSlope, setIntercept, setStderror, plotType
}) => {
    const [data, setData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);

    const generateData = () => {
        const rng = seedrandom(seed);

        const generatedData = [];
        if (typeof correlation === 'number') {
            for (let i = 0; i < N; i++) {
                const x = Math.round(rng() * 100);
                const y = Math.round(correlation * x + Math.sqrt(
                    1 - Math.pow(correlation, 2)) * rng() * 100);
                const z = plotType === '3d'
                    ? Math.round(rng() * 100)
                    : undefined;

                generatedData.push({ x, y, z });
            }
        }

        return generatedData;
    };

    const calculateRegression = async() => {
        const x_values = data.map(point => point.x);
        const y_values = data.map(point => point.y);

        try {
            const response = await axios.post('/calculate_regression/', {
                x_values,
                y_values,
            });

            const { slope, intercept, rvalue, stderr } = response.data;

            setAppRvalue(rvalue);
            setSlope(slope);
            setIntercept(intercept);
            setStderror(stderr);

            setRegressionLine({
                type: 'scatter',
                mode: 'lines',
                x: [Math.min(...x_values), Math.max(...x_values)],
                y: [slope * Math.min(...x_values) + intercept, slope * Math.max(
                    ...x_values) + intercept],
                marker: { color: 'red' },
            });
        } catch (error) {
            console.error('Error calculating regression:', error);
        }
    };
    const exportCSV = () => {
        const randomData = [
            ['x', 'y'],
            ...data.map(point => [point.x, point.y])
        ];

        const csv = randomData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'scatterplot_data.csv');
    };

    useEffect(() => {
        if(N) {
            setData(generateData());
        }
    }, [N, correlation, seed]);

    useEffect(() => {
        if(data.length > 0) {
            calculateRegression();
        }
    }, [data]);

    return (
        <>
            <Plot
                data={[
                    {
                        type: plotType === '3d' ? 'scatter3d' : 'scatter',
                        mode: 'markers',
                        x: data.map(point => point.x),
                        y: data.map(point => point.y),
                        z: plotType === '3d'
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
                    xaxis: { title: 'X Axis' },
                    yaxis: {
                        title: 'Y Axis',
                        scaleanchor: 'x',
                        scaleratio: 1,
                    },
                    dragmode: 'pan'
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
            <div className='text-end me-5'>
                <button className={'btn btn-sm btn-secondary'}
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
};