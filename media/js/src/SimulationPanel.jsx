import React from 'react';
import PropTypes from 'prop-types';
import { SimulationStep } from './SimulationStep';

export const SimulationPanel = ({ steps, graphContent, modals }) => (
    <div className="simulation">
        <div className="simulation__workspace">
            {steps.map((step, index) => (
                <SimulationStep key={index} {...step} />
            ))}
        </div>
        <div className="simulation__graphspace">
            {graphContent}
        </div>
        {modals.map((modal, i) => (
            <React.Fragment key={i}>{modal}</React.Fragment>
        ))}
    </div>
);

SimulationPanel.propTypes = {
    steps: PropTypes.array.isRequired,
    graphContent: PropTypes.node.isRequired,
    modals: PropTypes.array
};