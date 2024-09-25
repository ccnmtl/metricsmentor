import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from './utils';


export const MultipleChoiceQuestion2 = ({isSubmitted, setIsSubmitted, takeaways,
    handleContinue, checkComplete, handleStartOver, submissionId,
    createSubmission, coursePk, nextStep, setNextStep }) => {

    const [selected, setSelected] = useState({});
    const [results, setResults] = useState({});

    const handleOptionSelect = (topic, option) => {
        setSelected({...selected, [topic]: option});
    };

    const asyncSave = async function() {
        if (Object.values(results).length > 0) {
            for (let topic in results) {
                console.log('Saving', topic, selected[topic], results[topic]);
                await saveAnswer(
                    submissionId, takeaways[topic].q_id, 'multiple-choice',
                    selected[topic], results[topic], {});
            }
        }
    };

    const handleSubmit = async() => {
        setIsSubmitted(true);
        const correct = {};
        for (let topic in takeaways) {
            correct[topic] = $(`input[name="${topic}-options"]:checked`)
                .val() === takeaways[topic].answer;
        }
        setResults({...correct});
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

    const isDone = isSubmitted && nextStep && ((checkComplete() > 0 &&
        Object.values(results).length > 1) || checkComplete() > 1);

    useEffect(() => {
        const result = Object.values(results);
        setNextStep(result.length > 0 && !result.includes(false));
        console.log('Complete', checkComplete());
        console.log('Results', results);
    }, [results]);

    return (
        <>
            {Object.entries(takeaways)
                .map(([topic, {prompt, options, answer, feedback_bad,
                    feedback_good}], i) => (
                    <div key={i}>
                        <p className="mb-3">
                            {prompt}
                        </p>
                        <div className="choice-list ms-0">
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
                        </div>
                        {isSubmitted && feedback(topic, feedback_bad,
                            feedback_good)}
                    </div>
                ))
            }
            {!nextStep &&
                <button className="btn btn-sm btn-success mt-3"
                    type='submit' onClick={handleSubmit}
                >
                    Submit &raquo;
                </button>
            }
            {isSubmitted && <>
                {isDone &&
                    <a className="btn btn-sm btn-success mt-3" role="button"
                        href={`/course/${coursePk}/`}
                    >
                        I&rsquo;m Done! &raquo;
                    </a>
                }
                {nextStep &&
                    <button className="btn btn-sm btn-success mt-3"
                        type='submit' onClick={handleContinue}
                    >
                        {isDone ?
                            'Try another dataset »' : 'Continue »'}
                    </button>
                }
                {isDone &&
                    <button className="btn btn-sm btn-success mt-3"
                        onClick={handleStartOver}
                    >
                        Start Over
                    </button>
                }
            </>}
        </>);
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
    nextStep: PropTypes.bool.isRequired,
    setNextStep: PropTypes.func.isRequired,
};