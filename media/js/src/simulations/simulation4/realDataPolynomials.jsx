import React, { useState, useEffect } from 'react';
import { PromptBlock } from '../../PromptBlock';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';
import { inlineKatex } from '../../utils/utils';
import dataset from './polynomial.json';
import { CLEARREG, CLEARSET, showOne } from './polyUtils';
import { QuizComponent } from '../../Quiz';


export const RealDataPolynomials = ({
    setShowRegLine, setShowDatasets, showRegLine, showDatasets,
    setCompareRegLine, compareRegLine, submissionId, isCorrect, setIsCorrect,
}) => {

    const [selected, setSelected] = useState(null);
    const [showTest, setShowTest] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [incorrectFeedback, setIncorrectFeedback] = useState(
        <p>That is not the optimal study time. Please try again.
            <button onClick={() => setShowAnswer(true)}>
                Or would you rather see the correct answer?
            </button>
        </p>
    );
    const [incorrectFeedback2, setIncorrectFeedback2] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleIsCorrect = (idx) => {
        if (selected === 0) {
            return (result) =>
                setIsCorrect(isCorrect.map((x,i) => i === idx ? result : x));
        } else {
            return (result) => setIsCorrect([result]);
        }
    };

    useEffect(() => {
        if (showAnswer) {
            setIncorrectFeedback(<p>
                That is not the optimal study time. Please try again. Studying
                on average <strong>13.95 hours a week </strong> maximizes the
                grade.</p>);
        } else {
            setIncorrectFeedback(
                <p>That is not the optimal study time. Please try again.
                    <button className='btn btn-link btn-reveal'
                        onClick={() => setShowAnswer(true)}
                    >
                        Or would you rather see the correct answer?
                    </button>
                </p>
            );
        }
    },[showAnswer]);

    useEffect(() => {
        if (selectedOption === 0) {
            setIncorrectFeedback2('Linear regression is not the best fit for ' +
                'this dataset. This is evident when we run the test of ' +
                'Linear against Quadratic, and then Cubic regressions.');
        } else if (selectedOption === 1) {
            setIncorrectFeedback2('Quadratic regression is not the best fit ' +
                'for this dataset. This is evident when we run the test of ' +
                'Quadratic against Linear, and then Cubic regressions.');
        }
    },[selectedOption]);

    useEffect(() => {
        setIsCorrect(selected === 0 ? [false, false] : [false]);
    },[selected]);

    const LABELS = [['real', 'Grade and study time'],
        ['real2', 'Standard of living index and income']];

    const handleCompareReg = (e, i) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setCompareRegLine(prev => {
            let next;
            if (checked) {
                next = [...prev, value];
            } else {
                next = prev.filter(reg => reg !== value);
            }
            return next;
        });
        setShowRegLine(showRegLine.map((x, idx) => idx === i ? !x : x));
        setShowTest(false);
    };

    const handleShowTest = () => {
        setShowTest(true);
    };

    const handleQuiz = () => {
        setShowQuiz(true);
    };

    useEffect(() => {
        setShowDatasets(CLEARSET);
        setCompareRegLine([]);
    },[]);

    const checkTestSize = () => compareRegLine.length;

    const info = [
        [  // real dataset
            'Grade and Study Time',
            'This data set is collected from several questionnaires ' +
                'administered in the Introduction to Econometrics ' +
                '(ECON UN3412) courses at Columbia University, Department of ' +
                'Economics, from Fall 2022 to Spring 2025.',
            <>In this dataset, our goal is to examine the relationship
            between the dependent
            variable, {inlineKatex('\\text{Grade}')}, as a result of time
            spent studying, independent
            variable {inlineKatex('\\text{StudyTime.}')}</>
        ],
        [  // real2 dataset
            'Standard of Living Index and Income',
            'World Bank Database.',
            <>In this dataset, our goal is to examine the relationship
            between the dependent
            variable, {inlineKatex('\\text{StandardofLiving}')} index and
            the independent
            variable {inlineKatex('\\text{Income}')} (in thousand).</>
        ]
    ];

    // The results for the real and real2 datasets are identical
    const testResults = [
        [ // Linear vs Quadratic
            '\\beta_2',
            '\\beta_2 \\neq 0',
            '\\beta_2 \\text{ is significantly different from } 0',
            'Quadratic'
        ],
        [ // linear vs Cubic
            '\\beta_2 = \\beta_3',
            '\\text{ not } H_0',
            '\\beta_2 \\text{ and } \\beta_3 \\text{ is significantly ' +
                'different from } 0',
            'Cubic'
        ],
        [ // Quadratic vs Cubic
            '\\beta_3',
            '\\beta_3 \\neq 0',
            '\\beta_2 \\text{ is significantly different from } 0',
            'Cubic'
        ]
    ];

    const printSign = (val) => (val < 0 ? '' : '+') + ` ${val}`;

    const getRegressionFormula = (key) => {
        const data = dataset[LABELS[selected][0]][key];
        const x1 = data.slope.toFixed(2);
        let formula = `\\hat{y} = ${data.intercept.toFixed(2)}
            ${printSign(x1)}X`;
        for (let x = 2; x < showRegLine.length + 1; x++) {
            if (data[`slope${x}`] !== undefined) {
                formula += ` ${printSign(data[`slope${x}`].toFixed(2))}X^${x}`;}
        }
        return formula;
    };

    const handleDataset = (idx) => {
        setShowDatasets(showOne(4 + idx));
        setSelected(idx);
        setShowTest(false);
        setShowAnswer(false);
        setShowQuiz(false);
        setShowRegLine(CLEARREG);
        setCompareRegLine([]);
    };

    const displayRegLineTest = () => {
        const a = showRegLine.indexOf(true);
        const b = showRegLine.indexOf(true, a + 1);
        const result = testResults[a+b-1];

        return <div className='mt-3'>
            <div className='ms-3'>
                <p><Katex tex={`H_0: ${result[0]}`} /></p>
                <p><Katex tex={`H_1: ${result[1]}`} /></p>
                <p>at <Katex tex={'\\alpha = 0.05; ~'}/></p>
                <p className='mt-2'>
                    Resulting <Katex tex={'~p-value = 0'} />
                </p>
                <p><Katex tex={`p-value < \\alpha; ~ ${result[2]} ~`} /></p>
                <p>Therefore, we reject <Katex tex={'H_0'} />.</p>
                <p>Conclusion: {result[3]} regression is a better fit.</p>
            </div>
            <p>Select another set of regression model to test</p>

        </div>;
    };

    return (
        <>
            <p>
               Let&rsquo;s apply what you&rsquo;ve
               learned about about polynomial regressions using real-world
               datasets.
            </p>
            <p>
                Choose a dataset for your analysis:
            </p>
            <ul className='choice-list dataset-opt'>
                {LABELS.map((dType, i) => (
                    <li className="form-check d-flex mb-2" key={i}>
                        <input
                            key={i}
                            className="form-check-input"
                            type="radio"
                            id={dType[0]}
                            name="data-choice"
                            value={dType[0]}
                            checked={showDatasets[4+i] === true}
                            onChange={() => handleDataset(i)}
                        />
                        <label htmlFor={dType[0]}
                            className="form-check-label pb-2 me-2"
                        >
                            {dType[1]}
                        </label>
                    </li>
                ))}
            </ul>
            {selected !== null && <>
                <h3 className="pt-3">{info[selected][0]}</h3>
                <p><b>Source</b>: {info[selected][1]}</p>
                <p>{info[selected][2]}</p>
                <PromptBlock list={[
                    'Add one regression at a time to the graph',
                    'Compare the regression lines to see which one fits ' +
                    'the overall pattern of the dataset',
                    'Select two regression lines to run a test to confirm ' +
                    'best fit'
                ]} />
                <div className="choice-list ms-0">
                    {['Linear', 'Quadratic', 'Cubic'].map((reg, i) => (
                        <div key={i}
                            className="form-check dataset-variable-item">
                            <label htmlFor={`realdata-reg-${reg}`}
                                className={
                                    `form-check-label ${
                                        compareRegLine.includes(reg) ?
                                            ' text-primary' : ''}`
                                }>
                                <input
                                    className="form-check-input"
                                    id={`realdata-reg-${reg}`}
                                    type="checkbox"
                                    checked={compareRegLine.includes(reg)}
                                    value={reg}
                                    onChange={(e) => handleCompareReg(e, i)}
                                />
                                {reg} regression
                            </label>
                            {showRegLine[i] &&
                                <div className="katex-block">
                                    <Katex tex={getRegressionFormula(reg)} />
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-sm btn-secondary mt-2"
                    disabled={checkTestSize() !== 2}
                    onClick={handleShowTest}>
                        Run test on regressions &raquo;
                </button>
                <span className="ms-2 align-middle">
                    {compareRegLine.length !== 2
                        ? 'Select two to run the test'
                        : `${compareRegLine[0]} and 
                            ${compareRegLine[1]}`}
                </span>
                {showTest && displayRegLineTest()}
                {showQuiz ? <>
                    {selected === 0 && <><div className='mt-4'><QuizComponent
                        question={'Based on the quadratic regression model, ' +
                            'what is the optimal study time that results in ' +
                            'the highest predicted grade?'}
                        correctFeedback={'13.95 hours per week is the ' +
                            'correct optimal study time!'}
                        incorrectFeedback={incorrectFeedback}
                        correctTextAnswer={'13.95'}
                        setIsCorrect={handleIsCorrect(0)}
                        isTextInput={true}
                        correctAnswerIndex={2}
                        questionNumber={0}
                        submissionId={submissionId} /></div>
                    {isCorrect[0] && <div className='mt-4'><QuizComponent
                        question={'Based on your observations, which ' +
                            'regression model fits best for this dataset?'}
                        options={['Linear regression', 'Quadratic regression',
                            'Cubic regression']}
                        correctAnswerIndex={2}
                        correctFeedback={'Cubic regression is the correct ' +
                            'model. When we run the tests of Cubic against ' +
                            'Linear and Quadratic regressions, Cubic ' +
                            'regression is shown to be the best fit.'}
                        incorrectFeedback={incorrectFeedback2}
                        setIsCorrect={handleIsCorrect(1)}
                        questionNumber={1}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        submissionId={submissionId} /></div>}</>}
                    {selected === 1 && <div className='mt-4'><QuizComponent
                        question={'Based on your observations, which ' +
                            'regression model fits best for this dataset?'}
                        options={['Linear regression', 'Quadratic regression',
                            'Cubic regression']}
                        correctAnswerIndex={2}
                        correctFeedback={'Cubic regression is the correct ' +
                            'model. When we run the tests of Cubic against ' +
                            'Linear and Quadratic regressions, Cubic ' +
                            'regression is shown to be the best fit.'}
                        incorrectFeedback={incorrectFeedback2}
                        setIsCorrect={handleIsCorrect(0)}
                        questionNumber={3}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        submissionId={submissionId} /></div>}
                </>
                    :
                    <div className="simulation__step-prompt">
                        <button className='btn btn-sm btn-success mt-4'
                            onClick={handleQuiz}>
                                A few more questions...»
                        </button>
                    </div>
                }
            </>}
        </>
    );
};

RealDataPolynomials.propTypes = {
    setShowRegLine: PropTypes.func.isRequired,
    setShowDatasets: PropTypes.func.isRequired,
    showRegLine: PropTypes.arrayOf(PropTypes.bool).isRequired,
    showDatasets: PropTypes.arrayOf(PropTypes.bool).isRequired,
    setCompareRegLine: PropTypes.func.isRequired,
    compareRegLine: PropTypes.arrayOf(PropTypes.string).isRequired,
    submissionId: PropTypes.number.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    setIsCorrect: PropTypes.func.isRequired
};