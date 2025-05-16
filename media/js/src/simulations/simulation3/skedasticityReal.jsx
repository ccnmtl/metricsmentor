import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inlineKatex } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import REGRESSIONDATA from './regressionHeterosked.json';
import { QuizComponent } from '../../Quiz';

export const SkedasticityReal = ({ setProgress, submissionId }) => {
    const { standard_error } = REGRESSIONDATA.non_robust;
    const { standard_error: robust_stderr } = REGRESSIONDATA.robust;
    const { confidence_interval: ciStandard } = REGRESSIONDATA.non_robust;
    const { confidence_interval: ciRobust } = REGRESSIONDATA.robust;
    const [lowStandard, highStandard] = ciStandard;
    const [lowRobust, highRobust] = ciRobust;
    const [isQuestion1Correct, setIsQuestion1Correct] = useState(false);
    const [isQuestion2Correct, setIsQuestion2Correct] = useState(false);

    // Question 1
    const options1 = ['The dataset exhibits heteroskedasticity.',
        'The dataset exhibits homoskedasticity.'];
    const correctAnswerIndex1 = 0;
    const correctFeedback1 = `That's correct! The plot shows a common
                    "fan-shape" or "cone-shaped" pattern around the regression
                    line, indicating that the dataset exhibits
                    heteroskedasticity.`;
    const incorrectFeedback1 = `That's incorrect. The plot shows a common
                    "fan-shaped" or "cone-shaped" pattern around the
                    regression line, indicating that the dataset
                    exhibits heteroskedasticity.`;

    // Question 2
    const options2 = [
        { label: 'The non-robust ', math: 'SE(\\hat{\\beta_1})' },
        { label: 'The robust ', math: 'SE(\\hat{\\beta_1})' }];
    const correctAnswerIndex2 = 1;
    const correctFeedback2 = (
        <span>
        That&apos;s the correct conclusion for the hypothesis
        test. The null hypothesis states that <Katex tex={
                '\\beta_1 = 0'} />, and zero doesn&apos;t lie
        within the CI range. This results in rejecting{' '}
            <Katex tex="H_0" />, which means the number of
        assassination attempts in a country is associated with
        GDP growth.
        </span>
    );
    const incorrectFeedback2 = (
        <span>
            That&apos;s an incorrect conclusion for the
            hypothesis test. The null hypothesis states that
            <Katex tex="\\beta_1 = 0" />, and zero lies within the
            CI range, which means we fail to reject{' '}
            <Katex tex="H_0" />. This result means that the number
            of assassination attempts in a country is not
            associated with GDP growth.
        </span>
    );

    const handleContinue = () => {
        setProgress(2);
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
            {/* Question 1 */}
            <QuizComponent
                question="Look at the graph. Based on the plot,
                how would you describe the dataset?"
                options={options1}
                correctAnswerIndex={correctAnswerIndex1}
                correctFeedback={correctFeedback1}
                incorrectFeedback={incorrectFeedback1}
                submissionId={submissionId}
                questionNumber={1}
                setIsCorrect={setIsQuestion1Correct}
            />
            {isQuestion1Correct && (
                <>
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
                    {/* Question 2*/}
                    <QuizComponent
                        question={<>Based on these values,
                            which <Katex tex={'{SE(\\hat{\\beta_1})}\\ '} />
                            will you choose?</>}
                        options={options2.map(option => option.label)}
                        correctAnswerIndex={correctAnswerIndex2}
                        correctFeedback={correctFeedback2}
                        incorrectFeedback={incorrectFeedback2}
                        submissionId={submissionId}
                        questionNumber={2}
                        setIsCorrect={setIsQuestion2Correct}
                    />
                </>
            )}
            {isQuestion1Correct && isQuestion2Correct && (
                <>
                    <p className="mt-3">
                    As this real dataset example shows, our conclusion for the
                    significance test would be incorrect if we use non-robust
                    standard errors. Since this data set exhibits
                    heteroskedasticity, we must use the heteroskedasticity
                    robust standard errors.
                    </p>
                    <div className="simulation__step-prompt">
                        <button className="btn btn-sm btn-success"
                            data-cy="to-takeaway"
                            onClick={handleContinue}>
                            Continue &raquo;
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

SkedasticityReal.propTypes = {
    setProgress: PropTypes.func,
    submissionId: PropTypes.number.isRequired
};
