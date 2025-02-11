import React, { useEffect, useState } from 'react';
import { Katex } from '../../utils/katexComponent';
import { HypothesisTest } from './hypothesisTest';
import { MultipleChoiceQuestion } from './multipleChoiceQuestion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { questionsData } from './questionsData';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, n, setIsCompleted,
    isCompleted, submissionId, handlePlotTypeChange, plotType,
    completedChoices, setCompletedChoices, selectedAltHypothesis,
    setSelectedAltHypothesis, coursePk, answers, lockControls, setLockControls
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTakeawayCorrect, setIsTakeawayCorrect] = useState({
        A: false,
        B: false,
        C: false
    });
    const [isQualifierCorrect, setIsQualifierCorrect] = useState(false);
    const [showQualifier, setShowQualifier] = useState(true);
    const [isHypothesisCompleted, setIsHypothesisCompleted] = useState(false);
    const [isRedo, setIsRedo] = useState(false);
    const [showRedoButton, setShowRedoButton] = useState(false);
    const [showContinueToB, setShowContinueToB] = useState(false);
    const [hideTakeaway3d, setHideTakeaway3d] = useState(false);

    const handleTakeawaySubmit = (choiceKey, correct) => {
        if (correct) {
            setIsTakeawayCorrect({
                ...isTakeawayCorrect,
                [choiceKey]: true,
            });

            if (choiceKey === 'A' && !isQualifierCorrect && plotType !== '3d') {
                // User needs to answer the qualifier question
                setIsSubmitted(false);
                setCompletedChoices([...completedChoices, choiceKey]);
                setShowQualifier(true);
                setShowRedoButton(false);
            } else {
                setCompletedChoices([...completedChoices, choiceKey]);
                setSelectedAltHypothesis(null);
                setIsSubmitted(true);
                setShowRedoButton(false);
            }
            if (plotType === '3d' && choiceKey === 'A') {
                setShowContinueToB(true);
                setShowRedoButton(false);
            }
        } else {
            if (choiceKey === 'A') {

                setIsTakeawayCorrect({
                    ...isTakeawayCorrect,
                    [choiceKey]: false,
                });
                setSelectedAltHypothesis(choiceKey);
                setIsSubmitted(false);
                setShowRedoButton(true);

            } else {
                setIsTakeawayCorrect({
                    ...isTakeawayCorrect,
                    [choiceKey]: false,
                });
                setIsSubmitted(true);
                setCompletedChoices([...completedChoices, choiceKey]);
                setSelectedAltHypothesis(null);
            }

        }
    };

    const handleSelectAltHypothesis = (choiceKey) => {
        setSelectedAltHypothesis(choiceKey);
        setIsHypothesisCompleted(false);
        if (choiceKey === 'B' || choiceKey === 'C') {
            setShowQualifier(false);
        }
        setShowContinueToB(false);
    };

    const handleContinueToB = () => {
        setShowContinueToB(false);
        setSelectedAltHypothesis(null);
        setHideTakeaway3d(true);
    };

    const handleQualifierSubmit = (correct) => {
        if (correct) {
            setIsQualifierCorrect(true);
            setIsSubmitted(true); // Allow progress to 3D part
            setIsCompleted(true);
        } else {
            setIsQualifierCorrect(false);
            setIsSubmitted(false); // Force the user to Choice B

            // Mark Choice A as completed
            if (!completedChoices.includes('A')) {
                setCompletedChoices([...completedChoices, 'A']);
            }
            setShowQualifier(true);
            // Move the user to Choice B
            setSelectedAltHypothesis(null);
        }
    };

    const handleRedo = () => {
        setIsRedo(true);
        setShowRedoButton(false);
        setIsHypothesisCompleted(false);
    };

    const isCompletedfunc = () => {
        if (isTakeawayCorrect.C && isSubmitted) {
            setIsCompleted(true);
            setSelectedAltHypothesis(null);
        }
    };

    const renderChoice = (choiceKey, formula, testside) => (
        <li
            className={`listset-alpha-card
                ${selectedAltHypothesis === choiceKey ?
            ' hypothesis-selected' : ''}
                    ${completedChoices.includes(choiceKey) ?
            ' hypothesis-completed' : ''}`}
        >
            <div className="listset-alpha-card__title">
                <Katex tex={formula + 0} /> <span
                    className="ms-2 small fst-italic text-secondary">
                        ({testside})</span>
            </div>
            {!completedChoices.includes(choiceKey) && (
                <button
                    className="btn btn-sm btn-success"
                    id={`choice-${choiceKey}`}
                    disabled={selectedAltHypothesis !== null}
                    onClick={() => handleSelectAltHypothesis(choiceKey)}
                >
                    Check
                </button>
            )}
            {completedChoices.includes(choiceKey) && (
                <div className="status-complete">&#10003;</div>
            )}
        </li>
    );

    const renderTakeawayQuestion = (questionId) => {
        const questionData = questionsData.find(q => q.id === questionId);

        if (!questionData) return null;

        return (
            <MultipleChoiceQuestion
                question={questionData.question}
                header={questionData.header}
                options={questionData.options}
                answer={questionData.correctOption}
                submissionId={submissionId}
                questionNumber={questionId}
                isSubmitted={isSubmitted}
                setIsSubmitted={
                    (correct) => handleTakeawaySubmit(
                        questionData.choiceKey, correct)}
                questionStyle={{}}
                optionStyle={{}}
                answerStyle={{}}
                correctFeedback={questionData.feedback.correct}
                incorrectFeedbackMap={questionData.feedback.incorrect}
                idkey={`takeaway-${questionId}-${plotType}`}
            />
        );
    };

    const renderQualifierQuestion = (questionId) => {
        const questionData = questionsData.find(q => q.id === questionId);
        if (!questionData) return null;
        const userAnswer = answers.find(
            answer => answer.question_number === questionId);

        return (
            <MultipleChoiceQuestion
                question={questionData.question}
                header={'Qualifier'}
                options={questionData.options}
                answer={questionData.correctOption}
                submissionId={submissionId}
                questionNumber={questionId}
                isSubmitted={isSubmitted}
                setIsSubmitted={handleQualifierSubmit}
                questionStyle={{}}
                optionStyle={{}}
                answerStyle={{}}
                userAnswer={userAnswer}
                correctFeedback={questionData.feedback.correct}
                incorrectFeedbackMap={questionData.feedback.incorrect}
                idkey={`qualifier-${questionId}`}
            />
        );
    };


    useEffect(() => {
        isCompletedfunc();
    }, [isTakeawayCorrect, isSubmitted]);

    useEffect(() => {
        document.getElementById('quiz-1')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

    useEffect(() => {
        if (isRedo) {
            setSelectedAltHypothesis(null);
            setIsRedo(false);
        }
    }, [isRedo]);

    useEffect(() => {
        if (showRedoButton) {
            document.getElementById('redo-button')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [showRedoButton]);

    useEffect(() => {
        if (isTakeawayCorrect.C) {
            document.getElementById('completed2d')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [isTakeawayCorrect.C]);

    useEffect(() => {
        if (isHypothesisCompleted && selectedAltHypothesis === 'B') {
            setCompletedChoices([...completedChoices, 'B']);
            setSelectedAltHypothesis(null);
        }
        if (isHypothesisCompleted && selectedAltHypothesis === 'C'
            && plotType === '3d') {
            setCompletedChoices([...completedChoices, 'C']);
            setSelectedAltHypothesis(null);
        }

    }, [isHypothesisCompleted]);

    return (
        <>
            <div className="simulation__step-container d-flex">
                <div className="simulation__step-num">
                    &bull;
                </div>
                <div className="simulation__step-toggle--down"></div>
                <div className="simulation__step-body">
                    <header className="simulation__step-header">
                        <h2 className="h2-primary" id="quiz-1">
                            Alternative hypothesis
                        </h2>
                    </header>
                    <div className="simulation__step-content">
                        <p>
                            Review the following statement as
                            <Katex tex={'\\Eta_1'}
                                className="katex-inline"/> and perform a
                                hypothesis test against <Katex tex={'\\Eta_0.'}
                                className="katex-inline"/>
                        </p>
                        <ol className="listset-alpha listset-alpha-listnum"
                            key={completedChoices.length}>
                            {/* Choice A default display */}
                            {renderChoice(
                                'A',
                                '\\Eta_1: {\\beta_1}{\\neq} ',
                                'Two-sided test'
                            )}

                            {completedChoices.includes('A') && (
                                renderChoice(
                                    'B',
                                    '\\Eta_1: {\\beta_1}{\\gt} ',
                                    'One-sided test'
                                )
                            )}
                            {completedChoices.includes('B') && (
                                renderChoice(
                                    'C',
                                    '\\Eta_1: {\\beta_1}{\\lt} ',
                                    'One-sided test'
                                )
                            )}
                        </ol>
                    </div>
                </div>
            </div>

            {selectedAltHypothesis && (
                <HypothesisTest
                    selectedAltHypothesis={selectedAltHypothesis}
                    setSelectedAltHypothesis={setSelectedAltHypothesis}
                    appRvalue={appRvalue}
                    tvalue={tvalue}
                    n={parseInt(n)}
                    completedChoices={completedChoices}
                    submissionId={submissionId}
                    plotType={plotType}
                    setIsHypothesisCompleted={setIsHypothesisCompleted}
                    isHypothesisCompleted={isHypothesisCompleted}
                    isRedo={isRedo}
                    setIsRedo={setIsRedo}
                    answers={answers}
                    lockControls={lockControls}
                    setLockControls={setLockControls}
                />
            )}
            {isHypothesisCompleted && selectedAltHypothesis === 'A'
                && plotType === '2d' && (
                renderTakeawayQuestion(7)
            )}
            {/* Takeaway Questions */}
            {(selectedAltHypothesis === 'A' || isTakeawayCorrect.A)
                && !hideTakeaway3d
                && isHypothesisCompleted && plotType === '3d' && (
                renderTakeawayQuestion(13)
            )}

            {showContinueToB && (
                <>
                    <div className="simulation__step-prompt mt-3 text-center
                    mb-3">
                    Awesome! You&apos;ve successfully completed Simulation One.
                    Want to keep practicing? You can move on to Case B and
                    Case C, or head back to the Dashboard whenever you&apos;re
                    ready.
                    </div>
                    <div style={{ display: 'flex',
                        justifyContent: 'center', gap: '10px' }}>
                        <div className="btn btn-secondary"
                            onClick={handleContinueToB}>
                                Continue to Case B &raquo;
                        </div>
                        <Link to={`/course/${coursePk}/simulations/`}
                            className="btn btn-success"
                            data-cy="sim-1-link-quiz1">
                            Back to Dashboard
                        </Link>
                    </div>
                </>
            )}

            {/* Qualifier Question for Choice A */}
            {isTakeawayCorrect.A && plotType !== '3d'
                && showQualifier && (
                renderQualifierQuestion(14)
            )}

            {/* {// WORK IN PROGRESS
                (!isQualifierCorrect && showQualifier)
            && selectedAltHypothesis === 'A' && (
                    <div className="btn btn-secondary"
                        onClick={handleContinueToB}>
                    Continue to Case B &raquo;
                    </div>
                )} */}

            {(selectedAltHypothesis === 'C'|| completedChoices.includes('C'))
            && plotType === '2d'
            && isHypothesisCompleted && (
                renderTakeawayQuestion(15)
            )}
            {/* Redo button */}
            {showRedoButton &&(
                <div className="mt-3 mb-3 text-center" id="redo-button">
                    <button
                        className="btn btn-warning"
                        onClick={handleRedo}>
                        Redo Case {selectedAltHypothesis}
                    </button>
                </div>
            )}

            {(isSubmitted && plotType === '2d' && isTakeawayCorrect.C) && (
                <>
                    <div className="mt-3 mb fs-5 fw-medium text-center"
                        id="completed2d">
                    You have completed the 2D simulation! Move on to the 3D
                    </div>
                    <div className="simulation__step-prompt">
                        <div className="btn btn-sm btn-success"
                            onClick={() => handlePlotTypeChange('3d')}>
                            Continue &raquo;
                        </div>
                    </div>
                </>
            )}

            {(isQualifierCorrect && isTakeawayCorrect.A)
            && selectedAltHypothesis === 'A' && (
                <>
                    <div className="mx-3 mb-3 fw-medium text-center"
                        id="completed2d">
                    Congratulations! You can continue to single-sided
                    alternative hypothesis (Case B), or move on
                    to the multi-variable regression (3D) simulation.
                    </div>
                    <div className="simulation__step-prompt-container mb-5"
                        style={{ display: 'flex',
                            justifyContent: 'center', gap: '10px' }}>
                        <div className="btn btn-secondary"
                            onClick={handleContinueToB}>
                            Continue to Case B &raquo;
                        </div>
                        <div className="btn btn-success"
                            onClick={() => handlePlotTypeChange('3d')}>
                            Continue to 3D &raquo;
                        </div>
                    </div>
                </>
            )}
            {(plotType === '3d' && completedChoices.includes('C')) && (
                <>
                    <div className="mx-3 mb-3 fw-medium text-center"
                        id="completed3d">
                        Congratulations on<br />completing Simulation 1!<br />
                        &#127881; &#127881; &#127881;
                    </div>
                    <div style={{ display: 'flex',
                        justifyContent: 'center', gap: '10px' }}>
                        <Link to={`/course/${coursePk}/simulations`}
                            className="btn btn-success"
                            data-cy="sim-1-link-quiz2">
                            Back to Dashboard
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

SimulationOneQuiz.propTypes = {
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.number.isRequired,
    n: PropTypes.any.isRequired,
    setIsCompleted: PropTypes.func.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    submissionId: PropTypes.number.isRequired,
    handlePlotTypeChange: PropTypes.func,
    plotType: PropTypes.string.isRequired,
    completedChoices: PropTypes.array,
    setCompletedChoices: PropTypes.func,
    selectedAltHypothesis: PropTypes.string,
    setSelectedAltHypothesis: PropTypes.func,
    coursePk: PropTypes.number.isRequired,
    answers: PropTypes.array,
    lockControls: PropTypes.bool,
    setLockControls: PropTypes.func,
};