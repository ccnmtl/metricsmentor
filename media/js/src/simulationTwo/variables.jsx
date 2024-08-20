import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, formulaText } from '../utils';
import { labelIndex as label} from '../dataAttr';

// If this get's implemented into other Simulations, rewrite as a JSX component

export const Variables = ({params}) => {
    const vars = params.lines[params.x_1];
    return (<>
        <p>
            Narrative for context with this first mandatory dataset. Here M2
            displays the dataset plot of {inlineKatex('y')} and
            {inlineKatex('x_1')} only (single variable regression). Some
            explanation, and narrative on what’s goes on <strong> in this step
            </strong> here. Example, &quot;we&apos;re looking at the
            relationship between income and years of education.&quot;
            <br />
            Indicate here what the names for {inlineKatex('y')} and
            {inlineKatex('x_1')} are.
        </p>
        <p>
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