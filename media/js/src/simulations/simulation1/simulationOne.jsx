import React, { useState, useEffect } from 'react';
import { ScatterPlot } from './scatterPlot';
import { Katex } from '../../utils/katexComponent';
import { authedFetch, fetchQuizData } from '../../utils/utils';
import { SimulationOneQuiz } from './simulationOneQuiz';
import { SimIntro } from './simulationIntro';
import { GraphCoefficients } from './graphCoefficientsSection';
import { NullHypothesisSection } from './nullHypothesisSection';
import { PvalueModal } from './modalPvalue';
import { CriticalValueModal } from './modalCV';
import { GlossaryModal } from './modalGlossary';


const simContainer = document.querySelector('#react-root');
const coursePk =
    simContainer ? Number(simContainer.dataset.course) : '';

export const SimulationOne = () => {
    const [N, setN] = useState(50);
    const [yCorrelation, setYcorrelation] = useState(0.3);
    const [xCorrelation, setXcorrelation] = useState(0.3);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [intercept3d, setIntercept3d] = useState(null);
    const [stderror, setStderror] = useState(null);
    const [appRvalue, setAppRvalue] = useState(null);
    const [appRvalue3d, setAppRvalue3d] = useState(null);
    const [startQuiz, setStartQuiz] = useState(false);
    const [startQuiz2, setStartQuiz2] = useState(false);
    const [plotType, setPlotType] = useState('2d');
    const [slopes, setSlopes] = useState([]);
    const [stderrs, setStderrs] = useState([]);
    const [is2DCompleted, setIs2DCompleted] = useState(false);
    const [is3DCompleted, setIs3DCompleted] = useState(false);
    const [submissionId, setSubmissionId] = useState(null);
    const [completedChoices, setCompletedChoices] = useState([]);
    const [completedChoices3d, setCompletedChoices3d] = useState([]);
    const [selectedAltHypothesis, setSelectedAltHypothesis] = useState(null);
    const [isNInvalid, setIsNInvalid] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [lockControls, setLockControls] = useState(false);


    const createSubmission = async() => {
        // Define the data to be saved based on the plot type
        const data = plotType === '2d' ? {
            N, yCorrelation, slope, intercept, stderror, appRvalue,
            tvalue
        } : {
            N, yCorrelation, slope, intercept, stderror, appRvalue,
            tvalue, slopes, stderrs, xCorrelation,
            appRvalue3d, intercept3d
        };

        const payload = {
            simulation: 1,
            data: data,
            submission_id: submissionId
        };

        const url = `/course/${coursePk}/api/create-sub/`;
        const method = submissionId ? 'PUT' : 'POST';

        return authedFetch(url, method, payload)
            .then(response => {
                if (response.status === 201 || response.status === 200) {
                    return response.json();
                } else {
                    throw `Error (${response.status}) ${response.statusText}`;
                }
            })
            .then(data => {
                if (plotType === '2d') {
                    setStartQuiz(true);
                } else {
                    setStartQuiz2(true);
                }
                setSubmissionId(data.submission_id);
                return data;
            })
            .catch(error => {
                console.error('Error creating submission', error);
                throw error;
            });
    };

    const handleCreateSub = async() => {
        try {
            if(!submissionId) {
                await createSubmission();
            } else {
                if (plotType === '2d') {
                    setStartQuiz(true);
                } else {
                    setStartQuiz2(true);
                }
            }
            await createSubmission();
        } catch (error) {
            alert('Failed to save graph and submission.');
        }
    };

    const handleNChange = (e) => {
        const n = parseInt(e.target.value);
        setN(n);
        setIsNInvalid(n < 50 || n > 500);
    };

    const handleNBlur = (e) => {
        const n = parseInt(e.target.value);
        if (isNaN(n) || n < 50) {
            setN(50);
        } else if (n > 500) {
            setN(500);
        }
        setIsNInvalid(n < 50 || n > 500);
    };

    const handleYcorrelationChange = (e) => {
        setYcorrelation(parseFloat(e.target.value));
    };

    const handleXcorrelationChange = (e) => {
        setXcorrelation(parseFloat(e.target.value));
    };

    const handlePlotTypeChange = (type) => {
        setPlotType(type);
        setSelectedAltHypothesis(null);
        setLockControls(false);
        document.getElementById('learningGoal')
            .scrollIntoView({ behavior: 'smooth'});
    };

    let tvalue;
    if (slope !== null) {
        // eslint-disable-next-line max-len
        tvalue = parseFloat(((slope.toFixed(3) - 0) / stderror.toFixed(3)).toFixed(2));
    }

    let tvalue3d;
    if (slopes.length !== 0 && slopes[0]) {
        // eslint-disable-next-line max-len
        tvalue3d = parseFloat(((slopes[0].toFixed(3) - 0) / stderrs[0].toFixed(3)).toFixed(2));
    }

    useEffect(() => {
        fetchQuizData(coursePk, 1)
            .then(data => {
                if (data.submission_id) {
                    // if (plotType === '2d') {
                    //     setStartQuiz(true);
                    // } else {
                    //     setStartQuiz2(true);
                    // }
                    // setSubmissionId(data.submission_id);
                    setAnswers(data.answers);
                }
            });
    }, []);

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
                            {plotType === '2d' && (
                                <p>Let&rsquo;s start setting up the parameters
                                to generate random data points for your
                                graph.</p>
                            )}
                            {plotType === '3d' && (
                                <p>Let&rsquo;s introduce another variable to
                                your graph, <Katex tex={'x_2'}
                                    className="katex-inline"/> and <Katex
                                    tex={'\\text{corr}(x_1,x_2)'}
                                    className="katex-inline" />.
                                <Katex tex={'n'} className="katex-inline"/> and
                                <Katex tex={'\\text{corr}(x_1,y)'}
                                    className="katex-inline" /> are values from
                                the previous section.</p>
                            )}
                            <div className="mt-4 d-flex">
                                <label htmlFor="nSampleSize"
                                    className="h2 me-2
                                        form-label
                                        align-self-center">
                                    Sample size,
                                    <Katex tex={'n'}
                                        className="katex-inline" />:
                                </label>
                                <input type="number" min="50" max="500"
                                    id="nSampleSize"
                                    className="form-control extra-short-input"
                                    disabled={
                                        is2DCompleted || lockControls}
                                    value={N}
                                    onBlur={handleNBlur}
                                    onChange={handleNChange} />
                                {isNInvalid && (<>
                                    <div className="alert-incorrect-container
                                        ms-2">
                                        <div className="alert-incorrect">!</div>
                                        <div>
                                            <Katex tex={'50 \\leq n \\leq 500'}
                                                className="katex-inline" />
                                        </div>
                                    </div>
                                </>)}
                            </div>
                            {plotType === '2d' && (
                                <div className="mt-4">
                                    <label htmlFor="correlation"
                                        className="h2 form-label">Correlation
                                    coefficient <Katex
                                            tex={'\\text{corr}(x,y)'}
                                            className="katex-inline" />:
                                    </label>
                                    <div className="slider-range__box">
                                        <div className="slider-range__input">
                                            <input
                                                type="range"
                                                step="0.01"
                                                min="-0.999"
                                                max="0.999" value={yCorrelation}
                                                className="form-range"
                                                id="correlation"
                                                disabled={lockControls}
                                                onChange={
                                                    handleYcorrelationChange} />
                                            <div className="scale-value">
                                                {slope !== null && (
                                                    <div className="hi-val">
                                                        <Katex tex={`${
                                                            appRvalue.toFixed(
                                                                3)}`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="slider-range__scale">
                                            <div className="unit"></div>
                                            <div className="unit"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {plotType === '3d' && (
                                <div className="mt-4">
                                    <label htmlFor="correlation"
                                        className="h2 form-label">Correlation
                                        coefficient <Katex
                                            tex={'\\text{corr}(x_1,x_2)'}
                                            className="katex-inline" />:
                                    </label>
                                    <div className="slider-range__box">
                                        <div className="slider-range__input">
                                            <input
                                                type="range"
                                                step="0.01"
                                                min="-0.999"
                                                max="0.999" value={xCorrelation}
                                                className="form-range"
                                                id="correlation"
                                                disabled={lockControls}

                                                onChange={
                                                    handleXcorrelationChange} />
                                            <div className="scale-value">
                                                {slopes.length > 0 && (
                                                    <div className="hi-val">
                                                        <Katex tex={
                                                            `${appRvalue3d
                                                                .toFixed(3)
                                                            }`} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="slider-range__scale">
                                            <div className="unit"></div>
                                            <div className="unit"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div> {/* div class=simulation__step-container */}
                {slope !== null && (
                    <>
                        <GraphCoefficients
                            intercept={intercept}
                            intercept3d={intercept3d}
                            slope={slope}
                            stderror={stderror}
                            plotType={plotType}
                            slopes={slopes}
                            n={N}
                            corr2d={appRvalue}
                            corr3d={plotType === '3d' ? appRvalue3d : null}
                            stderrs={stderrs} />

                        <NullHypothesisSection
                            plotType={plotType}
                            slope={slope}
                            slopes={slopes}
                            stderror={stderror}
                            stderrs={stderrs}
                            tvalue={tvalue}
                            tvalue3d={tvalue3d}
                            startQuiz={startQuiz}
                            startQuiz2={startQuiz2} />

                        <div className="simulation__step-prompt-orphan">
                            <p>
                                Let&rsquo;s move on
                                to hypothesis testing.
                            </p>
                            {plotType === '2d' && (
                                <button
                                    className="btn btn-sm btn-success"
                                    id="gotoTesting2d"
                                    disabled={startQuiz}
                                    onClick={handleCreateSub}>
                                    Continue &raquo;
                                </button>
                            )}
                            {plotType === '3d' && (
                                <button
                                    className="btn btn-sm btn-success"
                                    id="gotoTesting3d"
                                    disabled={startQuiz2}
                                    onClick={handleCreateSub}>
                                    Continue &raquo;
                                </button>
                            )}
                        </div>
                        {(startQuiz && plotType === '2d') && (
                            <SimulationOneQuiz
                                plotType={plotType}
                                coursePk={coursePk}
                                answers={answers}
                                tvalue={tvalue}
                                n={N}
                                appRvalue={appRvalue}
                                isCompleted={is2DCompleted}
                                submissionId={submissionId}
                                completedChoices={completedChoices}
                                setCompletedChoices={setCompletedChoices}
                                setIsCompleted={setIs2DCompleted}
                                selectedAltHypothesis={selectedAltHypothesis}
                                // eslint-disable-next-line max-len
                                setSelectedAltHypothesis={setSelectedAltHypothesis}
                                handlePlotTypeChange={handlePlotTypeChange}
                                lockControls={lockControls}
                                setLockControls={setLockControls} />
                        )}
                        {(startQuiz2 && plotType === '3d') && (
                            <SimulationOneQuiz
                                plotType={plotType}
                                coursePk={coursePk}
                                answers={answers}
                                tvalue={tvalue3d}
                                n={N}
                                appRvalue={appRvalue3d}
                                isCompleted={is3DCompleted}
                                submissionId={submissionId}
                                completedChoices={completedChoices3d}
                                setCompletedChoices={setCompletedChoices3d}
                                setIsCompleted={setIs3DCompleted}
                                selectedAltHypothesis={selectedAltHypothesis}
                                // eslint-disable-next-line max-len
                                setSelectedAltHypothesis={setSelectedAltHypothesis}
                                handlePlotTypeChange={handlePlotTypeChange}
                                lockControls={lockControls}
                                setLockControls={setLockControls} />
                        )}
                    </>
                )}
            </div> {/* div class=simulation__workspace */}
            <div className="simulation__graphspace">
                {/* Navigation tabs for selecting 2D or 3D plot types */}
                <div className="simulation__typetab">
                    <ul className="nav nav-underline">
                        <li className="nav-item">
                            <a className={
                                plotType === '2d'
                                    ? 'active nav-link'
                                    : 'nav-link'}
                            onClick={() => handlePlotTypeChange('2d')}
                            href="#">Single variable</a>
                        </li>

                        <li className="nav-item">
                            <a className={
                                plotType === '3d'
                                    ? 'active nav-link'
                                    : (!is2DCompleted
                                        ? 'nav-link disabled'
                                        : 'nav-link')
                            }
                            onClick={() => handlePlotTypeChange('3d')}
                            href="#">Multi variable</a>
                        </li>

                    </ul>
                </div>
                <ScatterPlot
                    N={N}
                    yCorrelation={yCorrelation}
                    xCorrelation={xCorrelation}
                    setSlopes={setSlopes}
                    setSlope={setSlope}
                    setStderrs={setStderrs}
                    setStderror={setStderror}
                    setIntercept={setIntercept}
                    setIntercept3d={setIntercept3d}
                    setAppRvalue={setAppRvalue}
                    setAppRvalue3d={setAppRvalue3d}
                    plotType={plotType}
                />
                {(slope !== null) && (plotType === '2d') && (
                    <div className="simulation__graph-summary">
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept.toFixed(3)} + ${slope.toFixed(3)}x;\\; \\hat{\\beta_1} = ${slope.toFixed(3)};\\; \\text{corr}(x,y) = ${appRvalue.toFixed(3)}`
                        } />
                    </div>
                )}
                {(slopes.length > 0) && (plotType === '3d') && (
                    <div className="simulation__graph-summary">
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept3d.toFixed(3)} + ${slopes[0].toFixed(3)}x_1 + ${slopes[1].toFixed(3)}x_2;\\; ` +
                            // eslint-disable-next-line max-len
                            `\\hat{\\beta_1} = ${slopes[0].toFixed(3)};\\; \\hat{\\beta_2} = ${slopes[1].toFixed(3)};\\; \\text{corr}(x_1,x_2) = ${appRvalue3d.toFixed(3)}\\; \\text{corr}(x,y) = ${appRvalue.toFixed(3)}`
                        } />
                    </div>
                )}
            </div> {/* div class=simulation__graphspace */}

            <PvalueModal />

            <CriticalValueModal />

            <GlossaryModal />

        </div> // div class=simulation
    );
};