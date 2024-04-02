import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';

export const Quiz = ({
    appRvalue, tvalue, pvalue, alpha, hypothesisTest, hypothesis,
    nullHypothesis
}) => {

    const [userPvalue, setUserPvalue] = useState('');
    const [comparison, setComparison] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [decision, setDecision] = useState(null);

    const handleUserPvalueChange = (event) => {
        const newValue = parseFloat(event.target.value);
        setUserPvalue(newValue);
    };

    const handleComparisonChange = (event) => {
        const newValue = event.target.value;
        setComparison(newValue);
        validateComparison(newValue);
    };

    const handleDecisionChange = (event) => {
        setDecision(event.target.value);
    };

    const validateComparison = (value) => {
        if ((value === 'greaterThan') && (pvalue > alpha)) {
            setIsCorrect(true);
        } else if ((value === 'lessThan') && (pvalue < alpha)) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const pvaluecheck = userPvalue === pvalue;

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
                            checked={comparison === 'greaterThan'}
                            onChange={handleComparisonChange}
                        />
                        <label htmlFor='pGreaterThanAlpha'>
                        p &gt; alpha
                            {comparison === 'greaterThan' && !isCorrect &&

                            <span style={{ color: 'red' }}>Incorrect</span>
                            }
                        </label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='pLessThanAlpha'
                            name='comparison'
                            value='lessThan'
                            checked={comparison === 'lessThan'}
                            onChange={handleComparisonChange}
                        />
                        <label htmlFor='pLessThanAlpha'>p &lt; alpha
                            {comparison === 'lessThan' && !isCorrect &&

                            <span style={{ color: 'red' }}>Incorrect</span>
                            }
                        </label>
                    </div>
                </div>//compare-p-to-alpha
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
                            checked={decision === 'failToReject'}
                            onChange={handleDecisionChange}
                        />
                        <label htmlFor='failToRejectHypothesis'>
                            Fail to Reject the Null Hypothesis</label>
                    </div>
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
