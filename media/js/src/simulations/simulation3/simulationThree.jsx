import React, { useState } from 'react';
import { SkedasticityScatterPlot } from './skedasticityPlot';
import { MulticollinearityScatterPlot } from './multicollinearityPlot';
import { SimulationPanel } from '../../SimulationPanel';
import { WhatIsHeteroskedasticity } from './whatIsHeteroskedasticity';
import { SkedasticityReal } from './skedasticityReal';
import { STATIC_URL } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import { WhatIsMulticollinearity } from './whatIsMulticollinearity';


export const SimulationThree = () => {
    const [stage, setStage] = useState(0);
    const [heteroskedasticity, setHeteroskedasticity] = useState(0);
    const [standardError, setStandardError] = useState(null);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [robustStandardError, setRobustStandardError] = useState(null);
    const [useRealDataSked, setUseRealDataSked] = useState(false);
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [controls, setControls] = useState([false, false]);
    const [gotToTakeAway, setGoToTakeAway] = useState(false);

    const handleControls = (e) => {
        const update = [...controls];
        update[e.target.value] = e.target.checked;
        setControls(update);
    };

    const handleStage = (e) => setStage(parseInt(e.target.value));

    const heteroSkadasticSteps = [
        {
            // Simulation preamble
            stepNumber: '•',
            segment: 'preamble',
            subtitle: 'Simulation 3',
            title: 'Standard Errors Problems: ' +
                'Heteroskedasticity and Multicollinearity',
            content: (
                <>
                    <p>
                This text provides a brief overview of the simulation and
                its purpose.
                    </p>
                    <p>
                Approximately <b>60 to 70 words</b> is sufficient.
                        <i>Formatting</i> is allowed, as well as KaTeX elements
                    </p>
                    {['Heteroskedasticity', 'Multicollinearity'].map(
                        (label, index) => (
                            <button onClick={handleStage} key={index}
                                value={index} className={'btn btn-primary m-1'}
                                disabled={stage===index}>
                                {label}
                            </button>))}
                </>
            )
        },
        {
            // Learning goals
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjective',
            title: 'Learning objectives: Heteroskedasticity',
            content: (
                <>
                    <p>
                        In this section, you&rsquo;ll learn to identify and
                        address heteroskedasticity by analyzing datasets and
                        its impact on standard
                        errors, <Katex tex={'{SE(\\hat{\\beta_1})}'}
                            className="katex-inline" />,
                        and hypothesis testing. You&rsquo;ll compare the
                        outcomes of robust and
                        non-robust <Katex tex={'{SE(\\hat{\\beta_1})}'}
                            className="katex-inline" /> and
                        see how failing to account for heteroskedasticity can
                        lead to incorrect conclusions and affect hypothesis
                        test results.
                    </p>

                    <div className="sim-progress">
                        <h4>Your progress:</h4>
                        <ul>
                            {['Learn', 'Apply', 'Assess'].map((word, i) =>
                                <li key={i} className={
                                    `${i > progress1 ?
                                        'incomplete' : 'completed'}`}
                                >{word}</li>
                            )}
                        </ul>
                    </div>
                </>
            )
        },
        {
            headerId: 'whatisHeteroskedasticity',
            title: 'What is Heteroskedasticity?',
            content: (
                <WhatIsHeteroskedasticity
                    heteroskedasticity={heteroskedasticity}
                    setHeteroskedasticity={setHeteroskedasticity}
                    slope={slope}
                    intercept={intercept}
                    standardError={standardError}
                    robustStandardError={robustStandardError}
                    useRealDataSked={useRealDataSked}
                    setUseRealDataSked={setUseRealDataSked}
                    setProgress={setProgress1}
                />
            )
        },
        ...(useRealDataSked
            ? [
                {
                    headerId: 'realDataSet',
                    title: 'Real dataset problem',
                    content: (
                        <SkedasticityReal
                            slope={slope}
                            intercept={intercept}
                            standardError={standardError}
                            robustStandardError={robustStandardError}
                            useRealDataSked={useRealDataSked}
                            setUseRealDataSked={setUseRealDataSked}
                            setGoToTakeAway={setGoToTakeAway}
                            goToTakeaway={gotToTakeAway}
                        />
                    )
                }
            ]
            : [])
    ];

    const multicollinearitySteps = [
        {
            // Simulation preamble
            stepNumber: '•',
            segment: 'preamble',
            subtitle: 'Simulation 3',
            title: 'Standard Errors Problems: ' +
                'Heteroskedasticity and Multicollinearity',
            content: (
                <>
                    <p>
                This text provides a brief overview of the simulation and
                its purpose.
                    </p>
                    <p>
                Approximately <b>60 to 70 words</b> is sufficient.
                        <i>Formatting</i> is allowed, as well as KaTeX elements
                    </p>
                    {['Heteroskedasticity', 'Multicollinearity'].map(
                        (label, index) => (
                            <button onClick={handleStage} key={index}
                                value={index} className={'btn btn-primary m-1'}
                                disabled={stage===index}>
                                {label}
                            </button>))}
                </>
            )
        },
        {
            // Learning goals
            icon: `${STATIC_URL}/img/icon-goal.svg`,
            headerId: 'learningObjective',
            title: 'Learning objectives: Multicollinearity',
            content: (
                <>
                    <p>
                        Here, you&rsquo;ll learn to detect and address
                        multicollinearity by analyzing multivariable datasets
                        and its impact on standard
                        errors, <Katex tex={'{SE(\\hat{\\beta_1})}'}
                            className="katex-inline" />. You&rsquo;ll observe
                        how these <Katex tex={'{SE(\\hat{\\beta_1})}'}
                            className="katex-inline" /> variations affect
                        hypothesis testing, and then practice using joint
                        hypothesis testing to correct for multicollinearity,
                        and determine whether population slopes differ
                        from the null hypothesis.
                    </p>

                    <div className="sim-progress">
                        <h4>Your progress:</h4>
                        <ul>
                            {['Learn', 'Apply', 'Assess'].map((word, i) =>
                                <li key={i} className={
                                    `${i > progress2 ?
                                        'incomplete' : 'completed'}`}
                                >{word}</li>
                            )}
                        </ul>
                    </div>
                </>
            )
        },
        {
            // Simulation steps
            headerId: 'whatIsMulticollinearity',
            title: 'What is Multicollinearity?',
            content: (
                <>
                    <WhatIsMulticollinearity
                        controls={controls}
                        handleControls={handleControls}
                        setProgress={setProgress2} />
                </>
            )
        }
    ];

    return (
        <>
            {stage === 0 && (
                <SimulationPanel steps={heteroSkadasticSteps}
                    graphContent={
                        <SkedasticityScatterPlot
                            heteroskedasticity={heteroskedasticity}
                            setSlope={setSlope}
                            setIntercept={setIntercept}
                            setStandardError={setStandardError}
                            setRobustStandardError={setRobustStandardError}
                            useRealData={useRealDataSked}
                        />
                    }
                />
            )}
            {stage === 1 && (
                <SimulationPanel steps={multicollinearitySteps}
                    graphContent={<MulticollinearityScatterPlot
                        controls={controls} />}
                />
            )}
        </>
    );
};
