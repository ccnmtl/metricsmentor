import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { seededRandom } from '../../utils/utils';
import PropTypes from 'prop-types';
import DATAPOINTS from './heteroskedRealData.json';
import REGRESSIONDATA from './regressionHeterosked.json';

export const SkedasticityScatterPlot = ({
    heteroskedasticity, setSlope, setIntercept,
    setStandardError, setRobustStandardError, useRealData
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
        let newData;

        if (useRealData) {
            // Use real-world data from JSON
            newData = DATAPOINTS.map(item => ({
                x: item.assasin,  // X-axis: Number of assassinations
                y: item.growth    // Y-axis: Growth
            }));

            const { slope } = REGRESSIONDATA.non_robust;
            const x_values = newData.map((point) => point.x);
            setRegressionLine({
                type: 'scatter',
                mode: 'lines',
                x: [Math.min(...x_values), Math.max(...x_values)],
                y: [
                    slope * Math.min(...x_values) + 2.104108,
                    slope * Math.max(...x_values) + 2.104108,
                ],
                marker: { color: 'red' },
            });

        } else {
            // Use generated data
            newData = generateData();
            calculateRegression(newData);
        }

        setData(newData);

    }, [heteroskedasticity, useRealData]);

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
                title: (useRealData) ?
                    'Growth and Number of Assassination Attempts in 1960'
                    :'Heteroskedasticity',
                showlegend: false,
                xaxis: { title: (useRealData)
                    ? 'Assassinations'
                    : 'X',
                minallowed: 0 },
                yaxis: { title: (useRealData)
                    ? 'Growth'
                    : 'Y',
                scaleratio: 1, minallowed: 0 },
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
    useRealData: PropTypes.bool,
};