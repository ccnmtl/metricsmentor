import React, { useEffect, useState } from 'react';
import { Katex } from '../katexComponent';
import { HypothesisTest } from './hypothesisTest';
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({
    appRvalue, appRvalue3d, tvalue, hypothesizedSlope, n, setIs2DCompleted,
    is2DCompleted, submissionId, handlePlotTypeChange, plotType,
    tvalue3d, setStartQuiz, setIs3DCompleted
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption3d, setSelectedOption3d] = useState(null);
    const [completedChoices, setCompletedChoices] = useState([]);
    const [completedChoices3d, setCompletedChoices3d] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const allChoicesCompleted = ['A', 'B', 'C'].every(
        choice => completedChoices.includes(choice));

    const allChoices3dCompleted = ['A', 'B', 'C'].every(
        choice => completedChoices3d.includes(choice));

    const handleChoiceCompletion = () => {
        setCompletedChoices([...completedChoices, selectedOption]);
        setSelectedOption(null);
    };

    const handleChoiceCompletion3d = () => {
        setCompletedChoices3d([...completedChoices3d, selectedOption3d]);
        setSelectedOption3d(null);
    };

    const is2dCompleted = () => {
        if (allChoicesCompleted && isSubmitted) {
            setIs2DCompleted(true);
            // setStartQuiz(false);
            setSelectedOption(null);
        }
    };

    const is3dCompleted = () => {
        if (allChoices3dCompleted && isSubmitted) {
            setIs2DCompleted(true);
            setStartQuiz(false);
        }
    };

    useEffect(() => {
        is2dCompleted();
    },[completedChoices, allChoicesCompleted, isSubmitted]);

    useEffect(() => {
        is3dCompleted();
    },[completedChoices3d, allChoices3dCompleted, isSubmitted]);

    useEffect(() => {
        document.getElementById('quiz-1')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

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
                            Alternative hypothesis</h2>
                    </header>
                    <div className="simulation__step-content">
                        <p>
                            Consider the following three statements as
                            alternative hypotheses. Choose one to conduct
                            a test of hypothesis.
                        </p>
                        {plotType === '2d' && (
                            <ol className="listset-alpha listset-alpha-listnum">
                                {[
                                    ['A', '\\Eta_1: {\\beta_1}{\\neq} '],
                                    ['B', '\\Eta_1: {\\beta_1}{\\gt} '],
                                    ['C', '\\Eta_1: {\\beta_1}{\\lt} ']
                                ].map((choice, key) => (
                                    <li key={key}
                                        className={'listset-alpha-card' +
                                            (selectedOption === choice[0] ?
                                                ' hypothesis-selected' : '') +
                                            // eslint-disable-next-line max-len
                                            (completedChoices.includes(choice[0]) ?
                                                ' hypothesis-completed' : '')
                                        }
                                    >
                                        <div className=
                                            "listset-alpha-card__title">
                                            <Katex tex={
                                                choice[1] + hypothesizedSlope
                                            } />
                                        </div>
                                        <button className="btn btn-sm
                                            btn-primary"
                                        disabled={selectedOption !== null ||
                                            completedChoices.includes(
                                                choice[0])}
                                        onClick={() =>
                                            setSelectedOption(choice[0])}
                                        >
                                            Prove
                                        </button>
                                        <div className="status-complete">
                                                                &#10003;
                                        </div>

                                    </li>
                                ))}
                            </ol>
                        )}
                        {plotType === '3d' && (
                            <ol className="listset-alpha listset-alpha-listnum">
                                {[
                                    ['A', '\\Eta_1: {\\beta_1}{\\neq} '],
                                    ['B', '\\Eta_1: {\\beta_1}{\\gt} '],
                                    ['C', '\\Eta_1: {\\beta_1}{\\lt} ']
                                ].map((choice, key) => (
                                    <li key={key}
                                        className={'listset-alpha-card' +
                                            (selectedOption3d === choice[0] ?
                                                ' hypothesis-selected' : '') +
                                            // eslint-disable-next-line max-len
                                            (completedChoices3d.includes(choice[0]) ?
                                                ' hypothesis-completed' : '')
                                        }
                                    >
                                        <div className=
                                            "listset-alpha-card__title">
                                            <Katex tex={
                                                choice[1] + hypothesizedSlope
                                            } />
                                        </div>
                                        <button className="btn btn-sm
                                            btn-primary"
                                        disabled={selectedOption3d !== null ||
                                            completedChoices3d.includes(
                                                choice[0])}
                                        onClick={() =>
                                            setSelectedOption3d(choice[0])}
                                        >
                                            Prove
                                        </button>
                                        <div className="status-complete">
                                                                &#10003;
                                        </div>

                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                </div>
            </div>

            {(selectedOption || selectedOption3d) && (
                <HypothesisTest
                    selectedOption={selectedOption}
                    selectedOption3d={selectedOption3d}
                    hypothesizedSlope={hypothesizedSlope}
                    appRvalue={appRvalue}
                    appRvalue3d={appRvalue3d}
                    tvalue={tvalue}
                    tvalue3d={tvalue3d}
                    onComplete={handleChoiceCompletion}
                    on3dComplete={handleChoiceCompletion3d}
                    n={parseInt(n)}
                    completedChoices={completedChoices}
                    completedChoices3d={completedChoices3d}
                    submissionId={submissionId}
                    plotType={plotType}
                />
            )}
            {(allChoicesCompleted && plotType === '2d') && (
                <MultipleChoiceQuestion
                    question={'which of the following is TRUE?'}
                    options={['The closer the correlation between Y and X1 is '
                    + 'to one, the more likely it is to reject the null ' +
                    'hypothesis β1 = 0.', 'The closer the correlation ' +
                    'between Y and X1 is to negative one, the more likely '
                    + 'it is to reject the null hypothesis β1 = 0.', 'The '
                    + 'closer the correlation between Y and X1 is to zero, '
                    + 'the more likely it is to reject the null hypothesis '
                    +'β1 = 0.', 'The closer the correlation between Y and X1'
                    + ' is to zero, the less likely it is to reject the null '
                    + 'hypothesis β1 = 0.', 'None of the above']}
                    answer={'The closer the correlation between Y and X1 is '
                    + 'to zero, the less likely it is to reject the null ' +
                    'hypothesis β1 = 0.'}
                    submissionId={submissionId}
                    questionNumber={7}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />
            )}
            {(allChoices3dCompleted && plotType === '3d') && (
                <MultipleChoiceQuestion
                    question={'As we add X2 to the regression,'}
                    options={['The slope of X1(b1) changed.',
                        'The standard error of the slope X1(B1) changed ',
                        'The intercept of the regression line changed.',
                        'All of the above.']}
                    answer={'All of the above'}
                    submissionId={submissionId}
                    questionNumber={14}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />
            )}
            {(isSubmitted && plotType === '2d') && (
                <>
                    <div className="mt-3 mb-5 fs-5 fw-medium text-center">
                    Congratulations on completing the 2D simulation!
                    </div>
                    <div className="btn btn-secondary text-center"
                        onClick={() => handlePlotTypeChange('3d')}>
                    You can now proceed to the next step.
                    </div>
                </>
            )}
            {(isSubmitted && plotType === '3d') && (
                <>
                    <div className="mt-3 mb-5 fs-5 fw-medium text-center">
                Congratulations on completing the 3D simulation!
                    </div>
                    <div className="btn btn-secondary text-center"
                        href="#">
                You can now proceed to the next simulation.
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
    setIs2DCompleted: PropTypes.func.isRequired,
    is2DCompleted: PropTypes.bool.isRequired,
    submissionId: PropTypes.number.isRequired,
    handlePlotTypeChange: PropTypes.func,
    plotType: PropTypes.string.isRequired,
    tvalue3d: PropTypes.number.isRequired,
    setStartQuiz: PropTypes.func.isRequired,
    setIs3DCompleted: PropTypes.func.isRequired,
    appRvalue3d: PropTypes.number.isRequired
};