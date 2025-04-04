import React from 'react';
import { SimulationPanel } from '../../SimulationPanel';
import { STATIC_URL } from '../../utils/utils';
import { ScatterPlot } from './polynomialGraph';

export const SimulationFour = () => {

    const simFourSteps = [
        {
            // Simulation preamble
            stepNumber: '•',
            segment: 'preamble',
            subtitle: 'Simulation 4',
            title: 'Non-linear Regression',
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
        }
    ];


    return (
        <>
            <SimulationPanel steps={simFourSteps}
                graphContent={<ScatterPlot />}
                modals={[]}
            />
        </>
    );
};
