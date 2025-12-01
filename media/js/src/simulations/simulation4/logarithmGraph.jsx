import React from 'react';
import Plot from 'react-plotly.js';
import dataset from './logarithm.json';
import PropTypes from 'prop-types';

export const LogarithmGraph = ({
    selectedModel, highlightedFit }) => {

    if (!selectedModel) {
        return (
            <Plot
                data={[
                    {
                        x: [1],
                        y: [1],
                        mode: 'text',
                        text: ['Choose a dataset to begin'],
                        textposition: 'middle center',
                        showlegend: false
                    }
                ]}
                layout={{
                    title: 'Logarithms',
                    xaxis: { title: 'X'},
                    yaxis: { title: 'Y'},
                }}
                style={{ height: '88%', width: '100%' }}
                config={{ responsive: true }}
            />
        );
    }

    const model = dataset[selectedModel];
    const fits = Object.keys(model).filter(k => k.endsWith('Fit'));
    const chosenFits = fits;

    const makePlotData = (fitKey) => {
        const fit = model[fitKey];
        const x = model.X;
        const y = model.Y;
        const intercept = fit.intercept || 0;
        const slope = fit.slope || 0;

        let plotX = x;
        let plotY = y;
        let lineX, lineY;
        let xAxisType = 'linear';
        let yAxisType = 'linear';
        let xAxisTitle = 'X';
        let yAxisTitle = 'Y';

        switch (fitKey) {
        case 'linearFit':
            // Linear regression: X vs Y
            lineX = [Math.min(...x), Math.max(...x)];
            lineY = lineX.map(xi => intercept + slope * xi);
            break;
        case 'logLinearFit':
            // Log-linear: X vs lnY
            plotY = y.map(yi => Math.log(yi));
            lineX = [Math.min(...x), Math.max(...x)];
            lineY = lineX.map(xi => intercept + slope * xi);
            yAxisType = 'linear';
            yAxisTitle = 'ln(Y)';
            break;
        case 'linearLogFit':
            // Linear-log: ln(X) vs Y
            plotX = x.map(xi => Math.log(xi));
            plotY = y;
            lineX = [Math.min(...plotX), Math.max(...plotX)];
            lineY = lineX.map(xi => intercept + slope * xi);
            xAxisType = 'linear';
            xAxisTitle = 'ln(X)';
            break;
        case 'logLogFit':
            // Log-log: ln(X) vs ln(Y)
            plotX = x.map(xi => Math.log(xi));
            plotY = y.map(yi => Math.log(yi));
            lineX = [Math.min(...plotX), Math.max(...plotX)];
            lineY = lineX.map(xi => intercept + slope * xi);
            xAxisType = 'linear';
            yAxisType = 'linear';
            xAxisTitle = 'ln(X)';
            yAxisTitle = 'ln(Y)';
            break;
        default:
            lineX = [Math.min(...x), Math.max(...x)];
            lineY = lineX.map(xi => intercept + slope * xi);
        }
        const data = [
            {
                x: plotX,
                y: plotY,
                mode: 'markers',
                marker: {
                    color: model.fillcolor,
                    size: 8,
                    symbol: model.symbol
                },
                name: 'Observed Data'
            },
            {
                x: lineX,
                y: lineY,
                mode: 'lines',
                line: { color: model.bordercolor, width: 3 },
                name: `${fitKey.replace('Fit', '')} Regression`
            }
        ];

        const fitName = fitKey
            .replace('Fit', '')
            .replace(/([A-Z])/g, ' $1')
            .trim();
        const layout = {
            title: `${model.title}: ${fitName}`,
            xaxis: { title: xAxisTitle, type: xAxisType },
            yaxis: { title: yAxisTitle, type: yAxisType },
            margin: { t: 60, b: 40, l: 50, r: 20 },
            showlegend: false
        };

        return { data, layout };
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '0',
            width: '100%',
            height: '88%',
        }}>
            {chosenFits.map((fitKey) => {
                const { data, layout } = makePlotData(fitKey);
                const isHighlighted = highlightedFit === fitKey;
                return (
                    <div
                        key={fitKey}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%',
                            height: '100%',
                            border: isHighlighted ?
                                '2px solid gold' : '2px solid #ddd',
                            boxShadow: isHighlighted
                                ? '0 2px 8px rgba(255, 215, 0, 0.5)'
                                : '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                    >
                        <Plot
                            data={data}
                            layout={layout}
                            config={{ responsive: true }}
                            style={{
                                width: '99%',
                                height: '100%'
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

LogarithmGraph.propTypes = {
    selectedModel: PropTypes.string,
    selectedFit: PropTypes.string,
    highlightedFit: PropTypes.string
};
