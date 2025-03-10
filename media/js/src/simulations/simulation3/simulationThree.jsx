import React, { useState } from 'react';
import { SkedasticityScatterPlot } from './skedasticityPlot';
import { MulticollinearityScatterPlot } from './multicollinearityPlot';
import DATA from './multicollinearityData.json';
import { Katex } from '../../utils/katexComponent';
import { SimulationPanel } from '../../SimulationPanel';
import { SkedasticityLearning } from './skedasticityLearning';

const STATIC_URL = window.MetricsMentor.staticUrl;

export const SimulationThree = () => {
    const [stage, setStage] = useState(0);
    const [heteroskedasticity, setHeteroskedasticity] = useState(0);
    const [standardError, setStandardError] = useState(null);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [robustStandardError, setRobustStandardError] = useState(null);

    const handleStage = (e) => setStage(parseInt(e.target.value));

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
            headerId: 'learningGoal',
            title: 'Learning goals',
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
            headerId: 'What is Heteroskedasticity?',
            title: 'What is Heteroskedasticity?',
            content: (
                <SkedasticityLearning
                    heteroskedasticity={heteroskedasticity}
                    setHeteroskedasticity={setHeteroskedasticity}
                    slope={slope}
                    intercept={intercept}
                    standardError={standardError}
                    robustStandardError={robustStandardError}
                />
            )
        }
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
            headerId: 'learningGoal',
            title: 'Learning goals',
            content: (
                <>
                    <p>
                This section outlines the learning expectations for the
                simulation. It should be clear, concise, and list the goals
                that students should achieve.
                    </p>
                    <p>
                Approximately <b>60 to 70 words</b> is sufficient.
                        <i>Formatting</i> is allowed, along with KaTeX elements
                    </p>
                </>
            )
        },
        {
            // Simulation steps
            headerId: 'Learning Piece',
            title: 'Learning Piece',
            content: (
                <>
                    <ul>
                        {[
                            `corr(y, x_1) = ${DATA.x1.rvalue}`,
                            `corr(x_1, x_2) = ${DATA.x2.corr_x1}`,
                            `SE(\\hat \\beta_1) HTS-robust =  
                                    ${DATA.x2.stderr}`,
                            `corr(x_1, x_3) =  ${DATA.x3.corr_x1}`,
                            `SE(\\hat \\beta_1) HTS-robust = 
                                    ${DATA.x3.stderr}`
                        ].map((fx,idx) => (
                            <li key={idx}><Katex tex={fx} /></li>
                        ))}
                    </ul>
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
                        />
                    }
                />
            )}
            {stage === 1 && (
                <SimulationPanel steps={multicollinearitySteps}
                    graphContent={
                        <MulticollinearityScatterPlot data={DATA} />}
                />
            )}
        </>
    );
};
