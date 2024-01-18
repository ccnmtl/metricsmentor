import React, { useState } from 'react';
import { ScatterPlot } from './scatterPlot';

export const SimulationOne = () => {
    const [N, setN] = useState(50);
    const [correlation, setCorrelation] = useState(0.5);
    const [seed, setSeed] = useState('seedString');

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
            <label>
                N:
                <input type='number' min='50'
                    value={N} onChange={handleNChange} />
            </label>
            <label>
                R:
                <input type='number' step='0.01' min='-1' max='1'
                    value={correlation} onChange={handleCorrelationChange} />
            </label>
            <label>
                Seed:
                <input type='text' value={seed} onChange={handleSeedChange} />
            </label>
            <ScatterPlot N={N} correlation={correlation} seed={seed} />
        </div>
    );
};