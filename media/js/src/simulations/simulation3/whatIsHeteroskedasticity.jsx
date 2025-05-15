import React, { useState, useEffect } from 'react';
import { HeteroskedasticitySlider } from './heteroskedasticitySlider';
import PropTypes from 'prop-types';
import { inlineKatex } from '../../utils/utils';
import axios from 'axios';
import { PromptBlock } from '../../PromptBlock';
import { Katex } from '../../utils/katexComponent';

export const WhatIsHeteroskedasticity = ({
    heteroskedasticity, setHeteroskedasticity, slope, intercept, standardError,
    robustStandardError, setProgress
}) => {
    const [pvaluesStandard, setPvaluesStandard] = useState(null);
    const [pvaluesRobust, setPvaluesRobust] = useState(null);

    const handleContinue = () => {
        setProgress(1);
    };

    let tvalueStandard;
    if (slope !== null) {
        tvalueStandard = parseFloat(((
            slope.toFixed(3) - 0) / standardError.toFixed(3)).toFixed(2));
    }

    let tvalueRobust;
    if (slope !== null) {
        tvalueRobust = parseFloat(((
            slope.toFixed(3) - 0) / robustStandardError.toFixed(3)).toFixed(2));
    }

    const calculateConfidenceInterval = (type) => {
        const error = type === 'standard' ? standardError : robustStandardError;
        return {
            lower: slope - 1.96 * error,
            upper: slope + 1.96 * error,
        };
    };

    const ciStandard = calculateConfidenceInterval('standard');
    const ciRobust = calculateConfidenceInterval('robust');

    const calculatePvalueStandard = async() => {
        try {
            let tvalueStandardCapped = Math.min(Math.abs(tvalueStandard), 5);
            const response = await axios.post('/calculate_pvalue/', {
                tvalue: tvalueStandardCapped
            });

            setPvaluesStandard(response.data['value_two_sided'].toFixed(4));
        } catch (error) {
            console.error('Error calculating pvalue:', error);
        }
    };

    const calculatePvalueRobust = async() => {
        try {
            let tvalueRobustCapped = Math.min(Math.abs(tvalueRobust), 5);
            const response = await axios.post('/calculate_pvalue/', {
                tvalue: tvalueRobustCapped
            });

            setPvaluesRobust(response.data['value_two_sided'].toFixed(4));
        } catch (error) {
            console.error('Error calculating pvalue:', error);
        }
    };

    const isZeroInConfidenceInterval = (ci) => {
        return ci.lower <= 0 && ci.upper >= 0;
    };

    useEffect(() => {
        if (slope !== null) {
            calculatePvalueStandard();
            calculatePvalueRobust();
        }
    }, [heteroskedasticity]);

    return (
        <>
            <p>
                Let&rsquo;s now learn to identify heteroskedasticity in a
                dataset plot and then examine how it
                affects {inlineKatex('SE(\\hat{\\beta_1})')} and subsequently
                hypothesis testing results.
            </p>
            <PromptBlock
                text="But first, take a moment to familiarize yourself with
                    the definition of heteroskedasticity; it&rsquo;ll help
                    as you continue with this exercise." />
            <button
                className="btn btn-sm btn-primary mb-5"
                data-bs-toggle="modal"
                data-bs-target="#heteroskedDefinition"
                data-cy="define-heteroskedasticity"
            >
                Definition: Heteroskedasticy
            </button>

            <PromptBlock
                text={
                    <>
                        As you introduce heteroskedasticity into this dataset,
                        observe the effects
                        on {inlineKatex('SE(\\hat{\\beta_1})')} values,
                        the related component values, and the hypothesis test
                        results.
                    </>
                }
            />
            <p className="mt-3">
                The table shows the values of affected components
                using non-robust and
                robust {inlineKatex('SE(\\hat{\\beta_1})')}, and
                the hypothesis test conclusion.
            </p>

            <HeteroskedasticitySlider
                heteroskedasticity={heteroskedasticity}
                setHeteroskedasticity={setHeteroskedasticity} />

            <div className="mt-5 d-flex">
                <div className="h4 my-0 me-2">
                    Hypothesis test:
                </div>
                <Katex
                    tex={`
                        H_0: \\beta_1 = 0; ~ 
                        H_1: \\beta_1 \\neq 0; ~ 
                        \\alpha = 0.05
                    `}
                />
            </div>
            {/* <div className="mt-3 d-flex">
                <div className="h4 my-0 me-2">
                    Regression:
                </div>
                <Katex
                    tex={`\\hat{y} = ${(intercept || intercept === 0) ?
                        intercept.toFixed(2) : ''}x + ${
                        slope ? slope.toFixed(2)
                            : ''}`}
                />
            </div> */}

            <table className="table table-bordered mb-4 mt-3">
                <thead>
                    <tr>
                        <td>&nbsp;</td>
                        <th scope="col">Non-robust</th>
                        <th scope="col">Robust</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            {inlineKatex('{SE(\\hat{\\beta_1})}')}
                        </th>
                        <td>
                            {inlineKatex(`
                            ${(standardError || standardError === 0) ?
            standardError.toFixed(2) : ''}
                            `)}
                        </td>
                        <td>
                            {inlineKatex(`
                        ${(robustStandardError || robustStandardError === 0) ?
            robustStandardError.toFixed(2) : ''}
                            `)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            {inlineKatex('{t}')}
                        </th>
                        <td>
                            {inlineKatex(`${tvalueStandard}`)}
                        </td>
                        <td>
                            {inlineKatex(`${tvalueRobust}`)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            {inlineKatex('{p}')}-value
                        </th>
                        <td>
                            {inlineKatex(`${pvaluesStandard}`)}
                        </td>
                        <td>
                            {inlineKatex(`${pvaluesRobust}`)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            {inlineKatex('CI')}
                        </th>
                        <td>
                            {`${ciStandard.lower.toFixed(2)}`}
                            {inlineKatex('< \\beta_1 <')}
                            {ciStandard.upper.toFixed(2)}
                        </td>
                        <td>
                            {`${ciRobust.lower.toFixed(2)}`}
                            {inlineKatex('< \\beta_1 <')}
                            {ciRobust.upper.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            Hypothesis Test
                        </th>
                        <td>
                            {isZeroInConfidenceInterval(ciStandard) ?
                                'Fail to reject' :
                                'Reject'}
                        </td>
                        <td>
                            {isZeroInConfidenceInterval(ciRobust) ?
                                'Fail to reject' :
                                'Reject'}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="text-end">
                <button
                    className="btn btn-sm btn-primary mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#simulationThreeGlossary"
                    data-cy="glossary"
                >
                    Glossary
                </button>
            </div>

            <p>
                As you&rsquo;ve seen here, failing to use the robust standard
                errors to correct for heteroskedasticity can lead to incorrect
                conclusions in significance tests.
                Let&rsquo;s apply this knowledge to a real-world dataset and
                explore how robust standard errors can help us make more
                accurate inferences.
            </p>
            <div className="simulation__step-prompt">
                <button
                    className="btn btn-sm btn-success"
                    data-cy="open-real-data"
                    onClick={handleContinue}>
                    Continue to Real dataset &raquo;
                </button>
            </div>
        </>
    );
};

WhatIsHeteroskedasticity.propTypes = {
    heteroskedasticity: PropTypes.number,
    setHeteroskedasticity: PropTypes.func,
    slope: PropTypes.number,
    intercept: PropTypes.number,
    standardError: PropTypes.number,
    robustStandardError: PropTypes.number,
    setProgress: PropTypes.func
};