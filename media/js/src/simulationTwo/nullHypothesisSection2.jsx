import React from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';


export const NullHypothesisSection2 = ({
    slope, stderror, tvalue, tEquation, hypothesizedSlope,
    handleNullHypothesis, startQuiz
}) => {
    return (
        <div className="simulation__step-container d-flex">
            <div className="simulation__step-num">
            &bull;
            </div>
            <div className="simulation__step-toggle--down">
            </div>
            <div className="simulation__step-body">
                <header className="simulation__step-header">
                    <h2 className="h2-primary">
                    Null hypothesis</h2>
                </header>
                <div className="simulation__step-content">
                    <div className="row">
                        <label className="col-3">
                            <Katex tex={
                                '{\\Eta_0} : {\\beta_1} ='
                            } />
                        </label>
                        <input size="10" className="col-9 w-25"
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
                </div>
            </div>
        </div>
    );
};

NullHypothesisSection2.propTypes = {
    slope: PropTypes.number,
    stderror: PropTypes.number,
    tvalue: PropTypes.string,
    tEquation: PropTypes.string,
    hypothesizedSlope: PropTypes.number,
    handleNullHypothesis: PropTypes.func,
    startQuiz: PropTypes.bool
};