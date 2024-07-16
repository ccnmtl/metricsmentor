import React, { useState, useEffect } from 'react';
import { ScatterPlot2 } from './scatterPlot2';
// import { SimulationTwoQuiz } from './simulationTwoQuiz';
import { Variables2 } from './Variables2';
import { ControlVariable } from './ControlVariable';
// import { NullHypothesisSection2 } from './nullHypothesisSection2';
import DATASETS from '../../../../json/datasets.json';
import { Step } from '../Step';


// const CURRENT_USER = window.MetricsMentor.currentUser.id;
// const simContainer = document.querySelector('#react-root');

// const coursePk =
//     simContainer ? Number(simContainer.dataset.course) : '';

const columns = {
    income: {
        y: 'income', x_1: 'educ', x_2: 'consump', x_3: 'black', x_4: 'size',
        options: ['consump', 'black', 'size'],
        lines: {
            black:
                {color: 'blue', y: [931.2819294938943, 16105.090326003485]},
            consump:
                {color: 'red', y: [307.9616560408456, 6723.381312785317]},
            educ:
                {color: 'black', y: [2827.804820432055, 16193.34064843028]},
            size:
                {color: 'green',y: [3735.9177652365797, 17889.108551354886]},
        },
        xRange: [2, 20]
    },
    gpa4: {
        y: 'colGPA', x_1: 'hsGPA', x_2: 'ACT', x_3: 'campus', x_4: 'skipped',
        x_5: 'bgfriend', options: ['ACT', 'campus', 'skipped', 'bgfriend'],
        lines: {
            ACT:
                {color: 'red', y: [2.3972443183537147, 3.100151224430009]},
            bgfriend:
                {color: 'purple', y: [2.727648343333585, 3.3087673416319827]},
            campus:
                {color: 'blue', y: [2.41133950344707, 3.358445517219434]},
            hsGPA:
                {color: 'black', y: [2.573276613014987, 3.3451718437568054]},
            skipped:
                {color: 'green', y: [2.494452496563956, 3.4143822923166107]},
        },
        xRange: [2.4, 4]
    },
};

const labelIndex = {
    'ACT': 'ACT Score',
    'bgfriend': 'Significant Other',
    'black': 'Black',
    'campus': 'Lives On Campus',
    'colGPA': 'College GPA',
    'consump': 'Consumption',
    'educ': 'Years Of Education',
    'GPA4': 'GPA4',
    'hsGPA': 'High School GPA',
    'income': 'Income',
    'size': 'Family Size',
    'skipped': 'Classes Skipped Weekly',
};

export const SimulationTwo = () => {
    // const [startQuiz, setStartQuiz] = useState(false);
    // const [hypothesizedSlope, setHypothesizedSlope] = useState(0);
    const [choice, setChoice] = useState('income');
    const [data, setData] = useState(DATASETS[choice]);
    const [controls, setControls] = useState(
        {consump: false, black: false, size: false});

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
                        body: <Variables2 />
                    },
                    {
                        title: 'Control Variables',
                        body: <ControlVariable {...{controls, handleControls,
                            choice, handleChoice, columns, labelIndex}}/>
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
                    param={columns[choice]}
                />
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};