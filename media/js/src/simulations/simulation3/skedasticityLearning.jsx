import React, { useState, useEffect } from 'react';
import { HeteroskedasticitySlider } from './heteroskedasticitySlider';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';
import axios from 'axios';

export const SkedasticityLearning = ({
    heteroskedasticity, setHeteroskedasticity, slope, intercept, standardError,
    robustStandardError
}) => {
    const [pvaluesStandard, setPvaluesStandard] = useState(null);
    const [pvaluesRobust, setPvaluesRobust] = useState(null);

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

    useEffect(() => {
        calculatePvalueStandard();
        calculatePvalueRobust();
    }, [heteroskedasticity]);

    return (
        <>
            <p> This segment is to teach users about Heteroskedasticity.
                Space is for instructions.</p>
            <button className='btn btn-secondary m-1 btn-sm'>
                Glossary
            </button>
            <HeteroskedasticitySlider
                heteroskedasticity={heteroskedasticity}
                setHeteroskedasticity={setHeteroskedasticity} />
            <div className="katex-block">
                <Katex tex={
                    // eslint-disable-next-line max-len
                    `\\hat{y} = ${(intercept || intercept === 0) ? intercept.toFixed(2) : ''}x + ${slope ? slope.toFixed(2) : ''}`} />
            </div>
            <table className="table table-bordered mb-5 mt-3">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">non-robust</th>
                        <th scope="col">robust</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <Katex tex={'{SE(\\hat{\\beta_1})}'} />
                        </th>
                        <td>
                            {(standardError || standardError === 0) ?
                                standardError.toFixed(2) : ''}
                        </td>
                        <td>
                            {(robustStandardError ||
                                    robustStandardError === 0) ?
                                robustStandardError.toFixed(2) : ''}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                Here is the explanation of how SE-robust and SE-nonrobust
                can affect hypothesis testing.
            </p>
            <p>
                For example:
            </p>
            <div className="katex-block">
                <Katex tex={
                    // eslint-disable-next-line max-len
                    'H_0: \\beta_1 = 0; \\quad H_1: \\beta_1 \\neq 0; \\quad \\alpha = 0.05'} />
            </div>
            <table className="table table-bordered mb-5 mt-3">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">non-robust</th>
                        <th scope="col">robust</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <Katex tex={'{SE(\\hat{\\beta_1})}'} />
                        </th>
                        <td>
                            {(standardError || standardError === 0) ?
                                standardError.toFixed(2) : ''}
                        </td>
                        <td>
                            {(robustStandardError ||
                                    robustStandardError === 0) ?
                                robustStandardError.toFixed(2) : ''}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <Katex tex={'{t}'} />
                        </th>
                        <td>
                            {tvalueStandard}
                        </td>
                        <td>
                            {tvalueRobust}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <Katex tex={'{p-value}'} />
                        </th>
                        <td>
                            {pvaluesStandard}
                        </td>
                        <td>
                            {pvaluesRobust}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <Katex tex={'CI'} />
                        </th>
                        <td>
                            {`${ciStandard.lower.toFixed(2)} `}
                            <Katex tex={'< \\beta_1 <'} />
                            {ciStandard.upper.toFixed(2)}
                        </td>
                        <td>
                            {`${ciRobust.lower.toFixed(2)} `}
                            <Katex tex={'< \\beta_1 <'} />
                            {ciRobust.upper.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            Hypothesis Test
                        </th>
                        <td>
                            Lorem ipsum dolor sit amet
                        </td>
                        <td>
                            Lorem ipsum dolor sit amet
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

SkedasticityLearning.propTypes = {
    heteroskedasticity: PropTypes.number,
    setHeteroskedasticity: PropTypes.func,
    slope: PropTypes.number,
    intercept: PropTypes.number,
    standardError: PropTypes.number,
    robustStandardError: PropTypes.number,
};