import React from 'react';
import Plot from 'react-plotly.js';
import baseDataset from './logarithm.json';
import realDataset from './logarithReal.json';
import PropTypes from 'prop-types';

export const LogarithmGraph = ({
    selectedModel, highlightedFit, showDatasets = [],
    compareRegLine = [] }) => {

    const REAL_LABELS = [
        'exports_tariffs', 'gdp_life_exp', 'gdp_co2',
        'advertising', 'ceosal2', 'houseprice'
    ];
    const activeRealDataIndex = showDatasets.findIndex(v => v);
    const isRealData = activeRealDataIndex !== -1;

    if (!selectedModel && !isRealData) {
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

    const modelKey = isRealData
        ? REAL_LABELS[activeRealDataIndex]
        : selectedModel;
    const model = isRealData ? realDataset[modelKey] : baseDataset[modelKey];
    const fits = isRealData
        ? compareRegLine
        : Object.keys(model).filter(k => k.endsWith('Fit'));
    const chosenFits = isRealData
        ? (fits.length > 0 ? fits : ['none'])
        : fits;

    const makePlotData = (fitKey, fitIndex) => {
        const x = model.X;
        const y = model.Y;
        const logX = model.log_X || x;
        const logY = model.log_Y || y;
        let plotX = x;
        let plotY = y;
        let lineX = [], lineY = [];
        let xAxisType = 'linear';
        let yAxisType = 'linear';
        let xAxisTitle = model.xLabel || 'X';
        let yAxisTitle = model.yLabel || 'Y';
        let intercept = 0;
        let slope = 0;

        if (fitKey !== 'none' && model[fitKey]) {
            intercept = model[fitKey].intercept || 0;
            slope = model[fitKey].slope || 0;
        }

        switch (fitKey) {
        case 'linearFit':
            // Linear regression: X vs Y
            lineX = [Math.min(...x), Math.max(...x)];
            lineY = lineX.map(xi => intercept + slope * xi);
            break;
        case 'logLinearFit':
            // Log-linear: X vs lnY
            plotY = logY;
            lineX = [Math.min(...x), Math.max(...x)];
            lineY = lineX.map(xi => intercept + slope * xi);
            yAxisType = 'linear';
            yAxisTitle = model.lnYLabel || 'ln(Y)';
            break;
        case 'linearLogFit':
            // Linear-log: ln(X) vs Y
            plotX = logX;
            plotY = y;
            lineX = [Math.min(...plotX), Math.max(...plotX)];
            lineY = lineX.map(xi => intercept + slope * xi);
            xAxisType = 'linear';
            xAxisTitle = model.lnXLabel || 'ln(X)';
            break;
        case 'logLogFit':
            // Log-log: ln(X) vs ln(Y)
            plotX = logX;
            plotY = logY;
            lineX = [Math.min(...plotX), Math.max(...plotX)];
            lineY = lineX.map(xi => intercept + slope * xi);
            xAxisType = 'linear';
            yAxisType = 'linear';
            xAxisTitle = model.lnXLabel || 'ln(X)';
            yAxisTitle = model.lnYLabel || 'ln(Y)';
            break;
        default:
            lineX = [Math.min(...x), Math.max(...x)];
            lineY = lineX.map(xi => intercept + slope * xi);
            // the legacy code also mapped y logic in default wait
        }

        // if there's no fit or it's none, use
        // raw values for plot if they are missing
        if (!isRealData && fitKey === 'none') {
            lineX = [Math.min(...x), Math.max(...x)];
            lineY = lineX.map(xi => intercept + slope * xi);
        } else if (!isRealData && fitKey !== 'none') {
            if (fitKey === 'logLinearFit') {
                plotY = y.map(yi => Math.log(yi));
            } else if (fitKey === 'linearLogFit') {
                plotX = x.map(xi => Math.log(xi));
                plotY = y;
            } else if (fitKey === 'logLogFit') {
                plotX = x.map(xi => Math.log(xi));
                plotY = y.map(yi => Math.log(yi));
            }
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
            }
        ];

        if (fitKey !== 'none' || !isRealData) {
            data.push({
                x: lineX,
                y: lineY,
                mode: 'lines',
                line: { color: model.bordercolor, width: 3 },
                name: `${fitKey.replace('Fit', '')} Regression`
            });
        }

        const REG_AB = ['Regression A', 'Regression B'];
        const fitName = fitKey === 'none'
            ? 'Raw Data'
            : fitKey
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .replace(/^./, str => str.toUpperCase());

        let title = isRealData
            ? (REG_AB[fitIndex] || fitName)
            : `${fitName}`;

        const layout = {
            title: title,
            xaxis: { title: xAxisTitle, type: xAxisType },
            yaxis: { title: yAxisTitle, type: yAxisType },
            margin: { t: 60, b: 40, l: 50, r: 20 },
            showlegend: false
        };

        return { data, layout };
    };

    const wrapperStyle = isRealData ? {
        display: 'flex',
        flexDirection: chosenFits.length > 2 ? 'column' : 'row',
        alignItems: 'stretch',
        gap: '0.5rem',
        width: '100%',
        height: '100%',
        maxHeight: '88vh',
        padding: '0.5rem',
        overflowY: chosenFits.length > 2 ? 'auto' : 'visible',
        flexWrap: 'wrap'
    } : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: '0.5rem',
        width: '100%',
        height: '88%',
        padding: '0.5rem',
    };

    return (
        <div style={wrapperStyle}>
            {chosenFits.map((fitKey, fitIndex) => {
                const { data, layout } = makePlotData(
                    fitKey, fitIndex
                );
                const isHighlighted = highlightedFit === fitKey;
                const childWidth = isRealData
                    ? (chosenFits.length === 1 ? '100%' : '48%')
                    : '50%';

                const childStyle = isRealData ? {
                    display: 'flex',
                    flexDirection: 'column',
                    width: childWidth,
                    minHeight: chosenFits.length > 2 ? '400px' : '100%',
                    border: isHighlighted ?
                        '2px solid gold' : '2px solid #ddd',
                    boxShadow: isHighlighted
                        ? 'inset 0 0 1rem -4px rgba(255,215,0,0.7)'
                        : 'inset 0 0 1rem -4px rgba(0,0,0,0.08)',
                    flexGrow: 1
                } : {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    height: '100%',
                    border: isHighlighted ?
                        '2px solid gold' : '2px solid #ddd',
                    boxShadow: isHighlighted
                        ? 'inset 0 0 1rem -4px rgba(255,215,0,0.7)'
                        : 'inset 0 0 1rem -4px rgba(0,0,0,0.08)'
                };

                return (
                    <div key={fitKey} style={childStyle}>
                        <Plot
                            data={data}
                            layout={layout}
                            config={{ responsive: true }}
                            style={{
                                width: '99%',
                                height: '100%',
                                margin: 'auto',
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
    highlightedFit: PropTypes.string,
    showDatasets: PropTypes.arrayOf(PropTypes.bool),
    compareRegLine: PropTypes.arrayOf(PropTypes.string)
};
