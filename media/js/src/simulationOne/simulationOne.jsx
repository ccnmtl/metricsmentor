import React, { useState } from 'react';
import { ScatterPlot } from './scatterPlot';
import { Katex } from '../katexComponent';
import { authedFetch } from '../utils';
import { SimulationOneQuiz } from './simulationOneQuiz';
import { SimIntro } from './simulationIntro';
import { GraphCoefficients } from './graphCoefficientsSection';
import { NullHypothesisSection } from './nullHypothesisSection';


// const CURRENT_USER = window.MetricsMentor.currentUser.id;
const isSuperUser = window.MetricsMentor.currentUser.is_superuser;
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
    const [plotType, setPlotType] = useState('2d');
    const [slopes, setSlopes] = useState([]);
    const [stderrs, setStderrs] = useState([]);
    const [is2DCompleted, setIs2DCompleted] = useState(false);
    const [showNullHypothesis, setShowNullHypothesis] = useState(false);
    const [submissionId, setSubmissionId] = useState(null);


    const saveGraphData = async() => {
        const data = {
            N, correlation, seed, slope, intercept, stderror, appRvalue,
            tvalue, hypothesizedSlope
        };

        return authedFetch(
            `/course/${coursePk}/api/save-sim1-graph/`, 'POST', { data })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    throw 'Error  ' +
                    `(${response.status}) ${response.statusText}`;
                }
            })
            .then(data => {
                setStartQuiz(true);
                setSubmissionId(data.submission_id);
                return data;
            })
            .catch(error => {
                console.error('Error saving graph data:', error);
                throw error;
            });
    };

    const handleSaveGraph = async() => {
        try {
            await saveGraphData();
        } catch (error) {
            alert('Failed to save graph and submission.');
        }
    };

    const handleNChange = (e) => {
        setN(parseInt(e.target.value));
    };

    const handleNBlur = (e) => {
        const n = parseInt(e.target.value);
        if (isNaN(n) || n < 50) {
            setN(50);
        } else if (n > 500) {
            setN(500);
        }
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

    const handlePlotTypeChange = (type) => {
        setPlotType(type);
    };

    const handleShowNullHypothesis = () => {
        setShowNullHypothesis(true);
    };

    let tvalue;
    if (slope !== null) {

        // eslint-disable-next-line max-len
        tvalue = ((slope.toFixed(3) - hypothesizedSlope) / stderror.toFixed(3)).toFixed(3);
    }

    const tEquation =
    't = \\cfrac{\\hat{\\beta}_1 - \\beta_1}{SE(\\hat{\\beta_1})}';

    return (
        <div className="simulation">
            <div className="simulation__workspace">

                <SimIntro plotType={plotType} />

                <div className="simulation__step-container d-flex">
                    <div className="simulation__step-num">
                        &bull;
                    </div>
                    <div className="simulation__step-toggle--down">
                    </div>
                    <div className="simulation__step-body">
                        <header className="simulation__step-header">
                            <h2 className="h2-primary">Graph seeding</h2>
                        </header>
                        <div className="simulation__step-content">
                            <p>
                                Let&rsquo;s start by setting up the parameters
                                for your graph. To generate data, you can set
                                the sample size, <span className="katex">
                                    <span className="mathnormal">n</span>
                                </span>,
                                and the estimated correlation
                                coefficient, <span className="katex">
                                    <span className="mathnormal">
                                        corr(x,y)
                                    </span></span>, between the independent
                                and dependent variables <span className="katex">
                                    <span className="mathnormal">x</span>
                                </span> and <span className="katex">
                                    <span className="mathnormal">y</span>
                                </span>.
                            </p>
                            <div className="mt-4">
                                <label htmlFor="nSampleSize"
                                    className="h2 form-label">
                                    Sample size, <span className="katex">
                                        <span className="mathnormal">n</span>
                                    </span>:
                                </label>
                                <input type="number" min="50" max="500"
                                    id="nSampleSize"
                                    className="form-control short-input"
                                    disabled={startQuiz}
                                    value={N}
                                    onBlur={handleNBlur}
                                    onChange={handleNChange} />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="correlation"
                                    className="h2 form-label">
                                    Estimated correlation
                                coefficient, <span className="katex">
                                        <span
                                            className="mathnormal">corr(x,y)
                                        </span>
                                    </span>:
                                </label>
                                <div className="slider-range__box">
                                    <div className="slider-range__input">
                                        <input type="range" step="0.01" min="-1"
                                            max="1" value={correlation}
                                            className="form-range"
                                            id="correlation"
                                            disabled={startQuiz}
                                            // eslint-disable-next-line max-len
                                            onChange={handleCorrelationChange} />
                                        <div className="scale-value katex">
                                            <span className="mathnormal">
                                                {correlation}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="slider-range__scale">
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                        <div className="unit"></div>
                                    </div>
                                </div>
                            </div>
                            {slope !== null && (
                                <>
                                    <div className="mt-5 h2">
                                        Calculated correlation
                                        coefficient: <div className="hi-val">
                                        <span className="katex">
                                            <span className="mathnormal">{appRvalue.toFixed(3)}</span>{/* eslint-disable-line max-len */}
                                        </span></div>
                                    </div>
                                </>
                            )}
                            <div className="mt-3">
                                <label className="dev-only"> Seed ID:
                                    <input type="text"
                                        value={seed} disabled={startQuiz}
                                        className="ms-1 mt-2 dev-only" size="10"
                                        onChange={handleSeedChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div> {/* div class=simulation__step-container */}
                {slope !== null && (
                    <>
                        <GraphCoefficients
                            intercept={intercept}
                            slope={slope}
                            stderror={stderror}
                            plotType={plotType}
                            appRvalue={appRvalue}
                            slopes={slopes}
                            stderrs={stderrs}
                            onShowNullHypothesis={handleShowNullHypothesis} />
                        {showNullHypothesis && (
                            <>
                                <NullHypothesisSection
                                    slope={slope}
                                    stderror={stderror}
                                    tvalue={tvalue}
                                    tEquation={tEquation}
                                    hypothesizedSlope={hypothesizedSlope}
                                    handleNullHypothesis={handleNullHypothesis}
                                    startQuiz={startQuiz} />

                                <div className=
                                    "d-flex justify-content-center my-3">
                                    <button className="btn btn-primary"
                                        disabled={startQuiz}
                                        onClick={handleSaveGraph}>
                                    Save Graph and Continue
                                    </button>
                                </div>
                            </>
                        )}
                        {startQuiz && (
                            <SimulationOneQuiz
                                coursePk={coursePk}
                                tvalue={tvalue}
                                hypothesizedSlope={hypothesizedSlope}
                                n={N}
                                appRvalue={appRvalue}
                                is2DCompleted={is2DCompleted}
                                submissionId={submissionId}
                                setIs2DCompleted={setIs2DCompleted} />
                        )}
                    </>
                )}
            </div> {/* div class=simulation__workspace */}
            <div className="simulation__graphspace">
                <div className="simulation__tab">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={
                                plotType === '2d'
                                    ? 'active nav-link'
                                    : 'nav-link'}
                            onClick={() => handlePlotTypeChange('2d')}
                            href="#">2D</a>
                        </li>
                        {isSuperUser && (
                            <li className="nav-item">
                                <a className={
                                    plotType === '3d'
                                        ? 'active nav-link'
                                        : (!is2DCompleted
                                            ? 'nav-link disabled'
                                            : 'nav-link')
                                }
                                onClick={() => handlePlotTypeChange('3d')}
                                href="#">3D</a>
                            </li>
                        )}
                    </ul>
                </div>
                <ScatterPlot
                    N={N}
                    correlation={correlation}
                    seed={seed}
                    slope={slope}
                    slopes={slopes}
                    setSlopes={setSlopes}
                    setSlope={setSlope}
                    stderror={stderror}
                    stderrs={stderrs}
                    setStderrs={setStderrs}
                    setStderror={setStderror}
                    intercept={intercept}
                    setIntercept={setIntercept}
                    appRvalue={appRvalue}
                    setAppRvalue={setAppRvalue}
                    plotType={plotType}
                />
                {(slope !== null) && (plotType === '2d') && (
                    <div className="simulation__graph-summary fs-5">
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept.toFixed(3)} + ${slope.toFixed(3)}x;`
                        } />
                        <Katex tex={
                            `\\hat{\\beta_1} = ${slope.toFixed(3)};`
                        } />
                        <Katex tex={
                            `corr(x,y) = ${appRvalue.toFixed(3)}`
                        } />
                    </div>
                )}
                {(slopes.length > 0) && (plotType === '3d') && (
                    <div className="simulation__graph-summary fs-5">
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept.toFixed(3)} + ${slopes[0].toFixed(3)}x_1 + ${slopes[1].toFixed(3)}x_2;`
                        } />
                        <Katex tex={
                            `\\hat{\\beta_1} = ${slopes[0].toFixed(3)};`
                        } />
                        <Katex tex={
                            `\\hat{\\beta_2} = ${slopes[1].toFixed(3)};`
                        } />
                        <Katex tex={
                            `corr(x_1,x_2) = ${appRvalue.toFixed(3)}`
                        } />
                    </div>

                )}
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};