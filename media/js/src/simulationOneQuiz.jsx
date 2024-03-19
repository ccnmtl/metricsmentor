import React, {useState, useEffect} from 'react';
import { Katex } from './katexComponent';
import { HypothesisTest } from './hypothesisTest';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({appRvalue, tvalue, pvalue}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {

    }, [appRvalue, tvalue]);

    return (
        <>
            <div className='ms-2 mt-2'>
                A <Katex tex={'\\Eta_1: {\\beta_1}{\\neq} 0'} />
                <button className='btn btn-sm btn-primary'
                    onClick={() => setSelectedOption('A')}>Do This</button>
            </div>
            <div className='ms-2 mt-2'>
                B <Katex tex={'\\Eta_1: {\\beta_1}{\\gt} 0'} />
                <button className='btn btn-sm btn-primary'
                    onClick={() => setSelectedOption('B')}>Do This</button>
            </div>
            <div className='ms-2 mt-2'>
                C <Katex tex={'\\Eta_1: {\\beta_1}{\\lt} 0'} />
                <button className='btn btn-sm btn-primary'
                    onClick={() => setSelectedOption('C')}>Do This</button>
            </div>

            {selectedOption && (
                <HypothesisTest
                    selectedOption={selectedOption}
                    appRvalue={appRvalue}
                    tvalue={tvalue}
                    pvalue={pvalue}
                />
            )}
        </>
    );
};

SimulationOneQuiz.propTypes = {
    appRvalue: PropTypes.any.isRequired,
    tvalue: PropTypes.any.isRequired,
    pvalue: PropTypes.any.isRequired
};