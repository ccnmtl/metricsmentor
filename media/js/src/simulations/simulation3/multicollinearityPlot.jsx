import React from 'react';
import Plot from 'react-plotly.js';
import GENDATA from './multicollinearityGeneratedData.json';
import REALDATA from './multicollinearityRealData.json';
import PropTypes from 'prop-types';


export const MulticollinearityScatterPlot = ({controls, progress}) => {

    const DATA = progress == 0 ? GENDATA : REALDATA;
    const title = progress == 0 ? 'Multicollinearity': 'Profit Margins';
    const xaxis = progress == 0 ? 'x1' : REALDATA.x1.name;
    const yaxis = progress == 0 ? 'y' : 'Profits';
    const names = progress == 0 ? ['x1', 'x1 & x2', 'x1 & x3'] :
        ['R&D', 'R&D and Profit Margin', 'R&D and Sales'];

    const linedata = (y, color, dash, name) => ({
        type: 'scatter',
        marker: { color },
        mode: 'lines',
        line: {dash: dash},
        x: DATA.xRange,
        y: y,
        name: name
    });

    const data = [
        {
            type: 'scatter',
            mode: 'markers',
            x: DATA.x1.data,
            y: DATA.y,
            marker: {
                color: 'teal',
                size: 10,
                line: {
                    width: 1,
                    color: 'blue',
                },
            },
            name: 'Data'
        },
        linedata(DATA.x1.yRange, 'black', 'solid', names[0]),
    ];
    if (controls[0]) {
        data.push(linedata(DATA.x2.yRange, 'red', 'dot', names[1]));
    }
    if (controls[1]) {
        data.push(linedata(DATA.x3.yRange, 'blue', 'dashdot', names[2]));
    }

    return (
        <Plot
            data={data}
            layout={{
                title: title,
                legend: { orientation: 'h', xanchor: 'center',
                    x: 0.5, y: 1.18 },
                xaxis: { title: xaxis, minallowed: 0},
                yaxis: {
                    title: yaxis,
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
};

MulticollinearityScatterPlot.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.bool).isRequired,
    progress: PropTypes.number.isRequired
};