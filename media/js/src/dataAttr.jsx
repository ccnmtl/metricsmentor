import React from 'react';
import { inlineKatex } from './utils';

export const dataAttr = {
    affairs_sim2: {
        y: 'naffairs', x_1: 'ratemarr', x_2: 'yrsmarr', x_3: 'kids',
        x_4: 'relig', option: ['yrsmarr', 'kids', 'relig'],
        description: 'Affairs were invented by Hollywood to spice up romance ' +
            'films',
        lines: {
            kids: {
                label: 'x3',
                color: 'cyan',
                slope_x1: -0.81,
                slope_x2: 0.37,
                intercept: 4.36,
                corr_x1: -0.20,
                corr_y: 0.10,
                stderr: [0.12, 0.29],
                y: [3.55, 0.33]},
            ratemarr: {
                label: 'x1',
                color: 'black',
                slope: -0.84,
                intercept: 4.74,
                corr_y: -0.28,
                stderr: 0.12,
                y: [3.91, 0.56]},
            relig: {
                label: 'x4',
                color: 'green',
                slope_x1: -0.83,
                slope_x2: -0.39,
                intercept: 5.92,
                corr_x1: 0.02,
                corr_y: -0.14,
                stderr: [0.12, 0.11],
                y: [5.09, 1.79]},
            yrsmarr: {
                label: 'x2',
                color: 'red',
                slope_x1: -0.74,
                slope_x2: 0.07,
                intercept: 3.77,
                corr_x1: -0.24,
                corr_y: 0.19,
                stderr: [0.12, 0.02],
                y: [3.03, 0.05]}},
        xRange: [1, 5]
    },
    campus_sim2: {
        y: 'crime', x_1: 'enroll', x_2: 'police', x_3: 'priv',
        option: ['police', 'priv'],
        lines: {
            enroll: {
                label: 'x1',
                color: 'black',
                slope: 0.03,
                intercept: -109.10,
                corr_y: 0.84,
                stderr: 0.00,
                y: [-52.75, 1655.93]
            },
            police: {
                label: 'x2',
                color: 'red',
                slope_x1: 0.02,
                slope_x2: 7.57,
                intercept: -153.65,
                corr_x1: 0.72,
                corr_y: 0.72,
                stderr: [0.00, 2.26],
                y: [-109.68, 1223.72]
            },
            priv: {
                label: 'x3',
                color: 'cyan',
                slope_x1: 0.032,
                slope_x2: 48.09,
                intercept: -121.37,
                corr_x1: -0.30,
                corr_y: -0.22,
                stderr: [0.00, 82.55],
                y: [-64.31, 1665.81]}},
        xRange: [1799, 56350]
    },
    gpa4: {
        y: 'colGPA', x_1: 'hsGPA', x_2: 'ACT', x_3: 'campus', x_4: 'skipped',
        x_5: 'bgfriend', option: ['ACT', 'campus', 'skipped', 'bgfriend'],
        lines: {
            ACT: {
                label: 'x2',
                color: 'red',
                slope_x1: 0.45,
                slope_x2: 0.01,
                intercept: 1.29,
                corr_x1: 0.35,
                corr_y: 0.21,
                stderr: [0.10, 0.01],
                y: [2.37, 3.10]},
            bgfriend: {
                label: 'x5',
                color: 'purple',
                slope_x1: 0.49,
                slope_x2: 0.08,
                intercept: 1.36,
                corr_x1: -0.04,
                corr_y: 0.10,
                stderr: [0.09, 0.06],
                y: [2.53, 3.31]},
            campus: {
                label: 'x3',
                color: 'cyan',
                slope_x1: 0.48,
                slope_x2: -0.07,
                intercept: 1.42,
                corr_x1: 0.02,
                corr_y: -0.06,
                stderr: [0.09, 0.08],
                y: [2.58, 3.36]},
            hsGPA: {
                label: 'x1',
                color: 'black',
                slope: 0.48,
                intercept: 1.42,
                corr_y: 0.41,
                stderr: 0.09,
                y: [2.57, 3.35]},
            skipped: {
                label: 'x4',
                color: 'green',
                slope_x1: 0.46,
                slope_x2: -0.08,
                intercept: 1.58,
                corr_x1: -0.09,
                corr_y: -0.26,
                stderr: [0.09, 0.03],
                y: [2.68, 3.41]}},
        xRange: [2.4, 4]
    },
    income: {
        y: 'income', x_1: 'educ', x_2: 'consump', x_3: 'black', x_4: 'size',
        option: ['consump', 'black', 'size'],
        lines: {
            black: {
                label: 'x3',
                color: 'cyan',
                slope_x1: 723.08,
                slope_x2: -1079.21,
                intercept: 1643.56,
                corr_x1: -0.24,
                corr_y: -0.16,
                stderr: [151.07, 2023.83],
                y: [3089.71, 16105.09]},
            consump: {
                label: 'x2',
                color: 'red',
                slope_x1: 356.49,
                slope_x2: 0.74,
                intercept: -406.52,
                corr_x1: 0.31,
                corr_y: 0.83,
                stderr: [89.37, 0.05],
                y: [306.47, 6723.38]},
            educ: {
                label: 'x1',
                color: 'black',
                intercept: 1342.75,
                corr_y: 0.46,
                slope: 742.53,
                stderr: 146.06,
                y: [2827.80, 16193.34]},
            size: {
                label: 'x4',
                color: 'green',
                slope_x1: 743.10,
                slope_x2: -388.74,
                intercept: 3027.20,
                corr_x1: 0.0033,
                corr_y: -0.10,
                stderr: [145.81, 335.44],
                y: [4513.39, 17889.11]},},
        xRange: [2, 20]
    }
};

export const labelIndex = {
    ACT: 'ACT Score',
    affairs_sim2: 'Affairs',
    bgfriend: 'Significant Other',
    black: 'Black',
    campus: 'Lives On Campus',
    campus_sim2: 'Campus Crime Rates',
    colGPA: 'College GPA',
    consump: 'Consumption',
    crime: 'Total Campus Crimes',
    educ: 'Years Of Education',
    enroll: 'Total Enrollment',
    gpa4: 'GPA',
    hsGPA: 'High School GPA',
    income: 'Income',
    kids: 'Has Kids',
    naffairs: 'Number Of Affairs',
    police: 'Police Employed On Campus',
    priv: 'Private School',
    ratemarr: 'Rating Of Marriage',
    relig: 'Degree Of Religiosity',
    size: 'Family Size',
    skipped: 'Classes Skipped Weekly',
    yrsmarr: 'Years Married',
};

export const takeaways2 = {
    general: {
        q_id: 1,
        prompt: <>Which of the following causes a higher change in the
            slope of the variable of interest {inlineKatex('x_1')}?</>,
        options: [
            <>(a) High correlation between {inlineKatex('y')} and
                {inlineKatex('x_1')}.</>,
            <>(b) High correlation between {inlineKatex('x_1')} and the
                omitted variable.</>,
            '(c) High correlation between the omitted variable and the ' +
                'dependent variable.',
            '(d) Both (b) and (c)',
            '(e) Both (a) and (c)'],
        answer: '(d) Both (b) and (c)',
        feedback_bad: <>Let&apos;s try again! Remember an omitted variable
            ({inlineKatex('x_2')}) causes bias in the slope of the variable
            of interest ({inlineKatex('x_1')}), however this bias depends
            on (1) whether {inlineKatex('x_2')} is “hiding” in the error
            (meaning that it is correlated with {inlineKatex('y')}) and (2)
            whether {inlineKatex('x_2')} is correlated with the variable of
            interest ({inlineKatex('x_1')}).</>,
        feedback_good: <>Excellent! You&apos;ve correctly identified that
            an omitted variable ({inlineKatex('x_2')}) causes bias in the
            slope of the variable of interest ({inlineKatex('x_1')}), and
            this bias depends on (1) whether {inlineKatex('x_2')} is
            “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether {inlineKatex('x_2')} is
            correlated with the variable of
            interest ({inlineKatex('x_1')}).</>
    },
    income: {
        q_id: 2,
        prompt: 'Which one of the control variables causes the highest ' +
            'bias in the slope of the variable of interest when omitted? ' +
            'Why?',
        options: [
            '(a) Size, because it is negatively correlated with Income.',
            '(b) Consumption, because it is highly correlated with ' +
                'Income and somewhat correlated with Education.',
            '(c) Black, because it is somewhat correlated with both ' +
                'Income and Education.',
            '(d) Income, because it is the dependent variable.',
            '(e) Education, because it is the variable of interest.'],
        answer: '(b) Consumption, because it is highly correlated with ' +
            'Income and somewhat correlated with Education.',
        feedback_bad: <>Let&apos;s try again! Remember an omitted variable (OV)
            causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
        feedback_good: <>Excellent! You&apos;ve correctly identified an omitted
            variable (OV) causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
    },
    gpa4: {
        q_id: 3,
        prompt: 'Which one of the control variables causes the highest ' +
            'bias in the slope of the variable of interest when omitted? ' +
            'Why?',
        options: [
            '(a) Classes Skipped Weekly, because it is negatively correlated ' +
                'with College ACT.',
            '(b) Lives On Campus, because it is a binary variable.',
            '(c) ACT, because it has the highest correlation with College ' +
                'GPA and High School GPA.',
            '(d) Significant Other, because it has the lowest correlation ' +
                'with College GPA and High School GPA.',
            '(e) Classes Skipped Weekly, because it has some correlation ' +
                'with College GPA and low correlation with High School GPA.'],
        answer: '(c) ACT, because it has the highest correlation with ' +
            'College GPA and High School GPA.',
        feedback_bad: <>Let&apos;s try again! Remember an omitted variable (OV)
            causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
        feedback_good: <>Excellent! You&apos;ve correctly identified an omitted
            variable (OV) causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
    },
    affairs_sim2: {
        q_id: 4,
        prompt: 'Which one of the control variables causes the highest ' +
            'bias in the slope of the variable of interest when omitted? ' +
            'Why?',
        options: [
            '(a) HasKids, because it is negatively correlated with Rating ' +
                'of Marriage.',
            '(b) Religion, because it is highly correlated with Rating of ' +
                'Marriage.',
            '(c) Years Married, because it is negatively correlated with ' +
                'Rating of Marriage.',
            '(d) Years Married, because it has the highest correlation with ' +
                'Number Of Affairs and with Rating Of Marriage.',
            '(e) Number Of Affairs because it is the variable of interest.'],
        answer: '(d) Years Married, because it has the highest correlation ' +
            'with Number Of Affairs and with Rating Of Marriage.',
        feedback_bad: <>Let&apos;s try again! Remember an omitted variable (OV)
            causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
        feedback_good: <>Excellent! You&apos;ve correctly identified an omitted
            variable (OV) causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
    },
    campus_sim2: {
        q_id: 5,
        prompt: 'Which one of the control variables causes the highest ' +
            'bias in the slope of the variable of interest when omitted? ' +
            'Why?',
        options: [
            '(a) Police, because it is highly correlated with Crime and ' +
                'Total Enrollment.',
            '(b) Private, because it is negatively correlated with Crime.',
            '(c) Police, because it is not highly correlated with Crime and ' +
                'Enrollment.',
            '(d) Crime, because it is the variable of interest.',
            '(e) Crime, because it is the dependent variable.'],
        answer: '(a) Police, because it is highly correlated with Crime and ' +
            'Total Enrollment.',
        feedback_bad: <>Let&apos;s try again! Remember an omitted variable (OV)
            causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
        feedback_good: <>Excellent! You&apos;ve correctly identified an omitted
            variable (OV) causes bias in the slope of the variable of interest
            ({inlineKatex('x_1')}), and the degree of this bias depends on (1)
            whether OV is “hiding” in the error (meaning that it is correlated
            with {inlineKatex('y')}) and (2) whether the OV is correlated with
            the variable of interest ({inlineKatex('x_1')}).</>,
    }
};

export const sim2TextVariable = {
    income: <>In the &ldquo;Income&rdquo; dataset, our goal is to examine the
        relationship between the dependent variable, annual income
        ({inlineKatex('y')}), and the key variable of interest, which is the
        years of education of the household head ({inlineKatex('x_1')}). Here
        is the simple regression analysis for these variables:</>,
    gpa4: <>In the &ldquo;GPA&rdquo; dataset, our goal is to examine the
        relationship between the dependent variable, college GPA
        ({inlineKatex('y')}), and the key variable of interest,
        high school GPA ({inlineKatex('x_1')}). Here is the simple regression
        analysis for these variables:</>,
    affairs_sim2: <>In the &ldquo;Affairs&rdquo; dataset, our goal is to
        examine the relationship between the dependent variable, number of
        extramarital affairs ({inlineKatex('y')}), and the key variable of
        interest, which is the marriage satisfaction ratings
        ({inlineKatex('x_1')}). Here is the simple
        regression analysis for these variables:</>,
    campus_sim2: <>In the &ldquo;Campus Crime Rates&rdquo; dataset, our goal is
        to examine the relationship between the dependent variable, total campus
        crime ({inlineKatex('y')}), and the key variable of interest, which is
        total student enrollment ({inlineKatex('x_1')}). Here is the simple
        regression analysis for these variables:</>,
};

export const sim2TextControl = {
    income: {
        intro: <>In this case, OVB can lead to inaccurate estimates of the
            relationships between {inlineKatex('\\text{Income}')} and
        {inlineKatex('\\text{Years Of Education}')}.</>,
        general_inst: <>These are control variables whose omission could lead
            to OVB and distort the estimates of the
            relationships between {inlineKatex('\\text{Income}')} and
        {inlineKatex('\\text{Years Of Education}')}.</>,
        control_inst: {
            consump: <>When {inlineKatex('\\text{Consumption}')}
                ({inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_2)')} and
                {inlineKatex('corr(x_1, x_2)')}.</>,
            black: <>When {inlineKatex('\\text{Black}')}
                ({inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_3)')} and
                {inlineKatex('corr(x_1, x_3)')}.</>,
            size: <>When {inlineKatex('\\text{Family Size}')}
            ({inlineKatex('x_4')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_4)')} and
                {inlineKatex('corr(x_1, x_4)')}.</>,
        }
    },
    gpa4: {
        intro: <>In this case, OVB can lead to inaccurate estimates of the
            relationships between {inlineKatex('\\text{College GPA}')} and
        {inlineKatex('\\text{High School GPA}')}.</>,
        general_inst: <>These are control variables whose omission could lead
            to OVB and distort the estimates of the
            relationships between {inlineKatex('\\text{College GPA}')} and
        {inlineKatex('\\text{High School GPA}')}.</>,
        control_inst: {
            ACT: <>When {inlineKatex('\\text{ACT Score}')}
                ({inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_2)')} and
                {inlineKatex('corr(x_1, x_2)')}.</>,
            campus: <>When {inlineKatex('\\text{Lives On Campus}')}
                ({inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_3)')} and
                {inlineKatex('corr(x_1, x_3)')}.</>,
            skipped: <>When {inlineKatex('\\text{Classes Skipped Weekly}')}
                ({inlineKatex('x_4')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_4)')} and
                {inlineKatex('corr(x_1, x_4)')}.</>,
            bgfriend: <>When {inlineKatex('\\text{Significant Other}')}
                ({inlineKatex('x_5')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_5)')} and
                {inlineKatex('corr(x_1, x_5)')}.</>
        }
    },
    affairs_sim2: {
        intro: <>In this case, OVB can lead to inaccurate estimates of the
            relationships between
        {inlineKatex('\\text{Number Of Affairs}')} and
        {inlineKatex('\\text{Rating Of Marriage}')}.</>,
        general_inst: <>These are control variables whose omission could lead
            to OVB and distort the estimates of the
            relationships between {inlineKatex('\\text{Number Of Affairs}')} and
        {inlineKatex('\\text{Rating Of Marriage}')}.</>,
        control_inst: {
            yrsmarr: <>When {inlineKatex('\\text{Years Married}')}
                ({inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_2)')} and
                {inlineKatex('corr(x_1, x_2)')}.</>,
            kids: <>When {inlineKatex('\\text{Has Kids}')}
                ({inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_3)')} and
                {inlineKatex('corr(x_1, x_3)')}.</>,
            relig: <>When {inlineKatex('\\text{Degree Of Religiosity}')}
            ({inlineKatex('x_4')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_4)')} and
                {inlineKatex('corr(x_1, x_4)')}.</>
        }
    },
    campus_sim2: {
        intro: <>In this case, OVB can lead to inaccurate estimates of the
            relationships between
        {inlineKatex('\\text{Total Campus Crimes}')} and
        {inlineKatex('\\text{Total Enrollment}')}.</>,
        general_inst: <>These are control variables whose omission could lead
            to OVB and distort the estimates of the
            relationships between
        {inlineKatex('\\text{Total Campus Crimes}')} and
        {inlineKatex('\\text{Total Enrollment}')}.</>,
        control_inst: {
            police: <>When {inlineKatex('\\text{Police Employed On Campus}')}
                ({inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_2)')} and
                {inlineKatex('corr(x_1, x_2)')}.</>,
            campus: <>When {inlineKatex('\\text{Private School}')}
                ({inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('corr(y, x_3)')} and
                {inlineKatex('corr(x_1, x_3)')}.</>
        }
    },
};
