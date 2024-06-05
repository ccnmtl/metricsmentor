import React, { useEffect, useState } from 'react';
import { Katex } from '../katexComponent';
import { HypothesisTest } from './hypothesisTest';
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, hypothesizedSlope, n, setIs2DCompleted,
    is2DCompleted, submissionId
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [completedChoices, setCompletedChoices] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const allChoicesCompleted = ['A', 'B', 'C'].every(
        choice => completedChoices.includes(choice));

    const handleChoiceCompletion = () => {
        setCompletedChoices([...completedChoices, selectedOption]);
        setSelectedOption(null);
    };

    const is2dCompleted = () => {
        if (allChoicesCompleted) {
            setIs2DCompleted(true);
        }
    };

    useEffect(() => {
        is2dCompleted();
    },[completedChoices, allChoicesCompleted]);

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
                                        (completedChoices.includes(choice[0]) ?
                                            ' hypothesis-completed' : '')
                                    }
                                >
                                    <div className="listset-alpha-card__title">
                                        <Katex tex={
                                            choice[1] + hypothesizedSlope} />
                                    </div>
                                    <button className="btn btn-sm btn-primary"
                                        disabled={selectedOption !== null ||
                                            completedChoices.includes(
                                                choice[0])}
                                        onClick={
                                            () => setSelectedOption(choice[0])}
                                    >
                                        Prove
                                    </button>
                                    <div className="status-complete">
                                        &#10003;
                                    </div>

                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            {selectedOption && (
                <HypothesisTest
                    selectedOption={selectedOption}
                    hypothesizedSlope={hypothesizedSlope}
                    appRvalue={appRvalue}
                    tvalue={parseFloat(tvalue)}
                    onComplete={handleChoiceCompletion}
                    n={parseInt(n)}
                    completedChoices={completedChoices}
                    submissionId={submissionId}
                />
            )}
            {allChoicesCompleted && (
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
            {isSubmitted && (
                <div className="mt-3 mb-5 fs-5 fw-medium text-center">
                    Congratulations on completing the 2D simulation!
                </div>
            )}
        </>
    );
};

SimulationOneQuiz.propTypes = {
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.string.isRequired,
    hypothesizedSlope: PropTypes.any.isRequired,
    n: PropTypes.any.isRequired,
    setIs2DCompleted: PropTypes.func.isRequired,
    is2DCompleted: PropTypes.bool.isRequired,
    submissionId: PropTypes.number.isRequired
};