import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import seedrandom from 'seedrandom';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ScatterPlot = ({ N, correlation, seed }) => {
    const [data, setData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);

    const generateData = () => {
        const rng = seedrandom(seed);

        const generatedData = [];
        if(correlation) {
            for (let i = 0; i < N; i++) {
                const x = rng();
                const y = correlation * x + Math.sqrt(1 - Math.pow(
                    correlation, 2)) * rng();

                generatedData.push({ x, y });
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

            const { slope, intercept } = response.data;

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

    useEffect(() => {
        setData(generateData());
    }, [N, correlation, seed]);

    useEffect(() => {
        if(data.length > 0) {
            calculateRegression();
        }
    }, [data]);

    return (
        <Plot
            data={[
                {
                    type: 'scatter',
                    mode: 'markers',
                    x: data.map(point => point.x),
                    y: data.map(point => point.y),
                    marker: { color: 'blue' },
                },
                regressionLine,
            ]}
            layout={{
                xaxis: { title: 'X Axis' },
                yaxis: { title: 'Y Axis' },

            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            config={{
                scrollZoom: true,
                displayModeBar: true,
                modeBarButtonsToRemove: [
                    'toImage', 'resetCameraLastSave3d', 'select2d',
                    'lasso2d', 'autoScale2d'],
            }}
        />
    );
};

ScatterPlot.propTypes = {
    N: PropTypes.number.isRequired,
    correlation: PropTypes.number.isRequired,
    seed: PropTypes.string.isRequired,
};