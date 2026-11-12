import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TakeawayQuestion } from '../../TakeawayQuestion';
import { inlineKatex } from '../../utils/utils';

const D1D2_MODEL = 'Y_i = \\beta_0 + \\beta_1 \\text{D1}_i + ' +
    '\\beta_2 \\text{D2}_i + \\beta_3 (\\text{D1}_i \\times \\text{D2}_i) + ' +
    '\\varepsilon_i';

const FEMALE_COLLEGE_MODEL = 'Y_i = \\beta_0 + \\beta_1 \\text{Female}_i + ' +
    '\\beta_2 \\text{College}_i + ' +
    '\\beta_3 (\\text{Female}_i \\times \\text{College}_i) + \\varepsilon_i';

const b = (n) => inlineKatex(`\\beta_${n}`);

export const D1xD2Takeaway = ({
    submissionId, setStage, setProgress, progress, stage
}) => {
    const [visibleIndex, setVisibleIndex] = useState(0);

    const handleProgress = (val) => {
        setProgress(progress.map((x, i) => i === stage ? val : x));
    };

    const questions = [
        {
            questionId: 21,
            questionText: <>
                In the regression {inlineKatex(D1D2_MODEL)}, where D1 and D2
                are dummy variables, what does the coefficient {b(3)} capture?
            </>,
            choices: [
                {
                    id: 'd1d2-takeaway1-choice-A',
                    index: 'A',
                    text: 'The individual effect of D1 on Y',
                    isCorrect: false,
                    feedback: <>
                        {b(1)} captures the individual effect of D1 on Y
                    </>
                },
                {
                    id: 'd1d2-takeaway1-choice-B',
                    index: 'B',
                    text: 'The additional effect on Y when both D1 = 1 and ' +
                        'D2 = 1, beyond their separate effects',
                    isCorrect: true,
                    feedback: <>
                        {b(3)} is the interaction effect, the extra shift in Y
                        attributable to the joint presence of D1 = 1 and
                        D2 = 1, over and above what {b(1)} and {b(2)} already
                        account for.
                    </>
                },
                {
                    id: 'd1d2-takeaway1-choice-C',
                    index: 'C',
                    text: 'The average effect of D2 across all groups',
                    isCorrect: false,
                    feedback: <>
                        {b(2)} gives the effect of D2 when D1 = 0, not an
                        average across groups. Averaging over groups requires
                        weighting by group sizes, which OLS does not do
                        automatically.
                    </>
                },
                {
                    id: 'd1d2-takeaway1-choice-D',
                    index: 'D',
                    text: 'The difference in intercepts between the D1 = 1 ' +
                        'and D2 = 1 groups',
                    isCorrect: false,
                    feedback: <>
                        There is no single &ldquo;difference&rdquo; between
                        those two groups captured by {b(3)}. It measures how
                        the effect of one dummy variable changes with the
                        value of the other.
                    </>
                },
                {
                    id: 'd1d2-takeaway1-choice-E',
                    index: 'E',
                    text: 'The slope of Y with respect to a continuous ' +
                        'variable, evaluated at D1 = 1 and D2 = 1',
                    isCorrect: false,
                    feedback: <>
                        {b(3)} is the coefficient on a product of two dummy
                        variables, not on a continuous regressor. Slope
                        interpretation applies when at least one variable in
                        the interaction is continuous.
                    </>
                }
            ]
        },
        {
            questionId: 22,
            questionText: 'With two dummy variables, D1, D2, and their ' +
                'interaction, how many distinct group-level intercepts does ' +
                'the model accommodate?',
            choices: [
                {
                    id: 'd1d2-takeaway2-choice-A',
                    index: 'A',
                    text: '2',
                    isCorrect: false,
                    feedback: 'Two intercepts would follow from a single ' +
                        'dummy variable with no interaction.'
                },
                {
                    id: 'd1d2-takeaway2-choice-B',
                    index: 'B',
                    text: '3',
                    isCorrect: false,
                    feedback: 'Three intercepts would arise if you included ' +
                        'D1 and D2 but omitted the interaction. You would ' +
                        'have a baseline, D1 only, and D2 only, but no ' +
                        'separate cell for (D1=1, D2=1).'
                },
                {
                    id: 'd1d2-takeaway2-choice-C',
                    index: 'C',
                    text: '4',
                    isCorrect: true,
                    feedback: 'Two binary variables yield 2² = 4 ' +
                        'combinations: (0, 0), (1, 0), (0, 1), and (1, 1). ' +
                        'Including the interaction term makes the model ' +
                        'fully saturated, giving each cell its own intercept.'
                },
                {
                    id: 'd1d2-takeaway2-choice-D',
                    index: 'D',
                    text: '8',
                    isCorrect: false,
                    feedback: 'Eight groups would require three dummy ' +
                        'variables, 2³ = 8'
                },
                {
                    id: 'd1d2-takeaway2-choice-E',
                    index: 'E',
                    text: 'It depends on whether the two dummy variables ' +
                        'are correlated',
                    isCorrect: false,
                    feedback: 'The number of distinct group intercepts is ' +
                        'determined by the number of possible combinations ' +
                        'of the dummy variables, not by their correlation.'
                }
            ]
        },
        {
            questionId: 23,
            questionText: <>
                In the model {inlineKatex(D1D2_MODEL)}, what is the marginal
                effect of D1 on Y when D2 = 1?
            </>,
            choices: [
                {
                    id: 'd1d2-takeaway3-choice-A',
                    index: 'A',
                    text: b(1),
                    isCorrect: false,
                    feedback: <>
                        {b(1)} is the marginal effect of D1 only when D2 = 0.
                        When D2 = 1, the interaction term also changes as D1
                        changes.
                    </>
                },
                {
                    id: 'd1d2-takeaway3-choice-B',
                    index: 'B',
                    text: b(3),
                    isCorrect: false,
                    feedback: <>
                        {b(3)} alone is the change in the interaction term,
                        but you must also add {b(1)}, the direct effect of D1.
                    </>
                },
                {
                    id: 'd1d2-takeaway3-choice-C',
                    index: 'C',
                    text: inlineKatex('\\beta_2 + \\beta_3'),
                    isCorrect: false,
                    feedback: <>
                        {b(2)} is the marginal effect of D2, not of D1. Focus
                        on the coefficient associated with D1 and consider how
                        the interaction term changes that effect when D2 = 1.
                    </>
                },
                {
                    id: 'd1d2-takeaway3-choice-D',
                    index: 'D',
                    text: inlineKatex('\\beta_1 + \\beta_3'),
                    isCorrect: true,
                    feedback: <>
                        With D2 = 1, the model
                        becomes {inlineKatex(
                            'Y = (\\beta_0 + \\beta_2) + ' +
                            '(\\beta_1 + \\beta_3)\\text{D1}')}. The slope on
                        D1 is {inlineKatex('\\beta_1 + \\beta_3')}, showing
                        how the interaction modifies the marginal effect.
                    </>
                },
                {
                    id: 'd1d2-takeaway3-choice-E',
                    index: 'E',
                    text: inlineKatex('\\beta_1 + \\beta_2 + \\beta_3'),
                    isCorrect: false,
                    feedback: <>
                        {b(2)} is the effect of D2, not of D1. It does not
                        enter the marginal effect of D1.
                    </>
                }
            ]
        },
        {
            questionId: 24,
            questionText: <>
                Using the model {inlineKatex(FEMALE_COLLEGE_MODEL)}, what is
                the predicted mean of Y for a non-female without a college
                degree?
            </>,
            choices: [
                {
                    id: 'd1d2-takeaway4-choice-A',
                    index: 'A',
                    text: b(0),
                    isCorrect: true,
                    feedback: <>
                        When Female = 0 and College = 0, all three
                        non-intercept terms vanish. {b(0)} is the intercept
                        for the omitted baseline group: males without a
                        college degree.
                    </>
                },
                {
                    id: 'd1d2-takeaway4-choice-B',
                    index: 'B',
                    text: inlineKatex('\\beta_0 + \\beta_2'),
                    isCorrect: false,
                    feedback: 'This would be the predicted mean for a male ' +
                        'with a college degree (Female = 0, College = 1).'
                },
                {
                    id: 'd1d2-takeaway4-choice-C',
                    index: 'C',
                    text: inlineKatex('\\beta_1 + \\beta_3'),
                    isCorrect: false,
                    feedback: <>
                        This omits {b(0)} entirely. Every group&rsquo;s
                        predicted mean includes the intercept.
                    </>
                },
                {
                    id: 'd1d2-takeaway4-choice-D',
                    index: 'D',
                    text: inlineKatex(
                        '\\beta_0 + \\beta_1 + \\beta_2 + \\beta_3'),
                    isCorrect: false,
                    feedback: 'This is the predicted mean for a female with ' +
                        'a college degree, all three dummy-related terms ' +
                        'equal 1 in that case.'
                },
                {
                    id: 'd1d2-takeaway4-choice-E',
                    index: 'E',
                    text: inlineKatex('\\beta_0 + \\beta_1 + \\beta_2'),
                    isCorrect: false,
                    feedback: <>
                        This would be the predicted mean for a female with a
                        college degree only if there were no interaction term
                        in the model. Once the interaction is included, the
                        (Female = 1, College = 1) cell gets its own additional
                        term {b(3)}, so this expression belongs to neither
                        group in the full model.
                    </>
                }
            ]
        }
    ];

    useEffect(() => {
        if (visibleIndex === questions.length) {
            handleProgress(3);
        }
    }, [visibleIndex, questions.length]);

    return (
        <>
            {questions.slice(0, visibleIndex + 1).map((q, idx) => (
                <TakeawayQuestion
                    key={q.questionId}
                    questionId={q.questionId}
                    questionText={q.questionText}
                    choices={q.choices}
                    submissionId={submissionId}
                    onCorrect={() => setVisibleIndex(i => Math.max(i, idx + 1))}
                />
            ))}
            {visibleIndex === questions.length && (
                <>
                    <div className="mx-3 mb-3 fw-medium text-center">
                        You&rsquo;ve successfully completed D1 &times; D2
                        interactions!<br />
                        &#127881; &#127881; &#127881;
                    </div>
                    <div className="simulation__step-prompt
                        mt-3 text-center mb-3">
                        You can move on to D &times; X interactions whenever
                        you&rsquo;re ready.
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center',
                        gap: '10px'}}>
                        <button className="btn btn-primary"
                            onClick={() => setStage(1)}>
                            D &times; X
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

D1xD2Takeaway.propTypes = {
    submissionId: PropTypes.number,
    setStage: PropTypes.func.isRequired,
    setProgress: PropTypes.func.isRequired,
    progress: PropTypes.arrayOf(PropTypes.number).isRequired,
    stage: PropTypes.number.isRequired
};
