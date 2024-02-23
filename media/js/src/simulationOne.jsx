import React, { useState, useEffect } from 'react';
import { ScatterPlot } from './scatterPlot';
import { Katex } from './katexComponent';

export const SimulationOne = () => {
    const [N, setN] = useState(50);
    const [correlation, setCorrelation] = useState(0.5);
    const [seed, setSeed] = useState('seedString');
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);
    const [stderror, setStderror] = useState(null);
    const [appRvalue, setAppRvalue] = useState(null);
    const [userBetaOneHat, setUserBetaOneHat] = useState(0);
    const [userSE, setUserSE] = useState(0);
    const [betaOneError, setBetaOneError] = useState(false);
    const [userSEError, setUserSEError] = useState(false);


    useEffect(() => {

        if (intercept !== null) {
            const isBetaOneHatValid =
                parseFloat(intercept.toFixed(3)) === parseFloat(userBetaOneHat);
            const isStdErrorValid =
                parseFloat(stderror.toFixed(3)) === parseFloat(userSE);

            setBetaOneError(!isBetaOneHatValid);
            setUserSEError(!isStdErrorValid);
        }
    }, [intercept, stderror, userBetaOneHat, userSE]);


    const handleNChange = (e) => {
        setN(parseInt(e.target.value));
    };

    const handleCorrelationChange = (e) => {
        setCorrelation(parseFloat(e.target.value));
    };

    const handleSeedChange = (e) => {
        setSeed(e.target.value);
    };

    const handleBetaOneHatChange = (e) => {
        setUserBetaOneHat(e.target.value);
    };

    const handleUserSEChange = (e) => {
        setUserSE(e.target.value);
    };

    const tEquation =
    't = \\frac{\\hat{\\beta}_1 - \\beta_1}{SE(\\hat{\\beta_1})}';

    return (
        <div>
            <div className='row'>
                <div className='col-2'>
                    <div className='row ms-2 mt-5'>
                        <label className='fst-italic'> n:
                            <input type='number' min='50' max='500'
                                className='ms-2 mt-2'
                                value={N} onChange={handleNChange} />
                        </label>
                    </div>
                    <div className='row ms-2 mt-2'>
                        <label htmlFor='correlation'
                            className='form-label fst-italic'>
                            r : {correlation}
                        </label>
                        <input type='range' step='0.01' min='-1'
                            max='1' value={correlation}
                            className='form-range'
                            id='correlation'
                            onChange={handleCorrelationChange} />
                    </div>
                    <div className='row ms-2 mt-2'>
                        <label> Seed:
                            <input type='text' value={seed}
                                className='ms-1 mt-2' size='10'
                                onChange={handleSeedChange} />
                        </label>
                    </div>
                    {slope !== null && (
                        <>
                            <div>
                                <div className='row ms-2 mt-2'>
                                    <label className='form-label fst-italic'>
                                        App r = {appRvalue.toFixed(2)}
                                    </label>
                                </div>
                                <div className='row ms-2 mt-3'>
                                    <Katex tex={
                                        'y = \\hat{\\beta_0} + \\hat{\\beta_1}x'
                                    } />
                                </div>
                                <div className='row ms-3 mt-2'>

                                y = {slope.toFixed(2)} + {intercept.toFixed(3)}x
                                </div>
                                <div className='row ms-2 mt-2'>
                                    <label>
                                        <Katex tex={
                                            // eslint-disable-next-line max-len
                                            `\\hat{\\beta_0} = ${slope.toFixed(3)}`
                                        } />
                                    </label>
                                </div>
                                <div className='row ms-2'>
                                    <label>
                                        <Katex tex={
                                            // eslint-disable-next-line max-len
                                            `\\hat{\\beta_1} = ${intercept.toFixed(3)}`
                                        } />
                                    </label>
                                </div>
                                <div className='row ms-2'>
                                    <label>
                                        <Katex tex={
                                            `{SE} = ${stderror.toFixed(3)}`} />
                                    </label>
                                </div>
                                <div className='row ms-2'>
                                    <label>
                                        <Katex tex={'\\Eta_0 = 0'} />
                                    </label>
                                </div>
                                <div className='row ms-2 mt-2 mb-3'>
                                    <Katex tex={tEquation} />
                                </div>

                                <div className='row ms-2'>
                                    <div className='input-group mb-3'>
                                            t =
                                        <input type='text'
                                            style={{ width: '10%', borderColor:
                                             betaOneError ? 'red' : 'green' }}
                                            onChange={handleBetaOneHatChange}
                                            className='form-control me-1 ms-1
                                                form-control-sm box-2' />
                                            -
                                        <input type='text'
                                            style={{width: '10%'}}
                                            defaultValue={0}
                                            className='form-control
                                                 me-1 ms-1
                                            form-control-sm box-2' />
                                            /
                                        <input type='text'
                                            style={{ width: '10%', borderColor:
                                             userSEError ? 'red' : 'green' }}
                                            onChange={handleUserSEChange}
                                            className='form-control me-1 ms-1
                                             form-control-sm box-2' />
                                    </div>
                                </div>
                                {(!betaOneError && !userSEError) && (
                                    <div className='row ms-5'>
                                        = {(slope / stderror).toFixed(3)}
                                    </div>
                                )}
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