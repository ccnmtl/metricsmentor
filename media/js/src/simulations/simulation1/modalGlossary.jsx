import React from 'react';
import { Katex } from '../../utils/katexComponent';

export const STATIC_URL = window.MetricsMentor.staticUrl;

export const GlossaryModal = () => {

    return (<>
        <div className="modal fade"
            id="glossaryModal"
            tabIndex={-1}
            aria-labelledby="glossaryModalLabel"
            aria-hidden="true"
            data-bs-backdrop="false">
            <div
                className="modal-dialog modal-dialog-centered
                    modal-custom modal-dialog-scrollable">
                <div className="modal-content modal-content-glossary">
                    <div className="modal-header">
                        <h5 className="modal-title"
                            id="glossaryModalLabel">
                            Metrics Mentor Glossary
                        </h5>
                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            These are common symbols and concepts used in
                            statistics and hypothesis testing.
                        </p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"
                                        className="text-nowrap pe-3 h2">
                                        Symbol
                                    </th>
                                    <th scope="col"
                                        className="text-nowrap pe-3 h2">
                                        Definition
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Katex tex={'{\\Eta_0}'} />
                                    </td>
                                    <td>Null hypothesis</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'{\\Eta_1}'} />
                                    </td>
                                    <td>Alternative hypothesis</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'{\\alpha}'} />
                                    </td>
                                    <td>
                                        &ldquo;alpha,&rdquo;
                                        significance level
                                        (probability of Type I error)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'y'} />
                                    </td>
                                    <td>The dependent variable</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'x_i'} />
                                    </td>
                                    <td>
                                        The independent variable
                                        (regressor) where&nbsp;&nbsp;
                                        <Katex tex={'i \\begin{cases} =1 &\\text{variable of interest} \\\\ {\\neq} 1 &\\text{all other regressors} \\end{cases}'} />{/* eslint-disable-line max-len */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'\\text{corr}(x,y)'} />
                                    </td>
                                    <td>Correlation between variables
                                        <Katex tex={'x'}
                                            className="katex-inline" /> and
                                        <Katex tex={'y'}
                                            className="katex-inline" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'n'} />
                                    </td>
                                    <td>Sample size</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'{\\beta_0}'} />
                                    </td>
                                    <td>Population intercept</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'{\\beta_1}'} />
                                    </td>
                                    <td>Population slope</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'\\hat{\\beta_0}'} />
                                    </td>
                                    <td>Sample intercept</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'\\hat{\\beta_1}'} />
                                    </td>
                                    <td>Sample slope</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'{SE(\\hat{\\beta_1})}'} />
                                    </td>
                                    <td>Standard error of the sample slope</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Katex tex={'t'} />
                                    </td>
                                    <td>Test statistics
                                        (<Katex tex={'z'}
                                        className="katex-inline" />-score )
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};