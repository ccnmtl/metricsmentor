import React, { useState, useEffect } from 'react';
import { ScatterPlot2 } from './scatterPlot2';
// import { SimulationTwoQuiz } from './simulationTwoQuiz';
import { Variables } from './variables';
import { ControlVariable } from './controlVariable';
// import { NullHypothesisSection2 } from './nullHypothesisSection2';
import DATASETS from '../../../../json/datasets.json';
import { Step } from '../step';
import { dataAttr } from '../dataAttr';


// const CURRENT_USER = window.MetricsMentor.currentUser.id;
// const simContainer = document.querySelector('#react-root');

// const coursePk =
//     simContainer ? Number(simContainer.dataset.course) : '';

const labelIndex = {
    ACT: 'ACT Score',
    affairs_sim2: 'Affairs',
    bgfriend: 'Significant Other',
    black: 'Black',
    campus: 'Lives On Campus',
    colGPA: 'College GPA',
    consump: 'Consumption',
    crime: 'Crime Rate',
    educ: 'Years Of Education',
    enroll: 'Enrollment',
    GPA4: 'GPA4',
    hsGPA: 'High School GPA',
    income: 'Income',
    kids: 'Has Kids',
    naffairs: 'Number Of Affairs',
    police: 'Police Presence',
    priv: 'Private School',
    ratemarr: 'Rating Of Marriage',
    relig: 'Degree Of Religiosity',
    size: 'Family Size',
    skipped: 'Classes Skipped Weekly',
    yrsmarr: 'Years Married',
};

export const SimulationTwo = () => {
    // const [startQuiz, setStartQuiz] = useState(false);
    // const [hypothesizedSlope, setHypothesizedSlope] = useState(0);
    const [choice, setChoice] = useState('income');
    const [data, setData] = useState(DATASETS[choice]);
    const [controls, setControls] = useState(
        {consump: false, black: false, size: false});

    const handleChoice = (e) => { setChoice(e.target.value); };

    const handleControls = (e) => {
        setControls({...controls, [e.target.name]: e.target.checked});
    };

    useEffect(() => {
        setData(DATASETS[choice]);
    }, [choice]);

    useEffect(() => {
        setControls({});
    }, [data]);

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
                        body: <Variables />
                    },
                    {
                        title: 'Control Variables',
                        body: <ControlVariable {...{controls, handleControls,
                            choice, handleChoice, labelIndex}}/>
                    },
                ].map((step, i) =>
                    <Step key={i} header={step.header} title={step.title}>
                        {step.body}
                    </Step>)
                }
            </div> {/* div class=simulation__workspace */}
            <div className="simulation__graphspace">
                <ScatterPlot2
                    {...{controls, data, labelIndex}}
                    param={dataAttr[choice]}
                />
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};