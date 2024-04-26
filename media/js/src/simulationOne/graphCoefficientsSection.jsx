import React from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';

export const GraphCoefficients = ({
    intercept, slope, stderror, appRvalue, plotType
}) => {
    return (
        <div className='simulation__step-container d-flex'>
            <div className='simulation__step-num'>
                                &bull;
            </div>
            <div className='simulation__step-toggle--down'>
            </div>
            <div className='simulation__step-body'>
                <header className='simulation__step-header'>
                    <h2 className='h2-primary'>
                                        Resulting Graph Coefficients</h2>
                </header>
                <div className='simulation__step-content'>
                    <p>
                        The graph generated with your sample size
                        and correlation coefficient produces the
                        following coefficients. Let&rsquo;s look at
                        them in detail.
                    </p>
                    <h2 className='mt-4'>
                                        Regression line equation:</h2>
                    <div className='ms-3 mb-3'>
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x'
                        } />
                    </div>
                    <div className='ms-3 mb-3'>
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept.toFixed(2)} + ${slope.toFixed(3)}x`
                        } />
                    </div>
                    <p>where <span className='katex'>
                        <span className='mathnormal'>y</span>
                    </span> is the dependent variable and
                    <span className='katex'> <span className='mathnormal'>x</span> {/* eslint-disable-line max-len */}
                    </span> is the independent, or
                                        explanatory, variable.
                    </p>
                    <h2 className='mt-4'>Sample <span className='katex'><span className='mathnormal'>y-intercept</span> {/* eslint-disable-line max-len */}
                    </span> coefficient:</h2>
                    <div className='ms-3'>
                        <Katex tex={
                            `\\hat{\\beta_0} = ${intercept.toFixed(3)}`
                        } />
                    </div>
                    <h2 className='mt-4'>Sample slope
                                        coefficient:</h2>
                    <div className='ms-3'>
                        <Katex tex={
                            `\\hat{\\beta_1} = ${slope.toFixed(3)}`
                        } />
                    </div>
                    <h2 className='mt-4'>Standard error of
                                    the sample slope:</h2>
                    <div className='ms-3'>
                        <Katex tex={
                            `{SE(\\hat{\\beta_1})} = ${stderror.toFixed(3)}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

GraphCoefficients.propTypes = {
    intercept: PropTypes.number,
    slope: PropTypes.number,
    stderror: PropTypes.number,
    appRvalue: PropTypes.number,
    plotType: PropTypes.string
};