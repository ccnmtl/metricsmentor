// devUtils.js

import axios from 'axios';
import { saveAs } from 'file-saver';

export const minMax = function(arr) {
    return arr.reduce(function(p, v) {
        return ([p[0] < v ? p[0] : v, v < p[1] ? p[1] : v]);
    }, [Infinity, -Infinity]);
};

export const extractRegressionData = (x1_values, y_values, param, data) => {
    axios.post('/calc_regression/', {
        x_values: x1_values,
        y_values: y_values,
    }).then((response) => {
        const d = response.data;
        const xRange = minMax(x1_values);
        console.log('xRange:', xRange);
        console.log(param.x_1, d, 'yRange:',
            [xRange[0] * d.slope + d.intercept,
                xRange[1] * d.slope + d.intercept]);
    });

    for (let col of param.option) {
        axios.post('/calc_multi_regression/', {
            x1_values: x1_values,
            x2_values: data[col],
            y_values: y_values,
        }).then((response) => {
            const d = response.data;
            const xRange = minMax(x1_values);
            console.log(col, d, 'yRange:',
                [xRange[0] * d.slope_x1 + d.intercept,
                    xRange[1] * d.slope_x1 + d.intercept]);
        });
    }
};

export const exportCSV = (data, plotType) => {
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