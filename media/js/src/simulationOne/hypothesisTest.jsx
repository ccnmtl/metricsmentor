import React, { useState, useEffect } from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';
import { Quiz } from './quiz';
import axios from 'axios';

export const HypothesisTest = ({
    selectedOption, appRvalue, tvalue, hypothesizedSlope, n, onComplete,
    completedChoices, submissionId, tvalue3d, plotType, on3dComplete,
    completedChoices3d, selectedOption3d, appRvalue3d
}) => {
    const [pvalues, setPvalues] = useState(null);
    const [pvalues3d, setPvalues3d] = useState(null);
    const [alpha, setAlpha] = useState(null);
    const [alphaSelected, setAlphaSelected] = useState(false);
    let hypothesis;
    let hypothesisTest;

    const nullHypothesis = `\\Eta_0: {\\beta_1} = ${hypothesizedSlope}`;

    switch (selectedOption || selectedOption3d) {
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

    const calculatePvalue3d = async() => {
        try {
            const response = await axios.post('/calculate_pvalue/',
                {n, tvalue: tvalue3d});

            setPvalues3d(response.data);

        } catch (error) {
            console.error('Error calculating pvalue:', error);
        }
    };
    let pvalue3d;
    if (pvalues3d) {
        pvalue3d = pvalues3d[hypothesisTest].toFixed(4);
    }

    useEffect(() => {

        if (plotType === '3d') {
            calculatePvalue3d();
        } else {
            calculatePvalue();
        }

        document.getElementById('hypothesis-test')
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
                    <header className="simulation__step-header"
                        id="hypothesis-test">
                        <h2 className="h2-primary">Hypothesis test</h2>
                    </header>
                    <div className="simulation__step-content">
                        <p>
                            Let&rsquo;s conduct a hypothesis test with the
                            alternative hypothesis you chose:
                        </p>
                        {plotType === '2d' && (
                            <div className="hi-val">
                                <div className="p-2">
                                    <Katex tex={nullHypothesis} />
                                </div>
                                <div className="p-2">
                                    <Katex tex={hypothesis} />
                                </div>
                                <div className="p-2">
                                    <Katex tex={
                                        `corr(x,y) = ${appRvalue.toFixed(3)}`
                                    } />
                                </div>
                                <div className="p-2">
                                    <Katex tex={
                                        `t = ${tvalue}`
                                    } />
                                </div>
                            </div>
                        )}
                        {plotType === '3d' && (
                            <div className="hi-val">
                                <div className="p-2">
                                    <Katex tex={nullHypothesis} />
                                </div>
                                <div className="p-2">
                                    <Katex tex={hypothesis} />
                                </div>
                                <div className="p-2">
                                    <Katex tex={
                                        `corr(x,y) = ${appRvalue3d.toFixed(3)}`
                                    } />
                                </div>
                                <div className="p-2">
                                    <Katex tex={
                                        `t = ${tvalue3d}`
                                    } />
                                </div>
                            </div>
                        )}

                        <p className="mt-3">
                            First, choose the significance
                            level,
                            <Katex tex={'{\\alpha}'}
                                className="katex-inline" />, for this exercise:
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
                                        className="mx-2">
                                        {`${val*100}% (${val.toFixed(2)})`}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className="simulation__step-prompt">
                            <button className="btn btn-primary mb-3"
                                onClick={handleNextButtonClick}
                                disabled={!alpha || alphaSelected}>
                                Continue &raquo;
                            </button>
                        </div>
                        {alphaSelected && (
                            <Quiz
                                hypothesisTest={hypothesisTest}
                                tvalue={tvalue}
                                tvalue3d={tvalue3d}
                                pvalue={parseFloat(pvalue)}
                                pvalue3d={parseFloat(pvalue3d)}
                                alpha={alpha}
                                hypothesis={hypothesis}
                                nullHypothesis={nullHypothesis}
                                n={n}
                                onComplete={onComplete}
                                on3dComplete={on3dComplete}
                                completedChoices={completedChoices}
                                completedChoices3d={completedChoices3d}
                                submissionId={submissionId}
                                plotType={plotType}
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
    selectedOption3d: PropTypes.string.isRequired,
    appRvalue: PropTypes.number.isRequired,
    appRvalue3d: PropTypes.number,
    tvalue: PropTypes.number.isRequired,
    tvalue3d: PropTypes.number.isRequired,
    coursePK: PropTypes.number,
    hypothesizedSlope: PropTypes.any.isRequired,
    n: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
    on3dComplete: PropTypes.func.isRequired,
    completedChoices: PropTypes.array.isRequired,
    completedChoices3d: PropTypes.array,
    submissionId: PropTypes.number.isRequired,
    plotType: PropTypes.string,
};