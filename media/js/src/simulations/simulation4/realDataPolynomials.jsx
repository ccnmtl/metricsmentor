import React, { useState, useEffect } from 'react';
import { PromptBlock } from '../../PromptBlock';
import PropTypes from 'prop-types';
import { Katex } from '../../utils/katexComponent';
import dataset from './polynomial.json';
import { CLEARREG, CLEARSET, showOne } from './polyUtils';


export const RealDataPolynomials = ({
    setShowRegLine, setShowDatasets, showRegLine, showDatasets,
    setCompareRegLine, compareRegLine}) => {

    const [selected, setSelected] = useState(null);
    const [showTest, setShowTest] = useState(false);

    const LABELS = [['real', 'Grade and study time'],
        ['real2', 'Housing prices and distance to the incinerator']];

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

    useEffect(() => {
        setShowDatasets(CLEARSET);
        setCompareRegLine([]);
    },[]);

    const checkTestSize = () => compareRegLine.length;

    const info = [
        [  // real dataset
            'Grade and Study Time',
            'Source: This data set is collected from several questionnaires ' +
                'administered in the Introduction to Econometrics ' +
                '(ECON UN3412) courses at Columbia University, Department of ' +
                'Economics, from Fall 2022 to Spring 2025.',
            'Paragraph block for text. Description of what the dataset is ' +
                'about.  Lorem ipsum dolor sit amet, consectetur adipiscing ' +
                'elit. Etiam dictum tristique faucibus.',
            'Paragraph block for text. Let&apos;s determine which regression ' +
                'model fits best for this dataset'
        ],
        [  // real2 dataset
            'Standard of Living vs Income',
            'Source: This data set is collected from several questionnaires ' +
                'administered in the Introduction to Econometrics ' +
                '(ECON UN3412) courses at Columbia University, Department of ' +
                'Economics, from Fall 2022 to Spring 2025.',
            'Paragraph block for text. Description of what the dataset is ' +
                'about.  Lorem ipsum dolor sit amet, consectetur adipiscing ' +
                'elit. Etiam dictum tristique faucibus.',
            'Paragraph block for text. Let&apos;s determine which regression ' +
                'model fits best for this dataset'
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
        setShowRegLine(CLEARREG);
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
               Paragraph block for text. Let&apos;s apply what you&apos;ve
               learned about about polynomial regressions using a real-world
               dataset.
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
                <h2>{info[selected][0]}</h2>
                <p><strong>Source</strong>: {info[selected][1]}</p>
                <p>{info[selected][2]}</p>
                <h2>Determining regression model in a dataset</h2>
                <p>{info[selected][3]}</p>
                <PromptBlock list={[
                    'Prompt block for text. Look at the pattern of the' +
                        'dataset.',
                    'Try out each regression line',
                    'Visually, which one fits?'
                ]} />
                {['Linear', 'Quadratic', 'Cubic'].map((reg, i) => (
                    <div className="ps-2 mt-1" key={i}>
                        <label className="mt-2 d-block">
                            <input
                                type="checkbox"
                                className="me-2"
                                checked={compareRegLine.includes(reg)}
                                value={reg}
                                onChange={(e) => handleCompareReg(e, i)}
                            />
                            {reg} regression
                        </label>
                        {showRegLine[i] &&
                            <div className="ms-4 mt-1">
                                <Katex tex={getRegressionFormula(reg)} />
                            </div>
                        }
                    </div>
                ))}
                <button
                    className="btn btn-sm btn-secondary mt-2"
                    disabled={checkTestSize() !== 2}
                    onClick={handleShowTest}>
                        Run Regression Test &raquo;
                </button>
                <span className="ms-2 align-middle">
                    {compareRegLine.length !== 2
                        ? 'Select two to run the test'
                        : `${compareRegLine[0]} and 
                            ${compareRegLine[1]}`}
                </span>
                {showTest && displayRegLineTest()}
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
    compareRegLine: PropTypes.arrayOf(PropTypes.string).isRequired
};