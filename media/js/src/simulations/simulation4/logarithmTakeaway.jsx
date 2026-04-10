import React, { useState, useEffect } from 'react';
import { TakeawayQuestion } from '../../TakeawayQuestion';
import PropTypes from 'prop-types';
import { inlineKatex } from '../../utils/utils';

export const LogarithmTakeaway = ({
    submissionId, setProgress, progress, stage, coursePk
}) => {
    const [visibleIndex, setVisibleIndex] = useState(0);

    const handleProgress = (val) => {
        setProgress(progress.map((x, i) => i === stage ? val : x));
    };

    const questions = [
        {
            questionId: 19,
            questionText: <>
                Let the population regression equation be {inlineKatex('Ln ' +
                '(Y) = β0 + β1(X1) + β2(Ln (X2)) + u')},
                where {inlineKatex('Y')} is the salary in dollars per
                month, {inlineKatex('X1')} is the education in years,
                and {inlineKatex('X2')} is the experience in years. If we use a
                sample to estimate this regression, which interpretation is
                correct?
            </>,
            choices: [
                {
                    id: 'log-choice-A',
                    index: 'A',
                    text: <>
                        1% change in education is associated with
                        a {inlineKatex('β1%')} change in salary
                    </>,
                    isCorrect: false,
                    feedback: 'This is a log-linear regression for ' +
                    'education. Hence, education cannot be interpreted as ' +
                    'a percentage change.'
                },
                {
                    id: 'log-choice-B',
                    index: 'B',
                    text: <>
                        A one-year change in education is associated with
                        a {inlineKatex('100xβ1%')} change in salary
                    </>,
                    isCorrect: true,
                    feedback: 'Yes! This is a log-linear regression for ' +
                    'education. Hence, one unit change in education is ' +
                    'associated with a “100 times education coefficient %” ' +
                    'change in salary, which is the correct interpretation.'
                },
                {
                    id: 'log-choice-C',
                    index: 'C',
                    text: <>
                        A one-year change in education is associated with
                        a {inlineKatex('(β1/100)%')} change in salary
                    </>,
                    isCorrect: false,
                    feedback: 'This is a log-linear regression for ' +
                    'education. This interpretation in part C would have ' +
                    'been correct if it were a linear-log regression in ' +
                    'education.'
                },
                {
                    id: 'log-choice-D',
                    index: 'D',
                    text: <>
                        {inlineKatex('100xbeta1%')} change in education is
                        associated with a {inlineKatex('$100')} change in
                        salary
                    </>,
                    isCorrect: false,
                    feedback: <>
                        This is a log-linear regression for
                        education. Salary is in logs, and education is in
                        linear form. Hence, the interpretation should follow
                        that an additional year of education is associated
                        with a {inlineKatex('100xbeta1%')} change in salary.
                    </>
                },
                {
                    id: 'log-choice-E',
                    index: 'E',
                    text: <>
                        A {inlineKatex('1%')} change in experience is
                        associated with a {inlineKatex('100xβ1%')} change in
                        salary
                    </>,
                    isCorrect: false,
                    feedback: <>
                        This is a log-log regression for experience. Both
                        salary and experience are in logarithmic form. Hence,
                        the interpretation should follow that an
                        additional {inlineKatex('1%')} increase in experience
                        is associated with a {inlineKatex('beta2%')} change in
                        salary.
                    </>
                }
            ]
        },
        {
            questionId: 20,
            questionText:
            'The relationship between grade from an exam and the amount of ' +
            'time spent studying for the exam tends to be steep for smaller ' +
            'amounts of time studied, but less steep for higher amounts of ' +
            'time studied. How would you get the correct nonlinear ' +
            'specification between grade and the amount of time spent ' +
            'studying for an exam?',
            choices: [
                {
                    id: 'log2-choice-A',
                    index: 'A',
                    text: <>
                        By regressing {inlineKatex('Ln(grade)')} on the amount
                        of time spent studying.
                    </>,
                    isCorrect: false,
                    feedback: 'The quadratic shape explained in the question ' +
                    'cannot be accurately captured by a log-linear ' +
                    'regression. Think about other logarithmic forms that ' +
                    'can capture this relationship.'
                },
                {
                    id: 'log2-choice-B',
                    index: 'B',
                    text: 'By regressing grade on the amount of time ' +
                    'spent studying.',
                    isCorrect: false,
                    feedback: 'This answer describes a linear regression. ' +
                    'A linear regression cannot accurately capture the ' +
                    'quadratic shape explained in the question.'
                },
                {
                    id: 'log2-choice-C',
                    index: 'C',
                    text: <>
                        By regressing grade on the {inlineKatex('Ln(the ' +
                        'amount of time spent studying)')}
                    </>,
                    isCorrect: true,
                    feedback: 'Yes! A linear-log regression can accurately ' +
                    'capture the quadratic shape explained in the question.'
                },
                {
                    id: 'log2-choice-D',
                    index: 'D',
                    text: <>
                        By regressing {inlineKatex('Ln(the amount of time ' +
                        'spent studying)')} on {inlineKatex('Ln(grade)')}
                    </>,
                    isCorrect: false,
                    feedback: 'This answer describes a log-log regression, ' +
                    'however, the dependent variable and the regressor are ' +
                    'switched in this answer, hence it is incorrect.'
                },
                {
                    id: 'log2-choice-E',
                    index: 'E',
                    text: 'None of the above.',
                    isCorrect: false,
                    feedback: 'There is a choice that accurately describes ' +
                    'the quadratic shape explained in the question, which a ' +
                    'linear-log regression can effectively capture.'
                }
            ]
        },
        {
            questionId: 21,
            questionText: <>
                Let the population regression equation be {inlineKatex('Ln ' +
                '(Y) = β0 + β1(X1) + β2(Ln (X2)) + u')},
                where {inlineKatex('Y')} is the price of a house in
                dollars, {inlineKatex('X1')} is a binary indicator whether the
                house has a view or not, and {inlineKatex('X2')} is the size of
                the house. If we use a sample to estimate this regression,
                which interpretation is correct?
            </>,
            choices: [
                {
                    id: 'log3-choice-A',
                    index: 'A',
                    text: <>
                        A {inlineKatex('1%')} increase in the size of the house
                        is associated with a {inlineKatex('1%')} increase in
                        the price of the house.
                    </>,
                    isCorrect: false,
                    feedback: <>
                        This is a log-log regression in terms of size. So, you
                        correctly caught that both changes must be in logs;
                        however, you forgot to use {inlineKatex('β2')}. Now try
                        adding {inlineKatex('β2')} to your interpretation.
                    </>
                },
                {
                    id: 'log3-choice-B',
                    index: 'B',
                    text: <>
                        If a house has a view, the price is, on
                        average, {inlineKatex('β2')} dollars higher.
                    </>,
                    isCorrect: false,
                    feedback: <>
                        This is a log-linear regression in terms of view. You
                        have correctly interpreted the view; however, the
                        coefficient of view is not {inlineKatex('β2')}, but
                        rather {inlineKatex('β1')}.
                    </>
                },
                {
                    id: 'log3-choice-C',
                    index: 'C',
                    text: <>
                        A {inlineKatex('β2%')} change in the size of a house is
                        associated with a {inlineKatex('1%')} increase in the
                        house price.
                    </>,
                    isCorrect: false,
                    feedback: <>
                        This is a log-log regression in terms of size. So, you
                        correctly noticed that both changes must be expressed
                        in percentages; however, you should use
                        a {inlineKatex('β2%')} change for the price, not for
                        the size. Remember, we always
                        change {inlineKatex('X')} (size in this regression)
                        by {inlineKatex('1%')} first in log-log regressions.
                    </>
                },
                {
                    id: 'log3-choice-D',
                    index: 'D',
                    text: <>
                        If a house has a view, the price
                        is {inlineKatex('β2%')} higher.
                    </>,
                    isCorrect: false,
                    feedback: <>
                        This is a log-linear regression in terms of view. So,
                        the change cannot be interpreted as a percentage
                        change, and the coefficient of view is
                        not {inlineKatex('β2')}.
                    </>,
                },
                {
                    id: 'log3-choice-E',
                    index: 'E',
                    text: <>
                        A {inlineKatex('1%')} change in the size of a house is
                        associated with a {inlineKatex('β2%')} increase in the
                        house price.
                    </>,
                    isCorrect: true,
                    feedback: <>
                        This is a log-log regression in terms of size. So, you
                        correctly noticed that both changes must be expressed
                        in percentages and you correctly started your
                        interpretation with {inlineKatex('1%')} change
                        in {inlineKatex('X')} (size in this regression) is
                        associated with a {inlineKatex('β2%')} change
                        in {inlineKatex('Y')} (price in this regression).
                    </>
                }
            ]
        }
    ];

    useEffect(() => {
        if (visibleIndex === questions.length) {
            handleProgress(4);
        }
    }, [visibleIndex, questions.length, setProgress]);

    return (
        <div className="section-content text-start active py-4">
            {questions.slice(0, visibleIndex + 1).map((q, idx) => (
                <TakeawayQuestion
                    key={q.questionId}
                    questionId={q.questionId}
                    questionText={q.questionText}
                    choices={q.choices}
                    submissionId={submissionId}
                    onCorrect={() => setVisibleIndex(
                        i => Math.max(i, idx + 1))}
                />
            ))}
            {visibleIndex === questions.length && (
                <>
                    <div className="mx-3 mb-3 fw-medium text-center">
                        You&rsquo;ve successfully completed Logarithms!<br />
                        &#127881; &#127881; &#127881;
                    </div>
                </>
            )}
        </div>
    );
};

LogarithmTakeaway.propTypes = {
    submissionId: PropTypes.number,
    setProgress: PropTypes.func,
    progress: PropTypes.arrayOf(PropTypes.number),
    stage: PropTypes.number,
    coursePk: PropTypes.string
};
