import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { PvalueComponent } from './pvalueComponent.jsx';
import { CriticalValue } from './criticalValue.jsx';


export const Quiz = ({
    tvalue, pvalue, alpha, hypothesisTest, hypothesis,
    nullHypothesis, n, completedChoices, submissionId,
    plotType, isRedo, setIsRedo, setIsHypothesisCompleted, isHypothesisCompleted
}) => {
    // eslint-disable-next-line max-len
    const [hypothesisTest1validate, setHypothesisTest1validate] = useState(null);
    // eslint-disable-next-line max-len
    const [hypothesisTest2validate, setHypothesisTest2validate] = useState(null);
    const [criticalValues, setCriticalValues] = useState(null);

    // Critical Value Logic
    const calculateCriticalValue = async() => {
        try {
            const response = await axios.post('/calculate_critical/',
                {n, alpha});

            setCriticalValues(response.data);

        } catch (error) {
            console.error('Error calculating critical value:', error);
        }
    };

    const handleRedo = (e) => {
        e.preventDefault();
        setIsRedo(true);
    };

    const handleOnComplete = () => {
        setIsHypothesisCompleted(true);
    };

    const isNotTwoSided = hypothesisTest !== 'value_two_sided';

    useEffect(() => {
        if (hypothesisTest1validate) {
            document.getElementById('criticalvalue')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [hypothesisTest1validate]);

    useEffect(() => {
        calculateCriticalValue();
        document.getElementById('quiz')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

    return (
        <div id="quiz">
            {hypothesisTest === 'value_two_sided' && (
                <PvalueComponent
                    pvalue={pvalue}
                    hypothesisTest1validate={hypothesisTest1validate}
                    setHypothesisTest1validate={setHypothesisTest1validate}
                    tvalue={tvalue}
                    alpha={alpha}
                    hypothesisTest={hypothesisTest}
                    hypothesis={hypothesis}
                    nullHypothesis={nullHypothesis}
                    plotType={plotType}
                    isRedo={isRedo}
                    submissionId={submissionId} />
            )}
            {(hypothesisTest1validate || isNotTwoSided) && (
                <CriticalValue
                    tvalue={tvalue}
                    criticalValues={criticalValues}
                    alpha={alpha}
                    hypothesisTest={hypothesisTest}
                    hypothesis={hypothesis}
                    nullHypothesis={nullHypothesis}
                    isRedo={isRedo}
                    n={n}
                    hypothesisTest2validate={hypothesisTest2validate}
                    setHypothesisTest2validate={setHypothesisTest2validate}
                    submissionId={submissionId}
                    plotType={plotType} />
            )}
            {hypothesisTest2validate && (
                <div className="simulation__step-sim-complete">
                    <p className="mt-3">
                        You&rsquo;ve completed this hypothesis test.
                    </p>
                    <div className="row text-right">
                        <div className="col-6 text-center">
                            {!isRedo && (
                                <button className= "btn btn-sm btn-success"
                                    id="redo"
                                    disabled={isHypothesisCompleted}
                                    onClick={handleRedo}>
                                    &laquo; Try this again?
                                </button>
                            )}
                        </div>
                        <div className="col-6 text-left">
                            <button className= "btn btn-sm btn-success"
                                id="proceed"
                                disabled={isHypothesisCompleted}
                                onClick={handleOnComplete}>
                                    Let&rsquo;s move on &raquo;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Quiz.propTypes = {
    tvalue: PropTypes.number.isRequired,
    pvalue: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    hypothesisTest: PropTypes.string.isRequired,
    hypothesis: PropTypes.string.isRequired,
    nullHypothesis: PropTypes.string.isRequired,
    n: PropTypes.number.isRequired,
    completedChoices: PropTypes.array.isRequired,
    submissionId: PropTypes.number.isRequired,
    plotType: PropTypes.string,
    isRedo: PropTypes.bool,
    setIsRedo: PropTypes.func,
    setIsHypothesisCompleted: PropTypes.func,
    isHypothesisCompleted: PropTypes.bool,
};
