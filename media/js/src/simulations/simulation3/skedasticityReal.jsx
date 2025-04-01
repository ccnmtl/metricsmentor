import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { inlineKatex } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import { PromptBlock } from '../../PromptBlock';
import REGRESSIONDATA from './regressionHeterosked.json';

export const SkedasticityReal = ({
    setProgress
}) => {
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [feedback1, setFeedback1] = useState('');
    const [feedback2, setFeedback2] = useState('');
    const [isSubmit1Disabled, setIsSubmit1Disabled] = useState(false);
    const [isSubmit2Disabled, setIsSubmit2Disabled] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const { slope, p_value: pvalueStandard, t_value: tvalueStandard,
        standard_error
    } = REGRESSIONDATA.non_robust;

    const { standard_error: robust_stderr,
        // eslint-disable-next-line no-unused-vars
        p_value: pvalueRobust, t_value: tvalueRobust } = REGRESSIONDATA.robust;

    const {confidence_interval: ciStandard} = REGRESSIONDATA.non_robust;
    const {confidence_interval: ciRobust} = REGRESSIONDATA.robust;
    const [lowStandard, highStandard] = ciStandard;
    const [lowRobust, highRobust] = ciRobust;

    const options1 = ['The data set is heteroskedastic.',
        'The data set is homoskedastic.'];
    const options2 = ['non-robust', 'robust'];
    const correctAnswerIndex1 = 0;
    const correctAnswerIndex2 = 1;

    const handleOptionSelect1 = (index) => {
        setSelectedOption1(index);
        setFeedback1('');
    };

    const handleOptionSelect2 = (index) => {
        setSelectedOption2(index);
        setFeedback2('');
    };

    const isCorrect1 = selectedOption1 === correctAnswerIndex1;
    const isCorrect2 = selectedOption2 === correctAnswerIndex2;

    const handleSubmit1 = () => {
        if (selectedOption1 === null) {
            setFeedback1('Please select an option before submitting.');
        } else {
            setIsSubmit1Disabled(true);
            if (isCorrect1) {
                setFeedback1('Correct! The dataset is heteroskedastic.');
            } else {
                setFeedback1('Incorrect. The dataset is heteroskedastic.');
            }
        }
    };

    const handleSubmit2 = () => {
        if (selectedOption2 === null) {
            setFeedback2('Please select an option before submitting.');
        } else {
            setIsSubmit2Disabled(true);
            if (isCorrect2) {
                setFeedback2('Correct! Robust SE is the better choice.');
            } else {
                setFeedback2('Incorrect. Robust SE is the better choice.');
            }
        }
    };

    const handleContinue = () => {
        setIsSubmit1Disabled(false);
        setIsSubmit2Disabled(false);
        setProgress(2);
        setFeedback1('');
        setFeedback2('');
        setSelectedOption1(null);
        setSelectedOption2(null);
    };

    return (
        <>
            <p>
                Let&rsquo;s apply what you&rsquo;ve learned about
                heteroskedasticity using a real-world dataset.
            </p>
            <p>
                This dataset uses a simple regression to estimate the growth
                of a country using the number of assassination attempts in
                that country. It contains data from 1960-1995 for 65 countries
                and is from &ldquo;Finance and the Sources of Growth&rdquo;
                <i> Journal of Financial Economics</i>, 2000, Vol. 58,
                pp. 261- 300.
            </p>
            <div>
                <p>
                    Look at the graph. Based on the plot, how would you
                    describe the dataset?
                </p>
                <div className="choice-list">
                    {options1.map((option, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id={`option1-${index}`}
                                name="datasetOptions1"
                                value={option}
                                onChange={
                                    () => handleOptionSelect1(index)}
                            />
                            <label className="form-check-label"
                                htmlFor={`option1-${index}`}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
                {feedback1 && (
                    <div className={
                        `${isCorrect1 ? 'answer-correct-container'
                            : 'answer-incorrect-container'}`}>
                        {isCorrect1 ? (
                            <div className="answer-correct">&#10003;</div>
                        ):<div className="answer-incorrect flex-shrink-0
                            align-self-start">!</div>}
                        {feedback1}
                    </div>
                )}
                <button
                    className="btn btn-sm btn-success mt-3"
                    id={'multiple-option1'}
                    disabled={isSubmit1Disabled}
                    onClick={handleSubmit1}>Submit</button>
            </div>
            <p className="mt-3">
                Examine the effects of heteroskedasticity on
                hypothesis testing results. The null hypothesis is as
                follows: {inlineKatex('H_0: \\beta_1 = 0')}, which states that
                GDP growth has no impact on the number of assassination
                attempts. Let&rsquo;s set the significance
                level, {inlineKatex('\\alpha = 0.10')}.
            </p>
            <p>
                Review the values calculated using non-robust and
                robust {inlineKatex('SE(\\hat{\\beta_1})')}
                in the following table.
            </p>
            <div className="mt-5 d-flex">
                <div className="h4 my-0 me-2">
                    Hypothesis test:
                </div>
                <Katex
                    tex={`
                        H_0: \\beta_1 = 0; ~ 
                        H_1: \\beta_1 \\neq 0; ~ 
                        \\alpha = 0.10
                    `}
                />
            </div>
            <table className="table table-bordered mb-5 mt-3">
                <thead>
                    <tr>
                        <td>&nbsp;</td>
                        <th scope="col">Non-robust</th>
                        <th scope="col">Robust</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <Katex tex={'{SE(\\hat{\\beta_1})}'} />
                        </th>
                        <td>
                            {standard_error.toFixed(2)}
                        </td>
                        <td>
                            {robust_stderr.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <Katex tex={'CI'} />
                        </th>
                        <td>
                            {`${lowStandard.toFixed(2)} `}
                            <Katex tex={'< \\beta_1 <'} />
                            {highStandard.toFixed(2)}
                        </td>
                        <td>
                            {`${lowRobust.toFixed(2)} `}
                            <Katex tex={'< \\beta_1 <'} />
                            {highRobust.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                Which SE would you choose?
            </p>
            <div className="choice-list">
                {options2.map((option, index) => (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id={`option2-${index}`}
                            name="datasetOptions2"
                            value={option}
                            onChange={() => handleOptionSelect2(index)}
                        />
                        <label className="form-check-label"
                            htmlFor={`option2-${index}`}>
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            {feedback2 && (
                <div className={
                    `${isCorrect2 ? 'answer-correct-container'
                        : 'answer-incorrect-container'}`}>
                    {isCorrect2 ? (
                        <div className="answer-correct">&#10003;</div>
                    ):<div className="answer-incorrect flex-shrink-0
                        align-self-start">!</div>}
                    {feedback2}
                </div>
            )}
            <button className="btn btn-sm btn-success mt-3"
                id={'multiple-option2'}
                disabled={isSubmit2Disabled}
                onClick={handleSubmit2}>
                    Submit
            </button>
            <p className="mt-3">
                As this real dataset example shows, our conclusion for the
                significance test would be incorrect if we use non-robust
                standard errors. Since this data set exhibits
                heteroskedasticity, we must use the heteroskedasticity robust
                standard errors.
            </p>

            {isSubmit2Disabled && (
                <div className="simulation__step-prompt">
                    <button
                        className="btn btn-sm btn-success"
                        onClick={handleContinue}>
                        Continue &raquo;
                    </button>
                </div>
            )}
        </>
    );
};

SkedasticityReal.propTypes = {
    setProgress: PropTypes.func
};