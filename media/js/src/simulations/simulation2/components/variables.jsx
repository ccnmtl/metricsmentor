import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, formulaText } from '../../../utils/utils';
import { labelIndex as label } from '../dataAttr';

// If this get's implemented into other Simulations, rewrite as a JSX component

export const Variables = ({params}) => {
    const vars = params.lines[params.x_1];
    return (<>
        <p>
            {params.varText}
        </p>
        {[
            {
                title: 'Regression line equation',
                body: [
                    '\\hat{y_i} = \\hat{\\beta_0} + \\hat{\\beta_1}x',
                    `\\widehat{${label[params.y]}_i} = ${vars.intercept} +
                        ${vars.slope + label[params.x_1]}`,
                ]
            },
            {
                title: 'Sample slope coefficient',
                body: [`\\hat{\\beta_1} = ${vars.slope}`]
            },
            {
                title: <>Correlation coefficient, {
                    inlineKatex('\\text{corr}(y,x_1)')}</>,
                body: [`\\text{corr}(y,x_1)=${vars.corr_y}`]
            }
        ].map((content, i) => formulaText(content, i))}
    </>);
};

Variables.propTypes = {
    params: PropTypes.object.isRequired,
};