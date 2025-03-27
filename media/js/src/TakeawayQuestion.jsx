import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TakeawayQuestion = ({ questionId, questionText, choices }) => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const selectedChoice = choices.find(choice => choice.index === selected);

    const handleSubmit = () => {
        if (selected) setSubmitted(true);
    };

    return (
        <div role="radiogroup" aria-labelledby={questionId}
            className="sim_quiz__unit">
            <p className="sim_quiz__question" id={questionId}>
                {questionText}
            </p>

            <div id={`${questionId}group`} className="sim_quiz__choice-list">
                {choices.map(({ id, index, text }) => (
                    <div className="form-check sim_quiz__choice-item" key={id}>
                        <input
                            name={`${questionId}-choices`}
                            type="radio"
                            id={id}
                            className="form-check-input"
                            onChange={() => setSelected(index)}
                            checked={selected === index}
                        />
                        <label htmlFor={id} className="form-check-label">
                            <span className="sim_quiz__choice-index">
                                {index}
                            </span>
                            <span className="sim_quiz__choice-text">
                                {text}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
            {submitted && selectedChoice && (
                <div className="sim_quiz__feedback">
                    <div className={`align-self-start me-3 
                            ${selectedChoice.isCorrect ? 'status-checkmark'
                    : 'status-warning'}`}>
                        {selectedChoice.isCorrect ? '✓' : '!'}
                    </div>
                    <div className={`sim_quiz__feedback-text-${
                        selectedChoice.isCorrect ? 'correct' : 'incorrect'}`}>
                        <p>
                            {selectedChoice.feedback}
                        </p>
                    </div>
                </div>
            )}
            <button className="btn btn-sm btn-success mt-2" type="button"
                onClick={handleSubmit}>
                Submit »
            </button>
        </div>
    );
};

TakeawayQuestion.propTypes = {
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        index: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool.isRequired,
        feedback: PropTypes.string.isRequired
    })).isRequired
};
