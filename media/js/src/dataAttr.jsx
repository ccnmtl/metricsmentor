export const dataAttr = {
    affairs_sim2: {
        y: 'naffairs', x_1: 'ratemarr', x_2: 'yrsmarr', x_3: 'kids',
        x_4: 'relig', option: ['yrsmarr', 'kids', 'relig'],
        lines: {
            kids: {
                color: 'blue',
                slope_x1: -0.8058041745258251,
                slope_x2: 0.3734252198363703,
                intercept: 4.3569757402244385,
                rvalue: 0.2839710442879558,
                pvalue: 1.2085334764264147e-11,
                stderr: [0.11957141232875783, 0.29211517390613817],
                y: [3.5511715656986134, 0.327954867595313]},
            ratemarr: {
                color: 'black',
                slope: -0.8358056930354658,
                intercept: 4.7421112356785455,
                rvalue: -0.2795124030877028,
                pvalue: 3.0023849453265713e-12,
                stderr: 0.11730764986950648,
                y: [3.9063055426430795, 0.5630827705012162]},
            relig: {
                color: 'green',
                slope_x1: -0.8257951388135357,
                slope_x2: -0.3893257480858143,
                intercept: 5.916074940401193,
                rvalue: 0.3116127911267844,
                pvalue: 5.443674668848163e-14,
                stderr: [0.11622540900511184, 0.10982137487361453],
                y: [5.090279801587657, 1.787099246333515]},
            yrsmarr: {
                color: 'red',
                slope_x1: -0.7439477526411793,
                slope_x2: 0.07481479697237943,
                intercept: 3.769133360075278,
                rvalue: 0.30520353035387515,
                pvalue: 2.010097029919113e-13,
                stderr: [0.12004702370206882, 0.023770635175483053],
                y: [3.025185607434099, 0.04939459686938186]}},
        xRange: [1, 5]
    },
    campus_sim2: {
        y: 'crime', x_1: 'enroll', x_2: 'police', x_3: 'priv',
        option: ['police', 'priv'],
        lines: {
            enroll: {
                color: 'black',
                slope: 0.03132256331276791,
                intercept: -109.09889861144495,
                rvalue: 0.8360443733017533,
                pvalue: 1.6662856756136525e-26,
                stderr: 0.0021089724865799337,
                y: [-52.749607211775476, 1655.9275440630267]
            },
            police: {
                color: 'red',
                slope_x1: 0.02444318631665605,
                slope_x2: 7.570163107067483,
                intercept: -153.6529449294996,
                rvalue: 0.8551001883831881,
                pvalue: 1.5256466069158192e-27,
                stderr: [0.0028658972220450126, 2.2550427205573156],
                y: [-109.67965274583537, 1223.7206040140688]
            },
            priv: {
                color: 'blue',
                slope_x1: 0.03171574186506053,
                slope_x2: 48.093860202286464,
                intercept: -121.36953073457738,
                rvalue: 0.8366919017268004,
                pvalue: 2.636753503440709e-25,
                stderr: [0.0022213340564633884, 82.5476225565243],
                y: [-64.31291111933349, 1665.8125233615833]}},
        xRange: [1799, 56350]
    },
    gpa4: {
        y: 'colGPA', x_1: 'hsGPA', x_2: 'ACT', x_3: 'campus', x_4: 'skipped',
        x_5: 'bgfriend', option: ['ACT', 'campus', 'skipped', 'bgfriend'],
        lines: {
            ACT: {
                color: 'red',
                slope_x1: 0.45345583764326347,
                slope_x2: 0.009426014230386415,
                intercept: 1.2863278738569552,
                rvalue: 0.4200256840512297,
                pvalue: 0.0000015263084256855218,
                stderr: [0.09581291429545223, 0.010777187755821298],
                y: [2.3746218842007876, 3.100151224430009]},
            bgfriend: {
                color: 'purple',
                slope_x1: 0.4872991539347168,
                slope_x2: 0.0827331866654788,
                intercept: 1.3595707258931153,
                rvalue: 0.4292333465691946,
                pvalue: 7.902409589769076e-7,
                stderr: [0.08953713206893846, 0.057157456868814425],
                y: [2.5290886953364353,3.3087673416319827]},
            campus: {
                color: 'blue',
                slope_x1: 0.48418386222864107,
                slope_x2: -0.0718382642527241,
                intercept: 1.4217100683048696,
                rvalue: 0.4208919553710245,
                pvalue: 0.0000014359029323904842,
                stderr: [0.08988126049111869, 0.07624187733282699],
                y: [2.583751337653608, 3.358445517219434]},
            hsGPA: {
                color: 'black',
                slope: 0.4824345192136363,
                intercept: 1.41543376690226,
                rvalue: 0.414555492006426,
                pvalue: 3.2111049330890723e-7,
                stderr: 0.08982581463117764,
                y: [2.573276613014987, 3.3451718437568054]},
            skipped: {
                color: 'green',
                slope_x1: 0.458803823753049,
                slope_x2: -0.07743486572824014,
                intercept: 1.5791669973044147,
                rvalue: 0.47194591532798374,
                pvalue: 2.8141541216993672e-8,
                stderr: [0.08769080379633878, 0.02576455864084471],
                y: [2.6802961743117324, 3.4143822923166107]}},
        xRange: [2.4, 4]
    },
    income: {
        y: 'income', x_1: 'educ', x_2: 'consump', x_3: 'black', x_4: 'size',
        option: ['consump', 'black', 'size'],
        lines: {
            black: {
                color: 'blue',
                slope_x1: 723.0766408376959,
                slope_x2: -1079.2144307155327,
                intercept: 1643.5575092495678,
                rvalue: 0.4593386463350375,
                pvalue: 0.000010196436926211295,
                stderr: [151.06917970635462, 2023.828543435606],
                y: [3089.71079092496, 16105.090326003485]},
            consump: {
                color: 'red',
                slope_x1: 356.4948784653723,
                slope_x2: 0.7440778161147117,
                intercept: -406.5162565221285,
                rvalue: 0.8574167454329786,
                pvalue: 1.0337777676551983e-28,
                stderr: [89.36701581601041, 0.05358319886455758],
                y: [306.47350040861613, 6723.381312785317]},
            educ: {
                color: 'black',
                intercept: 1342.7452839878079,
                pvalue: 0.0000017766347577202222,
                rvalue: 0.45681394554225285,
                slope: 742.5297682221236,
                stderr: 146.06219699450784,
                y: [2827.804820432055, 16193.34064843028]},
            size: {
                color: 'green',
                slope_x1: 743.0953924000139,
                slope_x2: -388.7368614590272,
                intercept: 3027.200703354606,
                rvalue: 0.4684926833562163,
                pvalue: 0.000006032261586346303,
                stderr: [145.8080826323035, 335.4436561170981],
                y: [4513.391488154633, 17889.108551354886]},},
        xRange: [2, 20]
    }
};