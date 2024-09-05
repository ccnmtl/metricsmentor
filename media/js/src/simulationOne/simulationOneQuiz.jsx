import React, { useEffect, useState } from 'react';
import { Katex } from '../katexComponent';
import { HypothesisTest } from './hypothesisTest';
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, hypothesizedSlope, n, setIsCompleted,
    isCompleted, submissionId, handlePlotTypeChange, plotType,
    completedChoices, setCompletedChoices, selectedAltHypothesis,
    setSelectedAltHypothesis
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

    const handleTakeawaySubmit = (choiceKey, correct) => {
        if (correct) {
            setIsTakeawayCorrect({
                ...isTakeawayCorrect,
                [choiceKey]: true,
            });
            if (choiceKey === 'A' && !isQualifierCorrect && plotType !== '3d') {
                // User needs to answer the qualifier question
                setIsSubmitted(false);
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
        setSelectedAltHypothesis('B');
        setShowContinueToB(false);
        setIsHypothesisCompleted(false);
    };

    const handleQualifierSubmit = (correct) => {
        if (correct) {
            setIsQualifierCorrect(true);
            setIsSubmitted(true); // Allow progress to 3D part
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

    const isCompletedfunc = () => {
        if (isTakeawayCorrect.C && isSubmitted) {
            setIsCompleted(true);
            // setSelectedAltHypothesis(null);
        }
    };

    const handleRedo = () => {
        setIsRedo(true);
        setShowRedoButton(false);
        setIsHypothesisCompleted(false);
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
                    className="btn btn-sm btn-primary"
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
        incorrectFeedback, questionNumber) => (
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
            correctFeedback={correctFeedback}
            incorrectFeedback={incorrectFeedback}
            idkey={`${choiceKey}-${plotType}`}
        />
    );

    const renderQualifierQuestion = (
        question, options, answer, correctFeedback,
        incorrectFeedback, questionNumber) => (
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
            correctFeedback={correctFeedback}
            incorrectFeedback={incorrectFeedback}
            idkey={'qualifier'}
        />
    );

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
                            Consider the following three statements as
                            alternative hypotheses. Complete each
                            hypothesis test in order.
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
                    isRedo={isRedo}
                    setIsRedo={setIsRedo}
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
                        The closer the correlation between Y and X1 is
                        to one, the <b>less likely</b> it is to reject
                        the null hypothesis β1 = 0.
                    </span>,
                    <span key="option2">
                        The closer the correlation between Y and X1 is
                        to negative one, the <b>less likely</b> it is to
                        reject the null hypothesis β1 = 0.
                    </span>,
                    <span key="option3">
                        The closer the correlation between Y and X1 is
                        to zero, the <b>more likely</b> it is to reject
                        the null hypothesis β1 = 0.
                    </span>,
                    <span key="option4">
                        The closer the correlation between Y and X1 is
                        to zero, the <b>less likely</b> it is to reject
                        the null hypothesis β1 = 0.
                    </span>,
                    <span key="option5">
                        None of these are correct
                    </span>],

                    <span>
                        The closer the correlation between Y and X1 is
                        to zero, the less likely it is to reject the
                        null hypothesis β1 = 0.
                    </span>,
                    <span>
                        Excellent! You have correctly identified that a
                        higher correlation between the dependent
                        variable y and the independent variable x1
                        would mean a non-zero slope.
                    </span>,
                    <span>
                        Incorrect. Remember a higher
                        correlation between the dependent variable y
                        and the independent variable x1 would mean a
                        non-zero slope.
                    </span>,
                    7)
            )}
            {/* Takeaway Questions */}
            {(selectedAltHypothesis === 'A' || isTakeawayCorrect.A)
                && !completedChoices.includes('B')
                && isHypothesisCompleted && plotType === '3d' && (
                renderTakeawayQuestion('A',
                    <span>
                            As we add x2 to the regression,
                    </span>,
                    [<span key="option1">
                            The slope of x1, B1, changed.
                    </span>,
                    <span key="option2">
                            The standard error of the slope of x1, SE(B11),
                            changed.
                    </span>,
                    <span key="option3">
                            The intercept of the regression line, B0, changed.
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
                <div className="simulation__step-prompt mt-3 text-center">
                    <div className="btn btn-primary"
                        onClick={handleContinueToB}>
            Continue to Case B &raquo;
                    </div>
                </div>
            )}

            {/* Qualifier Question for Choice A */}
            {isTakeawayCorrect.A && !isQualifierCorrect && plotType !== '3d'
                && showQualifier && (
                renderQualifierQuestion(
                    <span>
                        If we change the null hypothesis to be
                        &quot;at least&quot; a value like zero,
                        then the alternative hypothesis should
                        change to which one of the following? And
                        how will that affect the critical value of
                        your test given the same significance level
                        as in two sided test
                    </span>,
                    [<span key="option1">
                        The alternative hypothesis must be
                        &quot;greater than&quot; the same value,
                        and the critical value would be larger in
                        absolute value.
                    </span>,
                    <span key="option2">
                        The alternative hypothesis must be
                        &quot;greater than&quot; the same value,
                        and the critical value would be smaller in
                        absolute value.
                    </span>,
                    <span key="option3">
                        The alternative hypothesis must be
                        &quot;less than&quot; the same value, and
                        the critical value would be larger in
                        absolute value.
                    </span>,
                    <span key="option4">
                        The alternative hypothesis must be
                        &quot;less than&quot; the same value, and
                        the critical value would be smaller in
                        absolute value.
                    </span>,
                    ],
                    <span key="option4">
                        The alternative hypothesis must be
                        &quot;less than&quot; the same value, and
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
                        two. Let&apos;s continue to choice B above!
                    </span>,
                    14)
            )}

            {(selectedAltHypothesis === 'C'|| completedChoices.includes('C'))
            && plotType === '2d'
            && isHypothesisCompleted && (
                renderTakeawayQuestion('C',
                    <span>
                        If we change the null hypothesis to be “at most” a
                        value like zero, then the alternative hypothesis should
                        change to which one of the following? And how will that
                        affect the critical value of your test given the same
                        significance level as in two sided test
                    </span>,
                    [
                        <span key="option1">
                            The alternative hypothesis must be &quot;greater
                            than&quot; the same value, and the critical value
                            would be larger.
                        </span>,
                        <span key="option2">
                            The alternative hypothesis must be &quot;greater
                            than&quot; the same value, and the critical value
                            would be smaller.
                        </span>,
                        <span key="option3">
                            The alternative hypothesis must be &quot;less
                            than&quot; the same value, and the critical value
                            would be larger.
                        </span>,
                        <span key="option4">
                            The alternative hypothesis must be &quot;less
                            than&quot; the same value, and the critical value
                            would be smaller.
                        </span>,
                    ],
                    <span>
                        The alternative hypothesis must be &quot;greater
                        than&quot; the same value, and the critical value
                        would be smaller.
                    </span>,
                    <span>
                        Excellent!
                    </span>,
                    <span>
                        Incorrect.
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
                        <div className="btn btn-primary"
                            onClick={() => handlePlotTypeChange('3d')}>
                            Continue &raquo;
                        </div>
                    </div>
                </>
            )}

            {(isQualifierCorrect && isTakeawayCorrect.A) && (
                <>
                    <div className="mt-3 mb fs-5 fw-medium text-center"
                        id="completed2d">
                    Congratulations! You can do case B if you want or move on
                    to the 3D simulation.
                    </div>
                    <div className="simulation__step-prompt">
                        <div className="btn btn-primary"
                            onClick={() => setSelectedAltHypothesis('B')}>
                            Continue to B &raquo;
                        </div>
                    </div>
                    <div className="simulation__step-prompt">
                        <div className="btn btn-primary"
                            onClick={() => handlePlotTypeChange('3d')}>
                            Continue to 3D &raquo;
                        </div>
                    </div>
                </>
            )}
            {(plotType === '3d' && completedChoices.includes('C')) && (
                <>
                    <div className="mt-3 mb-5 fs-5 fw-medium text-center"
                        id="completed3d">
                        Congratulations on<br />completing Simulation 1!<br />
                        &#127881; &#127881; &#127881;
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
    setSelectedAltHypothesis: PropTypes.func
};