import React from 'react';
import PropTypes from 'prop-types';
import { inlineKatex, formulaText } from '../../../utils/utils';
import { labelIndex as label } from '../dataAttr';
import { STATIC_URL } from '../../../utils/utils';


// If this get's implemented into other Simulations, rewrite as a JSX component

export const Variables = ({params}) => {
    const vars = params[params['x_1']];
    return (<>
        <p>
            {params.varText}
        </p>
        <div className="prompt-block">
            <div className="prompt-gfx">
                <img src={`${STATIC_URL}/img/icon-bell.svg`}
                    className="prompt-img"
                    alt="Reminder:" />
            </div>
            <p className="mb-0">
                Observe the corresponding regression line on the graph.
            </p>
        </div>
        {[
            {
                title: 'Regression line equation',
                body: [
                    '\\hat{y_i} = \\hat{\\beta_0} + \\hat{\\beta_1}x_1',
                    `\\widehat{${label[params.y]}_i} = ${vars.intercept} +
                        ${vars.slope + label[params.x_1]}`,
                ]
            }
        ].map((content, i) => formulaText(content, i))}
        <table className="table table-bordered w-75" data-cy="voi-table">
            <thead>
                <tr>
                    <th className="w-50" data-cy="corr-header"
                        scope="col">{inlineKatex('\\text{corr}(y,x_1)')}</th>
                    <th className="w-50" data-cy="beta-header"
                        scope="col">{inlineKatex('\\hat{\\beta_1}')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="w-50" data-cy="corr">
                        {inlineKatex(`${vars.corr_y}`)}</td>
                    <td className="w-50" data-cy="beta">
                        {inlineKatex(`${vars.slope}`)}</td>
                </tr>
            </tbody>
        </table>
    </>);
};

Variables.propTypes = {
    params: PropTypes.object.isRequired,
};