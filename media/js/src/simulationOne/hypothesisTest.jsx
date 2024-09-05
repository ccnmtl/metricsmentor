import React, { useState, useEffect } from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';
import { Quiz } from './quiz';
import axios from 'axios';

export const HypothesisTest = ({
    selectedAltHypothesis, appRvalue, tvalue, hypothesizedSlope, n,
    completedChoices, submissionId, plotType, setSelectedAltHypothesis,
    setIsHypothesisCompleted, isRedo, setIsRedo
}) => {
    const [pvalues, setPvalues] = useState(null);
    const [alpha, setAlpha] = useState(null);
    const [alphaSelected, setAlphaSelected] = useState(false);

    let hypothesis;
    let hypothesisTest;

    const nullHypothesis = `\\Eta_0: {\\beta_1} = ${hypothesizedSlope}`;

    switch (selectedAltHypothesis) {
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
                        <div className="hi-val">
                            <div className="p-2 border-bottom border-white">
                                <Katex tex={nullHypothesis} />
                            </div>
                            <div className="p-2 border-bottom border-white">
                                <Katex tex={hypothesis} />
                            </div>
                            <div className="p-2 border-bottom border-white">
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
                                isRedo={isRedo}
                                setIsRedo={setIsRedo}
                                tvalue={tvalue}
                                pvalue={parseFloat(pvalue)}
                                alpha={alpha}
                                hypothesis={hypothesis}
                                nullHypothesis={nullHypothesis}
                                n={n}
                                completedChoices={completedChoices}
                                submissionId={submissionId}
                                plotType={plotType}
                                // eslint-disable-next-line max-len
                                setIsHypothesisCompleted={setIsHypothesisCompleted}
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
    setSelectedAltHypothesis: PropTypes.func,
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.number.isRequired,
    coursePK: PropTypes.number,
    hypothesizedSlope: PropTypes.any.isRequired,
    n: PropTypes.number.isRequired,
    completedChoices: PropTypes.array.isRequired,
    submissionId: PropTypes.number.isRequired,
    plotType: PropTypes.string,
    setIsHypothesisCompleted: PropTypes.func,
    isRedo: PropTypes.bool,
    setIsRedo: PropTypes.func
};