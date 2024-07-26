import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';
import { saveAnswer } from '../utils';

export const CriticalValue = ({
    hypothesisTest2validate, tvalue, n, alpha, hypothesisTest, hypothesis,
    nullHypothesis, onComplete, submissionId, plotType,
    setHypothesisTest2validate, criticalValues
}) => {
    const [nullHypothesisChoice2, setNullHypothesisChoice2] = useState(null);
    const [userCriticalValue, setUserCriticalValue] = useState('');
    const [compareCritical, setCompareCritical] = useState(null);
    // eslint-disable-next-line max-len
    const [isCriticalCompareCorrect, setIsCriticalCompareCorrect] = useState(null);
    const [isCriticalValueCorrect, setIsCriticalValueCorrect] = useState(null);


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

        const questNumber = plotType === '2d' ? 4 : 11;
        await saveAnswer(submissionId, questNumber, 'numerical',
            userCriticalValue, isCorrect, additionalData);
    };

    const handleComparingCritical = (event) => {
        const newValue = event.target.value;
        setCompareCritical(newValue);
    };

    const validateCriticalComparison = (value) => {
        let correctComparison;

        switch (hypothesisTest) {
        case 'value_two_sided':
            correctComparison =
            (Math.abs(tvalue) > criticalValue && value === 'greaterThan') ||
                (Math.abs(tvalue) <= criticalValue && value === 'lessThan');
            break;
        case 'value_left':
            correctComparison =
            (tvalue < criticalValue && value === 'lessThan') ||
                (tvalue >= criticalValue && value === 'greaterThan');
            break;
        case 'value_right':
            correctComparison =
            (tvalue > criticalValue && value === 'greaterThan') ||
                (tvalue <= criticalValue && value === 'lessThan');
            break;
        default:
            correctComparison = false;
        }

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

        const questNumber = plotType === '2d' ? 5 : 12;
        saveAnswer(submissionId, questNumber, 'radio',
            compareCritical, isCorrect, additionalData);
    };
    const handleNullHypothesisChoice2Change = (event) => {
        setNullHypothesisChoice2(event.target.value);
    };

    const validateHypothesisTest2 = (value) => {
        let correctDecision;

        switch (hypothesisTest) {
        case 'value_two_sided':
            correctDecision =
            (Math.abs(tvalue) > criticalValue && value === 'reject') ||
                (Math.abs(tvalue) <= criticalValue && value === 'failToReject');
            break;
        case 'value_left':
            correctDecision =
            (tvalue < criticalValue && value === 'reject') ||
                (tvalue >= criticalValue && value === 'failToReject');
            break;
        case 'value_right':
            correctDecision =
            (tvalue > criticalValue && value === 'reject') ||
                (tvalue <= criticalValue && value === 'failToReject');
            break;
        default:
            correctDecision = false;
        }

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
        const questNumber = plotType === '2d' ? 6 : 13;
        await saveAnswer(submissionId, questNumber, 'radio',
            nullHypothesisChoice2, isCorrect, additionalData);
    };

    let absoluteTtext;
    if (hypothesisTest === 'value_two_sided') {
        absoluteTtext = '|t|';
    } else {
        absoluteTtext = 't';
    }

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

    return (
        <div className="solving-p-set mt-3">

            <div className="input-criticalvalue">
                <p>
                            Another method for hypothesis testing is to
                            compare
                    <Katex tex={'t'} className="katex-inline"/> to
                            the
                    <Katex tex={'critical~value'}
                        className="katex-inline"/> at a
                            certain significance value
                    <Katex tex={'\\alpha'}
                        className="katex-inline"/>.
                            Using the table provided, look up the value that
                            corresponds to
                    <Katex tex={`\\bold{\\alpha = ${alpha}}`}
                        className="katex-inline"/>.
                </p>
                <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#criticalValModal">
                            Critical value table
                </button>

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
            {/*input-criticalvalue*/}
            {isCriticalValueCorrect &&(
                <div className="mt-3">
                    <span style={{ color: 'green' }}>
                            That&rsquo;s correct!
                    </span>
                </div>
            )}

            {!isCriticalValueCorrect &&
                    isCriticalValueCorrect !== null && (
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
                            Knowing the
                        <Katex tex={'critical~value'}
                            className="katex-inline"/> and
                        <div className="ms-1 hi-val">
                            <Katex tex={`t = ${tvalue}`}
                                className="katex-inline"/>
                        </div>,
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
                            {absoluteTtext} &gt; critical value</label>
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
                            {absoluteTtext} &lt; critical value</label>
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
                            With
                        <Katex tex={'t'}
                            className="katex-inline"/> value
                            and
                        <Katex tex={'critical~value'}
                            className="katex-inline"/> comparison above,
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
    );
};

CriticalValue.propTypes = {
    hypothesisTest2validate: PropTypes.bool,
    tvalue: PropTypes.number.isRequired,
    n: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    hypothesisTest: PropTypes.string.isRequired,
    hypothesis: PropTypes.string.isRequired,
    nullHypothesis: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
    submissionId: PropTypes.number.isRequired,
    plotType: PropTypes.string.isRequired,
    setHypothesisTest2validate: PropTypes.func.isRequired,
    criticalValues: PropTypes.object
};