import React, { useState, useEffect } from 'react';
import { ScatterPlot2 } from './scatterPlot2';
import { Variables } from './variables';
import { ControlVariable } from './controlVariable';
import DATASETS from '../datasets.json';
import { Step } from '../../../step.jsx';
import { LearningGoals } from './learningGoals';
import { MultipleChoiceQuestion2 } from './multipleChoiceQuestion2';
import { authedFetch, deleteAnswer,
    fetchQuizData
} from '../../../utils/utils.jsx';
import { dataAttr, labelIndex, takeaways2, sim2TextVariable as varText,
    sim2TextControl as controlText, sim2Information as info, dataRange,
    dataIndex
} from '../dataAttr';

const simContainer = document.querySelector('#react-root');
const coursePk =
    simContainer ? Number(simContainer.dataset.course) : '';

const qIndex = ['general', 'income', 'gpa4', 'affairs_sim2', 'campus_sim2'];

export const SimulationTwo = () => {
    const freshComplete = () => Object.keys(DATASETS).reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, {});

    const [choice, setChoice] = useState();
    const [data, setData] = useState();
    const [controls, setControls] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isComplete, setIsComplete] = useState(freshComplete());
    const [submissionId, setSubmissionId] = useState();
    const [nextStep, setNextStep] = useState(false);

    useEffect(() => {
        fetchQuizData(coursePk, 2).then(data => {
            setSubmissionId(data.submission_id);
            const store = {};
            for (const answer of data.answers) {
                store[qIndex[answer.question_number - 1]] = answer.is_correct;
            }
            setIsComplete(store);
        });
    }, []);

    const createSubmission = async(followUp=()=>true) => {
        // Define the data to be saved based on the plot type
        const data = {};

        const payload = {
            simulation: 2,
            data: data
        };

        const url = `/course/${coursePk}/api/create-sub/`;

        authedFetch(url, 'POST', payload)
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    throw `Error (${response.status}) ${response.statusText}`;
                }
            })
            .then(data => {
                setSubmissionId(data.submission_id);
                followUp();
            })
            .catch(error => {
                console.error('Error saving graph data:', error);
                throw error;
            });
    };

    const handleChoice = (e) => {
        setIsSubmitted(false);
        setNextStep(false);
        setChoice(e.target.value);
    };

    const handleControls = (e) => {
        setControls({...controls, [e.target.name]: e.target.checked});
    };

    /**
     * Reset the simulation to the beginning.
     */
    const handleStartOver = () => {
        setData();
        setControls({});
        for (const topic in isComplete) {
            deleteAnswer(submissionId, takeaways2[topic].q_id);
        }
        setChoice();
        setIsComplete(freshComplete());
    };

    useEffect(() => {
        setData(DATASETS[choice]);
    }, [choice]);

    useEffect(() => {
        setControls({});
    }, [data]);

    const checkComplete = () => Object.values(isComplete)
        .reduce((acc, val) => acc + val, 0);

    /**
     * If the user has completed the first question for the current dataset,
     * show the second with a general question.
     * @returns {JSX.Element} The question component to render.
     */
    const getQuestions = () => {
        // If the user has completed the first question
        // for the current dataset, show the second with a
        // general question.
        const takeaways = checkComplete() === 1 && !isComplete[choice] ?
            {[choice]: takeaways2[choice], 'general': takeaways2.general} :
            {[choice]: takeaways2[choice]};
        const data = {choice, isSubmitted, setIsSubmitted, handleStartOver,
            handleContinue, checkComplete, submissionId, isComplete,
            setIsComplete, createSubmission, coursePk, nextStep, setNextStep,
            takeaways};
        return <MultipleChoiceQuestion2 {...data} />;
    };

    const handleContinue = () => {
        setChoice(null);
        setData(null);
        setIsSubmitted(false);
    };

    return (
        <div className="simulation">
            <div className="simulation__workspace">
                {[
                    {
                        header: 'Simulation 2',
                        title: 'Omitted Variable Bias',
                        body: <p>This simulation will address the first
                            endogeneity problem in regression analysis:
                            omitted variable bias (OVB). Overlooking certain
                            variables can lead to biased estimates of the
                            sample slope of the variable of interest. Through
                            interactive exercises and examples, you&rsquo;ll
                            learn how to detect and correct for OVB in your
                            econometric analysis, ensuring that your findings
                            are both reliable and valid.</p>
                    },
                    {
                        title: 'Learning Goals',
                        body: <LearningGoals id="learning-goals" {...{choice,
                            checkComplete, handleChoice, isComplete}} />
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
                            body: <Variables params={{
                                ...dataAttr[choice], ...dataIndex[choice],
                                varText: varText[choice]}} />
                        },
                        {
                            title: 'Control Variables',
                            body: <ControlVariable data={dataAttr[choice]}
                                {...{controls, handleControls,
                                    controlText: controlText[choice],
                                    index: dataIndex[choice],}}/>
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
                            <div className="simulation__step-content">
                                {isComplete[choice] &&
                                    <p className="text-success">
                                        You&rsquo;ve analyzed this dataset.
                                        You can revisit it, but
                                        focus on a dataset that you
                                        haven&rsquo;t examined.
                                    </p>
                                }
                                {getQuestions()}
                            </div>
                        </div>
                    </div> {/* div class=simulation__step-container */}
                </>}
            </div> {/* div class=simulation__workspace */}
            <div className="simulation__graphspace">
                <ScatterPlot2
                    {...{controls, data, labelIndex}}
                    param={dataRange[choice]}
                    index={dataIndex[choice]}
                />
                {choice && <div className="container text-center">
                    <p className="mx-auto px-5">{info[choice]}</p>
                </div>}
            </div> {/* div class=simulation__graphspace */}
        </div> // div class=simulation
    );
};