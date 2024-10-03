
import { dataAttr, labelIndex, takeaways2, sim2TextVariable as varText,
    sim2TextControl as controlText, sim2Information as info } from './dataAttr';

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
    const knownDatasets = ['affairs_sim2', 'campus_sim2', 'gpa4', 'income'];
    const attrKeys = Object.keys(dataAttr);

    test('dataAttr object has all known datasets and no others', () => {
        expect(attrKeys).toEqual(knownDatasets);
    });

    for (const dataset of knownDatasets) {
        test(`${dataset} has the known keys`, () => {
            const knownKeys = ['y', 'x_1', 'option',
                'lines', 'xRange'];
            for (const key of knownKeys) {
                expect(dataAttr[dataset]).toHaveProperty(key);
            }
        });
        const lineKeys = ['label', 'color', 'intercept',
            'corr_y', 'stderr', 'y'];
        const lines = dataAttr[dataset]['lines'];
        for (const dataType in lines) {
            test(
                `${dataset}.lines.${dataType} havs the base properties`,
                () => {
                    for (const key of lineKeys) {
                        expect(lines[dataType]).toHaveProperty(key);
                    }
                }
            );
        }
    }
});

describe('labelIndex object properties', () => {
    const knownLabels = ['ACT', 'affairs_sim2', 'bgfriend', 'black', 'campus',
        'campus_sim2', 'colGPA', 'consump', 'crime', 'educ', 'enroll', 'gpa4',
        'hsGPA', 'income', 'kids', 'naffairs', 'police', 'priv', 'ratemarr',
        'relig', 'size', 'skipped', 'yrsmarr',
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
            const knownKeys = ['q_id', 'prompt', 'options', 'answer',
                'feedback_bad', 'feedback_good'];
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
    const knownControlText = ['income', 'gpa4', 'affairs_sim2',
        'campus_sim2'];

    test('sim2TextControl object has all known datasets and no others', () => {
        expect(controlTextKeys).toEqual(knownControlText);
    });

    for (const control of knownControlText) {
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
    const knownInfo = ['income', 'gpa4', 'affairs_sim2',
        'campus_sim2'];

    test('sim2Information object has all known datasets and no others', () => {
        expect(infoKeys).toEqual(knownInfo);
    });
});
