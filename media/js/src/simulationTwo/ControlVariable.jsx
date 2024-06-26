import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex } from '../utils';

const CONTROL_OPTIONS = {
    income: ['consump', 'black', 'size'],
    gpa4: ['ACT', 'skipped', 'bgfriend'],
};

const LABEL_CONVERSION = {
    'ACT': 'ACT Score',
    'bgfriend': 'Significant Other',
    'black': 'Black',
    'campus': 'Lives On Campus',
    'colGPA': 'College GPA',
    'consump': 'Consumption',
    'educ': 'Years Of Education',
    'GPA4': 'GPA4',
    'hsGPA': 'High School GPA',
    'income': 'Income',
    'size': 'Family Size',
    'skipped': 'Classes Skipped Weekly',
};

export const ControlVariable = ({
    choice, handleChoice, handleControls, COLUMNS
}) => {
    return (
        <div className="row">
            <div className="col-12 mb-2">
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
                </select>
            </div>
            <ul>
                {Object.entries(COLUMNS[choice]).slice(0,2)
                    .map((dType, i) => (
                        <li key={i} className="form-check">
                            <em>
                                {inlineKatex(`${dType[0]}: ${
                                    LABEL_CONVERSION[dType[1]]}`)}
                            </em>
                        </li>
                    ))}
                {CONTROL_OPTIONS[choice].map((dType, i) => (
                    <li key={i}
                        className={'form-check'}
                    >
                        <label htmlFor={`x${i+2}`}
                            className="form-check-label">
                            <em>
                                {inlineKatex(`x_${i+2}: ${
                                    LABEL_CONVERSION[dType]
                                }`)}
                            </em>
                        </label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`x${i+2}`}
                            name={dType}
                            value={dType}
                            onChange={handleControls}
                        >
                        </input>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ControlVariable.propTypes = {
    choice: PropTypes.string.isRequired,
    handleChoice: PropTypes.func.isRequired,
    handleControls: PropTypes.func.isRequired,
    COLUMNS: PropTypes.object.isRequired
};