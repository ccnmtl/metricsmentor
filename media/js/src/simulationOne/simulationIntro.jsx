import React from 'react';
import PropTypes from 'prop-types';

export const SimIntro = ({plotType}) => {
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
                        <span className='h2-secondary d-block'>
                        Simulation 1</span>
                        <span className='h2-title d-block'>
                            {/* eslint-disable-next-line max-len */}
                            {'Hypothesis Testing for Population Slope'}
                        </span>
                    </h2>
                </header>
                <div className='simulation__step-content'>
                    <p>
                    In this module, we revisit hypothesis testing
                    and p-values, concepts you learned in your
                    prerequisite Statistics course. Through the use
                    of generated data, you will have the opportunity
                    to review the methodology involved in hypothesis
                    testing, including the interpretation of
                    p-values and critical values.
                    </p>
                </div>
            </div>
        </div>
    );
};

SimIntro.propTypes = {
    plotType: PropTypes.string
};
