import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer, getCoursePk } from './utils/utils';

export const TakeawayQuestion = ({
    questionId, questionText, choices, onCorrect, submissionId
}) => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [locked, setLocked] = useState(false);

    const coursePk = getCoursePk();

    const selectedChoice = choices.find(
        (choice) => choice.index === selected
    );

    const handleSubmit = async() => {
        if (!selected || locked) return;
        setSubmitted(true);

        const isCorrect = selectedChoice.isCorrect;
        await saveAnswer(
            submissionId,
            Number(questionId),
            'takeaway',
            selected,
            isCorrect,
            {},
            coursePk
        );

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
            {typeof questionText === 'string' ? (
                <p
                    className="sim_quiz__question"
                    id={questionId}
                    dangerouslySetInnerHTML={{ __html: questionText }}
                />
            ) : (
                <div className="sim_quiz__question" id={questionId}>
                    {questionText}
                </div>
            )}

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
                data-cy={`submit${questionId}`}
            >
                Submit »
            </button>
        </div>
    );
};

TakeawayQuestion.propTypes = {
    questionId: PropTypes.number.isRequired,
    questionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            index: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            isCorrect: PropTypes.bool.isRequired,
            feedback: PropTypes.string.isRequired
        })
    ).isRequired,
    onCorrect: PropTypes.func,
    submissionId: PropTypes.number.isRequired,
    coursePk: PropTypes.number.isRequired
};