import React, { useState } from 'react';
import { ScatterPlot } from './scatterPlot';

export const SimulationOne = () => {
    const [N, setN] = useState(50);
    const [correlation, setCorrelation] = useState(0.7);
    const [seed, setSeed] = useState('seedString');

    const handleNChange = (e) => {
        setN(Math.max(50, parseInt(e.target.value, 10)));
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
                <input type="number" value={N} onChange={handleNChange} />
            </label>
            <label>
        r:
                <input type="number" step="0.01" min="0" max="1"
                    value={correlation} onChange={handleCorrelationChange} />
            </label>
            <label>
        Seed:
                <input type="text" value={seed} onChange={handleSeedChange} />
            </label>
            <ScatterPlot N={N} correlation={correlation} seed={seed} />
        </div>
    );
};