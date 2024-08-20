import React, { useState, useEffect } from 'react';
import { ScatterPlot2 } from './scatterPlot2';
import { Variables } from './variables';
import { ControlVariable } from './controlVariable';
import DATASETS from '../../../../json/datasets.json';
import { Step } from '../step';
import { dataAttr, labelIndex } from '../dataAttr';
import { LearningGoals } from './learningGoals';
import { MultipleChoiceQuestion2 } from '../multipleChoiceQuestion2';


// const CURRENT_USER = window.MetricsMentor.currentUser.id;
// const simContainer = document.querySelector('#react-root');

// const coursePk =
//     simContainer ? Number(simContainer.dataset.course) : '';

export const SimulationTwo = () => {
    const freshComplete = () => Object.keys(DATASETS).reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, {});

    const [choice, setChoice] = useState();
    const [data, setData] = useState();
    const [controls, setControls] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState({});
    const [isComplete, setIsComplete] = useState(freshComplete());
    // ===== CHECK SIM 1 FOR IMPLEMENTATION =====
    const submissionId = 1;
    const questionNumber = 1;
    // ==========================================

    const handleChoice = (e) => { setChoice(e.target.value); };

    const handleControls = (e) => {
        setControls({...controls, [e.target.name]: e.target.checked});
    };

    const handleStartOver = () => {
        setData();
        setControls({});
        setChoice();
        setIsComplete(freshComplete());
    };

    useEffect(() => {
        setData(DATASETS[choice]);
    }, [choice]);

    useEffect(() => {
        setControls({});
    }, [data]);

    /**
     * If the user has completed the first question for the current dataset,
     * show the second with a general question.
     * @returns {JSX.Element} The question component to render.
     */
    const getQuestions = () => {
        // If the user has completed the first question
        // for the current dataset, show the second with a
        // general question.
        if (Object.values(isComplete)
            .reduce((acc, val) => acc + val, 0) === 1)
        {
            return <MultipleChoiceQuestion2
                {...{choice, isSubmitted, setIsSubmitted,
                    submissionId, questionNumber, isCorrect,
                    setIsCorrect, handleContinue}}
                questionNumber={3}
                takeaways={{[choice]: takeaways[choice],
                    'general': takeaways.general}}
            />;
        } else {
            return <MultipleChoiceQuestion2
                {...{choice, isSubmitted, setIsSubmitted,
                    submissionId, questionNumber, isCorrect,
                    setIsCorrect, handleContinue}}
                questionNumber={1}
                takeaways={{[choice]: takeaways[choice]}}
            />;
        }
    };

    const handleContinue = () => {
        setIsComplete({...isComplete, [choice]: true});
        setData(null);
        setIsSubmitted(false);
    };

    const takeaways = {
        general: {
            prompt: ['This is the generic question.'],
            options: ['Wrong answer', 'Nope', 'Not this one',
                'The right answer'],
            answer: 'The right answer'
        },
        income: {
            prompt: ['This is the dataset specific question for income.'],
            options: ['income', 'gpa4', 'affairs_sim2', 'campus_sim2'],
            answer: 'income'
        },
        gpa4: {
            prompt: ['This is the dataset specific question for GPA4.'],
            options: ['income', 'gpa4', 'affairs_sim2', 'campus_sim2'],
            answer: 'gpa4'
        },
        affairs_sim2: {
            prompt: ['This is the dataset specific question for ' +
                'affairs_sim2.'],
            options: ['income', 'gpa4', 'affairs_sim2', 'campus_sim2'],
            answer: 'affairs_sim2'
        },
        campus_sim2: {
            prompt: ['This is the dataset specific question for ' +
                'campus_sim2.'],
            options: ['income', 'gpa4', 'affairs_sim2', 'campus_sim2'],
            answer: 'campus_sim2'
        }
    };

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
                        body: <LearningGoals id="learning-goals" {...{choice,
                            handleChoice, isComplete}} />
                    },
                ].map((step, i) =>
                    <Step key={i} header={step.header} title={step.title}>
                        {step.body}
                    </Step>)
                }
                {data && <>
                    {[
                        {
                            title: 'Variables of Interest',
                            body: <Variables params={dataAttr[choice]} />
                        },
                        {
                            title: 'Control Variables',
                            body: <ControlVariable data={dataAttr[choice]}
                                {...{controls, handleControls}}/>
                        },
                    ].map((step, i) =>
                        <Step key={i} header={step.header} title={step.title}>
                            {step.body}
                        </Step>)
                    }
                    <div className="simulation__step-container d-flex">
                        <div className="simulation__step-num">
                            &bull;
                        </div>
                        <div className="simulation__step-toggle--down">
                        </div>
                        <div className="simulation__step-body">
                            <header className="simulation__step-header">
                                <h2 className="h2-primary">
                                    Takeaway Questions
                                </h2>
                            </header>
                            {getQuestions()}
                        </div>
                    </div> {/* div class=simulation__step-container */}
                </>}
            </div> {/* div class=simulation__workspace */}
            <div className="simulation__graphspace">
                <ScatterPlot2
                    {...{controls, data, labelIndex}}
                    param={dataAttr[choice]}
                />
                <button className="btn btn-warning m-2"
                    onClick={handleStartOver}
                    style={{position: 'absolute', top: '0px'}}
                >
                    Start Over
                </button>
                <div className='row'>
                    <p className='col-auto mx-auto'>
                        Dataset source and information
                    </p>
                </div>
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};