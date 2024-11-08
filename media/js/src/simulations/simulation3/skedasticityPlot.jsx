import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { seededRandom } from '../../utils/utils';

export const SkedasticityScatterPlot = () => {
    const N = 50;
    const [data, setData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);
    const [standardError, setStandardError] = useState(null);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [rValue, setRValue] = useState(null);
    const [heteroskedasticity, setHeteroskedasticity] = useState(0);
    const [seed] = useState(Math.floor(Math.random() * 100));

    // Generate data points with increasing heteroskedasticity
    const generateData = () => {
        let generatedData = [];
        const random = seededRandom(seed);
        for (let i = 0; i < N; i++) {
            const x = i - N / 2;
            const y = 2 * x + (1 + heteroskedasticity * x / 10) * (
                random() - 0.5) * 20;
            generatedData.push({ x, y });
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
        <div>
            <div>
                <label>Heteroskedasticity:</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={heteroskedasticity}
                    onChange={(e) => setHeteroskedasticity(
                        parseFloat(e.target.value))}
                />
                <span>{heteroskedasticity}</span>
            </div>
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
                    title: 'Scatterplot with Adjustable Skedasticity',
                    showlegend: false,
                    xaxis: { title: 'X', dtick: 25,
                        range: [0, Math.max(...data.map(point => point.x))] },
                    yaxis: { title: 'Y', dtick: 25
                    },
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
                style={{ height: '80%' }}
                config={{
                    scrollZoom: true,
                    displayModeBar: true,
                    modeBarButtonsToRemove: [
                        'toImage', 'resetCameraLastSave3d', 'select2d',
                        'lasso2d', 'autoScale2d'],
                }}
            />
        </div>
    );
};
