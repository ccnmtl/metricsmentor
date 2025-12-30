import React, { useState, useEffect } from 'react';
import { ScatterPlot2 } from './components/scatterPlot2';
import { Variables } from './components/variables';
import { ControlVariable } from './components/controlVariable';
import {
    inlineKatex, authedFetch, deleteAnswer,
    fetchQuizData, STATIC_URL,
} from '../../utils/utils';
import DATASETS from './datasets.json';
import { LearningGoals } from './components/learningGoals';
import { SimulationTwoTakeaway } from './simulationTwoTakeaway';
import { OVBTheoryModal } from './components/modalOVBTheory.jsx';
import {
    dataAttr, labelIndex, takeaways2, sim2TextVariable as varText,
    sim2TextControl as controlText, sim2Information as info, dataRange,
    dataIndex
} from './dataAttr';
import { SimulationPanel } from '../../SimulationPanel';

const simContainer = document.querySelector('#react-root');
const coursePk =
    simContainer ? Number(simContainer.dataset.course) : '';

const qIndex = ['general', 'income', 'gpa4', 'affairs_sim2', 'campus_sim2'];

export const SimulationTwo = () => {
    const freshComplete = () => Object.keys(DATASETS).reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, { general: false });

    const [choice, setChoice] = useState();
    const [data, setData] = useState();
    const [controls, setControls] = useState({});
    const [isComplete, setIsComplete] = useState(freshComplete());
    const [submissionId, setSubmissionId] = useState();
    const [nextStep, setNextStep] = useState(false);


    const checkComplete = () => Object.values(isComplete)
        .reduce((acc, val) => acc + val, 0);



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

    const createSubmission = async(followUp = () => true) => {
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
        setNextStep(false);
        setChoice(e.target.value);
    };

    const handleControls = (e) => {
        setControls({ ...controls, [e.target.name]: e.target.checked });
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

    const completedDatasetsCount = Object.keys(DATASETS)
        .filter(k => isComplete[k]).length;

    const activeQuestions = [];
    if (choice && takeaways2[choice]) {
        activeQuestions.push({ topic: choice, ...takeaways2[choice] });
    }
    if (completedDatasetsCount >= 2 &&
        (!isComplete['general'] ||
            (isComplete[choice] &&
                completedDatasetsCount === 2
            )
        )
    ) {
        activeQuestions.push({ topic: 'general', ...takeaways2.general });
    }

    const handleContinue = () => {
        setChoice(null);
        setData(null);
    };

    const steps = [
        {
            subtitle: 'Simulation 2',
            title: 'Omitted Variable Bias',
            segment: 'preamble',
            content: <>
                <p>This simulation will address one of the
                    endogeneity problems: omitted variable bias (OVB).
                    Omitting certain variables can lead to biased
                    estimates of the sample slope of the variable of
                    interest in regression analyses. Through
                    interactive exercises, you&rsquo;ll learn how to
                    detect the degree of OVB.</p>
                <p>In applied research, the goal is to ensure
                    that {inlineKatex('\\hat{\\beta_1}')}, the
                    estimated slope for the variable of
                    interest ({inlineKatex('x_1')}), is an unbiased
                    estimate of the population slope. If it is biased,
                    the estimate becomes unreliable.</p>
            </>
        },
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learning-goals',
            title: 'Learning Goals',
            ['data-cy']: 'section1',
            content: <LearningGoals id="learning-goals" {...{
                choice,
                checkComplete, handleChoice, isComplete
            }} />
        }
    ];

    if (data) {
        steps.push({
            title: 'Variables of Interest',
            ['data-cy']: 'section2',
            content: <Variables params={{
                ...dataAttr[choice], ...dataIndex[choice],
                varText: varText[choice]
            }} />
        });
        steps.push({
            title: 'Control Variables',
            ['data-cy']: 'section3',
            content: <ControlVariable data={dataAttr[choice]}
                {...{
                    controls, handleControls,
                    controlText: controlText[choice],
                    index: dataIndex[choice],
                }} />
        });
        steps.push({
            title: 'Takeaway Questions',
            headerId: 'takeawayQuestions',
            ['data-cy']: 'section4',
            content: <>
                {isComplete[choice] &&
                    <p className="text-success">
                        You&rsquo;ve analyzed this dataset.
                        You can revisit it, but
                        focus on a dataset that you
                        haven&rsquo;t examined.
                    </p>
                }
                {/* Takeaways Component */}
                <SimulationTwoTakeaway
                    activeQuestions={activeQuestions}
                    isComplete={isComplete}
                    checkComplete={checkComplete}
                    handleContinue={handleContinue}
                    handleStartOver={handleStartOver}
                    submissionId={submissionId}
                    coursePk={coursePk}
                    setIsComplete={setIsComplete}
                    createSubmission={createSubmission}
                    nextStep={nextStep}
                    setNextStep={setNextStep}
                />
            </>
        });
    }

    const graphContent = (
        <>
            <ScatterPlot2
                {...{ controls, data, labelIndex }}
                param={dataRange[choice]}
                index={dataIndex[choice]}
            />
            {choice && <div className="container text-center">
                <p className="mx-auto px-5"
                    data-cy="attribution-text">{info[choice]}</p>
            </div>}
        </>
    );

    return (
        <SimulationPanel
            steps={steps}
            graphContent={graphContent}
            modals={[<OVBTheoryModal key="modal1" />]}
        />
    );
};
