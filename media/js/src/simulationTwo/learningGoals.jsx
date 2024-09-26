import React from 'react';
import PropTypes from 'prop-types';
import { labelIndex } from '../dataAttr';
import { inlineKatex } from '../utils';


export const LearningGoals = ({
    choice, handleChoice, isComplete, checkComplete
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
            <p>Be sure to explore at least <strong>two</strong> datasets for
                this simulation. You&rsquo;ve completed <strong className=
                {`${checkComplete() > 1 ? ' text-success' : ''}`}
            >
                {Math.min(checkComplete(), 2)} of 2</strong>.
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
                            <div className="status-complete flex-shrink-0">
                                &#10003;
                            </div>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

LearningGoals.propTypes = {
    choice: PropTypes.string,
    checkComplete: PropTypes.func.isRequired,
    handleChoice: PropTypes.func.isRequired,
    isComplete: PropTypes.object.isRequired,
};