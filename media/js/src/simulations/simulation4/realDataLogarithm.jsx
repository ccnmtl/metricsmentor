import React, { useState, useEffect } from 'react';
import { PromptBlock } from '../../PromptBlock';
import { Katex } from '../../utils/katexComponent';
import { LogarithmQuizzes } from './logarithmQuizData';
import PropTypes from 'prop-types';
import { scrollTo } from '../../utils/utils';

export const RealDataLogarithm = ({
    setShowDatasets, showDatasets,
    setCompareRegLine, compareRegLine, isGroupComplete,
    setHighlightedFit, submissionId, setIsGroupComplete,
    resetTrigger
}) => {

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [datasetStarted, setDatasetStarted] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openFit, setOpenFit] = useState({});
    const [completedDatasets, setCompletedDatasets] = useState([]);

    useEffect(() => {
        if (resetTrigger && resetTrigger > 0) {
            setSelectedGroup(null);
            setDatasetStarted(false);
            setSelected(null);
            setOpenFit({});
        }
    }, [resetTrigger]);

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
            const isOpen = !!prev[fit];
            return isOpen ? {} : { [fit]: true };
        });
        if (setHighlightedFit) {
            setHighlightedFit(prev => prev === fit ? '' : fit);
        }
    };

    const REG_LABELS = ['Regression A', 'Regression B'];

    const MODEL_FORMULAS = {
        linearFit:
            '\\hat{y} = \\widehat{\\beta}_0 + \\widehat{\\beta}_1 x',
        logLinearFit:
            '\\widehat{\\ln(y)} = \\widehat{\\beta}_0 + ' +
            '\\widehat{\\beta}_1 x',
        linearLogFit:
            '\\hat{y} = \\widehat{\\beta}_0 + ' +
            '\\widehat{\\beta}_1 \\ln(x)',
        logLogFit:
            '\\widehat{\\ln(y)} = \\widehat{\\beta}_0 + ' +
            '\\widehat{\\beta}_1 \\ln(x)'
    };

    const REG_FORMULAS = {
        exports_tariffs: {
            logLinearFit: '\\widehat{\\ln(exports)} = 25.65 - 0.31tariffs',
            linearFit: '\\widehat{exports} = 368,000,000,000' +
            ' - 30,900,000,000tariffs'
        },
        gdp_life_exp: {
            linearFit: '\\widehat{life\\_expect} = 5.57 + 0.0025gdp\\_cap',
            linearLogFit: '\\widehat{life\\_expect} = 1.03 + 4.16log(gdp\\_cap)'
        },
        gdp_co2: {
            logLogFit: '\\widehat{log\\_co2\\_pop} = -6.277863 + ' +
                '0.7807log\\_gdp\\_cap',
            linearFit: '\\widehat{co2_pop} = 2.6697 + 0.0001019gdp\\_cap'
        },
        advertising: {
            linearFit: '\\widehat{Sales} = 7.03 + 0.05tv',
            logLinearFit: '\\widehat{log(Sales)} = 2.01 + 0.0038tv'
        },
        ceosal2: {
            linearLogFit: '\\widehat{CEO Salary} = -379.23 + 171.77 * ' +
                'ln(Sales)',
            linearFit: '\\widehat{CEOSalary} = 717.63 + 0.043Sales'
        },
        houseprice: {
            logLogFit: '\\widehat{log(SalePrice)} = 6.58 + 0.75ln(HouseArea)',
            linearFit: '\\widehat{SalePrice} = 65240.89 + 72.23HouseArea'
        }
    };

    const REG_INTERPRETATIONS = {
        exports_tariffs: {
            logLinearFit: 'Consider how changes in tariffs are associated ' +
            'with changes in exports as reflected in the regression ' +
            'equation, and what this reveals about the rate and type of ' +
            'relationship between the two variables.',
            linearFit: 'Observe how changes in tariffs are associated ' +
            'with changes in exports as in the regression ' +
            'equation, and what this reveals about the rate and type of ' +
            'relationship between them.'
        },
        gdp_life_exp: {
            linearFit: 'See how changes in GDP per capita are associated ' +
            'with changes in life expectancy as in the regression ' +
            'equation, and what this reveals about the rate and type of ' +
            'relationship between them.',
            linearLogFit: 'Consider how changes in GDP per capita are ' +
            'associated with changes in life expectancy as reflected in ' +
            'the regression equation, and what this reveals about the rate ' +
            'and type of relationship between the two variables.'
        },
        gdp_co2: {
            logLogFit: 'Consider how changes in GDP per capita are ' +
            'associated with changes in CO2 emissions per capita as ' +
            'reflected in the regression equation, and what this reveals ' +
            'about the rate and type of relationship between the variables.',
            linearFit: 'Observe how changes in GDP per capita are associated ' +
            'with changes in CO2 emissions per capita as in the regression ' +
            'equation, and what this reveals about the rate and type of ' +
            'relationship between them.'
        },
        advertising: {
            linearFit: 'Observe how changes in TV advertising spending are ' +
            'associated with changes in sales as in the regression ' +
            'equation, and what this reveals about the rate and type of ' +
            'relationship between them.',
            logLinearFit: 'Observe how changes in TV advertising spending ' +
            'are associated with changes in sales as in the regression ' +
            'equation, and what this reveals about the rate and type of ' +
            'relationship between them.'
        },
        ceosal2: {
            linearLogFit: 'Observe how changes in CEO\u2019s salary are ' +
            'associated with changes in firm\u2019s sales as in the ' +
            'regression equation, and what this reveals about the rate and ' +
            'type of relationship between them.',
            linearFit: 'Observe how changes in CEO\u2019s salary are ' +
            'associated with changes in firm\u2019s sales as in the ' +
            'regression equation, and what this reveals about the rate and ' +
            'type of relationship between them.'
        },
        houseprice: {
            logLogFit: 'Consider how changes in house prices are ' +
            'associated with changes in living area space as ' +
            'reflected in the regression equation, and what this reveals ' +
            'about the rate and type of relationship between the variables.',
            linearFit: 'Observe how changes in house prices are ' +
            'associated with changes in living area space as in the ' +
            'regression equation, and what this reveals about the rate and ' +
            'type of relationship between them.'
        }
    };

    const REG_NOTES = {
        exports_tariffs: {
            logLinearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between the tariffs and exports.',
            linearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between the tariffs and exports.'
        },
        gdp_life_exp: {
            linearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between GDP per capita and ' +
            'life expectancy.',
            linearLogFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between GDP per capita and ' +
            'life expectancy.'
        },
        gdp_co2: {
            logLogFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between GDP per capita and ' +
            'CO2 emissions per capita.',
            linearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between GDP per capita and ' +
            'CO2 emissions per capita.'
        },
        advertising: {
            linearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between TV advertising ' +
            'spending and sales.',
            logLinearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between TV advertising ' +
            'spending and sales.'
        },
        ceosal2: {
            linearLogFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between CEO\u2019s salary and ' +
            'firm\u2019s sales.',
            linearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between CEO\u2019s salary and ' +
            'firm\u2019s sales.',
        },
        houseprice: {
            logLogFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between house prices and ' +
            'living area space.',
            linearFit: 'Look at the shape and pattern of the data ' +
            'points and the regression line, and consider how the axis ' +
            'scaling affects the relationship between house prices and ' +
            'living area space.'
        }
    };

    const getFormula = (fit) => MODEL_FORMULAS[fit] || '';

    const getRegFormula = (datasetKey, fit) =>
        (REG_FORMULAS[datasetKey] && REG_FORMULAS[datasetKey][fit]) || '';

    const getInterpretation = (datasetKey, fit) =>
        (REG_INTERPRETATIONS[datasetKey] &&
            REG_INTERPRETATIONS[datasetKey][fit]) || '';

    const getNotes = (datasetKey, fit) =>
        (REG_NOTES[datasetKey] && REG_NOTES[datasetKey][fit]) || '';

    const renderFitPanel = (fit, datasetKey) => (
        <div id={`fit-panel-${fit}`} className="ps-4 pt-2">
            <p className="me-2 mb-3">Form:&nbsp;
                <Katex tex={getFormula(fit)} />
            </p>
            <p className="mb-0">
                <b>
                    Resulting regression fit equation:
                </b>
            </p>
            <div className="katex-block">
                <Katex tex={getRegFormula(datasetKey, fit)} />
            </div>
            <p>
                <b>Interpretation: </b>
                {getInterpretation(datasetKey, fit)}
            </p>
            <p>
                <b>Notes: </b>
                {getNotes(datasetKey, fit)}
            </p>
        </div>
    );

    const currentLabels = selectedGroup === 1
        ? LABELS_GROUP_1 : LABELS_GROUP_2;

    const completedGroupCount = currentLabels.filter(
        dType => completedDatasets.includes(dType[2])
    ).length;

    useEffect(() => {
        if (setIsGroupComplete && !isGroupComplete) {
            setIsGroupComplete(completedGroupCount === 3 && datasetStarted);
        }
    }, [completedGroupCount, datasetStarted, setIsGroupComplete]);

    useEffect(() => {
        scrollTo('startRealDataLog');
    }, []);

    useEffect(() => {
        if (selectedGroup) {
            console.log(selectedGroup);
            scrollTo(`group-${selectedGroup}-header`);
        }
    }, [datasetStarted]);

    return (
        <>
            <p id="startRealDataLog">
                Let&rsquo;s apply what you&rsquo;ve learne dabout logarithmic
                regressions to real-world datasets.
            </p>
            <p>
                Each group contains three datasets, each highlighting a
                distinct pattern and how different logarithmic models capture
                trends.
            </p>
            <p>Choose one group and analyze its datasets.</p>
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
                    <label htmlFor="group-1"
                        className={`form-check-label fw-semibold ${
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
                    <label htmlFor="group-2"
                        className={`form-check-label fw-semibold ${
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
                    <h2 id={`group-${selectedGroup}-header`}>
                        Group {selectedGroup}:
                    </h2>
                    <p>
                        Complete the analysis for all three datasets in
                        this group.
                    </p>
                    <p>
                        <strong>Progress:</strong>{' '}
                        <span className={`hi-val fw-semibold ${
                            completedGroupCount === 3
                                ? 'text-success'
                                : ''
                        }`}>{completedGroupCount} of 3
                        </span> datasets completed.
                    </p>
                    <PromptBlock list={[
                        'Select one dataset to analyze.',
                        'Compare the data plots and regressions before ' +
                        'and after applying the log-based transformation.',
                        'Observe how the transformation changes the shape ' +
                        'and fit of the regression.',
                        'Interpret the results, and compare how the meaning ' +
                        'of the regression changes across models.'
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
                                                        renderFitPanel(
                                                            fit,
                                                            ALL_LABELS[
                                                                selected][0])}
                                                </div>))}
                                        <LogarithmQuizzes
                                            datasetIdx={dType[2]}
                                            submissionId={submissionId}
                                            onComplete={handleComplete}
                                            onAnalyzeAnother={
                                                handleAnalyzeAnother}
                                            isLastDataset={
                                                completedGroupCount >= 3}
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    {completedGroupCount === 3 && (
                        <p className="text-success fw-bold">
                            You have completed all datasets in
                            Group {selectedGroup}!
                        </p>
                    )}
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
    submissionId: PropTypes.number,
    isGroupComplete: PropTypes.bool,
    setIsGroupComplete: PropTypes.func,
    resetTrigger: PropTypes.number
};
