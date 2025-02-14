import React from 'react';
import PropTypes from 'prop-types';

const STATIC_URL = window.MetricsMentor.staticUrl;

export const Step = (props) => {

    const learningGoals = props.title === 'Learning Goals';

    return (
        <div className="simulation__step-container d-flex">
            <div className={`simulation__step-num 
                        ${learningGoals ? 'tip-on' : ''}`}>
                {learningGoals ?
                    <img src={`${STATIC_URL}/img/icon-goal.svg`}
                        className="simulation__step-icon"
                        alt="Lightbulb icon: Learning goals" />
                    : <>&bull;</>
                }
            </div>
            <div className="simulation__step-toggle--down">
            </div>
            <div className="simulation__step-body">
                <header className="simulation__step-header">
                    <h2 className="h2-primary">
                        {props.header ? <>
                            <span className="h2-secondary d-block">
                                {props.header}
                            </span>
                            <span className="h2-title d-block">
                                {props.title}
                            </span>
                        </> : props.title}
                    </h2>
                </header>
                <div className="simulation__step-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};


Step.propTypes = {
    header: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};