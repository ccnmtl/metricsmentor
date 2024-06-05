import React from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';

export const GraphCoefficients = ({
    intercept, slope, stderror, appRvalue, plotType, slopes, stderrs,
    onShowNullHypothesis
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
                            The graph generated with the parameters
                            you&rsquo;ve defined produces the following
                            coefficients. Observe how the linear regression
                            coefficients change as you continue to
                            adjust
                            <div className="katex-inline">
                                <Katex tex={`n`} />
                            </div> and
                            <div className="katex-inline">
                                <Katex tex={`corr(x,y)`} />
                            </div>.
                        </p>
                        <h2 className="mt-4">Regression line equation:</h2>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x'
                            } />
                        </div>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                `\\hat{y} = ${intercept.toFixed(3)} + ${slope.toFixed(3)}x`
                            } />
                        </div>
                        <h2 className="mt-4">Sample
                            <div className="katex-inline">
                                <Katex tex={`y\\text{\\textendash}intercept`} />
                            </div> coefficient:
                        </h2>
                        <div className="ms-3">
                            <Katex tex={
                                `\\hat{\\beta_0} = ${intercept.toFixed(3)}`
                            } />
                        </div>
                        <h2 className="mt-4">Sample slope coefficient:</h2>
                        <div className="ms-3">
                            <Katex tex={
                                `\\hat{\\beta_1} = ${slope.toFixed(3)}`
                            } />
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
                        3D scatter plot Placeholder
                        </p>
                        <h2 className="mt-4">Regression line equation:</h2>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1 + \\hat{\\beta_2}x_2'
                            } />
                        </div>
                        <div className="ms-3 mb-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                `\\hat{y} = ${intercept.toFixed(3)} + ${slopes[0].toFixed(3)}x_1 + ${slopes[1].toFixed(3)}x_2`
                            } />
                        </div>
                        <h2 className="mt-4">Sample
                            <div className="katex-inline">
                                <Katex tex={`y\\text{\\textendash}intercept`} />
                            </div> coefficient:
                        </h2>
                        <div className="ms-3">
                            <Katex tex={
                                `\\hat{\\beta_0} = ${intercept.toFixed(3)}`
                            } />
                        </div>
                        <h2 className="mt-4">Sample slope
                                    coefficients:</h2>
                        <div className="ms-3">
                            <Katex tex={
                                `\\hat{\\beta_1} = ${slopes[0].toFixed(3)}`
                            } />
                            <Katex tex={
                                `\\hat{\\beta_2} = ${slopes[1].toFixed(3)}`
                            } />
                        </div>
                        <h2 className="mt-4">Standard error of
                                the sample slope:</h2>
                        <div className="ms-3">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                `{SE(\\hat{\\beta_1})} = ${stderrs[0].toFixed(3)}`} />
                        </div>
                        <button className="btn btn-primary mt-3"
                            onClick={handleNextClick}> Next
                        </button>
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
    appRvalue: PropTypes.number,
    plotType: PropTypes.string,
    slopes: PropTypes.array,
    stderrs: PropTypes.array,
    onShowNullHypothesis: PropTypes.func
};