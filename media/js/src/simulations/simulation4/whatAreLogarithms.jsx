import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { PromptBlock } from '../../PromptBlock';
import { Katex } from '../../utils/katexComponent';

export const WhatAreLogarithmRegs = ({
    selectedFit, setSelectedFit,
    selectedModel, setSelectedModel
}) => {

    const fitOptions = {
        logLinear: ['linearFit', 'logLinearFit'],
        linearLog: ['linearFit', 'linearLogFit'],
        logLog: ['linearFit', 'logLogFit']
    };

    const [openFit, setOpenFit] = useState({});

    const handleModelChange = (model) => {
        setSelectedModel(model);
        setOpenFit({});
    };

    const toggleFit = (fit) => {
        setOpenFit(prev => ({
            ...prev,
            [fit]: !prev[fit]
        }));
    };
    const formatFitName = (fit) =>
        fit.replace('Fit', '')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toLowerCase();

    const getModelFormula = (model) => {
        switch (model) {
        case 'logLinear':
            return '\\ln(y) = \\widehat{\\beta}_0 + \\widehat{\\beta}_1 x';
        case 'linearLog':
            return (
                '\\hat{y} = \\widehat{\\beta}_0 + ' +
                '\\widehat{\\beta}_1 \\ln(x)'
            );
        case 'logLog':
            return (
                '\\widehat{\\ln(y)} = \\widehat{\\beta}_0 + ' +
                '\\widehat{\\beta}_1 \\ln(x)'
            );
        default:
            return '';
        }
    };

    const getRegFormula = (model, fit) => {
        const formulas = {
            logLinear: {
                linearFit: '\\hat{y} = -669.23 + 224.14x',
                logLinearFit: '\\widehat{\\ln(y)} = 1.05 + 0.97x'
            },
            linearLog: {
                linearFit: '\\hat{y} = 5.57 + 0.0025x',
                linearLogFit: '\\hat{y} = 1.03 + 0.98\\ln(x)'
            },
            logLog: {
                linearFit: '\\hat{y} = 106.15 + 2.48x',
                logLogFit: '\\widehat{\\ln(y)} = 1.03 + 0.98\\ln(x)'
            }
        };
        return (formulas[model] && formulas[model][fit])
            ? formulas[model][fit]
            : '';
    };
    const getRegLabel = (fit) =>
        `Resulting ${
            fit
                .replace('Fit', '')
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .toLowerCase()
        } equation:`;

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
                            <div className="ps-4 mt-2 mb-3">
                                <p className="me-2 mb-0">Form:&nbsp;
                                    <Katex tex={getModelFormula(model)} />
                                </p>
                            </div>
                        )}

                        {selectedModel === model && (
                            <div className="nested-radio ps-4">
                                {fitOptions[model].map(fit => (
                                    <div key={fit} className="collapsible-fit">
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => toggleFit(fit)}
                                            aria-expanded={!!openFit[fit]}
                                            aria-controls={`fit-panel-${fit}`}
                                        >
                                            <span>
                                                {openFit[fit] ? '▼' : '▶'}{' '}
                                               With {formatFitName(fit)}{' '}
                                               regression fit
                                            </span>
                                        </button>
                                        {openFit[fit] && (
                                            <div id={`fit-panel-${fit}`}
                                                className="ps-4">
                                                <p>
                                                    Interpretation for
                                                    <b>
                                                        {formatFitName(fit)}
                                                    </b> regression fit.
                                                </p>
                                                <p>
                                                    <b>{getRegLabel(fit)}</b>
                                                </p>
                                                <div className="katex-block">
                                                    <Katex tex={getRegFormula(
                                                        selectedModel, fit)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
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