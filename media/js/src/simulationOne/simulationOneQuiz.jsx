import React, {useState, useEffect} from 'react';
import { Katex } from '../katexComponent';
import { HypothesisTest } from './hypothesisTest';
import PropTypes from 'prop-types';

export const SimulationOneQuiz = ({
    appRvalue, tvalue, pvalue, hypothesizedSlope
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {

    }, [appRvalue, tvalue]);

    return (
        <>
            <div className='ms-2 mt-2'>
                A <Katex tex={
                    `\\Eta_1: {\\beta_1}{\\neq} ${hypothesizedSlope}`
                } />
                <button className='btn btn-sm btn-primary'
                    onClick={() => setSelectedOption('A')}>Do This</button>
            </div>
            <div className='ms-2 mt-2'>
                B <Katex tex={
                    `\\Eta_1: {\\beta_1}{\\gt} ${hypothesizedSlope}`
                } />
                <button className='btn btn-sm btn-primary'
                    onClick={() => setSelectedOption('B')}>Do This</button>
            </div>
            <div className='ms-2 mt-2'>
                C <Katex tex={
                    `\\Eta_1: {\\beta_1}{\\lt} ${hypothesizedSlope}`
                } />
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
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.number.isRequired,
    pvalue: PropTypes.number.isRequired,
    hypothesizedSlope: PropTypes.number.isRequired
};