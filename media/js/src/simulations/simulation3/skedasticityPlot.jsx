import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { seededRandom } from '../../utils/utils';
import PropTypes from 'prop-types';

export const SkedasticityScatterPlot = ({
    heteroskedasticity
}) => {
    const N = 50;
    const [data, setData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);
    const [standardError, setStandardError] = useState(null);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [rValue, setRValue] = useState(null);
    const [seed] = useState(Math.floor(Math.random() * 100));

    const generateData = () => {
        let generatedData = [];
        const random = seededRandom(seed);
        let i = 0;
        while (generatedData.length < N) {
            const x = i; // x is always positive
            const y = 2 * x + (1 + heteroskedasticity * x / 10) * (
                random() - 0.5) * 20;
            if (y > 0) {  // Only add if y is positive
                generatedData.push({ x, y });
            }
            i++;
        }
        return generatedData;
    };

    const calculateRegression = async() => {
        const x_values = data.map(point => point.x);
        const y_values = data.map(point => point.y);

        try {
            const response = await axios.post(
                '/calc_regression/', { x_values, y_values });
            const { slope, intercept, stderr, rvalue } = response.data;

            setSlope(slope);
            setIntercept(intercept);
            setStandardError(stderr);
            setRValue(rvalue);

            // Set the regression line for the plot
            setRegressionLine({
                type: 'scatter',
                mode: 'lines',
                x: [Math.min(...x_values), Math.max(...x_values)],
                // eslint-disable-next-line max-len
                y: [slope * Math.min(...x_values) + intercept, slope * Math.max(...x_values) + intercept],
                marker: { color: 'red' },
            });
        } catch (error) {
            console.error('Error calculating regression:', error);
        }
    };

    useEffect(() => {
        const generatedData = generateData();
        setData(generatedData);
    }, [heteroskedasticity]);

    useEffect(() => {
        if (data.length > 0) {
            calculateRegression();
        }
    }, [data]);

    useEffect(() => {
        // Generate initial data and calculate regression line
        const initialData = generateData(0);
        setData(initialData);
        if (data.length > 0) {
            calculateRegression();
        }
    }, []);

    useEffect(() => {
        // Update data points based on heteroskedasticity
        // without changing the regression line
        const updatedData = generateData(heteroskedasticity);
        setData(updatedData);
    }, [heteroskedasticity]);

    return (

        <Plot
            data={[
                {
                    type: 'scatter',
                    mode: 'markers',
                    x: data.map(point => point.x),
                    y: data.map(point => point.y),
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
                title: 'Skedasticity',
                showlegend: false,
                xaxis: { title: 'X',  minallowed: 0 },
                yaxis: { title: 'Y', scaleratio: 1,  minallowed: 0},
                dragmode: false,
                annotations: [
                    {
                        // eslint-disable-next-line max-len
                        text: `y = ${slope ? slope.toFixed(2) : ''}x + ${intercept ? intercept.toFixed(2) : ''}`,
                        xref: 'paper',
                        yref: 'paper',
                        x: 0.05,
                        y: 1.1,
                        showarrow: false,
                    },
                    standardError !== null && {
                        text: `Standard Error: ${standardError.toFixed(2)}`,
                        xref: 'paper',
                        yref: 'paper',
                        x: 0.05,
                        y: 1.05,
                        showarrow: false,
                    },
                    {
                        text: `R-value: ${rValue ? rValue.toFixed(2) : ''}`,
                        xref: 'paper',
                        yref: 'paper',
                        x: 0.05,
                        y: 1,
                        showarrow: false,
                    },
                ],
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
};

SkedasticityScatterPlot.propTypes = {
    heteroskedasticity: PropTypes.number,
};