import React, { useState, useEffect } from 'react';
import { Katex } from '../../utils/katexComponent';
import PropTypes from 'prop-types';
import { Quiz } from './quiz';
import axios from 'axios';

export const HypothesisTest = ({
    selectedAltHypothesis, appRvalue, tvalue, n,
    completedChoices, submissionId, plotType, isRedo, setIsRedo,
    setIsHypothesisCompleted, isHypothesisCompleted, answers, setLockControls
}) => {
    const [pvalues, setPvalues] = useState(null);
    const [alpha, setAlpha] = useState(null);
    const [alphaSelected, setAlphaSelected] = useState(false);

    let hypothesis;
    let hypothesisTest;

    const nullHypothesis = '\\Eta_0: {\\beta_1}= 0';

    switch (selectedAltHypothesis) {
    case 'A':
        hypothesis = '\\Eta_1: {\\beta_1}~{\\neq}~0';
        hypothesisTest = 'value_two_sided';
        break;
    case 'B':
        hypothesis = '\\Eta_1: {\\beta_1}~{\\gt}~0';
        hypothesisTest = 'value_right';
        break;
    case 'C':
        hypothesis =  '\\Eta_1: {\\beta_1}~{\\lt}~0';
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
        setLockControls(true);
    };

    const calculatePvalue = async() => {
        try {
            // Convert tvalue to a string if it is Infinity or -Infinity
            let tvalueString = tvalue;
            if (tvalue === Infinity) {
                tvalueString = 'Infinity';
            } else if (tvalue === -Infinity) {
                tvalueString = '-Infinity';
            }

            const response = await axios.post('/calculate_pvalue/', {
                n,
                tvalue: tvalueString
            });

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
        document.getElementById('hypothesis-test')
            .scrollIntoView({ behavior: 'smooth'});
        if (isRedo) {
            setAlphaSelected(false);
            setLockControls(false);
        }
    }, [isRedo]);

    return (
        <>
            <div className="simulation__step-container d-flex">
                <div className="simulation__step-num">
                    &bull;
                </div>
                <div className="simulation__step-toggle--down"></div>
                <div className="simulation__step-body">
                    <header className="simulation__step-header"
                        id="hypothesis-test">
                        <h2 className="h2-primary">Hypothesis test</h2>
                    </header>
                    <div className="simulation__step-content">
                        <p className="mb-1">
                            Let&rsquo;s conduct the hypothesis test:
                        </p>
                        <div className="sub-content hi-val">
                            <div className="katex-block border-bottom
                                border-white">
                                <Katex tex={nullHypothesis} />
                            </div>
                            <div className="katex-block border-bottom
                                border-white">
                                <Katex tex={hypothesis} />
                            </div>
                            <div className="katex-block border-bottom
                                border-white">
                                <Katex tex={
                                // eslint-disable-next-line max-len
                                    `\\text{corr}(x,y) = ${appRvalue.toFixed(3)}`
                                } />
                            </div>
                            <div className="katex-block">
                                <Katex tex={
                                    `t = ${tvalue}`
                                } />
                            </div>
                        </div>
                        <h2>Set the significance
                            level, <Katex tex={'{\\alpha}'}
                            className="katex-inline" />:</h2>
                        <p>
                            First, choose <Katex tex={'{\\alpha}'}
                                className="katex-inline" />, which is
                            the probability of rejecting <Katex tex={'\\Eta_0'}
                                className="katex-inline" /> when it is true.
                        </p>
                        <ul className="choice-list">
                            {[0.01, 0.05, 0.10].map((val, key) => (
                                <li key={key}>
                                    <input
                                        type="radio"
                                        id={`significance${val*100}`}
                                        name="significance"
                                        value={val}
                                        checked={alpha === val}
                                        onChange={handleAlphaChange}
                                        disabled={alphaSelected}
                                    />
                                    <label htmlFor={`significance${val*100}`}
                                        className="mx-1">
                                        {`${val*100}% (${val.toFixed(2)})`}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className="simulation__step-prompt">
                            <button className="btn btn-sm btn-success"
                                id="alphaNextButton"
                                onClick={handleNextButtonClick}
                                disabled={!alpha || alphaSelected}>
                                Continue &raquo;
                            </button>
                        </div>
                        {alphaSelected && (
                            <Quiz
                                hypothesisTest={hypothesisTest}
                                isRedo={isRedo}
                                setIsRedo={setIsRedo}
                                tvalue={tvalue}
                                pvalue={parseFloat(pvalue)}
                                answers={answers}
                                alpha={alpha}
                                hypothesis={hypothesis}
                                nullHypothesis={nullHypothesis}
                                n={n}
                                completedChoices={completedChoices}
                                submissionId={submissionId}
                                plotType={plotType}
                                // eslint-disable-next-line max-len
                                setIsHypothesisCompleted={setIsHypothesisCompleted}
                                isHypothesisCompleted={isHypothesisCompleted}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

HypothesisTest.propTypes = {
    selectedAltHypothesis: PropTypes.string,
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.number.isRequired,
    coursePK: PropTypes.number,
    n: PropTypes.number.isRequired,
    completedChoices: PropTypes.array.isRequired,
    submissionId: PropTypes.number.isRequired,
    plotType: PropTypes.string,
    setIsHypothesisCompleted: PropTypes.func,
    isRedo: PropTypes.bool,
    setIsRedo: PropTypes.func,
    isHypothesisCompleted: PropTypes.bool,
    answers: PropTypes.array,
    setLockControls: PropTypes.func
};