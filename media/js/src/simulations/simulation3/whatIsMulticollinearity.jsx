import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex} from '../../utils/utils';
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
            data-cy="MulticollinearityGlossary"
            data-bs-target="#MulticollinearityGlossary">
            Definition: Multicollinearity
        </button>
        <h3 className="mt-4">
            High correlation effects
            on {inlineKatex('SE(\\hat{\\beta_1})')} values
        </h3>
        <p>
            Let&lsquo;s examine the correlations of independent variables and
            see how they affect {inlineKatex('SE(\\hat{\\beta_1})')} values,
            the related component values, and the hypothesis test
            results.
            Here, we&lsquo;re using the robust formula to calculate the
            standard errors.
        </p>
        <PromptBlock
            list={[
                'Add one variable at a time to the regression model',
                'Observe the resulting regression line on the graph and ' +
                'compare it to the original',
                'Compare the correlation coefficients of the independent ' +
                'variables',
                <>
            Contrast the resulting {inlineKatex('SE(\\hat{\\beta_1})')}
            values
                </>,
                'Contrast the related component values, and the hypothesis ' +
                'test results.'
            ]}
        />
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
        <h4 className="mt-4">
            Regression line equations:
        </h4>
        <div className="container">
            <p>{inlineKatex('x_1')} only:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x1.intercept} + ${DATA.x1.slope}x_1`)}</p>
            {controls[0] ?
                <p data-cy="x2equation">
                    With {inlineKatex('x_2')}:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x2.intercept} 
                    ${DATA.x2.slope_x1 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x2.slope_x1)}x_1 
                    ${DATA.x2.slope_x2 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x2.slope_x2)}x_2`)}</p>
                :
                null
            }
            {controls[1] ?
                <p data-cy="x3equation">
                    With {inlineKatex('x_3')}:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x3.intercept} 
                    ${DATA.x3.slope_x1 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x3.slope_x1)}x_1 
                    ${DATA.x3.slope_x2 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x3.slope_x2)}x_3`)}</p>
                :
                null
            }
        </div>
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
        <table className="table table-bordered mb-4 mt-3">
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
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
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
                    <td>Fail to reject</td>
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
        As you&rsquo;ve seen
        here, {inlineKatex('\\text{corr}(x_1,x_3)')} is high, and this
        indicates the presence of multicollinearity, and can lead to incorrect
        conclusions in significance tests. Let&lsquo;s apply this knowledge to
        a real-world dataset and explore the steps you can take to help you
        make more accurate inferences.
        </p>
        <div className="simulation__step-prompt">
            <button className="btn btn-sm btn-success"
                onClick={() => handleProgress(1)}
                data-cy="open-real-data"
            >
                Continue to Real dataset &raquo;
            </button>
        </div>
    </>;
};

WhatIsMulticollinearity.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.bool).isRequired,
    handleControls: PropTypes.func.isRequired,
    handleProgress: PropTypes.func.isRequired,
};