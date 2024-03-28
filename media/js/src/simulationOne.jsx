import React, { useState } from 'react';
import { ScatterPlot } from './scatterPlot';
import { Katex } from './katexComponent';
import { authedFetch } from './utils';
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
    const [pvalue, setPvalue] = useState(null);
    const [startQuiz, setStartQuiz] = useState(false);
    const [hypothesizedSlope, setHypothesizedSlope] = useState(0);


    const saveGraphData = async() => {
        const data = {
            N, correlation, seed, slope, intercept, stderror, appRvalue,
            coursePk, tvalue, pvalue, hypothesizedSlope
        };

        return authedFetch('/api/save-sim1-graph/', 'POST', {data})
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

    const tvalue = (slope - hypothesizedSlope / stderror).toFixed(3);
    const tEquation =
    't = \\frac{\\hat{\\beta}_1 - \\beta_1}{SE(\\hat{\\beta_1})}';

    return (
        <div className='simulation'>
            <div className='simulation__workspace'>
                <div className='row ms-2 mt-5'>
                    <label className='fst-italic'> n:
                        <input type='number' min='50' max='500'
                            className='ms-2 mt-2' disabled={startQuiz}
                            value={N} onChange={handleNChange} />
                    </label>
                </div>
                <div className='row ms-2 mt-2'>
                    <label htmlFor='correlation'
                        className='form-label fst-italic'>
                        r : {correlation}
                    </label>
                    <input type='range' step='0.01' min='-1'
                        max='1' value={correlation}
                        className='form-range'
                        id='correlation' disabled={startQuiz}
                        onChange={handleCorrelationChange} />
                </div>
                <div className='row ms-2 mt-2'>
                    <label> Seed:
                        <input type='text' value={seed} disabled={startQuiz}
                            className='ms-1 mt-2' size='10'
                            onChange={handleSeedChange} />
                    </label>
                </div>
                {slope !== null && (
                    <>
                        <div>
                            <div className='row ms-2 mt-2'>
                                <label className='form-label fst-italic'>
                                    Application r = {appRvalue.toFixed(2)}
                                </label>
                            </div>
                            <div className='row ms-2 mt-3'>
                                <Katex tex={
                                    'y = \\hat{\\beta_0} + \\hat{\\beta_1}x'
                                } />
                            </div>
                            <div className='row ms-3 mt-2'>

                                y = {intercept.toFixed(2)} + {slope.toFixed(3)}x
                            </div>
                            <div className='row ms-2 mt-2'>
                                <label>
                                    <Katex tex={
                                        // eslint-disable-next-line max-len
                                        `\\hat{\\beta_0} = ${intercept.toFixed(3)}`
                                    } />
                                </label>
                            </div>
                            <div className='row ms-2'>
                                <label>
                                    <Katex tex={
                                        // eslint-disable-next-line max-len
                                        `\\hat{\\beta_1} = ${slope.toFixed(3)}`
                                    } />
                                </label>
                            </div>
                            <div className='row ms-2'>
                                <label>
                                    <Katex tex={
                                        `{SE} = ${stderror.toFixed(3)}`} />
                                </label>
                            </div>
                            <div className='row ms-2'>
                                <label className='col-2'>
                                    <Katex tex={'{\\Eta_0} : {\\beta_1} ='} />
                                </label>
                                <input size='10' className='col-12 w-25'
                                    type='number' min='-5' max='5'
                                    disabled={startQuiz}
                                    value={hypothesizedSlope}
                                    onChange={handleNullHypothesis} />
                            </div>
                            <div className='row ms-2 mt-2 mb-3'>
                                <Katex tex={tEquation} />
                            </div>
                            <div className='row ms-2'>
                                <div className='input-group mb-3'>
                                        t =
                                    <input type='text'
                                        style={{width: '10%'}}
                                        value={slope.toFixed(3)}
                                        className='form-control me-1 ms-1
                                            form-control-sm box-2' />
                                        -
                                    <input type='text'
                                        style={{width: '10%'}}
                                        value={hypothesizedSlope}
                                        className='form-control
                                                me-1 ms-1
                                        form-control-sm box-2' />
                                        /
                                    <input type='text'
                                        style={{width: '10%'}}
                                        value={stderror.toFixed(3)}
                                        className='form-control me-1 ms-1
                                            form-control-sm box-2' />
                                </div>
                            </div>
                            <div className='row ms-5'>
                                    = {tvalue}
                            </div>
                        </div>
                        <div className='row ms-2 mt-2'>
                            <button className='btn btn-primary'
                                onClick={saveGraphData}>
                                Save Graph Data
                            </button>
                        </div>
                        {startQuiz && (
                            <SimulationOneQuiz
                                coursePk={coursePk}
                                tvalue={tvalue}
                                pvalue={pvalue}
                                hypothesizedSlope={hypothesizedSlope}
                                appRvalue={appRvalue} />
                        )}
                    </>
                )}
            </div>
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
                    pvalue={pvalue}
                    setPvalue={setPvalue}
                />
            </div>
        </div>
    );
};