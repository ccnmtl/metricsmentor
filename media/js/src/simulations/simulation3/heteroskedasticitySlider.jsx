import React from 'react';
import PropTypes from 'prop-types';

export const HeteroskedasticitySlider = ({
    heteroskedasticity, setHeteroskedasticity }) => (
    <div className='mt-3 me-2'>
        <label className='me-2'>Homoskedasticity</label>
        <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={heteroskedasticity}
            onChange={(e) => setHeteroskedasticity(parseFloat(e.target.value))}
        />
        <span>{' Heteroskedasticity'}</span>
    </div>
);

HeteroskedasticitySlider.propTypes = {
    heteroskedasticity: PropTypes.number,
    setHeteroskedasticity: PropTypes.func,
};
