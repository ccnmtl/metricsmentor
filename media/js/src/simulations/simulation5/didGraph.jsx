import React from 'react';
import Plot from 'react-plotly.js';

export const DiDGraph = () => {
    // Data points
    const controlBefore = 402.50;
    const controlAfter = 431.80;
    const treatedBefore = 418.77;
    const treatedAfter = 460.98;
    const counterfactualAfter = 448.07;

    // const controlChange = controlAfter - controlBefore; // 29.30
    // const treatedChange = treatedAfter - treatedBefore; // 42.21
    const did = treatedAfter - counterfactualAfter; // 12.91

    const data = [
        // Line A: Control (D2=0) — solid blue
        {
            x: [0, 1],
            y: [controlBefore, controlAfter],
            mode: 'lines+markers+text',
            name: 'D2 = 0 (control)',
            line: { color: '#1f77b4', width: 3 },
            marker: { size: 10, color: '#1f77b4' },
            text: [controlBefore.toFixed(3), controlAfter.toFixed(3)],
            textposition: ['bottom right', 'bottom right'],
            textfont: { color: '#1f77b4', size: 12 },
        },
        // Line B: Treated (D2=1) — solid orange
        {
            x: [0, 1],
            y: [treatedBefore, treatedAfter],
            mode: 'lines+markers+text',
            name: 'D2 = 1 (treated)',
            line: { color: '#ff7f0e', width: 3 },
            marker: { size: 10, color: '#ff7f0e' },
            text: [treatedBefore.toFixed(3), treatedAfter.toFixed(3)],
            textposition: ['bottom left', 'top left'],
            textfont: { color: '#ff7f0e', size: 12 },
        },
        // Line C: Counterfactual — dashed green
        {
            x: [0, 1],
            y: [treatedBefore, counterfactualAfter],
            mode: 'lines+markers+text',
            name: 'Counterfactual for D2 = 1',
            line: { color: '#2ca02c', width: 3, dash: 'dash' },
            marker: { size: 10, color: '#2ca02c', symbol: 'circle' },
            text: ['', counterfactualAfter.toFixed(3)],
            textposition: ['bottom left', 'bottom right'],
            textfont: { color: '#2ca02c', size: 12 },
        },
        // // Annotation arrow: Treated change
        // {
        //     x: [0.48, 0.48],
        //     y: [controlBefore, treatedAfter],
        //     mode: 'lines',
        //     line: { color: '#333', width: 1.5 },
        //     showlegend: false,
        //     hoverinfo: 'skip',
        // },
        // // Annotation arrow: Control change
        // {
        //     x: [0.52, 0.52],
        //     y: [controlBefore, controlAfter],
        //     mode: 'lines',
        //     line: { color: '#333', width: 1.5 },
        //     showlegend: false,
        //     hoverinfo: 'skip',
        // },
    ];

    const layout = {
        title: {
            text: 'DiD = 12.91',
            font: { size: 16 },
        },
        xaxis: {
            title: '',
            tickvals: [0, 1],
            ticktext: ['Before<br>(D1=0)', 'After<br>(D1=1)'],
            range: [-0.15, 1.35],
            zeroline: false,
        },
        yaxis: {
            title: 'Mean of Y',
            range: [395, 480],
            zeroline: false,
        },
        legend: {
            x: 0,
            y: 1.15,
            orientation: 'h',
            font: { size: 11 },
        },
        margin: { t: 80, b: 60, l: 60, r: 60 },
        showlegend: true,
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        annotations: [
            // // Treated change label
            // {
            //     x: 0.35,
            //     y: (controlBefore + treatedAfter) / 2 + 10,
            //     text: `Treated change = ${treatedChange.toFixed(3)}`,
            //     showarrow: true,
            //     arrowhead: 2,
            //     ax: -60,
            //     ay: -30,
            //     font: { size: 11, color: '#2ca02c' },
            // },
            // // Control change label
            // {
            //     x: 0.5,
            //     y: (controlBefore + controlAfter) / 2 - 10,
            //     text: `Control change = ${controlChange.toFixed(3)}`,
            //     showarrow: true,
            //     arrowhead: 2,
            //     ax: -20,
            //     ay: 40,
            //     font: { size: 11, color: '#333' },
            // },
            // DiD label with arrow
            {
                x: 1.15,
                y: (treatedAfter + counterfactualAfter) / 2,
                text: `DiD = ${did.toFixed(2)}`,
                showarrow: false,
                font: { size: 13, color: '#333', },
            },
            // // Actual treated-after annotation
            // {
            //     x: 0.65,
            //     y: (treatedAfter + counterfactualAfter) / 2 + 4,
            //     text: 'actual treated-after<br>if there were no interaction',
            //     showarrow: false,
            //     font: { size: 10, color: '#ff7f0e' },
            // },
        ],
        shapes: [
            // DiD bracket — vertical line from counterfactual to treated
            {
                type: 'line',
                x0: 1.08,
                x1: 1.08,
                y0: counterfactualAfter,
                y1: treatedAfter,
                line: { color: '#333', width: 2 },
            },
            // DiD bracket — top arrow
            {
                type: 'line',
                x0: 1.06,
                x1: 1.10,
                y0: treatedAfter,
                y1: treatedAfter,
                line: { color: '#333', width: 2 },
            },
            // DiD bracket — bottom arrow
            {
                type: 'line',
                x0: 1.06,
                x1: 1.10,
                y0: counterfactualAfter,
                y1: counterfactualAfter,
                line: { color: '#333', width: 2 },
            },
        ],
    };

    return (
        <Plot
            data={data}
            layout={layout}
            config={{ responsive: true }}
            style={{ width: '100%', height: '100%' }}
        />
    );
};
