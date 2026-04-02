import React, { useState, useEffect, useRef } from 'react';
import { SimulationPanel } from '../../SimulationPanel';
import { STATIC_URL, createSubmission, getCoursePk } from '../../utils/utils';
import { PolynomialGraph } from './polynomialGraph';
import { WhatArePolynomialRegressions } from './whatArePolynomialRegs';
import { NonlinearRegsDefinition } from './nonlinearRegModal';
import { LogarithmDefinition } from './logarithmRegressionsDef';
import { WhatAreLogarithmRegs } from './whatAreLogarithms';
import { LogarithmGraph } from './logarithmGraph';
import { RealDataPolynomials } from './realDataPolynomials';
import { RealDataLogarithm } from './realDataLogarithm';
import { StepProgressButton } from '../../StepProgressButton';
import { PolynomialTakeaway } from './polynomialTakeaway';
import { CLEARREG, showOne } from './polyUtils';

const coursePk = getCoursePk();

export const SimulationFour = () => {

    const [stage, setStage] = useState(0);
    const [submissionId, setSubmissionId] = useState(null);
    const [showRegLine, setShowRegLine] = useState(CLEARREG);
    const [showPolyDatasets, setShowPolyDatasets] = useState(showOne(0));
    // Each index tracks the state for a different module
    // ['Polynomials', 'Logarithms']
    const [progress, setProgress] = useState([0, 0]);
    const [compareRegLine, setCompareRegLine] = useState([]);
    const [logCompareRegLine, setLogCompareRegLine] = useState([]);
    const [isCorrect, setIsCorrect] = useState([false]);
    const [selectedModel, setSelectedModel] = useState('');
    const [showLogDatasets, setShowLogDatasets] = useState(
        [false, false, false, false, false, false]);
    const [highlightedFit, setHighlightedFit] = useState('');

    const quizComplete = () => !isCorrect.includes(false);

    const initialized = useRef(false);
    const handleStage = (e) => setStage(parseInt(e.target.value));

    useEffect(() => {
        // Reset selected elements and graphs when switching segments or stages
        setSelectedModel('');
        setHighlightedFit('');
        setCompareRegLine([]);
        setLogCompareRegLine([]);
        setShowLogDatasets([false, false, false, false, false, false]);
        setShowPolyDatasets(showOne(0));
        setShowRegLine(CLEARREG);
    }, [stage, progress[0], progress[1]]);

    const mkModuleBtns = () => ['Polynomials', 'Logarithms']
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
        subtitle: 'Simulation 4',
        title: 'Non-linear Regressions',
        content: <>
            <p>
            In real-world data, not all relationships between variables are
            linear. This simulation explores three common types of non-linear
            regressions used to capture complex patterns: Polynomials,
            Logarithms, and Regressions with Interaction Variables.
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
                    In this section, you&rsquo;ll study quadratic and cubic
                    specifications and explore how these regressions can better
                    capture relationships in data compared to a linear fit. By
                    examining data plots and curve shapes, you&rsquo;ll compare
                    linear, quadratic, and cubic regressions, and work through
                    the steps to find the best-fitting model.
                </p>
                {mkProgressBar()}
            </>
        },
        {
            headerId: 'whatarepolynomialregression',
            title: 'What are Polynomial regressions?',
            content: <>
                {progress[stage] < 1 && (
                    <WhatArePolynomialRegressions
                        setShowDatasets={setShowPolyDatasets}
                        setShowRegLine={setShowRegLine}
                        showDatasets={showPolyDatasets}
                        showRegLine={showRegLine}
                        setCompareRegLine={setCompareRegLine}
                        compareRegLine={compareRegLine} />
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
                headerId: 'realData',
                title: 'Real dataset problem',
                content: <>
                    {progress[stage] === 1 && (
                        <RealDataPolynomials
                            isCorrect={isCorrect}
                            setIsCorrect={setIsCorrect}
                            setShowDatasets={setShowPolyDatasets}
                            setShowRegLine={setShowRegLine}
                            showDatasets={showPolyDatasets}
                            showRegLine={showRegLine}
                            setCompareRegLine={setCompareRegLine}
                            submissionId={submissionId}
                            compareRegLine={compareRegLine} />
                    )}
                    {quizComplete() && <StepProgressButton
                        progress={progress}
                        stage={stage}
                        setProgress={setProgress}
                        continueLabel="Continue »"
                        reviewLabel="Review »"
                        progressNumber={2}
                    />}
                </>
            }]
            : []),
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
                    This exercise teaches you to compare linear and
                    log-transformed regression models. You&rsquo;ll learn to
                    recognize when log transformations improve model fit,
                    interpret coefficients across model types, evaluate model
                    fit using both visual diagnostics and statistical criteria,
                    and build intuition for selecting the functional form that
                    best represents the underlying relationship in the data.
                </p>
                {mkProgressBar()}
            </>
        },
        {
            headerId: 'whatarelogarithms',
            title: 'What are Logarithm regression models?',
            content: <>
                {progress[stage] < 1 && (
                    <WhatAreLogarithmRegs
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel}
                        setHighlightedFit={setHighlightedFit}
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
                headerId: 'realDataLogarithms',
                title: 'Real dataset problem',
                content: <>
                    {progress[stage] === 1 && (
                        <RealDataLogarithm
                            setShowDatasets={setShowLogDatasets}
                            showDatasets={showLogDatasets}
                            setCompareRegLine={setLogCompareRegLine}
                            compareRegLine={logCompareRegLine}
                            setHighlightedFit={setHighlightedFit}
                            submissionId={submissionId}
                        />
                    )}
                    {/* <StepProgressButton
                        progress={progress}
                        stage={stage}
                        setProgress={setProgress}
                        continueLabel="Continue »"
                        reviewLabel="Review »"
                        progressNumber={2}
                    /> */}
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
                        currentCoursePk, null, 4);
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
                <SimulationPanel steps={polynomialSteps}
                    graphContent={<PolynomialGraph
                        showRegLine={showRegLine}
                        showDatasets={showPolyDatasets}
                        compareRegLine={compareRegLine} />}
                    modals={[<NonlinearRegsDefinition key="modal1" />]}
                />
            )}
            {stage === 1 && (
                <SimulationPanel steps={logarithmSteps}
                    graphContent={<LogarithmGraph
                        selectedModel={selectedModel}
                        highlightedFit={highlightedFit}
                        showDatasets={showLogDatasets}
                        compareRegLine={logCompareRegLine}
                    />}
                    modals={[<LogarithmDefinition key="modal2" />]}
                />
            )}
        </>
    );
};
