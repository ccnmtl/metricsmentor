import React from 'react';
import PropTypes from 'prop-types';

export const WhatAreLogarithmRegs = ({
    selectedFit, setSelectedFit,
    selectedModel, setSelectedModel
}) => {

    const fitOptions = {
        logLinear: ['linearFit', 'logLinearFit'],
        linearLog: ['linearFit', 'linearLogFit'],
        logLog: ['linearFit', 'logLogFit']
    };

    return (
        <div>
            <h2>Exploring Logarithmic Relationships</h2>
            <p>
        Select a model type below to explore how logarithmic transformations
        affect regression fitting.
            </p>

            <div className="radio-group">
                {Object.keys(fitOptions).map(model => (
                    <div key={model}>
                        <label>
                            <input
                                type="radio"
                                name="model"
                                value={model}
                                checked={selectedModel === model}
                                onChange={() => setSelectedModel(model)}
                            />
                            {model === 'logLinear'
                                ? 'Log-Linear Model'
                                : model === 'linearLog'
                                    ? 'Linear-Log Model'
                                    : 'Log-Log Model'}
                        </label>
                        <div className="nested-radio ps-4">
                            {fitOptions[model].map(fit => (
                                <label key={fit} className="d-block">
                                    <input
                                        type="radio"
                                        name="fit"
                                        value={fit}
                                        checked={selectedFit === fit}
                                        onChange={() => setSelectedFit(fit)}
                                    />
                                    {
                                        (() => {
                                            const fitLabel = fit
                                                .replace('Fit', '')
                                                .replace(/([A-Z])/g, ' $1')
                                                .trim();
                                            return `${fitLabel} Regression`;
                                        })()
                                    }
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

WhatAreLogarithmRegs.propTypes = {
    selectedFit: PropTypes.string.isRequired,
    setSelectedFit: PropTypes.func.isRequired,
    selectedModel: PropTypes.string.isRequired,
    setSelectedModel: PropTypes.func.isRequired
};