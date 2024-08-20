import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from './utils';

export const MultipleChoiceQuestion2 = ({
    isSubmitted, setIsSubmitted, submissionId, questionNumber,
    takeaways, isCorrect, setIsCorrect, choice, handleContinue }) => {

    const [selected, setSelected] = useState({});
    const handleOptionSelect = (topic, option) => {
        setSelected({...selected, [topic]: option});
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

    const feedback = function(topic, answer) {
        if (isCorrect[topic] === true) {
            return (
                <div className="alert alert-success mt-2" role="alert">
                    Correct! The answer is {answer}.
                </div>
            );
        } else if (isCorrect[topic] === false) {
            return (
                <div className="alert alert-danger mt-2" role="alert">
                    Incorrect. The answer is {answer}.
                </div>
            );
        }
    };

    useEffect(() => {
        if (isCorrect) {
            const asyncSave = async function(selected, correct) {
                await saveAnswer(
                    submissionId, questionNumber, 'multiple-choice',
                    selected, correct, {});};
            for (let topic in isCorrect) {
                asyncSave(selected[topic], isCorrect[topic]);
            }
        }
    }, [isCorrect]);

    return (
        <div className="simulation__step-content container"
        >
            {Object.entries(takeaways)
                .map(([topic, {prompt, options, answer}], i) => (<div key={i}>
                    <p>{prompt.map((text, index) => {
                        if (index % 2 === 0) {
                            return <span key={index}>{text}</span>;
                        } else {
                            return <strong key={index}>{text}</strong>;
                        }})}
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
                    {isSubmitted && feedback(topic, answer)}
                </div>
                ))
            }
            <button className="btn btn-secondary me-4"
                type='submit' onClick={handleSubmit}
            >
                {'Submit >>'}
            </button>
            {isCorrect && isCorrect[choice] &&
                <button className="btn btn-primary"
                    type='submit' onClick={handleContinue}
                >
                    {'Continue'}
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
    isCorrect: PropTypes.object.isRequired,
    setIsCorrect: PropTypes.func.isRequired,
    handleContinue: PropTypes.func.isRequired
};