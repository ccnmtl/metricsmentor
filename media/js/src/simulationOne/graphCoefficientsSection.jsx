import React from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';

export const GraphCoefficients = ({
    intercept, slope, stderror, plotType, slopes, stderrs,
    onShowNullHypothesis, intercept3d
}) => {
    const handleNextClick = () => {
        onShowNullHypothesis();
    };

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
                        Resulting Graph Coefficients</h2>
                </header>
                {plotType === '2d' && (
                    <div className="simulation__step-content">
                        <p>
                            Observe how the linear regression
                            coefficients change as you continue to
                            adjust
                            <Katex tex={'n'} className="katex-inline" /> and
                            <Katex tex={'\\text{corr}(x,y)'}
                                className="katex-inline" />.
                        </p>
                        <h2 className="mt-4">Regression line equation:</h2>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x'} />
                        </div>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                `\\hat{y} = ${intercept.toFixed(3)} + ${slope.toFixed(3)}x`} />
                        </div>
                        <h2 className="mt-4">Sample slope coefficient:</h2>
                        <div className="ms-3">
                            <Katex tex={
                                `\\hat{\\beta_1} = ${slope.toFixed(3)}`} />
                        </div>
                        <h2 className="mt-4">
                            Standard error of the sample slope:
                        </h2>
                        <div className="ms-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                `{SE(\\hat{\\beta_1})} = ${stderror.toFixed(3)}`} />
                        </div>
                        <div className="simulation__step-prompt">
                            <button className="btn btn-primary mt-3"
                                data-cy="nullNextButton"
                                onClick={handleNextClick}>
                                    Continue &raquo;
                            </button>
                        </div>
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
                        <h2 className="mt-4">
                            Multiple Regression line equation:
                        </h2>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + \\hat{\\beta_2}x_2'
                            } />
                        </div>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                `\\hat{y} = ${intercept3d.toFixed(3)} + ${slopes[0].toFixed(3)}x_1 + ${slopes[1].toFixed(3)}x_2`
                            } />
                        </div>
                        <h2 className="mt-4">Sample slope coefficients:</h2>
                        <div className="ms-3">
                            <Katex tex={
                                `\\hat{\\beta_1} = ${slopes[0].toFixed(3)}`} />
                            <Katex tex={
                                `\\hat{\\beta_2} = ${slopes[1].toFixed(3)}`} />
                        </div>
                        <h2 className="mt-4">
                            Standard error of the sample slope:
                        </h2>
                        <div className="ms-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                `{SE(\\hat{\\beta_1})} = ${stderrs[0].toFixed(3)}`} />
                        </div>
                        <div className="simulation__step-prompt">
                            <button className="btn btn-primary mt-3"
                                data-cy="nullNextButton"
                                onClick={handleNextClick}>
                                    Continue &raquo;
                            </button>
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
    onShowNullHypothesis: PropTypes.func,
    intercept3d: PropTypes.number
};