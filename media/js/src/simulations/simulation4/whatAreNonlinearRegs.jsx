import React from 'react';
import { PromptBlock } from '../../PromptBlock';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';

export const WhatAreNonLinearRegressions = ({
    setshowRegLine, setshowDatasets, showRegLine, showDatasets,
    setMysteryRegLine, mysteryRegLine}) => {

    const DATASET_NAMES = ['Linear','Quadratic','Cubic'];

    const formulas = [
        '\\hat{y} = \\hat{\\beta}_0 + \\hat{\\beta}_1 X + u',
        // eslint-disable-next-line max-len
        '\\hat{y} = \\hat{\\beta}_0 + \\hat{\\beta}_1 X + \\hat{\\beta}_2 X^2 + u',
        // eslint-disable-next-line max-len
        '\\hat{y} = \\hat{\\beta}_0 + \\hat{\\beta}_1 X + \\hat{\\beta}_2 X^2 + \\hat{\\beta}_3 X^3 + u',
    ];

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
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(reg => reg !== value);
            }
        });
    };

    const handleMysteryDatasetToggle = () => {
        if (!showDatasets[3]) {
            setshowDatasets([false, false, false, true]);
            setshowRegLine([false, false, false, false]);
        } else {
            setshowDatasets([false, false, false, false]);
            setMysteryRegLine([]);
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
                className="btn btn-sm btn-primary mb-5"
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
            {DATASET_NAMES.map((key, i) => (
                <div key={key} style={{ marginBottom: '1rem' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={showDatasets[i]}
                            onChange={() => toggleDataset(i)}
                        /> {key} regression
                    </label>

                    {showDatasets[i] && (
                        <div className="ps-2 mt-1">
                            <Katex tex={formulas[i]} />
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
                        <div className="ps-2 mt-1">
                            <label className="mt-2 d-block">
                                <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={mysteryRegLine.includes('linear')}
                                    value={'linear'}
                                    onChange={handleMysteryReg} />
                                    Linear regression
                            </label>
                        </div>
                        <div className="ps-2 mt-1">
                            <label className="mt-2 d-block">
                                <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={mysteryRegLine.includes(
                                        'quadratic')}
                                    value={'quadratic'}
                                    onChange={handleMysteryReg} />
                                    Quadratic regression
                            </label>
                        </div>
                        <div className="ps-2 mt-1">
                            <label className="mt-2 d-block">
                                <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={mysteryRegLine.includes('cubic')}
                                    value={'cubic'}
                                    onChange={handleMysteryReg} />
                                    Cubic regression
                            </label>
                        </div>
                    </>
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