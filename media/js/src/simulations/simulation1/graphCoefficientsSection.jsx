import React from 'react';
import { Katex } from '../../utils/katexComponent';
import PropTypes from 'prop-types';

export const STATIC_URL = window.MetricsMentor.staticUrl;

export const GraphCoefficients = ({
    intercept, slope, stderror, plotType, slopes, stderrs,
    intercept3d, n, corr2d, corr3d
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
                        Resulting graph coefficients</h2>
                </header>
                {plotType === '2d' && (
                    <div className="simulation__step-content">
                        <div className="prompt-block">
                            <div className="prompt-gfx">
                                <img src={`${STATIC_URL}/img/icon-bell.svg`}
                                    className="prompt-img"
                                    alt="Lightbulb icon: Learning goals" />
                            </div>
                            <p className="mb-0">
                                Observe how the linear regression coefficients
                                change as you continue to adjust <Katex
                                    tex={'n'} className="katex-inline" /> and
                                <Katex tex={'\\text{corr}(x,y)'}
                                    className="katex-inline" />.
                            </p>
                        </div>
                        <h2>Regression line equation:</h2>
                        <div className="sub-content">
                            <div className="katex-block">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x'} />
                            </div>
                            <div className="katex-block">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    `\\hat{y} = ${intercept.toFixed(3)} + ${slope.toFixed(3)}x`} />
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"><Katex tex={'n'} /></th>
                                    <th scope="col"><Katex
                                        tex={'\\text{corr}(x,y)'} /></th>
                                    <th scope="col"><Katex
                                        tex={'\\hat{\\beta_1}'} /></th>
                                    <th scope="col"><Katex
                                        tex={'{SE(\\hat{\\beta_1})}'} /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Katex tex={`${n}`} /></td>
                                    <td><Katex
                                        tex={`${corr2d.toFixed(3)}`} /></td>
                                    <td><Katex
                                        tex={`${slope.toFixed(3)}`} /></td>
                                    <td><Katex
                                        tex={`${stderror.toFixed(3)}`} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {(plotType === '3d' && slopes.length > 0) && (
                    <div className="simulation__step-content">
                        <p>
                        Observe how the regression coefficients, and the plane
                        on the graph change as you continue to adjust
                            <Katex tex={'\\text{corr}(x_1,x_2).'}
                                className="katex-inline" />
                        </p>
                        <h2>
                            Multiple Regression line equation:
                        </h2>
                        <div className="sub-content">
                            <div className="katex-block">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + \\hat{\\beta_2}x_2'
                                } />
                            </div>
                            <div className="katex-block">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    `\\hat{y} = ${intercept3d.toFixed(3)} + ${slopes[0].toFixed(3)}x_1 + ${slopes[1].toFixed(3)}x_2`
                                } />
                            </div>
                        </div>
                        <h2>Sample slope coefficients:</h2>
                        <div className="sub-content">
                            <div className="katex-block">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    `\\hat{\\beta_1} = ${slopes[0].toFixed(3)}`} />
                            </div>
                            <div className="katex-block">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    `\\hat{\\beta_2} = ${slopes[1].toFixed(3)}`} />
                            </div>
                        </div>
                        <h2>
                            Standard error of the sample slope:
                        </h2>
                        <div className="sub-content">
                            <div className="katex-block">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    `{SE(\\hat{\\beta_1})} = ${stderrs[0].toFixed(3)}`} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

GraphCoefficients.propTypes = {
    intercept: PropTypes.number,
    slope: PropTypes.number,
    stderror: PropTypes.number,
    plotType: PropTypes.string,
    slopes: PropTypes.array,
    stderrs: PropTypes.array,
    intercept3d: PropTypes.number,
    n: PropTypes.number,
    corr2d: PropTypes.number,
    corr3d: PropTypes.number
};