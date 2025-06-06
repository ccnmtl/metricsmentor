import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Footer } from '../footer';
import PropTypes from 'prop-types';
import { Katex } from '../utils/katexComponent';
import { getCoursePk } from '../utils/utils';


export const Dashboard = ({ isSuperUser, isFaculty}) => {

    let { courseId } = useParams();
    const coursePk = getCoursePk();

    return (
        <>
            <section className="section-sim-dashboard">
                <div className="row">
                    <div className="col-lg-5 p-4 mx-0 mx-lg-3 my-3 mx-lg-0
                                        simulation-card">
                        <h2 className="h2-primary">
                            <span className="h2-secondary d-block"
                                data-cy="sim-1">
                                    Simulation 1
                            </span>
                            <span className="h2-title d-block">
                                {'Hypothesis Testing for Population Slope'}
                            </span>
                        </h2>
                        <p>
                                In this simulation, you&rsquo;ll conduct
                                hypothesis testing for the population slope
                                in simple and multiple regression models. Using
                                generated data, you&rsquo;ll review the
                                methodology involved in hypothesis testing,
                                including the interpretation of
                                of <Katex tex={'p'}
                                className="katex-inline" />-values
                                and <Katex tex={'critical~values'}
                                className="katex-inline"/>
                        </p>
                        <Link to={`/course/${courseId}/simulations/1/`}
                            className="btn btn-success my-3"
                            data-cy="sim-1-link">
                                Begin &raquo;
                        </Link>
                    </div>
                    <div className="col-lg-5 p-4 mx-0 mx-lg-3 my-3 mx-lg-0
                                        simulation-card">
                        <h2 className="h2-primary">
                            <span className="h2-secondary d-block"
                                data-cy="sim-2">
                                    Simulation 2</span>
                            <span className="h2-title d-block">
                                {'Omitted Variable Bias'}
                            </span>
                        </h2>
                        <p>
                                This simulation will address one of the
                                endogeneity problems: omitted variable bias (OVB).{/* eslint-disable-line max-len */}
                                Omitting certain variables can lead to biased
                                estimates of the sample slope of the variable of
                                interest in regression analyses. Through
                                interactive exercises, you&rsquo;ll learn how to
                                detect the degree of OVB.
                        </p>
                        <Link to={`/course/${courseId}/simulations/2/`}
                            className="btn btn-success my-3"
                            data-cy="sim-2-link">
                                Begin &raquo;
                        </Link>
                    </div>
                    <div className="col-lg-5 p-4 mx-0 mx-lg-3 my-3 mx-lg-0
                                        simulation-card">
                        <h2 className="h2-primary">
                            <span className="h2-secondary d-block"
                                data-cy="sim-3">
                                    Simulation 3</span>
                            <span className="h2-title d-block">
                                {'Standard Errors'}
                            </span>
                        </h2>
                        <p>
                                This simulation explores two common issues that
                                affect the standard error of the sample
                                slope, <Katex tex={'{SE(\\hat{\\beta_1})}'}
                                className="katex-inline" />, in regression
                                analysis: <i>Heteroskedasticity</i> and
                            <i> Multicollinearity</i>. It demonstrates
                                how to identify and understand their impact on
                                the standard error of the sample slope.
                        </p>

                        <Link to={`/course/${courseId}/simulations/3/`}
                            className="btn btn-success my-3"
                            data-cy="sim-3-link">
                                    Begin &raquo;
                        </Link>
                    </div>
                    {(isSuperUser || isFaculty || coursePk === 6) && (
                        <div className="col-lg-5 p-4 mx-0 mx-lg-3 my-3 mx-lg-0
                                        simulation-card">
                            <h2 className="h2-primary">
                                <span className="h2-secondary d-block"
                                    data-cy="sim-4">
                                    Simulation 4</span>
                                <span className="h2-title d-block">
                                    {'Non-Linear Regression'}
                                </span>
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                                Donec euismod, nisl eget consectetur
                                adipiscing, nisl nunc euismod nisi,
                                vitae euismod nunc, quis
                                euismod nisi euismod nunc, quis
                                euismod nisi euismod nunc, quis
                            </p>

                            <Link to={`/course/${courseId}/simulations/4/`}
                                className="btn btn-success my-3"
                                data-cy="sim-4-link">
                                    Begin &raquo;
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

Dashboard.propTypes = {
    isSuperUser: PropTypes.bool,
    isFaculty: PropTypes.bool
};