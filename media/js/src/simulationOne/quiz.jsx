import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';

export const Quiz = ({
    appRvalue, tvalue, pvalue, alpha, hypothesisTest, hypothesis,
    nullHypothesis
}) => {

    const [userPvalue, setUserPvalue] = useState('');
    const [comparison, setComparison] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [decision, setDecision] = useState(null);
    const [evaluation, setEvaluation] = useState(null);


    const handleUserPvalueChange = (e) => {
        // Allow number and decimal point
        const value = e.target.value.replace(/[^\d.-]/g, '');

        // Make sure there is only one decimal point
        const decimalCount = value.split('.').length - 1;
        if (decimalCount > 1) return;

        // Check that the negative is at the beginning of the number
        const negativeCount = value.split('-').length - 1;
        if (negativeCount > 1 ||
            (negativeCount === 1 && value.indexOf('-') !== 0))
        {
            return;
        }

        setUserPvalue(value);
    };

    const handleComparisonChange = (event) => {
        const newValue = event.target.value;
        setComparison(newValue);
        validateComparison(newValue);
    };

    const handleDecisionChange = (event) => {
        setDecision(event.target.value);
        validateDecision(event.target.value);
    };

    const validateComparison = (value) => {
        setIsCorrect(value === (pvalue < alpha ? 'lessThan' : 'greaterThan'));
    };

    const validateDecision = (value) => {
        const correctDecision =
        (pvalue < alpha && value === 'reject') ||
                    (pvalue > alpha && value === 'failToReject');

        setEvaluation((correctDecision ? 'correct' : 'incorrect'));
    };

    const pvaluecheck = parseFloat(userPvalue) === pvalue;

    return (
        <div className='solving-p-set border border-primary p-3 mt-3'>
            <div className='input-p'>
                <p>Look up p value for t-stat</p>
                p value from table:
                <div>
                    <label htmlFor='pValue'>p = </label>
                    <input
                        type='text'
                        id='pValue'
                        value={userPvalue}
                        disabled={pvaluecheck}
                        onChange={handleUserPvalueChange}
                        style={{border: pvaluecheck ? '2px solid green'
                            : '2px solid red'}}
                    />
                </div>
            </div>{/*input-p*/}
            {pvaluecheck && (
                <div className='p-to-alpha border border-warning p-3 mt-3'>
                Comparing p values to &alpha;:
                    <div>
                        <input
                            type='radio'
                            id='pGreaterThanAlpha'
                            name='comparison'
                            value='greaterThan'
                            disabled={isCorrect}
                            checked={comparison === 'greaterThan'}
                            onChange={handleComparisonChange}
                        />
                        <label htmlFor='pGreaterThanAlpha'>
                        p &gt; alpha
                        </label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='pLessThanAlpha'
                            name='comparison'
                            value='lessThan'
                            disabled={isCorrect}
                            checked={comparison === 'lessThan'}
                            onChange={handleComparisonChange}
                        />
                        <label htmlFor='pLessThanAlpha'>p &lt; alpha
                        </label>
                    </div>
                </div>//compare-p-to-alpha
            )}
            {isCorrect && (
                <div>
                    <span style={{ color: 'green' }}>Correct</span>
                </div>
            )}

            {!isCorrect && isCorrect !== null && (
                <div>
                    <span style={{ color: 'red' }}>Incorrect</span>
                </div>
            )}

            {isCorrect && (
                <div className='p-val-concl border border-info p-3 mt-3'>
                    <Katex tex={nullHypothesis} />
                    <Katex tex={hypothesis} />
                    <div>
                        <input
                            type='radio'
                            id='rejectHypothesis'
                            name='decision'
                            value='reject'
                            disabled={evaluation === 'correct'}
                            checked={decision === 'reject'}
                            onChange={handleDecisionChange}
                        />
                        <label htmlFor='rejectHypothesis'>
                            Reject the Null Hypothesis</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='failToRejectHypothesis'
                            name='decision'
                            value='failToReject'
                            disabled={evaluation === 'correct'}
                            checked={decision === 'failToReject'}
                            onChange={handleDecisionChange}
                        />
                        <label htmlFor='failToRejectHypothesis'>
                            Fail to Reject the Null Hypothesis</label>
                    </div>
                    {evaluation && (
                        <div>
                            {evaluation === 'correct' ? (
                                <span style={{ color: 'green' }}>Correct</span>
                            ) : (
                                <span style={{ color: 'red' }}>Incorrect</span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>//solving-p-set
    );
};

Quiz.propTypes = {
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.number.isRequired,
    pvalue: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    hypothesisTest: PropTypes.string.isRequired,
    hypothesis: PropTypes.string.isRequired,
    nullHypothesis: PropTypes.string.isRequired,
};
