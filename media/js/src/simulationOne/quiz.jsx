import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../katexComponent';
import axios from 'axios';
import { saveAnswer } from '../utils';
import { PvalueComponent } from './pvalueComponent.jsx';


export const Quiz = ({
    tvalue, pvalue, alpha, hypothesisTest, hypothesis,
    nullHypothesis, n, onComplete, completedChoices, submissionId,
    plotType,
}) => {

    const [criticalValues, setCriticalValues] = useState(null);
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


    useEffect(() => {
        calculateCriticalValue();
        document.getElementById('quiz')
            .scrollIntoView({ behavior: 'smooth'});
    }, []);


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

    const isNotTwoSided = hypothesisTest !== 'value_two_sided';

    return (
        <div id="quiz">
            {/* the following appears when empty */}

            {/* {hypothesisTest1validate && (
                <CriticalValueComponent />
            )} */}
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
                            Knowing now the
                                <Katex tex={'t'}
                                    className="katex-inline"/> value
                            and
                                <Katex tex={'critical~value'}
                                    className="katex-inline"/>,
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
