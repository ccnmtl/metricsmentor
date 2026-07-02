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
                    {content: <Katex className="hi-val" tex={
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
                    {content: <Katex className="hi-val" tex={
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
                    {content: <Katex className="hi-val" tex={
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
                    {content: <Katex className="hi-val" tex={
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

export const WageNoInteractionTable = () => (
    <>
        <p className="fw-bold mt-4">
            No-interaction-Table of mean{' '}
            <Katex tex={'\\textit{Wage}'} /> values:
        </p>
        <Table
            tableClass="text-center"
            headers={[
                'Group',
                <Katex key="h1" tex={
                    '\\textit{South, Black}'} />,
                <Katex key="h2" tex={
                    '\\bar{\\textit{Wage}}'
                    + ' \\text{ value}'} />,
                <Katex key="h3" tex={
                    '\\text{Effect of}'
                    + ' \\ \\textit{South}: 0 \\to 1'
                } />,
            ]}
            rows={[
                [
                    {content: 'A: Non-Black, Non-South',
                        isHeader: true},
                    {content: '0, 0'},
                    {content: '1020'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'B: Non-Black, South',
                        isHeader: true},
                    {content: '1, 0'},
                    {content: '921'},
                    {content: <Katex tex={
                        '- 99~(\\hat\\beta_1)'} />},
                ],
                [
                    {content: 'C: Black, Non-South',
                        isHeader: true},
                    {content: '0, 1'},
                    {content: '798'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'D: Black, South',
                        isHeader: true},
                    {content: '1, 1'},
                    {content: '700'},
                    {content: <Katex tex={
                        '- 99~(\\hat\\beta_1)'} />},
                ],
            ]}
        />
        <p className="fst-italic">We can only compare
            South to N-South, or Black to Non-Black</p>
    </>
);

export const WageWithInteractionTable = () => (
    <>
        <p className="fw-bold mt-4">
            With-interaction-Table of mean{' '}
            <Katex tex={'\\textit{Wage}'} /> values:
        </p>
        <Table
            tableClass="text-center"
            headers={[
                'Group',
                <Katex key="h1" tex={
                    '\\textit{South, Black}'} />,
                <Katex key="h2" tex={
                    '\\bar{\\textit{Wage}}'
                    + ' \\text{ value}'} />,
                <Katex key="h3" tex={
                    '\\text{Effect of}'
                    + ' \\ \\textit{Black}: 0 \\to 1'
                } />,
            ]}
            rows={[
                [
                    {content: 'A: Non-Black, Non-South',
                        isHeader: true},
                    {content: '0, 0'},
                    {content: '1015'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'B: Non-Black, South',
                        isHeader: true},
                    {content: '1, 0'},
                    {content: '932'},
                    {content: <Katex tex={
                        '-83~(\\hat\\beta_1)'} />},
                ],
                [
                    {content: 'C: Black, Non-South',
                        isHeader: true},
                    {content: '0, 1'},
                    {content: '860'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'D: Black, South',
                        isHeader: true},
                    {content: '1, 1'},
                    {content: '664'},
                    {content: <Katex tex={
                        '-196~(\\hat\\beta_1 + \\hat\\beta_3)'} />},
                ],
            ]}
        />
    </>
);

export const QuizScoreNoInteractionTable = () => (
    <>
        <p className="fw-bold mt-4">
            No-interaction-Table of mean{' '}
            <Katex tex={'\\textit{quizScore}'} /> values:
        </p>
        <Table
            tableClass="text-center"
            headers={[
                'Group',
                <Katex key="h1" tex={
                    '\\textit{Post, Treatment}'} />,
                <Katex key="h2" tex={
                    '\\bar{\\textit{quizScore}}'
                    + ' \\text{ value}'} />,
                <Katex key="h3" tex={
                    '\\text{Effect of}'
                    + ' \\ \\textit{Post}: 0 \\to 1'
                } />,
            ]}
            rows={[
                [
                    {content: 'A: Control, Before',
                        isHeader: true},
                    {content: '0, 0'},
                    {content: '4.29'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'B: Control, After',
                        isHeader: true},
                    {content: '1, 0'},
                    {content: '5.40'},
                    {content: <Katex tex={
                        '1.11~(\\hat\\beta_1)'} />},
                ],
                [
                    {content: 'C: Treatment, Before',
                        isHeader: true},
                    {content: '0, 1'},
                    {content: '4.11'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'D: Treatment, After',
                        isHeader: true},
                    {content: '1, 1'},
                    {content: '5.22'},
                    {content: <Katex tex={
                        '1.11~(\\hat\\beta_1)'} />},
                ],
            ]}
        />
    </>
);

export const QuizScoreWithInteractionTable = () => (
    <>
        <p className="fw-bold mt-4">
            With-interaction-Table of mean{' '}
            <Katex tex={'\\textit{quizScore}'} /> values:
        </p>
        <Table
            tableClass="text-center"
            headers={[
                'Group',
                <Katex key="h1" tex={
                    '\\textit{Post, Treatment}'} />,
                <Katex key="h2" tex={
                    '\\bar{\\textit{quizScore}}'
                    + ' \\text{ value}'} />,
                <Katex key="h3" tex={
                    '\\text{Effect of}'
                    + ' \\ \\textit{Post}: 0 \\to 1'
                } />,
            ]}
            rows={[
                [
                    {content: 'A: Control, Before',
                        isHeader: true},
                    {content: '0, 0'},
                    {content: '4.55'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'B: Control, After',
                        isHeader: true},
                    {content: '1, 0'},
                    {content: '5.15'},
                    {content: <Katex tex={
                        '0.60~(\\hat\\beta_1)'} />},
                ],
                [
                    {content: 'C: Treatment, Before',
                        isHeader: true},
                    {content: '0, 1'},
                    {content: '3.85'},
                    {content: '\u2013'},
                ],
                [
                    {content: 'D: Treatment, After',
                        isHeader: true},
                    {content: '1, 1'},
                    {content: '5.49'},
                    {content: <Katex tex={
                        '1.64~(\\hat\\beta_1 + \\hat\\beta_3)'} />},
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

