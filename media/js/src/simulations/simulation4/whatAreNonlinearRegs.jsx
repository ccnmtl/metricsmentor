import React from 'react';
import { PromptBlock } from '../../PromptBlock';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';


export const WhatAreNonLinearRegressions = ({
    setshowRegLine, setshowDatasets, showRegLine, showDatasets}) => {

    const DATASET_NAMES = ['Linear','Quadratic','Cubic'];

    const formulas = [
        '\\hat{y} = \\hat{\\beta}_0 + \\hat{\\beta}_1 X + u',
        // eslint-disable-next-line max-len
        '\\hat{y} = \\hat{\\beta}_0 + \\hat{\\beta}_1 X + \\hat{\\beta}_2 X^2 + u',
        // eslint-disable-next-line max-len
        '\\hat{y} = \\hat{\\beta}_0 + \\hat{\\beta}_1 X + \\hat{\\beta}_2 X^2 + \\hat{\\beta}_3 X^3 + u',
    ];

    const toggleTopic = (i) =>
        setshowDatasets(arr => {
            const next = [...arr];
            next[i] = !next[i];
            return next;
        });

    const toggleReg = (i) =>
        setshowRegLine(arr => {
            const next = [...arr];
            next[i] = !next[i];
            return next;
        });

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
                            onChange={() => toggleTopic(i)}
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
        </>
    );
};

WhatAreNonLinearRegressions.propTypes = {
    setshowRegLine: PropTypes.func.isRequired,
    setshowDatasets: PropTypes.func.isRequired,
    showRegLine: PropTypes.arrayOf(PropTypes.bool).isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired,
};