import React, { useState, useEffect } from 'react';
import { TakeawayQuestion } from '../../TakeawayQuestion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const SimulationTwoTakeaway = ({
    activeQuestions,
    isComplete,
    checkComplete,
    handleContinue,
    handleStartOver,
    submissionId,
    coursePk,
    setIsComplete,
    createSubmission,
    nextStep,
    setNextStep
}) => {
    const [processedQuestions, setProcessedQuestions] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        // Transform activeQuestions array into array of question
        // objects expected by TakeawayQuestion
        const questions = activeQuestions.map(
            (data, idx) => {
                const choices = data.choices.map((choiceStr, cIdx) => {
                    // Parse choice string assuming format "(a) Text"
                    const match = choiceStr.match(/^\(([a-z])\)\s*(.*)/);
                    const index = match
                        ? match[1]
                        : String.fromCharCode(97 + cIdx);
                    const text = match ? match[2] : choiceStr;
                    const feedbackKey = index;

                    return {
                        id: `${data.topic}-choice-${index}`,
                        index: index,
                        text: text,
                        isCorrect: choiceStr === data.answer,
                        feedback: data.feedback[feedbackKey]
                    };
                });

                return {
                    questionId: data.q_id,
                    questionText: data.prompt,
                    choices: choices,
                    topic: data.topic
                };
            });
        setProcessedQuestions(questions);
    }, [activeQuestions]);

    useEffect(() => {
        if (activeQuestions.length === 0) {
            setNextStep(false);
            return;
        }
        const allCompleted = activeQuestions.every(q => isComplete[q.topic]);
        setNextStep(allCompleted);
    }, [isComplete, activeQuestions, setNextStep]);

    useEffect(() => {
        if (!submissionId) {
            createSubmission(() => { });
        }
    }, [submissionId]);

    const handleCorrect = (topic) => {
        // Mark topic as complete locally and potentially trigger next step
        const newComplete = { ...isComplete, [topic]: true };
        setIsComplete(newComplete);

        // If we just finished a question, make the next one visible or finish
        setVisibleIndex(prev => prev + 1);
    };

    // Determine completion state
    const allDone = nextStep; // Passed from parent logic based on completion

    return (
        <div className="simulation-takeaway">
            {processedQuestions.map((q, idx) => {
                // Only show if it's the current question
                // or previously completed
                const isVisible = idx <= visibleIndex || isComplete[q.topic];
                if (!isVisible) return null;

                return (
                    <div key={q.questionId} className="mb-5">
                        <TakeawayQuestion
                            questionId={q.questionId}
                            questionText={q.questionText}
                            choices={q.choices}
                            submissionId={submissionId || 0}
                            coursePk={coursePk}
                            onCorrect={() => handleCorrect(q.topic)}
                        />
                    </div>
                );
            })}

            {nextStep && (
                <div className="mt-4">
                    <button
                        className="btn btn-sm btn-success me-3"
                        data-cy="continue"
                        type='button'
                        onClick={handleContinue}
                    >
                        {
                            allDone && checkComplete() > 1
                                ? // Logic slightly different here,
                                // need to check if user wants to do another
                                'Try another dataset »'
                                : 'Continue »'
                        }
                    </button>

                    {checkComplete() > 1 && (
                        <button className="btn btn-sm btn-warning"
                            data-cy="start-over"
                            onClick={handleStartOver}
                        >
                            Start Over
                        </button>
                    )}

                    {checkComplete() > 1 && (
                        <Link className="btn btn-sm btn-success ms-3"
                            to={`/course/${coursePk}/simulations/`}
                            data-cy="finish"
                        >
                            Back to Dashboard
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

SimulationTwoTakeaway.propTypes = {
    activeQuestions: PropTypes.array.isRequired,
    isComplete: PropTypes.object.isRequired,
    checkComplete: PropTypes.func.isRequired,
    handleContinue: PropTypes.func.isRequired,
    handleStartOver: PropTypes.func.isRequired,
    submissionId: PropTypes.number,
    coursePk: PropTypes.number.isRequired,
    setIsComplete: PropTypes.func.isRequired,
    createSubmission: PropTypes.func.isRequired,
    nextStep: PropTypes.bool.isRequired,
    setNextStep: PropTypes.func.isRequired
};
