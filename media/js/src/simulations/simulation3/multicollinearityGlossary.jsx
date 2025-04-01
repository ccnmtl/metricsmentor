import React from 'react';
import { inlineKatex, STATIC_URL } from '../../utils/utils';
import { GenericModal } from '../../Modal';

export const MulticollinearityGlossary = () => {
    return (
        <GenericModal
            modalId="MulticollinearityGlossary"
            title="Multicollinearity Definition"
            bodyContent={<>
                <p>
                    When two or more independent variables in a regression
                    model have high correlation, it indicates
                    multicollinearity. This strong correlation makes it
                    challenging to assess the individual effects of each
                    variable on the dependent variable. As a result, it can
                    significantly impact {inlineKatex('SE(\\hat{\\beta_1})')}.
                </p>
                <p>
                    Multicollinearity leads to
                    inflated {inlineKatex('SE(\\hat{\\beta_1})')},
                    which results in misleading {inlineKatex('t')}-statistics,
                    {inlineKatex('p')}-values, and confidence
                    intervals {inlineKatex('(CI)')}. If multicollinearity
                    is not accounted for, it reduces the reliability and
                    stability of the regression coefficients. It makes it
                    difficult to detect important relationships between the
                    variables, and leads to incorrect hypothesis testing
                    results.
                </p>
                <p>
                    This simulation will guide you on how to correct the
                    effects of multicollinearity.
                </p>
                <p>
                    <b>Intuition:</b> the coefficient on
                    variable {inlineKatex('x_1')} is the effect
                    of {inlineKatex('x_1')} holding
                    {inlineKatex('x_2')} constant. But
                    if {inlineKatex('x_1')} and {inlineKatex('x_2')} are 
                    highly correlated, there is very little variation
                    in {inlineKatex('x_1')} once {inlineKatex('x_2')} is held
                    constant. Thus, the data are pretty much uninformative
                    about what happens
                    when {inlineKatex('x_1')} changes
                    but {inlineKatex('x_2')} doesn&lsquo;t.
                    So, the variance of the OLS estimator of the coefficient
                    on {inlineKatex('x_1')} will be large.
                </p>
            </>}
        />
    );
};