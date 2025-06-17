// [LinearExample, QuadraticExample, CubicExample, Mystery, RealData1,
//      RealData2]
export const CLEARSET = [false, false, false, false, false, false];

// [Linear, Quadratic, Cubic]
export const CLEARREG = [false, false, false];

export const showOne = (idx) => CLEARSET.map((x, i) => i===idx ? true : x);