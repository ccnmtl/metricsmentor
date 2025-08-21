import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WhatIsHeteroskedasticity } from '../whatIsHeteroskedasticity';
import axios from 'axios';


jest.mock('axios');

beforeEach(() => {
    axios.post.mockResolvedValue({ data: { value_two_sided: 0.04 } });
});

describe('WhatIsHeteroskedasticity', () => {
    it('renders explanation text', async() => {
        render(
            <WhatIsHeteroskedasticity
                heteroskedasticity={0.2}
                setHeteroskedasticity={() => {}}
                slope={1}
                intercept={0}
                standardError={0.1}
                robustStandardError={0.09}
                useRealDataSked={false}
                setUseRealDataSked={() => {}}
                setProgress={() => {}}
            />
        );
        expect(screen.getByText(/Definition: Heteroskedasticy/i))
            .toBeInTheDocument();
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });
    });

    it('calls setProgress when a button is clicked', async() => {
        const setProgress = jest.fn();
        render(
            <WhatIsHeteroskedasticity
                heteroskedasticity={0.2}
                setHeteroskedasticity={() => {}}
                slope={1}
                intercept={0}
                standardError={0.1}
                robustStandardError={0.09}
                useRealDataSked={false}
                setUseRealDataSked={() => {}}
                setProgress={setProgress}
            />
        );
        const nextBtn = screen.getByRole('button',
            {name: /Continue to Real dataset/i});
        fireEvent.click(nextBtn);
        expect(setProgress).toHaveBeenCalled();

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });
    });
});