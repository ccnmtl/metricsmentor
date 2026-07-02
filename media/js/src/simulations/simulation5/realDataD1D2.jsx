import React, { useState } from 'react';
import { PromptBlock } from '../../PromptBlock';
import { Katex } from '../../utils/katexComponent';
import { WageNoInteractionTable, WageWithInteractionTable,
    QuizScoreNoInteractionTable,
    QuizScoreWithInteractionTable } from './d1xd2Tables';


export const RealDataD1D2 = () => {
    const [selected, setSelected] = useState(null);
    const [checkedModels, setCheckedModels] = useState({
        noInteraction: true,
        withInteraction: false,
    });

    const DATASETS = [
        {
            id: 'dataset1',
            name: 'Wages Black-South',
            description:
                'Wage observations for Black and non-Black individuals across '
                + 'Southern and non-Southern U.S. states',
        },
        {
            id: 'dataset2',
            name: 'Learning app intervention',
            description:
                'Quiz scores from a randomized experiment comparing textbook '
                + 'and online learning tool on student learning gains',
        },
    ];

    const handleDataset = (idx) => {
        setSelected(idx);
        setCheckedModels({ noInteraction: true, withInteraction: false });
    };

    const handleCheckbox = (model) => {
        setCheckedModels(prev => ({
            ...prev,
            [model]: !prev[model],
        }));
    };

    return (
        <>
            <p>
                Let&rsquo;s apply what you&rsquo;ve
                learned about <Katex tex={'D_1 x D_2'} />
                using real-world datasets.
            </p>
            <p>
                Choose a dataset for your analysis:
            </p>
            <ul className='choice-list dataset-opt'>
                {DATASETS.map((dataset, i) => (
                    <li className="form-check d-flex mb-2" key={i}>
                        <input
                            className="form-check-input"
                            type="radio"
                            id={dataset.id}
                            name="d1d2-data-choice"
                            value={dataset.id}
                            checked={selected === i}
                            onChange={() => handleDataset(i)}
                        />
                        <label htmlFor={dataset.id}
                            className="form-check-label pb-2 me-2">
                            <p className="mb-0">
                                {dataset.name}
                            </p>
                            <p className="mb-0">
                                {dataset.description}
                            </p>
                        </label>
                    </li>
                ))}
            </ul>
            <PromptBlock text={<>
                Review the regression equation forms and coefficients. This may
                help as you continue with your analysis.
            </>} />
            <button
                className="btn btn-primary mt-2"
                data-bs-toggle="modal"
                data-bs-target="#interactionOfVariablesModal">
                Equations and coefficients
            </button>
            {selected === 0 && <>
                <h3 className="pt-3">Wages Black-South</h3>
                <p><b>Source:</b> Wooldridge, J.M. (2020). Introductory
                    Econometrics: A Modern Approach (7th ed.). South-Western
                    Cengage Learning.
                </p>
                <p>
                    This dataset contains wage observations for Black and
                    non-Black individuals across Southern and non-Southern U.S.
                    states, allowing for comparison across both race and region.
                </p>
                <p>
                    <b>Variables:</b>
                </p>
                <ul className="list-unstyled ms-3">
                    <li>South=0: Non-Southern states</li>
                    <li>South=1: Southern states</li>
                    <li>Black=0: Non-Black individuals</li>
                    <li>Black=1: Black individuals</li>
                </ul>

                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="d1d2-no-interaction-check"
                        checked={checkedModels.noInteraction}
                        onChange={() => handleCheckbox('noInteraction')}
                    />
                    <label className="form-check-label"
                        htmlFor="d1d2-no-interaction-check">
                        No-interaction model
                    </label>
                </div>
                {checkedModels.noInteraction ? (
                    <div className="ps-4 mt-2 mb-3 dataset-variable-item">
                        <p className='fw-bold'>Resulting regression equation,
                            no-interaction:
                        </p>
                        <Katex tex={
                            '\\bar{y} = \\hat\\beta_0 + \\hat\\beta_1 '
                            + 'D_{\\text{Black}} + \\hat\\beta_2 '
                            + 'D_{\\text{South}}'
                        } />
                        <p className="mt-3"></p>
                        <Katex tex={
                            '\\widehat{\\text{Wage}} = 1020 - 99'
                            + '\\text{South} - 222'
                            + '\\text{Black}'
                        } />
                        <WageNoInteractionTable />
                    </div>
                ) : (
                    <div className="dataset-variable-item" />
                )}

                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="d1d2-with-interaction-check"
                        checked={checkedModels.withInteraction}
                        onChange={() => handleCheckbox('withInteraction')}
                    />
                    <label className="form-check-label"
                        htmlFor="d1d2-with-interaction-check">
                        With-interaction model
                    </label>
                </div>
                {checkedModels.withInteraction ? (
                    <div className="ps-4 mt-2 mb-3 dataset-variable-item">
                        <p className='fw-bold'>Resulting regression equation,
                            with interaction:
                        </p>
                        <Katex tex={
                            '\\widehat{\\text{Wage}} = 1015 - 83'
                            + '\\text{South} - 155\\text{Black}'
                            + '- 113 (\\text{Black} \\times \\text{South})'
                        } />
                        <WageWithInteractionTable />
                    </div>
                ) : (
                    <div className="dataset-variable-item" />
                )}
            </>}
            {selected === 1 && <>
                <h3 className="pt-3">Learning app intervention</h3>
                <p><b>Source</b>: Seyhan Erden, Spring 2026 Introduction to
                Econometrics in-class experiment.</p>
                <p>
                    This dataset contains pre- and post-quiz scores from a
                    randomized experiment comparing two instructional methods.
                    Students were assigned to either conventional textbook
                    instruction or Metrics Mentor, an online learning app. Each
                    student&apos;s score-gain measures learning outcomes across
                    the two groups.
                </p>
                <p>
                    <b>Variables:</b>
                </p>
                <ul className="list-unstyled ms-3">
                    <li>Post=0: Before intervention</li>
                    <li>Post=1: After intervention</li>
                    <li>Treatment=0: Control group with textbook</li>
                    <li>Treatment=1: Treatment group with learning app</li>
                </ul>

                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="d1d2-no-interaction-check-2"
                        checked={checkedModels.noInteraction}
                        onChange={() => handleCheckbox('noInteraction')}
                    />
                    <label className="form-check-label"
                        htmlFor="d1d2-no-interaction-check-2">
                        No-interaction model
                    </label>
                </div>
                {checkedModels.noInteraction ? (
                    <div className="ps-4 mt-2 mb-3 dataset-variable-item">
                        <p className='fw-bold'>Resulting regression equation,
                            no-interaction:
                        </p>
                        <Katex tex={
                            '\\bar{y} = \\hat\\beta_0 + \\hat\\beta_1 '
                            + 'D_{\\text{Post}} + \\hat\\beta_2 '
                            + 'D_{\\text{Treatment}}'
                        } />
                        <p className="mt-3"></p>
                        <Katex tex={
                            '\\widehat{\\text{quizScore}} = 4.29 + 1.11'
                            + '\\text{Post} - 0.18'
                            + '\\text{Treatment}'
                        } />
                        <QuizScoreNoInteractionTable />
                    </div>
                ) : (
                    <div className="dataset-variable-item" />
                )}

                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="d1d2-with-interaction-check-2"
                        checked={checkedModels.withInteraction}
                        onChange={() => handleCheckbox('withInteraction')}
                    />
                    <label className="form-check-label"
                        htmlFor="d1d2-with-interaction-check-2">
                        With-interaction model
                    </label>
                </div>
                {checkedModels.withInteraction ? (
                    <div className="ps-4 mt-2 mb-3 dataset-variable-item">
                        <p className='fw-bold'>Resulting regression equation,
                            with interaction:
                        </p>
                        <Katex tex={
                            '\\widehat{\\text{quizScore}} = 4.55 + 0.60'
                            + '\\text{Post} - 0.70'
                            + '\\text{Treatment} + 1.04'
                            + '(\\text{Post} \\times \\text{Treatment})'
                        } />
                        <QuizScoreWithInteractionTable />
                    </div>
                ) : (
                    <div className="dataset-variable-item" />
                )}
            </>}
        </>
    );
};
