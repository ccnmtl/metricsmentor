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
        <>
            <p>
                In regression analysis, when a relevant control variable is
                omitted, the effect of this missing variable gets absorbed
                into the error term {inlineKatex('u')}.
            </p>
            <div className="sub-content">
                <Katex tex={'y = \\beta_0 + \\beta_1x_1 + u'} />
            </div>
            <p className="mt-3">
                This is known as the omitted variable bias (OVB). If the
                omitted variable {inlineKatex('x_i')} is correlated with both
                the dependent variable {inlineKatex('y')}, and the independent
                variable of interest {inlineKatex('x_1')}, it introduces bias
                into the estimated sample
                slope {inlineKatex('\\hat{\\beta_1}')}.
                In a simple linear regression, the effect of OVB on
                {inlineKatex('\\hat{\\beta_1}')} is as follows:
            </p>
            <div className="sub-content">
                <Katex tex={
                    // eslint-disable-next-line max-len
                    '\\hat{\\beta_1} \\xrightarrow{p} \\beta_1 + [bias]'} />
            </div>
            <p className="mt-3">
                The correlations between the included and omitted variables,
                specifically {inlineKatex('\\text{corr}(y,x_i)')} and
                {inlineKatex('\\text{corr}(x_1,x_i)')},
                contribute to the {inlineKatex('[bias]')}.
            </p>
            <h2>
                Control variables for this dataset:
            </h2>
            <p>
                {controlText.general_inst}
            </p>
            <p className="mb-4">
                Select any variable to add to the regression model.
            </p>
            {/* container for all variables */}
            <div className="choice-list ms-0">
                {/* original variables y and x1 below */}
                {Object.entries(data).slice(0,2)
                    .map((dType, i) => (
                        <div key={i} className="dataset-variable-item ps-4">
                            {inlineKatex(`${dType[0]}
                                \\text{ (${labelIndex[dType[1]]})}`)}
                        </div>
                    ))}
                {/* control variables below */}
                {data.option.map((dType, i) => {
                    const selectData = data.lines[dType];
                    return (
                        <div key={i}
                            className={'form-check dataset-variable-item'}
                        >
                            <label htmlFor={`x${i+2}`}
                                className={`form-check-label ${
                                    controls[dType] === true
                                        ? 'text-primary'
                                        : ''
                                }`}>
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
                                        `\\text{corr}(y, x_2) = 
                                            ${selectData.corr_y}`,
                                        `\\text{corr}(x_1, x_2) = 
                                            ${selectData.corr_x1}`,
                                    ],
                                }
                            ].map((content, i) => formulaText(content, i))}
                        </div>);
                })}
            </div>
            <p className="mt-3">
                The extent of bias in {inlineKatex('\\hat{\\beta_1}')} depends
                on
            </p>
            <ul>
                <li className="mb-2">the strength of the correlation between
                    the dependent variable and the omitted
                    variable, {inlineKatex('\\text{corr}(y, x_i)')},
                </li>
                <li className="mb-2">the strength of the correlation between
                    the key variable of interest and the omitted
                    variable, {inlineKatex('\\text{corr}(x_1, x_i)')},
                </li>
            </ul>
            <p>
                Let&rsquo;s review what you&rsquo;ve learned here in the next
                section.
            </p>
        </>
    );
};

ControlVariable.propTypes = {
    controls: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleControls: PropTypes.func.isRequired,
    controlText: PropTypes.object.isRequired,
};