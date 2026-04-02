import React, { useState } from 'react';
import { QuizComponent } from '../../Quiz';
import PropTypes from 'prop-types';

// Quiz data: keyed by dataset index (0-5)
// Each dataset has 2 questions:
//   q1 = fit selection, q2 = interpretation
export const QUIZ_DATA = {
    // Group 1: exports_tariffs
    0: {
        q1: {
            question: 'Consider both the shape of the ' +
                'data and how changes in tariff ' +
                'rates affect exports. Which plot ' +
                'better represents the relationship ' +
                'between the two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 7
        },
        q2: {
            question: 'Which interpretation ' +
                'correctly explains the regression ' +
                'that best fits the relationship ' +
                'between tariff rates and exports?',
            options: ['A 1-unit change in tariff rate is ' +
                'associated with a 97% change in exports.',
            'A 1-unit change in tariff rate is ' +
                'associated with 0.97 unit change in exports.',
            'A 1% change in tariff rate is ' +
                'associated with 0.97 unit change in exports.',
            'A 1% change in tariff rate is ' +
                'associated with 0.97% change in exports.'
            ],
            correctAnswerIndex: 0,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 8
        }
    },
    // Group 1: gdp_life_exp
    1: {
        q1: {
            question: 'Consider both the shape of ' +
                'the data and how changes in GDP ' +
                'per capita affect life expectancy.' +
                ' Which plot better represents the ' +
                'relationship between the two ' +
                'variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 1,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 9
        },
        q2: {
            question: 'Which interpretation ' +
                'correctly explains the regression ' +
                'that best fits the relationship ' +
                'between GDP per capita and life ' +
                'expectancy?',
            options: [
                '1% change in GDP per capita is ' +
                'associated with (4.16/100) years ' +
                'increase in life-expectancy.',
                '1-unit change in GDP per capita ' +
                'is associated with 4.16 unit ' +
                'change in life-expectancy.',
                '1% change in GDP per capita is ' +
                'associated with (4.16/100) years ' +
                'increase in life-expectancy.',
                '1% change in GDP per capita is ' +
                'associated with 4.16% change in ' +
                'population\'s life expectancy.'
            ],
            correctAnswerIndex: 0,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 10
        }
    },
    // Group 1: gdp_co2
    2: {
        q1: {
            question: 'Consider both the shape of ' +
                'the data and how changes in GDP ' +
                'per capita relates to the CO2 ' +
                'emission per capita. Which plot ' +
                'better represents the relationship ' +
                'between the two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 11
        },
        q2: {
            question: 'Which interpretation ' +
                'correctly explains the regression ' +
                'that best fits the relationship ' +
                'between GDP per capita and CO2 ' +
                'emission per capita?',
            options: [
                'A 1% change in GDP per capita is ' +
                'associated with a 0.78% change ' +
                'in CO2 emissions per capita.',
                'A 1% change in GDP per capita is ' +
                'associated with 0.78 unit change ' +
                'in CO2 emission per capita.',
                'A 1-unit change in GDP per capita ' +
                'is associated with 0.7807 unit ' +
                'change in CO2 emission per capita.',
                'A 1-unit change in GDP per capita ' +
                'is associated with 7.8% change ' +
                'in CO2 emission per capita.'
            ],
            correctAnswerIndex: 0,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 12
        }
    },
    // Group 2: advertising
    3: {
        q1: {
            question: 'Review both the shape of ' +
                'the data and how money spent on ' +
                'television advertising affects ' +
                'sales. Which plot better ' +
                'represents the relationship ' +
                'between the two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 1,
            correctFeedback: ' Correct! This is ' +
                'the better fit, because the ' +
                'regression represents the ' +
                'observations more closely.',
            incorrectFeedback: ' Incorrect. This ' +
                'is not the correct answer, ' +
                'because the regression does not ' +
                'represent the observations.',
            questionNumber: 13
        },
        q2: {
            question: 'Which interpretation ' +
                'correctly explains the regression ' +
                'that best fits the relationship ' +
                'between television advertising ' +
                'and sales?',
            options: [
                '$1 change in television ' +
                'advertising spending is ' +
                'associated with 0.0038 unit ' +
                'change in sales.',
                '$1 change in television ' +
                'advertising spending is ' +
                'associated with 0.38% ' +
                '(0.0038 \u00d7 100) change in sales.',
                '1% change in television ' +
                'advertising spending is ' +
                'associated with 0.05 unit ' +
                'change in sales.',
                '1% change in television ' +
                'advertising spending is ' +
                'associated with 0.0038% ' +
                'change in sales.'
            ],
            correctAnswerIndex: 1,
            correctFeedback: ' Yes! You are ' +
                'correct because this is a log-linear regression.',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 14
        }
    },
    // Group 2: ceosal2
    4: {
        q1: {
            question: 'Consider both the shape of ' +
                'the data and how changes in sales ' +
                'growth affect the CEO\'s salaries.' +
                ' Which plot better represents the ' +
                'relationship between the two ' +
                'variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. This ' +
                'is not the correct answer, because' +
                ' the regression does not represent' +
                ' the observations.',
            questionNumber: 15
        },
        q2: {
            question: 'Which interpretation ' +
                'correctly explains the regression ' +
                'that best fits the relationship ' +
                'between sales and CEO\'s salaries?',
            options: [
                '1 unit change in sales is ' +
                'associated with 171.77 unit ' +
                'change in CEO\'s salaries.',
                '1 unit change in sales is ' +
                'associated with 0.043 unit ' +
                'change in CEO\'s salaries.',
                '1% change in sales is ' +
                'associated with 171.77% change ' +
                'in CEO\'s salaries.',
                '1% change in sales is ' +
                'associated with 1.717 unit ' +
                'change in CEO\'s salaries.'
            ],
            correctAnswerIndex: 3,
            correctFeedback: ' Correct! This is ' +
                'the better fit, because it is a ' +
                'linear-log regression.',
            incorrectFeedback: ' Incorrect. ' +
                'Exact text TBD',
            questionNumber: 16
        }
    },
    // Group 2: houseprice
    5: {
        q1: {
            question: 'Look at the shape of the ' +
                'data and how changes in the size ' +
                'of living area affect the price ' +
                'of houses. Which plot better ' +
                'represents the relationship ' +
                'between the two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 17
        },
        q2: {
            question: 'Which interpretation ' +
                'correctly explains the regression ' +
                'that best fits the relationship ' +
                'between the size of living area ' +
                'and the sales price of the house?',
            options: [
                '1 unit change in size of living ' +
                'area is associated with 0.75 unit ' +
                'change in house sale price.',
                '1% change in size of living area ' +
                'is associated with 0.75% change ' +
                'in house sale price.',
                '1 unit change in size of living ' +
                'area is associated with 75% ' +
                'change in house sale price.',
                '1% change in size of living area ' +
                'is associated with 0.0075 unit ' +
                'change in house sale price.'
            ],
            correctAnswerIndex: 1,
            correctFeedback: ' Correct! Exact text TBD',
            incorrectFeedback: ' Incorrect. Exact text TBD',
            questionNumber: 18
        }
    }
};

export const LogarithmQuizzes = ({
    datasetIdx, submissionId, onComplete, onAnalyzeAnother
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [q1Correct, setQ1Correct] = useState(false);
    const [q2Correct, setQ2Correct] = useState(false);

    React.useEffect(() => {
        if (q2Correct && onComplete) {
            onComplete(datasetIdx);
        }
    }, [q2Correct, datasetIdx, onComplete]);

    const quizzes = QUIZ_DATA[datasetIdx];
    if (!quizzes) return null;

    return (
        <div className="mt-4">
            <div className="mt-3">
                <QuizComponent
                    question={quizzes.q1.question}
                    options={quizzes.q1.options}
                    correctAnswerIndex={quizzes.q1.correctAnswerIndex}
                    correctFeedback={quizzes.q1.correctFeedback}
                    incorrectFeedback={quizzes.q1.incorrectFeedback}
                    setIsCorrect={setQ1Correct}
                    questionNumber={quizzes.q1.questionNumber}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    submissionId={submissionId}
                />
            </div>
            {q1Correct && (
                <div className="mt-3">
                    <QuizComponent
                        question={quizzes.q2.question}
                        options={quizzes.q2.options}
                        correctAnswerIndex={quizzes.q2.correctAnswerIndex}
                        correctFeedback={quizzes.q2.correctFeedback}
                        incorrectFeedback={quizzes.q2.incorrectFeedback}
                        setIsCorrect={setQ2Correct}
                        questionNumber={quizzes.q2.questionNumber}
                        selectedOption={selectedOption2}
                        setSelectedOption={setSelectedOption2}
                        submissionId={submissionId}
                    />
                </div>
            )}
            {q2Correct && (
                <div className="mt-4 text-center border-top pt-3">
                    <p className="text-success fw-bold">
                        You&apos;ve completed the analysis of this dataset.
                    </p>
                    <button
                        className="btn btn-outline-primary mt-2"
                        onClick={onAnalyzeAnother}>
                        Analyze another dataset
                    </button>
                </div>)}
        </div>
    );
};

LogarithmQuizzes.propTypes = {
    datasetIdx: PropTypes.number.isRequired,
    submissionId: PropTypes.number,
    onComplete: PropTypes.func,
    onAnalyzeAnother: PropTypes.func
};
