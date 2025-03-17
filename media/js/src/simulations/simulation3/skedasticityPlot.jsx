import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { seededRandom } from '../../utils/utils';
import PropTypes from 'prop-types';

export const SkedasticityScatterPlot = ({
    heteroskedasticity, setSlope, setIntercept,
    setStandardError, setRobustStandardError,
}) => {
    const N = 70;
    const [data, setData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);
    const [, setRValue] = useState(null);
    const [seed] = useState(10);

    const generateData = () => {
        let generatedData = [];
        const random = seededRandom(seed);
        let i = 0;
        while (generatedData.length < N) {
            const x = i; // x is always positive
            // const y = 2 * x + heteroskedasticity * (x / 10) * (
            //     random() - 0.5) * 20;
            const baseNoise = (random() - 0.5) * 20;
            const heteroNoise = (x / 10) * (random() - 0.5) * 20;
            const y = 2 * x + heteroskedasticity * (baseNoise + heteroNoise);
            if (y > 0) {
                generatedData.push({ x, y });
            }
            i++;
        }
        return generatedData;
    };

    const calculateRegression = async(generatedData) => {
        const x_values = generatedData.map((point) => point.x);
        const y_values = generatedData.map((point) => point.y);

        try {
            const response = await axios.post('/calc_regression/', {
                x_values,
                y_values,
            });
            const { slope, intercept, stderr,
                rvalue, stderr_robust } = response.data;

            // setSlope(slope);
            setSlope(Math.min(slope, 5));  // Cap extreme slopes
            setIntercept(intercept);
            setRValue(rvalue);

            // setStandardError(stderr);
            // setRobustStandardError(stderr_robust);

            setStandardError(Math.max(
                stderr * (2 + heteroskedasticity / 3), 1));
            setRobustStandardError(Math.max(
                stderr_robust * (2 + heteroskedasticity / 2), 1));

            setRegressionLine({
                type: 'scatter',
                mode: 'lines',
                x: [Math.min(...x_values), Math.max(...x_values)],
                y: [
                    slope * Math.min(...x_values) + intercept,
                    slope * Math.max(...x_values) + intercept,
                ],
                marker: { color: 'red' },
            });
        } catch (error) {
            console.error('Error calculating regression:', error);
        }
    };

    useEffect(() => {
        const newData = generateData();
        setData(newData);
        if (newData.length > 0) {
            calculateRegression(newData);
        }
    }, [heteroskedasticity]);

    return (
        <Plot
            data={[
                {
                    type: 'scatter',
                    mode: 'markers',
                    x: data.map((point) => point.x),
                    y: data.map((point) => point.y),
                    marker: {
                        color: 'teal',
                        size: 10,
                        line: { width: 1, color: 'blue' },
                    },
                },
                regressionLine,
            ]}
            layout={{
                title: 'Skedasticity',
                showlegend: false,
                xaxis: { title: 'X', minallowed: 0 },
                yaxis: { title: 'Y', scaleratio: 1, minallowed: 0 },
                dragmode: false,
            }}
            useResizeHandler={true}
            style={{ height: '88%' }}
            config={{
                scrollZoom: false,
                displayModeBar: true,
                modeBarButtonsToRemove: [
                    'toImage',
                    'resetCameraLastSave3d',
                    'select2d',
                    'lasso2d',
                    'autoScale2d',
                ],
            }}
        />
    );
};

SkedasticityScatterPlot.propTypes = {
    heteroskedasticity: PropTypes.number,
    setSlope: PropTypes.func,
    setIntercept: PropTypes.func,
    setStandardError: PropTypes.func,
    setRobustStandardError: PropTypes.func,
};