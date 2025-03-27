import React from 'react';
import PropTypes from 'prop-types';
import { SimulationStep } from './SimulationStep';

export const SimulationPanel = ({ steps, graphContent, modal }) => (
    <div className="simulation">
        <div className="simulation__workspace">
            {steps.map((step, index) => (
                <SimulationStep key={index} {...step} />
            ))}
        </div>
        <div className="simulation__graphspace">
            {graphContent}
        </div>
        {modal}
    </div>
);

SimulationPanel.propTypes = {
    steps: PropTypes.array.isRequired,
    graphContent: PropTypes.node.isRequired,
    modal: PropTypes.node
};