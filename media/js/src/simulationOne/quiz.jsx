import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { PvalueComponent } from './pvalueComponent.jsx';
import { CriticalValue } from './criticalValue.jsx';


export const Quiz = ({
    tvalue, pvalue, alpha, hypothesisTest, hypothesis,
    nullHypothesis, n, onComplete, completedChoices, submissionId,
    plotType,
}) => {
    // eslint-disable-next-line max-len
    const [hypothesisTest1validate, setHypothesisTest1validate] = useState(null);
    // eslint-disable-next-line max-len
    const [hypothesisTest2validate, setHypothesisTest2validate] = useState(null);
    const [criticalValues, setCriticalValues] = useState(null);

    useEffect(() => {
        calculateCriticalValue();
        document.getElementById('quiz')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

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

    useEffect(() => {
        if (hypothesisTest1validate) {
            document.getElementById('criticalvalue')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [hypothesisTest1validate]);

    const isNotTwoSided = hypothesisTest !== 'value_two_sided';

    return (
        <div id="quiz">
            {hypothesisTest === 'value_two_sided' && (
                <PvalueComponent
                    pvalue={pvalue}
                    hypothesisTest1validate={hypothesisTest1validate}
                    setHypothesisTest1validate={setHypothesisTest1validate}
                    tvalue={tvalue}
                    alpha={alpha}
                    hypothesis={hypothesis}
                    nullHypothesis={nullHypothesis}
                    plotType={plotType}
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
                    n={n}
                    hypothesisTest2validate={hypothesisTest2validate}
                    setHypothesisTest2validate={setHypothesisTest2validate}
                    onComplete={onComplete}
                    submissionId={submissionId}
                    plotType={plotType} />
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
    onComplete: PropTypes.func.isRequired,
    completedChoices: PropTypes.array.isRequired,
    submissionId: PropTypes.number.isRequired,
    plotType: PropTypes.string,
};
