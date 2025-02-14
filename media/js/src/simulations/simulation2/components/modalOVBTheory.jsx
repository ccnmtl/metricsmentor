import React from 'react';
import { Katex } from '../../../utils/katexComponent';
import { inlineKatex } from '../../../utils/utils';

export const STATIC_URL = window.MetricsMentor.staticUrl;

export const OVBTheoryModal = () => {

    return (<>
        <div className="modal fade"
            id="OVBTheoryModal"
            tabIndex={-1}
            aria-labelledby="OVBTheoryModalLabel"
            aria-hidden="true"
            data-bs-backdrop="false">
            <div
                className="modal-dialog modal-dialog-centered
                    modal-custom modal-dialog-scrollable">
                <div className="modal-content modal-content-ovbtheory">
                    <div className="modal-header">
                        <h5 className="modal-title"
                            id="OVBTheoryModalLabel">
                            Omitted Variable Bias (OVB) Theory
                        </h5>
                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-4">
                        <p>
                A control variable is a variable that you include in your model
                to account for potential confounding factors.
                In regression analysis, when a relevant control variable is
                omitted, the effect of this missing variable gets absorbed
                into the error term {inlineKatex('u')}.
                        </p>
                        <div className="ms-4">
                            <Katex tex={'y = \\beta_0 + \\beta_1x_1 + u'} />
                        </div>
                        <p className="mt-3">
                This is known as the omitted variable bias (OVB).
                        </p>
                        <p>If the omitted
                control variable {inlineKatex('x_i')} is correlated with both
                the dependent variable {inlineKatex('y')},
                        {inlineKatex('\\text{corr}(y,x_i)')}, and the
                independent variable of interest {inlineKatex('x_1')},
                        {inlineKatex('\\text{corr}(x_1,x_i)')},
                it introduces bias into the estimated sample
                slope {inlineKatex('\\hat{\\beta_1}')}.
                        </p>
                        <p>In a simple linear regression, the effect of OVB on
                            {inlineKatex('\\hat{\\beta_1}')} is as follows:
                        </p>
                        <div className="ms-4">
                            <Katex tex={
                                // eslint-disable-next-line max-len
                                '\\hat{\\beta_1} \\xrightarrow{p} \\beta_1 + [bias]'} />
                        </div>
                        <p className="mt-3">
                The correlations between the included and omitted variables,
                specifically {inlineKatex('\\text{corr}(y,x_i)')} and
                            {inlineKatex('\\text{corr}(x_1,x_i)')},
                contribute to the {inlineKatex('[bias]')}.
                        </p>
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