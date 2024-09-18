import React, { useEffect } from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';


export const NullHypothesisSection = ({
    slope, stderror, tvalue, hypothesizedSlope,
    startQuiz, plotType, slopes, stderrs, tvalue3d, startQuiz2,
    setHypothesizedSlope, selectedAltHypothesis
}) => {

    const handleNullHypothesis = (e) => {
        setHypothesizedSlope(parseFloat(e.target.value));
    };

    useEffect(() => {
        document.getElementById('null-hypothesis')
            .scrollIntoView({ behavior: 'smooth' });

        if (plotType === '3d') {
            setHypothesizedSlope(0);
        }
    }, [plotType, setHypothesizedSlope]);

    const tEquation =
    't = \\cfrac{\\hat{\\beta}_1 - \\beta_1}{SE(\\hat{\\beta_1})}';

    return (
        <div className="simulation__step-container d-flex">
            <div className="simulation__step-num">
            &bull;
            </div>
            <div className="simulation__step-toggle--down">
            </div>
            <div className="simulation__step-body">
                <header className="simulation__step-header">
                    <h2 className="h2-primary" id="null-hypothesis">
                    Defining null hypothesis</h2>
                </header>
                {plotType === '2d' && (
                    <div className="simulation__step-content">
                        <p>In this exercise, the null
                        hypothesis (<Katex tex={'{\\Eta_0}'}
                            className="katex-inline" />) states that the
                        population slope (<Katex tex={'{\\beta_1}'}
                            className="katex-inline" />) is equal to a
                        particular value.
                        Now, set this value as the baseline claim for
                        <Katex tex={'{\\Eta_0}'}
                            className="katex-inline" /> and observe the
                        outcome of the test statistic
                        <Katex tex={'t'} className="katex-inline" />.</p>
                        <p><em>For your first attempt, set <Katex tex={
                            '{\\beta_1}=0'} className="katex-inline" />.</em>
                        </p>
                        <div className="sub-content">
                            <div className="d-flex">
                                <label
                                    className="me-2 form-label
                                        align-self-center">
                                    <Katex tex={
                                        '{\\Eta_0} : {\\beta_1} ='
                                    } />
                                </label>
                                <input size="10"
                                    className="form-control short-input"
                                    type="number" min="-5" max="5"
                                    disabled={selectedAltHypothesis}
                                    value={hypothesizedSlope}
                                    onChange={handleNullHypothesis} />
                            </div>
                            <div className="katex-block mt-3">
                                <Katex tex={tEquation} />
                            </div>
                            <div className="katex-block mt-3">
                                <Katex tex={
                                // eslint-disable-next-line max-len
                                    `t = \\cfrac{${slope.toFixed(3)} - ${hypothesizedSlope}}{${stderror.toFixed(3)}} = ${tvalue}`
                                } />
                            </div>
                        </div>
                    </div>
                )}
                {plotType === '3d' && slopes.length > 0 && (
                    <div className="simulation__step-content">
                        <p>In this exercise, the null
                        hypothesis (<Katex tex={'{\\Eta_0}'}
                            className="katex-inline" />) states that the
                        population slope (<Katex tex={'{\\beta_1}'}
                            className="katex-inline" />) is equal to a
                        particular value.
                        Now, set this value as the baseline claim for
                        <Katex tex={'{\\Eta_0}'}
                            className="katex-inline" /> and observe the
                        outcome of the test statistic
                        <Katex tex={'t'} className="katex-inline" />.
                        </p>
                        <div className="sub-content">
                            <div className="d-flex">
                                <label
                                    className="me-2 form-label
                                        align-self-center">
                                    <Katex tex={
                                        '{\\Eta_0} : {\\beta_1} ='
                                    } />
                                </label>
                                <input size="10"
                                    className="form-control short-input"
                                    type="number" min="-5" max="5"
                                    disabled={startQuiz}
                                    value={hypothesizedSlope}
                                    onChange={handleNullHypothesis} />
                            </div>
                            <div className="katex-block mt-3">
                                <Katex tex={tEquation} />
                            </div>
                            <div className="katex-block mt-3">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    `t = \\cfrac{${slopes[0].toFixed(3)} - ${hypothesizedSlope}}{${stderrs[0].toFixed(3)}} = ${tvalue3d}`
                                } />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

NullHypothesisSection.propTypes = {
    slope: PropTypes.number,
    stderror: PropTypes.number,
    tvalue: PropTypes.number,
    tvalue3d: PropTypes.number,
    tEquation: PropTypes.string,
    hypothesizedSlope: PropTypes.number,
    handleNullHypothesis: PropTypes.func,
    startQuiz: PropTypes.bool,
    plotType: PropTypes.string,
    slopes: PropTypes.array,
    stderrs: PropTypes.array,
    startQuiz2: PropTypes.bool,
    setHypothesizedSlope: PropTypes.func,
    selectedAltHypothesis: PropTypes.string
};