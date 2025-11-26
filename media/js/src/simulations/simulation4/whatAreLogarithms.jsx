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
        } regression fit equation:`;

    const getRegInterpretation = (model, fit) => {
        const interpretations = {
            logLinear: {
                linearFit: (
                    <>
                    This linear-linear regression is not a good fit, the
                    interpretation may be misleading or inaccurate
                    </>),
                logLinearFit: (
                    <>1-unit change in <Katex tex="x" /> is associated with 97%
                    (<Katex tex="0.97 × 100" />) change in <Katex tex="y" />
                    </>)
            },
            linearLog: {
                linearFit:
                    'This linear-linear regression is not a good fit, the ' +
                    'interpretation may be misleading or inaccurate.',
                linearLogFit: (
                    <>
                        <Katex tex="1\%" /> change in x is associated with{' '}
                        <Katex tex="0.98/100 units" /> change in{' '}
                        <Katex tex="y" />
                    </>
                )
            },
            logLog: {
                linearFit:
                    'This linear-linear regression is not a good fit, the ' +
                    'interpretation may be misleading or inaccurate.',
                logLogFit: (
                    <>
                        <Katex tex="1\%" /> change in x is associated with{' '}
                        <Katex tex="0.98%//units" /> change in{' '}
                        <Katex tex="y" />
                    </>
                )
            }
        };
        return (interpretations[model] && interpretations[model][fit])
            ? interpretations[model][fit]
            : '';
    };

    const getRegNotes = (model, fit) => {
        const notes = {
            logLinear: {
                linearFit: (
                    <>
                        Observe the regression line when this linear-linear
                        model is applied on the raw data. Purely from
                        observation, does the regression line represent the
                            relationship between <Katex tex="y" /> and{' '}
                        <Katex tex="x" />?
                    </>
                ),
                logLinearFit: (
                    <>
                        Notice the data plot when natural log is applied to{' '}
                        <Katex tex="y" />.
                        Does the resulting regression line better represent or
                        summarize the linear relationship of the data?
                    </>
                )
            },
            linearLog: {
                linearFit: (
                    <>
                        Observe the regression line when this linear-linear
                        model is applied on the raw data. Purely from
                        observation, does the regression line represent the
                            relationship between <Katex tex="y" /> and{' '}
                        <Katex tex="x" />?
                    </>
                ),
                linearLogFit: (
                    <>
                        Notice the data plot when natural log is applied to{' '}
                        <Katex tex="x" />.
                        Does the resulting regression line better represent or
                        summarize the linear relationship of the data?
                    </>
                )
            },
            logLog: {
                linearFit: (
                    <>
                        Observe the regression line when this linear-linear
                        model is applied on the raw data. Purely from
                        observation, does the regression line represent the
                            relationship between <Katex tex="y" /> and{' '}
                        <Katex tex="x" />?
                    </>
                ),
                logLogFit: (
                    <>
                        Notice the data plot when natural log is applied to{' '}
                        <Katex tex="y" /> and <Katex tex="x" />.
                        Does the resulting regression line better represent or
                        summarize the linear relationship of the data?
                        This is the elasticity interpretation of the regression
                        slope, which could be helpful with empirical data in
                        Economics.
                    </>
                )
            }
        };
        return (notes[model] && notes[model][fit])
            ? notes[model][fit]
            : '';
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
                                            aria-controls={`fit-panel-${fit}`}>
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
                                                    <b>{getRegLabel(fit)}</b>
                                                </p>
                                                <div className="katex-block">
                                                    <Katex tex={getRegFormula(
                                                        selectedModel, fit)} />
                                                </div>
                                                <p>
                                                    <b>Interpretation: </b>
                                                    {getRegInterpretation(
                                                        selectedModel,
                                                        fit)}
                                                </p>
                                                <p>
                                                    <b>Notes: </b>
                                                    {getRegNotes(
                                                        selectedModel,
                                                        fit)}
                                                </p>
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