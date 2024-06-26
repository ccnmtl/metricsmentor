import React, { useState, useEffect } from 'react';
import { ScatterPlot2 } from './scatterPlot2';
import { authedFetch, inlineKatex } from '../utils';
import { SimulationTwoQuiz } from './simulationTwoQuiz';
import { Variables2 } from './Variables2';
import { ControlVariable } from './ControlVariable';
// import { NullHypothesisSection2 } from './nullHypothesisSection2';
import DATASETS from '../../../../json/datasets.json';
import { Step } from '../Step';


// const CURRENT_USER = window.MetricsMentor.currentUser.id;
// const simContainer = document.querySelector('#react-root');

// const coursePk =
//     simContainer ? Number(simContainer.dataset.course) : '';

const COLUMNS = {
    income: {
        y: 'income', x_1: 'educ', x_2: 'consump', x_3: 'black', x_4: 'size'
    },
    gpa4: {
        y: 'colGPA', x_1: 'hsGPA', x_2: 'ACT', x_3: 'campus', x_4: 'skipped',
        x_5: 'bgfriend'
    },
};

export const SimulationTwo = () => {
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [stderror, setStderror] = useState(null);
    const [appRvalue, setAppRvalue] = useState(null);
    // const [startQuiz, setStartQuiz] = useState(false);
    // const [hypothesizedSlope, setHypothesizedSlope] = useState(0);
    const [slopes, setSlopes] = useState([]);
    const [stderrs, setStderrs] = useState([]);
    const [choice, setChoice] = useState('income');
    const [data, setData] = useState(DATASETS[choice]);
    const [controls, setControls] = useState({});

    const handleChoice = function(e) {
        setChoice(e.target.value);
    };
    // const [control, setControl] = useState([]);

    const handleControls = function(e) {
        setControls({...controls, [e.target.name]: e.target.checked});
    };

    useEffect(() => {
        setData(DATASETS[choice]);
    }, [choice]);

    useEffect(() => {
        setControls({});
    }, [data]);

    // const saveGraphData = async() => {
    //     const data = {
    //         slope, intercept, stderror, appRvalue,
    //         tvalue, hypothesizedSlope
    //     };

    //     return authedFetch(
    //         `/course/${coursePk}/api/save-sim2-graph/`, 'POST', {data})
    //         .then(function(response) {
    //             if (response.status === 201) {
    //                 setStartQuiz(true);
    //                 return response.json();
    //             } else {
    //                 throw 'Error  ' +
    //             `(${response.status}) ${response.statusText}`;
    //             }
    //         });
    // };

    // const tvalue = ((slope - hypothesizedSlope) / stderror).toFixed(3);

    return (
        <div className="simulation">
            <div className="simulation__workspace">
                {[
                    {
                        header: 'Simulation 2',
                        title: 'Omitted Variable Bias',
                        body: <p>In this module, the first endogeneity problem
                            we will tackle in regression analysis is omitted
                            variable bias (OVB). Failing to account for some
                            variables can bias your sample slope of the
                            variable of interest. Through interactive exercises
                            and examples, you will learn how to identify and
                            address OVB in your econometric analysis, ensuring
                            the reliability and validity of your findings.
                        </p>
                    },
                    {
                        title: 'Learning Goals',
                        body: <p>Learning goals to orient students&apos;
                            expectations, shape their focus. TBD, etc, etc,
                            etc, fill in the rest of the text.
                        </p>
                    },
                    {
                        title: 'Variables of Interest',
                        body: <Variables2 {...{intercept, slope, stderror,
                            appRvalue, slopes, stderrs}} />
                    },
                    {
                        title: 'Control Variables',
                        body: <ControlVariable {...{handleControls, choice,
                            handleChoice, COLUMNS}}/>
                    },
                ].map((step, i) =>
                    <Step key={i} header={step.header} title={step.title}>
                        {step.body}
                    </Step>)
                }
            </div> {/* div class=simulation__workspace */}
            <div className="simulation__graphspace">
                <ScatterPlot2
                    {...{data, controls, slope, slopes, setSlopes,
                        setSlope, stderror, stderrs, setStderrs, setStderror,
                        intercept, setIntercept, appRvalue, setAppRvalue}}
                    y={COLUMNS[choice].y}
                    x1={COLUMNS[choice].x_1}
                />
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};