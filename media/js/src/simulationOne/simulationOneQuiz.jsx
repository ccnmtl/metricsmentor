import React, { useEffect, useState } from 'react';
import { Katex } from '../katexComponent';
import { HypothesisTest } from './hypothesisTest';
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, hypothesizedSlope, n, setIs2DCompleted,
    is2DCompleted
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [completedChoices, setCompletedChoices] = useState([]);

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

    return (
        <>
            <div className="simulation__step-container d-flex">
                <div className="simulation__step-num">
                    &bull;
                </div>
                <div className="simulation__step-toggle--down"></div>
                <div className="simulation__step-body">
                    <header className="simulation__step-header">
                        <h2 className="h2-primary">Alternative hypothesis</h2>
                    </header>
                    <div className="simulation__step-content">
                        <p>
                            The alternative hypothesis is claim believed to be
                            true. In this simulation, there are three
                            alternative hypothesis. Choose one lorem ipsum
                            dolor sit amet.
                        </p>


                        <ol className="listset-alpha listset-alpha-listnum">
                            <li className="listset-alpha-card">
                                <div className="listset-alpha-card__title">
                                    <Katex tex={
                                    // eslint-disable-next-line max-len
                                        `\\Eta_1: {\\beta_1}{\\neq} ${hypothesizedSlope}`
                                    } />
                                </div>
                                <button className="btn btn-sm btn-primary"
                                    disabled={completedChoices.includes('A')}
                                    onClick={() => setSelectedOption('A')}>
                                        Prove
                                </button>
                            </li>
                            <li className="listset-alpha-card">
                                <div className="listset-alpha-card__title">
                                    <Katex tex={
                                    // eslint-disable-next-line max-len
                                        `\\Eta_1: {\\beta_1}{\\gt} ${hypothesizedSlope}`
                                    } />
                                </div>
                                <button className="btn btn-sm btn-primary"
                                // eslint-disable-next-line max-len
                                    disabled={completedChoices.includes('B')}
                                    onClick={() => setSelectedOption('B')}>
                                        Prove
                                </button>
                            </li>
                            <li className="listset-alpha-card">
                                <div className="listset-alpha-card__title">
                                    <Katex tex={
                                    // eslint-disable-next-line max-len
                                        `\\Eta_1: {\\beta_1}{\\lt} ${hypothesizedSlope}`
                                    } />
                                </div>
                                <button className="btn btn-sm btn-primary"
                                    disabled={completedChoices.includes('C')}
                                    onClick={() => setSelectedOption('C')}>
                                        Prove
                                </button>
                            </li>
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
                />
            )}
            {allChoicesCompleted && (
                <MultipleChoiceQuestion
                    question={'Which of the following is TRUE?'}
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
                />
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
};