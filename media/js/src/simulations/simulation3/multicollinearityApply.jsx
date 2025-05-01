import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inlineKatex} from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import { PromptBlock } from '../../PromptBlock';
import DATA from './multicollinearityRealData.json';
import { Table } from '../../Table';
import { QuizComponent } from '../../Quiz';


export const MulticollinearityApply = ({
    controls, handleControls, handleProgress, submissionId
}) => {
    const [isQuestion1Correct, setIsQuestion1Correct] = useState(false);
    const [isQuestion2Correct, setIsQuestion2Correct] = useState(false);

    const options1 = [
        <>Exclude {inlineKatex('x_3')} (Sales) from the regression
            analysis.</>,
        <>Keep {inlineKatex('x_3')} (Sales), and conduct a joint hypothesis
            test.</>
    ];
    const correctAnswerIndex1 = 1;
    const correctFeedback1 = 'This is correct. Intuitively, we should keep ' +
                    'both R&D and sales variables. However, due to the high ' +
                    'correlation between these variables R&D slope now seems ' +
                    'to be not significant. Thus, we should test both slopes ' +
                    'jointly.';
    const incorrectFeedback1 = <p>This is not the correct step. Excluding
        {inlineKatex('x_3')} (Sales) will introduce omitted
        variable bias in the coefficient of R&D. Due to the high
        correlation between these variables R&D slope now seems to
        be not significant. But, we can test both slopes jointly
        and if they are jointly significant, we can keep both in
        the regression.</p>;


    const options2 = [
        'Reject the null hypothesis',
        'Fail to reject the null hypothesis'];
    const correctAnswerIndex2 = 0;

    const correctFeedback2 = <p>This is the correct conclusion for the
        hypothesis test. F-test value is larger that the critical
        value for {inlineKatex('\\alpha')} = 0.05. This results in
        rejecting {inlineKatex('H_0')}, which means R&D has an
        impact on Profit, which is correct intiutively.</p>;

    const incorrectFeedback2 = <p>This is an incorrect result for the hypothesis
        test. F-test value is larger that the critical value
        for {inlineKatex('\\alpha')} = 0.05. This results in
        failing to reject {inlineKatex('H_0')}, which means R&D has
        no impact on Profit, which isn&apos;t correct.</p>;

    const handleContinue = () => {
        handleProgress(2);
    };

    return <>
        <p>
            Let&rsquo;s apply what you&rsquo;ve learned about
            multicollinearity using a real-world dataset.
        </p>
        <p>
            This data set is from <i>Wooldridge Source: Businessweek R&amp;D
            Scoreboard</i>, October 25, 1991. It uses a regression to explain
            the variations in profits by research and
            development ({inlineKatex('\\text{R\\&D}')}),
            profit margins ({inlineKatex('\\text{Profit Margin}')}),
            and {inlineKatex('\\text{Sales}')}. Among these variables,
            {inlineKatex('\\text{R\\&D}')} and
            {inlineKatex('\\text{Profit Margin}')} have a low correlation,
            but {inlineKatex('\\text{R\\&D}')} and
            {inlineKatex('\\text{Sales}')} have a high correlation.
        </p>
        <h3 className="mt-4">
            High correlation effects
            on {inlineKatex('SE(\\hat{\\beta_1})')} values
        </h3>
        <p>
            Let&rsquo;s examine the correlations of the independent
            variables, {inlineKatex('\\text{R\\&D}')},
            {inlineKatex('\\text{Profit Margin}')},
            and {inlineKatex('\\text{Sales}')} and see how they
            affect {inlineKatex('SE(\\hat{\\beta_1})')} values,
            the related component values, and the hypothesis test
            results.
            Here, we&lsquo;re using the robust formula to calculate the
            standard errors.
        </p>
        <PromptBlock
            list={[
                'Add one variable at a time to the regression model',
                'Observe the resulting regression line on the graph and ' +
                'compare it to the original',
                'Compare the correlation coefficients of the independent ' +
                'variables',
                <>
            Contrast the resulting {inlineKatex('SE(\\hat{\\beta_1})~')}
            values
                </>,
                'Contrast the related component values, and the hypothesis ' +
                'test results.'
            ]}
        />
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
        <h4 className="mt-4">
            Regression line equations:
        </h4>
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
            Examine the effects of multicollinearity on hypothesis testing
            results. The null hypothesis is as
            follows: {inlineKatex('H_0: \\beta_1 = 0')}, which states
            that {inlineKatex('\\text{R\\&D}')} has no impact
            on {inlineKatex('\\text{Profits}')}. Let&lsquo;s set the
            significance level, {inlineKatex('\\alpha = 0.05')}.
        </p>
        <div className="mt-5 d-flex">
            <div className="h4 my-0 me-2">
                Hypothesis test:
            </div>
            <Katex
                tex={`
                    H_0: \\beta_1 = 0; ~ 
                    H_1: \\beta_1 \\neq 0; ~ 
                    \\alpha = 0.05
                `}
            />
        </div>

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
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
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
        <p>
            The high {inlineKatex('\\text{corr}(x_1,x_3)')} inflates
            the standard error of {inlineKatex('\\hat{\\beta_1}')}, and
            impacts the conclusions drawn from hypothesis testing:
            failing to reject {inlineKatex('H_0')}.
        </p>
        {/* Question 1: Multiple Choice */}
        <QuizComponent
            question="What is the next step to account for this difference in
            hypothesis test results?"
            options={options1}
            correctAnswerIndex={correctAnswerIndex1}
            correctFeedback={correctFeedback1}
            incorrectFeedback={incorrectFeedback1}
            submissionId={submissionId}
            questionNumber={6}
            setIsCorrect={setIsQuestion1Correct}
        />

        <h3 className="mt-4">
            Joint hypothesis testing to mitigate multicollinearity
        </h3>

        <p>
            Joint hypothesis testing gives us a reason to keep both variables
            in the regression when one is not significant due to the high
            correlation between them. We should test these two highly
            correlated
            variables, {inlineKatex('x_1 \\text{(R\\&D)}')} and
            {inlineKatex('x_3 \\text{(Sales)}')} jointly,
            using the {inlineKatex('F')}-test, to assess the collective
            significance of these variables.
        </p>
        <p>
            So here&lsquo;s the joint hypothesis test:
        </p>
        <p className="mb-0">
            <Katex tex={'H_0: \\beta_1 = \\beta_3 = 0;'} />
            <br />
            <Katex tex={'H_1: \\text{not} \\, H_0;'} />
            <br />
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
            Look up the critical value that corresponds
            to {inlineKatex('\\alpha = 0.05')} and compare it
            to {inlineKatex('F5')}-test statistics value.
        </p>
        <button
            className="btn btn-sm btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#criticalValModal">
            Critical value table
        </button>
        {/* Question 2: Multiple Choice */}
        <QuizComponent
            question="What is your conclusion for this joint hypothesis
            testing?"
            options={options2}
            correctAnswerIndex={correctAnswerIndex2}
            correctFeedback={correctFeedback2}
            incorrectFeedback={incorrectFeedback2}
            submissionId={submissionId}
            questionNumber={7}
            setIsCorrect={setIsQuestion2Correct}
        />
        {/* Continue Button */}
        {isQuestion1Correct && isQuestion2Correct && (
            <>
                <p>
                Multicollinearity (high correlation between variables) inflates
                the standard errors of the sample slopes, resulting in a
                decrease in the likelihood of rejection of the null hypothesis
                in the individual significance tests. Thus, finding population
                slopes insignificant. However, if we intuitively believe a
                variable is associated with the dependent variable but due to
                multicollinearity between independent variables, it seems that
                the association disappeared. Then, we can use joint significance
                tests. We can test highly correlated variables jointly to show
                that they are jointly significant. Otherwise, dropping an
                insignificant variable from the regression may cause OVB.
                </p>
                <div className="simulation__step-prompt">
                    <button className="btn btn-sm btn-success"
                        onClick={handleContinue}>
                        Continue &raquo;
                    </button>
                </div>
            </>
        )}
    </>;
};

MulticollinearityApply.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.bool).isRequired,
    handleControls: PropTypes.func.isRequired,
    handleProgress: PropTypes.func.isRequired,
    submissionId: PropTypes.number.isRequired
};
