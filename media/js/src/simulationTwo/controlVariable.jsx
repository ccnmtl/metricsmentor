import React from 'react';
import PropTypes from 'prop-types';
import { formulaText, inlineKatex } from '../utils';
import { labelIndex } from '../dataAttr';
import { Katex } from '../katexComponent';


export const ControlVariable = ({
    controls, data, handleControls
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
                omitted variable is correlated with both the dependent
                variable {inlineKatex('y')}, and the independent variable of
                interest {inlineKatex('x_1')}, it introduces bias into the
                estimated sample slope {inlineKatex('\\hat{\\beta_1}')}.
            </p>
            <p>
                In a simple linear regression, the effect of OVB on
                {inlineKatex('\\hat{\\beta_1}')} is as follows:
            </p>
            <div className="ms-3 mb-3">
                <Katex tex={
                    // eslint-disable-next-line max-len
                    '\\hat{\\beta_1} \\xrightarrow{p} \\beta_1 + [bias]'} />
            </div>
            <p>
                <span className="text-danger fw-semibold">Evan: This paragraph
                is dependent on the dataset chosen.</span>
                In this case, OVB can lead to inaccurate estimates of the
                relationships between {inlineKatex('Income')} and
                {inlineKatex('YearsOfEducation')}.
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
                Control variables for this dataset:
            </h2>
            <p>
                <span className="text-danger fw-semibold">Evan: This paragraph
                is dependent on the dataset chosen.</span> Instructions for
                Income dataset control variables TBD.
            </p>
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
                            {controls[dType] === true && (<>
                                <p className="mt-3">
                                    <span className="text-danger fw-semibold">
                                    Evan: Make placehoder paragraph that is
                                    dependent on the dataset chosen.</span>
                                    Instructions for Income dataset control
                                    variables TBD.
                                </p>
                                <p>
                                    This paragraph is generic, not dependent
                                    on dataset.
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
                            </>)}
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