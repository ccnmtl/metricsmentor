import React from 'react';
import PropTypes from 'prop-types';
import { formulaText, inlineKatex } from '../utils';
import { labelIndex } from '../dataAttr';


export const ControlVariable = ({
    controls, data, handleControls
}) => {
    // const baseData = data.lines[data.y];
    return (
        <div className="row">
            <p>
                Instructions for this step. <br />
                Guide user with a narrative, lead them to what they need
                to pay attention to when turning on/off each variable.
                explanation on the generic regression line, intro to OVB. <br />
                This instruction needs to include the effect of the
                covariants:
            </p>
            <p className="mb-4">
                {formulaText({ body: [
                    '\\hat{\\beta_1} \\xrightarrow{\\rho} \\beta_1 + ' +
                        '[the\\ bias\\ ratio]',
                    'y = \\beta_0 + \\beta_1x_1 + \\beta_2x_2 + u',
                    '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + ' +
                        '\\hat{\\beta_2}x_i',]
                })}
            </p>
            {/* <div className="col-12 mb-2">
                <label htmlFor="data-choice">
                    <em>Choose a dataset</em>
                </label>
                <select
                    className="form-select"
                    name="data-choice"
                    value={choice}
                    onChange={handleChoice}
                >
                    <option value="income">Income</option>
                    <option value="gpa4">GPA4</option>
                    <option value="affairs_sim2">Affairs</option>
                    <option value="campus_sim2">Campus Crime Rates</option>
                </select>
            </div> */}
            <h2 className="mb-4">
                Choose one control variable on plot (need better header):
            </h2>
            <ul>
                {Object.entries(data).slice(0,2)
                    .map((dType, i) => (
                        <li key={i} className="form-check mb-3">
                            {inlineKatex(`${dType[0]}
                                \\text{ (${labelIndex[dType[1]]})}`)}
                        </li>
                    ))}
                {data.option.map((dType, i) => {
                    const selectData = data.lines[dType];
                    return (
                        <li key={i}
                            className={'form-check'}
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
                            <ul className="list-group">
                                {controls[dType] === true && [
                                    {
                                        title: 'Regression line equation',
                                        body: [`\\widehat{${labelIndex[data.y]}
                                            _i} = ${selectData.intercept} +
                                            ${selectData.slope_x1 +
                                                labelIndex[data.x_1]}_i +
                                            ${selectData.slope_x2 +
                                                labelIndex[data.x_2]}_i`],
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
                            </ul>
                            {controls[dType] === true && (
                                <p className='my-4'>
                                    Text to guide user with a narrative, lead
                                    them to what they need to pay attention to
                                    with what they see. <br />
                                    <strong>
                                        What student needs to notice
                                    </strong>:
                                    See, {inlineKatex('\\hat{\\beta_1}')} what
                                    happens to it as the new control variable is
                                    added <br />
                                    <strong>
                                        What student needs to notice
                                    </strong>:
                                    See {inlineKatex('corr(y, x_2)')} and
                                    {inlineKatex('corr(x_1, x_2)')}, make
                                    connection to the visual display of the new
                                    and old regression lines, and shift in
                                    {inlineKatex('\\hat{\\beta_1}')}.
                                </p>
                            )}
                            <hr style={{borderTop: 'dotted 3px'}}/>
                        </li>);
                })}
            </ul>
        </div>
    );
};

ControlVariable.propTypes = {
    controls: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleControls: PropTypes.func.isRequired,
};