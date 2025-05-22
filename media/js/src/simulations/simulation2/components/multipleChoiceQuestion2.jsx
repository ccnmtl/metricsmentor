import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from '../../../utils/utils';


export const MultipleChoiceQuestion2 = ({takeaways, isSubmitted, setIsSubmitted,
    handleContinue, handleStartOver, submissionId, isComplete, checkComplete,
    setIsComplete, createSubmission, coursePk, nextStep, setNextStep, results,
    setResults, showGeneral, setShowGeneral}) => {

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
        const response = $(`input[name="${topic}-choices"]:checked`).val();
        setShowFeedback({...showFeedback, [topic]: response[1]});
        setResults({...results, [topic]: response === takeaways[topic].answer});
    };

    useEffect(() => {
        const result = Object.keys(takeaways);
        setIsSubmitted(results[result[0]]);
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
        if(isComplete['general'] != true)  {
            setShowGeneral(checkComplete() > 1);
        }
        const result = Object.keys(takeaways);
        setNextStep(result.length > 0 &&
            result.reduce((acc, val) => acc === results[val], true));
    }, [isComplete]);

    useEffect(() => {
        const result = Object.keys(takeaways);
        setNextStep(result.length > 0 &&
            result.reduce((acc, val) => acc === results[val], true));
    }, [showGeneral]);

    useEffect(() => {
        setIsDone(nextStep && isComplete['general'] === true);
    }, [nextStep]);

    return <>
        {Object.entries(takeaways)
            .map(([topic, {prompt, choices, feedback}], i) => {
                if (topic !== 'general' || isSubmitted) {
                    return <div key={i} id={`${topic}-question`}>
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
                        {topic in results &&
                            <div className={`form-check text-${results[topic] ?
                                'success' : 'danger'} mt-3 mb-3`}
                            role="alert"
                            >
                                {feedback[showFeedback[topic]]}
                            </div>}
                        {!nextStep &&
                            <button className="btn btn-sm btn-success mt-3"
                                type='submit' data-cy={`submit-${topic}`}
                                onClick={() => handleSubmit(topic)}
                            >
                                Submit &raquo;
                            </button>
                        }
                    </div>;
                }
            })
        }
        {nextStep && <>
            <button className="btn btn-sm btn-success me-3" data-cy="continue"
                type='submit' onClick={handleContinue}
            >
                {isDone ?
                    'Try another dataset »' : 'Continue »'}
            </button>
            {isDone &&
                <a className="btn btn-sm btn-success me-3" role="button"
                    href={`/course/${coursePk}/`} data-cy="finish"
                >
                    I&rsquo;m Done! &raquo;
                </a>
            }
            {isDone &&
                <button className="btn btn-sm btn-warning" data-cy="start-over"
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
    setResults: PropTypes.func.isRequired,
    showGeneral: PropTypes.bool.isRequired,
    setShowGeneral: PropTypes.func.isRequired
};