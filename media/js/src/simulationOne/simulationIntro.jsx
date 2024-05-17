import React from 'react';
import PropTypes from 'prop-types';

export const SimIntro = ({plotType}) => {
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
                        Simulation 1</span>
                        <span className="h2-title d-block">
                            {'Hypothesis Testing for Population Slope'}
                        </span>
                    </h2>
                </header>
                {plotType === '2d' && (
                    <div className="simulation__step-content">
                        <p>
                            In this module, you will learn about
                            hypothesis testing for the population slope
                            in a simple linear regression model. You will
                            be able to visualize the relationship between
                            two variables and generate data to test the
                            null hypothesis that the population slope is
                            equal to a specified value.
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

SimIntro.propTypes = {
    plotType: PropTypes.string
};
