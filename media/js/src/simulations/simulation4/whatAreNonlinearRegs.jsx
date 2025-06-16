import React, {useState} from 'react';
import { PromptBlock } from '../../PromptBlock';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';
import dataset from './polynomial.json';


export const WhatAreNonLinearRegressions = ({
    setshowRegLine, setshowDatasets, showRegLine, showDatasets,
    setMysteryRegLine, mysteryRegLine}) => {

    const DATASET_KEYS = ['linear', 'quadratic', 'cubic'];
    const DATASET_LABELS = {
        linear: 'Linear',
        quadratic: 'Quadratic',
        cubic: 'Cubic'
    };

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
        setshowDatasets(arr => {
            const next = [...arr];
            next[i] = !next[i];
            if (i !== 3 && next[i]) {
                next[3] = false; // mystery dataset reset
                setMysteryRegLine([]);
            }
            return next;
        });

    const toggleReg = (i) =>
        setshowRegLine(arr => {
            const next = [...arr];
            next[i] = !next[i];
            return next;
        });

    const handleMysteryReg = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setMysteryRegLine(prev => {
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
            setshowDatasets([false, false, false, true]);
            setshowRegLine([false, false, false, false]);
        } else {
            setshowDatasets([false, false, false, false]);
            setMysteryRegLine([]);
            setRegressionTestResult(null);
        }
    };

    const handleRunRegressionTest = () => {
        if (mysteryRegLine.length === 2) {
            if (mysteryRegLine.includes('Linear')
                && mysteryRegLine.includes('Quadratic')) {
                setRegressionTestResult('linear-vs-quadratic');
            } else if (mysteryRegLine.includes('Quadratic')
                && mysteryRegLine.includes('Cubic')) {
                setRegressionTestResult('quadratic-vs-cubic');
            } else if (mysteryRegLine.includes('Linear')
                && mysteryRegLine.includes('Cubic')) {
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
               Let&apos;s now learn about why non-linear regressions are
               important. Very brief prelude to get user oriented with
               this learning segment.
            </p>
            <PromptBlock
                text="But first, take a moment to familiarize yourself with
                    the definition of non-linear regressions; it&rsquo;ll help
                    as you continue with this exercise." />
            <button
                className="btn btn-sm btn-primary mb-2"
                data-bs-toggle="modal"
                data-bs-target="#nonlineardDefinition"
            >
                Non-linear regressions
            </button>
            <h2>
                Non-linear regression plots
            </h2>
            <p>Transition paragraph to lead to the exercise</p>
            <PromptBlock list={[
                'Look at the pattern of each dataset',
                'Observe regression lines of each dataset',
                'Any adiditional instructions here'
            ]} />
            {DATASET_KEYS.map((key, i) => (
                <div key={key} style={{ marginBottom: '1rem' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={showDatasets[i]}
                            onChange={() => toggleDataset(i)}
                        /> {DATASET_LABELS[key]} regression
                    </label>

                    {showDatasets[i] && (
                        <div className="ps-2 mt-1">
                            <Katex tex={
                                getRegressionFormula(key)} />
                            <label className="mt-2 d-block">
                                <input
                                    type="checkbox"
                                    checked={showRegLine[i]}
                                    onChange={() => toggleReg(i)}
                                /> Show regression line
                            </label>
                        </div>
                    )}
                </div>
            ))}
            <h2>Determining regression model in a dataset</h2>
            <p>
                Let&apos;s determine which regression model fits best for a new
                dataset
            </p>
            <div style={{ marginBottom: '1rem' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showDatasets[3]}
                        className='mb-4'
                        onChange={handleMysteryDatasetToggle}
                    /> Mystery dataset
                </label>
                <PromptBlock list={[
                    'Look at the pattern of the dataset',
                    'Try out each regression line',
                    'Visually, which one fits best?',
                ]} />
                {showDatasets[3] && (
                    <>
                        {DATASET_KEYS.map((reg) => (
                            <div className="ps-2 mt-1" key={reg}>
                                <label className="mt-2 d-block">
                                    <input
                                        type="checkbox"
                                        className="me-2"
                                        checked={mysteryRegLine.includes(
                                            DATASET_LABELS[reg])}
                                        value={DATASET_LABELS[reg]}
                                        onChange={handleMysteryReg}
                                    />
                                    {DATASET_LABELS[reg]} regression
                                </label>
                                {mysteryRegLine.includes(DATASET_LABELS[reg])
                                && (
                                    <div className="ms-4 mt-1">
                                        <Katex tex={
                                            getRegressionFormula(
                                                DATASET_LABELS[reg], true)} />
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            className="btn btn-sm btn-secondary mt-2"
                            disabled={mysteryRegLine.length < 2
                                || mysteryRegLine.length === 3}
                            onClick={handleRunRegressionTest}>
                                Run Regression Test &raquo;
                        </button>
                        <span className="ms-2 align-middle">
                            {mysteryRegLine.length !== 2
                                ? 'Select two to run the test'
                                : `${mysteryRegLine[0]} and 
                                    ${mysteryRegLine[1]}`}
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

WhatAreNonLinearRegressions.propTypes = {
    setshowRegLine: PropTypes.func.isRequired,
    setshowDatasets: PropTypes.func.isRequired,
    showRegLine: PropTypes.arrayOf(PropTypes.bool).isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired,
    mysteryRegLine: PropTypes.arrayOf(PropTypes.string),
    setMysteryRegLine: PropTypes.func.isRequired
};