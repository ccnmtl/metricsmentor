import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, STATIC_URL } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import DATA from './multicollinearityRealData.json';
import { Table } from '../../Table';


export const MulticollinearityApply = ({
    controls, handleControls, handleProgress
}) => {
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [feedback1, setFeedback1] = useState('');
    const [feedback2, setFeedback2] = useState('');
    const [isSubmit1Disabled, setIsSubmit1Disabled] = useState(false);
    const [isSubmit2Disabled, setIsSubmit2Disabled] = useState(false);

    const options1 = [
        <>Exclude {inlineKatex('x_3')} (Sales) from the regression
            analysis.</>,
        <>Keep {inlineKatex('x_3')} (Sales), and conduct a joint hypothesis
            test.</>
    ];
    const options2 = [
        'Reject the null hypothesis',
        'Fail to reject the null hypothesis'];
    const correctAnswerIndex1 = 1;
    const correctAnswerIndex2 = 0;

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
                setFeedback1('This is correct. Intuitively, we should keep ' +
                    'both R&D and sales variables. However, due to the high ' +
                    'correlation between these variables R&D slope now seems ' +
                    'to be not significant. Thus, we should test both slopes ' +
                    'jointly.');
            } else {
                setFeedback1(<p>This is not the correct step. Excluding
                    {inlineKatex('x_3')} (Sales) will introduce omitted
                    variable bias in the coefficient of R&D. Due to the high
                    correlation between these variables R&D slope now seems to
                    be not significant. But, we can test both slopes jointly
                    and if they are jointly significant, we can keep both in
                    the regression.</p>);
            }
        }
    };

    const handleSubmit2 = () => {
        if (selectedOption2 === null) {
            setFeedback2('Please select an option before submitting.');
        } else {
            setIsSubmit2Disabled(true);
            if (isCorrect2) {
                setFeedback2(<p>This is the correct conclusion for the
                    hypothesis test. F-test value is larger that the critical
                    value for {inlineKatex('\\alpha')} = 0.05. This results in
                    rejecting {inlineKatex('H_0')}, which means R&D has an
                    impact on Profit, which is correct intiutively.</p>);
            } else {
                setFeedback2(<p>This is an incorrect result for the hypothesis
                    test. F-test value is larger that the critical value
                    for {inlineKatex('\\alpha')} = 0.05. This results in
                    failing to reject {inlineKatex('H_0')}, which means R&D has
                    no impact on Profit, which isn&apos;t correct.</p>);
            }
        }
    };

    return <>
        <p>
            This segment is to ask users to work on Multicollinearity problems
            with real datasets. Instruction text goes here.
        </p>
        <p>
            Instructions for this step. Guide user with a narrative, lead them
            to what they need to pay attention to when turning on/off each
            variable.
        </p>
        <div className="prompt-block">
            <div className="prompt-gfx">
                <img src={`${STATIC_URL}/img/icon-bell.svg`}
                    className="prompt-img"
                    alt="Reminder:" />
            </div>
            <p className="mb-2">
            Tip on what to do and pay attention to. Yadda yadda yadda.
            </p>
        </div>
        <p>
            <strong>
                Choose one control variable on plot (need better header):
            </strong>
        </p>
        <div className="dataset-variable-item ps-4">
            {inlineKatex('x_1 \\text{(R\\&D)}')} only
        </div>
        {['x_2\\text{(Profit margin)}', 'x_3\\text{(Sales)}'].map((val, i) =>
            <div className='form-check dataset-variable-item' key={i}>
                <label htmlFor={val} className="form-check-label">
                    Add {inlineKatex(val)} to {inlineKatex('x_1')}
                </label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={val}
                    name={val}
                    value={i}
                    onChange={handleControls}
                    checked={controls[i] === true}
                />
            </div>
        )}
        <p className='mt-4'>
            <strong>
                Regression equation:
            </strong>
        </p>
        <div className="container">
            <p>{inlineKatex('x_1')} only:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x1.intercept} + ${DATA.x1.slope}x_1`)}</p>
            {controls[0] ?
                <p>With {inlineKatex('x_2')}:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x2.intercept} 
                    ${DATA.x2.slope_x1 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x2.slope_x1)}x_1 
                    ${DATA.x2.slope_x2 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x2.slope_x2)}x_2`)}</p>
                :
                null
            }
            {controls[1] ?
                <p>With {inlineKatex('x_3')}:&emsp;{inlineKatex(`\\hat{y} = 
                    ${DATA.x3.intercept} 
                    ${DATA.x3.slope_x1 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x3.slope_x1)}x_1 
                    ${DATA.x3.slope_x2 < 0 ? '-' : '+'} 
                    ${Math.abs(DATA.x3.slope_x2)}x_2`)}</p>
                :
                null
            }
        </div>
        <p>
            <strong>
                Multicollinearity effect on values:
            </strong>
        </p>
        <p> Placeholder for instruction text or explanation</p>
        <table className="table table-bordered mb-5 mt-3">
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <th scope="col">{inlineKatex('x_1')} only</th>
                    <th scope="col">With {inlineKatex('x_2')}</th>
                    <th scope="col">With {inlineKatex('x_3')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td>
                        <Katex tex={`corr(x_1, x_2): ${DATA.x2.corr_x1}`} />
                    </td>
                    <td>
                        <Katex tex={`corr(x_1, x_3): ${DATA.x3.corr_x1}`} />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='SE(\hat{\beta_1})' /></th>
                    <td><Katex tex={`${DATA.x1.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x2.stderr}`} /></td>
                    <td><Katex tex={`${DATA.x3.stderr}`} /></td>
                </tr>
            </tbody>
        </table>
        <p>
            <strong>
                Multicollinearity effect on hypothesis testing:
            </strong>
        </p>
        <p>
            Here is the explanation of how Multicollinearity can affect
            hypothesis testing.
        </p>
        <p>For example:</p>
        {inlineKatex(
            // eslint-disable-next-line max-len
            'H_0: \\beta_1 = 0; \\quad H_1: \\beta_1 \\neq 0; \\quad \\alpha = 0.05')}
        <table className="table table-bordered mb-5 mt-3">
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <th scope="col">{inlineKatex('x_1')} only</th>
                    <th scope="col">With {inlineKatex('x_2')}</th>
                    <th scope="col">With {inlineKatex('x_3')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td>
                        <Katex tex={`corr(x_1, x_2): ${DATA.x2.corr_x1}`} />
                    </td>
                    <td>
                        <Katex tex={`corr(x_1, x_3): ${DATA.x3.corr_x1}`} />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='SE(\hat{\beta_1})' /></th>
                    <td><Katex tex={`${DATA.x1.stderr.toFixed(4)}`} /></td>
                    <td><Katex tex={`${DATA.x2.stderr.toFixed(4)}`} /></td>
                    <td><Katex tex={`${DATA.x3.stderr.toFixed(4)}`} /></td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='t' /></th>
                    <td><Katex tex={`${DATA.x1.t}`} /></td>
                    <td><Katex tex={`${DATA.x2.t}`} /></td>
                    <td><Katex tex={`${DATA.x3.t}`} /></td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='p-value' /></th>
                    <td><Katex tex={`${DATA.x1.pvalue}`} /></td>
                    <td><Katex tex={`${DATA.x2.pvalue}`} /></td>
                    <td><Katex tex={`${DATA.x3.pvalue}`} /></td>
                </tr>
                <tr>
                    <th scope="row">
                        <Katex tex='CI' /></th>
                    <td>
                        <Katex tex={`${DATA.x1.ci[0].toFixed(2)}`} />
                        <Katex tex={'< \\beta_1 <'} />
                        <Katex tex={`${DATA.x1.ci[1].toFixed(2)}`} />
                    </td>
                    <td>
                        <Katex tex={`${DATA.x2.ci[0].toFixed(2)}`} />
                        <Katex tex={'< \\beta_1 <'} />
                        <Katex tex={`${DATA.x2.ci[1].toFixed(2)}`} />
                    </td>
                    <td>
                        <Katex tex={`${DATA.x3.ci[0].toFixed(2)}`} />
                        <Katex tex={'< \\beta_1 <'} />
                        <Katex tex={`${DATA.x3.ci[1].toFixed(2)}`} />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Hypothesis test</th>
                    <td>Reject</td>
                    <td>Reject</td>
                    <td>Fail to reject</td>
                </tr>
            </tbody>
        </table>
        <p>Placeholder fo explanation of what&apos;s going on. </p>
        <p> Look at the graph. What do you think the dataset is?</p>
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
            className="btn btn-sm btn-success my-3"
            id={'multiple-option1'}
            disabled={isSubmit1Disabled}
            onClick={handleSubmit1}>Submit</button>
        <p><strong>
            Joint Hypothesis testing to mitigate Multicollinearity:
        </strong></p>
        <p>
            Here is the explanation of how to mitigate
            Multicollinearity. Join hypothesos and using F-test
            statistics to lookup critical value.
        </p>
        <p>
            Lorem ipsum sit amet, more text.
        </p>
        <p className="mb-0">
            <Katex tex={'H_0: \\beta_1 = \\beta_3 = 0;'} />
        </p>
        <p className="mb-0">
            <Katex tex={'H_1: \\text{not} \\, H_0;'} />
        </p>
        <p className="mb-0">
            <Katex tex={'\\alpha = 0.05'} />
        </p>
        <Table
            headers={[]}
            rows={[
                [
                    {content: <Katex tex={'corr(x_1, x_3)'} />},
                    {content: <Katex tex={`${DATA.x3.corr_x1}`} />},
                ],
                [
                    {content: <Katex tex={'SE(\\hat{\\beta_1})'} />},
                    {content: <Katex tex={`${DATA.x3.stderr}`} />},
                ],
                [
                    {content: <Katex tex={'F\\text{-}test'} />},
                    {content: <Katex tex={`${DATA.x3.ftest}`} />},
                ],
                [
                    {content: <Katex tex={'p\\text{-value}'} />},
                    {content: <Katex tex={`${DATA.x3.jointP}`} />},
                ],
            ]} />
        <p>
            Look up the critical value that corresponds to &alpha; =
            0.05 and compare it to F-test statistics value.
        </p>
        <button
            className="btn btn-sm btn-secondary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#criticalValModal">
            Look up critical values &raquo;
        </button>
        <div className="choice-list">
            {options2.map((option, index) => (
                <div key={index} className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id={`option2-${index}`}
                        name="datasetOptions2"
                        value={option}
                        onChange={
                            () => handleOptionSelect2(index)}
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
        <button className="btn btn-sm btn-success my-3"
            id={'multiple-option2'}
            disabled={isSubmit2Disabled}
            onClick={handleSubmit2}>
                Submit
        </button>
        <p>Placeholder for conclusion text to end this segment.</p>
        {isSubmit2Disabled &&
            <div className="simulation__step-prompt">
                <button className="btn btn-sm btn-success"
                    onClick={() => handleProgress(2)}
                >
                    Continue &raquo;
                </button>
            </div>
        }
    </>;
};

MulticollinearityApply.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.bool).isRequired,
    handleControls: PropTypes.func.isRequired,
    handleProgress: PropTypes.func.isRequired
};
