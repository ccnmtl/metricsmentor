import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { QuizComponent } from '../../Quiz';
import { Katex } from '../../utils/katexComponent';

// Mini quiz questions for the D1 x D2 Real dataset section, keyed by
// dataset index (0 = Wages Black-South, 1 = Learning app intervention).
// Questions are revealed one at a time, in array order; each must be
// answered correctly before the next one appears. To add a question,
// append it to the dataset's array.
//
// questionNumber is used to save answers per submission, so it must be
// unique across the simulation:
//   Wages Black-South:          1-10
//   Learning app intervention: 11-20
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
        }
    ]
};

export const D1D2Quizzes = ({ datasetIdx, submissionId, onComplete }) => {
    const questions = D1D2_QUIZ_DATA[datasetIdx] || [];
    const [selectedOptions, setSelectedOptions] = useState(
        questions.map(() => null));
    // Number of questions answered correctly so far. Question i is
    // visible once the previous i questions are answered correctly.
    const [numCorrect, setNumCorrect] = useState(0);
    const isComplete = questions.length > 0
        && numCorrect >= questions.length;

    useEffect(() => {
        if (isComplete && onComplete) {
            onComplete(datasetIdx);
        }
    }, [isComplete, datasetIdx, onComplete]);

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
                        options={q.options}
                        correctAnswerIndex={q.correctAnswerIndex}
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
                </div>
            )}
        </div>
    );
};

D1D2Quizzes.propTypes = {
    datasetIdx: PropTypes.number.isRequired,
    submissionId: PropTypes.number,
    onComplete: PropTypes.func
};
