import React from 'react';
import PropTypes from 'prop-types';


export const SimulationStep = ({
    icon, segment, stepNumber, headerId, subtitle, title, content
}) => (
    <div className="simulation__step-container d-flex">
        <div className={`simulation__step-num 
                        ${icon ? 'tip-on' : ''}`}>
            {icon ? (
                <img src={icon} className="simulation__step-icon"
                    alt="Lightbulb icon: Learning goals" />
            ) : (
                stepNumber || '•'
            )}
        </div>
        <div className="simulation__step-toggle--down" />
        <div className="simulation__step-body">
            <header className="simulation__step-header">
                <h2 className="h2-primary" id={headerId}>
                    {subtitle &&
                        <span className="h2-secondary d-block">
                            {subtitle}
                        </span>
                    }
                    {segment ? (
                        <span className="h2-title d-block">{title}</span>
                    ) : (
                        title
                    )}
                </h2>
            </header>
            <div className="simulation__step-content">
                {content}
            </div>
        </div>
    </div>
);


SimulationStep.propTypes = {
    icon: PropTypes.string,
    segment: PropTypes.string,
    stepNumber: PropTypes.string,
    headerId: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired
};