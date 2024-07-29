import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex } from '../utils';
import { dataAttr } from '../dataAttr';


export const ControlVariable = ({
    choice, controls, handleChoice, handleControls, labelIndex
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
                    <option value="affairs_sim2">Affairs</option>
                </select>
            </div>
            <ul>
                {Object.entries(dataAttr[choice]).slice(0,2)
                    .map((dType, i) => (
                        <li key={i} className="form-check">
                            <em>
                                {inlineKatex(`${dType[0]}: ${
                                    labelIndex[dType[1]]}`)}
                            </em>
                        </li>
                    ))}
                {dataAttr[choice].option.map((dType, i) => (
                    <li key={i}
                        className={'form-check'}
                    >
                        <label htmlFor={`x${i+2}`}
                            className="form-check-label">
                            <em>
                                {inlineKatex(`x_${i+2}: ${
                                    labelIndex[dType]
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
                            checked={controls[dType] == true}
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
    controls: PropTypes.object.isRequired,
    handleChoice: PropTypes.func.isRequired,
    handleControls: PropTypes.func.isRequired,
    labelIndex: PropTypes.object.isRequired,
};