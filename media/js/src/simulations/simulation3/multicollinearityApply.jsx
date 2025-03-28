import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, STATIC_URL } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import DATA from './multicollinearityRealData.json';


export const MulticollinearityApply = ({
    controls, handleControls, handleProgress
}) => {
    return <>
        <p>
            This segment is to ask users to work on Multicollinearity problems
            with real datasets. Instruction text goes here.
        </p>
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
            {inlineKatex('x_1 \\text{(R\\&D)}')} only
        </div>
        {['x_2\\text{(Profit margin)}', 'x_3\\text{(Sales)}'].map((val, i) =>
            <div className='form-check dataset-variable-item' key={i}>
                <label htmlFor={val} className="form-check-label">
                    Add {inlineKatex(val)} to {inlineKatex('x_1')}
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
                <>With {inlineKatex('x_2')}:&emsp;{inlineKatex(
                    '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + ' +
                    '\\hat{\\beta_2}x_2')}</>,
                <>With {inlineKatex('x_3')}:&emsp;{inlineKatex(
                    '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + ' +
                    '\\hat{\\beta_3}x_3')}</>,
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
                    <td>
                        <Katex tex={`corr(x_1, x_2): ${DATA.x2.corr_x1}`} />
                    </td>
                    <td>
                        <Katex tex={`corr(x_1, x_3): ${DATA.x3.corr_x1}`} />
                    </td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='SE(\hat{\beta_1})' /></th>
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
        <p>
            Here is the explanation of how Multicollinearity can affect
            hypothesis testing.
        </p>
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
                    <td>
                        <Katex tex={`corr(x_1, x_2): ${DATA.x2.corr_x1}`} />
                    </td>
                    <td>
                        <Katex tex={`corr(x_1, x_3): ${DATA.x3.corr_x1}`} />
                    </td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='SE(\hat{\beta_1})' /></th>
                    <td><Katex tex={`${DATA.x1.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x2.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x3.stderr}`} /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='t' /></th>
                    <td><Katex tex={`${DATA.x1.t}`} /></td>
                    <td><Katex tex={`${DATA.x2.t}`} /></td>
                    <td><Katex tex={`${DATA.x3.t}`} /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='p-value' /></th>
                    <td><Katex tex={`${DATA.x1.pvalue}`} /></td>
                    <td><Katex tex={`${DATA.x2.pvalue}`} /></td>
                    <td><Katex tex={`${DATA.x3.pvalue}`} /></td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        <Katex tex='CI' /></th>
                    <td>
                        <Katex tex={`[${DATA.x1.ci[0]},`} />
                        <Katex tex={`${DATA.x1.ci[1]}]`} />
                    </td>
                    <td>
                        <Katex tex={`[${DATA.x2.ci[0]},`} />
                        <Katex tex={`${DATA.x2.ci[1]}]`} />
                    </td>
                    <td>
                        <Katex tex={`[${DATA.x3.ci[0]},`} />
                        <Katex tex={`${DATA.x3.ci[1]}]`} />
                    </td>
                </tr>
                <tr>
                    <th className="rowheader text-nowrap">
                        Hypothesis test</th>
                    <td>Reject</td>
                    <td>Reject</td>
                    <td>Fail to reject</td>
                </tr>
            </tbody>
        </table>
        <p>Placeholder fo explanation of what&apos;s going on. </p>
        <button className="btn btn-secondary float-end"
            onClick={() => handleProgress(2)}
        >
            Continue &#8811;
        </button>
    </>;
};

MulticollinearityApply.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.bool).isRequired,
    handleControls: PropTypes.func.isRequired,
    handleProgress: PropTypes.func.isRequired,
};
