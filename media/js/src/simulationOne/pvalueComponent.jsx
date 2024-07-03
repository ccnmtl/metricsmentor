import React, { useState, useEffect } from 'react';
import { Katex } from '../katexComponent';
import { saveAnswer } from '../utils';
import PropTypes from 'prop-types';


export const PvalueComponent = ({
    pvalue, tvalue, submissionId, hypothesis, nullHypothesis,
    alpha, hypothesisTest1validate, setHypothesisTest1validate
}) => {

    const [userPvalue, setUserPvalue] = useState('');
    const [isPvalueCorrect, setIsPvalueCorrect] = useState(null);
    const [isPvalCompareCorrect, setIsPvalCompareCorrect] = useState(null);
    const [pvalueComparison, setPvalueComparison] = useState(null);
    const [nullHypothesisChoice1, setNullHypothesisChoice1] = useState(null);



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

    return (
        <div className="solving-p-set mt-3">
            <div className="input-p">
                <p>
                One method for hypothesis testing is to compare the
                    <Katex tex={'p'} className="katex-inline" />-value to
                    <Katex tex={'{\\alpha}'} className="katex-inline" />.
                Using the table provided, look up the value that
                corresponds to
                    <Katex tex={`t = ${tvalue}`}
                        className="katex-inline"/>.
                </p>
                <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#pvalueModal">
                p-value table
                </button>

                <div className="mt-3 d-flex">
                    <label className="align-self-center"
                        htmlFor="pValue">
                        <Katex tex={'p'}
                            className="katex-inline" />-value =
                    </label>
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
                    Knowing now the
                        <Katex tex={'p'} className="katex-inline" />-value
                    and
                        <Katex tex={'\\alpha'} className="katex-inline"/>,
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
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                'p\\text{\\textendash}value \\text{\\textgreater} \\alpha'
                            } />
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
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                'p\\text{\\textendash}value \\text{\\textless} \\alpha'
                            } />
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
                    With
                        <Katex tex={'p'} className="katex-inline" />-value
                    and
                        <Katex tex={'\\alpha'}
                            className="katex-inline"/> comparison above,
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
        </div>
    );
};

PvalueComponent.propTypes = {
    tvalue: PropTypes.number.isRequired,
    pvalue: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    hypothesis: PropTypes.string,
    nullHypothesis: PropTypes.string,
    submissionId: PropTypes.number,
    hypothesisTest1validate: PropTypes.bool,
    setHypothesisTest1validate: PropTypes.func
};