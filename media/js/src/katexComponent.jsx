import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';
import 'katex/dist/katex.css';

export const Katex = ({tex}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        katex.render(tex, containerRef.current);
    });

    return <div ref={containerRef} />;
};


Katex.propTypes = {
    tex: PropTypes.string.isRequired
};