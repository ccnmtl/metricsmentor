import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';
import { PromptBlock } from '../../PromptBlock';
import REGRESSIONDATA from './regressionHeterosked.json';

export const SkedasticityReal = ({
    setUseRealDataSked, useRealDataSked
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
        setFeedback1(''); // Clear feedback when a new option is selected
    };

    const handleOptionSelect2 = (index) => {
        setSelectedOption2(index);
        setFeedback2(''); // Clear feedback when a new option is selected
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

    return (
        <>
            <p> This segment is to ask users to work on Heteroskedasticity
                problem with real data.
            </p>
            <PromptBlock
                text={'There may be a prompt block here.'} />

            <div>
                <p> Look at the graph. What do you think the dataset is? </p>
                <div className="choice-list">
                    {options1.map((option, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id={`option1-${index}`}
                                name="datasetOptions"
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
            <p>
                Narrative on explanation of the null hypothesis and
                inpact on the outcome. Language is relevant to the
                dataset.
            </p>
            <p>
                Narrative is important. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nullam nec tincidunt
                magna. Sed nec metus nec sapien ultricies
            </p>
            <PromptBlock
                text={'There may be a prompt block here.'} />

            <table className="table table-bordered mb-5 mt-3">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">non-robust</th>
                        <th scope="col">robust</th>
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
                <Katex tex={
                // eslint-disable-next-line max-len
                    'H_0: \\beta_1 = 0; \\quad H_1: \\beta_1 \\neq 0; \\quad \\alpha = 0.05'} />
            </p>
            <PromptBlock
                text={'There may be a prompt block here.'} />
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
                            name="datasetOptions"
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
        </>
    );
};

SkedasticityReal.propTypes = {
    slope: PropTypes.number,
    intercept: PropTypes.number,
    standardError: PropTypes.number,
    robustStandardError: PropTypes.number,
    setUseRealDataSked: PropTypes.func,
    useRealDataSked: PropTypes.bool,
};