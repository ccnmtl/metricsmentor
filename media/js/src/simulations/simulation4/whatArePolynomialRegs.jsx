import React, {useState, useEffect} from 'react';
import { PromptBlock } from '../../PromptBlock';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';
import { inlineKatex } from '../../utils/utils';
import dataset from './polynomial.json';
import { CLEARREG, CLEARSET, showOne } from './polyUtils';


export const WhatArePolynomialRegressions = ({
    setShowRegLine, setShowDatasets, showRegLine, showDatasets,
    setCompareRegLine, compareRegLine}) => {

    const DATASET_KEYS = ['linear', 'quadratic', 'cubic'];
    const DATASET_LABELS = {
        linear: 'Linear',
        quadratic: 'Quadratic',
        cubic: 'Cubic'
    };

    useEffect(() => {
        setShowDatasets(showOne(0));
        setShowRegLine(CLEARREG);
        setCompareRegLine([]);
    },[]);

    const [regressionTestResult, setRegressionTestResult] = useState(null);

    const getRegressionFormula = (key, isMystery = false) => {
        const data = isMystery ? dataset.mystery[key]
            : dataset[key];
        if (!data) return '';

        let formula = `\\hat{y} = ${data.intercept.toFixed(2)}
            + ${data.slope.toFixed(2)}X`;
        if (data.slope2 !== undefined) {
            formula += ` + ${data.slope2.toFixed(2)}X^2`;
        }
        if (data.slope3 !== undefined) {
            formula += ` + ${data.slope3.toFixed(2)}X^3`;
        }
        return formula;
    };

    const toggleDataset = (i) =>
        setShowDatasets(arr => {
            const next = [...arr];
            next[i] = !next[i];
            if (i !== 3 && next[i]) {
                next[3] = false; // mystery dataset reset
                setCompareRegLine([]);
            }
            return next;
        });

    const toggleReg = (i) =>
        setShowRegLine(arr => {
            const next = [...arr];
            next[i] = !next[i];
            return next;
        });

    const handleCompareReg = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setCompareRegLine(prev => {
            let next;
            if (checked) {
                next = [...prev, value];
            } else {
                next = prev.filter(reg => reg !== value);
            }
            // Hide result if user selects third option or unselects any
            if (next.length !== 2) {
                setRegressionTestResult(null);
            }
            return next;
        });
    };

    const handleMysteryDatasetToggle = () => {
        if (!showDatasets[3]) {
            setShowDatasets(showOne(3));
            setShowRegLine(CLEARSET);
        } else {
            setShowDatasets(CLEARSET);
            setCompareRegLine([]);
            setRegressionTestResult(null);
        }
    };

    const handleRunRegressionTest = () => {
        if (compareRegLine.length === 2) {
            if (compareRegLine.includes('Linear')
                && compareRegLine.includes('Quadratic')) {
                setRegressionTestResult('linear-vs-quadratic');
            } else if (compareRegLine.includes('Quadratic')
                && compareRegLine.includes('Cubic')) {
                setRegressionTestResult('quadratic-vs-cubic');
            } else if (compareRegLine.includes('Linear')
                && compareRegLine.includes('Cubic')) {
                setRegressionTestResult('linear-vs-cubic');
            } else {
                setRegressionTestResult(null);
            }
        } else {
            setRegressionTestResult(null);
        }
    };

    return (
        <>
            <p>
                Polynomial regression is a type of analysis where the
                relationship between the independent
                variable {inlineKatex('x')} and the dependent
                variable {inlineKatex('y')} is modeled as an nth-degree
                polynomial in {inlineKatex('x')} that fits a curve to the data.
            </p>
            <p>
                Some relationships are not linear, and polynomials can account
                for that.
            </p>
            <h2>
                Polynomial regression plots
            </h2>
            <p>
                Each generated dataset below show a distinct pattern to help
                you explore how different polynomial models capture each trend.
            </p>
            <PromptBlock list={[
                'Select a dataset based on its trend',
                'Observe how the regression line fits the data and captures ' +
                'its overall pattern'
            ]} />
            {/* container for regression line options */}
            <div className="choice-list ms-0">
                {DATASET_KEYS.map((key, i) => (
                    <div key={key}
                        className={'form-check dataset-variable-item'}>
                        <label htmlFor={`dataset-${i}`}
                            className={
                                `form-check-label${showDatasets[i] ?
                                    ' text-primary' : ''}`
                            }>
                            <input
                                className="form-check-input"
                                id ={`dataset-${i}`}
                                name={key}
                                type="checkbox"
                                checked={showDatasets[i]}
                                onChange={() => toggleDataset(i)}
                            /> {DATASET_LABELS[key]} regression
                        </label>

                        {showDatasets[i] && (<>
                            <div className="katex-block">
                                <Katex tex={
                                    getRegressionFormula(key)} />
                            </div>
                            <label htmlFor={`regline-${i}`}
                                className="ps-4 mt-2 d-block">
                                <input
                                    className="form-check-input"
                                    id ={`regline-${i}`}
                                    name={`regline-${key}`}
                                    type="checkbox"
                                    checked={showRegLine[i]}
                                    onChange={() => toggleReg(i)}
                                /> Show regression line
                            </label>
                        </>)}
                    </div>
                ))}
            </div>
            <h2 className="pt-3">Determining regression model in a dataset</h2>
            <p>
                Using what you&rsquo;ve observed, apply what you&rsquo;ve
                learned to a new dataset.
            </p>
            <p>
                Select the following Mystery dataset, and let&rsquo;s
                determine the best regression fit for it.
            </p>
            <div style={{ marginBottom: '1rem' }}>
                <div className="choice-list ms-0">
                    <div className={
                        `form-check
                        dataset-variable-item
                        border-bottom-0`
                    }>
                        <label htmlFor="mystery-dataset"
                            className={
                                `form-check-label${showDatasets[3] ?
                                    ' text-primary' : ''}`
                            }>
                            <input
                                className="form-check-input"
                                id="mystery-dataset"
                                name="mystery-dataset"
                                type="checkbox"
                                checked={showDatasets[3]}
                                onChange={handleMysteryDatasetToggle}
                            /> Mystery dataset
                        </label>
                    </div>
                </div>
                <PromptBlock list={[
                    'Add one regression at a time to the graph',
                    'Compare the regression lines to see which one fits ' +
                    'the overall pattern of the dataset',
                    'Select two regression lines to run a test to confirm ' +
                    'best fit'
                ]} />
                {showDatasets[3] && (
                    <>
                        <div className="choice-list ms-0">
                            {DATASET_KEYS.map((reg) => (
                                <div key={reg}
                                    className={
                                        'form-check dataset-variable-item'
                                    }>
                                    <label
                                        htmlFor={`compare-reg-${reg}`}
                                        className={
                                            `form-check-label ${
                                                compareRegLine.includes(
                                                    DATASET_LABELS[reg]
                                                ) ? ' text-primary' : ''
                                            }`}>
                                        <input
                                            className="form-check-input"
                                            id={`compare-reg-${reg}`}
                                            type="checkbox"
                                            checked={compareRegLine.includes(
                                                DATASET_LABELS[reg])}
                                            value={DATASET_LABELS[reg]}
                                            onChange={handleCompareReg}
                                        />
                                        {DATASET_LABELS[reg]} regression
                                    </label>
                                    {compareRegLine.includes(
                                        DATASET_LABELS[reg]
                                    ) && (
                                        <div className="katex-block">
                                            <Katex tex={
                                                getRegressionFormula(
                                                    DATASET_LABELS[reg], true)
                                            } />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            className="btn btn-sm btn-primary mt-2"
                            disabled={compareRegLine.length < 2
                                || compareRegLine.length === 3}
                            onClick={handleRunRegressionTest}>
                                Run test on regressions &raquo;
                        </button>
                        <span className="ms-2 align-middle">
                            {compareRegLine.length !== 2
                                ? 'Select two to run the test'
                                : `${compareRegLine[0]} and 
                                    ${compareRegLine[1]}`}
                        </span>
                    </>
                )}
                {/* Show result based on regressionTestResult */}
                {regressionTestResult === 'linear-vs-quadratic' && (
                    <div className='mt-3'>
                        <p>Test between Linear and Quadratic regression:</p>
                        <div className='ms-3'>
                            <p><Katex tex={'H_0: \\beta_2 = 0; ~'} /></p>
                            <p><Katex tex={'H_1: \\beta_2 \\neq 0; ~'} /></p>
                            <p>at <Katex tex={'\\alpha = 0.05; ~'}/></p>
                            <p className='mt-2'>
                            Resulting <Katex tex={'~p-value = 0.016'} />
                            </p>
                            <p>
                                <Katex tex={`p-value < \\alpha;
                                    ~ \\beta_2 ~`} />
                                is significantly different from
                                <Katex tex={'~0.'} />
                            </p>
                            <p>
                                Therefore, we reject <Katex tex={'H_0'} />.</p>
                            <p>
                                Conclusion: Quadratic regression is a
                                better fit.
                            </p>
                        </div>
                        <p>Select another set of regression model to test</p>

                    </div>
                )}
                {regressionTestResult === 'quadratic-vs-cubic' && (
                    <div className='mt-3'>
                        <p>Test between Quadratic and Cubic regression:</p>
                        <div className='ms-3'>
                            <p><Katex tex={'H_0: \\beta_3 = 0; ~'} /></p>
                            <p><Katex tex={'H_1: \\beta_3 \\neq 0; ~'} /></p>
                            <p>at <Katex tex={'\\alpha = 0.05; ~'}/></p>

                            <p className='mt-2'>
                            Resulting <Katex tex={'p-value = 0.754'} /> </p>
                            <p>
                                <Katex tex={'p-value > \\alpha; ~ \\beta_3~'} />
                                is not significantly different from
                                <Katex tex={'~0.'} />
                            </p>
                            <p>Therefore, we do not reject
                                <Katex tex={'~H_0'} />.</p>
                            <p>Conclusion: Quadratic regression is a
                                better fit.</p>
                        </div>
                        <p>Select another set of regression model to test</p>
                    </div>
                )}
                {regressionTestResult === 'linear-vs-cubic' && (
                    <div className='mt-3'>
                        <p>Test between Linear and Cubic regression:</p>
                        <div className='ms-3'>
                            <p><Katex tex={'H_0: \\beta_2 = \\beta_3 = 0; ~'} />
                            </p>
                            <p><Katex tex={'H_1: not~H_0; ~'} /></p>
                            <p>at <Katex tex={'\\alpha = 0.05; ~'}/></p>
                            <p>Resulting <Katex tex={'p-value = 0.0541'} /> </p>
                            <p>
                                <Katex tex={`p-value > \\alpha; ~
                                \\beta_3~and~\\beta_2~`} />
                                are jointly not significantly different from
                                <Katex tex={'~0.'} />
                            </p>
                            <p>Therefore, we do not
                                reject <Katex tex={'~H_0'} />.</p>
                            <p>
                                Conclusion: Linear regression is a better fit.
                            </p>
                        </div>
                        <p>Select another set of regression model to test</p>
                    </div>
                )}
            </div>
        </>
    );
};

WhatArePolynomialRegressions.propTypes = {
    setShowRegLine: PropTypes.func.isRequired,
    setShowDatasets: PropTypes.func.isRequired,
    showRegLine: PropTypes.arrayOf(PropTypes.bool).isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired,
    compareRegLine: PropTypes.arrayOf(PropTypes.string),
    setCompareRegLine: PropTypes.func.isRequired
};