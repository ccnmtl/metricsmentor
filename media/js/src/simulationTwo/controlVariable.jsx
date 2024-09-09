import React from 'react';
import PropTypes from 'prop-types';
import { formulaText, inlineKatex } from '../utils';
import { labelIndex } from '../dataAttr';
import { Katex } from '../katexComponent';


export const ControlVariable = ({
    controls, data, handleControls, controlText
}) => {
    // const baseData = data.lines[data.y];
    return (
        <div className="row">
            <p>
                In regression analysis, when a relevant control variable is
                omitted, the effect of this missing variable gets absorbed
                into the error term {inlineKatex('u')}.
            </p>
            <div className="ms-3 mb-3">
                <Katex tex={'y = \\beta_0 + \\beta_1x_1 + u'} />
            </div>
            <p>
                This is known as the omitted variable bias (OVB). If the
                omitted variable {inlineKatex('x_i')} is correlated with both
                the dependent variable {inlineKatex('y')}, and the independent
                variable of interest {inlineKatex('x_1')}, it introduces bias
                into the estimated sample
                slope {inlineKatex('\\hat{\\beta_1}')}.
                In a simple linear regression, the effect of OVB on
                {inlineKatex('\\hat{\\beta_1}')} is as follows:
            </p>
            <p className="ms-3 mb-3">
                <Katex tex={
                    // eslint-disable-next-line max-len
                    '\\hat{\\beta_1} \\xrightarrow{p} \\beta_1 + [bias]'} />
            </p>
            <p>
                The correlations between the included and omitted variables,
                specifically {inlineKatex('corr(y,x_i)')} and
                {inlineKatex('corr(x_1,x_i)')},
                contribute to the {inlineKatex('[bias]')}.
            </p>
            <h2 className="mb-4">
                Control variables for this dataset:
            </h2>
            <p>
                {controlText.general_inst}
            </p>
            <p>
                Select any variable to add to the regression model.
            </p>
            <div className="OG-C-VARS">
                {Object.entries(data).slice(0,2)
                    .map((dType, i) => (
                        <div key={i} className="mb-3 OG-VAR">
                            {inlineKatex(`${dType[0]}
                                \\text{ (${labelIndex[dType[1]]})}`)}
                            <hr style={{borderTop: 'dotted 2px'}}/>
                        </div>
                    ))}
                {data.option.map((dType, i) => {
                    const selectData = data.lines[dType];
                    return (
                        <div key={i}
                            className={'form-check C-VAR'}
                        >
                            <label htmlFor={`x${i+2}`}
                                className="form-check-label">
                                {inlineKatex(`x_1\\ and\\ x_${i+2} 
                                    \\text{ (${labelIndex[dType]}})`)}
                            </label>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`x${i+2}`}
                                name={dType}
                                value={dType}
                                onChange={handleControls}
                                checked={controls[dType] === true}
                            >
                            </input>
                            {controls[dType] === true && (<>
                                <p className="mt-3">
                                    {controlText.control_inst[dType]}
                                </p>
                            </>)}
                            {controls[dType] === true && [
                                {
                                    title: 'Regression line equation',
                                    body: [`\\widehat{${labelIndex[data.y]}
                                        _i} = ${selectData.intercept} +
                                        ${selectData.slope_x1 +
                                            labelIndex[data.x_1]}_i +
                                        ${selectData.slope_x2 +
                                            labelIndex[dType]}_i`],
                                },
                                {
                                    title: <>Original sample slope
                                        coefficient
                                        for {inlineKatex('x_1')}</>,
                                    body: [`\\hat{\\beta_1} =
                                        ${data.lines[data.x_1].slope}`],
                                },
                                {
                                    title: <>New sample slope coefficient
                                        for {inlineKatex('x_1')}</>,
                                    body: [`\\hat{\\beta_1} =
                                        ${selectData.slope_x1}`],
                                },
                                {
                                    title: 'Correlation coefficients',
                                    body: [
                                        `corr(y, x_2) = 
                                            ${selectData.corr_y}`,
                                        `corr(x_1, x_2) = 
                                            ${selectData.corr_x1}`,
                                    ],
                                }
                            ].map((content, i) => formulaText(content, i))}
                            <hr style={{borderTop: 'dotted 2px'}}/>
                        </div>);
                })}
            </div>
            <p className="mt-3">
                The extent of bias in {inlineKatex('\\hat{\\beta_1}')} depends
                on
            </p>
            <ol>
                <li>the strength of the correlation between the dependent
                    variable and the omitted variable,
                {inlineKatex('corr(y, x_i)')},
                </li>
                <li>the strength of the correlation between the key variable
                    of interest and the omitted variable,
                {inlineKatex('corr(x_1, x_i)')},
                </li>
            </ol>
            <p>
                Let&rsquo;s review what you&rsquo;ve learned here in the next
                section.
            </p>
        </div>
    );
};

ControlVariable.propTypes = {
    controls: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleControls: PropTypes.func.isRequired,
    controlText: PropTypes.object.isRequired,
};