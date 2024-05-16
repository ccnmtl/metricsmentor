import React from 'react';
import PropTypes from 'prop-types';

export const Sim2Intro = ({plotType}) => {
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
                        <span className="h2-secondary d-block">
                        Simulation 2</span>
                        <span className="h2-title d-block">
                            {'Hypothesis Testing for Population Slope'}
                        </span>
                    </h2>
                </header>
                {plotType === '2d' && (
                    <div className="simulation__step-content">
                        <p>
                            Welcome to Simulation 2! The first endogeneity
                            problem we will tackle in regression analysis is
                            omitted variable bias (OVB). Failing to account
                            for some variables can bias your sample slope of
                            the variable of interest. Through interactive
                            exercises and examples, you will learn how to
                            identify and address OVB in your econometric
                            analysis, ensuring the reliability and validity of
                            your findings.
                        </p>
                    </div>
                )}
                {plotType === '3d' && (
                    <div className="simulation__step-content">
                        <p>
                            3D Placeholder
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

Sim2Intro.propTypes = {
    plotType: PropTypes.string
};
