import React from 'react';
import { inlineKatex } from '../../utils/utils';
import { GenericModal } from '../../Modal';
import { STATIC_URL } from '../../utils/utils';

export const HeteroskedDefinition = () => {
    return (
        <GenericModal
            modalId="heteroskedDefinition"
            title="Heteroskedasticity Definition"
            bodyContent={<>
                <p>
                    Heteroskedasticity occurs when the variance of the
                    residuals in a regression model is not constant across all
                    levels of the independent variable(s), leading to an uneven
                    spread of residuals.
                </p>
                <figure className="modal-graph modal-graph--hts-variance">
                    <img src={`${STATIC_URL}/img/hts-variance-graph.svg`}
                        alt="Graph illustration of heteroskedasticity" />
                </figure>
                <p>
                    In a dataset plot with heteroskedasticity, this often
                    appears as a &ldquo;fan-shaped&rdquo; or
                    &ldquo;cone-shaped&rdquo; pattern, where the observations
                    widen or narrow as the values of the independent
                    variable(s) change.
                </p>
                <p>
                    Heteroskedasticity leads to
                    unreliable {inlineKatex('SE(\\hat{\\beta_1})')},
                    which can result in
                    misleading {inlineKatex('t')}-statistics,
                    {inlineKatex('p')}-values, and confidence intervals
                    {inlineKatex('(CI)')}. If the heteroskedasticity is not
                    accounted for, {inlineKatex('SE(\\hat{\\beta_1})')} might
                    be too small or too large, leading to incorrect hypothesis
                    testing results.
                </p>
                <p>
                    To mitigate the effects of heteroskedasticity, you can use
                    heteroskedasticity-robust standard errors, also called
                    robust standard errors. These are applied in statistical
                    models when the assumption of constant variance
                    (homoskedasticity) is violated. Using robust standard
                    errors provides more accurate t-statistics, p-values, and
                    confidence intervals.
                </p>
            </>}
        />
    );
};