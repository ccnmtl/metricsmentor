import React from 'react';
import PropTypes from 'prop-types';
import { PromptBlock } from '../../PromptBlock';
import { Katex } from '../../utils/katexComponent';
import { DiDSetUpTable, DiDyValueTable } from './d1xd2Tables';

export const WhatIsD1xD2 = ({ checkedModels, setCheckedModels }) => {

    const handleCheckbox = (model) => {
        if (model === 'effectsDiD') {
            setCheckedModels(prev => ({
                noInteraction: false,
                withInteraction: false,
                effectsDiD: !prev.effectsDiD,
            }));
        } else {
            setCheckedModels(prev => ({
                ...prev,
                effectsDiD: false,
                [model]: !prev[model],
            }));
        }
    };

    return (
        <>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam scelerisque, nisi at porta varius, enim sem
                venenatis tortor, vel efficitur nisi nunc ac nisi.
            </p>
            <PromptBlock
                text="First, take a moment to review the basic concepts relevant
                to interaction of variables. This will help you continue
                with these activities" />

            <button
                className="btn btn-sm btn-primary mb-4"
                data-bs-toggle="modal"
                data-bs-target="#interactionOfVariablesModal"
                data-cy="interaction-of-variables-btn">
                    Interaction of Variables
            </button>

            <PromptBlock list={[
                'Lorem ipsum dolor sit amet',
                'consectetur adipiscing elit.',
                'Nullam scelerisque, nisi at'
            ]} />

            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="no-interaction-check"
                    checked={checkedModels.noInteraction}
                    onChange={() => handleCheckbox('noInteraction')}
                />
                <label className="form-check-label"
                    htmlFor="no-interaction-check">
                    No-interaction model
                </label>
            </div>
            {checkedModels.noInteraction ? (
                <div className="ps-4 mt-2 mb-3 dataset-variable-item">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Nullam scelerisque, nisi at porta varius.</p>
                    <p className='fw-bold'>For no-interaction model:</p>

                    <Katex tex={
                        '\\bar{y} = \\hat\\beta_0 + \\hat\\beta_1 D_1 '
                        + '+ \\hat\\beta_2 D_2'
                    } />

                    <p className='mt-4 fw-bold'>
                        Resulting regression equation:
                    </p>

                    <Katex tex={
                        '\\hat{y} = 400.28 + 33.43 D_1 + 23.33 D_2'
                    } />
                    <div className='mt-4'>
                        <PromptBlock text=
                            "Prompts to guide on what to look for" />
                    </div>
                    <div><b>Key Points:</b>
                        <ul>
                            <li>In this no-interaction model, D1 shifts y by
                                a fixed amount <Katex tex={'\\beta_1'} />,
                                regardless of <Katex tex={'D_2'} /></li>
                            <li>Somthing about comparing groups?.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="dataset-variable-item" />
            )}

            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="with-interaction-check"
                    checked={checkedModels.withInteraction}
                    onChange={() => handleCheckbox('withInteraction')}
                />
                <label className="form-check-label"
                    htmlFor="with-interaction-check">
                    With-interaction model
                </label>
            </div>
            {checkedModels.withInteraction ? (
                <div className="ps-4 mt-2 mb-3 dataset-variable-item">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Placeholder text for with-interaction model.</p>
                    <p className='fw-bold'>For with-interaction model:</p>

                    <Katex tex={
                        '\\bar{y} = \\hat\\beta_0 + \\hat\\beta_1 D_1 '
                        + '+ \\hat\\beta_2 D_2 + \\hat\\beta_3(D_1xD_2)'
                    } />

                    <p className='mt-4 fw-bold'>
                        Resulting regression equation:
                    </p>

                    <Katex tex={
                        '\\hat{y} = 402.50 + 29.30 D_1 + 16.27 D_2 + '
                        + '12.91 (D_1xD_2)'
                    } />

                    <div className='mt-4'>
                        <PromptBlock text=
                            "Prompts to guide on what to look for" />
                    </div>
                    <div><b>Key Points:</b>
                        <ul>
                            <li>
                                Effect of <Katex tex={'D_1'} />
                                depends on <Katex tex={'D_2'} />:
                                <ul>
                                    <li>When <Katex tex={
                                        'D_2=0: D_1=\\hat\\beta_1'} /></li>
                                    <li>When <Katex tex={
                                        'D_2=1: D_1=\\hat\\beta_1 + '
                                        + '\\hat\\beta_3'} /></li>
                                </ul>
                            </li>
                            <li>
                                The difference in the effect of
                                <Katex tex={'D_1'} /> accross
                                <Katex tex={'D_2'} />:
                                <ul>
                                    <li>
                                        <Katex tex={'(\\hat\\beta_1 + ' +
                                        '\\hat\\beta3)-\\hat\\beta_1= ' +
                                        '\\hat\\beta+3'} />
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Katex tex={'\\hat\\beta_3'} /> is the
                                interaction term
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="dataset-variable-item" />
            )}

            <h2>Difference-in-Differences (DiD)</h2>
            <p>
                Difference-in-differences (DiD) is a <Katex tex={'D_1 x D_2'} />
                interaction where one variable represents time, e.g. before vs.
                after, and the other represents group, e.g. treated vs. control.
                DiD compares the change over time across groups.</p>

            <p>Selected the following datatset to help you understand DiD</p>

            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="effects-did-check"
                    checked={checkedModels.effectsDiD}
                    onChange={() => handleCheckbox('effectsDiD')}
                />
                <label className="form-check-label"
                    htmlFor="effects-did-check">
                    Effects as DiD
                </label>
            </div>
            {checkedModels.effectsDiD ? (
                <div className="ps-4 mt-2 mb-3 dataset-variable-item">
                    <p className='fw-bold mb-3'>
                        For our dataset, the resulting with-interaction
                        equation:</p>
                    <Katex tex={
                        '\\hat{y} = 402.50 + 29.30 D_1 + 16.27 D_2 + '
                            + '12.91 (D_1xD_2)'
                    } />
                    <p className="mt-3 mb-2">
                        Let <Katex tex={'D_1'} /> represent time and
                        <Katex tex={'D_2'} /> as group:
                    </p>
                    <div className="ps-4">
                        <p className="mb-2">
                            <Katex tex={'D_1 = 0 \\to Before; D_1 = 1 ' +
                            '\\to After'} />
                        </p>
                        <p className="mb-2">
                            <Katex tex={'D_2 = 0 \\to Control; D_2 = 1 \\to' +
                            ' Treated'} />
                        </p>
                    </div>
                    <DiDSetUpTable />
                    <p>
                        The <Katex tex={'y'} /> values for the Control and
                        Treated groups, before and after:</p>
                    <DiDyValueTable />
                    <div>
                        <b>Key Points:</b>
                        <p>
                            Difference in differences measures how outcomes
                            change over time for a treated group relative to
                            how much it changes for a control group.
                        </p>
                        <p>
                            DiD = (Treated After − Treated Before) −
                            (Control After − Control Before)
                        </p>
                        <p>
                            <Katex tex={'DiD = 42.21 - 29.30 = 12.91' +
                                ' = \\hat\\beta_3'} />
                        </p>
                        <p>
                            The green dashed line on the graph is the
                            counterfactual for the treated group. It is the
                            predicted path an outcome would have followed
                            for the treated group if the treatment had not
                            occurred.
                        </p>

                    </div>
                </div>
            ) : (
                <div className="dataset-variable-item" />
            )}

            <p>Let&apos;s apply what you&apos;ve learned here on
                real-world datasets.</p>
        </>
    );
};

WhatIsD1xD2.propTypes = {
    checkedModels: PropTypes.shape({
        noInteraction: PropTypes.bool.isRequired,
        withInteraction: PropTypes.bool.isRequired,
        effectsDiD: PropTypes.bool.isRequired,
    }).isRequired,
    setCheckedModels: PropTypes.func.isRequired,
};