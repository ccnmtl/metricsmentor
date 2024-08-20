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
                rvalue: 0.28,
                pvalue: 1.21e-11,
                stderr: [0.12, 0.29],
                y: [3.55, 0.33]},
            ratemarr: {
                label: 'x1',
                color: 'black',
                slope: -0.84,
                intercept: 4.74,
                rvalue: -0.28,
                pvalue: 3.00e-12,
                stderr: 0.12,
                y: [3.91, 0.56]},
            relig: {
                label: 'x4',
                color: 'green',
                slope_x1: -0.83,
                slope_x2: -0.39,
                intercept: 5.92,
                rvalue: 0.31,
                pvalue: 5.44e-14,
                stderr: [0.12, 0.11],
                y: [5.09, 1.79]},
            yrsmarr: {
                label: 'x2',
                color: 'red',
                slope_x1: -0.74,
                slope_x2: 0.07,
                intercept: 3.77,
                rvalue: 0.31,
                pvalue: 2.01e-13,
                stderr: [0.12, 0.02],
                y: [3.03, 0.05]}},
        question: ['The ',
            'second takeaway question is specific',
            ' to the data set. It goes here.'],
        answers: [
            'Answer choice 1',
            'Answer choice 2',
            'Answer choice 3',
            'Answer choice 4'],
        correct: 'Answer choice 4',
        explanation: 'This is the wrong answer, try again. Maybe some small ' +
            'explanation from Seyhan.',
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
                rvalue: 0.84,
                pvalue: 1.67e-26,
                stderr: 0.00,
                y: [-52.75, 1655.93]
            },
            police: {
                label: 'x2',
                color: 'red',
                slope_x1: 0.02,
                slope_x2: 7.57,
                intercept: -153.65,
                rvalue: 0.86,
                pvalue: 1.53e-27,
                stderr: [0.00, 2.26],
                y: [-109.68, 1223.72]
            },
            priv: {
                label: 'x3',
                color: 'cyan',
                slope_x1: 0.032,
                slope_x2: 48.09,
                intercept: -121.37,
                rvalue: 0.84,
                pvalue: 2.64e-25,
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
                rvalue: 0.42,
                pvalue: 0.00,
                stderr: [0.10, 0.01],
                y: [2.37, 3.10]},
            bgfriend: {
                label: 'x5',
                color: 'purple',
                slope_x1: 0.49,
                slope_x2: 0.08,
                intercept: 1.36,
                rvalue: 0.43,
                pvalue: 7.90e-7,
                stderr: [0.09, 0.06],
                y: [2.53, 3.31]},
            campus: {
                label: 'x3',
                color: 'cyan',
                slope_x1: 0.48,
                slope_x2: -0.07,
                intercept: 1.42,
                rvalue: 0.42,
                pvalue: 0.00,
                stderr: [0.09, 0.08],
                y: [2.58, 3.36]},
            hsGPA: {
                label: 'x1',
                color: 'black',
                slope: 0.48,
                intercept: 1.42,
                rvalue: 0.42,
                pvalue: 3.21e-7,
                stderr: 0.09,
                y: [2.57, 3.35]},
            skipped: {
                label: 'x4',
                color: 'green',
                slope_x1: 0.46,
                slope_x2: -0.08,
                intercept: 1.58,
                rvalue: 0.47,
                pvalue: 2.81e-8,
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
                rvalue: 0.46,
                pvalue: 0.00,
                stderr: [151.07, 2023.83],
                y: [3089.71, 16105.09]},
            consump: {
                label: 'x2',
                color: 'red',
                slope_x1: 356.49,
                slope_x2: 0.74,
                intercept: -406.52,
                rvalue: 0.86,
                pvalue: 1.03e-28,
                stderr: [89.37, 0.05],
                y: [306.47, 6723.38]},
            educ: {
                label: 'x1',
                color: 'black',
                intercept: 1342.75,
                pvalue: 0.00,
                rvalue: 0.46,
                slope: 742.53,
                stderr: 146.06,
                y: [2827.80, 16193.34]},
            size: {
                label: 'x4',
                color: 'green',
                slope_x1: 743.10,
                slope_x2: -388.74,
                intercept: 3027.20,
                rvalue: 0.47,
                pvalue: 0.00,
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
    gpa4: 'GPA4',
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