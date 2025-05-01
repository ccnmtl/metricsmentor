import React, { useState } from 'react';
import { TakeawayQuestion } from '../../TakeawayQuestion';
import PropTypes from 'prop-types';

export const MulticollinearityTakeaway = ({ submissionId }) => {
    const [visibleIndex, setVisibleIndex] = useState(0);

    const questions = [
        {
            questionId: 8,
            questionText: 'What is <b>multicollinearity</b>?',
            choices: [
                {
                    id: 'multi-choice-A',
                    index: 'A',
                    text: 'Multicollinearity refers to high correlation '
                    + 'between one of the independent variables and the' +
                    ' error term.',
                    isCorrect: false,
                    feedback: 'This is endogeneity not multicollinearity.'
                },
                {
                    id: 'multi-choice-B',
                    index: 'B',
                    text: 'Multicollinearity refers to high correlation ' +
                    'between one of the independent variables and the ' +
                    'dependent variable.',
                    isCorrect: false,
                    feedback: 'Independent variables and the dependent ' +
                    'variables are supposed to be correlated in regression' +
                    ' models.'
                },
                {
                    id: 'multi-choice-C',
                    index: 'C',
                    text: 'Multicollinearity refers to high correlation ' +
                    'between the error term and the dependent variable.',
                    isCorrect: false,
                    feedback: 'The dependent variable will always be ' +
                    'correlated with the error term.'
                },
                {
                    id: 'multi-choice-D',
                    index: 'D',
                    text: 'Multicollinearity refers to high correlation ' +
                    'between independent variables.',
                    isCorrect: true,
                    feedback: 'Excellent!, Multicollinearity refers to high' +
                    ' correlation between any two independent variables.'
                }
            ]
        },
        {
            questionId: 9,
            questionText: 'If two regressors are highly correlated in a linear'
                        + ' regression, test statistic for significance test '
                        + 'for those two coefficients tends to',
            choices: [
                {
                    id: 'multi2-choice-A',
                    index: 'A',
                    text: 'tends to reject more often, because the standard ' +
                    'error is higher.',
                    isCorrect: false,
                    feedback: 'Because the standard errors of sample slopes ' +
                    'are higher if regressors are correlated, the significance'
                    + ' test tends to reject less often.'
                },
                {
                    id: 'multi2-choice-B',
                    index: 'B',
                    text: 'tends to reject less often, because the standard ' +
                    'error is lower.',
                    isCorrect: false,
                    feedback: 'The significance test tends to reject less ' +
                    'often because the standard errors are higher not because'
                    + ' standard errors are lower.'
                },
                {
                    id: 'multi2-choice-C',
                    index: 'C',
                    text: 'is less likely to reject, because the standard ' +
                    'error is higher.',
                    isCorrect: true,
                    feedback: 'Excellent!'
                },
                {
                    id: 'multi2-choice-D',
                    index: 'D',
                    text: 'is more likely to reject, because the standard ' +
                    'error is higher.',
                    isCorrect: false,
                    feedback: 'On the contrary, the hypothesis test is less ' +
                    'likely to be rejected because standard errors are higher.'
                }
            ]
        },
        {
            questionId: 10,
            questionText: 'What to do if there is multicollinearity?',
            choices: [
                {
                    id: 'multi3-choice-A',
                    index: 'A',
                    text: 'Get rid of both regressors that are highly ' +
                    'correlated.',
                    isCorrect: false,
                    feedback: 'This will cause omitted variable bias plus if' +
                    ' you get rid of the “important” variable, you cannot ' +
                    'answer the research question.'
                },
                {
                    id: 'multi3-choice-B',
                    index: 'B',
                    text: 'Keep the “important” regressor and get rid of the' +
                    ' other one.',
                    isCorrect: false,
                    feedback: 'This will cause omitted variable bias in the ' +
                    'sample slope of the “important” regressor.'
                },
                {
                    id: 'multi3-choice-C',
                    index: 'C',
                    text: 'Test both of them jointly and if they are jointly' +
                    ' significant keep both regressors in the regression.',
                    isCorrect: true,
                    feedback: 'Excellent! Testing them jointly gives us an ' +
                    '“excuse” to keep both regressors in the regression model.'
                },
                {
                    id: 'multi3-choice-D',
                    index: 'D',
                    text: 'Test both of them jointly and if they are jointly' +
                    ' significant keep the important regressors in the ' +
                    'regression and get rid of the unimportant one.',
                    isCorrect: false,
                    feedback: 'Testing them jointly gives us an “excuse” to ' +
                    'keep both regressors in the regression model, so we do ' +
                    'not need to get rid of any of the regressors if they ' +
                    'are jointly significant.'
                }
            ]
        }
    ];

    return (
        <>
            {questions.slice(0, visibleIndex + 1).map((q, idx) => (
                <TakeawayQuestion
                    key={q.questionId}
                    questionId={q.questionId}
                    questionText={q.questionText}
                    choices={q.choices}
                    submissionId={submissionId}
                    onCorrect={() =>
                        setVisibleIndex(i => Math.max(i, idx + 1))}

                />
            ))}
        </>
    );
};

MulticollinearityTakeaway.propTypes = {
    submissionId: PropTypes.string.isRequired
};
