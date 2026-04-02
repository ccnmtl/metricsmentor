import React, { useState, useEffect } from 'react';
import { PromptBlock } from '../../PromptBlock';
import { Katex } from '../../utils/katexComponent';
import { LogarithmQuizzes } from './logarithmQuizData';
import PropTypes from 'prop-types';

export const RealDataLogarithm = ({
    setShowDatasets, showDatasets,
    setCompareRegLine, compareRegLine,
    setHighlightedFit, submissionId
}) => {

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [datasetStarted, setDatasetStarted] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openFit, setOpenFit] = useState({});
    const [completedDatasets, setCompletedDatasets] = useState([]);

    const LABELS_GROUP_1 = [
        ['exports_tariffs', 'Effect of tariffs on exports', 0],
        ['gdp_life_exp', 'Effect of countries’ GDP per capita on their ' +
            'population’s life expectancy', 1],
        ['gdp_co2', 'Effect of a country’s GDP per capita on CO2 emission',
            2]
    ];

    const LABELS_GROUP_2 = [
        ['advertising', 'Effect of television advertising spending on sales',
            3],
        ['ceosal2', 'Effect of firm’s sales on CEO’s salaries', 4],
        ['houseprice', 'Effect of size of living area on housing prices', 5]
    ];

    const ALL_LABELS = [...LABELS_GROUP_1, ...LABELS_GROUP_2];

    const REGS_MAP = {
        exports_tariffs: ['logLinearFit', 'linearFit'],
        gdp_life_exp: ['linearFit', 'linearLogFit'],
        gdp_co2: ['logLogFit', 'linearFit'],
        advertising: ['linearFit', 'logLinearFit'],
        ceosal2: ['linearLogFit', 'linearFit'],
        houseprice: ['logLogFit', 'linearFit']
    };

    const info = [
        [
            'Effect of tariffs on exports',
            'World Bank Database'
        ],
        [
            'Income and Life Expectancy',
            'World Bank Database'
        ],
        [
            'Income and CO2 Emission',
            'World Bank Database'
        ],
        [
            'Advertising (Sales vs TV)',
            'ISLR Advertising-to-Sales data, 2017'
        ],
        [
            'CEO Salary vs Sales',
            'Wooldridge CEO Pay and Firm Sales, 1990'
        ],
        [
            'House Price vs Area',
            'Housing Price and Living Area [Ames, Iowa, 2020]'
        ]
    ];

    useEffect(() => {
        setShowDatasets([false, false, false, false, false, false]);
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

    const handleComplete = (idx) => {
        setCompletedDatasets(prev => {
            if (!prev.includes(idx)) {
                return [...prev, idx];
            }
            return prev;
        });
    };

    const handleAnalyzeAnother = () => {
        setSelected(null);
        setShowDatasets(prev => prev.map(() => false));
        setCompareRegLine([]);
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

    const REG_LABELS = ['Regression A', 'Regression B'];

    const renderFitPanel = (fit) => (
        <div id={`fit-panel-${fit}`} className="ps-4 pt-2">
            <p>
                <b>Form:&nbsp;</b>
                <Katex tex={''} />
            </p>
            <p>
                <b>
                    Resulting regression fit equation:
                </b>
            </p>
            <div className="katex-block">
                <Katex tex={''} />
            </div>
            <p>
                <b>Interpretation: </b>
            </p>
            <p>
                <b>Notes: </b>
            </p>
        </div>
    );

    const currentLabels = selectedGroup === 1
        ? LABELS_GROUP_1 : LABELS_GROUP_2;

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
                    <input className="form-check-input" type="radio" value="1"
                        id="group-1" name="log-group-choice"
                        checked={selectedGroup === 1}
                        disabled={datasetStarted}
                        onChange={() => {setSelectedGroup(1);
                            setDatasetStarted(false); setSelected(null);
                            setShowDatasets([false, false, false,
                                false, false, false]);
                            setCompareRegLine([]);
                            if (setHighlightedFit) setHighlightedFit('');
                        }}
                    />
                    <label htmlFor="group-1" className={`form-check-label ${
                        datasetStarted ? 'text-muted' : ''}`}>
                        Group 1
                    </label>
                    <ul className={`mt-2 ${datasetStarted ? 'text-muted' : ''}`
                    }>
                        <li>
                            Effect of tariffs on exports
                        </li>
                        <li>
                            Effect of countries&apos; GDP per capita on their
                            population’s life expectancy
                        </li>
                        <li>
                            Effect of a country&apos;s GDP per capita on CO2
                            emission
                        </li>
                    </ul>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="radio" value="2"
                        id="group-2" name="log-group-choice"
                        checked={selectedGroup === 2}
                        disabled={datasetStarted}
                        onChange={() => {setSelectedGroup(2);
                            setDatasetStarted(false); setSelected(null);
                            setShowDatasets([false, false, false,
                                false, false, false]);
                            setCompareRegLine([]);
                            if (setHighlightedFit) setHighlightedFit('');
                        }}
                    />
                    <label htmlFor="group-2" className={`form-check-label ${
                        datasetStarted ? 'text-muted' : ''}`}>
                        Group 2
                    </label>
                    <ul className={`mt-2 ${datasetStarted ? 'text-muted' : ''}`
                    }>
                        <li>
                            Effect of television advertising spending on
                            sales
                        </li>
                        <li>
                            Effect of firm&apos;s sales on CEO&apos;s
                            salaries
                        </li>
                        <li>
                            Effect of size of living area on housing
                            prices
                        </li>
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-sm btn-success"
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
                    <ul className='choice-list dataset-opt ms-0'>
                        {currentLabels.map((dType) => (
                            <li className="mb-2 list-unstyled" key={dType[2]}>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio" value={dType[0]}
                                        id={`log-real-${dType[0]}`}
                                        name="log-data-choice"
                                        checked={
                                            showDatasets[dType[2]] === true
                                        }
                                        disabled={selected !== null &&
                                            selected !== dType[2]}
                                        onChange={() => handleDataset(dType[2])}
                                    />
                                    <label htmlFor={`log-real-${dType[0]}`}
                                        className={'form-check-label ' +
                                            'd-flex align-items-center ' +
                                            `pb-2 me-2 ${
                                                (selected !== null &&
                                                selected !== dType[2])
                                                    ? 'text-muted' : ''
                                            }`}>
                                        <span>
                                            {dType[1]}<br />
                                            <small className="text-muted">
                                                Source: {info[dType[2]][1]}
                                            </small>
                                        </span>
                                        {completedDatasets.includes(
                                            dType[2]) && (
                                            <span
                                                className={'ms-2 ' +
                                                    'status-checkmark'}>
                                                &#10003;
                                            </span>
                                        )}
                                    </label>
                                </div>
                                {selected === dType[2] && (
                                    <div className="nested-radio ps-4 mt-2">
                                        {REGS_MAP[ALL_LABELS[selected][0]].map(
                                            (fit, idx) => (
                                                <div key={fit}
                                                    className={
                                                        'collapsible-fit mb-2'}>
                                                    <button type="button"
                                                        className="btn"
                                                        onClick={() =>
                                                            toggleFit(fit)}
                                                        aria-expanded={
                                                            !!openFit[fit]
                                                        }
                                                        aria-controls={
                                                            `fit-panel-${fit}`}>
                                                        <span>
                                                            {openFit[fit] ?
                                                                '▼' : '▶'}{' '}
                                                            {REG_LABELS[idx]}
                                                        </span>
                                                    </button>
                                                    {openFit[fit] &&
                                                        renderFitPanel(fit)}
                                                </div>))}
                                        <LogarithmQuizzes
                                            datasetIdx={dType[2]}
                                            submissionId={submissionId}
                                            onComplete={handleComplete}
                                            onAnalyzeAnother={
                                                handleAnalyzeAnother} />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

RealDataLogarithm.propTypes = {
    setShowDatasets: PropTypes.func.isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired,
    setCompareRegLine: PropTypes.func.isRequired,
    compareRegLine: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    setHighlightedFit: PropTypes.func,
    submissionId: PropTypes.number
};
