import React, { useState } from 'react';
import { ScatterPlot } from './scatterPlot';
import { Katex } from '../katexComponent';
import { authedFetch } from '../utils';
import { SimulationOneQuiz } from './simulationOneQuiz';


// const CURRENT_USER = window.MetricsMentor.currentUser.id;
const simContainer = document.querySelector('#react-root');

const coursePk =
    simContainer ? Number(simContainer.dataset.course) : '';

export const SimulationOne = () => {
    const [N, setN] = useState(50);
    const [correlation, setCorrelation] = useState(0.5);
    const [seed, setSeed] = useState('seedString');
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [stderror, setStderror] = useState(null);
    const [appRvalue, setAppRvalue] = useState(null);
    const [startQuiz, setStartQuiz] = useState(false);
    const [hypothesizedSlope, setHypothesizedSlope] = useState(0);


    const saveGraphData = async() => {
        const data = {
            N, correlation, seed, slope, intercept, stderror, appRvalue,
            tvalue, hypothesizedSlope
        };

        return authedFetch(
            `/course/${coursePk}/api/save-sim1-graph/`, 'POST', {data})
            .then(function(response) {
                if (response.status === 201) {
                    setStartQuiz(true);
                    return response.json();
                } else {
                    throw 'Error  ' +
                `(${response.status}) ${response.statusText}`;
                }
            });
    };

    const handleNChange = (e) => {
        setN(parseInt(e.target.value));
    };

    const handleCorrelationChange = (e) => {
        setCorrelation(parseFloat(e.target.value));
    };

    const handleSeedChange = (e) => {
        setSeed(e.target.value);
    };

    const handleNullHypothesis = (e) => {
        setHypothesizedSlope(parseFloat(e.target.value));
    };

    const tvalue = ((slope - hypothesizedSlope) / stderror).toFixed(3);
    const tEquation =
    't = \\cfrac{\\hat{\\beta}_1 - \\beta_1}{SE(\\hat{\\beta_1})}';

    return (
        <div className='simulation'>
            <div className='simulation__workspace'>
                <div className='simulation__step-container d-flex'>
                    <div className='simulation__step-num'>
                        &bull;
                    </div>
                    <div className='simulation__step-toggle--down'>
                    </div>
                    <div className='simulation__step-body'>
                        <header className='simulation__step-header'>
                            <h2 className='h2-primary'>
                                <span className='h2-secondary d-block'>
                                    Simulation 1</span>
                                <span className='h2-title d-block'>
                                    {/* eslint-disable-next-line max-len */}
                                    {'Hypothesis Testing for Population Slope'}
                                </span>
                            </h2>
                        </header>
                        <div className='simulation__step-content'>
                            <p>
                                In this module, we revisit hypothesis testing
                                and p-values, concepts you learned in your
                                prerequisite Statistics course. Through the use
                                of generated data, you will have the opportunity
                                to review the methodology involved in hypothesis
                                testing, including the interpretation of
                                p-values and critical values.
                            </p>
                        </div>
                    </div>
                </div> {/* div class=simulation__step-container */}
                <div className='simulation__step-container d-flex'>
                    <div className='simulation__step-num'>
                        &bull;
                    </div>
                    <div className='simulation__step-toggle--down'>
                    </div>
                    <div className='simulation__step-body'>
                        <header className='simulation__step-header'>
                            <h2 className='h2-primary'>Graph seeding</h2>
                        </header>
                        <div className='simulation__step-content'>
                            <p>
                                Let&rsquo;s start by setting up the graph.
                                You can set the sample
                                size, <span className='katex'>
                                    <span className='mathnormal'>n</span>
                                </span>,
                                and the estimated correlation
                                coefficient, <span className='katex'>
                                    <span className='mathnormal'>corr(x,y)</span>
                                </span>, to generate the data.
                            </p>
                            <div className='mt-4'>
                                <label htmlFor='nSampleSize'
                                    className='h2 form-label'>
                                    Sample size, <span className='katex'>
                                        <span className='mathnormal'>n</span>
                                    </span>:
                                </label>
                                <input type='number' min='50' max='500'
                                    id='nSampleSize'
                                    className='form-control'
                                    disabled={startQuiz}
                                    value={N} onChange={handleNChange} />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor='correlation'
                                    className='h2 form-label'>
                                    Estimated correlation
                                coefficient, <span className='katex'>
                                        <span
                                            className='mathnormal'>corr(x,y)</span>
                                    </span>:
                                </label>
                                <div className='slider-range__box'>
                                    <div className='slider-range__input'>
                                        <input type='range' step='0.01' min='-1'
                                            max='1' value={correlation}
                                            className='form-range'
                                            id='correlation'
                                            disabled={startQuiz}
                                            // eslint-disable-next-line max-len
                                            onChange={handleCorrelationChange} />
                                        <div className='scale-value katex'>
                                            <span className='mathnormal'>
                                                {correlation}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='slider-range__scale'>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                        <div className='unit'></div>
                                    </div>
                                </div>
                            </div>
                            {slope !== null && (
                                <>
                                    <div className='mt-5 h2'>
                                        Calculated correlation
                                        coefficient: <span className='katex'>
                                            <span className='mathnormal'>{appRvalue.toFixed(2)}</span>{/* eslint-disable-line max-len */}
                                        </span>:
                                    </div>
                                </>
                            )}
                            <div className='mt-3'>
                                <label className='dev-only'> Seed ID:
                                    <input type='text'
                                        value={seed} disabled={startQuiz}
                                        className='ms-1 mt-2 dev-only' size='10'
                                        onChange={handleSeedChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div> {/* div class=simulation__step-container */}
                {slope !== null && (
                    <>
                        <div className='simulation__step-container d-flex'>
                            <div className='simulation__step-num'>
                                &bull;
                            </div>
                            <div className='simulation__step-toggle--down'>
                            </div>
                            <div className='simulation__step-body'>
                                <header className='simulation__step-header'>
                                    <h2 className='h2-primary'>
                                        Resulting Graph Coefficients</h2>
                                </header>
                                <div className='simulation__step-content'>
                                    <p>
                                    The graph generated with your sample size
                                    and correlation coefficient produces the
                                    following coefficients. Let&rsquo;s look at
                                    them in detail.
                                    </p>
                                    <h2 className='mt-4'>
                                        Regression line equation:</h2>
                                    <div className='ms-3 mb-3'>
                                        <Katex tex={
                                        // eslint-disable-next-line max-len
                                            '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x'
                                        } />
                                    </div>
                                    <div className='ms-3 mb-3'>
                                        <Katex tex={
                                        // eslint-disable-next-line max-len
                                            `\\hat{y} = ${intercept.toFixed(2)} + ${slope.toFixed(3)}x`
                                        } />
                                    </div>
                                    <p>where <span className='katex'>
                                        <span className='mathnormal'>y</span> {/* eslint-disable-line max-len */}
                                    </span> is the dependent variable and
                                    <span className='katex'> <span className='mathnormal'>x</span> {/* eslint-disable-line max-len */}
                                    </span> is the independent, or
                                        explanatory, variable.
                                    </p>
                                    <h2 className='mt-4'>Sample <span className='katex'><span className='mathnormal'>y-intercept</span> {/* eslint-disable-line max-len */}
                                    </span> coefficient:</h2>
                                    <div className='ms-3'>
                                        <Katex tex={
                                        // eslint-disable-next-line max-len
                                            `\\hat{\\beta_0} = ${intercept.toFixed(3)}`
                                        } />
                                    </div>
                                    <h2 className='mt-4'>Sample slope
                                        coefficient:</h2>
                                    <div className='ms-3'>
                                        <Katex tex={
                                        // eslint-disable-next-line max-len
                                            `\\hat{\\beta_1} = ${slope.toFixed(3)}`
                                        } />
                                    </div>
                                    <h2 className='mt-4'>Standard error of
                                    the sample slope:</h2>
                                    <div className='ms-3'>
                                        <Katex tex={
                                        // eslint-disable-next-line max-len
                                            `{SE(\\hat{\\beta_1})} = ${stderror.toFixed(3)}`} />
                                    </div>
                                </div>
                            </div>
                        </div> {/* div class=simulation__step-container */}
                        <div className='simulation__step-container d-flex'>
                            <div className='simulation__step-num'>
                                &bull;
                            </div>
                            <div className='simulation__step-toggle--down'>
                            </div>
                            <div className='simulation__step-body'>
                                <header className='simulation__step-header'>
                                    <h2 className='h2-primary'>
                                        Null hypothesis</h2>
                                </header>
                                <div className='simulation__step-content'>
                                    <div className='row'>
                                        <label className='col-3'>
                                            <Katex tex={
                                                '{\\Eta_0} : {\\beta_1} ='
                                            } />
                                        </label>
                                        <input size='10' className='col-9 w-25'
                                            type='number' min='-5' max='5'
                                            disabled={startQuiz}
                                            value={hypothesizedSlope}
                                            onChange={handleNullHypothesis} />
                                    </div>
                                    <div className='row my-3'>
                                        <Katex tex={tEquation} />
                                    </div>
                                    <div className='row'>
                                        <div className='input-group my-3'>
                                            <Katex tex={
                                            // eslint-disable-next-line max-len
                                                `t = \\cfrac{${slope.toFixed(3)} - ${hypothesizedSlope}}{${stderror.toFixed(3)}} = ${tvalue}`
                                            } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> {/* div class=simulation__step-container */}

                        <div className="d-flex justify-content-center my-3">
                            <button className='btn btn-primary'
                                onClick={saveGraphData}>
                                Save Graph Data
                            </button>
                        </div>
                        {startQuiz && (
                            <SimulationOneQuiz
                                coursePk={coursePk}
                                tvalue={tvalue}
                                hypothesizedSlope={hypothesizedSlope}
                                n={N}
                                appRvalue={appRvalue} />
                        )}
                    </>
                )}
            </div> {/* div class=simulation__workspace */}
            <div className='simulation__graphspace'>
                <ScatterPlot
                    N={N}
                    correlation={correlation}
                    seed={seed}
                    slope={slope}
                    setSlope={setSlope}
                    stderror={stderror}
                    setStderror={setStderror}
                    intercept={intercept}
                    setIntercept={setIntercept}
                    appRvalue={appRvalue}
                    setAppRvalue={setAppRvalue}
                    plotType={'2d'}
                />
                {slope !== null && (
                    <div className='simulation__graph-summary fs-5'>
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept.toFixed(2)} + ${slope.toFixed(3)}x;`
                        } />
                        <Katex tex={
                        // eslint-disable-next-line max-len
                            `\\hat{\\beta_1} = ${slope.toFixed(3)};`
                        } />
                        <Katex tex={
                        // eslint-disable-next-line max-len
                            `corr(x,y) = ${appRvalue.toFixed(2)}`
                        } />
                    </div>
                )}
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};