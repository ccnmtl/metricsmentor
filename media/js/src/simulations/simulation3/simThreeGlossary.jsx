import React from 'react';
import { GenericModal } from '../../Modal';

export const SimThreeGlossary = () => {
    return (
        <GenericModal
            modalId="simulationThreeGlossary"
            title="Glossary of Terms"
            bodyContent={
                <p>
                    This is the definition space Glossary for Simulation 3.
                </p>
            }
        />
    );
};