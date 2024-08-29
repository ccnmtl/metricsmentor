import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, formulaText } from '../utils';
import { labelIndex as label} from '../dataAttr';

// If this get's implemented into other Simulations, rewrite as a JSX component

export const Variables = ({params}) => {
    const vars = params.lines[params.x_1];
    return (<>
        <p>
            <span className="text-danger fw-semibold">Evan: This paragraph is
            dependent on the dataset chosen.</span>
            In the &ldquo;Income&rdquo; dataset, our goal is to examine the
            relationship between the dependent variable, annual income
            ({inlineKatex('y')}), and the key variable of interest, which is
            the years of education of the household head
            ({inlineKatex('x_1')}). Here is the simple regression analysis
            for these variables:
        </p>
        <ul className="list-group">
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
                        inlineKatex('corr(y,x_1)')}</>,
                    body: [`corr(y,x_1)=${vars.corr_y}`]
                }
            ].map((content, i) => formulaText(content, i))}
        </ul>
    </>);
};

Variables.propTypes = {
    params: PropTypes.object.isRequired,
};