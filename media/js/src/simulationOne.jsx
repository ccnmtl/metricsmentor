import React, { useState } from 'react';
import { ScatterPlot } from './scatterPlot';

export const SimulationOne = () => {
    const [N, setN] = useState(50);
    const [correlation, setCorrelation] = useState(0.5);
    const [seed, setSeed] = useState('seedString');
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [stderror, setStderror] = useState(null);
    const [appRvalue, setAppRvalue] = useState(null);

    const handleNChange = (e) => {
        setN(parseInt(e.target.value));
    };

    const handleCorrelationChange = (e) => {
        setCorrelation(parseFloat(e.target.value));
    };

    const handleSeedChange = (e) => {
        setSeed(e.target.value);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-2'>
                    <div className='row ms-2 mt-5'>
                        <label> Sample size, N:
                            <input type='number' min='50' max='500'
                                className='ms-2 mt-2'
                                value={N} onChange={handleNChange} />
                        </label>
                    </div>
                    <div className='row ms-2'>
                        <label htmlFor="correlation" className="form-label">
                        Correlation coefficient, r : {correlation} </label>
                        <input type='range' step='0.01' min='-1'
                            max='1' value={correlation}
                            className='form-range'
                            id='correlation'
                            onChange={handleCorrelationChange} />
                    </div>
                    <div className='row ms-2'>
                        <label> Seed:
                            <input type='text' value={seed}
                                className='ms-2 mt-2'
                                onChange={handleSeedChange} />
                        </label>
                    </div>
                    {slope !== null && (
                        <>
                            <div>
                                <div className='row ms-4 mt-2'>
                                    y= β&#770; 0 + β&#770; 1x
                                </div>
                                <div className='row ms-4 mt-2'>
                                    y = {slope} + {intercept}x
                                </div>
                                <div className='row ms-2 mt-2'>
                                    <label> Slope: {slope} </label>
                                </div>
                                <div className='row ms-2'>
                                    <label> Application R: {appRvalue} </label>
                                </div>
                                <div className='row ms-2'>
                                    <label> Intercept: {intercept} </label>
                                </div>
                                <div className='row ms-2'>
                                    <label> StdErr: {stderror} </label>
                                </div>
                                <div className='row ms-2'>
                                    <label>
                                        t = {slope.toFixed(2)} - 0 /
                                        {stderror.toFixed(2)}
                                    </label>
                                </div>
                            </div>
                            <div>

                            </div>
                        </>
                    )}
                </div>
                <div className='col-10' style={{height: '100%'}}>
                    <ScatterPlot
                        N={N}
                        correlation={correlation}
                        seed={seed}
                        slope={slope}
                        setSlope={setSlope}
                        stderror={stderror}
                        setStderror={setStderror}
                        intercept={intercept}
                        setIntercept={setIntercept}
                        appRvalue={appRvalue}
                        setAppRvalue={setAppRvalue}
                    />
                </div>
            </div>
        </div>
    );
};