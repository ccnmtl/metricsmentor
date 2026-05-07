import React from 'react';
import { Katex } from '../../utils/katexComponent';
import { Table } from '../../Table';

export const NoInteractionTable = () => (
    <>
        <h2>No-interaction:</h2>
        <h5>Mean values of Y and Constant Effect of
            <Katex tex={'D_1'} /> for All Values of
            <Katex tex={'D_2'} />
        </h5>
        <Table
            headers={[
                <Katex key="h0"
                    tex={'\\text{Group}'} />,
                <Katex key="h1" tex={'D_1'} />,
                <Katex key="h2" tex={'D_2'} />,
                <Katex key="h3"
                    tex={'\\bar{y}'} />,
                <Katex key="h4"
                    tex={'\\bar{y} \\text{ value}'
                    } />,
                <Katex key="h5" tex={
                    '\\text{Effect of }' +
                    ' D_1: 0 \\to 1'
                } />,
            ]}
            rows={[
                [
                    {content: <Katex tex={'A'} />,
                        isHeader: true},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex
                        tex={'\\hat\\beta_0'} />},
                    {content: <Katex
                        tex={'400.28'} />},
                    {content: <Katex
                        tex={'-'} />},
                ],
                [
                    {content: <Katex tex={'B'} />,
                        isHeader: true},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex tex={
                        '\\hat\\beta_0 + \\hat\\beta_1'
                    } />},
                    {content: <Katex
                        tex={'433.71'} />},
                    {content: <Katex tex={
                        '33.43~(\\hat\\beta_1)'} />},
                ],
                [
                    {content: <Katex tex={'C'} />,
                        isHeader: true},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={
                        '\\hat\\beta_0 + \\hat\\beta_2'
                    } />},
                    {content: <Katex
                        tex={'423.61'} />},
                    {content: <Katex
                        tex={'-'} />},
                ],
                [
                    {content: <Katex tex={'D'} />,
                        isHeader: true},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={
                        '\\hat\\beta_0 + \\hat\\beta_1' +
                        ' + \\hat\\beta_2'
                    } />},
                    {content: <Katex
                        tex={'457.04'} />},
                    {content: <Katex tex={
                        '33.43~(\\hat\\beta_1)'} />},
                ],
            ]}
        />
    </>
);

export const WithInteractionTable = () => (
    <>
        <h2>With Interaction:</h2>
        <h5>Mean values of Y and Varying Effect of
            <Katex tex={'D_1'} /> Across Values of
            <Katex tex={'D_2'} />
        </h5>
        <Table
            headers={[
                <Katex key="h0"
                    tex={'\\text{Group}'} />,
                <Katex key="h1" tex={'D_1'} />,
                <Katex key="h2" tex={'D_2'} />,
                <Katex key="h3"
                    tex={'\\bar{y}'} />,
                <Katex key="h4"
                    tex={'\\bar{y} \\text{ value}'
                    } />,
                <Katex key="h5" tex={
                    '\\text{Effect of }' +
                    ' D_1: 0 \\to 1'
                } />,
            ]}
            rows={[
                [
                    {content: <Katex tex={'A'} />,
                        isHeader: true},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex
                        tex={'\\hat\\beta_0'} />},
                    {content: <Katex
                        tex={'402.50'} />},
                    {content: <Katex
                        tex={'-'} />},
                ],
                [
                    {content: <Katex tex={'B'} />,
                        isHeader: true},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex tex={
                        '\\hat\\beta_0 + \\hat\\beta_1'
                    } />},
                    {content: <Katex
                        tex={'431.80'} />},
                    {content: <Katex tex={
                        '29.30~(\\hat\\beta_1)'} />},
                ],
                [
                    {content: <Katex tex={'C'} />,
                        isHeader: true},
                    {content: <Katex tex={'0'} />},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={
                        '\\hat\\beta_0 + \\hat\\beta_2'
                    } />},
                    {content: <Katex
                        tex={'418.77'} />},
                    {content: <Katex
                        tex={'-'} />},
                ],
                [
                    {content: <Katex tex={'D'} />,
                        isHeader: true},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={'1'} />},
                    {content: <Katex tex={
                        '\\hat\\beta_0 + \\hat\\beta_1' +
                        ' + \\hat\\beta_2 + \\hat\\beta_3'
                    } />},
                    {content: <Katex
                        tex={'460.98'} />},
                    {content: <Katex tex={
                        '42.21~(\\hat\\beta_1' +
                        ' + \\hat\\beta_3)'} />},
                ],
            ]}
        />
    </>
);

export const DiDSetUpTable = () => (
    <>
        <Table
            headers={[
                <Katex key="h0"
                    tex={'\\text{Group}'} />,
                <Katex key="h1" tex={'D_1, D_2'} />,
                <Katex key="h2" tex={'\\bar{y}'} />
            ]}
            rows={[
                [
                    {content: 'A: Control, Before'},
                    {content: <Katex tex={'0, 0'} />},
                    {content: <Katex tex={'\\hat\\beta_0'} />}
                ],
                [
                    {content: 'B: Control, After'},
                    {content: <Katex tex={'1, 0'} />},
                    {content: <Katex tex={'\\hat\\beta_0 + \\hat\\beta_1'} />}
                ],
                [
                    {content: 'C: Treated, Before'},
                    {content: <Katex tex={'0, 1'} />},
                    {content: <Katex tex={'\\hat\\beta_0 + \\hat\\beta_2'} />}
                ],
                [
                    {content: 'D: Treated, After'},
                    {content: <Katex tex={'1, 1'} />},
                    {content: <Katex tex={'\\hat\\beta_0 + \\hat\\beta_1 + ' +
                        '\\hat\\beta_2 + \\hat\\beta_3'} />}
                ],
            ]}
        />
    </>
);

export const DiDyValueTable = () => (
    <>
        <Table
            headers={[
                <Katex key="h0"
                    tex={'\\text{Group}'} />,
                <Katex key="h1" tex={'\\bar{y}\\text{ value}'} />,
                <Katex key="h2" tex={'\\text{Group changes before} ' +
                    '\\to \\text{after}'} />
            ]}
            rows={[
                [
                    {content: 'A: Control, Before'},
                    {content: <Katex tex={'402.50'} />},
                    {content: <Katex tex={'-'} />}
                ],
                [
                    {content: 'B: Control, After'},
                    {content: <Katex tex={'431.80'} />},
                    {content: <Katex tex={'29.30 (\\hat\\beta_1)'} />}
                ],
                [
                    {content: 'C: Treated, Before'},
                    {content: <Katex tex={'418.77'} />},
                    {content: <Katex tex={'-'} />}
                ],
                [
                    {content: 'D: Treated, After'},
                    {content: <Katex tex={'460.98'} />},
                    {content: <Katex tex={'42.21 (\\hat\\beta_1 + ' +
                        '\\hat\\beta_3)'} />}
                ],
            ]}
        />
    </>
);

