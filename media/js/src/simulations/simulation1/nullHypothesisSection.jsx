import React from 'react';
import { Katex } from '../../utils/katexComponent';
import PropTypes from 'prop-types';
import { STATIC_URL } from '../../utils/utils';


export const NullHypothesisSection = ({
    slope, stderror, tvalue, startQuiz, plotType, slopes, stderrs,
    tvalue3d, startQuiz2
}) => {

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
                    Null hypothesis</h2>
                </header>
                {plotType === '2d' && (
                    <div className="simulation__step-content">
                        <p>Here, the null hypothesis, <Katex tex={'{\\Eta_0}'}
                            className="katex-inline" />, states that the
                        population slope <Katex tex={'{\\beta_1} = 0'}
                            className="katex-inline" />.</p>
                        <div className="prompt-block">
                            <div className="prompt-gfx">
                                <img src={`${STATIC_URL}/img/icon-bell.svg`}
                                    className="prompt-img"
                                    alt="Reminder" />
                            </div>
                            <p className="mb-0">
                                Continue adjusting <Katex tex={'n'}
                                    className="katex-inline" /> and
                                <Katex tex={'\\text{corr}(x,y)'}
                                    className="katex-inline" />, and observe
                                the effect on the test
                                statistic <Katex tex={'t'}
                                    className="katex-inline" />.
                            </p>
                        </div>
                        <div className="sub-content">
                            <div className="katex-block mt-3">
                                <Katex tex={
                                    '{\\Eta_0} : {\\beta_1} = 0'
                                } />
                            </div>
                            <div className="katex-block mt-3">
                                <Katex className="katex-inline" tex={
                                // eslint-disable-next-line max-len
                                    `${tEquation}~=~\\cfrac{${slope.toFixed(3)} - 0}{${stderror.toFixed(3)}}~=~`
                                } />
                                <Katex className="katex-inline hi-val"
                                    tex={`${tvalue}`} />
                            </div>
                        </div>
                    </div>
                )}
                {plotType === '3d' && slopes.length > 0 && (
                    <div className="simulation__step-content">
                        <p>Here, the null hypothesis, <Katex tex={'{\\Eta_0}'}
                            className="katex-inline" />, states that the
                        population slope <Katex tex={'{\\beta_1} = 0'}
                            className="katex-inline" />.</p>
                        <div className="prompt-block">
                            <div className="prompt-gfx">
                                <img src={`${STATIC_URL}/img/icon-bell.svg`}
                                    className="prompt-img"
                                    alt="Reminder" />
                            </div>
                            <p className="mb-0">
                                Continue adjusting <Katex
                                    tex={'\\text{corr}(x_1,x_2)'}
                                    className="katex-inline" />, and observe
                                the effect on the test
                                statistic <Katex tex={'t'}
                                    className="katex-inline" />.
                            </p>
                        </div>
                        <div className="sub-content">
                            <div className="katex-block mt-3">
                                <Katex tex={
                                    '{\\Eta_0} : {\\beta_1} = 0'
                                } />
                            </div>
                            <div className="katex-block mt-3">
                                <Katex className="katex-inline" tex={
                                    // eslint-disable-next-line max-len
                                    `${tEquation}~=~\\cfrac{${slopes[0].toFixed(3)} - 0}{${stderrs[0].toFixed(3)}}~=~`
                                } />
                                <Katex className="katex-inline hi-val"
                                    tex={`${tvalue3d}`} />
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
    startQuiz: PropTypes.bool,
    plotType: PropTypes.string,
    slopes: PropTypes.array,
    stderrs: PropTypes.array,
    startQuiz2: PropTypes.bool,
};