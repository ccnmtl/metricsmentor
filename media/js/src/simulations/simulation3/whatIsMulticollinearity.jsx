import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, STATIC_URL } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';


export const WhatIsMulticollinearity = (controls, handleControls,
    setProgress
) => {
    return <>
        <p>
            This segment is to teach users how about
            Multicollinearity. This space is for instructions, but
            what do we do about theory? Lorem ipsum
        </p>
        <button
            className="btn btn-sm btn-secondary mb-4"
            data-bs-toggle="modal"
            data-bs-target="#MulticollinearityGlossary">
            Glossary
        </button>
        <p>
            Instructions for this step. Guide user with a narrative, lead them
            to what they need to pay attention to when turning on/off each
            variable.
        </p>
        <div className="prompt-block">
            <div className="prompt-gfx">
                <img src={`${STATIC_URL}/img/icon-bell.svg`}
                    className="prompt-img"
                    alt="Reminder:" />
            </div>
            <p className="mb-2">
            Tip on what to do and pay attention to. Yadda yadda yadda.
            </p>
        </div>
        <p>
            <strong>
                Choose one control variable on plot (need better header):
            </strong>
        </p>
        <div className="dataset-variable-item ps-4">
            {inlineKatex('x_1')}
        </div>
        {['x_2', 'x_3'].map((val, i) =>
            <div className="form-check dataset-variable-item" key={i}>
                <label htmlFor={val} className="form-check-label">
                    {inlineKatex(`x_1\\ and\\ ${val}`)}
                </label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={val}
                    name={val}
                    value={i}
                    onChange={handleControls}
                    checked={controls[i] === true}
                />
            </div>
        )}
        <p className='mt-4'>
            <strong>
                Regression equation:
            </strong>
        </p>
        <div className="container">
            {[
                <>{inlineKatex('x_1')} only:&emsp;{inlineKatex(
                    '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1')}</>,
                <>With {inlineKatex('x_2')}:&emsp;{inlineKatex(`\\hat{y} = 
                    \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + 
                    \\hat{\\beta_2}x_2`)}</>,
                <>With {inlineKatex('x_3')}:&emsp;{inlineKatex(`\\hat{y} = 
                    \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + 
                    \\hat{\\beta_3}x_3`)}</>,
            ].map((string, i) =>
                <p key={i}>
                    {string}
                </p>
            )}
        </div>
        <p>
            <strong>
                Multicollinearity effect on values:
            </strong>
        </p>
        <p> Placeholder for instruction text or explanation</p>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="colheader">--</th>
                    <th className="colheader">{inlineKatex('x_1')} only</th>
                    <th className="colheader">With {inlineKatex('x_2')}</th>
                    <th className="colheader">With {inlineKatex('x_3')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className="rowheader text-nowrap">--</th>
                    <td></td>
                    <td><Katex tex='corr(x_1, x_2): 0.75' /></td>
                    <td><Katex tex='corr(x_1, x_3): 0.85' /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='SE(\hat{\beta_1})' /></th>
                    <td><Katex tex='5' /></td>
                    <td><Katex tex='10' /></td>
                    <td><Katex tex='12' /></td>
                </tr>
            </tbody>
        </table>
        <p>
            <strong>
                Multicollinearity effect on hypothesis testing:
            </strong>
        </p>
        <p> Here is the explanation of how Multicollinearity can affect
            hypothesis testing.</p>
        <p>For example:</p>
        <p>For {inlineKatex('H_0:\\beta_1=0; H_1:\\beta_1 \\ne 0; a=0.005')}</p>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="colheader">--</th>
                    <th className="colheader">{inlineKatex('x_1')} only</th>
                    <th className="colheader">With {inlineKatex('x_2')}</th>
                    <th className="colheader">With {inlineKatex('x_3')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className="rowheader text-nowrap">--</th>
                    <td></td>
                    <td><Katex tex='corr(x_1, x_2): 0.75' /></td>
                    <td><Katex tex='corr(x_1, x_3): 0.85' /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='SE(\hat{\beta_1})' /></th>
                    <td><Katex tex='5' /></td>
                    <td><Katex tex='10' /></td>
                    <td><Katex tex='12' /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='t' /></th>
                    <td><Katex tex='10.0' /></td>
                    <td><Katex tex='0.02' /></td>
                    <td><Katex tex='3.5' /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='p-value' /></th>
                    <td><Katex tex='0' /></td>
                    <td><Katex tex='0.02' /></td>
                    <td><Katex tex='0.005' /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='CI' /></th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        Hypothesis test</th>
                    <td>Reject</td>
                    <td>Reject</td>
                    <td>Reject</td>
                </tr>
            </tbody>
        </table>
        <p>Placeholder fo explanation of what&apos;s going on. </p>
    </>;
};

WhatIsMulticollinearity.PropTypes = {
    controls: PropTypes.arrayOf(PropTypes.bool).isRequired,
    handleControls: PropTypes.func.isRequired,
    setProgress: PropTypes.func.isRequired
};