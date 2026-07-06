import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const COLOR_A = '#1f77b4';
const COLOR_B = '#ff7f0e';
const COLOR_C = '#2ca02c';

export const InteractionGraph = ({ dataset, model }) => {
    const config = DATASETS[dataset];
    const withInteraction = model === 'withInteraction';
    const {
        xTitle, xTicks, yTitle, yRange, format, titleSuffix,
        seriesA, seriesB, counterfactual, diffLabel,
        counterfactualName = 'C: Counterfactual', title,
        diffStyle = 'arrow',
    } = config;

    const yA = seriesA[model];
    const yB = seriesB[model];
    const diff = withInteraction ? yB[1] - counterfactual[1] : null;

    const data = [
        {
            x: [0, 1],
            y: yA,
            mode: 'lines+markers+text',
            name: seriesA.name,
            line: { color: COLOR_A, width: 3 },
            marker: { size: 10, color: COLOR_A },
            text: yA.map(format),
            textposition: ['top right', 'top right'],
            textfont: { color: COLOR_A, size: 12 },
        },
        {
            x: [0, 1],
            y: yB,
            mode: 'lines+markers+text',
            name: seriesB.name,
            line: { color: COLOR_B, width: 3 },
            marker: { size: 10, color: COLOR_B },
            text: yB.map(format),
            textposition: seriesB.textposition
                || ['bottom right', 'bottom right'],
            textfont: { color: COLOR_B, size: 12 },
        },
    ];

    if (withInteraction) {
        data.push({
            x: [0, 1],
            y: counterfactual,
            mode: 'lines+markers+text',
            name: counterfactualName,
            line: { color: COLOR_C, width: 3, dash: 'dash' },
            marker: { size: 10, color: COLOR_C },
            text: ['', format(counterfactual[1])],
            textposition: ['bottom right', 'top left'],
            textfont: { color: COLOR_C, size: 12 },
        });
    }

    const layout = {
        title: {
            text: title
                ? title({ model, diff })
                : `${withInteraction ? 'With' : 'No'}-interaction: `
                    + titleSuffix,
            font: { size: 16 },
        },
        xaxis: {
            title: xTitle,
            tickvals: [0, 1],
            ticktext: xTicks,
            range: [-0.15, 1.35],
            zeroline: false,
        },
        yaxis: {
            title: yTitle,
            range: yRange[model],
            zeroline: false,
        },
        legend: { x: 0, y: 1.15, orientation: 'h', font: { size: 11 } },
        margin: { t: 80, b: 60, l: 70, r: 40 },
        showlegend: true,
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
    };

    if (withInteraction) {
        const mid = (yB[1] + counterfactual[1]) / 2;
        if (diffStyle === 'bracket') {
            // Bracket lines between counterfactual and series B
            layout.shapes = [
                {
                    type: 'line', x0: 1.08, x1: 1.08,
                    y0: counterfactual[1], y1: yB[1],
                    line: { color: '#333', width: 2 },
                },
                {
                    type: 'line', x0: 1.06, x1: 1.10,
                    y0: yB[1], y1: yB[1],
                    line: { color: '#333', width: 2 },
                },
                {
                    type: 'line', x0: 1.06, x1: 1.10,
                    y0: counterfactual[1], y1: counterfactual[1],
                    line: { color: '#333', width: 2 },
                },
            ];
            layout.annotations = [
                {
                    x: 1.15, y: mid,
                    text: diffLabel(yB[1], counterfactual[1]),
                    showarrow: false, xanchor: 'left',
                    font: { size: 13, color: '#333' },
                },
            ];
        } else {
            layout.annotations = [
                // Double-headed arrow between counterfactual and series B
                {
                    x: 1.08, y: yB[1], ax: 1.08, ay: mid,
                    axref: 'x', ayref: 'y', showarrow: true,
                    arrowhead: 2, arrowsize: 1, arrowwidth: 1.5,
                    arrowcolor: '#333',
                },
                {
                    x: 1.08, y: counterfactual[1], ax: 1.08, ay: mid,
                    axref: 'x', ayref: 'y', showarrow: true,
                    arrowhead: 2, arrowsize: 1, arrowwidth: 1.5,
                    arrowcolor: '#333',
                },
                {
                    x: 1.12, y: mid,
                    text: diffLabel(yB[1], counterfactual[1]),
                    showarrow: false, xanchor: 'left',
                    font: { size: 12, color: '#333' },
                },
            ];
        }
    }
    return (
        <Plot
            data={data}
            layout={layout}
            config={{ responsive: true }}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

InteractionGraph.propTypes = {
    dataset: PropTypes.oneOf(['blackSouth', 'quizScore', 'did']).isRequired,
    model: PropTypes.oneOf(['noInteraction', 'withInteraction']).isRequired,
};

const BLACK_SOUTH_GRAPH = {
    xTitle: 'South',
    xTicks: ['South = 0', 'South = 1'],
    yTitle: 'Mean Wage',
    titleSuffix: 'Mean Wage by South',
    format: v => String(v),
    diffLabel: (b, cf) => String(b - cf),
    yRange: {
        noInteraction: [650, 1080],
        withInteraction: [640, 1080],
    },
    seriesA: {
        name: 'A: Non-Black',
        noInteraction: [1020, 921],
        withInteraction: [1015, 932],
    },
    seriesB: {
        name: 'B: Black',
        noInteraction: [798, 700],
        withInteraction: [860, 664],
    },
    counterfactual: [860, 777],
};

const QUIZ_SCORE_GRAPH = {
    xTitle: 'Post',
    xTicks: ['Post = 0', 'Post = 1'],
    yTitle: 'Mean Quiz Score',
    titleSuffix: 'Mean Quiz Score by Post',
    format: v => v.toFixed(2),
    diffLabel: (b, cf) => `DiD=${(b - cf).toFixed(2)}`,
    yRange: {
        noInteraction: [3.9, 5.7],
        withInteraction: [3.6, 5.7],
    },
    seriesA: {
        name: 'A: Control',
        noInteraction: [4.29, 5.40],
        withInteraction: [4.55, 5.15],
    },
    seriesB: {
        name: 'B: Treatment',
        noInteraction: [4.11, 5.22],
        withInteraction: [3.85, 5.49],
    },
    counterfactual: [3.85, 4.45],
};

const DID_GRAPH = {
    xTitle: '',
    xTicks: ['Before<br>(D1=0)', 'After<br>(D1=1)'],
    yTitle: 'Mean of Y',
    title: ({ diff }) => `DiD = ${diff.toFixed(2)}`,
    format: v => v.toFixed(3),
    diffLabel: (b, cf) => `DiD = ${(b - cf).toFixed(2)}`,
    counterfactualName: 'Counterfactual for D2 = 1',
    diffStyle: 'bracket',
    yRange: {
        noInteraction: [395, 480],
        withInteraction: [395, 480],
    },
    seriesA: {
        name: 'D2 = 0 (control)',
        noInteraction: [402.50, 431.80],
        withInteraction: [402.50, 431.80],
    },
    seriesB: {
        name: 'D2 = 1 (treated)',
        noInteraction: [418.77, 460.98],
        withInteraction: [418.77, 460.98],
        textposition: ['bottom right', 'top center'],
    },
    counterfactual: [418.77, 448.07],
};

const DATASETS = {
    blackSouth: BLACK_SOUTH_GRAPH,
    quizScore: QUIZ_SCORE_GRAPH,
    did: DID_GRAPH,
};
