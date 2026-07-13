import React, { useState, useEffect, useRef } from 'react';
import { SimulationPanel } from '../../SimulationPanel';
import { STATIC_URL, createSubmission, getCoursePk } from '../../utils/utils';
import { StepProgressButton } from '../../StepProgressButton';
import { WhatIsD1xD2 } from './whatIsD1xD2';
import { InteractionsD1D2Modal } from './interactionD1D2modal';
import { NoInteractionTable, WithInteractionTable } from './d1xd2Tables';
import { InteractionGraph } from './interactionGraph';
import { RealDataD1D2 } from './realDataD1D2';

// const coursePk = getCoursePk();

export const SimulationFive = () => {
    const [stage, setStage] = useState(0);
    const [submissionId, setSubmissionId] = useState(null);
    const [progress, setProgress] = useState([0, 0, 0]); // Three modules
    const [checkedModels, setCheckedModels] = useState({
        noInteraction: true,
        withInteraction: false,
        effectsDiD: false,
    });
    const [realDataSelected, setRealDataSelected] = useState(null);
    const [realDataModels, setRealDataModels] = useState({
        noInteraction: true,
        withInteraction: false,
    });
    const initialized = useRef(false);
    const noModelSelected = !checkedModels.noInteraction
        && !checkedModels.withInteraction
        && !checkedModels.effectsDiD;

    const handleStage = (e) => setStage(parseInt(e.target.value));

    const mkModuleBtns = () => ['D1 × D2', 'D × X', 'X1 × X2']
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
            {/* <p>
                This simulation focuses on Interaction Variables in regression
                models. Interactions allow us to see how the effect of one
                independent variable on the dependent variable changes
                depending on the value of another independent variable.
            </p> */}
            It can be useful to have interaction terms (multiplication of 2
            variables) in the regression. There are 3 kinds of intereactions:
            <ul>
                <li>Interaction between 2 dummies (D1xD2).</li>
                <li>Interaction between a dummy and a continuous variable (DxX).
                </li>
                <li>Interactions between 2 continuous variables (X1xX2).</li>
            </ul>
            {mkModuleBtns()}
        </>
    };

    const d1xd2Steps = [
        preambleStep,
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjectiveD1XD2',
            title: 'Learning objectives: D1 × D2 interactions',
            content: <>
                <p>
                After completing this section you will understand differences
                    in differences estimator and evaluate the mean difference in
                    the dependent variable for 4 groups rather than 2 at a time.
                </p>
                {mkProgressBar()}
            </>
        },
        {
            headerId: 'learnInteractions',
            title: 'What are D1 × D2 interactions?',
            content: <>
                {progress[stage] < 1 && (
                    <WhatIsD1xD2
                        checkedModels={checkedModels}
                        setCheckedModels={setCheckedModels}
                    />
                )}
                <StepProgressButton
                    progress={progress}
                    stage={stage}
                    setProgress={setProgress}
                    continueLabel="Continue to Real dataset »"
                    reviewLabel="Review »"
                    progressNumber={1}
                />
            </>
        },
        ...(progress[stage] > 0
            ? [{
                headerId: 'applyInteractions',
                title: 'Real dataset problem',
                content: <>
                    {progress[stage] === 1 && (
                        <RealDataD1D2
                            selected={realDataSelected}
                            setSelected={setRealDataSelected}
                            checkedModels={realDataModels}
                            setCheckedModels={setRealDataModels}
                        />
                    )}
                    <StepProgressButton
                        progress={progress}
                        stage={stage}
                        setProgress={setProgress}
                        continueLabel="Continue »"
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

    const dXxSteps = [
        preambleStep,
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjectiveDxX',
            title: 'Learning objectives: D × X interactions',
            content: <>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </p>
                {mkProgressBar()}
            </>
        },
        {
            headerId: 'learnDxX',
            title: 'What are D × X interactions?',
            content: <>
                {progress[stage] < 1 && (
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                )}
                <StepProgressButton
                    progress={progress}
                    stage={stage}
                    setProgress={setProgress}
                    continueLabel="Continue to Real dataset »"
                    reviewLabel="Review »"
                    progressNumber={1}
                />
            </>
        },
        ...(progress[stage] > 0
            ? [{
                headerId: 'applyDxX',
                title: 'Real dataset problem',
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
                        continueLabel="Continue »"
                        reviewLabel="Review »"
                        progressNumber={2}
                    />
                </>
            }]
            : []),
        ...(progress[stage] > 1
            ? [{
                headerId: 'assessDxX',
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

    const x1xx2Steps = [
        preambleStep,
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjectiveX1xX2',
            title: 'Learning objectives: X1 × X2 interactions',
            content: <>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </p>
                {mkProgressBar()}
            </>
        },
        {
            headerId: 'learnX1xX2',
            title: 'What are X1 × X2 interactions?',
            content: <>
                {progress[stage] < 1 && (
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                    </p>
                )}
                <StepProgressButton
                    progress={progress}
                    stage={stage}
                    setProgress={setProgress}
                    continueLabel="Continue to Real dataset »"
                    reviewLabel="Review »"
                    progressNumber={1}
                />
            </>
        },
        ...(progress[stage] > 0
            ? [{
                headerId: 'applyX1xX2',
                title: 'Real dataset problem',
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
                        continueLabel="Continue »"
                        reviewLabel="Review »"
                        progressNumber={2}
                    />
                </>
            }]
            : []),
        ...(progress[stage] > 1
            ? [{
                headerId: 'assessX1xX2',
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
                <SimulationPanel steps={d1xd2Steps}
                    graphContent={
                        <div className="p-4" style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {progress[stage] >= 1 ? (
                                realDataSelected === 0 ? (
                                    <InteractionGraph
                                        dataset="blackSouth"
                                        models={realDataModels}
                                    />
                                ) : realDataSelected === 1 ? (
                                    <InteractionGraph
                                        dataset="quizScore"
                                        models={realDataModels}
                                    />
                                ) : (
                                    <div style={{
                                        alignItems: 'center',
                                        color: '#555',
                                        display: 'flex',
                                        fontSize: '1.2rem',
                                        height: '100%',
                                        justifyContent: 'center',
                                    }}>
                                        Choose a dataset to begin
                                    </div>
                                )
                            ) : checkedModels.effectsDiD ? (
                                <InteractionGraph
                                    dataset="did"
                                    models={{ withInteraction: true }}
                                />
                            ) : noModelSelected ? (
                                <div style={{
                                    alignItems: 'center',
                                    color: '#555',
                                    display: 'flex',
                                    fontSize: '1.2rem',
                                    height: '100%',
                                    justifyContent: 'center',
                                }}>
                                    Pick A Dataset
                                </div>
                            ) : (
                                <>
                                    {checkedModels.noInteraction && (
                                        <NoInteractionTable />
                                    )}
                                    {checkedModels.withInteraction && (
                                        <WithInteractionTable />
                                    )}
                                </>
                            )}
                        </div>
                    }
                    modals={[<InteractionsD1D2Modal key="d1d2-modal" />]}
                />
            )}
            {stage === 1 && (
                <SimulationPanel steps={dXxSteps}
                    graphContent={<div className="p-4">Interactive Graph</div>}
                    modals={[]}
                />
            )}
            {stage === 2 && (
                <SimulationPanel steps={x1xx2Steps}
                    graphContent={<div className="p-4">Interactive Graph</div>}
                    modals={[]}
                />
            )}
        </>
    );
};
