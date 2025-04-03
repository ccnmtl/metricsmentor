import React, { useState } from 'react';
import { TakeawayQuestion } from '../../TakeawayQuestion';
import PropTypes from 'prop-types';

export const HeteroskedTakeaway = ({ submissionId }) => {
    const [visibleIndex, setVisibleIndex] = useState(0);

    const questions = [
        {
            questionId: 1,
            questionText: 'What is <b>heteroskedasticity</b>?',
            choices: [
                {
                    id: 'hetero-choice-A',
                    index: 'A',
                    text: 'Conditional variance of the error is constant under'
                        +   ' heteroskedasticity.',
                    isCorrect: false,
                    feedback: 'Conditional variance of the error is constant ' +
                              'under homoskedasticity, not under ' +
                              'heteroskedasticity.'
                },
                {
                    id: 'hetero-choice-B',
                    index: 'B',
                    text: 'Conditional variance of the error depends on the ' +
                          'regressor (X) under homoskedasticity.',
                    isCorrect: false,
                    feedback: 'Conditional variance of the error depends on ' +
                              'the regressor (X) under heteroskedasticity' +
                              ', not homoskedasticity.'
                },
                {
                    id: 'hetero-choice-C',
                    index: 'C',
                    text: 'Conditional variance of the error depends on the ' +
                          'regressor (X) under heteroskedasticity.',
                    isCorrect: true,
                    feedback: 'Excellent! You know the meaning of ' +
                              'heteroskedasticity.'
                },
                {
                    id: 'hetero-choice-D',
                    index: 'D',
                    text: 'Conditional variance of the error depends on the ' +
                          'dependent variable (Y) under heteroskedasticity.',
                    isCorrect: false,
                    feedback: 'Conditional variance of the error depends on ' +
                              'the regressor (X), not on Y under ' +
                              'heteroskedasticity.'
                }
            ]
        },
        {
            questionId: 2,
            questionText: '<b>Heteroskedasticity affects…</b>',
            choices: [
                {
                    id: 'hetero2-choice-A',
                    index: 'A',
                    text: 'The sample slope',
                    isCorrect: false,
                    feedback: 'Heteroskedasticity does not affect the sample ' +
                              'slope, it affects the standard errors of the ' +
                              'sample slope only.'
                },
                {
                    id: 'hetero2-choice-B',
                    index: 'B',
                    text: 'The population slope',
                    isCorrect: false,
                    feedback: 'Heteroskedasticity does not affect the ' +
                              'population slope, it affects the standard ' +
                              'errors of the sample slope only.'
                },
                {
                    id: 'hetero2-choice-C',
                    index: 'C',
                    text: 'The standard errors of the sample slope.',
                    isCorrect: true,
                    feedback: 'Excellent!'
                },
                {
                    id: 'hetero2-choice-D',
                    index: 'D',
                    text: 'The variance of the population slope.',
                    isCorrect: false,
                    feedback: 'Heteroskedasticity happens in the sample, so ' +
                              'we do not know about the population variance; ' +
                              'it affects the standard errors of the sample ' +
                              'slope only.'
                }
            ]
        },
        {
            questionId: 3,
            questionText: '<b>Which one of the following is true under ' +
                          'heteroskedasticity?</b>',
            choices: [
                {
                    id: 'hetero3-choice-A',
                    index: 'A',
                    text: 'Standard error of the sample slope may be higher ' +
                          'or lower under heteroskedasticity unless the ' +
                          'robust formula is used.',
                    isCorrect: true,
                    feedback: 'Excellent! Heteroskedasticity affects standard '
                            + 'errors of the sample slope but not the sample'
                            + ' slope.'
                },
                {
                    id: 'hetero3-choice-B',
                    index: 'B',
                    text: 'Sample slope is unbiased because of ' +
                          'heteroskedasticity.',
                    isCorrect: false,
                    feedback: 'Heteroskedasticity does not affect the sample ' +
                              'slope, it affects the standard errors of the ' +
                              'sample slope only.'
                },
                {
                    id: 'hetero3-choice-C',
                    index: 'C',
                    text: 'Standard error of the sample slope does not change '
                            + 'under heteroskedasticity.',
                    isCorrect: false,
                    feedback: 'Heteroskedasticity affects the standard errors '
                            + 'of the sample slope; the robust formula is ' +
                              'needed under heteroskedasticity.'
                },
                {
                    id: 'hetero3-choice-D',
                    index: 'D',
                    text: 'Sample slope is biased because of ' +
                          'heteroskedasticity.',
                    isCorrect: false,
                    feedback: 'Heteroskedasticity affects the standard errors '
                            + 'of the sample slope; the robust formula is ' +
                              'needed under heteroskedasticity.'
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
                        setVisibleIndex(i => Math.max(i, idx + 1))
                    }
                />
            ))}
        </>
    );
};

HeteroskedTakeaway.propTypes = {
    submissionId: PropTypes.number.isRequired
};