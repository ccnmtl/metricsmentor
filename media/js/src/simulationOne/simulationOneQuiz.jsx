import React, { useState } from 'react';
import { Katex } from '../katexComponent';
import { HypothesisTest } from './hypothesisTest';
import { MultipleChoiceQuestion } from './multipleChoiceQuestion';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, hypothesizedSlope, n
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [completedChoices, setCompletedChoices] = useState([]);

    const handleChoiceCompletion = () => {
        setCompletedChoices([...completedChoices, selectedOption]);
        setSelectedOption(null);
    };

    const allChoicesCompleted = ['A', 'B', 'C'].every(
        choice => completedChoices.includes(choice));

    return (
        <>
            <div className='simulation__step-container d-flex'>
                <div className='simulation__step-num'>
                    &bull;
                </div>
                <div className='simulation__step-toggle--down'></div>
                <div className='simulation__step-body'>
                    <header className='simulation__step-header'>
                        <h2 className='h2-primary'>Alternate hypothesis</h2>
                    </header>
                    <div className='simulation__step-content'>
                        <div className='ms-2 mt-2'>
                            A <Katex tex={
                                // eslint-disable-next-line max-len
                                `\\Eta_1: {\\beta_1}{\\neq} ${hypothesizedSlope}`
                            } />
                            <button className='btn btn-sm btn-primary'
                                disabled={completedChoices.includes('A')}
                                onClick={() => setSelectedOption('A')}>
                                    Do This
                            </button>
                        </div>
                        <div className='ms-2 mt-2'>
                            B <Katex tex={
                                `\\Eta_1: {\\beta_1}{\\gt} ${hypothesizedSlope}`
                            } />
                            <button className='btn btn-sm btn-primary'
                                disabled={completedChoices.includes('B')}
                                onClick={() => setSelectedOption('B')}>
                                    Do This
                            </button>
                        </div>
                        <div className='ms-2 mt-2'>
                            C <Katex tex={
                                `\\Eta_1: {\\beta_1}{\\lt} ${hypothesizedSlope}`
                            } />
                            <button className='btn btn-sm btn-primary'
                                disabled={completedChoices.includes('C')}
                                onClick={() => setSelectedOption('C')}>
                                    Do This
                            </button>
                        </div>
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
};