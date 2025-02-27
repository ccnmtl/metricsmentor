import React from 'react';
import PropTypes from 'prop-types';
import { SimulationStep } from './SimulationStep';

export const SimulationPanel = ({ steps, graphContent }) => (
    <div className="simulation">
        <div className="simulation__workspace">
            {steps.map((step, index) => (
                <SimulationStep key={index} {...step} />
            ))}
        </div>
        <div className="simulation__graphspace">
            {graphContent}
        </div>
    </div>
);

SimulationPanel.propTypes = {
    steps: PropTypes.array.isRequired,
    graphContent: PropTypes.node.isRequired
};