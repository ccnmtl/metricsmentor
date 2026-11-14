import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { QuizComponent } from '../../Quiz';
import { Katex } from '../../utils/katexComponent';


export const D1D2_QUIZ_DATA = {
    // Wages Black-South
    0: [
        {
            question: 'Using the no-interaction model, does moving from ' +
                'non-South to South change mean wages differently for ' +
                'Black individuals than for non-Black individuals?',
            options: [
                'No. The model estimates that the South effect is the ' +
                    'same for both groups.',
                'We don’t know',
                'Yes. The South effect is more negative for Black workers.'
            ],
            correctAnswerIndex: 1,
            correctFeedback: <p className="mb-0">
                The no-interaction model estimates one common South
                effect, <Katex tex={'\\hat\\beta_1 = -99'} />. This model
                assumes the South effect is the same regardless of Black
                status. It doesn&rsquo;t allow us to estimate whether the
                South effect is different for Black and non-Black
                individuals.
            </p>,
            incorrectFeedback: {
                0: 'The no-interaction model gives the same South effect, ' +
                    '−99, for both Black and non-Blacks. But, this is ' +
                    'because the model forces the South effect to be the ' +
                    'same for both groups.',
                2: 'The no-interaction model does not estimate a separate ' +
                    'South effect for Black workers. The South coefficient, ' +
                    '−99, applies equally to both Black and non-Black ' +
                    'workers.'
            },
            questionNumber: 1
        },
        {
            question: 'What is the mean wage for non-Black workers who ' +
                'are not in the South according to the with-interaction ' +
                'model regression equation?',
            isTextInput: true,
            correctTextAnswer: '1015',
            correctFeedback: <p className="mb-0">
                Correct! The constant term represents the wage when Black=0
                and South=0, and it corresponds
                to <Katex tex={'\\hat\\beta_0'} />. This is the reference
                group or baseline group.
            </p>,
            incorrectFeedback: <p className="mb-0">
                Please try again!<br />
                Remember, for individuals who are Non-Black not in the
                South, Black=0 and South=0.
            </p>,
            questionNumber: 2,
            reveals: ['nonBlackNonSouth'],
            // Turn on this model's checkbox when the question appears.
            showModel: 'withInteraction'
        },
        {
            question: <>
                What is the wage of a person who is Black and lives in the
                South? (B, S)
            </>,
            isTextInput: true,
            correctTextAnswer: '664',
            correctFeedback: 'Yes! It is 1015 \u2212 155 \u2212 83 \u2212 ' +
                '113 = 664',
            incorrectFeedback: <p className="mb-0">
                Please try again!<br />
                Remember in this case Black = 1, South = 1 and the
                interaction term Black &times; South = 1
            </p>,
            questionNumber: 3,
            reveals: ['blackSouth']
        },
        {
            question: <>
                What is the wage of a person who is Black and does not live
                in the South? (B, NS)
            </>,
            isTextInput: true,
            correctTextAnswer: '860',
            correctFeedback: 'Yes! It is 1015 \u2212 155 = 860',
            incorrectFeedback: <p className="mb-0">
                Please try again!<br />
                Remember in this case Black = 1, South = 0 and the
                interaction term Black &times; South = 0
            </p>,
            questionNumber: 4,
            reveals: ['blackNonSouth']
        },
        {
            question: 'What is the advantage of the interaction term in ' +
                'this example?',
            options: [
                'We can compare the wages of people in the South and the ' +
                    'rest of the country',
                'We can compare the wages of Blacks and Non-Blacks',
                'We can compare the wages of Blacks who live in the South ' +
                    'and those who don’t.'
            ],
            correctAnswerIndex: 2,
            correctFeedback: <p className="mb-0">
                We cannot do this comparison unless we have the interaction
                term in the regression. With the interaction term, we can
                compare wages of four groups: (1) Blacks in the South, (2)
                Non-Blacks in the South, (3) Blacks who do not live in the
                South, and (4) Non-Blacks who do not live in the South.
                Without the interaction term, we can only compare the wages
                of Blacks and Non-Blacks or compare South and Non-South
                people, but not the four groups listed above.
            </p>,
            incorrectFeedback: {
                0: 'We do not need the interaction term to make that ' +
                    'comparison.',
                1: 'We do not need the interaction term to make that ' +
                    'comparison.'
            },
            questionNumber: 5
        }
    ],
    // Learning app intervention
    1: [
        {
            question: 'Based on the regression with no interaction term, ' +
                'how did the students in the Treatment group perform ' +
                'compared with those in the Control group?',
            options: ['Better', 'Worse'],
            correctAnswerIndex: 1,
            correctFeedback: 'The coefficient for Treatment is negative, ' +
                'thus the group is doing worse than the Control group.',
            incorrectFeedback: {
                0: 'The coefficient for Treatment is negative, meaning they ' +
                    'have done worse. However, it is insignificant, so we ' +
                    'can’t tell.'
            },
            questionNumber: 11
        },
        {
            question: 'Based on the regression with the interaction term, ' +
                'how did the students in the Treatment group perform ' +
                'compared with those in the Control group? Think about ' +
                'which coefficient to use to determine this.',
            options: ['Better', 'Worse', 'Uncertain'],
            correctAnswerIndex: 0,
            correctFeedback: 'We must use the interaction term to answer ' +
                'this question; it is the differences-in-differences ' +
                'coefficient, which is positive. This indicates that the ' +
                'treatment group improved more than the control group after ' +
                'the treatment.',
            incorrectFeedback: {
                1: 'The differences-in-differences coefficient is positive ' +
                    'and significant, indicating that the treatment group ' +
                    'performed better than the control group on the ' +
                    'post-quiz.',
                2: 'We can be certain because the differences-in-differences ' +
                    'coefficient is positive, indicating that the treatment ' +
                    'group performed better than the control group on the ' +
                    'post-quiz.'
            },
            questionNumber: 12
        },
        {
            question: 'Based on these results, what do you conclude about ' +
                'including the interaction term?',
            options: [
                'The interaction term should be included',
                'The interaction term should not be included',
                'It is unclear whether the interaction term should be ' +
                    'included'
            ],
            correctAnswerIndex: 0,
            correctFeedback: 'The interaction term helps us compare students ' +
                'in the treatment group to those in the control group. ' +
                'Without this comparison, the study would be misleading.',
            incorrectFeedback: {
                1: 'If we do not include the interaction term, we cannot ' +
                    'know whether the treatment group did better without ' +
                    'comparing it to a control group.',
                2: 'We should include the interaction term to understand the ' +
                    'amount of improvement in the treatment group.'
            },
            questionNumber: 13
        }
    ]
};

// Keys of the hidden table/graph values
//   nonBlackNonSouth: 1015 and -83 (Black-South, with interaction)
//   blackSouth:       664 and -196
//   blackNonSouth:    860
export const getRevealedValues = (datasetIdx, numCorrect) =>
    (D1D2_QUIZ_DATA[datasetIdx] || [])
        .slice(0, numCorrect)
        .flatMap(q => q.reveals || []);

export const D1D2Quizzes = ({
    datasetIdx, submissionId, onComplete, onProgress, onShowModel,
    onContinue
}) => {
    const questions = D1D2_QUIZ_DATA[datasetIdx] || [];
    const [selectedOptions, setSelectedOptions] = useState(
        questions.map(() => null));
    const [numCorrect, setNumCorrect] = useState(0);
    const isComplete = questions.length > 0
        && numCorrect >= questions.length;

    useEffect(() => {
        if (isComplete && onComplete) {
            onComplete(datasetIdx);
        }
    }, [isComplete, datasetIdx, onComplete]);

    useEffect(() => {
        if (onProgress) {
            onProgress(datasetIdx, numCorrect);
        }
    }, [numCorrect, datasetIdx, onProgress]);

    // When a new question appears, switch on the model it refers to.
    useEffect(() => {
        const next = (D1D2_QUIZ_DATA[datasetIdx] || [])[numCorrect];
        if (next && next.showModel && onShowModel) {
            onShowModel(next.showModel);
        }
    }, [numCorrect, datasetIdx, onShowModel]);

    const handleIsCorrect = (idx) => (result) => {
        if (result) {
            setNumCorrect(prev => Math.max(prev, idx + 1));
        }
    };

    const handleSelect = (idx) => (option) => {
        setSelectedOptions(prev =>
            prev.map((x, i) => i === idx ? option : x));
    };

    return (
        <div className="mt-4">
            {questions.slice(0, numCorrect + 1).map((q, idx) => (
                <div className="mt-3" key={q.questionNumber}>
                    <QuizComponent
                        question={q.question}
                        options={q.options || []}
                        correctAnswerIndex={q.correctAnswerIndex || 0}
                        isTextInput={q.isTextInput}
                        isNumericInput={q.isTextInput}
                        correctTextAnswer={q.correctTextAnswer}
                        correctFeedback={q.correctFeedback}
                        incorrectFeedback={q.incorrectFeedback}
                        setIsCorrect={handleIsCorrect(idx)}
                        questionNumber={q.questionNumber}
                        selectedOption={selectedOptions[idx]}
                        setSelectedOption={handleSelect(idx)}
                        submissionId={submissionId}
                    />
                </div>
            ))}
            {isComplete && (
                <div className="mt-4 text-center border-top pt-3">
                    <p className="text-success fw-bold">
                        You&apos;ve completed the analysis of this dataset.
                    </p>
                    {onContinue && (
                        <button className="btn btn-sm btn-success"
                            onClick={onContinue}>
                            Continue &raquo;
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

D1D2Quizzes.propTypes = {
    datasetIdx: PropTypes.number.isRequired,
    submissionId: PropTypes.number,
    onComplete: PropTypes.func,
    onProgress: PropTypes.func,
    onShowModel: PropTypes.func,
    onContinue: PropTypes.func
};
