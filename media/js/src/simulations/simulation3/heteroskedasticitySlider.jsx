import React from 'react';
import PropTypes from 'prop-types';

export const HeteroskedasticitySlider = ({
    heteroskedasticity, setHeteroskedasticity }) => (
        <div className="slider-end-to-end__box">
            <label htmlFor="skedasticityscale" className="h2 form-label">
                Degree of skedasticity
            </label>
            <div className="slider-end-to-end__input">
                <input
                    id="skedasticityscale"
                    className="form-range"
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={heteroskedasticity}
                    onChange={(e) =>
                        setHeteroskedasticity(parseFloat(e.target.value))}
                />
            </div>
            <div className="slider-end-to-end__scale">
                <div className="unit"></div>
                <div className="unit"></div>
            </div>
        </div>
);

HeteroskedasticitySlider.propTypes = {
    heteroskedasticity: PropTypes.number,
    setHeteroskedasticity: PropTypes.func,
};
