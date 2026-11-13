import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const COLOR_A = '#1f77b4';
const COLOR_B = '#ff7f0e';
const COLOR_C = '#2ca02c';

const MODEL_COLORS = {
    noInteraction: { a: '#9467bd', b: '#d62728' },
    withInteraction: { a: COLOR_A, b: COLOR_B },
};

// Label shown in place of a value that is still locked behind a quiz.
const HIDDEN_LABEL = '?';

const MODEL_TITLES = {
    noInteraction: 'No-interaction',
    withInteraction: 'With-interaction',
};

// Plots one model (`noInteraction` or `withInteraction`) for a dataset.
// `revealed` (optional) lists the value keys that have been unlocked (see
// getRevealedValues in d1d2QuizData.jsx). Datasets declare hidden labels
// with `quizGatedLabels`; if `revealed` is omitted, every label is shown.
export const InteractionGraph = ({ dataset, model, revealed }) => {
    const config = DATASETS[dataset];
    const {
        xTitle, xTicks, yTitle, yRange, format, titleSuffix,
        seriesA, seriesB, counterfactual, diffLabel,
        counterfactualName = 'C: Counterfactual', title,
        diffStyle = 'arrow', quizGatedLabels,
    } = config;

    const isWith = model === 'withInteraction';

    const seriesTrace = (series, colorKey) => {
        const y = series[model];
        const color = series.color || MODEL_COLORS[model][colorKey];
        // Push the first point's label left and the last point's right,
        // off the sloped line.
        const textposition = colorKey === 'a'
            ? ['top left', 'top right']
            : series.textposition || ['bottom left', 'bottom right'];
        const gated = quizGatedLabels && quizGatedLabels[series.key];
        return {
            x: [0, 1],
            y,
            mode: 'lines+markers+text',
            name: series.name,
            line: { color, width: 3 },
            marker: { size: 10, color },
            text: y.map((v, i) => {
                const key = isWith && revealed && gated && gated[i];
                return key && !revealed.includes(key)
                    ? HIDDEN_LABEL : format(v);
            }),
            textposition,
            textfont: { color, size: 12 },
            cliponaxis: false,
        };
    };

    const data = [seriesTrace(seriesA, 'a'), seriesTrace(seriesB, 'b')];
    if (isWith) {
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

    // No hover tooltips on with-interaction graphs that hide values
    const noHover = isWith && !!quizGatedLabels;
    if (noHover) {
        data.forEach(trace => {
            trace.hoverinfo = 'skip';
        });
    }

    const yBWith = seriesB.withInteraction;
    const diff = isWith ? yBWith[1] - counterfactual[1] : null;

    // Same y-range for both models so the stacked graphs are comparable.
    const combinedRange = [
        Math.min(yRange.noInteraction[0], yRange.withInteraction[0]),
        Math.max(yRange.noInteraction[1], yRange.withInteraction[1]),
    ];

    const layout = {
        title: {
            text: title
                ? title({ diff })
                : `${MODEL_TITLES[model]}: ${titleSuffix}`,
            font: { size: 16 },
        },
        xaxis: {
            title: xTitle,
            tickvals: [0, 1],
            ticktext: xTicks,
            range: [-0.15, 1.35],
            zeroline: false,
            automargin: true,
        },
        yaxis: {
            title: yTitle,
            range: combinedRange,
            zeroline: false,
            automargin: true,
        },
        legend: {
            x: 0.5,
            xanchor: 'center',
            y: -0.2,
            yanchor: 'top',
            orientation: 'h',
            font: { size: 11 },
        },
        margin: { t: 50, b: 110, l: 70, r: 40 },
        showlegend: true,
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        hovermode: noHover ? false : 'closest',
    };

    if (isWith) {
        const mid = (yBWith[1] + counterfactual[1]) / 2;
        if (diffStyle === 'bracket') {
            // Bracket lines between counterfactual and series B
            layout.shapes = [
                {
                    type: 'line', x0: 1.08, x1: 1.08,
                    y0: counterfactual[1], y1: yBWith[1],
                    line: { color: '#333', width: 2 },
                },
                {
                    type: 'line', x0: 1.06, x1: 1.10,
                    y0: yBWith[1], y1: yBWith[1],
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
                    text: diffLabel(yBWith[1], counterfactual[1]),
                    showarrow: false, xanchor: 'left',
                    font: { size: 13, color: '#333' },
                },
            ];
        } else {
            layout.annotations = [
                // Double-headed arrow between counterfactual and series B
                {
                    x: 1.08, y: yBWith[1], ax: 1.08, ay: mid,
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
                    text: diffLabel(yBWith[1], counterfactual[1]),
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
    revealed: PropTypes.arrayOf(PropTypes.string),
};


export const InteractionGraphs = ({ dataset, models, revealed }) => {
    const shown = ['noInteraction', 'withInteraction']
        .filter(m => models[m]);

    if (shown.length === 0) {
        return (
            <div className="interaction-graphs__empty">
                Select a model to see its graph
            </div>
        );
    }

    return (
        <div className={'interaction-graphs' +
            (shown.length > 1 ? ' interaction-graphs--multi' : '')}>
            {shown.map(m => (
                <div className="interaction-graphs__item"
                    key={`${m}-${shown.length}`}>
                    <InteractionGraph
                        dataset={dataset}
                        model={m}
                        revealed={revealed}
                    />
                </div>
            ))}
        </div>
    );
};

InteractionGraphs.propTypes = {
    dataset: PropTypes.oneOf(['blackSouth', 'quizScore']).isRequired,
    models: PropTypes.shape({
        noInteraction: PropTypes.bool,
        withInteraction: PropTypes.bool,
    }).isRequired,
    revealed: PropTypes.arrayOf(PropTypes.string),
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
        key: 'A',
        name: 'A: Non-Black',
        noInteraction: [1020, 921],
        withInteraction: [1015, 932],
    },
    seriesB: {
        key: 'B',
        name: 'B: Black',
        noInteraction: [798, 700],
        withInteraction: [860, 664],
    },
    counterfactual: [860, 777],
    // With-interaction labels hidden until the related mini quiz question
    // is answered
    quizGatedLabels: {
        A: ['nonBlackNonSouth', null], // 1015
        B: ['blackNonSouth', 'blackSouth'], // 860, 664
    },
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
