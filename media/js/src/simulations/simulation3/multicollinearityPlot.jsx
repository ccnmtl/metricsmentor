import React from 'react';
import Plot from 'react-plotly.js';
import GENDATA from './multicollinearityGeneratedData.json';
import REALDATA from './multicollinearityRealData.json';
import PropTypes from 'prop-types';


export const MulticollinearityScatterPlot = ({controls, progress}) => {

    const DATA = progress == 0 ? GENDATA : REALDATA;

    const labelPos = (range) => {
        return range[1] + (range[1] - range[0]) * 0.02;
    };

    const linedata = (y, color) => ({
        type: 'scatter',
        marker: { color },
        mode: 'lines',
        x: DATA.xRange,
        y: y,
    });

    const lineLabel = (line, color) => ({
        mode: 'text',
        text: [`x1 & ${line}`],
        textfont: { color },
        textposition: 'top center',
        x: [labelPos(DATA.xRange)],
        y: [DATA[line].yRange[1]],
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
        },
        {
            mode: 'text',
            text: ['x1'],
            textfont: { color: 'black' },
            textposition: 'top center',
            x: [labelPos(DATA.xRange)],
            y: [DATA.x1.yRange[1]],
        },
        linedata(DATA.x1.yRange, 'black'),
    ];
    if (controls[0]) {
        data.push(linedata(DATA.x2.yRange, 'red'),
            lineLabel('x2', 'red'));
    }
    if (controls[1]) {
        data.push(linedata(DATA.x3.yRange, 'blue'),
            lineLabel('x3', 'blue'));
    }

    return (
        <Plot
            data={data}
            layout={{
                title: 'Multicollinearity',
                showlegend: false,
                xaxis: { title: 'x_1 label', minallowed: 0},
                yaxis: {
                    title: 'y label',
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