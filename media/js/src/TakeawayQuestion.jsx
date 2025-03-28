import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TakeawayQuestion = ({
    questionId,
    questionText,
    choices,
    onCorrect
}) => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [locked, setLocked] = useState(false);

    const selectedChoice = choices.find(
        (choice) => choice.index === selected
    );

    const handleSubmit = () => {
        if (!selected || locked) return;

        setSubmitted(true);

        if (selectedChoice.isCorrect) {
            setLocked(true);
            if (onCorrect) onCorrect();
        }
    };

    return (
        <div
            role="radiogroup"
            aria-labelledby={questionId}
            className="sim_quiz__unit"
        >
            <p
                className="sim_quiz__question"
                id={questionId}
                dangerouslySetInnerHTML={{ __html: questionText }}
            />

            <div
                id={`${questionId}group`}
                className="sim_quiz__choice-list"
            >
                {choices.map(({ id, index, text }) => (
                    <div
                        className="form-check sim_quiz__choice-item"
                        key={id}
                    >
                        <input
                            name={`${questionId}-choices`}
                            type="radio"
                            id={id}
                            className="form-check-input"
                            onChange={() => {
                                setSelected(index);
                                setSubmitted(false); // Clear feedback
                            }}
                            checked={selected === index}
                            disabled={locked}
                        />
                        <label
                            htmlFor={id}
                            className="form-check-label"
                        >
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
                    <div
                        className={`align-self-start me-3 ${
                            selectedChoice.isCorrect
                                ? 'status-checkmark'
                                : 'status-warning'
                        }`}
                    >
                        {selectedChoice.isCorrect ? '✓' : '!'}
                    </div>
                    <div
                        className={`sim_quiz__feedback-text-${
                            selectedChoice.isCorrect
                                ? 'correct'
                                : 'incorrect'
                        }`}
                    >
                        <p>{selectedChoice.feedback}</p>
                    </div>
                </div>
            )}

            <button
                className="btn btn-sm btn-success mt-2"
                type="button"
                onClick={handleSubmit}
                disabled={!selected || locked}
            >
                Submit »
            </button>
        </div>
    );
};

TakeawayQuestion.propTypes = {
    questionId: PropTypes.number.isRequired,
    questionText: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            index: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            isCorrect: PropTypes.bool.isRequired,
            feedback: PropTypes.string.isRequired
        })
    ).isRequired,
    onCorrect: PropTypes.func
};