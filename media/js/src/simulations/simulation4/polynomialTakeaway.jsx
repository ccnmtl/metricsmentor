import React, { useState, useEffect } from 'react';
import { TakeawayQuestion } from '../../TakeawayQuestion';
import PropTypes from 'prop-types';

export const PolynomialTakeaway = ({
    submissionId, setStage, coursePk, setProgress, stage,
    progress
}) => {
    const [visibleIndex, setVisibleIndex] = useState(0);
    const handleProgress = (val) => {
        setProgress(progress.map((x, i) => i === stage ? val : x));
    };


    const questions = [
        {
            questionId: 1,
            questionText:
            '“The more I study, the better grade I will get.” This sentence ' +
            'ignores the fact that if you do not sleep or eat but just ' +
            'study, you are likely not to get a good grade. The relationship ' +
            'between grades and study time is more likely to be an ' +
            'inverse-U shaped. Let Y be the grade and X be the study time. ' +
            'Which one of the following should be used?',
            choices: [
                {
                    id: 'poly1-choice-A',
                    index: 'A',
                    text: 'A log-log regression.',
                    isCorrect: false,
                    feedback:
                    'A log-log regression would not reflect a quadratic ' +
                    'relationship.'
                },
                {
                    id: 'poly1-choice-B',
                    index: 'B',
                    text: 'A polynomial with X^3',
                    isCorrect: false,
                    feedback:
                    'A polynomial with X^3 would not reflect a quadratic ' +
                    'relationship.'
                },
                {
                    id: 'poly1-choice-C',
                    index: 'C',
                    text: 'A polynomial with X^2 and X^3',
                    isCorrect: false,
                    feedback:
                    'A polynomial with X^2 and X^3 would reflect a cubic ' +
                    'relationship; not a quadratic one.'
                },
                {
                    id: 'poly1-choice-D',
                    index: 'D',
                    text: 'A polynomial with X and X^2',
                    isCorrect: true,
                    feedback:
                    'Yes! A polynomial with X and X^2 would reflect a ' +
                    'quadratic relationship.'
                },
                {
                    id: 'poly1-choice-E',
                    index: 'E',
                    text: 'None of the above',
                    isCorrect: false,
                    feedback:
                    'A polynomial with X and X^2 would reflect a quadratic ' +
                    'relationship, and that option is given in the choices; ' +
                    'hence, “None of the above” is incorrect.'
                }
            ]
        },
        {
            questionId: 2,
            questionText:
            'When you graph your data set, you see an S-shaped relationship ' +
            'between X and Y. Which one of the following should be used?',
            choices: [
                {
                    id: 'poly2-choice-A',
                    index: 'A',
                    text: 'A log-log regression.',
                    isCorrect: false,
                    feedback:
                'A log-log regression would not reflect a cubic relationship.'
                },
                {
                    id: 'poly2-choice-B',
                    index: 'B',
                    text: 'A polynomial with X^2',
                    isCorrect: false,
                    feedback:
                'A polynomial with X^2 would not reflect a cubic relationship.'
                },
                {
                    id: 'poly2-choice-C',
                    index: 'C',
                    text: 'A polynomial with X, X^2, and X^3.',
                    isCorrect: true,
                    feedback:
                    'Yes! A polynomial with X, X^2, and X^3 reflects a ' +
                    'cubic relationship.'
                },
                {
                    id: 'poly2-choice-D',
                    index: 'D',
                    text: 'A polynomial with X and X^2',
                    isCorrect: false,
                    feedback:
                    'A polynomial with X and X^2 would reflect a quadratic ' +
                    'relationship, but not a cubic one.'
                },
                {
                    id: 'poly2-choice-E',
                    index: 'E',
                    text: 'None of the above',
                    isCorrect: false,
                    feedback:
                    'A polynomial with X, X^2, and X^3 reflects a cubic ' +
                    'relationship, and that option is given in the choices; ' +
                    'hence, “None of the above” is incorrect.'
                }
            ]
        },
        {
            questionId: 3,
            questionText:
            'Using a polynomial regression instead of a linear one, which of ' +
            'the following can be done?',
            choices: [
                {
                    id: 'poly3-choice-A',
                    index: 'A',
                    text:
                    'As X increase, Y decreases first but then increases again '
                    + '(U-shaped regression)',
                    isCorrect: false,
                    feedback:
                    'A U-shaped regression can be handled by a quadratic ' +
                    'regression, however choice B is also correct.'
                },
                {
                    id: 'poly3-choice-B',
                    index: 'B',
                    text:
                    'As X increase, Y increases first but then decrease then ' +
                    'increase again (S-shaped regression)',
                    isCorrect: false,
                    feedback:
                    'An S-shaped regression can be handled by a cubic ' +
                    'regression, however choice A is also correct.'
                },
                {
                    id: 'poly3-choice-C',
                    index: 'C',
                    text: 'As X increases Y decreases.',
                    isCorrect: false,
                    feedback:
                    'This choice describes a downward sloping linear ' +
                    'regression.'
                },
                {
                    id: 'poly3-choice-D',
                    index: 'D',
                    text: 'As X increases Y increases as well.',
                    isCorrect: false,
                    feedback:
                    'This choice describes an upward sloping linear regression.'
                },
                {
                    id: 'poly3-choice-E',
                    index: 'E',
                    text: 'Both A and B.',
                    isCorrect: true,
                    feedback:
                    'Yes! Choice A describes a quadratic relationship and ' +
                    'choice B describes a cubic relationship, none of which ' +
                    'can be handled with a linear regression.'
                },
                {
                    id: 'poly3-choice-F',
                    index: 'F',
                    text: 'Both C and D.',
                    isCorrect: false,
                    feedback:
                    'Both choices describe a linear regression.'
                }
            ]
        }
    ];

    useEffect(() => {
        if (visibleIndex === questions.length) {
            handleProgress(3);
        }
    }, [visibleIndex, questions.length, setProgress]);

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
                        You&apos;ve successfully completed Polynomial
                        Regression!<br />
                        &#127881; &#127881; &#127881;
                    </div>
                    <div className="simulation__step-prompt
                        mt-3 text-center mb-3">
                        <>
                            You can move on to Logarithms whenever
                            you&apos;re ready.
                        </>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center',
                        gap: '10px'}}>
                        <div className="btn btn-primary"
                            onClick={() => setStage(1)}>
                             Logarithms
                        </div>
                        {/* {progress === 4 && (
                            <Link
                                to={`/course/${coursePk}/simulations/`}
                                className="btn btn-success">
                                    Back to Dashboard
                            </Link>
                        )} */}
                    </div>
                </>
            )}
        </>
    );
};

PolynomialTakeaway.propTypes = {
    submissionId: PropTypes.number.isRequired,
    setStage: PropTypes.func.isRequired,
    coursePk: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
    progress: PropTypes.arrayOf(PropTypes.number).isRequired,
    stage: PropTypes.number.isRequired
};
