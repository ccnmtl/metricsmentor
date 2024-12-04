import React, { useEffect, useState } from 'react';
import { Katex } from '../../utils/katexComponent';
import { HypothesisTest } from './hypothesisTest';
import { MultipleChoiceQuestion } from './multipleChoiceQuestion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, hypothesizedSlope, n, setIsCompleted,
    isCompleted, submissionId, handlePlotTypeChange, plotType,
    completedChoices, setCompletedChoices, selectedAltHypothesis,
    setSelectedAltHypothesis, coursePk, answers
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
            } else {
                setCompletedChoices([...completedChoices, choiceKey]);
                setSelectedAltHypothesis(null);
                setIsSubmitted(true);
            }
            if (plotType === '3d' && choiceKey === 'A') {
                setShowContinueToB(true);
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
                    [choiceKey]: true,
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

    const renderChoice = (choiceKey, formula) => (
        <li
            className={`listset-alpha-card
                ${selectedAltHypothesis === choiceKey ?
            ' hypothesis-selected' : ''}
                    ${completedChoices.includes(choiceKey) ?
            ' hypothesis-completed' : ''}`}
        >
            <div className="listset-alpha-card__title">
                <Katex tex={formula + hypothesizedSlope} />
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

    const renderTakeawayQuestion = (
        choiceKey, question, options, answer, correctFeedback,
        incorrectFeedback, questionNumber) => {
        const userAnswer = answers.find(
            answer => answer.question_number === questionNumber);
        return (
            <MultipleChoiceQuestion
                question={question}
                header={'Takeaway'}
                options={options}
                answer={answer}
                submissionId={submissionId}
                questionNumber={questionNumber}
                isSubmitted={isSubmitted}
                setIsSubmitted={
                    (correct) => handleTakeawaySubmit(choiceKey, correct)}
                questionStyle={{}}
                optionStyle={{}}
                answerStyle={{}}
                userAnswer={userAnswer}
                correctFeedback={correctFeedback}
                incorrectFeedback={incorrectFeedback}
                idkey={`${choiceKey}-${plotType}`}
            />
        );
    };

    const renderQualifierQuestion = (
        question, options, answer, correctFeedback,
        incorrectFeedback, questionNumber) => {
        const userAnswer = answers.find(
            answer => answer.question_number === questionNumber);
        return (
            <MultipleChoiceQuestion
                question={question}
                header={'Qualifier'}
                options={options}
                answer={answer}
                submissionId={submissionId}
                questionNumber={questionNumber}
                isSubmitted={isSubmitted}
                setIsSubmitted={handleQualifierSubmit}
                questionStyle={{}}
                optionStyle={{}}
                answerStyle={{}}
                userAnswer={userAnswer}
                correctFeedback={correctFeedback}
                incorrectFeedback={incorrectFeedback}
                idkey={'qualifier'}
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
                            alternative hypotheses <Katex tex={'\\Eta_1.'}
                                className="katex-inline"/> Perform a
                                hypothesis test against the null hypothesis.
                        </p>
                        <ol className="listset-alpha listset-alpha-listnum">
                            {/* Choice A default display */}
                            {renderChoice('A', '\\Eta_1: {\\beta_1}{\\neq} ')}

                            {completedChoices.includes('A') &&
                            isTakeawayCorrect.A && (
                                renderChoice('B', '\\Eta_1: {\\beta_1}{\\gt} ')
                            )}
                            {completedChoices.includes('B') && (
                                renderChoice('C', '\\Eta_1: {\\beta_1}{\\lt} ')
                            )}
                        </ol>
                    </div>
                </div>
            </div>

            {selectedAltHypothesis && (
                <HypothesisTest
                    selectedAltHypothesis={selectedAltHypothesis}
                    setSelectedAltHypothesis={setSelectedAltHypothesis}
                    hypothesizedSlope={hypothesizedSlope}
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
                />
            )}
            {isHypothesisCompleted && selectedAltHypothesis === 'A'
                && plotType === '2d' && (
                renderTakeawayQuestion('A',
                    <span>
                        Based on what you have learned from this
                        exercise, which of the following is true?
                    </span>,
                    [<span key="option1">
                        The closer the correlation between y and x<sub>1</sub>
                        &nbsp;is to one, the <strong>less likely </strong>
                        it is to reject the null hypothesis β<sub>1</sub> = 0.
                    </span>,
                    <span key="option2">
                        The closer the correlation between y and x<sub>1</sub>
                        &nbsp;is to negative one, the <strong>less likely
                        </strong>&nbsp;
                        it is to reject the null hypothesis β<sub>1</sub> = 0.
                    </span>,
                    <span key="option3">
                        The closer the correlation between y and x<sub>1</sub>
                        &nbsp;is to zero, the <strong>more likely </strong>
                        it is to reject the null hypothesis β<sub>1</sub> = 0.
                    </span>,
                    <span key="option4">
                        The closer the correlation between y and x<sub>1</sub>
                        &nbsp;is to zero, the <strong>less likely </strong>
                        it is to reject the null hypothesis β<sub>1</sub> = 0.
                    </span>,
                    <span key="option5">
                        None of these are correct
                    </span>],

                    <span>
                        The closer the correlation between y and x<sub>1</sub>
                        &nbsp;is to zero, the less likely it is to reject the
                        null hypothesis β<sub>1</sub> = 0.
                    </span>,
                    <span>
                        Excellent! You have correctly identified that a
                        higher correlation between the dependent
                        variable y and the independent variable x<sub>1</sub>
                        would mean a non-zero slope.
                    </span>,
                    <span>
                        Incorrect. Remember a higher correlation between the
                        dependent variable y and the independent variable
                        x<sub>1</sub> would mean a non-zero slope.
                    </span>,
                    7
                )
            )}
            {/* Takeaway Questions */}
            {(selectedAltHypothesis === 'A' || isTakeawayCorrect.A)
                && !hideTakeaway3d
                && isHypothesisCompleted && plotType === '3d' && (
                renderTakeawayQuestion('A',
                    <span>
                            As we add x<sub>2</sub> to the regression,
                    </span>,
                    [<span key="option1">
                            The slope of x<sub>1</sub>, B&#770;<sub>1</sub>,
                            changed.
                    </span>,
                    <span key="option2">
                            The standard error of the slope of x<sub>1</sub>,
                            SE(B&#770;<sub>1</sub>), changed.
                    </span>,
                    <span key="option3">
                            The intercept of the regression line,
                            B&#770;<sub>0</sub>, changed.
                    </span>,
                    <span key="option4">
                            All Choices Are Correct
                    </span>,
                    ],
                    <span>
                            All Choices Are Correct
                    </span>,
                    <span>
                    Excellent! You have correctly identified that when we
                    add control variables to the regression, the slope of
                    the variable of interest changes, hence the regression
                    line and the intercept changes as well.
                    </span>,
                    <span>
                    Incorrect. Remember that when we add control
                    variables to the regression, the slope of the variable
                    of interest changes, hence the regression line and the
                    intercept changes as well.
                    </span>,
                    13)

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
                renderQualifierQuestion(
                    <span>
                        If we change the null hypothesis to be
                        <strong> at least </strong>
                        a value like zero, then the alternative hypothesis
                        should change to which one of the following? And
                        how will that affect the critical value of
                        your test given the same significance level
                        as in two sided test
                    </span>,
                    [<span key="option1">
                        The alternative hypothesis must be
                        <strong> greater than </strong>
                        the same value,
                        and the critical value would be larger in
                        absolute value.
                    </span>,
                    <span key="option2">
                        The alternative hypothesis must be
                        <strong> greater than </strong>
                        the same value,
                        and the critical value would be smaller in
                        absolute value.
                    </span>,
                    <span key="option3">
                        The alternative hypothesis must be
                        <strong> less than </strong>
                        the same value, and
                        the critical value would be larger in
                        absolute value.
                    </span>,
                    <span key="option4">
                        The alternative hypothesis must be
                        <strong> less than </strong>
                        the same value, and
                        the critical value would be smaller in
                        absolute value.
                    </span>,
                    ],
                    <span key="option4">
                        The alternative hypothesis must be
                        less than the same value, and
                        the critical value would be smaller
                        in absolute value.
                    </span>,
                    <span>
                        Excellent! You have correctly identified
                        that the null and the alternative
                        hypotheses must be exhaustive and mutually
                        exclusive and that we do not need to divide
                        the significance level by two when it is a
                        single sided hypothesis.
                    </span>,
                    <span>
                        Remember that the null and the
                        alternative hypotheses must be exhaustive
                        and mutually exclusive. Also, remember in a
                        two-sided hypothesis, (the alternative
                        hypothesis has &quot;&#8800;&quot; sign),
                        we divide the significance level by two,
                        however this is a single sided hypothesis
                        (the alternative hypothesis has
                        &quot;&#60;&quot; sign in this case) hence
                        no need to divide the significance level by
                        two.
                        <div className="fw-bold">
                            Let&apos;s scroll up and continue with choice B!
                        </div>
                    </span>,
                    14)
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
                renderTakeawayQuestion('C',
                    <span>
                        If we change the null hypothesis to be
                        <strong> at most</strong> a
                        value like zero, then the alternative hypothesis should
                        change to which one of the following? And how will that
                        affect the critical value of your test given the same
                        significance level as in two sided test
                    </span>,
                    [
                        <span key="option1">
                            The alternative hypothesis must be
                            <strong> greater than</strong> the same value, and
                            the critical value would be larger.
                        </span>,
                        <span key="option2">
                            The alternative hypothesis must be
                            <strong> greater than</strong> the same value, and
                            the critical value would be smaller.
                        </span>,
                        <span key="option3">
                            The alternative hypothesis must be
                            <strong> less than</strong> the same value, and
                            the critical value would be larger.
                        </span>,
                        <span key="option4">
                            The alternative hypothesis must be
                            <strong> less than</strong> the same value, and
                            the critical value would be smaller.
                        </span>,
                    ],
                    <span>
                        The alternative hypothesis must be
                        <strong> greater
                        than</strong> the same value, and the critical value
                        would be smaller.
                    </span>,
                    <span>
                        Excellent! You have correctly identified the correct
                        answer.
                    </span>,
                    <span>
                        That&apos;s not the right answer. The alternative
                        hypothesis must be
                        <strong> greater than</strong> the same
                        value, and the critical value would be smaller.
                    </span>,
                    15)
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
                    <div className="mt-3 mb fs-5 fw-medium text-center"
                        id="completed2d">
                    Congratulations! You can do case B if you want or move on
                    to the 3D simulation.
                    </div>
                    <div className="simulation__step-prompt-container"
                        style={{ display: 'flex',
                            justifyContent: 'center', gap: '10px' }}>
                        <div className="btn btn-secondary"
                            onClick={handleContinueToB}>
                            Continue to B &raquo;
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
                    <div className="mt-3 mb-3 fs-5 fw-medium text-center"
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
    hypothesizedSlope: PropTypes.any.isRequired,
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
    answers: PropTypes.array
};