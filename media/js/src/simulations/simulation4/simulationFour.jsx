import React, { useState, useEffect, useRef } from 'react';
import { SimulationPanel } from '../../SimulationPanel';
import { STATIC_URL, createSubmission, getCoursePk } from '../../utils/utils';
import { PolynomialGraph } from './polynomialGraph';
import { WhatAreNonLinearRegressions } from './whatAreNonlinearRegs';
import { NonlinearRegsDefinition } from './nonlinearRegModal';
import { StepProgressButton } from '../../StepProgressButton';
import { PolynomialTakeaway } from './polynomialTakeaway';

const coursePk = getCoursePk();

export const SimulationFour = () => {

    const [stage, setStage] = useState(0);
    const [submissionId, setSubmissionId] = useState(null);
    const [showRegLine, setshowRegLine] = useState(
        [false, false, false, false]);
    const [showDatasets, setshowDatasets] = useState(
        [true, false, false, false]);
    // Each index tracks the state for a different module
    // ['Polynomials', 'Logarithms', 'Interactions']
    const [progress, setProgress] = useState([0,0,0]);
    const [mysteryRegLine, setMysteryRegLine] = useState([]);


    const initialized = useRef(false);
    const handleStage = (e) => setStage(parseInt(e.target.value));

    const mkModuleBtns = () => ['Polynomials', 'Logarithms', 'Interactions']
        .map((label, index) => (
            <button onClick={handleStage} key={index}
                value={index} className={'btn btn-primary m-1'}
                disabled={stage===index}>
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
        subtitle: 'Simulation 4',
        title: 'Non-linear Regressions',
        content: <>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
            Mollitia doloremque iure explicabo quis asperiores
            natus. Inventore laborum tempore, molestias expedita
            nemo nostrum dicta vel eum autem laboriosam ad ipsa
            modi!
            </p>
            {mkModuleBtns()}
        </>
    };

    const polynomialSteps = [
        preambleStep,
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjective',
            title: 'Learning objectives: Polynomials',
            content: <>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    Mollitia doloremque iure explicabo quis asperiores
                    natus. Inventore laborum tempore, molestias expedita
                    nemo nostrum dicta vel eum autem laboriosam ad ipsa
                    modi!
                </p>
                {mkProgressBar()}
            </>
        },
        {
            headerId: 'whatarenonlinearregression',
            title: 'What are non-linear regressions?',
            content:
            <>
                {progress[stage] < 1 && (
                    <WhatAreNonLinearRegressions
                        setshowDatasets={setshowDatasets}
                        setshowRegLine={setshowRegLine}
                        showDatasets={showDatasets}
                        showRegLine={showRegLine}
                        setMysteryRegLine={setMysteryRegLine}
                        mysteryRegLine={mysteryRegLine}
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
        ...(progress[stage] > 1
            ? [{
                headerId: 'takeAway1',
                title: 'Takeaway questions',
                content: (
                    <PolynomialTakeaway
                        submissionId={submissionId}
                        setStage={setStage}
                        coursePk={coursePk}
                        stage={stage}
                        setProgress={setProgress}
                        progress={progress}
                    />
                )
            }]
            : [])
    ];

    const logarithmSteps = [
        preambleStep,
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjectiveLogs',
            title: 'Learning objectives: Logarithms',
            content: <>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    Mollitia doloremque iure explicabo quis asperiores
                    natus. Inventore laborum tempore, molestias expedita
                    nemo nostrum dicta vel eum autem laboriosam ad ipsa
                    modi!
                </p>
                {mkProgressBar()}
            </>
        },
    ];

    const interactionSteps = [
        preambleStep,
        {
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjectiveInteractions',
            title: 'Learning objectives: Interactions',
            content: <>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    Mollitia doloremque iure explicabo quis asperiores
                    natus. Inventore laborum tempore, molestias expedita
                    nemo nostrum dicta vel eum autem laboriosam ad ipsa
                    modi!
                </p>
                {mkProgressBar()}
            </>
        },
    ];

    useEffect(() => {
        const initializeSubmission = async() => {
            if (!initialized.current && submissionId === null) {
                initialized.current = true;
                const subId = await createSubmission(coursePk);
                setSubmissionId(subId);
            }
        };
        initializeSubmission();
    }, []);

    return (
        <>
            {stage === 0 && (
                <SimulationPanel steps={polynomialSteps}
                    graphContent={<PolynomialGraph
                        showRegLine={showRegLine}
                        showDatasets={showDatasets}
                        mysteryRegLine={mysteryRegLine} />}
                    modals={[<NonlinearRegsDefinition key="modal1" />]}
                />
            )}
            {stage === 1 && (
                <SimulationPanel steps={logarithmSteps}
                    graphContent={<PolynomialGraph />}
                    modals={[]}
                />
            )}
            {stage === 2 && (
                <SimulationPanel steps={interactionSteps}
                    graphContent={<PolynomialGraph />}
                    modals={[]}
                />
            )}
        </>
    );
};
