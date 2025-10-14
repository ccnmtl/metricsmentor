
import { dataAttr, dataIndex, dataRange, labelIndex, takeaways2,
    sim2TextVariable as varText, sim2TextControl as controlText,
    sim2Information as info } from '../dataAttr';


const knownDatasets = ['affairs_sim2', 'campus_sim2', 'gpa4', 'income'];

describe('Simulation 2 Object types', () => {
    test('dataAttr object is defined', () => {
        expect(dataAttr).toBeDefined();
    });
    test('labelIndex object is defined', () => {
        expect(labelIndex).toBeDefined();
    });
    test('takeaways2 object is defined', () => {
        expect(takeaways2).toBeDefined();
    });
    test('varText object is defined', () => {
        expect(varText).toBeDefined();
    });
    test('controlText object is defined', () => {
        expect(controlText).toBeDefined();
    });
    test('info object is defined', () => {
        expect(info).toBeDefined();
    });
});

describe('dataAttr object properties', () => {
    // Ordering must be precise, the follow order in the dataAttr definition
    const attrKeys = Object.keys(dataAttr);

    test('dataAttr object has all known datasets and no others', () => {
        expect(attrKeys).toEqual(knownDatasets);
    });

    for (const dataset in dataAttr) {
        for (const variable in dataAttr[dataset]) {
            test(`${dataset}.${variable} has the known keys`, () => {
                for (const key of ['intercept', 'corr_y', 'stderr']) {
                    expect(dataAttr[dataset][variable]).toHaveProperty(key);
                }
            });
        }
    }
});

describe('dataIndex object properties', () => {
    const indexKeys = Object.keys(dataIndex);

    test('dataIndex object has all known datasets and no others', () => {
        expect(indexKeys).toEqual(knownDatasets);
    });

    for (const dataset of knownDatasets) {
        test(`${dataset} has the known keys`, () => {
            for (const key of ['option', 'x_1', 'x_2', 'y']) {
                expect(dataIndex[dataset]).toHaveProperty(key);
            }
        });
    }
});

describe('dataRange object properties', () => {
    const rangeKeys = Object.keys(dataRange);

    test('dataRange object has all known datasets and no others', () => {
        expect(rangeKeys).toEqual(knownDatasets);
    });

    for (const dataset in dataRange) {
        for (const variable in dataRange[dataset]) {
            if (variable === 'xRange') {
                test(`${dataset}.${variable} has the correct length`, () => {
                    expect(dataRange[dataset][variable]).toHaveLength(2);
                });
            } else {
                test(`${dataset}.${variable} has the known keys`, () => {
                    for (const key of ['label', 'color', 'y']) {
                        expect(dataRange[dataset][variable])
                            .toHaveProperty(key);
                    }
                });
            }
        }
    }
});

describe('labelIndex object properties', () => {
    const knownLabels = ['ACT', 'affairs_sim2', 'bgfriend', 'black', 'campus',
        'campus_sim2', 'colGPA', 'crime', 'educ', 'enroll', 'gpa4',
        'hsGPA', 'income', 'kids', 'naffairs', 'pIncome', 'police', 'priv',
        'ratemarr', 'relig', 'size', 'skipped', 'yrsmarr',
    ];
    const labelIndexKeys = Object.keys(labelIndex);

    test('labelIndex object has all known labels and no others', () => {
        expect(labelIndexKeys).toEqual(knownLabels);
    });
});

describe('takeaways2 object properties', () => {
    const takeawaysKeys = Object.keys(takeaways2);
    const knownTakeaways = ['general', 'income', 'gpa4', 'affairs_sim2',
        'campus_sim2'];

    test('takeaways2 object has all known datasets and no others', () => {
        expect(takeawaysKeys).toEqual(knownTakeaways);
    });

    for (const takeaway of knownTakeaways) {
        test(`${takeaway} has the known keys`, () => {
            const knownKeys = ['q_id', 'prompt', 'choices', 'answer',
                'feedback'];
            expect(Object.keys(takeaways2[takeaway])).toEqual(knownKeys);
        });
    }
});

describe('sim2TextVariable object properties', () => {
    const varTextKeys = Object.keys(varText);
    const knownVarText = ['income', 'gpa4', 'affairs_sim2',
        'campus_sim2'];

    test('sim2TextVariable object has all known datasets and no others', () => {
        expect(varTextKeys).toEqual(knownVarText);
    });
});

describe('sim2TextControl object properties', () => {
    const controlTextKeys = Object.keys(controlText);

    test('sim2TextControl object has all known datasets and no others', () => {
        expect(controlTextKeys).toEqual(knownDatasets);
    });

    for (const control of knownDatasets) {
        test(`${control} has the known keys`, () => {
            const knownKeys = ['intro', 'general_inst', 'control_inst'];
            expect(Object.keys(controlText[control])).toEqual(knownKeys);
        });
        test(`${control}.control_inst has the minimum required data`, () => {
            expect(Object.keys(controlText[control]['control_inst']).length)
                .toBeGreaterThan(1);
        });
    }
});

describe('sim2Information object properties', () => {
    const infoKeys = Object.keys(info);

    test('sim2Information object has all known datasets and no others', () => {
        expect(infoKeys).toEqual(knownDatasets);
    });
});
