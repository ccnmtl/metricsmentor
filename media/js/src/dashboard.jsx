import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Footer } from './footer';

// const isSuperUser = window.MetricsMentor.currentUser.is_superuser;

export const Dashboard = () => {

    let { courseId } = useParams();

    return (
        <>
            <section className="section-sim-dashboard">
                <div className="row">
                    <div
                        className="col-lg-5
                            p-4 mx-0
                            mx-lg-3 my-3
                            mx-lg-0
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
                        <p>In this module, you will learn about
                            hypothesis testing for the population slope
                            in a simple linear regression model. You will
                            be able to visualize the relationship between
                            two variables and generate data to test the
                            null hypothesis that the population slope is
                            equal to a specified value.</p>
                        <Link to={`/course/${courseId}/simulations/1/`}
                            className="btn btn-primary my-3"
                            data-cy="sim-1-link">
                            Begin &raquo;
                        </Link>
                    </div>
                    <div
                        className="col-lg-5
                            p-4 mx-0
                            mx-lg-3 my-3
                            mx-lg-0
                            simulation-card">
                        <h2 className="h2-primary">
                            <span className="h2-secondary d-block"
                                data-cy="sim-2">
                                Simulation 2</span>
                            <span className="h2-title d-block">
                                {'Omitted Variable Bias'}
                            </span>
                        </h2>
                        <p>In this module, we will address the first
                            endogeneity problem in regression analysis:
                            omitted variable bias (OVB). Overlooking certain
                            variables can lead to biased estimates of the
                            sample slope of the variable of interest. Through
                            interactive exercises and examples, you&rsquo;ll
                            learn how to detect and correct for OVB in your
                            econometric analysis, ensuring that your findings
                            are both reliable and valid.</p>

                        <Link to={`/course/${courseId}/simulations/2/`}
                            className="btn btn-primary my-3"
                            data-cy="sim-2-link">
                            Begin &raquo;
                        </Link>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
