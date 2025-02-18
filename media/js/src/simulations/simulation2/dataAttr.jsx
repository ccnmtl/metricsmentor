import React from 'react';
import { inlineKatex } from '../../utils/utils';

export const dataAttr = {
    affairs_sim2: {
        kids: {
            slope_x1: -0.81,
            slope_x2: 0.37,
            intercept: 4.36,
            corr_x1: -0.20,
            corr_y: 0.10,
            stderr: [0.12, 0.29]},
        ratemarr: {
            slope: -0.84,
            intercept: 4.74,
            corr_y: -0.28,
            stderr: 0.12},
        relig: {
            slope_x1: -0.83,
            slope_x2: -0.39,
            intercept: 5.92,
            corr_x1: 0.02,
            corr_y: -0.14,
            stderr: [0.12, 0.11]},
        yrsmarr: {
            slope_x1: -0.74,
            slope_x2: 0.07,
            intercept: 3.77,
            corr_x1: -0.24,
            corr_y: 0.19,
            stderr: [0.12, 0.02]},
    },
    campus_sim2: {
        enroll: {
            slope: 0.03,
            intercept: -109.10,
            corr_y: 0.84,
            stderr: 0.00},
        police: {
            slope_x1: 0.02,
            slope_x2: 7.57,
            intercept: -153.65,
            corr_x1: 0.72,
            corr_y: 0.72,
            stderr: [0.00, 2.26]},
        priv: {
            slope_x1: 0.032,
            slope_x2: 48.09,
            intercept: -121.37,
            corr_x1: -0.30,
            corr_y: -0.22,
            stderr: [0.00, 82.55]},
    },
    gpa4: {
        ACT: {
            slope_x1: 0.45,
            slope_x2: 0.01,
            intercept: 1.29,
            corr_x1: 0.35,
            corr_y: 0.21,
            stderr: [0.10, 0.01]},
        bgfriend: {
            slope_x1: 0.49,
            slope_x2: 0.08,
            intercept: 1.36,
            corr_x1: -0.04,
            corr_y: 0.10,
            stderr: [0.09, 0.06]},
        campus: {
            slope_x1: 0.48,
            slope_x2: -0.07,
            intercept: 1.42,
            corr_x1: 0.02,
            corr_y: -0.06,
            stderr: [0.09, 0.08]},
        hsGPA: {
            slope: 0.48,
            intercept: 1.42,
            corr_y: 0.41,
            stderr: 0.09},
        skipped: {
            slope_x1: 0.46,
            slope_x2: -0.08,
            intercept: 1.58,
            corr_x1: -0.09,
            corr_y: -0.26,
            stderr: [0.09, 0.03]}
    },
    income: {
        black: {
            slope_x1: 723.08,
            slope_x2: -1079.21,
            intercept: 1643.56,
            corr_x1: -0.24,
            corr_y: -0.16,
            stderr: [151.07, 2023.83]},
        consump: {
            slope_x1: 356.49,
            slope_x2: 0.74,
            intercept: -406.52,
            corr_x1: 0.31,
            corr_y: 0.83,
            stderr: [89.37, 0.05]},
        educ: {
            intercept: 1342.75,
            corr_y: 0.46,
            slope: 742.53,
            stderr: 146.06},
        size: {
            slope_x1: 743.10,
            slope_x2: -388.74,
            intercept: 3027.20,
            corr_x1: 0.0033,
            corr_y: -0.10,
            stderr: [145.81, 335.44]},
    }
};

export const dataIndex = {
    affairs_sim2: {
        y: 'naffairs', x_1: 'ratemarr', x_2: 'yrsmarr', x_3: 'kids',
        x_4: 'relig', option: ['yrsmarr', 'kids', 'relig']},
    campus_sim2: {
        y: 'crime', x_1: 'enroll', x_2: 'police', x_3: 'priv',
        option: ['police', 'priv']},
    gpa4: {
        y: 'colGPA', x_1: 'hsGPA', x_2: 'ACT', x_3: 'campus', x_4: 'skipped',
        x_5: 'bgfriend', option: ['ACT', 'campus', 'skipped', 'bgfriend']},
    income: {
        y: 'income', x_1: 'educ', x_2: 'consump', x_3: 'black', x_4: 'size',
        option: ['consump', 'black', 'size']},
};

export const dataRange = {
    affairs_sim2: {
        kids: {
            label: 'x3',
            color: 'cyan',
            y: [3.55, 0.33]},
        ratemarr: {
            label: 'x1',
            color: 'black',
            y: [3.91, 0.56]},
        relig: {
            label: 'x4',
            color: 'green',
            y: [5.09, 1.79]},
        yrsmarr: {
            label: 'x2',
            color: 'red',
            y: [3.03, 0.05]},
        xRange: [1, 5]
    },
    campus_sim2: {
        enroll: {
            label: 'x1',
            color: 'black',
            y: [-52.75, 1655.93]
        },
        police: {
            label: 'x2',
            color: 'red',
            y: [-109.68, 1223.72]
        },
        priv: {
            label: 'x3',
            color: 'cyan',
            y: [-64.31, 1665.81]},
        xRange: [1799, 56350]
    },
    gpa4: {
        ACT: {
            label: 'x2',
            color: 'red',
            y: [2.37, 3.10]},
        bgfriend: {
            label: 'x5',
            color: 'purple',
            y: [2.53, 3.31]},
        campus: {
            label: 'x3',
            color: 'cyan',
            y: [2.58, 3.36]},
        hsGPA: {
            label: 'x1',
            color: 'black',
            y: [2.57, 3.35]},
        skipped: {
            label: 'x4',
            color: 'green',
            y: [2.68, 3.41]},
        xRange: [2.4, 4]
    },
    income: {
        black: {
            label: 'x3',
            color: 'cyan',
            y: [3089.71, 16105.09]},
        consump: {
            label: 'x2',
            color: 'red',
            y: [306.47, 6723.38]},
        educ: {
            label: 'x1',
            color: 'black',
            y: [2827.80, 16193.34]},
        size: {
            label: 'x4',
            color: 'green',
            y: [4513.39, 17889.11]},
        xRange: [2, 20]
    },
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
        prompt: <>Which of the following causes a higher change in the slope of
            the variable of interest {inlineKatex('x_1')} when 
            {inlineKatex('x_2')} is omitted??</>,
        choices: [
            '(a) High correlation between the y and x1',
            '(b) High correlation between x1 and the omitted variable x2.',
            '(c) High correlation between the omitted variable x2 and the ' +
                'dependent variable y.',
            '(d) Both (b) and (c)',
            '(e) Both (a) and (c)'],
        answer: '(d) Both (b) and (c)',
        feedback: {
            a: <>Let's try again! Remember, we saw in Simulation 1 that a high
                correlation between y and x1 affects the slope of the
                regression regardless of an omitted variable. On the other
                hand, an omitted variable ({inlineKatex('x_2')}) causes bias in
                the slope of the variable of interest ({inlineKatex('x_1')}).
                This bias depends on two things: (1) whether
                {inlineKatex('x_2')} is "hiding" in the error (meaning that it
                is correlated with {inlineKatex('y')}) and (2) whether
                {inlineKatex('x_2')} is correlated with the variable of
                interest ({inlineKatex('x_1')}).</>,
            b: 'Almost correct! You correctly identified one of the reasons for ' +
                'omitted variable bias, but there is one more reason, remember ' +
                'the other reason?',
            c: 'Almost correct! You correctly identified one of the reasons for ' +
                'omitted variable bias, but there is one more reason, remember ' +
                'the other reason?',
            d: <>Excellent! You've correctly identified that an omitted
                variable ({inlineKatex('x_2')}) causes bias in the slope of the
                variable of interest ({inlineKatex('x_1')}), and this bias
                depends on (1) whether {inlineKatex('x_2')} is "hiding" in the
                error (meaning that it is correlated with y) and (2) whether
                {inlineKatex('x_2')} is correlated with the variable of
                interest ({inlineKatex('x_1')}).</>,
            e: <>Almost correct! You correctly identified that a high
                correlation between the omitted variable ({inlineKatex('x_2')})
                and the dependent variable ({inlineKatex('y')}) is one of the
                reasons for the omitted variable bias. What is the other
                reason? It is NOT a high correlation between {inlineKatex('y')}
                and {inlineKatex('x_1')}. That correlation is not related to
                the omitted variable. What is the other reason for omitted
                variable bias in the sample slope of {inlineKatex('x_1')}?</>
        },
    },
    income: {
        q_id: 2,
        prompt: 'Which of the control variables causes the highest bias in ' +
            'the slope of the variable of interest when omitted? Why?',
        choices: [
            '(a) Size, because it is negatively correlated with income.',
            '(b) Consumption, because it is highly correlated with ' +
                'income and somewhat correlated with education.',
            '(c) Black, because it is somewhat correlated with both ' +
                'income and education.',
            '(d) Income, because it is the dependent variable.',
            '(e) Education, because it is the variable of interest.'],
        answer: '(b) Consumption, because it is highly correlated with ' +
            'income and somewhat correlated with education.',
        feedback: {
            a: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is YearsOfEducation. It is correct that
                Size and Income are negatively correlated, but the magnitude of
                the correlation affects the OVB, not the sign. Remember an
                omitted variable (OV) causes bias in the slope of the variable
                of interest ({inlineKatex('x_1')}), and the degree of this bias
                depends on (1) whether the OV is "hiding" in error (meaning
                that it is correlated with {inlineKatex('y')}) and (2) whether
                the OV is correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            b: <>Excellent! Here, the variable of interest
                ({inlineKatex('x_1')}) is YearsOfEducation. We want to make
                sure that the sample slope of {inlineKatex('x_1')} is as
                unbiased as possible. The difference in the slope of the
                regressions is the highest when Consumption is omitted and when
                it is included. You've correctly identified that an omitted
                variable (OV) causes bias in the slope of the variable of
                interest ({inlineKatex('x_1')}), and the degree of this bias
                depends on two things:
                <ol>
                    <li>whether the OV is "hiding" in the error (meaning that
                        it is correlated with {inlineKatex('y')}) and</li>
                    <li>whether the OV is correlated with the variable of
                        interest ({inlineKatex('x_1')}).</li>
                </ol></>,
            c: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is YearsOfEducation. Check the
                correlations between Black and {inlineKatex('y')} as well as
                the correlation between Black and {inlineKatex('x_1')}. Are
                they lower (or higher) than the correlations between any other
                omitted variable and {inlineKatex('y')} and the correlation
                between that omitted variable and {inlineKatex('x_1')}?
                Remember an omitted variable (OV) causes bias in the slope of
                the variable of interest ({inlineKatex('x_1')}), and the degree
                of this bias depends on (1) whether the OV is "hiding" in error
                (meaning that it is correlated with {inlineKatex('y')}) and (2)
                whether the OV is correlated with the variable of interest
                ({inlineKatex('x_1')}). Size and Income are negatively
                correlated but that does not affect the OVB.</>,
            d: <>Let's try again! Income is the dependent variable, which is
                correct! However, the question asks, "Which one of the control
                variables causes the highest bias in the slope of the variable
                of interest when omitted?" It does not ask which variable is
                the dependent variable. Please check the correlations between
                the control variables and {inlineKatex('x_1')} as well as the
                correlations between the control variables and
                {inlineKatex('y')}. Remember an omitted variable (OV) causes
                bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest ({inlineKatex('x_1')}).
                Size and Income are negatively correlated, but that does not
                affect the OVB.</>,
            e: <>Let's try again! Education is the variable of interest, which
                is correct!  However, the question asks, "Which of the control
                variables causes the highest bias in the slope of the variable
                of interest when omitted?” It does not ask which variable is
                the variable of interest. Please check the correlations between
                the control variables and {inlineKatex('x_1')} as well as the
                correlation between the control variables and
                {inlineKatex('y')}. Remember an omitted variable (OV) causes
                bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest ({inlineKatex('x_1')}).
                Size and Income are negatively correlated but that does not
                affect the OVB.</>
        },
    },
    gpa4: {
        q_id: 3,
        prompt: 'Which one of the control variables causes the highest ' +
            'bias in the slope of the variable of interest when omitted? ' +
            'Why?',
        choices: [
            '(a) ClassesSkippedWeekly, because it is negatively correlated ' +
                'with CollegeACT.',
            '(b) LivesOnCampus, because it is a binary variable.',
            '(c) ACT Score, because it has the highest correlation with ' +
                'CollegeGPA and HighSchoolGPA.',
            '(d) SignificantOther, because it has the lowest correlation ' +
                'with CollegeGPA and HighSchoolGPA.',
            '(e) ClassesSkippedWeekly, because it has some correlation ' +
                'with CollegeGPA and low correlation with HighSchoolGPA.'],
        answer: '(c) ACT Score, because it has the highest correlation with ' +
            'CollegeGPA and HighSchoolGPA.',
        feedback: {
            a: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is HighSchoolGPA. Hence, we must check
                the correlation between the omitted variable and
                {inlineKatex('x_1')} and the correlation between the omitted
                variable and {inlineKatex('y')}. Both ClassesSkippedWeekly and
                CollegeACT are omitted variables that may cause OVB (Omitted
                Variable Bias). Remember an omitted variable (OV) causes bias
                in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in the error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            b: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is HighSchoolGPA. Yes, it is correct
                that LivesOnCampus is a binary variable but the question is not
                asking that. Please re-read the question. We must check the
                correlation between the omitted variable and
                {inlineKatex('x_1')} and the correlation between the omitted
                variable and {inlineKatex('y')}. Remember an omitted variable
                (OV) causes bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in the error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            c: <>Excellent! Here, the variable of interest
                ({inlineKatex('x_1')}) is HighscoolGPA. You've correctly
                identified that an omitted variable (OV) causes bias in the
                slope of the variable of interest ({inlineKatex('x_1')}), and
                the degree of this bias depends on (1) whether the OV is
                "hiding" in the error (meaning that it is correlated with
                {inlineKatex('y')}) and (2) whether the OV is correlated with
                the variable of interest ({inlineKatex('x_1')}).</>,
            d: <>Let's try again! Here the variable of interest
                ({inlineKatex('x_1')}) is HighSchoolGPA. Yes, it is correct
                that the variable SignificantOther has the lowest correlation
                with CollegeGPA and HighSchoolGPA. But for an omitted variable
                to cause OVB in the slope of the variable of interest, these
                correlations should not be low. We must check the correlation
                between the omitted variable and {inlineKatex('x_1')} and the
                correlation between the omitted variable and
                {inlineKatex('x_1')}. Remember an omitted variable (OV) causes
                bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is “hiding” in the error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            e: <>Let's try again! Here the variable of interest
                ({inlineKatex('x_1')}) is HighSchoolGPA. Yes, it is correct
                that the variable ClassesSkippedWeekly has some correlation
                with CollegeGPA and low correlation with HighSchoolGPA. But
                these correlations should not be low for an omitted variable to
                cause OVB in the slope of the variable of interest. We must
                check the correlation between the omitted variable and
                {inlineKatex('x_1')} and the correlation between the omitted
                variable and {inlineKatex('y')}. Remember an omitted variable
                (OV) causes bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in the error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest
                ({inlineKatex('x_1')}) .</>
        },
    },
    affairs_sim2: {
        q_id: 4,
        prompt: 'Which of the control variables causes the highest bias in ' +
            'the slope of the variable of interest when omitted? Why?',
        choices: [
            '(a) HasKids, because it is negatively correlated with ' +
                'RatingofMarriage.',
            '(b) Religion, because it is highly correlated with ' +
                'RatingofMarriage.',
            '(c) YearsMarried, because it is negatively correlated with ' +
                'RatingofMarriage.',
            '(d) YearsMarried, because it has the highest correlation with ' +
                'NumberOfAffairs and with RatingOfMarriage.',
            '(e) NumberOfAffairs because it is the variable of interest.'],
        answer: '(d) YearsMarried, because it has the highest correlation ' +
            'with NumberOfAffairs and with RatingOfMarriage.',
        feedback: {
            a: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is RatingOfMarriage. It is correct that
                HasKids is negatively correlated with {inlineKatex('x_1')}, but
                the magnitude of the correlation (not the sign) affects the
                OVB. Remember an omitted variable (OV) causes bias in the slope
                of the variable of interest ({inlineKatex('x_1')}), and the
                degree of this bias depends on (1) whether the OV is "hiding"
                in the error (meaning that it is correlated with
                {inlineKatex('y')}) and (2) whether the OV is correlated with
                the variable of interest ({inlineKatex('x_1')}).</>,
            b: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is RatingOfMarriage. Religion is not a
                variable we consider in this regression. So we do not know its
                correlation with {inlineKatex('x_1')} and with
                {inlineKatex('y')}. Remember an omitted variable (OV) causes
                bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in the error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            c: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is RatingOfMarriage. It is correct that
                YearsMarried is negatively correlated with
                {inlineKatex('x_1')}, but the magnitude of the correlation (not
                the sign) affects the OVB. Remember an omitted variable (OV)
                causes bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in the error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            d: <>Excellent! Here, the variable of interest
                ({inlineKatex('x_1')}) is RatingOfMarriage. You've correctly
                identified that an omitted variable (OV) causes bias in the
                slope of the variable of interest ({inlineKatex('x_1')}), and
                the degree of this bias depends on (1) whether the OV is
                "hiding" in the error (meaning that it is correlated with
                {inlineKatex('y')}) and (2) whether the OV is correlated with
                the variable of interest ({inlineKatex('x_1')}).</>,
            e: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is RatingOfMarriage and the variable
                NumberOfAffairs is the dependent variable, not the variable of
                interest. Nevertheless, the question does not ask about that.
                Remember an omitted variable (OV) causes bias in the slope of
                the variable of interest ({inlineKatex('x_1')}), and the degree
                of this bias depends on (1) whether the OV is "hiding" in the
                error (meaning that it is correlated with {inlineKatex('y')})
                and (2) whether the OV is correlated with the variable of
                interest ({inlineKatex('x_1')}).</>
        },
    },
    campus_sim2: {
        q_id: 5,
        prompt: 'Which of the control variables causes the highest bias in ' +
            'the slope of the variable of interest when omitted? Why?',
        choices: [
            '(a) Police, because it is highly correlated with Crime and ' +
                'TotalEnrollment.',
            '(b) Private, because it is negatively correlated with Crime.',
            '(c) Police, because it is not highly correlated with Crime and ' +
                'Enrollment.',
            '(d) Crime, because it is the variable of interest.',
            '(e) Crime, because it is the dependent variable.'],
        answer: '(a) Police, because it is highly correlated with Crime and ' +
            'TotalEnrollment.',
        feedback: {
            a: <>Excellent! Here, the variable of interest
                ({inlineKatex('x_1')}) is TotalEnrollment. You've correctly
                identified that an omitted variable (OV) causes bias in the
                slope of the variable of interest ({inlineKatex('x_1')}), and
                the degree of this bias depends on (1) whether the OV is
                "hiding" in the error (meaning that it is correlated with
                {inlineKatex('y')}) and (2) whether the OV is correlated with
                the variable of interest ({inlineKatex('x_1')}).</>,
            b: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is TotalEnrollment. We want to make sure
                that the sample slope of {inlineKatex('x_1')} is as unbiased as
                possible. It is correct that Private is negatively correlated
                with {inlineKatex('x_1')}, but the magnitude of the correlation
                (not the sign) affects the OVB. Remember an omitted variable
                (OV) causes bias in the slope of the variable of interest
                ({inlineKatex('x_1')}), and the degree of this bias depends on
                (1) whether the OV is "hiding" in error (meaning that it is
                correlated with {inlineKatex('y')}) and (2) whether the OV is
                correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            c: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is TotalEnrollment. This answer says the
                opposite of what is true: Police is highly correlated with
                {inlineKatex('x_1')} and {inlineKatex('y')}. Both correlations
                are 0.72. Remember an omitted variable (OV) causes bias in the
                slope of the variable of interest ({inlineKatex('x_1')}), and
                the degree of this bias depends on (1) whether the OV is
                "hiding" in error (meaning that it is correlated with
                {inlineKatex('y')}) and (2) whether the OV is correlated with
                the variable of interest ({inlineKatex('x_1')}).</>,
            d: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is TotalEnrollment, not Crime. Crime is
                the dependent variable and this is not what the question asks.
                Re-reading the question may be helpful. We want to make sure
                that the sample slope of {inlineKatex('x_1')} is as unbiased as
                possible. So, we must check all control variables one by one.
                Remember an omitted variable (OV) causes bias in the slope of
                the variable of interest ({inlineKatex('x_1')}), and the degree
                of this bias depends on (1) whether the OV is "hiding" in error
                (meaning that it is correlated with {inlineKatex('y')}) and (2)
                whether the OV is correlated with the variable of interest
                ({inlineKatex('x_1')}).</>,
            e: <>Let's try again! Here, the variable of interest
                ({inlineKatex('x_1')}) is TotalEnrollment. Yes, Crime is the
                dependent variable but this is not what the question asks.
                Re-reading the question may be helpful. We want to make sure
                that the sample slope of {inlineKatex('x_1')} is as unbiased as
                possible. So, we must check all control variables one by one.
                Remember an omitted variable (OV) causes bias in the slope of
                the variable of interest ({inlineKatex('x_1')}), and the degree
                of this bias depends on (1) whether the OV is "hiding" in error
                (meaning that it is correlated with {inlineKatex('y')}) and (2)
                whether the OV is correlated with the variable of interest
                ({inlineKatex('x_1')}).</>
        },
        
    }
};

export const sim2TextVariable = {
    income: <>In the &ldquo;Income&rdquo; dataset, our goal is to examine the
        relationship between the dependent
        variable, {inlineKatex('\\text{Income}')},
        and the key variable of
        interest, {inlineKatex('\\text{Years Of Education}')} of
        the household head:</>,
    gpa4: <>In the &ldquo;GPA&rdquo; dataset, our goal is to examine the
        relationship between the dependent
        variable, {inlineKatex('\\text{CollegeGPA}')}, and the key variable of
        interest, {inlineKatex('\\text{HighSchoolGPA}')}:</>,
    affairs_sim2: <>In the &ldquo;Affairs&rdquo; dataset, our goal is to
        examine the relationship between the dependent
        variable, ({inlineKatex('\\text{Number Of Affairs}')}), and the key
        variable of
        interest, {inlineKatex('\\text{Rating Of Marriage}')} satisfaction:</>,
    campus_sim2: <>In the &ldquo;Campus Crime Rates&rdquo; dataset, our goal is
        to examine the relationship between the dependent
        variable, {inlineKatex('\\text{Total Campus Crimes}')}, and the key
        variable of
        interest, {inlineKatex('\\text{Total Enrollment}')})of student:</>,
};

export const sim2TextControl = {
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
            yrsmarr: <>When {inlineKatex('\\text{Years Married}')} (
                {inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_2)')} and
                {inlineKatex('\\text{corr}(x_1, x_2)')}.</>,
            kids: <>When {inlineKatex('\\text{Has Kids}')} (
                {inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_3)')} and
                {inlineKatex('\\text{corr}(x_1, x_3)')}.</>,
            relig: <>When {inlineKatex('\\text{Degree Of Religiosity}')} (
                {inlineKatex('x_4')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_4)')} and
                {inlineKatex('\\text{corr}(x_1, x_4)')}.</>
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
            police: <>When {inlineKatex('\\text{Police Employed On Campus}')} (
                {inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_2)')} and
                {inlineKatex('\\text{corr}(x_1, x_2)')}.</>,
            campus: <>When {inlineKatex('\\text{Private School}')} (
                {inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_3)')} and
                {inlineKatex('\\text{corr}(x_1, x_3)')}.</>
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
            ACT: <>When {inlineKatex('\\text{ACT Score}')} (
                {inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_2)')} and
                {inlineKatex('\\text{corr}(x_1, x_2)')}.</>,
            campus: <>When {inlineKatex('\\text{Lives On Campus}')} (
                {inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_3)')} and
                {inlineKatex('\\text{corr}(x_1, x_3)')}.</>,
            skipped: <>When {inlineKatex('\\text{Classes Skipped Weekly}')} (
                {inlineKatex('x_4')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_4)')} and
                {inlineKatex('\\text{corr}(x_1, x_4)')}.</>,
            bgfriend: <>When {inlineKatex('\\text{Significant Other}')} (
                {inlineKatex('x_5')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_5)')} and
                {inlineKatex('\\text{corr}(x_1, x_5)')}.</>
        }
    },
    income: {
        intro: <>In this case, OVB can lead to inaccurate estimates of the
            relationships between {inlineKatex('\\text{Income}')} and
        {inlineKatex('\\text{Years Of Education}')}.</>,
        general_inst: <>These are control variables whose omission could lead
            to OVB and distort the estimates of the
            relationships between {inlineKatex('\\text{Income}')} and
        {inlineKatex('\\text{Years Of Education}')}.</>,
        control_inst: {
            consump: <>When {inlineKatex('\\text{Consumption}')} (
                {inlineKatex('x_2')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_2)')} and
                {inlineKatex('\\text{corr}(x_1, x_2)')}.</>,
            black: <>When {inlineKatex('\\text{Black}')} (
                {inlineKatex('x_3')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_3)')} and
                {inlineKatex('\\text{corr}(x_1, x_3)')}.</>,
            size: <>When {inlineKatex('\\text{Family Size}')} (
                {inlineKatex('x_4')}) is included, notice the changes in
                {inlineKatex('\\hat{\\beta_1}')}, the correlation coefficients
                {inlineKatex('\\text{corr}(y, x_4)')} and
                {inlineKatex('\\text{corr}(x_1, x_4)')}.</>,
        }
    },
};

export const sim2Information = {
    affairs_sim2: <><b>Source: </b> R.C. Fair, &ldquo;A Theory of Extramarital
        Affairs,&rdquo; <i>Journal of Political Economy</i> 1997.</>,
    campus_sim2: <><b>Source: </b> These data were collected by Daniel Martin,
        a former undergraduate at MSU, for a final project. The data are
        sourced from the FBI Uniform Crime Reports for the year 1992.</>,
    gpa4: <><b>Source: </b> Wooldridge, J.M., <i>Introductory to
        Econometrics,</i> South-Western Cengage Learning 5<sup>th</sup> ed.
        2012.</>,
    income: <><b>Source: </b> Hill, Carter R., <i>Principles of
        Econometrics,</i> 5<sup>th</sup> ed. Wiley Publishing 2018.</>,
};
