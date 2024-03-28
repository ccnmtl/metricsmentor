import React, { useState } from 'react';
import { Katex } from './katexComponent';
import PropTypes from 'prop-types';
import { Quiz } from './quiz'; // Import the 'Quiz' component

export const HypothesisTest = ({
    selectedOption, appRvalue, tvalue, pvalue
}) => {
    let hypothesis;
    let hypothesisTest;

    switch (selectedOption) {
    case 'A':
        hypothesis = '\\beta_1 \\neq 0';
        hypothesisTest = 'two-tailed';
        break;
    case 'B':
        hypothesis = '\\beta_1 > 0';
        hypothesisTest = 'right one-tailed';
        break;
    case 'C':
        hypothesis = '\\beta_1 < 0';
        hypothesisTest = 'left one-tailed';
        break;
    default:
        hypothesis = '';
    }

    const [alpha, setAlpha] = useState(null);
    const [alphaSelected, setAlphaSelected] = useState(false);

    const handleAlphaChange = (event) => {
        const newAlpha = parseFloat(event.target.value);
        setAlpha(newAlpha);
        setAlphaSelected(true);
    };

    return (
        <div>
            <h2>Selected option: {hypothesisTest}</h2>
            <div>null hypothesis: <Katex tex={'\\beta_1 = 0'} /></div>
            <div>Hypothesis: <Katex tex={hypothesis} /></div>
            <div>AppRvalue: {appRvalue.toFixed(3)}</div>
            <div>Tvalue: {tvalue}</div>
            Choose significance level, alpha:
            <div>
                <div>
                    <input
                        type='radio'
                        id='significance1'
                        name='significance'
                        value={0.01}
                        checked={alpha === 0.01}
                        onChange={handleAlphaChange}
                        disabled={alphaSelected}
                    />
                    <label htmlFor='significance1'>1% (0.01)</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='significance5'
                        name='significance'
                        value={0.05}
                        checked={alpha === 0.05}
                        onChange={handleAlphaChange}
                        disabled={alphaSelected}
                    />
                    <label htmlFor='significance5'>5% (0.05)</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='significance10'
                        name='significance'
                        value={0.10}
                        checked={alpha === 0.10}
                        onChange={handleAlphaChange}
                        disabled={alphaSelected}
                    />
                    <label htmlFor='significance10'>10% (0.10)</label>
                </div>
            </div>
            {alphaSelected && (
                <Quiz
                    hypothesisTest={hypothesisTest}
                    appRvalue={appRvalue}
                    tvalue={tvalue}
                    pvalue={pvalue}
                    alpha={alpha}
                    hypothesis={hypothesis}
                />
            )}
        </div>
    );
};

HypothesisTest.propTypes = {
    selectedOption: PropTypes.string.isRequired,
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.string.isRequired,
    coursePK: PropTypes.number,
    pvalue: PropTypes.number
};