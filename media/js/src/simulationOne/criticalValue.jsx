import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';
import { saveAnswer } from '../utils';

export const CriticalValue = ({
    hypothesisTest2validate, tvalue, n, alpha, hypothesisTest, hypothesis,
    nullHypothesis, submissionId, plotType,
    setHypothesisTest2validate, criticalValues, isRedo,
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
        let comparisonValue = value;
        if (hypothesisTest === 'value_two_sided') {
            comparisonValue = Math.abs(parseFloat(value));
        }

        const isValid = parseFloat(comparisonValue) === criticalValue;
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

    useEffect(() => {
        if (isRedo) {
            setIsCriticalValueCorrect(null);
            setIsCriticalCompareCorrect(null);
            setNullHypothesisChoice2(null);
            setUserCriticalValue('');
            setCompareCritical(null);
        }
    }, [isRedo]);

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
    let plusMinus;
    let textMethod;
    if (hypothesisTest === 'value_two_sided') {
        absoluteTtext = (
            <Katex tex={'\\left| t \\right|'} className="katex-inline"/>
        );
        plusMinus = <Katex tex={'\\pm'} className="katex-inline" />;
        textMethod = 'Another';
    } else {
        absoluteTtext = <Katex tex={'t'} className="katex-inline"/>;
        plusMinus = '';
        textMethod = 'A';
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

    return (<>
        <div className="input-criticalvalue mt-5">
            <h2 className="mt-0">
                Find <Katex tex={'critical~value'} className="katex-inline"/>:
            </h2>
            <p>
                {textMethod} method for hypothesis testing is to
                compare <Katex tex={'t'} className="katex-inline"/> to
                the <Katex tex={'critical~value'}
                    className="katex-inline"/> for a given significance
                level <Katex tex={'\\alpha'} className="katex-inline"/>.
                Using the table provided, look up the value that
                corresponds to <span className="hi-val px-1">
                    <Katex tex={`{\\alpha = ${alpha}}`}
                        className="katex-inline"/></span>.
            </p>
            <button
                className="btn btn-sm btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#criticalValModal">
                Critical value table
            </button>

            <div className="sub-content d-flex">
                <label className="align-self-center text-nowrap"
                    htmlFor="criticalvalue">
                    <Katex tex={'critical~value'}
                        className="katex-inline" /> =&nbsp;{plusMinus}
                </label>
                <input
                    className="align-self-center form-control short-input"
                    type="text"
                    id="criticalvalue"
                    value={userCriticalValue}
                    disabled={isCriticalValueCorrect}
                    onChange={handleUserCriticalvalueChange}
                    autoComplete="off"
                />
                <div className="flex-grow-1 align-self-center">
                    <button
                        className="btn btn-sm btn-success
                        mx-2 text-nowrap
                        align-self-center"
                        disabled={isCriticalValueCorrect}
                        onClick={handleNextCriticalVal}>
                            Continue &raquo;
                    </button>
                </div>
            </div> {/* \end of sub-content for cv-value input */}

            {isCriticalValueCorrect && (
                <div className="answer-correct-container">
                    <div className="answer-correct">&#10003;</div>
                    <div>That&rsquo;s correct!</div>
                </div>
            )}

            {!isCriticalValueCorrect &&
                isCriticalValueCorrect !== null && (
                <div className="answer-incorrect-container">
                    <div className="answer-incorrect flex-shrink-0
                        align-self-start">!</div>
                    <div>
                        The value is incorrect.
                        Please try again.
                    </div>
                </div>
            )}
        </div>
        {/*input-criticalvalue*/}
        {isCriticalValueCorrect && (
            <div className="p-val-concl mt-5 mb-3">
                <p className="mb-0">Knowing the <Katex tex={'critical~value'}
                    className="katex-inline"/> and <span
                    className="hi-val px-1"> <Katex tex={`t = ${tvalue}`}
                        className="katex-inline"/></span>,
                    which of the following statements is true?</p>
                <div className="d-flex">
                    <ul className="choice-list align-self-center text-nowrap">
                        <li>
                            <input
                                type="radio"
                                id="tGreaterThanCritical"
                                name="criticalcomparison"
                                value="greaterThan"
                                disabled={isCriticalCompareCorrect}
                                checked={compareCritical === 'greaterThan'}
                                onChange={handleComparingCritical}
                            />
                            <label htmlFor="tGreaterThanCritical"
                                className="mx-1">
                                {absoluteTtext} <Katex
                                    tex={'\\text{\\textgreater} critical~value'}
                                    className="katex-inline"/></label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="tLessThanCritical"
                                name="criticalcomparison"
                                value="lessThan"
                                disabled={isCriticalCompareCorrect}
                                checked={compareCritical === 'lessThan'}
                                onChange={handleComparingCritical}
                            />
                            <label htmlFor="tLessThanCritical" className="mx-1">
                                {absoluteTtext} <Katex
                                    tex={'\\text{\\textless} critical~value'}
                                    className="katex-inline"/></label>
                        </li>
                    </ul>
                    <div className="flex-grow-1 align-self-center ms-5">
                        <button
                            className="btn btn-sm btn-success"
                            disabled={isCriticalCompareCorrect}
                            onClick={handleNextCriticalValCompare}>
                                Continue &raquo;
                        </button>
                    </div>
                </div> {/* \end for cv-alpha compare radio */}

                {isCriticalCompareCorrect && (
                    <div className="answer-correct-container">
                        <div className="answer-correct">&#10003;</div>
                        <div>That&rsquo;s correct!</div>
                    </div>
                )}
                {!isCriticalCompareCorrect &&
                    isCriticalCompareCorrect !== null && (
                    <div className="answer-incorrect-container">
                        <div className="answer-incorrect flex-shrink-0
                            align-self-start">!</div>
                        <div>
                            The comparison is incorrect.
                            Please try again.
                        </div>
                    </div>
                )}
            </div> //compare-t-to-criticalvalue
        )}
        {isCriticalCompareCorrect && (
            <div className="p-val-concl mt-5 mb-3">
                <h2 className="mt-0">
                    Conclusion:
                </h2>
                <p className="mb-1">Once again, the null and
                        alternate hypotheses are:</p>
                <div className="sub-content hi-val">
                    <div className="katex-block border-bottom
                            border-white">
                        <Katex tex={nullHypothesis} />
                    </div>
                    <div className="katex-block">
                        <Katex tex={hypothesis} />
                    </div>
                </div>
                <p className="mt-3">
                    Based on your comparison of the <Katex tex={'t'}
                        className="katex-inline"/> value
                    and <Katex tex={'critical~value'}
                        className="katex-inline"/>, what is your conclusion?
                </p>
                <ul className="choice-list">
                    <li>
                        <input
                            type="radio"
                            id="rejectHypothesis2"
                            name="decision2"
                            value="reject"
                            disabled={hypothesisTest2validate}
                            checked={nullHypothesisChoice2 === 'reject'}
                            onChange={handleNullHypothesisChoice2Change}
                        />
                        <label htmlFor="rejectHypothesis2" className="mx-1">
                            Reject the null hypothesis</label>
                    </li>
                    <li>
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
                        <label htmlFor="failToRejectHypothesis2"
                            className="mx-1">
                            Fail to reject the null hypothesis</label>
                    </li>
                </ul>
                <div className="simulation__step-prompt">
                    <button
                        className="btn btn-sm btn-success"
                        disabled={hypothesisTest2validate}
                        onClick={handleNextNullHypothesisChoice2}>
                            Continue &raquo;
                    </button>
                </div>
                {hypothesisTest2validate && (<>
                    <div className="answer-correct-container">
                        <div className="answer-correct">&#10003;</div>
                        <div>That&rsquo;s the correct conclusion!</div>
                    </div>
                    <p className="mt-3">
                        Notice how <Katex tex={'\\text{corr}(x,y)'}
                            className="katex-inline"/> affects your decision
                        regarding the null hypothesis.
                    </p>
                </>)}
                {!hypothesisTest2validate &&
                    hypothesisTest2validate !== null && (
                    <div className="answer-incorrect-container">
                        <div className="answer-incorrect flex-shrink-0
                            align-self-start">!</div>
                        <div>
                            The conclusion is incorrect.
                            Please try again.
                        </div>
                    </div>
                )}
            </div>
        )}
    </>);
};

CriticalValue.propTypes = {
    hypothesisTest2validate: PropTypes.bool,
    tvalue: PropTypes.number.isRequired,
    n: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    hypothesisTest: PropTypes.string.isRequired,
    hypothesis: PropTypes.string.isRequired,
    nullHypothesis: PropTypes.string.isRequired,
    submissionId: PropTypes.number.isRequired,
    plotType: PropTypes.string.isRequired,
    setHypothesisTest2validate: PropTypes.func.isRequired,
    criticalValues: PropTypes.object,
    isRedo: PropTypes.bool
};