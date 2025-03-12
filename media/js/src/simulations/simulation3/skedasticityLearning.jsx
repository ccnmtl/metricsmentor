import React from 'react';
import { HeteroskedasticitySlider } from './heteroskedasticitySlider';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';

export const SkedasticityLearning = ({
    heteroskedasticity, setHeteroskedasticity, slope, intercept, standardError,
    robustStandardError
}) => {
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
                    '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x'} />
            </div>
            <div className="katex-block">
                <Katex tex={
                    // eslint-disable-next-line max-len
                    `y = ${intercept ? intercept.toFixed(2) : ''}x + ${slope ? slope.toFixed(2) : ''}`} />
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
                            <Katex tex={
                                (standardError || standardError === 0) ?
                                    standardError.toFixed(2) : ''}
                            />
                        </td>
                        <td>
                            <Katex tex={
                                (robustStandardError ||
                                    robustStandardError === 0) ?
                                    robustStandardError.toFixed(2) : ''}

                            />
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