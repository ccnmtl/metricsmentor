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

    const handleChoiceCompletion = () => {
        setCompletedChoices([...completedChoices, selectedAltHypothesis]);
        setSelectedAltHypothesis(null);
    };

    const isCompletedfunc = () => {
        if (completedChoices.includes('C') && isSubmitted) {
            setIsCompleted(true);
            setSelectedAltHypothesis(null);
        }
    };

    useEffect(() => {
        isCompletedfunc();
    }, [completedChoices, isSubmitted]);

    useEffect(() => {
        document.getElementById('quiz-1')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

    useEffect(() => {
        if (isSubmitted && plotType === '2d') {
            document.getElementById('completed2d')
                .scrollIntoView({ behavior: 'smooth'});
        } else if (isSubmitted && plotType === '3d') {
            document.getElementById('completed3d')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [isSubmitted]);

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
                    onClick={() => setSelectedAltHypothesis(choiceKey)}
                >
                    Check
                </button>
            )}
            {completedChoices.includes(choiceKey) && (
                <div className="status-complete">&#10003;</div>
            )}
        </li>
    );

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
                                renderChoice('B', '\\Eta_1: {\\beta_1}{\\gt} ')}
                            {completedChoices.includes('B') &&
                                renderChoice('C', '\\Eta_1: {\\beta_1}{\\lt} ')}
                        </ol>
                    </div>
                </div>
            </div>

            {selectedAltHypothesis && (
                <HypothesisTest
                    selectedAltHypothesis={selectedAltHypothesis}
                    hypothesizedSlope={hypothesizedSlope}
                    appRvalue={appRvalue}
                    tvalue={tvalue}
                    onComplete={handleChoiceCompletion}
                    n={parseInt(n)}
                    completedChoices={completedChoices}
                    submissionId={submissionId}
                    plotType={plotType}
                />
            )}
            {completedChoices.includes('C') && plotType === '2d' && (
                <MultipleChoiceQuestion
                    question={'You have completed all the hypothesis tests'
                    + ' in this section. Based on what you have learned'
                    +' from this exercise, which of the following is true?'}
                    options={['The closer the correlation between Y and X1 is '
                + 'to one, the less likely it is to reject the null ' +
                'hypothesis β1 = 0.', 'The closer the correlation ' +
                'between Y and X1 is to negative one, the less likely '
                + 'it is to reject the null hypothesis β1 = 0.', 'The '
                + 'closer the correlation between Y and X1 is to zero, '
                + 'the more likely it is to reject the null hypothesis '
                +'β1 = 0.', 'The closer the correlation between Y and X1'
                + ' is to zero, the less likely it is to reject the null '
                + 'hypothesis β1 = 0.', 'None of the options']}
                    answer={'The closer the correlation between Y and X1 is '
                + 'to zero, the less likely it is to reject the null ' +
                'hypothesis β1 = 0.'}
                    submissionId={submissionId}
                    questionNumber={7}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />
            )}
            {completedChoices.includes('C') && plotType === '3d' && (
                <MultipleChoiceQuestion
                    question={'As we add X2 to the regression,'}
                    options={['The slope of X1(b1) changed.',
                        'The standard error of the slope X1(B1) changed ',
                        'The intercept of the regression line changed.',
                        'All of the above.']}
                    answer={'All of the above.'}
                    submissionId={submissionId}
                    questionNumber={14}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />
            )}
            {(isSubmitted && plotType === '2d') && (
                <>
                    <div className="mt-3 mb fs-5 fw-medium text-center"
                        id="completed2d">
                    Congratulations on completing the 2D simulation!
                    </div>
                    <div className="simulation__step-prompt">
                        <div className="btn btn-primary"
                            onClick={() => handlePlotTypeChange('3d')}>
                            Continue &raquo;
                        </div>
                    </div>
                </>
            )}
            {(isSubmitted && plotType === '3d') && (
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