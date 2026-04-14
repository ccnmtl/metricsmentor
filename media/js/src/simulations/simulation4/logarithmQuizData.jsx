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
            question: 'Consider both the shape of the data and how changes ' +
                'in tariffs relate to changes in exports. Which plot better ' +
                'represents the relationship between the two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: <p>
                The <strong>log-linear</strong> regression is the better fit,
                because it represents the observations more closely.</p>,
            incorrectFeedback: {
                1: ' This is not the best fit, because the regression does ' +
                    'not represent the observations.',
                2: ' The regressions aren’t equivalent. Compare the shapes, ' +
                    'does one better capture curvature and changing spread ' +
                    'in exports as tariffs increase?'
            },
            questionNumber: 7
        },
        q2: {
            question: 'Which interpretation correctly explains the ' +
                'regression that best fits the relationship between ' +
                'tariffs and exports? ' +
                'Note: A unit in tariffs is a percentage-point, ' +
                'while a unit in exports is $1 billion.',
            options: [
                'A 1 percentage-point increase in tariffs is ' +
                    'associated with a decrease in exports of $30,900,000,000.',
                'A 1% increase in tariffs is associated with a 31% (0.31 × ' +
                    '100 percent) decrease in exports.',
                'A 1% increase in tariffs is associated with $0.31 billion ' +
                    'change in exports.',
                'A 1 percentage-point increase in tariffs is associated with ' +
                    'a 31% (0.31 × 100 percent) decrease in exports.'
            ],
            correctAnswerIndex: 3,
            correctFeedback: 'Correct! The log-linear regression implies ' +
                'exports change proportionally while tariffs change in ' +
                'percentage-point.',
            incorrectFeedback: {
                0: ' Incorrect. This reflects a linear-linear ' +
                    'interpretation. In your best-fit regression, does the ' +
                    'graph suggest unit or proportional changes in exports ' +
                    'and tariffs?',
                1: ' Incorrect. This treats both tariffs and exports as ' +
                    'percentage changes. Are tariffs and exports changing in ' +
                    'percentage-point or percentages in the fitted ' +
                    'regression line?',
                2: ' Incorrect. This mixes percentage changes in tariffs ' +
                    'with dollar changes in exports. Does the best-fit ' +
                    'regression show exports responding in those terms?'
            },
            questionNumber: 8
        }
    },
    // Group 1: gdp_life_exp
    1: {
        q1: {
            question: 'Consider both the shape of the data and how changes ' +
                'in GDP per capita affects the population’s life expectancy. ' +
                'Which plot better represents the relationship between the ' +
                'two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 1,
            correctFeedback: ' Correct. The raw dataset shows life ' +
                'expectancy rises quickly at low GDP, and then flattens. A ' +
                'linear-log regression best represents this.',
            incorrectFeedback: {
                0: 'Incorrect. Review the plot again, does the regression ' +
                    'line capture the flattening at higher GDP, or does ' +
                    'the relationship change as GDP grows?',
                2: ' The regressions aren’t equivalent. Compare the shapes, ' +
                    'does one better reflect the slowing gains in life ' +
                    'expectancy as GDP per capita increases?'
            },
            questionNumber: 9
        },
        q2: {
            question: 'Which interpretation correctly explains the ' +
                'regression that best fits the relationship between GDP per ' +
                'capita and life expectancy? ' +
                'Note: A unit in GDP per capita is $1, while a unit in ' +
                'life expectancy is 1 year.',
            options: [
                'A $1 increase in GDP per capita is associated with 4.16 ' +
                    'years increase in population’s life expectancy.',
                'A $1 increase in GDP per capita is associated with 0.0025 ' +
                    'years change in population’s life expectancy.',
                '1% change in GDP per capita is associated with 0.0416 ' +
                    '(4.16/100) years increase in life expectancy.',
                '1% change in GDP per capita is associated with 4.16% ' +
                    'change in population’s life expectancy.'
            ],
            correctAnswerIndex: 2,
            correctFeedback: <p> Correct.
                The <strong>linear-log</strong> regression implies percentage
                changes in GDP relate to unit changes in life expectancy. It
                reflects diminishing gains as GDP per capita increases.</p>,
            incorrectFeedback: {
                0: ' Incorrect. This is a linear-linear interpretation. Does ' +
                    'the graph show constant gains in life expectancy, or ' +
                    'diminishing increases as GDP rises, suggesting a ' +
                    'different functional form?',
                1: ' Incorrect. This uses a small unit effect not shown by ' +
                    'the fitted curve. Check how life expectancy changes ' +
                    'across GDP levels, and the resulting regression equation.',
                3: ' Incorrect. This reflects a log-log interpretation. Does ' +
                    'the graph suggest both variables change proportionally, ' +
                    'or only GDP is scaled while life expectancy changes in ' +
                    'levels?'
            },
            questionNumber: 10
        }
    },
    // Group 1: gdp_co2
    2: {
        q1: {
            question: 'Consider both the shape of the data and how changes ' +
                'in GDP per capita relates to the CO2 emission per capita. ' +
                'Which plot better represents the relationship between the ' +
                'two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: <p> Correct.
                The <strong>log-log</strong> regression shows CO₂ emissions
                scale with GDP in percentage terms. The fitted line captures
                this elasticity-like pattern across the data.</p>,
            incorrectFeedback: {
                1: ' Incorrect. Review the plot again, does the data plot ' +
                    'show a straight-line pattern, or do proportional ' +
                    'changes better describe how CO2 emissions respond as ' +
                    'GDP increases?',
                2: ' The regressions aren’t equivalent. Compare the shapes, ' +
                    'does one better reflect CO2 emissions as GDP per capita ' +
                    'increases?'
            },
            questionNumber: 11
        },
        q2: {
            question: 'Which interpretation correctly explains the ' +
                'regression that best fits the relationship between GDP per ' +
                'capita and CO2 emission per capita? ' +
                'Note: A unit in GDP per capita is $1, while a unit in ' +
                'CO2 emission per capita is 1 tonne.',
            options: [
                'A 1% increase in GDP per capita is associated with a 0.78% ' +
                    'increase in CO2 emissions per capita.',
                'A 1% increase in GDP per capita is associated with 0.78 ' +
                    'tonnes change in CO2 emission per capita.',
                'A $1,000 increase in GDP per capita is associated with ' +
                    '0.7807 tonnes increase in CO2 emission per capita.',
                'A $1,000 increase in GDP per capita is associated with ' +
                    '7.8% change in CO2 emission per capita.'
            ],
            correctAnswerIndex: 0,
            correctFeedback: <p>Correct. The <strong>log-log</strong> regression
                reflects proportional changes in both variables. The estimated
                coefficient represents elasticity, meaning that a 1% increase
                in GDP per capita is associated with a 0.78% increase in CO₂
                emissions per capita.</p>,
            incorrectFeedback: {
                1: ' Incorrect. This mixes percentage change in GDP with ' +
                    'unit change in CO2 emissions. Does the graph suggest ' +
                    'emissions respond in levels, or proportionally across ' +
                    'different GDP levels?',
                2: ' Incorrect. This reflects a linear-linear ' +
                    'interpretation, but with incorrect coefficient values.',
                3: ' Incorrect. This combines unit changes in GDP with ' +
                    'percentage changes in CO2 emissions. Check whether both ' +
                    'axes reflect proportional changes instead of mixed units.'
            },
            questionNumber: 12
        }
    },
    // Group 2: advertising
    3: {
        q1: {
            question: 'Review both the shape of the data plots and how ' +
                'money spent on television advertising affects sales. Which ' +
                'plot better represents the relationship between the two ' +
                'variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 1,
            correctFeedback: <p> The <strong>log-linear</strong> regression is
                the better fit, because it represents the observations more
                closely. Notice how the regression curve aligns better with the
                data’s shape.</p>,
            incorrectFeedback: {
                0: ' This is not the best fit, because the regression does ' +
                    'not represent the observations. It fails to capture ' +
                    'the large, heteroskedastic spread of the data.',
                2: ' The regressions aren’t equivalent. Compare the shapes, ' +
                    'does one better capture how sales grow relative to ' +
                    'their level as advertising spending increases?'
            },
            questionNumber: 13
        },
        q2: {
            question: 'Which interpretation correctly explains the ' +
                'regression that best fits the relationship between ' +
                'television advertising and sales? ' +
                'Note: A unit in television advertising is $1000, ' +
                'while a unit in sales is 1 thousand-units.',
            options: [
                'A $1,000 increase in television advertising spending is ' +
                    'associated with a change of 0.0038 thousand-units ' +
                    '(3.8 units) in sales.',
                'A $1,000 increase in television advertising spending is ' +
                    'associated with 0.38%  (0.0038 × 100) change in sales.',
                'A 1% change in television advertising spending is ' +
                    'associated with 0.05 thousand-units (50 units) change ' +
                    'in sales.',
                'A 1% change in television advertising spending is ' +
                    'associated with 0.0038% change in sales.'
            ],
            correctAnswerIndex: 1,
            correctFeedback: ' Correct. The log-linear model captures ' +
                'upscaling effects, where each dollar of advertising ' +
                'increases sales proportionally, not by a fixed amount, as ' +
                'sales grow.',
            incorrectFeedback: {
                0: ' Incorrect. This assumes a linear-linear relationship. ' +
                    'Does the graph show fixed gains, or does advertising ' +
                    'scale sales proportionally as markets grow?',
                2: ' Incorrect. This treats advertising spending as ' +
                    'percentage change. Does the graph show spending ' +
                    'scaling, or sales responding proportionally as market ' +
                    'size increases?',
                3: ' Incorrect. This interpretation says that advertising ' +
                    'spending and sales change in percentage scale. Does the ' +
                    'graph show spending scaling, or overall sales ' +
                    'responding proportionally as market size increases?'
            },
            questionNumber: 14
        }
    },
    // Group 2: ceosal2
    4: {
        q1: {
            question: 'Consider both the shape of the data and how changes ' +
                'in sales growth affect the CEO’s salaries. Which plot ' +
                'better represents the relationship between the two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: <p> The <strong>linear-log</strong> regression is
                the better fit, because it represents the observations more
                closely. The plot suggests curvature that becomes more linear
                when sales are in log, indicating diminishing effects as sales
                increase.</p>,
            incorrectFeedback: {
                1: ' This is not the best fit, because the regression does ' +
                    'not represent the observations. It fails to accurately ' +
                    'capture the nonlinear spread of data.',
                2: ' The regressions aren’t equivalent. Compare the shapes ' +
                    'and see if one line better follows the curve and spread ' +
                    'of the data points.'
            },
            questionNumber: 15
        },
        q2: {
            question: 'Which interpretation correctly explains the ' +
                'regression that best fits the relationship between ' +
                'firm\u2019s sales and CEO\u2019s salaries? ' +
                'Note: A unit in firm\u2019s sales is $1 million, ' +
                'while a unit in CEO\u2019s salaries is $1,000.',
            options: [
                'A $1 million increase in firm sales is associated with ' +
                    'about a 0.0017% increase in CEO salary.',
                'A $1M change in firm sales is associated with a $43.50 ' +
                    'change in CEO’s salaries.',
                '1% change in sales is associated with 171.77% change in ' +
                    'CEO’s salaries.',
                '1 % increase in firm sales is associated with a $1,717 ' +
                    'increase in CEO’s salaries.'
            ],
            correctAnswerIndex: 3,
            correctFeedback: <p> Correct.
                The <strong>log-linear</strong> regression model reflects that
                CEO pay rises with sales, but growth slows as firms scale,
                rather than increasing proportionally with sales.</p>,
            incorrectFeedback: {
                0: ' Incorrect. This suggests a large unit change from the ' +
                    'firm\'s sales. In the best regression fit, think about ' +
                    'proportional growth. Does CEO pay increase one-for-one ' +
                    'with firm sales scale?',
                1: ' Incorrect. This matches a linear-linear model, and the ' +
                    'coefficient isn\'t right. Does the best-fit graph show ' +
                    'a constant slope, or curvature suggesting diminishing ' +
                    'effects as firms become larger?',
                2: ' Incorrect. This assumes percentage changes in both ' +
                    'variables. Consider this, does CEO compensation grow ' +
                    'proportionally with sales, or does growth slow as ' +
                    'firms become larger?',
            },
            questionNumber: 16
        }
    },
    // Group 2: houseprice
    5: {
        q1: {
            question: 'Look at the shape of the data and how changes in the ' +
                'size of living area affect the price of houses. Which plot ' +
                'better represents the relationship between the two variables?',
            options: ['Regression A', 'Regression B', 'Both'],
            correctAnswerIndex: 0,
            correctFeedback: <p> The <strong>log-log</strong> regression is the
                better fit. The transformed plot better aligns with the data’s
                curvature, showing a more consistent pattern as house size and
                prices scale together.</p>,
            incorrectFeedback: {
                1: ' This is not the best fit, because the regression ' +
                    'doesn’t represent the observations. Does the plot show ' +
                    'a straight-line pattern, or curvature suggesting ' +
                    'proportional changes as house size increases?',
                2: ' The fits differ. Compare how closely each line follows ' +
                    'the data points. Does one better capture curvature and ' +
                    'variation across smaller and larger houses?'
            },
            questionNumber: 17
        },
        q2: {
            question: 'Which interpretation correctly explains the ' +
                'regression that best fits the relationship between the size ' +
                'of living area and the sales price of the house? ' +
                'Note: A unit in the size of living area is 1 square foot, ' +
                'while a unit in sales price is $1.',
            options: [
                'A 1 square foot increase in living area is associated with ' +
                    'an increase in house price of $72.23.',
                '1% increase in the living area size is associated with ' +
                    '0.75% increase in house sale price.',
                'A 1 square foot increase in living area size  is ' +
                    'associated with 75% change in house sale price.',
                '1% change in size of living area is associated with ' +
                    '$0.0075 change in house sale price.'
            ],
            correctAnswerIndex: 1,
            correctFeedback: ' Correct. The log-log model reflects ' +
                'proportional growth where larger homes scale prices by ' +
                'percentage. The plot shows a consistent pattern across ' +
                'different house sizes.',
            incorrectFeedback: {
                0: ' Incorrect. This reflects a linear-linear ' +
                    'interpretation. Does the best-fit plot suggest constant ' +
                    'sales price changes, or proportional scaling between ' +
                    'house size and price?',
                2: ' Incorrect. This matches a log-linear model. Does the ' +
                    'graph show price changing by percentages for each ' +
                    'square foot increase in living area size?',
                3: ' Incorrect. This mixes percentage change in size with ' +
                    'dollar change in price. Does the log-log plot suggest ' +
                    'both variables change proportionally instead?',
            },
            questionNumber: 18
        }
    }
};

export const LogarithmQuizzes = ({
    datasetIdx, submissionId, onComplete, onAnalyzeAnother, isLastDataset
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
                    {!isLastDataset && (
                        <button
                            className="btn btn-outline-primary mt-2"
                            onClick={onAnalyzeAnother}>
                            Analyze another dataset
                        </button>
                    )}
                </div>)}
        </div>
    );
};

LogarithmQuizzes.propTypes = {
    datasetIdx: PropTypes.number.isRequired,
    submissionId: PropTypes.number,
    onComplete: PropTypes.func,
    onAnalyzeAnother: PropTypes.func,
    isLastDataset: PropTypes.bool
};
