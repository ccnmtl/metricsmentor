import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';
import axios from 'axios';
import { saveAnswer } from '../utils';
import { PvalueModal } from './modalPvalue';
import { CriticalValueModal } from './modalCV';

export const Quiz = ({
    appRvalue, tvalue, pvalue, alpha, hypothesisTest, hypothesis,
    nullHypothesis, n, onComplete, completedChoices, submissionId
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
        document.getElementById('quiz')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);

    useEffect(() => {
        if (isPvalueCorrect) {
            document.getElementById('pGreaterThanAlpha')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [isPvalueCorrect]);

    useEffect(() => {
        if (isPvalCompareCorrect) {
            document.getElementById('rejectHypothesis')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [isPvalCompareCorrect]);

    useEffect(() => {
        if (hypothesisTest1validate) {
            document.getElementById('criticalvalue')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [hypothesisTest1validate]);

    useEffect(() => {
        if (isCriticalValueCorrect) {
            document.getElementById('tGreaterThanCritical')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [isCriticalValueCorrect]);

    useEffect(() => {
        if (isCriticalCompareCorrect) {
            document.getElementById('rejectHypothesis2')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [isCriticalCompareCorrect]);

    useEffect(() => {
        if (hypothesisTest2validate) {
            document.getElementById('proceed')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [hypothesisTest2validate]);


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
    };

    const validatePvalue = (value) => {
        const isValid = parseFloat(value) === pvalue;
        setIsPvalueCorrect(isValid);
        return isValid;
    };

    const handleNextPvalueButtonClick = async() => {
        const isCorrect = validatePvalue(userPvalue);
        const additionalData = {
            userPvalue: userPvalue,
            pvalue: pvalue,
            alpha: alpha,
            hypothesis: hypothesis,
            nullHypothesis: nullHypothesis
        };

        await saveAnswer(submissionId, 1, 'numerical',
            userPvalue, isCorrect, additionalData);
    };

    const handlePvalueComparisonChange = (event) => {
        const newValue = event.target.value;
        setPvalueComparison(newValue);
    };

    const validatePvalueComparison = (value) => {
        const isValid = value === (pvalue < alpha ? 'lessThan' : 'greaterThan');
        setIsPvalCompareCorrect(isValid);
        return isValid;
    };

    const handleNextPvalueComparison = async() => {
        const isCorrect = validatePvalueComparison(pvalueComparison);
        const additionalData = {
            comparison: pvalueComparison,
            pvalue: pvalue,
            alpha: alpha,
            hypothesis: hypothesis,
            nullHypothesis: nullHypothesis};

        await saveAnswer(submissionId, 2, 'radio', pvalueComparison,
            isCorrect, additionalData);
    };

    const handleNullHypothesisChoice1Change = (event) => {
        setNullHypothesisChoice1(event.target.value);
    };

    const validateHypothesisTest1 = (value) => {
        const correctDecision =
        (pvalue < alpha && value === 'reject') ||
                    (pvalue > alpha && value === 'failToReject');

        setHypothesisTest1validate((correctDecision));

        return correctDecision;
    };

    const handleNextNullHypothesisChoice1 = async() => {
        const isCorrect = validateHypothesisTest1(nullHypothesisChoice1);
        const additionalData = {
            decision: nullHypothesisChoice1,
            pvalue: pvalue,
            alpha: alpha,
            hypothesis: hypothesis,
            nullHypothesis: nullHypothesis};

        await saveAnswer(submissionId, 3, 'radio',
            nullHypothesisChoice1, isCorrect, additionalData);
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

    };

    const validateCriticalValue = (value) => {
        const isValid = parseFloat(value) === criticalValue;
        setIsCriticalValueCorrect(isValid);
        return isValid;
    };

    const handleNextCriticalVal = async() => {
        const isCorrect = validateCriticalValue(userCriticalValue);
        const additionalData = {
            userCriticalValue: userCriticalValue,
            criticalValue: criticalValue,
            alpha: alpha,
            hypothesis: hypothesis,
            nullHypothesis: nullHypothesis};

        await saveAnswer(submissionId, 4, 'numerical',
            userCriticalValue, isCorrect, additionalData);
    };

    const handleComparingCritical = (event) => {
        const newValue = event.target.value;
        setCompareCritical(newValue);
    };

    const validateCriticalComparison = (value) => {
        const correctComparison =
        (Math.abs(tvalue) > criticalValue && value === 'greaterThan') ||
        (Math.abs(tvalue) <= criticalValue && value === 'lessThan');

        setIsCriticalCompareCorrect(correctComparison);

        return correctComparison;
    };

    const handleNextCriticalValCompare = () => {
        const isCorrect = validateCriticalComparison(compareCritical);
        const additionalData = {
            comparison: compareCritical,
            tvalue: tvalue,
            criticalValue: criticalValue,
            alpha: alpha,
            hypothesis: hypothesis,
            nullHypothesis: nullHypothesis};

        saveAnswer(submissionId, 5, 'radio',
            compareCritical, isCorrect, additionalData);
    };

    const handleNullHypothesisChoice2Change = (event) => {
        setNullHypothesisChoice2(event.target.value);
    };

    const validateHypothesisTest2 = (value) => {
        const correctDecision =
        (Math.abs(tvalue) > criticalValue && value === 'reject') ||
                (Math.abs(tvalue) <= criticalValue && value === 'failToReject');

        setHypothesisTest2validate(correctDecision);

        return correctDecision;
    };

    const handleNextNullHypothesisChoice2 = async() => {
        const isCorrect = validateHypothesisTest2(nullHypothesisChoice2);
        const additionalData = {
            decision: nullHypothesisChoice2,
            tvalue: tvalue,
            criticalValue: criticalValue,
            alpha: alpha,
            hypothesis: hypothesis,
            nullHypothesis: nullHypothesis};

        await saveAnswer(submissionId, 6, 'radio',
            nullHypothesisChoice2, isCorrect, additionalData);
    };


    return (
        <div id="quiz">
            <div className="solving-p-set mt-3">
                <div className="input-p">
                    <p>
                        One method for hypothesis testing is to compare
                        the <span className="katex">
                                <span className="mathnormal">
                                    p-Value
                                </span>
                            </span> to <span className="katex">
                                <span className="mathnormal">&alpha;</span>
                            </span>.
                        Using the table provided, look up the value that
                        corresponds to <span className="katex">
                                <span className="mathnormal">
                                    t = {tvalue}
                                </span>.
                            </span>
                    </p>
                    <button
                        className="btn btn-sm btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#pvalueModal">
                        p-Value table
                    </button>

                    <PvalueModal />

                    <div className="mt-3 d-flex">
                        <label className="align-self-center"
                            htmlFor="pValue">p = </label>
                        <input
                            className="align-self-center"
                            type="text"
                            id="pValue"
                            value={userPvalue}
                            disabled={isPvalueCorrect}
                            onChange={handleUserPvalueChange}
                        />
                        <button
                            className="btn
                                btn-sm btn-primary
                                mx-2
                                align-self-center"
                            disabled={isPvalueCorrect}
                            onClick={handleNextPvalueButtonClick}>
                            Continue &raquo;
                        </button>
                    </div>
                </div>{/*input-p*/}
                {isPvalueCorrect && (
                    <div className="mt-3">
                        <span style={{ color: 'green' }}>
                            That&rsquo;s correct!
                        </span>
                    </div>
                )}
                {!isPvalueCorrect && isPvalueCorrect !== null && (
                    <div className="mt-3">
                        <span style={{ color: 'red' }}>
                            The value is incorrect; it&rsquo;s {pvalue}.
                            Please try again.
                        </span>
                    </div>
                )}

                {isPvalueCorrect && (
                    <div className="p-to-alpha mt-3">
                        <p>
                            Knowing now that <span className="katex">
                                    <span className="mathnormal">
                                        p-Value = {pvalue}
                                    </span>
                                </span> and <span className="katex">
                                    <span className="mathnormal">
                                        &alpha; = {alpha}
                                    </span>
                                </span>,
                            which of the following statements is true?
                        </p>
                        <div>
                            <input
                                type="radio"
                                id="pGreaterThanAlpha"
                                name="comparison"
                                value="greaterThan"
                                disabled={isPvalCompareCorrect}
                                checked={pvalueComparison === 'greaterThan'}
                                onChange={handlePvalueComparisonChange}
                            />
                            <label htmlFor="pGreaterThanAlpha">
                        p-Value &gt; &alpha;
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="pLessThanAlpha"
                                name="comparison"
                                value="lessThan"
                                disabled={isPvalCompareCorrect}
                                checked={pvalueComparison === 'lessThan'}
                                onChange={handlePvalueComparisonChange}
                            />
                            <label htmlFor="pLessThanAlpha">
                                p-Value &lt; &alpha;
                            </label>
                        </div>
                        <button
                            className="btn btn-small btn-primary mt-3"
                            disabled={isPvalCompareCorrect}
                            onClick={handleNextPvalueComparison}>
                            Continue &raquo;
                        </button>
                        {isPvalCompareCorrect && (
                            <div className="mt-3">
                                <span style={{ color: 'green' }}>
                                    That&rsquo;s correct!
                                </span>
                            </div>
                        )}

                        {!isPvalCompareCorrect &&
                        isPvalCompareCorrect !== null && (
                            <div className="mt-3">
                                <span style={{ color: 'red' }}>
                                    The comparison is incorrect. 
                                    Please try again.
                                </span>
                            </div>
                        )}
                    </div>//compare-p-to-alpha
                )}
                {isPvalCompareCorrect && (
                    <div className="p-val-concl mt-3">
                        <p>Let&rsquo;s look at the null and and
                            alternate hypotheses once more:</p>
                            <div className="hi-val">
                            <div className="py-2">
                                <Katex tex={nullHypothesis} />
                            </div>
                            <div className="py-2">
                                <Katex tex={hypothesis} />
                            </div>
                        </div>
                        <p className="mt-3">
                            With <span className="katex">
                                    <span className="mathnormal">
                                        p-Value
                                    </span>
                                </span> and <span className="katex">
                                    <span className="mathnormal">
                                        &alpha;
                                    </span>
                                </span> comparison above,
                            what is your conclusion?
                        </p>
                        <div className="mt-3">
                            <input
                                type="radio"
                                id="rejectHypothesis"
                                name="decision"
                                value="reject"
                                disabled={hypothesisTest1validate}
                                checked={nullHypothesisChoice1 === 'reject'}
                                onChange={handleNullHypothesisChoice1Change}
                            />
                            <label htmlFor="rejectHypothesis">
                            Reject the null hypothesis</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="failToRejectHypothesis"
                                name="decision"
                                value="failToReject"
                                disabled={hypothesisTest1validate}
                                checked={
                                    nullHypothesisChoice1 === 'failToReject'
                                }
                                onChange={handleNullHypothesisChoice1Change}
                            />
                            <label htmlFor="failToRejectHypothesis">
                            Fail to reject the null hypothesis</label>
                        </div>
                        <button
                            className="btn btn-small btn-primary mt-3"
                            disabled={hypothesisTest1validate}
                            onClick={handleNextNullHypothesisChoice1}>
                            Next
                        </button>
                        {hypothesisTest1validate && (
                            <div className="mt-3">
                                <span style={{ color: 'green' }}>
                                    That&rsquo;s the correct conclusion!
                                </span>
                            </div>
                        )}
                        {!hypothesisTest1validate &&
                        hypothesisTest1validate !== null && (
                            <div className="mt-3">
                                <span style={{ color: 'red' }}>
                                    The conclusion is incorrect.
                                    Please try again.
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div> {/* solving-p-set */}

            {/* the following appears when empty */}  
            <div className="solving-p-set mt-3">
                {hypothesisTest1validate && (
                    <div className="input-criticalvalue">
                        <p>
                            Another method for hypothesis testing is to
                            compare <span className="katex">
                                    <span className="mathnormal">
                                        t
                                    </span>
                                </span> to the <span className="katex">
                                    <span className="mathnormal">
                                        critical value
                                    </span>
                                </span> at a certain significance
                                level <span className="katex">
                                    <span className="mathnormal">&alpha;</span>
                                </span>.
                            Using the table provided, look up the value that
                            corresponds to <span className="katex">
                                    <span className="mathnormal">
                                        &alpha; = {alpha}
                                    </span>.
                                </span>
                        </p>
                        <button
                            className="btn btn-sm btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#criticalValModal">
                            Critical value table
                        </button>

                        <CriticalValueModal />

                        <div className="mt-3 d-flex">
                            <label className="align-self-center"
                                htmlFor="criticalvalue">
                                critical value = </label>
                            <input
                                className="align-self-center"
                                type="text"
                                id="criticalvalue"
                                value={userCriticalValue}
                                disabled={isCriticalValueCorrect}
                                onChange={handleUserCriticalvalueChange}
                            />
                            <button
                                className="btn
                                btn-sm btn-primary
                                mx-2
                                align-self-center"
                                disabled={isCriticalValueCorrect}
                                onClick={handleNextCriticalVal}>
                                Continue &raquo;
                            </button>
                        </div>
                    </div>
                )}{/*input-criticalvalue*/}
                {isCriticalValueCorrect &&(
                    <div className="mt-3">
                        <span style={{ color: 'green' }}>
                            That&rsquo;s correct!
                        </span>
                    </div>
                )}

                {!isCriticalValueCorrect && isCriticalValueCorrect !== null && (
                    <div className="mt-3">
                        <span style={{ color: 'red' }}>
                            That&rsquo;s incorrect.
                            Please try again.
                        </span>
                    </div>
                )}
                {isCriticalValueCorrect && (
                    <div className="p-val-concl mt-3">
                        <p>
                            Knowing now that <span className="katex">
                                    <span className="mathnormal">
                                        t = {tvalue}
                                    </span>
                                </span> and <span className="katex">
                                    <span className="mathnormal">
                                        critical value = {criticalValue}
                                    </span>
                                </span>,
                            which of the following statements is true?
                        </p>
                        <div>
                            <input
                                type="radio"
                                id="tGreaterThanCritical"
                                name="criticalcomparison"
                                value="greaterThan"
                                disabled={isCriticalCompareCorrect}
                                checked={compareCritical === 'greaterThan'}
                                onChange={handleComparingCritical}
                            />
                            <label htmlFor="tGreaterThanCritical">
                            |t| &gt; critical value</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="tLessThanCritical"
                                name="criticalcomparison"
                                value="lessThan"
                                disabled={isCriticalCompareCorrect}
                                checked={compareCritical === 'lessThan'}
                                onChange={handleComparingCritical}
                            />
                            <label htmlFor="tLessThanCritical">
                        |t| &lt; critical value</label>
                        </div>
                        <button
                            className="btn btn-small btn-primary mt-3"
                            disabled={isCriticalCompareCorrect}
                            onClick={handleNextCriticalValCompare}>
                            Continue &raquo;
                        </button>
                        {isCriticalCompareCorrect && (
                            <div className="mt-3">
                                <span style={{ color: 'green' }}>
                                    That&rsquo;s correct!
                                </span>
                            </div>
                        )}
                        {!isCriticalCompareCorrect &&
                        isCriticalCompareCorrect !== null && (
                            <div className="mt-3">
                                <span style={{ color: 'red' }}>
                                    The comparison is incorrect.
                                    Please try again.
                                </span>
                            </div>
                        )}
                    </div> //compare-t-to-criticalvalue
                )}
                {isCriticalCompareCorrect && (
                    <div className="p-val-concl mt-3">
                        <p>Once again, the null and and
                            alternate hypotheses are:</p>
                            <div className="hi-val">
                            <div className="py-2">
                                <Katex tex={nullHypothesis} />
                            </div>
                            <div className="py-2">
                                <Katex tex={hypothesis} />
                            </div>
                        </div>
                        <p className="mt-3">
                            With <span className="katex">
                                    <span className="mathnormal">
                                        t
                                    </span>
                                </span> and <span className="katex">
                                    <span className="mathnormal">
                                        critical value
                                    </span>
                                </span> comparison above,
                            what is your conclusion?
                        </p>
                        <div>
                            <input
                                type="radio"
                                id="rejectHypothesis2"
                                name="decision2"
                                value="reject"
                                disabled={hypothesisTest2validate}
                                checked={nullHypothesisChoice2 === 'reject'}
                                onChange={handleNullHypothesisChoice2Change}
                            />
                            <label htmlFor="rejectHypothesis2">
                            Reject the null hypothesis</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="failToRejectHypothesis2"
                                name="decision2"
                                value="failToReject"
                                disabled={hypothesisTest2validate}
                                checked={
                                    nullHypothesisChoice2 === 'failToReject'
                                }
                                onChange={handleNullHypothesisChoice2Change}
                            />
                            <label htmlFor="failToRejectHypothesis2">
                            Fail to reject the null hypothesis</label>
                        </div>
                        <button
                            className="btn btn-small btn-primary mt-3"
                            disabled={hypothesisTest2validate}
                            onClick={handleNextNullHypothesisChoice2}>
                            Continue &raquo;
                        </button>
                        {hypothesisTest2validate && (
                            <>
                                <div className="mt-3">
                                    <span style={{ color: 'green' }}>
                                        That is the correct conclusion!
                                    </span>
                                </div>
                                <p className="mt-3">
                                    You have completed this hypothesis test.
                                </p>
                                <div className="simulation__step-prompt">
                                    <button className=
                                        "btn btn-primary my-3"
                                    id="proceed"
                                    onClick={onComplete}>
                                        Next hypothesis &raquo;
                                    </button>                            
                                </div>
                            </>
                        )}
                        {!hypothesisTest2validate &&
                        hypothesisTest2validate !== null && (
                            <div className="mt-3">
                                <span style={{ color: 'red' }}>
                                    That&rsquo;s not the right conclusion.
                                    Please try again.
                                </span>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
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
    n: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
    completedChoices: PropTypes.array.isRequired,
    submissionId: PropTypes.number.isRequired
};
