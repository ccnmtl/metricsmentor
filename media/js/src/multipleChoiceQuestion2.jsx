import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from './utils';

const simContainer = document.querySelector('#react-root');
const coursePk =
    simContainer ? Number(simContainer.dataset.course) : '';

export const MultipleChoiceQuestion2 = ({ isSubmitted, setIsSubmitted,
    submissionId, questionNumber, takeaways, handleContinue, checkComplete,
    handleStartOver }) => {

    const [selected, setSelected] = useState({});
    const [isCorrect, setIsCorrect] = useState({});
    const [nextStep, setNextStep] = useState(false);

    const handleOptionSelect = (topic, option) => {
        setSelected({...selected, [topic]: option});
    };

    const checkCorrect = () => {
        const result = Object.values(isCorrect);
        const checkResult = result.length > 0 && !result.includes(false);
        return checkResult;
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        const correct = {};
        for (let topic in takeaways) {
            correct[topic] = $(`input[name="${topic}-options"]:checked`)
                .val() === takeaways[topic].answer;
        }
        setIsCorrect({...isCorrect, ...correct});
    };

    const feedback = function(topic, feedback_bad, feedback_good) {
        if (isCorrect[topic] === true) {
            return (
                <div className="form-check text-success mt-2 mb-4" role="alert">
                    {feedback_good}
                </div>
            );
        } else if (isCorrect[topic] === false) {
            return (
                <div className="form-check text-danger mt-2 mb-4" role="alert">
                    {feedback_bad}
                </div>
            );
        }
    };

    useEffect(() => {
        if (isCorrect) {
            setNextStep(checkCorrect());
            const asyncSave = async function(selected, correct) {
                await saveAnswer(
                    submissionId, questionNumber, 'multiple-choice',
                    selected, correct, {});};
            for (let topic in isCorrect) {
                asyncSave(selected[topic], isCorrect[topic]);
            }
        }
    }, [isCorrect]);

    const isDone = isSubmitted && nextStep && checkComplete() > 0;

    return (
        <div className="simulation__step-content container"
        >
            {Object.entries(takeaways)
                .map(([topic, {prompt, options, answer, feedback_bad,
                    feedback_good}], i) => (
                    <div key={i}>
                        <p>
                            {prompt}
                        </p>
                        {options.map((option, index) => (
                            <div key={index} className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type='radio'
                                    id={`${topic}-option-${index}`}
                                    name={`${topic}-options`}
                                    value={option}
                                    checked={selected[topic] === option}
                                    onChange={() => handleOptionSelect(
                                        topic, option)}
                                />
                                <label className="form-check-label"
                                    htmlFor={`${topic}-option-${index}`}
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                        {isSubmitted && feedback(topic, feedback_bad,
                            feedback_good)}
                    </div>
                ))
            }
            {!nextStep &&
                <button className="btn btn-secondary me-2"
                    type='submit' onClick={handleSubmit}
                >
                    {'Submit >>'}
                </button>
            }
            {isDone &&
                <a className="btn btn-secondary me-2" role="button"
                    href={`/course/${coursePk}/`}
                >
                    {'I\'m Done! >>'}
                </a>
            }
            {nextStep &&
                <button className="btn btn-secondary me-2"
                    type='submit' onClick={handleContinue}
                >
                    {checkComplete() < 1 ?
                        'Continue >>' : 'Try another dataset >>'}
                </button>
            }
            {(isDone || checkComplete() > 1) &&

                <button className="btn btn-secondary"
                    onClick={handleStartOver}
                >
                    Start Over
                </button>
            }
        </div>);
};

MultipleChoiceQuestion2.propTypes = {
    choice: PropTypes.string.isRequired,
    takeaways: PropTypes.object.isRequired,
    submissionId: PropTypes.number.isRequired,
    questionNumber: PropTypes.number.isRequired,
    setIsSubmitted: PropTypes.func.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    handleContinue: PropTypes.func.isRequired,
    checkComplete: PropTypes.func.isRequired,
    handleStartOver: PropTypes.func.isRequired,
};