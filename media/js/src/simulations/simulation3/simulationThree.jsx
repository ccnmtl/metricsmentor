import React, { useEffect, useState } from 'react';
import { SkedasticityScatterPlot } from './skedasticityPlot';
import { MulticollinearityScatterPlot } from './multicollinearityPlot';
import { SimulationPanel } from '../../SimulationPanel';
import { SkedasticityLearning } from './skedasticityLearning';
import { SkedasticityReal } from './skedasticityReal';
import { STATIC_URL } from '../../utils/utils';
import { WhatIsMulticollinearity } from './whatIsMulticollinearity';
import { MulticollinearityApply } from './multicollinearityApply';
import MULTIGENDATA from './multicollinearityGeneratedData.json';
import MULTIREALDATA from './multicollinearityRealData.json';


export const SimulationThree = () => {
    const [stage, setStage] = useState(0);
    const [heteroskedasticity, setHeteroskedasticity] = useState(0);
    const [standardError, setStandardError] = useState(null);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [robustStandardError, setRobustStandardError] = useState(null);
    const [useRealDataSked, setUseRealDataSked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [controls, setControls] = useState([false, false]);
    const [controls2, setControls2] = useState([false, false]);
    const [multiData, setMultiData] = useState(MULTIGENDATA);

    const handleControls = (e) => {
        const update = [...controls];
        update[e.target.value] = e.target.checked;
        setControls(update);
    };

    const handleControls2 = (e) => {
        const update = [...controls2];
        update[e.target.value] = e.target.checked;
        setControls2(update);
    };

    const handleStage = (e) => setStage(parseInt(e.target.value));
    const handleProgress = (val) => setProgress(val);

    useEffect(() => {
        if (progress > 0) {
            setMultiData(MULTIREALDATA);
        } else {
            setMultiData(MULTIGENDATA);
        }
    }, [progress]);

    const heteroSkadasticSteps = [
        {
            // Simulation preamble
            stepNumber: '•',
            subtitle: 'Simulation 3',
            title: 'Hetereoskedasticity',
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
                    {['Skedasticity', 'Multicollinearity'].map(
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
            title: 'Learning objectives',
            content: (
                <>
                    <p>
                This section outlines the learning expectations for the
                simulation. It should be clear, concise, and list the goals
                that students should achieve.
                    </p>
                    <p>
                Approximately <b>60 to 70 words</b> is sufficient.
                        <i>Formatting</i> is allowed, along with KaTeX elements.
                    </p>
                </>
            )
        },
        {
            headerId: 'whatisHeteroskedasticity',
            title: 'What is Heteroskedasticity?',
            content: (
                <SkedasticityLearning
                    heteroskedasticity={heteroskedasticity}
                    setHeteroskedasticity={setHeteroskedasticity}
                    slope={slope}
                    intercept={intercept}
                    standardError={standardError}
                    robustStandardError={robustStandardError}
                    useRealDataSked={useRealDataSked}
                    setUseRealDataSked={setUseRealDataSked}
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
            subtitle: 'Simulation 3',
            title: 'Multicollinearity',
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
                    {['Skedasticity', 'Multicollinearity'].map(
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
            title: 'Learning Objectives',
            content: (
                <>
                    <h3>Multicollinearity</h3>
                    <p>
                        This space is setting up students learning expectations
                        for <strong>Multicollinearity</strong> section. This
                        should outline what student should be taking away from
                        this, and just other general functional instructions.
                    </p>
                    <label htmlFor='progress'>
                        <strong>Your progress:</strong></label>
                    <div id='progress' className='row text-light mx-1'>
                        {['Learn', 'Apply', 'Assess'].map((word, i) =>
                            <div key={i} className={
                                `col-4 border border-light ${i > progress ?
                                    'bg-secondary' : 'bg-primary'}`}
                            >{word}</div>
                        )}
                    </div>
                </>
            )
        },
        {
            headerId: 'whatIsMulticollinearity',
            title: 'What is Multicollinearity?',
            content: (
                <>
                    <WhatIsMulticollinearity
                        controls={controls}
                        handleControls={handleControls}
                        handleProgress={handleProgress} />
                </>
            )
        }
    ];

    if (progress > 0) {
        multicollinearitySteps.push({
            headerId: 'multicollinearityRealData',
            title: 'Real dataset problem',
            content: (
                <>
                    <MulticollinearityApply
                        controls={controls2}
                        handleControls={handleControls2}
                        handleProgress={handleProgress} />
                </>
            )
        })
    }

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
                        controls={controls}
                        data={multiData} />}
                />
            )}
        </>
    );
};
