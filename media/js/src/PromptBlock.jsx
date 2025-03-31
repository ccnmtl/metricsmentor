import React from 'react';
import { STATIC_URL } from './utils/utils';
import PropTypes from 'prop-types';

export const PromptBlock = ({ text }) => {
    return (
        <div className="prompt-block">
            <div className="prompt-gfx">
                <img className="prompt-img" alt="Reminder:"
                    src={`${STATIC_URL}img/icon-bell.svg`} />
            </div>
            <p className="mb-2">
                {text}
            </p>
        </div>
    );
};

PromptBlock.propTypes = {
    text: PropTypes.node.isRequired
};
