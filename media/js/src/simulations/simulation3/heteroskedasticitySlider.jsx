import React from 'react';
import PropTypes from 'prop-types';

export const HeteroskedasticitySlider = ({
    heteroskedasticity, setHeteroskedasticity }) => (
    <div className="slider-end-to-end__box mt-4">
        <label htmlFor="skedasticityscale" className="h2 form-label">
            Degree of skedasticity
        </label>
        <p>
            Move the slider to adjust the level of heteroskedasticity in
            the dataset, and see how the plot pattern changes on the graph.
        </p>
        <div className="slider-end-to-end__input">
            <input
                id="skedasticityscale"
                className="form-range"
                type="range"
                min="0"
                max="4.5"
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
