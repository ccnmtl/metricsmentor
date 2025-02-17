import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from '../../../utils/utils';


export const MultipleChoiceQuestion2 = ({isSubmitted, setIsSubmitted, takeaways,
    handleContinue, checkComplete, handleStartOver, submissionId, isComplete,
    setIsComplete, createSubmission, coursePk, nextStep, setNextStep, results,
    setResults }) => {

    const [selected, setSelected] = useState({});
    
    const [showFeedback, setShowFeedback] = useState({});
    const [isDone, setIsDone] = useState(false);

    const handleOptionSelect = (topic, choice) => {
        setSelected({...selected, [topic]: choice});
    };

    const asyncSave = async function() {
        if (Object.values(results).length > 0) {
            for (let topic in results) {
                await saveAnswer(
                    submissionId, takeaways[topic].q_id, 'multiple-choice',
                    selected[topic], results[topic], {});
            }
        }
    };

    const handleSubmit = async(topic) => {
        setIsSubmitted(true);
        const response = $(`input[name="${topic}-choices"]:checked`).val()
        setShowFeedback({...showFeedback, [topic]: response[1]})
        setResults({...results, [topic]: response === takeaways[topic].answer});
    };

    useEffect(() => {
        if (!submissionId) {
            createSubmission(() => asyncSave()).then(() => {
                setIsComplete({...isComplete, ...results});
            });
        } else {
            asyncSave().then(() => {
                setIsComplete({...isComplete, ...results});
            });
        }
    }, [results]);

    useEffect(() => {
        const result = Object.keys(takeaways);
        setNextStep(result.length > 0 &&
            result.reduce((acc, val) => acc === results[val], true));
    }, [results]);

    useEffect(() => {
        setIsDone(isSubmitted && nextStep &&
            isComplete['general'] === true);
    }, [isComplete])

    return <>
        {Object.entries(takeaways)
            .map(([topic, {prompt, choices, feedback}], i) => {
                if (true) {
                    return <div key={i}>
                        <p className={`mb-3 ${i > 0 ? 'mt-5' : ''}`}>
                            {prompt}
                        </p>
                        <div className="choice-list ms-0">
                            {choices.map((choice, index) => (
                                <div key={index} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type='radio'
                                        id={`${topic}-choice-${index}`}
                                        name={`${topic}-choices`}
                                        value={choice}
                                        checked={selected[topic] === choice}
                                        onChange={() => handleOptionSelect(
                                            topic, choice)}
                                    />
                                    <label className="form-check-label"
                                        htmlFor={`${topic}-choice-${index}`}
                                    >
                                        {choice}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {isSubmitted &&
                            <div className={`form-check text-${results[topic] ?
                                    'success' : 'danger'} mt-3 mb-3`}
                                role="alert"
                            >
                                {feedback[showFeedback[topic]]}
                            </div>}
                        {!nextStep &&
                            <button className="btn btn-sm btn-success mt-3"
                                type='submit' onClick={() => handleSubmit(topic)}
                            >
                                Submit &raquo;
                            </button>
                        }
                    </div>
                }
            })
        }
        {isSubmitted && nextStep && <>
            <button className="btn btn-sm btn-success me-3"
                type='submit' onClick={handleContinue}
            >
                {isDone ?
                    'Try another dataset »' : 'Continue »'}
            </button>
            {checkComplete() > 2 &&
                <a className="btn btn-sm btn-success me-3" role="button"
                    href={`/course/${coursePk}/`}
                >
                    I&rsquo;m Done! &raquo;
                </a>
            }
            {checkComplete() > 2 &&
                <button className="btn btn-sm btn-warning"
                    onClick={handleStartOver}
                >
                    Start Over
                </button>
            }
        </>}
    </>;
};

MultipleChoiceQuestion2.propTypes = {
    choice: PropTypes.string.isRequired,
    takeaways: PropTypes.object.isRequired,
    setIsSubmitted: PropTypes.func.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    handleContinue: PropTypes.func.isRequired,
    checkComplete: PropTypes.func.isRequired,
    isComplete: PropTypes.object.isRequired,
    setIsComplete: PropTypes.func.isRequired,
    handleStartOver: PropTypes.func.isRequired,
    createSubmission: PropTypes.func.isRequired,
    submissionId: PropTypes.number,
    coursePk: PropTypes.number.isRequired,
    nextStep: PropTypes.bool.isRequired,
    setNextStep: PropTypes.func.isRequired,
    results: PropTypes.object.isRequired,
    setResults: PropTypes.func.isRequired
};