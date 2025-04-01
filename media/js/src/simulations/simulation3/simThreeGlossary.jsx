import React from 'react';
import { inlineKatex } from '../../utils/utils';
import { Katex } from '../../utils/katexComponent';
import { GenericModal } from '../../Modal';

export const SimThreeGlossary = () => {
    return (
        <GenericModal
            modalId="simulationThreeGlossary"
            title="Glossary of Terms"
            bodyContent={<>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"
                                className="text-nowrap pe-3 h2">
                                Symbols or terms
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
                                Critical value
                            </td>
                            <td>
                                A point on a statistical distribution that is
                                used to determine whether to reject the null
                                hypothesis in hypothesis testing. It
                                corresponds to {inlineKatex('\\alpha')}.
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
                                <Katex tex={'{\\beta_1}'} />
                            </td>
                            <td>Population slope</td>
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
                            <td>
                                Test statistics
                                ({inlineKatex('z')}-score):<br />
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    't = \\cfrac{\\hat{\\beta}_1 - \\beta_1}{SE(\\hat{\\beta_1})}'
                                } />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Katex tex={'p'} />-value
                            </td>
                            <td>
                                A number describing the likelihood of
                                obtaining the observed data under the null
                                hypothesis of a statistical test. The smaller
                                the {inlineKatex('p')}-value, the more
                                likely it is to reject the null hypothesis.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Katex tex={'CI'} />
                            </td>
                            <td>
                                Confidence interval:<br />
                                <Katex tex={
                                    // eslint-disable-next-line max-len
                                    'CI = \\hat{\\beta_1} \\plusmn criticalValue \\times SE(\\hat{\\beta_1})'
                                } /><br />
                                where {inlineKatex('criticalValue')} corresponds
                                to the chosen {inlineKatex('\\alpha')} level.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>}
        />
    );
};