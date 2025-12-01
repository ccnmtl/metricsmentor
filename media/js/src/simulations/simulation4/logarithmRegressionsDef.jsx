import React from 'react';
import { inlineKatex } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import { GenericModal } from '../../Modal';


export const LogarithmDefinition = () => {
    return (
        <GenericModal
            modalId="logarithmDefinition"
            title="Logarithm-transformed Regression Models"
            bodyContent={<>
                <p>
                    Logarithm-transformed regressions apply
                    natural logs {inlineKatex('(ln)')} to the
                    dependent variable, the independent
                    variable, or both to better capture relationships that
                    grow in percentage or proportional terms. These regressions
                    are useful when the raw variables don&rsquo;t follow a
                    linear pattern and a log transformation reveals a more
                    consistent, interpretable relationship.
                </p>
                <p>There are three common logarithm-transformed models:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"
                                className="text-nowrap pe-3 h2">
                                Model
                            </th>
                            <th scope="col"
                                className="text-nowrap pe-3 h2">
                                Regression equation form
                            </th>
                            <th scope="col"
                                className="text-nowrap pe-3 h2">
                                Interpretation
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Log-Linear</td>
                            <td>
                                <Katex
                                    tex={
                                        '\\ln(y) = ' +
                                        '\\beta_0 + ' +
                                        '\\beta_1x'
                                    }
                                />
                            </td>
                            <td>1 unit change of {inlineKatex('x')} is
                            associated with {inlineKatex('\\beta_1\\%')}
                            ({inlineKatex('~\\beta_1 \\times 100')}) change
                            in {inlineKatex('y')}</td>
                        </tr>
                        <tr>
                            <td>Linear-Log</td>
                            <td>
                                <Katex
                                    tex={
                                        'y = ' +
                                        '\\beta_0 + ' +
                                        '\\beta_1\\ln(x)'
                                    }
                                />
                            </td>
                            <td>1% change of {inlineKatex('x')} is
                            associated with {inlineKatex('\\beta_1/100')} unit
                            change in {inlineKatex('y')}</td>
                        </tr>
                        <tr>
                            <td>Log-Log</td>
                            <td>
                                <Katex
                                    tex={
                                        '\\ln(y) = ' +
                                        '\\beta_0 + ' +
                                        '\\beta_1\\ln(x)'
                                    }
                                />
                            </td>
                            <td>1% change of {inlineKatex('x')} is
                            associated with {inlineKatex('\\beta_1\\%')} change
                            in {inlineKatex('y')}</td>
                        </tr>
                    </tbody>
                </table>
            </>}
        />
    );
};