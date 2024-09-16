import React from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';

export const STATIC_URL = window.MetricsMentor.staticUrl;


export const SimIntro = ({plotType}) => {
    return (
        <>
            <div className="simulation__step-container d-flex">
                <div className="simulation__step-num">
                &bull;
                </div>
                <div className="simulation__step-toggle--down">
                </div>
                <div className="simulation__step-body">
                    <header className="simulation__step-header">
                        <h2 className="h2-primary">
                            <span className="h2-secondary d-block">
                            Simulation 1</span>
                            <span className="h2-title d-block">
                                {'Hypothesis Testing for Population Slope'}
                            </span>
                        </h2>
                    </header>
                    <div className="simulation__step-content">
                        <p>
                            In this simulation, you&rsquo;ll learn about
                            hypothesis testing for the population slope
                            in simple and multiple regression models.
                            You&rsquo;ll be able to visualize the relationship
                            between two, or three variables, and generate
                            data to test the null hypothesis that the
                            population slope is equal to a specified value.
                        </p>
                        <p>
                            This glossary will help you review
                            the key terms used here.
                        </p>
                        <button
                            className="btn btn-sm btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#glossaryModal">
                        Glossary
                        </button>
                    </div>
                </div>
            </div>
            <div className="simulation__step-container d-flex">
                <div className="simulation__step-num tip-on">
                    <img src={`${STATIC_URL}/img/icon-lightbulb-regular.svg`}
                        className="simulation__step-icon"
                        alt="Lightbulb icon: Learning goals" />
                </div>
                <div className="simulation__step-toggle--down">
                </div>
                <div className="simulation__step-body">
                    <header className="simulation__step-header">
                        <h2 className="h2-primary" id="learningGoal">
                            Learning goals</h2>
                    </header>
                    {plotType === '2d' && (
                        <div className="simulation__step-content">
                            <p>
                                The sample size <Katex tex={'n'}
                                    className="katex-inline"/> and the
                                correlation between the dependent variable
                                <Katex tex={'y'}
                                    className="katex-inline"/> and the
                                independent variable <Katex tex={'x'}
                                    className="katex-inline"/> can
                                significantly influence the outcomes of your
                                hypothesis tests about the population
                                parameters.
                            </p>
                            <p>
                                Consider how the choice of the correlation
                                coefficient <Katex tex={'\\text{corr}(x,y)'}
                                    className="katex-inline"/> and/or the
                                sample size can influence your decision
                                regarding the null hypothesis.
                            </p>
                        </div>

                    )}
                    {plotType === '3d' && (
                        <div className="simulation__step-content">
                            <p>
                                Let&rsquo;s move on from the simple
                                regression (2D) to multiple regression (3D)
                                section of this simulation.
                            </p>
                            <p>
                                In this part, there are two independent
                                variables (regressors),
                                <Katex tex={'x_1'}
                                    className="katex-inline"/> and
                                <Katex tex={'x_2'}
                                    className="katex-inline"/>.
                                You&rsquo;ve already decided on
                                <Katex tex={'corr(x_1,y)'}
                                    className="katex-inline"/> in the preceding
                                section. Here, you can select
                                the degree of correlation between
                                <Katex tex={'x_1'}
                                    className="katex-inline"/> and
                                <Katex tex={'x_2'}
                                    className="katex-inline"/>.
                            </p>
                            <p>
                                How does this correlation influence your
                                decision about the null hypothesis you used
                                previously?
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

SimIntro.propTypes = {
    plotType: PropTypes.string
};
