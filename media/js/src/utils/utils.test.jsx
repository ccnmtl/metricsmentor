/* global jest */
import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import {
    fetchQuizData,
    deleteAnswer,
    deleteQuiz,
    inlineKatex,
    formulaText,
    extractTextContent
} from './utils';

jest.mock('axios');

describe('Utility Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetchQuizData fetches data correctly', async() => {
        const mockData = { data: { key: 'value' } };
        axios.get.mockResolvedValue(mockData);

        const data = await fetchQuizData(1, 2);
        expect(data).toEqual(mockData.data);
        expect(axios.get).toHaveBeenCalledWith(
            '/course/1/get_quiz/', { params: { simulation_id: 2 } });
    });

    test('deleteAnswer deletes answer correctly', async() => {
        const mockData = { data: { success: true } };
        axios.post.mockResolvedValue(mockData);

        const data = await deleteAnswer(1, 2);
        expect(data).toEqual(mockData.data);
        expect(axios.post).toHaveBeenCalledWith(
            '/delete_answer/', { submission_id: 1, question_number: 2 });
    });

    test('deleteQuiz deletes quiz correctly', async() => {
        const mockData = { data: { success: true } };
        axios.post.mockResolvedValue(mockData);

        const data = await deleteQuiz(1);
        expect(data).toEqual(mockData.data);
        expect(axios.post).toHaveBeenCalledWith(
            '/delete_quiz/', { submission_id: 1 });
    });

    test('inlineKatex renders LaTeX correctly', () => {
        const { container } = render(inlineKatex('E=mc^2'));
        expect(document.body.contains(
            container.querySelector('.katex-inline'))).toBe(true);
    });

    test('formulaText renders formula text correctly', () => {
        const content = { title: 'Formula',
            body: ['E=mc^2', 'a^2 + b^2 = c^2'] };
        const { getByText } = render(formulaText(content));

        expect(document.body.contains(getByText('Formula:'))).toBe(true);
        expect(document.body.contains(getByText('E=mc^2'))).toBe(true);
        expect(document.body.contains(getByText('a^2 + b^2 = c^2'))).toBe(true);
    });
});

