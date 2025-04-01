import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, STATIC_URL } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import { PromptBlock } from '../../PromptBlock';
import DATA from './multicollinearityGeneratedData.json';


export const WhatIsMulticollinearity = ({
    controls, handleControls, handleProgress
}) => {
    return <>
        <p>
            Let&lsquo;s now learn to identify multicollinearity in a dataset
            and then examine how this leads to
            imprecise {inlineKatex('SE(\\hat{\\beta_1})')}, and subsequently
            incorrect hypothesis testing results.
        </p>
        <PromptBlock
            text="But first, take a moment to familiarize yourself with
                the definition of multicollinearity; it&rsquo;ll help
                as you continue with this exercise." />
        <button
            className="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#MulticollinearityGlossary">
            Definition: Multicollinearity
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
            <p>{inlineKatex('x_1')} only:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x1.intercept} + ${DATA.x1.slope}x_1`)}</p>
            {controls[0] ?
                <p>With {inlineKatex('x_2')}:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x2.intercept} 
                    ${DATA.x2.slope_x1 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x2.slope_x1)}x_1 
                    ${DATA.x2.slope_x2 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x2.slope_x2)}x_2`)}</p>
                :
                null
            }
            {controls[1] ?
                <p>With {inlineKatex('x_3')}:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x3.intercept} 
                    ${DATA.x3.slope_x1 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x3.slope_x1)}x_1 
                    ${DATA.x3.slope_x2 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x3.slope_x2)}x_2`)}</p>
                :
                null
            }
        </div>
        <p>
            <strong>
                Multicollinearity effect on values:
            </strong>
        </p>
        <p> Placeholder for instruction text or explanation</p>
        <table className="table table-bordered mb-5 mt-3">
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <th scope="col">{inlineKatex('x_1')} only</th>
                    <th scope="col">With {inlineKatex('x_2')}</th>
                    <th scope="col">With {inlineKatex('x_3')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">
                    </th>
                    <td></td>
                    <td>
                        <Katex tex={`corr(x_1, x_2): ${DATA.x2.corr_x1}`} />
                    </td>
                    <td>
                        <Katex tex={`corr(x_1, x_3): ${DATA.x3.corr_x1}`} />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='SE(\hat{\beta_1})' />
                    </th>
                    <td><Katex tex={`${DATA.x1.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x2.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x3.stderr}`} /></td>
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
        {inlineKatex(
            // eslint-disable-next-line max-len
            'H_0: \\beta_1 = 0; \\quad H_1: \\beta_1 \\neq 0; \\quad \\alpha = 0.05')}
        <table className="table table-bordered mb-5 mt-3">
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <th scope="col">{inlineKatex('x_1')} only</th>
                    <th scope="col">With {inlineKatex('x_2')}</th>
                    <th scope="col">With {inlineKatex('x_3')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td>
                        <Katex tex={`corr(x_1, x_2): ${DATA.x2.corr_x1}`} />
                    </td>
                    <td>
                        <Katex tex={`corr(x_1, x_3): ${DATA.x3.corr_x1}`} />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='SE(\hat{\beta_1})' /></th>
                    <td><Katex tex={`${DATA.x1.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x2.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x3.stderr}`} /></td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='t' /></th>
                    <td><Katex tex={`${DATA.x1.t}`} /></td>
                    <td><Katex tex={`${DATA.x2.t}`} /></td>
                    <td><Katex tex={`${DATA.x3.t}`} /></td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='p-value' /></th>
                    <td><Katex tex={`${DATA.x1.pvalue}`} /></td>
                    <td><Katex tex={`${DATA.x2.pvalue}`} /></td>
                    <td><Katex tex={`${DATA.x3.pvalue}`} /></td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='CI' /></th>
                    <td>
                        <Katex tex={`${DATA.x1.ci[0].toFixed(2)}`} />
                        <Katex tex={'< \\beta_1 <'} />
                        <Katex tex={`${DATA.x1.ci[1].toFixed(2)}`} />
                    </td>
                    <td>
                        <Katex tex={`${DATA.x2.ci[0].toFixed(2)}`} />
                        <Katex tex={'< \\beta_1 <'} />
                        <Katex tex={`${DATA.x2.ci[1].toFixed(2)}`} />
                    </td>
                    <td>
                        <Katex tex={`${DATA.x3.ci[0].toFixed(2)}`} />
                        <Katex tex={'< \\beta_1 <'} />
                        <Katex tex={`${DATA.x3.ci[1].toFixed(2)}`} />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Hypothesis test</th>
                    <td>Reject</td>
                    <td>Reject</td>
                    <td>Reject</td>
                </tr>
            </tbody>
        </table>
        <p>Placeholder fo explanation of what&apos;s going on. </p>
        <div className="simulation__step-prompt">
            <button className="btn btn-sm btn-success"
                onClick={() => handleProgress(1)}
            >
                Continue &raquo;
            </button>
        </div>
    </>;
};

WhatIsMulticollinearity.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.bool).isRequired,
    handleControls: PropTypes.func.isRequired,
    handleProgress: PropTypes.func.isRequired,
};