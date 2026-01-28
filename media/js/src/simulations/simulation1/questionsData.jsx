import React from 'react';
import { Katex } from '../../utils/katexComponent';

export const questionsData = [
    {
        id: 7,
        header: 'Takeaway',
        choiceKey: 'A',
        question: (
            <span>
        Based on what you have learned from this
        exercise, which of the following is true?
            </span>
        ),
        options: [
            <span key="option1">
        A. The closer the correlation between y and x<sub>1</sub> is to one, the
                <strong> less likely</strong> it is to reject the null
                hypothesis <Katex tex={' \\beta_1 = 0'} />.
            </span>,
            <span key="option2">
        B. The closer the correlation between y and x<sub>1</sub> is to negative
        one, the <strong> less likely</strong> it is to reject the null
        hypothesis <Katex tex={' \\beta_1 = 0'} />.
            </span>,
            <span key="option3">
        C. The closer the correlation between y and x<sub>1</sub> is to zero,
        the <strong> more likely</strong> it is to reject the null
                hypothesis <Katex tex={' \\beta_1 = 0'} />.
            </span>,
            <span key="option4">
        D. The closer the correlation between y and x<sub>1</sub> is to zero,
        the <strong> less likely</strong> it is to reject the null
                hypothesis <Katex tex={' \\beta_1 = 0'} />.
            </span>,
            <span key="option5">E. None of these are correct.</span>,
        ],
        correctOption:
        <span key="option4">
        D. The closer the correlation between y and x<sub>1</sub> is to zero,
        the <strong> less likely</strong> it is to reject the null
                hypothesis <Katex tex={' \\beta_1 = 0'} />.
        </span>,
        feedback: {
            correct: (
                <span>
          Excellent! You’ve correctly identified that a higher correlation
          between the dependent variable y and the independent variable
          x<sub>1</sub> would mean a non-zero slope.
                </span>
            ),
            incorrect: {
                0: (
                    <span>
            Let’s try again! If the correlation between y and x<sub>1</sub> is
            close to one, it is likely that the sample slope is NOT close to
            zero, so it is more likely that we would reject the null hypothesis.
                    </span>
                ),
                1: (
                    <span>
            Let’s try again! If the correlation between y and x<sub>1</sub> is
            close to negative one, it is likely that the sample slope is NOT
            close to zero, so it is more likely that we would reject the null
            hypothesis.
                    </span>
                ),
                2: (
                    <span>
            Let’s try again! We would NOT reject the null hypothesis if the
            correlation between y and x<sub>1</sub> is close to zero because the
            sample slope would not be significantly different than zero.
                    </span>
                ),
                4: (
                    <span>
            Let’s try again! Choice A is incorrect because if the correlation
            between y and x<sub>1</sub> is close to one, it is likely that the
            sample slope is NOT close to zero. Choice B is incorrect because if
            the correlation between y and x<sub>1</sub> is close to negative
            one, it is likely that the sample slope is NOT close to zero. Choice
            C is incorrect because we would NOT reject the null hypothesis if
            the correlation between y and x<sub>1</sub> is close to zero.
                    </span>
                ),
            },
        },
    },
    {
        id: 14,
        header: 'Qualifier',
        question: (
            <span>
        If we change the null hypothesis to sample slope to be
                <strong> at least</strong> zero,
        the alternative hypothesis should change to which of the following? And
        how will that affect the critical value of your test given the same
        significance level as in the two-sided test?
            </span>
        ),
        options: [
            <span key="option1">
        The alternative hypothesis must be <strong> greater than </strong>
        the same value, and
        the critical value would be larger in absolute value.
            </span>,
            <span key="option2">
        The alternative hypothesis must be <strong> greater than </strong>
        the same value, and the critical value would be smaller in absolute
        value.
            </span>,
            <span key="option3">
        The alternative hypothesis must be <strong> less than </strong>
        the same value, and the
        critical value would be larger in absolute value.
            </span>,
            <span key="option4">
        The alternative hypothesis must be <strong> less than </strong>
        the same value, and the
        critical value would be smaller in absolute value.
            </span>,
        ],
        correctOption:
        <span key="option4">
        The alternative hypothesis must be <strong> less than </strong>
        the same value, and the
        critical value would be smaller in absolute value.
        </span>,
        feedback: {
            correct: (
                <span>
          Excellent! You have correctly identified that the null and the
          alternative hypotheses must be exhaustive and mutually exclusive and
          that we do not need to divide the significance level by two when it is
          a single-sided hypothesis.
                </span>
            ),
            incorrect: {
                0: (
                    <span>
            Let’s try again! Remember that the null and the alternative
            hypotheses must be exhaustive and mutually exclusive. Hence, if the
            null hypothesis is <strong> at least </strong>
            (meaning greater than or equal to),
            the alternative hypothesis must be <strong> less than </strong>
            not <strong> greater than.</strong>
                    </span>
                ),
                1: (
                    <span>
            Let’s try again! You correctly identified that we do not divide the
            significance level by two in a single-sided alternative hypothesis.
                    </span>
                ),
                2: (
                    <span>
            Let’s try again! You correctly identified the alternative
            hypothesis, but remember, in a two-sided hypothesis, we divide the
            significance level by two.
                    </span>
                ),
            },
        },
    },
    {
        id: 15,
        header: 'Takeaway',
        choiceKey: 'C',
        question: (
            <span>
        If we change the null hypothesis to be <strong> at most </strong>
        a value like zero, then
        the alternative hypothesis should change to which one of the following?
        And how will that affect the critical value of your test given the same
        significance level as in the two-sided test?
            </span>
        ),
        options: [
            <span key="option1">
        The alternative hypothesis must be <strong> greater than </strong>
        the same value, and the critical value would be larger.
            </span>,
            <span key="option2">
        The alternative hypothesis must be <strong> greater than </strong>
        the same value, and the critical value would be smaller.
            </span>,
            <span key="option3">
        The alternative hypothesis must be <strong> less than </strong>
        the same value, and the critical value would be larger.
            </span>,
            <span key="option4">
        The alternative hypothesis must be <strong> less than </strong>
        the same value, and the
        critical value would be smaller.
            </span>,
        ],
        correctOption:
        <span key="option2">
        The alternative hypothesis must be <strong> greater than </strong>
        the same value, and the critical value would be smaller.
        </span>,
        feedback: {
            correct: (
                <span>
          Excellent! You have correctly identified that the null and the
          alternative hypotheses must be exhaustive and mutually exclusive and
          that we do not need to divide the significance level by two when it is
          a single-sided hypothesis.
                </span>
            ),
            incorrect: {
                0: (
                    <span>
            Let’s try again! Remember that the null and the alternative
            hypotheses must be exhaustive and mutually exclusive. Hence, if the
            null hypothesis is <strong> at most </strong>
            (meaning less than or equal to), the alternative hypothesis must be
                        <strong> greater than.</strong>
                    </span>
                ),
                2: (
                    <span>
            Let’s try again! Remember that the null and the alternative
            hypotheses must be exhaustive and mutually exclusive.
                    </span>
                ),
                3: (
                    <span>
            Let’s try again! Remember in a two-sided hypothesis, we divide the
            significance level by two, but this is a single-sided hypothesis.
                    </span>
                ),
            },
        },
    },
    {
        id: 13,
        choiceKey: 'A',
        header: 'Takeaway',
        question: (
            <span>
        As we add x<sub>2</sub> to the regression:
            </span>
        ),
        options: [
            <span key="option1">
        The slope of x<sub>1</sub>, <Katex tex={'\\hat{\\beta}_1'} />, changed.
            </span>,
            <span key="option2">
        The standard error of the slope of x<sub>1</sub>,
        SE(<Katex tex={'\\hat{\\beta}_1'} />), changed.
            </span>,
            <span key="option3">
                The intercept of the regression line,
                <Katex tex={'\\hat{\\beta}_0'} />, changed.
            </span>,
            <span key="option4">All choices are correct.</span>,
        ],
        correctOption: <span key="option4">All choices are correct.</span>,
        feedback: {
            correct: (
                <span>
          Excellent! You have correctly identified that when we add control
          variables to the regression, the regression line changes hence the
          slope of the variable of interest, its standard error, and the
          intercept change as well.
                </span>
            ),
            incorrect: {
                0: (
                    <span>
            Let’s try again! You correctly identified that the slope of
            x<sub>1</sub> changes. However, what happens to the standard
            error and the intercept of the regression line?
                    </span>
                ),
                1: (
                    <span>
            Let’s try again! You correctly identified that the standard error
            changes. However, what happens to the slope and the intercept of the
            regression line?
                    </span>
                ),
                2: (
                    <span>
        Let’s try again! You correctly identified that the intercept changes.
        However, what happens to the slope and the standard error of the
        regression line?
                    </span>
                ),
            },
        },
    },
];