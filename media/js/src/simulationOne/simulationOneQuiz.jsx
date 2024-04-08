import React, {useState, useEffect} from 'react';
import { Katex } from '../katexComponent';
import { HypothesisTest } from './hypothesisTest';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, hypothesizedSlope, n
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {

    }, [appRvalue, tvalue]);

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
                                onClick={() => setSelectedOption('A')}>
                                    Do This
                            </button>
                        </div>
                        <div className='ms-2 mt-2'>
                            B <Katex tex={
                                `\\Eta_1: {\\beta_1}{\\gt} ${hypothesizedSlope}`
                            } />
                            <button className='btn btn-sm btn-primary'
                                onClick={() => setSelectedOption('B')}>
                                    Do This
                            </button>
                        </div>
                        <div className='ms-2 mt-2'>
                            C <Katex tex={
                                `\\Eta_1: {\\beta_1}{\\lt} ${hypothesizedSlope}`
                            } />
                            <button className='btn btn-sm btn-primary'
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
                    n={parseInt(n)}
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