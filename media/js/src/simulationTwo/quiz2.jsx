import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';
import axios from 'axios';

export const Quiz2 = ({
    appRvalue, tvalue, pvalue, alpha, hypothesisTest, hypothesis,
    nullHypothesis, n, onComplete, completedChoices
}) => {

    const [criticalValues, setCriticalValues] = useState(null);
    const [userPvalue, setUserPvalue] = useState('');
    const [pvalueComparison, setPvalueComparison] = useState(null);
    const [isPvalCompareCorrect, setIsPvalCompareCorrect] = useState(null);
    // eslint-disable-next-line max-len
    const [nullHypothesisChoice1, setNullHypothesisChoice1] = useState(null);
    const [nullHypothesisChoice2, setNullHypothesisChoice2] = useState(null);
    // eslint-disable-next-line max-len
    const [hypothesisTest1validate, setHypothesisTest1validate] = useState(null);
    // eslint-disable-next-line max-len
    const [hypothesisTest2validate, setHypothesisTest2validate] = useState(null);
    const [userCriticalValue, setUserCriticalValue] = useState('');
    const [compareCritical, setCompareCritical] = useState(null);
    // eslint-disable-next-line max-len
    const [isCriticalCompareCorrect, setIsCriticalCompareCorrect] = useState(null);
    const [isCriticalValueCorrect, setIsCriticalValueCorrect] = useState(null);
    const [isPvalueCorrect, setIsPvalueCorrect] = useState(null);


    useEffect(() => {
        calculateCriticalValue();
    }, []);

    // P-Value Logic
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
        validatePvalue(value);
    };

    const handlePvalueComparisonChange = (event) => {
        const newValue = event.target.value;
        setPvalueComparison(newValue);
        validatePvalueComparison(newValue);
    };

    const validatePvalueComparison = (value) => {
        setIsPvalCompareCorrect(
            value === (pvalue < alpha ? 'lessThan' : 'greaterThan')
        );
    };

    const validatePvalue = (value) => {
        setIsPvalueCorrect(parseFloat(value) === pvalue);
    };

    const handleNullHypothesisChoice1Change = (event) => {
        setNullHypothesisChoice1(event.target.value);
        validateHypothesisTest1(event.target.value);
    };

    const validateHypothesisTest1 = (value) => {
        const correctDecision =
        (pvalue < alpha && value === 'reject') ||
                    (pvalue > alpha && value === 'failToReject');

        setHypothesisTest1validate((correctDecision));
    };


    // Critical Value Logic
    const calculateCriticalValue = async() => {

        try {
            const response = await axios.post('/calculate_critical/',
                {n, alpha});

            setCriticalValues(response.data);

        } catch (error) {
            console.error('Error calculating pvalue:', error);
        }
    };

    let criticalValue;
    if (criticalValues) {
        criticalValue = criticalValues[hypothesisTest];
    }

    const handleUserCriticalvalueChange = (e) => {
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

        setUserCriticalValue(value);
        validateCriticalValue(value);

    };

    const validateCriticalValue = (value) => {
        setIsCriticalValueCorrect(parseFloat(value) === criticalValue);
    };

    const handleComparingCritical = (event) => {
        const newValue = event.target.value;
        setCompareCritical(newValue);
        validateCriticalComparison(newValue);
    };

    const validateCriticalComparison = (value) => {
        const correctComparison =
        (Math.abs(tvalue) > criticalValue && value === 'greaterThan') ||
        (Math.abs(tvalue) <= criticalValue && value === 'lessThan');

        setIsCriticalCompareCorrect(correctComparison);
    };

    const handleNullHypothesisChoice2Change = (event) => {
        setNullHypothesisChoice2(event.target.value);
        validateHypothesisTest2(event.target.value);
    };

    const validateHypothesisTest2 = (value) => {
        const correctDecision =
        (Math.abs(tvalue) > criticalValue && value === 'reject') ||
                (Math.abs(tvalue) <= criticalValue && value === 'failToReject');

        setHypothesisTest2validate(correctDecision);

    };


    return (
        <>
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
                            disabled={isPvalueCorrect}
                            onChange={handleUserPvalueChange}
                        />
                    </div>
                </div>{/*input-p*/}
                {isPvalueCorrect && (
                    <div>
                        <span style={{ color: 'green' }}>Correct</span>
                    </div>
                )}
                {!isPvalueCorrect && isPvalueCorrect !== null && (
                    <div>
                        <span style={{ color: 'red' }}>Incorrect</span>
                    </div>
                )}

                {isPvalueCorrect && (
                    <div className='p-to-alpha border border-warning p-3 mt-3'>
                Comparing p values to &alpha;:
                        <div>
                            <input
                                type='radio'
                                id='pGreaterThanAlpha'
                                name='comparison'
                                value='greaterThan'
                                disabled={isPvalCompareCorrect}
                                checked={pvalueComparison === 'greaterThan'}
                                onChange={handlePvalueComparisonChange}
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
                                disabled={isPvalCompareCorrect}
                                checked={pvalueComparison === 'lessThan'}
                                onChange={handlePvalueComparisonChange}
                            />
                            <label htmlFor='pLessThanAlpha'>p &lt; alpha
                            </label>
                        </div>
                    </div>//compare-p-to-alpha
                )}
                {isPvalCompareCorrect && (
                    <div>
                        <span style={{ color: 'green' }}>Correct</span>
                    </div>
                )}

                {!isPvalCompareCorrect && isPvalCompareCorrect !== null && (
                    <div>
                        <span style={{ color: 'red' }}>Incorrect</span>
                    </div>
                )}

                {isPvalCompareCorrect && (
                    <div className='p-val-concl border border-info p-3 mt-3'>
                        <Katex tex={nullHypothesis} />
                        <Katex tex={hypothesis} />
                        <div>
                            <input
                                type='radio'
                                id='rejectHypothesis'
                                name='decision'
                                value='reject'
                                disabled={hypothesisTest1validate}
                                checked={nullHypothesisChoice1 === 'reject'}
                                onChange={handleNullHypothesisChoice1Change}
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
                                disabled={hypothesisTest1validate}
                                checked={
                                    nullHypothesisChoice1 === 'failToReject'
                                }
                                onChange={handleNullHypothesisChoice1Change}
                            />
                            <label htmlFor='failToRejectHypothesis'>
                            Fail to Reject the Null Hypothesis</label>
                        </div>
                        {hypothesisTest1validate && (
                            <div>
                                {hypothesisTest1validate ? (
                                    <span style={{ color: 'green' }}>
                                        Correct</span>
                                ) : (
                                    <span style={{ color: 'red' }}>
                                        Incorrect</span>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div> {/* solving-p-set */}
            <div className='solving-p-set border border-primary p-3 mt-3'>
                {hypothesisTest1validate && (
                    <div className='input-p'>
                        <p>Look up critical value for t-stat</p>

                        <p>Critical value from table for {alpha} :</p>
                        <div>
                            <label htmlFor='criticalvalue'>
                                critical value = </label>
                            <input
                                type='text'
                                id='criticalvalue'
                                value={userCriticalValue}
                                disabled={isCriticalValueCorrect}
                                onChange={handleUserCriticalvalueChange}
                            />
                        </div>
                    </div>
                )}{/*input-criticalvalue*/}
                {isCriticalValueCorrect &&(
                    <div>
                        <span style={{ color: 'green' }}>Correct</span>
                    </div>
                )}

                {!isCriticalValueCorrect && isCriticalValueCorrect !== null && (
                    <div>
                        <span style={{ color: 'red' }}>Incorrect</span>
                    </div>
                )}
                {isCriticalValueCorrect && (
                    <div className='p-val-concl border border-info p-3 mt-3'>
                        <p>Comparing |t| value to critical value:</p>
                        <div>
                            <input
                                type='radio'
                                id='tGreaterThanCritical'
                                name='criticalcomparison'
                                value='greaterThan'
                                disabled={isCriticalCompareCorrect}
                                checked={compareCritical === 'greaterThan'}
                                onChange={handleComparingCritical}
                            />
                            <label htmlFor='tGreaterThanCritical'>
                            |t| &gt; critical value</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                id='tLessThanCritical'
                                name='criticalcomparison'
                                value='lessThan'
                                disabled={isCriticalCompareCorrect}
                                checked={compareCritical === 'lessThan'}
                                onChange={handleComparingCritical}
                            />
                            <label htmlFor='tLessThanCritical'>
                        |t| &lt; critical value</label>
                        </div>
                    </div>
                    //compare-t-to-criticalvalue
                )}
                {isCriticalCompareCorrect && (
                    <div>
                        <span style={{ color: 'green' }}>Correct</span>
                    </div>
                )}

                {!isCriticalCompareCorrect && isCriticalCompareCorrect !== null
                 && (
                     <div>
                         <span style={{ color: 'red' }}>Incorrect</span>
                     </div>
                 )}

                {isCriticalCompareCorrect && (
                    <div className='p-val-concl border border-info p-3 mt-3'>
                        <Katex tex={nullHypothesis} />
                        <Katex tex={hypothesis} />
                        <div>
                            <input
                                type='radio'
                                id='rejectHypothesis2'
                                name='decision2'
                                value='reject'
                                disabled={hypothesisTest2validate}
                                checked={nullHypothesisChoice2 === 'reject'}
                                onChange={handleNullHypothesisChoice2Change}
                            />
                            <label htmlFor='rejectHypothesis2'>
                            Reject the Null Hypothesis</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                id='failToRejectHypothesis2'
                                name='decision2'
                                value='failToReject'
                                disabled={hypothesisTest2validate}
                                checked={
                                    nullHypothesisChoice2 === 'failToReject'
                                }
                                onChange={handleNullHypothesisChoice2Change}
                            />
                            <label htmlFor='failToRejectHypothesis2'>
                            Fail to Reject the Null Hypothesis</label>
                        </div>
                        {hypothesisTest2validate && (
                            <>
                                <div>
                                    {hypothesisTest2validate ? (
                                        <span style={{ color: 'green' }}>
                                        Correct</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>
                                        Incorrect</span>
                                    )}
                                </div>
                                <button className={
                                    'btn btn-small btn-secondary mt-3'}
                                onClick={onComplete}>
                                    Next
                                </button>
                            </>
                        )}
                    </div>
                )}

            </div>
        </>
    );
};

Quiz2.propTypes = {
    appRvalue: PropTypes.number.isRequired,
    tvalue: PropTypes.number.isRequired,
    pvalue: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    hypothesisTest: PropTypes.string.isRequired,
    hypothesis: PropTypes.string.isRequired,
    nullHypothesis: PropTypes.string.isRequired,
    n: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
    completedChoices: PropTypes.array.isRequired,
};
