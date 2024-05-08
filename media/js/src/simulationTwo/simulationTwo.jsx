import React, { useState } from 'react';
import { ScatterPlot2 } from './scatterPlot2';
import { Katex } from '../katexComponent';
import { authedFetch } from '../utils';
import { SimulationTwoQuiz } from './simulationTwoQuiz';
import { Sim2Intro } from './sim2Intro';
import { GraphCoefficients2 } from './graphCoefficientsSection2';
import { NullHypothesisSection2 } from './nullHypothesisSection2';


// const CURRENT_USER = window.MetricsMentor.currentUser.id;
const simContainer = document.querySelector('#react-root');

const coursePk =
    simContainer ? Number(simContainer.dataset.course) : '';

export const SimulationTwo = () => {
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


    const saveGraphData = async() => {
        const data = {
            slope, intercept, stderror, appRvalue,
            tvalue, hypothesizedSlope
        };

        return authedFetch(
            `/course/${coursePk}/api/save-sim2-graph/`, 'POST', {data})
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

    const handleNullHypothesis = (e) => {
        setHypothesizedSlope(parseFloat(e.target.value));
    };
    const handlePlotTypeChange = (type) => {
        setPlotType(type);
    };

    const tvalue = ((slope - hypothesizedSlope) / stderror).toFixed(3);
    const tEquation =
    't = \\cfrac{\\hat{\\beta}_1 - \\beta_1}{SE(\\hat{\\beta_1})}';

    return (
        <div className='simulation'>
            <div className='simulation__workspace'>

                <Sim2Intro plotType={plotType} />

                <div className='simulation__step-container d-flex'>
                    <div className='simulation__step-num'>
                        &bull;
                    </div>
                </div> {/* div class=simulation__step-container */}
                {slope !== null && (
                    <>
                        <GraphCoefficients2
                            intercept={intercept}
                            slope={slope}
                            stderror={stderror}
                            plotType={plotType}
                            appRvalue={appRvalue}
                            slopes={slopes}
                            stderrs={stderrs} />

                        <NullHypothesisSection2
                            slope={slope}
                            stderror={stderror}
                            tvalue={tvalue}
                            tEquation={tEquation}
                            hypothesizedSlope={hypothesizedSlope}
                            handleNullHypothesis={handleNullHypothesis}
                            startQuiz={startQuiz} />

                        <div className='d-flex justify-content-center my-3'>
                            <button className='btn btn-primary'
                                onClick={saveGraphData}>
                                Save Graph Data
                            </button>
                        </div>
                        <SimulationTwoQuiz
                            coursePk={coursePk}
                            tvalue={tvalue}
                            hypothesizedSlope={hypothesizedSlope}
                            appRvalue={appRvalue}
                            is2DCompleted={is2DCompleted}
                            setIs2DCompleted={setIs2DCompleted} />
                    </>
                )}
            </div> {/* div class=simulation__workspace */}
            <div className='simulation__graphspace'>
                <div className='simulation__tab'>
                    <ul className='nav nav-tabs'>
                        <li className='nav-item'>
                            <a className={
                                plotType === '2d'
                                    ? 'active nav-link'
                                    : 'nav-link'}
                            onClick={() => handlePlotTypeChange('2d')}
                            href='#'>2D</a>
                        </li>
                        <li className='nav-item'>
                            <a className={
                                plotType === '3d'
                                    ? 'active nav-link'
                                    : (!is2DCompleted
                                        ? 'nav-link disabled'
                                        : 'nav-link')
                            }
                            onClick={() => handlePlotTypeChange('3d')}
                            href='#'>3D</a>
                        </li>
                    </ul>
                </div>
                <ScatterPlot2
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
                    <div className='simulation__graph-summary fs-5'>
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept.toFixed(2)} + ${slope.toFixed(3)}x;`
                        } />
                        <Katex tex={
                            `\\hat{\\beta_1} = ${slope.toFixed(3)};`
                        } />
                        <Katex tex={
                            `corr(x,y) = ${appRvalue.toFixed(2)}`
                        } />
                    </div>
                )}
                {(slopes.length > 0) && (plotType === '3d') && (
                    <div className='simulation__graph-summary fs-5'>
                        <Katex tex={
                            // eslint-disable-next-line max-len
                            `\\hat{y} = ${intercept.toFixed(2)} + ${slopes[0].toFixed(3)}x_1 + ${slopes[1].toFixed(3)}x_2;`
                        } />
                        <Katex tex={
                            `\\hat{\\beta_1} = ${slopes[0].toFixed(3)};`
                        } />
                        <Katex tex={
                            `\\hat{\\beta_2} = ${slopes[1].toFixed(3)};`
                        } />
                        <Katex tex={
                            `corr(x_1,x_2) = ${appRvalue.toFixed(2)}`
                        } />
                    </div>

                )}
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};