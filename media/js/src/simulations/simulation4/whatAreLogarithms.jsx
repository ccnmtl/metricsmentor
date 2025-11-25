import React from 'react';
import PropTypes from 'prop-types';
import { PromptBlock } from '../../PromptBlock';

export const WhatAreLogarithmRegs = ({
    selectedFit, setSelectedFit,
    selectedModel, setSelectedModel
}) => {

    const fitOptions = {
        logLinear: ['linearFit', 'logLinearFit'],
        linearLog: ['linearFit', 'linearLogFit'],
        logLog: ['linearFit', 'logLogFit']
    };

    const handleModelChange = (model) => {
        setSelectedModel(model);
        const defaultFit = fitOptions[model][0];
        setSelectedFit(defaultFit);
    };

    return (
        <>
            <p>
                Logarithm-transformed regressions are models that use natural
                logs of the dependent variable, the independent variable, or
                both to better capture relationships that grow in percentage or
                proportional terms.
            </p>
            <PromptBlock
                text="But first, take a moment to familiarize yourself with
                    the basic concepts of logarithm-based regressions.
                    This can help as you continue with this exercise." />
            <button
                className="btn btn-sm btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#logarithmDefinition"
                data-cy="define-logarithm">
                    Logarithm Regressions
            </button>

            <h2>Logarithm regression plots</h2>
            <p>The generated datasets below are examples of three common
                logarithm-transformed models to help
                you explore how different regression capture
                each trend.
            </p>
            <PromptBlock list={[
                'Select a log-based regression model.',
                'Compare the data plots and resulting regressions before ' +
                'and after the log-based fit is applied.',
                'Review and compare the interpretations for each instance.'
            ]} />

            <div className="choice-list ms-0">
                {Object.keys(fitOptions).map(model => (
                    <div key={model}
                        className={'form-check dataset-variable-item'}>
                        <label
                            htmlFor={`model-radio-${model}`}
                            className={selectedModel === model
                                ? 'text-primary'
                                : ''}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="model-radio-group"
                                id={`model-radio-${model}`}
                                value={model}
                                checked={selectedModel === model}
                                onChange={() => handleModelChange(model)}
                            />
                            {model === 'logLinear'
                                ? 'Log-Linear Model'
                                : model === 'linearLog'
                                    ? 'Linear-Log Model'
                                    : 'Log-Log Model'}
                        </label>
                        {selectedModel === model && (
                            <div className="nested-radio ps-4">
                                {fitOptions[model].map(fit => (
                                    <label key={fit}
                                        className="ps-4 mt-2 d-block"
                                        htmlFor={`fit-radio-${model}-${fit}`}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`fit-radio-group-${model}`}
                                            id={`fit-radio-${model}-${fit}`}
                                            value={fit}
                                            checked={selectedFit === fit}
                                            onChange={() => setSelectedFit(fit)}
                                        />
                                        {
                                            (() => {
                                                let fitLabel = fit
                                                    .replace('Fit', '')
                                                    .replace(/([A-Z])/g, ' $1')
                                                    .trim()
                                                    .toLowerCase();
                                                return (
                                                    'With ' +
                                                    fitLabel +
                                                    ' regression fit'
                                                );
                                            })()
                                        }
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

WhatAreLogarithmRegs.propTypes = {
    selectedFit: PropTypes.string.isRequired,
    setSelectedFit: PropTypes.func.isRequired,
    selectedModel: PropTypes.string.isRequired,
    setSelectedModel: PropTypes.func.isRequired
};