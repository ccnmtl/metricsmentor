import React from 'react';
import { GenericModal } from '../../Modal';

export const MulticollinearityGlossary = () => {
    return (
        <GenericModal
            modalId="MulticollinearityGlossary"
            title="Glossary for Multicollinearity Module"
            bodyContent={
                <p>
                    This is the glossary space for the Multicollinearity Module.
                </p>
            }
        />
    );
};