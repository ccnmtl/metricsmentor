import React, { useState, useEffect } from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';
import { Quiz } from './quiz';
import axios from 'axios';

export const HypothesisTest = ({
    selectedOption, appRvalue, tvalue, hypothesizedSlope, n, onComplete,
    completedChoices
}) => {
    const [pvalues, setPvalues] = useState(null);
    const [alpha, setAlpha] = useState(null);
    const [alphaSelected, setAlphaSelected] = useState(false);
    let hypothesis;
    let hypothesisTest;

    const nullHypothesis = `\\Eta_0: {\\beta_1} = ${hypothesizedSlope}`;

    switch (selectedOption) {
    case 'A':
        hypothesis = `\\Eta_1: {\\beta_1}{\\neq } ${hypothesizedSlope}`;
        hypothesisTest = 'value_two_sided';
        break;
    case 'B':
        hypothesis = `\\Eta_1: {\\beta_1}{\\gt} ${hypothesizedSlope}`;
        hypothesisTest = 'value_right';
        break;
    case 'C':
        hypothesis =  `\\Eta_1: {\\beta_1}{\\lt} ${hypothesizedSlope}`;
        hypothesisTest = 'value_left';
        break;
    default:
        hypothesis = '';
    }

    const handleAlphaChange = (event) => {
        const newAlpha = parseFloat(event.target.value);
        setAlpha(newAlpha);
    };

    const handleNextButtonClick = () => {
        setAlphaSelected(true);
    };

    const calculatePvalue = async() => {

        try {
            const response = await axios.post('/calculate_pvalue/',
                {n, tvalue});

            setPvalues(response.data);

        } catch (error) {
            console.error('Error calculating pvalue:', error);
        }
    };
    let pvalue;
    if (pvalues) {
        pvalue = pvalues[hypothesisTest].toFixed(4);
    }

    useEffect(() => {
        calculatePvalue();
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
                        <h2>Hypothesis test</h2>
                    </header>
                    <div className="simulation__step-content">
                        <div>
                            <Katex tex={nullHypothesis} />
                        </div>
                        <div><Katex tex={hypothesis} /></div>
                        <div>r: {appRvalue.toFixed(3)}</div>
                        <div>t: {tvalue}</div>
                        <p>Choose significance level, alpha:</p>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="significance1"
                                    name="significance"
                                    value={0.01}
                                    checked={alpha === 0.01}
                                    onChange={handleAlphaChange}
                                    disabled={alphaSelected}
                                />
                                <label htmlFor="significance1">1% (0.01)</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="significance5"
                                    name="significance"
                                    value={0.05}
                                    checked={alpha === 0.05}
                                    onChange={handleAlphaChange}
                                    disabled={alphaSelected}
                                />
                                <label htmlFor="significance5">5% (0.05)</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="significance10"
                                    name="significance"
                                    value={0.10}
                                    checked={alpha === 0.10}
                                    onChange={handleAlphaChange}
                                    disabled={alphaSelected}
                                />
                                <label
                                    htmlFor="significance10">10% (0.10)</label>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-3"
                        onClick={handleNextButtonClick} disabled={alphaSelected}>Next</button>
                        {alphaSelected && (
                            <Quiz
                                hypothesisTest={hypothesisTest}
                                appRvalue={appRvalue}
                                tvalue={tvalue}
                                pvalue={parseFloat(pvalue)}
                                alpha={alpha}
                                hypothesis={hypothesis}
                                nullHypothesis={nullHypothesis}
                                n={n}
                                onComplete={onComplete}
                                completedChoices={completedChoices}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

HypothesisTest.propTypes = {
    selectedOption: PropTypes.string.isRequired,
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.number.isRequired,
    coursePK: PropTypes.number,
    hypothesizedSlope: PropTypes.any.isRequired,
    n: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
    completedChoices: PropTypes.array.isRequired,
};