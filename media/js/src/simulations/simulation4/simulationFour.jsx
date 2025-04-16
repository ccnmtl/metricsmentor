import React, { useState} from 'react';
import { SimulationPanel } from '../../SimulationPanel';
import { STATIC_URL } from '../../utils/utils';
import { ScatterPlot } from './polynomialGraph';
import { WhatAreNonLinearRegressions } from './whatAreNonlinearRegs';
import { NonlinearRegsDefinition } from './nonlinearRegModal';

export const SimulationFour = () => {
    const [stage, setStage] = useState(0);

    const handleStage = (e) => setStage(parseInt(e.target.value));

    // const [showRegLine, setshowRegLine] = useState(
    //     [true, false, false, false]);
    // const [showDatasets, setshowDatasets] = useState(
    //     [true, false, false, false]);
    // const [dataset, setDataset] = useState(polynomial);

    const polynomialSteps = [
        {
            // Simulation preamble
            stepNumber: '•',
            segment: 'preamble',
            subtitle: 'Simulation 4',
            title: 'Non-linear Regressions',
            content: (
                <>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    Mollitia doloremque iure explicabo quis asperiores
                    natus. Inventore laborum tempore, molestias expedita
                    nemo nostrum dicta vel eum autem laboriosam ad ipsa
                    modi!
                    </p>
                    {['Polynomials', 'Logarithms', 'Interactions'].map(
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
            title: 'Learning objectives: Polynomials',
            content: (
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    Mollitia doloremque iure explicabo quis asperiores
                    natus. Inventore laborum tempore, molestias expedita
                    nemo nostrum dicta vel eum autem laboriosam ad ipsa
                    modi!
                </p>
            )
        },
        {
            headerId: 'whatarenonlinearregression',
            title: 'What are non-linear regressions?',
            content:
               <WhatAreNonLinearRegressions />,
        },
    ];


    return (
        <>
            {stage === 0 && (
                <SimulationPanel steps={polynomialSteps}
                    graphContent={<ScatterPlot />}
                    modals={[<NonlinearRegsDefinition key="modal1" />]}
                />
            )}
            {stage === 1 && (
                <SimulationPanel steps={polynomialSteps}
                    graphContent={<ScatterPlot />}
                    modals={[]}
                />
            )}
            {stage === 2 && (
                <SimulationPanel steps={polynomialSteps}
                    graphContent={<ScatterPlot
                        // showRegLine={showRegLine}
                        // showDatasets={showDatasets} />}
                        showRegLine={[true, true, true, false]}
                        showDatasets={[true, true, true, false]} />}
                    modals={[]}
                />
            )}
        </>
    );
};
