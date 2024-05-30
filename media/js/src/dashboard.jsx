import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Footer } from './footer';

export const Dashboard = () => {

    let { courseId } = useParams();

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="card m-1" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title" data-cy="sim-1">
                            Simulation 1</h5>
                            <p className="card-text">
                            In this module, you will learn about
                            hypothesis testing for the population slope
                            in a simple linear regression model. You will
                            be able to visualize the relationship between
                            two variables and generate data to test the
                            null hypothesis that the population slope is
                            equal to a specified value.
                            </p>
                            <Link to={`/course/${courseId}/simulations/1/`}
                                className="btn btn-primary"
                                data-cy="sim-1-link">
                                    Go
                            </Link>
                        </div>
                    </div>
                    <div className="card m-1" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title" data-cy="sim-2">
                            Simulation 2</h5>
                            <p className="card-text">
                            In this module, the first endogeneity
                            problem we will tackle in regression analysis is
                            omitted variable bias (OVB). Failing to account
                            for some variables can bias your sample slope of
                            the variable of interest. Through interactive
                            exercises and examples, you will learn how to
                            identify and address OVB in your econometric
                            analysis, ensuring the reliability and validity of
                            your findings.
                            </p>
                            <Link to={`/course/${courseId}/simulations/2/`}
                                className="btn btn-primary"
                                data-cy="sim-2-link">
                                    Go
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
