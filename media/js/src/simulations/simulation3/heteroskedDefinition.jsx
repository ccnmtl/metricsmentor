import React from 'react';
import { GenericModal } from '../../Modal';

export const HeteroskedDefinition = () => {
    return (
        <GenericModal
            modalId="heteroskedDefinition"
            title="Definition for Heteroskedasticity Module"
            bodyContent={
                <p>
                    This is the definition space for the Heteroskedasticity
                    Module.
                </p>
            }
        />
    );
};