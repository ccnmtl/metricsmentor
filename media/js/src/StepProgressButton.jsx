import React from 'react';
import PropTypes from 'prop-types';

export const StepProgressButton = ({
    progress, stage, setProgress, continueLabel, reviewLabel, children,
    progressNumber
}) => {
    const handleProgress = (val) => {
        setProgress(progress.map((x, i) => i === stage ? val : x));
    };

    return (
        <>
            {progress[stage] < progressNumber && (
                <>
                    {children}
                    <div className="simulation__step-prompt">
                        <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleProgress(progressNumber)}>
                            {continueLabel}
                        </button>
                    </div>
                </>
            )}
            {progress[stage] >= progressNumber && (
                <div className="simulation__step-prompt">
                    <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleProgress(progressNumber - 1)}>
                        {reviewLabel}
                    </button>
                </div>
            )}
        </>
    );
};

StepProgressButton.propTypes = {
    progress: PropTypes.arrayOf(PropTypes.number).isRequired,
    stage: PropTypes.number.isRequired,
    setProgress: PropTypes.func.isRequired,
    continueLabel: PropTypes.string,
    reviewLabel: PropTypes.string,
    children: PropTypes.node,
    progressNumber: PropTypes.number
};