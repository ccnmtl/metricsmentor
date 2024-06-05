import React, { useEffect } from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';


export const NullHypothesisSection = ({
    slope, stderror, tvalue, tEquation, hypothesizedSlope,
    handleNullHypothesis, startQuiz
}) => {

    useEffect(() => {
        document.getElementById('null-hypothesis')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

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
                <div className="simulation__step-content">
                    <p>In this exercise, the null
                        hypothesis, <span className="katex">
                        <span className="mathnormal">
                                H<sub>0</sub>
                        </span></span>,
                        for the hypothesis testing is the population
                        slope <span className="katex">
                        <span className="mathnormal">
                                    &beta;<sub>1</sub>
                        </span></span>.
                        Now set the baseline claim for <span className="katex">
                        <span className="mathnormal">
                                H<sub>0</sub>
                        </span></span> and observe the outcome
                            of <span className="katex">
                        <span className="mathnormal">
                                t
                        </span></span>.
                    </p>
                    <div className="row">
                        <label className="col-3">
                            <Katex tex={
                                '{\\Eta_0} : {\\beta_1} ='
                            } />
                        </label>
                        <input size="10" className="form-control short-input"
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
            </div>
        </div>
    );
};

NullHypothesisSection.propTypes = {
    slope: PropTypes.number,
    stderror: PropTypes.number,
    tvalue: PropTypes.number,
    tEquation: PropTypes.string,
    hypothesizedSlope: PropTypes.number,
    handleNullHypothesis: PropTypes.func,
    startQuiz: PropTypes.bool
};