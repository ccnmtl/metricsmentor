import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from './utils';


export const MultipleChoiceQuestion2 = ({isSubmitted, setIsSubmitted, takeaways,
    handleContinue, checkComplete, handleStartOver, submissionId,
    createSubmission, coursePk }) => {

    const [selected, setSelected] = useState({});
    const [results, setResults] = useState({});
    const [nextStep, setNextStep] = useState(false);

    const handleOptionSelect = (topic, option) => {
        setSelected({...selected, [topic]: option});
    };

    const asyncSave = async function() {
        for (let topic in results) {
            await saveAnswer(
                submissionId, takeaways[topic].q_id, 'multiple-choice',
                selected[topic], results[topic], {});
        }
    };

    const handleSubmit = async() => {
        setIsSubmitted(true);
        const correct = {};
        for (let topic in takeaways) {
            correct[topic] = $(`input[name="${topic}-options"]:checked`)
                .val() === takeaways[topic].answer;
        }
        setResults({...results, ...correct});
        if (!submissionId) {
            createSubmission(() => asyncSave());
        } else {
            asyncSave();
        }
    };

    const feedback = function(topic, feedback_bad, feedback_good) {
        if (results[topic] === true) {
            return (
                <div className="form-check text-success mt-2 mb-4" role="alert">
                    {feedback_good}
                </div>
            );
        } else if (results[topic] === false) {
            return (
                <div className="form-check text-danger mt-2 mb-4" role="alert">
                    {feedback_bad}
                </div>
            );
        }
    };

    const isDone = isSubmitted && nextStep && checkComplete() > 0;

    useEffect(() => {
        const result = Object.values(results);
        setNextStep(result.length > 0 && !result.includes(false));
    }, [results]);

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
                    Submit &raquo;
                </button>
            }
            {isDone &&
                <a className="btn btn-secondary me-2" role="button"
                    href={`/course/${coursePk}/`}
                >
                    I&rsquo;m Done! &raquo;
                </a>
            }
            {nextStep &&
                <button className="btn btn-secondary me-2"
                    type='submit' onClick={handleContinue}
                >
                    {checkComplete() < 1 ?
                        'Continue »' : 'Try another dataset »'}
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
    setIsSubmitted: PropTypes.func.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    handleContinue: PropTypes.func.isRequired,
    checkComplete: PropTypes.func.isRequired,
    handleStartOver: PropTypes.func.isRequired,
    createSubmission: PropTypes.func.isRequired,
    submissionId: PropTypes.number,
    coursePk: PropTypes.number.isRequired,
};