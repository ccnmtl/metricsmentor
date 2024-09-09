import React from 'react';
import PropTypes from 'prop-types';
import { labelIndex } from '../dataAttr';
import { formulaText, inlineKatex } from '../utils';


export const LearningGoals = ({
    choice, handleChoice, isComplete
}) => {
    return (
        <div>
            <p>
                In applied research, the goal is to ensure that the estimated
                slope for the variable of interest ({inlineKatex('x_1')}) is
                an unbiased estimate of the population slope. If it is biased,
                the estimate is unreliable, indicating that
                {inlineKatex('x_1')} is endogenous. One cause of this
                endogeneity is omitting relevant variables from the regression
                equation, leaving them hidden in the error term. We will
                examine four datasets to explore how different omitted
                variables contribute to OVB to varying degrees.
            </p>
            <p>
                Let&rsquo;s choose a dataset for this analysis:
            </p>
            <div>
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
                    <span className="form-check" key={i}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor"
                                className="bi bi-check-circle-fill text-success"
                                viewBox="0 0 16 16"
                            >
                                <path d={'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m' +
                                    '-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9' +
                                    '.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L' +
                                    '6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-' +
                                    '4.99a.75.75 0 0 0-.01-1.05z'}/>
                            </svg>
                        }
                    </span>
                ))}
            </div>
        </div>
    );
};

LearningGoals.propTypes = {
    choice: PropTypes.string,
    handleChoice: PropTypes.func.isRequired,
    isComplete: PropTypes.object.isRequired,
};