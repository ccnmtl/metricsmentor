import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';
import 'katex/dist/katex.css';

export const Katex = ({tex, displayMode = false, className = ''}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        katex.render(tex, containerRef.current, { displayMode });
    });

    return <span ref={containerRef} className={className} />;
};


Katex.propTypes = {
    tex: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    className: PropTypes.string
};