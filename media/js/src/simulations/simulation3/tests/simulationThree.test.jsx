
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SimulationThree } from '../simulationThree';

describe('SimulationThree', () => {
    it('renders the preamble and both stage buttons', () => {
        render(<SimulationThree />);
        expect(screen.getByText(/Simulation 3/i)).toBeInTheDocument();
        expect(screen.getByRole('button',
            { name: /Heteroskedasticity/i })).toBeInTheDocument();
        expect(screen.getByRole('button',
            { name: /Multicollinearity/i })).toBeInTheDocument();
    });

    it('switches to Multicollinearity stage when button is clicked', () => {
        render(<SimulationThree />);
        const multiBtn = screen.getByRole('button',
            { name: /Multicollinearity/i });
        fireEvent.click(multiBtn);
        expect(screen.getByText(
            /Learning objectives: Multicollinearity/i)).toBeInTheDocument();
    });
    it('shows progress list for Heteroskedasticity', () => {
        render(<SimulationThree />);
        expect(screen.getByText('Your progress:')).toBeInTheDocument();
        expect(screen.getByText('Learn')).toBeInTheDocument();
        expect(screen.getByText('Apply')).toBeInTheDocument();
        expect(screen.getByText('Assess')).toBeInTheDocument();
    });
    it('shows progress list for Multicollinearity after switching', () => {
        render(<SimulationThree />);
        const multiBtn = screen.getByRole('button', {
            name: /Multicollinearity/i });
        fireEvent.click(multiBtn);
        expect(screen.getByText('Your progress:')).toBeInTheDocument();
        expect(screen.getByText('Learn')).toBeInTheDocument();
        expect(screen.getByText('Apply')).toBeInTheDocument();
        expect(screen.getByText('Assess')).toBeInTheDocument();
    });

    it('renders simulation cards for both stages', () => {
        render(<SimulationThree />);
        // Heteroskedasticity card
        expect(screen.getByText(/Learning objectives: Heteroskedasticity/i))
            .toBeInTheDocument();
        // Switch to Multicollinearity and check card
        const multiBtn = screen.getByRole('button', {
            name: /Multicollinearity/i });
        fireEvent.click(multiBtn);
        expect(screen.getByText(/Learning objectives: Multicollinearity/i))
            .toBeInTheDocument();
    });
});
