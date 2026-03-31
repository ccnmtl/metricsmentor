import React, { useState, useEffect } from 'react';
import { PromptBlock } from '../../PromptBlock';
import PropTypes from 'prop-types';

export const RealDataLogarithm = ({
    setShowDatasets, showDatasets,
    setCompareRegLine, compareRegLine,
    setHighlightedFit
}) => {

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [datasetStarted, setDatasetStarted] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openFit, setOpenFit] = useState({});

    const LABELS_GROUP_1 = [
        ['exports_tariffs', 'Effect of tariffs on exports', 0],
        ['gdp_life_exp', 'Effect of average income level of countries ' +
            '(GDP per capita) on their population’s life expectancy', 1],
        ['gdp_co2', 'Effect of average income level of a country ' +
            '(GDP per capita) on CO2 emission per capita', 2]
    ];

    const LABELS_GROUP_2 = [
        ['advertising', 'Advertising (Sales vs TV)', 3],
        ['ceosal2', 'CEO Salary vs Sales', 4],
        ['houseprice', 'House Price vs Area', 5]
    ];

    const ALL_LABELS = [...LABELS_GROUP_1, ...LABELS_GROUP_2];

    const REGS_MAP = {
        exports_tariffs: ['linearFit', 'logLinearFit'],
        gdp_life_exp: ['linearFit', 'linearLogFit'],
        gdp_co2: ['linearFit', 'logLogFit'],
        advertising: ['linearFit', 'logLinearFit'],
        ceosal2: ['linearFit', 'linearLogFit'],
        houseprice: ['linearFit', 'logLogFit']
    };

    const info = [
        [
            'Effect of tariffs on exports',
            'Based on exports and tariffs dataset.',
            'World Bank Database'
        ],
        [
            'Income and Life Expectancy',
            'Based on GDP per capita and life expectancy dataset.',
            'World Bank Database'
        ],
        [
            'Income and CO2 Emission',
            'Based on GDP per capita and CO2 emission dataset.',
            'World Bank Database'
        ],
        [
            'Advertising (Sales vs TV)',
            'Based on advertising dataset.',
            'World Bank Database'
        ],
        [
            'CEO Salary vs Sales',
            'Based on CEO salary dataset.',
            'World Bank Database'
        ],
        [
            'House Price vs Area',
            'Based on house price dataset.',
            'World Bank Database'
        ]
    ];

    useEffect(() => {
        setShowDatasets([
            false, false, false,
            false, false, false
        ]);
        setCompareRegLine([]);
        if (setHighlightedFit) {
            setHighlightedFit('');
        }
    }, [setShowDatasets, setCompareRegLine, setHighlightedFit]);

    const handleDataset = (idx) => {
        const newShow = [false, false, false, false, false, false];
        newShow[idx] = true;
        setShowDatasets(newShow);
        setSelected(idx);
        // Show both regressions side by side immediately
        const requiredFits = REGS_MAP[ALL_LABELS[idx][0]];
        setCompareRegLine([...requiredFits]);
        setOpenFit({});
        if (setHighlightedFit) {
            setHighlightedFit('');
        }
    };

    const toggleFit = (fit) => {
        setOpenFit(prev => {
            if (prev[fit]) {
                if (setHighlightedFit) setHighlightedFit('');
                return {};
            } else {
                if (setHighlightedFit) setHighlightedFit(fit);
                return { [fit]: true };
            }
        });
    };

    const formatFitName = (fit) =>
        fit.replace('Fit', '')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toLowerCase();

    const currentLabels = selectedGroup === 1 ? LABELS_GROUP_1 : LABELS_GROUP_2;

    return (
        <>
            <p>
                Let&rsquo;s apply what you&rsquo;ve learned about logarithm
                regressions using real-world datasets.
            </p>
            <p>
                Each group contains three datasets, each illustrating a
                distinct pattern to show how different logarithmic models
                capture trends.
            </p>
            <p>Choose one group for your analysis.</p>
            <div className="choice-list dataset-opt">
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="group-1"
                        name="log-group-choice"
                        value="1"
                        checked={selectedGroup === 1}
                        disabled={datasetStarted}
                        onChange={() => {
                            setSelectedGroup(1);
                            setDatasetStarted(false);
                            setSelected(null);
                            setShowDatasets([
                                false, false, false,
                                false, false, false
                            ]);
                            setCompareRegLine([]);
                            if (setHighlightedFit) setHighlightedFit('');
                        }}
                    />
                    <label htmlFor="group-1"
                        className={`form-check-label ${
                            datasetStarted ? 'text-muted' : ''
                        }`}>
                        Group 1
                    </label>
                    <ul className={
                        `mt-2 ${datasetStarted ? 'text-muted' : ''}`
                    }>
                        <li>
                            Effect of tariffs on exports<br />
                            <small className="text-muted">
                                Source: World Bank Database
                            </small>
                        </li>
                        <li>
                            Effect of countries&apos; GDP per capita on their
                            population’s life expectancy<br />
                            <small className="text-muted">
                                Source: World Bank Database
                            </small>
                        </li>
                        <li>
                            Effect of a country&apos;s GDP per capita on CO2
                            emission<br />
                            <small className="text-muted">
                                Source: World Bank Database
                            </small>
                        </li>
                    </ul>
                </div>
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="group-2"
                        name="log-group-choice"
                        value="2"
                        checked={selectedGroup === 2}
                        disabled={datasetStarted}
                        onChange={() => {
                            setSelectedGroup(2);
                            setDatasetStarted(false);
                            setSelected(null);
                            setShowDatasets([
                                false, false, false,
                                false, false, false
                            ]);
                            setCompareRegLine([]);
                            if (setHighlightedFit) setHighlightedFit('');
                        }}
                    />
                    <label htmlFor="group-2"
                        className={`form-check-label ${
                            datasetStarted ? 'text-muted' : ''
                        }`}>
                        Group 2
                    </label>
                    <ul className={
                        `mt-2 ${datasetStarted ? 'text-muted' : ''}`
                    }>
                        <li>
                            Effect of television advertising spending on
                            sales<br />
                            <small className="text-muted">
                                Source: World Bank Database
                            </small>
                        </li>
                        <li>
                            Effect of firm&apos;s sales on CEO&apos;s
                            salaries<br />
                            <small className="text-muted">
                                Source: World Bank Database
                            </small>
                        </li>
                        <li>
                            Effect of size of living area on housing
                            prices<br />
                            <small className="text-muted">
                                Source: World Bank Database
                            </small>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button
                    className="btn btn-sm btn-success"
                    onClick={() => setDatasetStarted(true)}
                    disabled={datasetStarted || selectedGroup === null}>
                        Continue &raquo;
                </button>
            </div>
            {datasetStarted && selectedGroup !== null && (
                <>
                    <hr className="my-4" />
                    <h2>
                        Group {selectedGroup}:
                    </h2>
                    <p>
                        Complete analysis on all three datasets in this group.
                    </p>
                    <PromptBlock list={[
                        'Select a dataset to review',
                        'Compare the data plots and resulting regressions ' +
                        'before and after the log-based treatment is applied.',
                        'Review and decide the interpretations for each ' +
                        'instance.'
                    ]} />
                    <ul className='choice-list dataset-opt'>
                        {currentLabels.map((dType) => (
                            <li className="form-check d-flex mb-2"
                                key={dType[2]}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id={`log-real-${dType[0]}`}
                                    name="log-data-choice"
                                    value={dType[0]}
                                    checked={showDatasets[dType[2]] === true}
                                    disabled={
                                        selected !== null &&
                                        selected !== dType[2]
                                    }
                                    onChange={() => handleDataset(dType[2])}
                                />
                                <label htmlFor={`log-real-${dType[0]}`}
                                    className={`form-check-label pb-2 me-2 ${
                                        (selected !== null &&
                                            selected !== dType[2])
                                            ? 'text-muted' : ''
                                    }`}>
                                    {dType[1]}<br />
                                    <small className="text-muted">
                                        Source: {info[dType[2]][2]}
                                    </small>
                                </label>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {datasetStarted && selected !== null && (
                <>
                    <hr className="my-4" />
                    <h3 className="pt-3">{info[selected][0]}</h3>
                    <p className="mb-1">
                        <strong>Source:</strong> {info[selected][2]}
                    </p>
                    <p>{info[selected][1]}</p>

                    <div className="choice-list ms-0 mt-4 nested-radio">
                        {REGS_MAP[ALL_LABELS[selected][0]].map((fit) => (
                            <div key={fit} className="collapsible-fit mb-2">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => toggleFit(fit)}
                                    aria-expanded={!!openFit[fit]}
                                    aria-controls={`fit-panel-${fit}`}>
                                    <span>
                                        {openFit[fit] ? '▼' : '▶'}{' '}
                                        With {formatFitName(fit)} regression fit
                                    </span>
                                </button>
                                {openFit[fit] && (
                                    <div id={`fit-panel-${fit}`}
                                        className="ps-4 pt-2">
                                        <p>
                                            <em>
                                                Once you select this regression
                                                fit, the graph will be
                                                highlighted to help you compare
                                                the models side by side.
                                                Interpretation text will be
                                                populated here later.
                                            </em>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

RealDataLogarithm.propTypes = {
    setShowDatasets: PropTypes.func.isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired,
    setCompareRegLine: PropTypes.func.isRequired,
    compareRegLine: PropTypes.arrayOf(PropTypes.string).isRequired,
    setHighlightedFit: PropTypes.func
};
