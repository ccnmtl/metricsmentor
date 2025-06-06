/* global jest */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MulticollinearityApply } from '../multicollinearityApply';

describe('MulticollinearityApply', () => {
    const mockHandleControls = jest.fn();
    const mockHandleProgress = jest.fn();
    const controls = [false, false];
    const submissionId = 1;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the real-world dataset prompt', () => {
        render(
            <MulticollinearityApply
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
                submissionId={submissionId}
            />
        );
        expect(screen.getByText(/real-world dataset/i)).toBeInTheDocument();
        expect(screen.getByText(/Regression line equations/i))
            .toBeInTheDocument();
    });

    it('calls handleControls when a checkbox is toggled', () => {
        render(
            <MulticollinearityApply
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
                submissionId={submissionId}
            />
        );
        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);
        expect(mockHandleControls).toHaveBeenCalled();
    });

    it('shows Continue btn after both questions are answered correctly', () => {
        render(
            <MulticollinearityApply
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
                submissionId={submissionId}
            />
        );
        // First question
        let radios = screen.getAllByRole('radio');
        fireEvent.click(radios[1]);
        let submit1 = screen.getAllByRole('button', { name: /Submit/i })[0];
        fireEvent.click(submit1);

        radios = screen.getAllByRole('radio');
        fireEvent.click(radios[2]);
        let submit2 = screen.getAllByRole('button', { name: /Submit/i })[1];
        fireEvent.click(submit2);

        expect(screen.getByRole('button', { name: /Continue/i }))
            .toBeInTheDocument();
    });
    it('calls handleProgress when Continue is clicked after questions', () => {
        render(
            <MulticollinearityApply
                controls={controls}
                handleControls={mockHandleControls}
                handleProgress={mockHandleProgress}
                submissionId={submissionId}
            />
        );

        let radios = screen.getAllByRole('radio');
        fireEvent.click(radios[1]); // correct answer for question 1
        let submit1 = screen.getAllByRole('button', { name: /Submit/i })[0];
        fireEvent.click(submit1);

        // After submitting, re-query for the new radios and submit button
        radios = screen.getAllByRole('radio');
        fireEvent.click(radios[2]); // correct answer for question 2
        let submit2 = screen.getAllByRole('button', { name: /Submit/i })[1];
        fireEvent.click(submit2);

        const continueBtn = screen.getByRole('button', { name: /Continue/i });
        fireEvent.click(continueBtn);
        expect(mockHandleProgress).toHaveBeenCalledWith(2);;
    });
});