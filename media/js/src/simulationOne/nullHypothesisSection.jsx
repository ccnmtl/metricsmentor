import React, { useEffect } from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';


export const NullHypothesisSection = ({
    slope, stderror, tvalue, hypothesizedSlope,
    handleNullHypothesis, startQuiz, plotType, slopes, stderrs,
    tvalue3d
}) => {

    useEffect(() => {
        document.getElementById('null-hypothesis')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

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
                        hypothesis,
                        <Katex tex={'{\\Eta_0}'} className="katex-inline" />,
                        for the hypothesis testing is the population slope
                        <Katex tex={'{\\beta_1}'} className="katex-inline" />.
                        Now set the baseline claim for
                        <Katex tex={'{\\Eta_0}'}
                            className="katex-inline" /> and observe the
                        outcome of
                        <Katex tex={'t'} className="katex-inline" />.
                        </p>
                        <div className="row">
                            <label className="col-3">
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
                        <div className="row my-3">
                            <Katex tex={tEquation} />
                        </div>
                        <div className="row">
                            <div className="input-group my-3">
                                <Katex tex={
                                // eslint-disable-next-line max-len
                                    `t = \\cfrac{${slope.toFixed(3)} - ${hypothesizedSlope}}{${stderror.toFixed(3)}} = ${tvalue}`
                                } />
                            </div>
                        </div>
                        <p className="mt-4">
                        Save your graph and let&rsquo;s move on
                        to hypothesis testing.
                        </p>
                    </div>
                )}
                {plotType === '3d' && slopes.length > 0 && (
                    <div className="simulation__step-content">
                        <p>In this exercise, the null
                            hypothesis,
                        <Katex tex={'{\\Eta_0}'} className="katex-inline" />,
                        for the hypothesis testing is the population slope
                        <Katex tex={'{\\beta_1}'} className="katex-inline" />.
                        Now set the baseline claim for
                        <Katex tex={'{\\Eta_0}'}
                            className="katex-inline" /> and observe the
                        outcome of
                        <Katex tex={'t'} className="katex-inline" />.
                        </p>
                        <div className="row">
                            <label className="col-3">
                                <Katex tex={
                                    '{\\Eta_0} : {\\beta_1} ='
                                } />
                            </label>
                            <input size="10"
                                className="form-control short-input"
                                type="number" min="-5" max="5"
                                // disabled={startQuiz}
                                value={hypothesizedSlope}
                                onChange={handleNullHypothesis} />
                        </div>
                        <div className="row my-3">
                            <Katex tex={tEquation} />
                        </div>
                        <div className="row">
                            <div className="input-group my-3">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    `t = \\cfrac{${slopes[0].toFixed(3)} - ${hypothesizedSlope}}{${stderrs[0].toFixed(3)}} = ${tvalue3d}`
                                } />
                            </div>
                        </div>
                        <p className="mt-4">
                            Save your graph and let&rsquo;s move on
                            to hypothesis testing.
                        </p>
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
    stderrs: PropTypes.array
};