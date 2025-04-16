import React from 'react';
import { PromptBlock } from '../../PromptBlock';


export const WhatAreNonLinearRegressions = () => {

    return (
        <>
            <p>
               Let&apos;s now learn about why non-linear regressions are
               important. Very brief prelude to get user oriented with
               this learning segment.
            </p>
            <PromptBlock
                text="But first, take a moment to familiarize yourself with
                    the definition of non-linear regressions; it&rsquo;ll help
                    as you continue with this exercise." />
            <button
                className="btn btn-sm btn-primary mb-5"
                data-bs-toggle="modal"
                data-bs-target="#nonlineardDefinition"
            >
                Non-linear regressions
            </button>
            <h2>
                Non-linear regression plots
            </h2>
            <p>Transition paragraph to lead to the exercise</p>
            <PromptBlock list={[
                'Look at the pattern of each dataset',
                'Observe regression lines of each dataset',
                'Any adiditional instructions here'
            ]} />
        </>
    );
};