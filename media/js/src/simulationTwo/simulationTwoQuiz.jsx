// import React, { useEffect, useState } from 'react';
import React from 'react';
// import { Katex } from '../katexComponent';
// import { HypothesisTest2 } from './hypothesisTest2';
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion';
import PropTypes from 'prop-types';

export const SimulationTwoQuiz = ({
    appRvalue, tvalue, hypothesizedSlope, setIs2DCompleted, // n,
    is2DCompleted
}) => {
    // const [selectedOption, setSelectedOption] = useState(null);
    // const [completedChoices, setCompletedChoices] = useState([]);

    // const allChoicesCompleted = ['A', 'B', 'C'].every(
    //     choice => completedChoices.includes(choice));

    // const handleChoiceCompletion = () => {
    //     setCompletedChoices([...completedChoices, selectedOption]);
    //     setSelectedOption(null);
    // };

    // const is2dCompleted = () => {
    //     if (allChoicesCompleted) {
    //         setIs2DCompleted(true);
    //     }
    // };

    // useEffect(() => {
    //     is2dCompleted();
    // },[completedChoices, allChoicesCompleted]);

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


                        {/* <ol className="listset-alpha listset-alpha-listnum">
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
                                        Do This
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
                                        Do This
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
                                        Do This
                                </button>
                            </li>
                        </ol> */}
                    </div>
                </div>
            </div>

            {/* {selectedOption && (
                <HypothesisTest2
                    selectedOption={selectedOption}
                    hypothesizedSlope={hypothesizedSlope}
                    appRvalue={appRvalue}
                    tvalue={parseFloat(tvalue)}
                    onComplete={handleChoiceCompletion}
                    n={parseInt(n)}
                    completedChoices={completedChoices}
                />
            )} */}
            { (
                <div className="container my-1">
                    <MultipleChoiceQuestion
                        question={'Which of the following causes a higher '
                            + 'change in the slope of the variable of '
                            + 'interest (X1)'}
                        options={[
                            'High correlation between Y and X1.',
                            'High correlation between X1 and the omitted '
                                + 'variable.',
                            'High correlation between the omitted variable '
                                + 'and the dependent variable.',
                            'Both (b) and (c)',
                            'Both (a) and (c)']}
                        answer={'Both (a) and (c)'}
                    />
                    <MultipleChoiceQuestion
                        question={'If the correlation between the omitted '
                            + 'variable and the variable of interest (𝑋1) is '
                            + 'high and the correlation between the omitted '
                            + 'variable and the dependent variable is high, '
                            + 'the sample slope of the variable of interest '
                            + 'will be wrong, because'}
                        options={[
                            'Sample selection bias',
                            'Simultaneous causality bias',
                            'Omitted variable bias',
                            'Wrong functional form',
                            'Errors-in-variables']}
                        answer={'Omitted variable bias'}
                    />
                </div>
            )}
        </>
    );
};

SimulationTwoQuiz.propTypes = {
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.string.isRequired,
    hypothesizedSlope: PropTypes.any.isRequired,
    // n: PropTypes.any.isRequired,
    setIs2DCompleted: PropTypes.func.isRequired,
    is2DCompleted: PropTypes.bool.isRequired,
};