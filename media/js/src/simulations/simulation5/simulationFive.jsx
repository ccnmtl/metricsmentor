import React, { useState, useEffect, useRef } from 'react';
import { SimulationPanel } from '../../SimulationPanel';
import { STATIC_URL, createSubmission, getCoursePk } from '../../utils/utils';
import { StepProgressButton } from '../../StepProgressButton';

// const coursePk = getCoursePk();

export const SimulationFive = () => {
    const [stage, setStage] = useState(0);
    const [submissionId, setSubmissionId] = useState(null);
    const [progress, setProgress] = useState([0]); // One module: Interactions
    const initialized = useRef(false);

    const handleStage = (e) => setStage(parseInt(e.target.value));

    const mkModuleBtns = () => ['Interactions']
        .map((label, index) => (
            <button onClick={handleStage} key={index}
                value={index} className={'btn btn-primary m-1'}
                disabled={stage === index}>
                {label}
            </button>));

    const mkProgressBar = () => <div className="sim-progress">
        <h4>Your progress:</h4>
        <ul>
            {['Learn', 'Apply', 'Assess'].map((word, i) =>
                <li key={i} className={
                    `${i > progress[stage] ?
                        'incomplete' : 'completed'}`}
                >{word}</li>
            )}
        </ul>
    </div>;

    const preambleStep = {
        stepNumber: '•',
        segment: 'preamble',
        subtitle: 'Simulation 5',
        title: 'Interactions',
        content: <>
            <p>
                This simulation focuses on Interaction Variables in regression
                models. Interactions allow us to see how the effect of one
                independent variable on the dependent variable changes
                depending on the value of another independent variable.
            </p>
            {mkModuleBtns()}
        </>
    };

    const interactionSteps = [
        preambleStep,
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjectiveInteractions',
            title: 'Learning objectives: Interactions',
            content: <>
                <p>
                    In this simulation, you will learn how to interpret
                    interaction terms, understand their statistical
                    significance, and see how they can improve model fit when
                    relationships between variables are conditional.
                </p>
                {mkProgressBar()}
            </>
        },
        {
            headerId: 'learnInteractions',
            title: 'Part 1: Learning about Interactions',
            content: <>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam scelerisque, nisi at porta varius, enim sem
                    venenatis tortor, vel efficitur nisi nunc ac nisi.
                </p>
                <StepProgressButton
                    progress={progress}
                    stage={stage}
                    setProgress={setProgress}
                    continueLabel="Continue to Apply »"
                    reviewLabel="Review »"
                    progressNumber={1}
                />
            </>
        },
        ...(progress[stage] > 0
            ? [{
                headerId: 'applyInteractions',
                title: 'Part 2: Applying Interactions',
                content: <>
                    <p>
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Vestibulum tortor
                        quam, feugiat vitae, ultricies eget, tempor sit amet,
                        ante.
                    </p>
                    <StepProgressButton
                        progress={progress}
                        stage={stage}
                        setProgress={setProgress}
                        continueLabel="Continue to Assess »"
                        reviewLabel="Review »"
                        progressNumber={2}
                    />
                </>
            }]
            : []),
        ...(progress[stage] > 1
            ? [{
                headerId: 'assessInteractions',
                title: 'Part 3: Assessing Interactions',
                content: <>
                    <p>
                        Donec eu libero sit amet quam egestas semper. Aenean
                        ultricies mi vitae est. Mauris placerat eleifend leo.
                    </p>
                    <p>
                        Simulation complete! You have learned the basics of
                        Interactions.
                    </p>
                </>
            }]
            : [])
    ];

    useEffect(() => {
        const initializeSubmission = async() => {
            if (!initialized.current && submissionId === null) {
                const currentCoursePk = getCoursePk();
                initialized.current = true;
                try {
                    const subId = await createSubmission(
                        currentCoursePk, null, 5);
                    setSubmissionId(subId);
                } catch (error) {
                    initialized.current = false;
                    console.error('Failed to initialize simulation:', error);
                }
            }
        };
        initializeSubmission();
    }, []);

    return (
        <>
            {stage === 0 && (
                <SimulationPanel steps={interactionSteps}
                    graphContent={<div className="p-4">Interactive Graph</div>}
                    modals={[]}
                />
            )}
        </>
    );
};
