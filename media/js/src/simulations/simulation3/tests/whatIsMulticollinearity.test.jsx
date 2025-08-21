import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhatIsMulticollinearity } from '../whatIsMulticollinearity';

describe('WhatIsMulticollinearity', () => {
    const mockHandleControls = jest.fn();
    const mockHandleProgress = jest.fn();
    const controls = [false, false];

    it('renders the definition and prompt', () => {
        render(
            <WhatIsMulticollinearity
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
            />
        );
        expect(screen.getByText(/definition of multicollinearity/i))
            .toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /Definition: Multicollinearity/i })).toBeInTheDocument();
    });

    it('renders the glossary button', () => {
        render(
            <WhatIsMulticollinearity
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
            />
        );
        expect(screen.getByRole('button', { name: /Glossary/i }))
            .toBeInTheDocument();
    });

    it('calls handleProgress when Continue to Real dataset is clicked', () => {
        render(
            <WhatIsMulticollinearity
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
            />
        );
        const continueBtn = screen.getByRole('button', {
            name: /Continue to Real dataset/i });
        fireEvent.click(continueBtn);
        expect(mockHandleProgress).toHaveBeenCalledWith(1);
    });

    it('calls handleControls when a checkbox is toggled', () => {
        render(
            <WhatIsMulticollinearity
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
            />
        );
        const x2Checkbox = screen.getByLabelText(/x_1\\ and\\ x_2/i);
        fireEvent.click(x2Checkbox);
        expect(mockHandleControls).toHaveBeenCalled();
    });
});