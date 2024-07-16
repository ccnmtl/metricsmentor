import React from 'react';
import { Katex } from '../katexComponent';
import PropTypes from 'prop-types';
import { inlineKatex } from '../utils';

/**
 * Formatted output for the formula text.
 * @param {{title:any, body:any[]}} content
 * @returns React.JSX.Element
 */
const formulaText = function(content={title: '', body: []}, i) {
    return (
        <li className={'list-group'} key={i}>
            <h2 className="mt-4">{content.title}:</h2>
            {content.body.map((eq, i) => (
                <Katex key={i} className={'ms-3' + (i==0 ? '' : ' mt-3')}
                    tex={eq} />
            ))}
        </li>
    );
};
// If this get's implemented into other Simulations, rewrite as a JSX component

export const Variables2 = () => {
    return (<>
        <p>
            Instructions for this step. Here M2 displays the dataset plot
            of {inlineKatex('y')} and {inlineKatex('x_1')} only. Some
            explanation and a narrative on what&apos;s goes
            on <strong>in this step </strong> here. Example,
            &quot;we&apos;re looking at the relationship between
            test-scores and student-teacher ratio.&quot;
        </p>
        <ul className="list-group">
            {[
                {
                    title: 'Regression line equation',
                    body: [
                        'y = \\beta_0 + \\beta_1x + u',
                        '\\hat{y} = \\hat{\\beta_0} + \\hat{\\beta_1}x + u',
                        '\\hat{y} = value_{\\beta_0} + value_{\\beta_1}x_1',
                    ]
                },
                {
                    title: <>Sample {inlineKatex('y-intercept')} coefficient</>,
                    body: ['\\hat{\\beta_0} = value_{\\beta_0}']
                },
                {
                    title: 'Sample slope coefficient',
                    body: ['\\hat{\\beta_1} = value_{\\beta_1}']
                },
                {
                    title: <>Correlation coefficient, {
                        inlineKatex('corr(y,x_1)=value')}</>,
                    body: ['corr(y,x_1)=value']
                }
            ].map((content, i) => formulaText(content, i))}
        </ul>
    </>);
};

Variables2.propTypes = {
    intercept: PropTypes.number,
    slope: PropTypes.number,
    plotType: PropTypes.string,
    slopes: PropTypes.array
};