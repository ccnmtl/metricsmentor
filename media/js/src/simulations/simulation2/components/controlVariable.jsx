import React from 'react';
import PropTypes from 'prop-types';
import { formulaText, inlineKatex } from '../../../utils/utils';
import { labelIndex } from '../dataAttr';

export const STATIC_URL = window.MetricsMentor.staticUrl;

export const ControlVariable = ({
    controls, data, handleControls, controlText, index
}) => {
    return (
        <>
            <div className="prompt-block">
                <div className="prompt-gfx">
                    <img src={`${STATIC_URL}/img/icon-bell.svg`}
                        className="prompt-img"
                        alt="Reminder:" />
                </div>
                <p className="mb-2">
                Take a moment to to familiarize yourself with OVB theory,
                it&rsquo;ll help help as you move forward.
                </p>
            </div>
            <button
                className="btn btn-sm btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#OVBTheoryModal">
                OVB theory
            </button>
            <h2>
                Control variables for this dataset:
            </h2>
            <p>
                {controlText.general_inst}
            </p>
            <div className="prompt-block">
                <div className="prompt-gfx">
                    <img src={`${STATIC_URL}/img/icon-bell.svg`}
                        className="prompt-img"
                        alt="Reminder:" />
                </div>
                <ul className="ps-3 mb-4">
                    <li>Add one variable at a time to the regression model</li>
                    <li>Observe the resulting regression line
                        on the graph and compare it to the original</li>
                    <li>Compare the new regression line coeffiecients
                        to the original</li>
                    <li>Observe the affect
                        of {
                        inlineKatex('\\text{corr}(y, x_i)')
                    } and {
                        inlineKatex('\\text{corr}(x_1, x_i)')
                    } on {
                        inlineKatex('\\hat{\\beta_1}.')
                    }
                    </li>
                </ul>
            </div>

            {/* container for all variables */}
            <div className="choice-list ms-0">
                {/* original variables y and x1 below */}
                {[['y', index.y], ['x_1', index.x_1]]
                    .map((dType, i) => (
                        <div key={i} className="dataset-variable-item ps-4">
                            {inlineKatex(`${dType[0]}
                                \\text{ (${labelIndex[dType[1]]})}`)}
                        </div>
                    ))}
                {/* control variables below */}
                {index.option.map((dType, i) => {
                    const selectData = data[dType];
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
                                    body: [`\\widehat{${labelIndex[index.y]}
                                        _i} = ${selectData.intercept} +
                                        ${selectData.slope_x1 +
                                            labelIndex[index.x_1]}_i +
                                        ${selectData.slope_x2 +
                                            labelIndex[dType]}_i`],
                                },
                                {
                                    title: <>Original sample slope
                                        coefficient
                                        for {inlineKatex('x_1')}</>,
                                    body: [`\\hat{\\beta_1} =
                                        ${data[index.x_1].slope}`],
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
            <p className="mt-4">
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
    index: PropTypes.object.isRequired,
};