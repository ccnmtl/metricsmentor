import React, { useState, useEffect } from 'react';
import { Katex } from '../../utils/katexComponent';
import { saveAnswer } from '../../utils/utils';
import PropTypes from 'prop-types';


export const PvalueComponent = ({
    pvalue, tvalue, submissionId, hypothesis, nullHypothesis,
    alpha, hypothesisTest1validate, setHypothesisTest1validate,
    plotType, isRedo, hypothesisTest, answers
}) => {

    const [userPvalue, setUserPvalue] = useState('');
    const [isPvalueCorrect, setIsPvalueCorrect] = useState(null);
    const [isPvalCompareCorrect, setIsPvalCompareCorrect] = useState(null);
    const [pvalueComparison, setPvalueComparison] = useState(null);
    const [nullHypothesisChoice1, setNullHypothesisChoice1] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);



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
        if (isRedo) {
            setUserPvalue('');
            setIsPvalueCorrect(null);
            setIsPvalCompareCorrect(null);
            setPvalueComparison(null);
            setNullHypothesisChoice1(null);
        }
    }, [isRedo]);


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
        const questNumber = plotType === '2d' ? 1 : 8;
        await saveAnswer(submissionId, questNumber, 'numerical',
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
        const questNumber = plotType === '2d' ? 2 : 9;
        await saveAnswer(submissionId, questNumber, 'radio', pvalueComparison,
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
        const questNumber = plotType === '2d' ? 3 : 10;
        await saveAnswer(submissionId, questNumber, 'radio',
            nullHypothesisChoice1, isCorrect, additionalData);
    };

    return (<>
        <div className="input-p mt-5">
            <h2 className="mt-0" data-cy="pvalueSection" >
                Obtain <Katex tex={'p'} className="katex-inline" />-value:
            </h2>
            <p>One method for hypothesis testing is to compare the <Katex
                tex={'p'} className="katex-inline" />-value to <Katex
                tex={'{\\alpha}'} className="katex-inline" />.
            Refer to the <Katex tex={'p'} className="katex-inline" />-value
            table and find the value
            for <span className="hi-val px-1"><Katex tex={`t = ${tvalue}`}
                className="katex-inline"/></span>.
            </p>
            <button
                className="btn btn-sm btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#pvalueModal">
                <Katex tex={'p'} className="katex-inline" />-value table
            </button>
            {hypothesisTest === 'value_two_sided' && (
                <p>
                    This is a <strong>two-sided test</strong>, so you need to
                    multiply the table value by two.
                </p>
            )}
            <div className="sub-content d-flex">
                <label className="align-self-center text-nowrap"
                    htmlFor="pValue">
                    <Katex tex={'p'}
                        className="katex-inline" />-value =&nbsp;
                </label>
                <input
                    className="align-self-center form-control short-input"
                    type="text"
                    id="pValue"
                    value={userPvalue}
                    disabled={isPvalueCorrect}
                    onChange={handleUserPvalueChange}
                    autoComplete="off"
                />
                <div className="flex-grow-1 align-self-center">
                    <button
                        className="btn btn-sm btn-success
                        mx-2 text-nowrap
                        align-self-center"
                        id="pvalueInputButton"
                        disabled={isPvalueCorrect}
                        onClick={handleNextPvalueButtonClick}>
                    Continue &raquo;
                    </button>
                </div>
            </div> {/* \end of sub-content for p-value input */}
            {isPvalueCorrect && (
                <div className="answer-correct-container">
                    <div className="answer-correct">&#10003;</div>
                    <div>That&rsquo;s correct!</div>
                </div>
            )}
            {!isPvalueCorrect && isPvalueCorrect !== null && (
                <div className="answer-incorrect-container">
                    <div className="answer-incorrect flex-shrink-0
                        align-self-start">!</div>
                    <div>
                        The value is incorrect;
                        Please try again. {' '}
                        {!showAnswer ? (
                            <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => setShowAnswer(true)}
                                data-cy="pvalueReveal">
                                Reveal answer
                            </button>
                        ) : (

                            <>
                                It&apos;s {' '}
                                <span data-cy="pvalueanswer">{ pvalue}</span>.
                                {hypothesisTest === 'value_two_sided' && (
                                    <span>
                                        &nbsp;Note that this is a two-sided
                                        test and the table value must be
                                        multiplied by two.&nbsp;
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>{/*input-p*/}
        {isPvalueCorrect && (
            <div className="p-to-alpha mt-5 mb-3">
                <p className="mb-0">
                    Knowing now the <Katex tex={'p'} className="katex-inline" />
                    -value and <span className="hi-val px-1">
                        <Katex tex={`{\\alpha=${alpha}}`}
                            className="katex-inline"/></span>,
                    which of the following statements is true?
                </p>
                <div className="d-flex">
                    <ul className="choice-list align-self-center text-nowrap">
                        <li>
                            <input
                                type="radio"
                                id="pGreaterThanAlpha"
                                name="comparison"
                                value="greaterThan"
                                disabled={isPvalCompareCorrect}
                                checked={pvalueComparison === 'greaterThan'}
                                onChange={handlePvalueComparisonChange}
                            />
                            <label htmlFor="pGreaterThanAlpha" className="mx-1">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    'p\\text{\\textendash}value \\text{\\textgreater} \\alpha'
                                } />
                            </label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="pLessThanAlpha"
                                name="comparison"
                                value="lessThan"
                                disabled={isPvalCompareCorrect}
                                checked={pvalueComparison === 'lessThan'}
                                onChange={handlePvalueComparisonChange}
                            />
                            <label htmlFor="pLessThanAlpha" className="mx-1">
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    'p\\text{\\textendash}value \\text{\\textless} \\alpha'
                                } />
                            </label>
                        </li>
                    </ul>
                    <div className="flex-grow-1 align-self-center ms-5">
                        <button
                            className="btn btn-sm btn-success"
                            data-cy="pvalueComparisonButton"
                            disabled={isPvalCompareCorrect}
                            onClick={handleNextPvalueComparison}>
                        Continue &raquo;
                        </button>
                    </div>
                </div> {/* \end of sub-content for p-alpha compare radio */}

                {isPvalCompareCorrect && (
                    <div className="answer-correct-container">
                        <div className="answer-correct">&#10003;</div>
                        <div>That&rsquo;s correct!</div>
                    </div>
                )}

                {!isPvalCompareCorrect &&
                isPvalCompareCorrect !== null && (
                    <div className="answer-incorrect-container">
                        <div className="answer-incorrect flex-shrink-0
                            align-self-start">!</div>
                        <div>
                            The comparison is incorrect.
                            Please try again.
                        </div>
                    </div>
                )}
            </div>//compare-p-to-alpha
        )}
        {isPvalCompareCorrect && (
            <div className="p-val-concl mt-5 mb-3">
                <h2 className="mt-0">
                    Conclusion:
                </h2>
                <p className="mb-1">Let&rsquo;s look at the null and and
                alternate hypotheses once more:</p>
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
                    Based on your comparison of the <Katex tex={'p'}
                        className="katex-inline" />-value
                    and <Katex tex={'\\alpha'}
                        className="katex-inline"/>, what is your conclusion?
                </p>
                <ul className="choice-list">
                    <li>
                        <input
                            type="radio"
                            id="rejectHypothesis"
                            name="decision"
                            value="reject"
                            disabled={hypothesisTest1validate}
                            checked={nullHypothesisChoice1 === 'reject'}
                            onChange={handleNullHypothesisChoice1Change}
                        />
                        <label htmlFor="rejectHypothesis" className="mx-1">
                            Reject the null hypothesis</label>
                    </li>
                    <li>
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
                        <label htmlFor="failToRejectHypothesis"
                            className="mx-1">
                            Fail to reject the null hypothesis
                        </label>
                    </li>
                </ul>
                <div className="simulation__step-prompt">
                    <button
                        className="btn btn-sm btn-success"
                        data-cy="hypothesisTest1Button"
                        disabled={hypothesisTest1validate}
                        onClick={handleNextNullHypothesisChoice1}>
                    Continue &raquo;
                    </button>
                </div>
                {/* \end of conclusion radio */}

                {hypothesisTest1validate && (<>
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
                {!hypothesisTest1validate &&
                    hypothesisTest1validate !== null && (
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

PvalueComponent.propTypes = {
    tvalue: PropTypes.number.isRequired,
    pvalue: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
    hypothesis: PropTypes.string,
    nullHypothesis: PropTypes.string,
    submissionId: PropTypes.number,
    hypothesisTest1validate: PropTypes.bool,
    setHypothesisTest1validate: PropTypes.func,
    plotType: PropTypes.string,
    isRedo: PropTypes.bool,
    hypothesisTest: PropTypes.string,
    answers: PropTypes.array
};