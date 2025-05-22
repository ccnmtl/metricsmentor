import React from 'react';
import PropTypes from 'prop-types';
import { labelIndex } from '../dataAttr';


export const LearningGoals = ({
    choice, handleChoice, isComplete, checkComplete
}) => {
    return (
        <>
            <p>
                The learning goal is to explore how different control
                variables contribute to OVB to varying degrees. You&rsquo;ll
                do so by comparing the strength of the correlations of
                the variables.
            </p>
            <p>Be sure to explore at least <strong>two</strong> datasets for
                this simulation.<br />
                Dataset completed: <span className="hi-val"><strong className=
                {`${checkComplete() > 1 ? ' text-success' : ''}`}
            >
                {Math.min(checkComplete(), 2)} of 2</strong>.</span>
            </p>
            <p>
                Let&rsquo;s choose a dataset for this analysis:
            </p>
            <ul className="choice-list dataset-opt">
                {[
                    ['income', 'The relationship between annual income and ' +
                        'years of education of the household head.'],
                    ['gpa4', 'The relationship between college and high ' +
                        'school GPAs.'],
                    ['affairs_sim2', 'The relationship between the ' +
                        'frequency of extramarital affairs and marriage ' +
                        'satisfaction ratings.'],
                    ['campus_sim2', 'The relationship between campus crime ' +
                        'rates and total student enrollment.']
                ].map((dType, i) => (
                    <li className="form-check d-flex mb-2" key={i}>
                        <input
                            key={i}
                            className="form-check-input"
                            type="radio"
                            id={dType[0]}
                            name="data-choice"
                            value={dType[0]}
                            checked={choice === dType[0]}
                            onChange={handleChoice}
                        />
                        <label htmlFor={dType[0]}
                            className="form-check-label pb-2 me-2"
                        >
                            {labelIndex[dType[0]]}
                            <p className="text-secondary mb-0">
                                {dType[1]}
                            </p>
                        </label>
                        {isComplete[dType[0]] &&
                            <div className="status-complete flex-shrink-0"
                                data-cy={`${dType[0]}-complete`}
                            >
                                &#10003;
                            </div>
                        }
                    </li>
                ))}
            </ul>
        </>
    );
};

LearningGoals.propTypes = {
    choice: PropTypes.string,
    checkComplete: PropTypes.func.isRequired,
    handleChoice: PropTypes.func.isRequired,
    isComplete: PropTypes.object.isRequired,
};