import axios from 'axios';
import React from 'react';
import { Katex } from './katexComponent';

export const authedFetch = function(url, method, data) {
    const elt = document.getElementById('csrf-token');
    const token = elt ? elt.getAttribute('content') : '';
    return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': token
        },
        body: JSON.stringify(data),
        credentials: 'same-origin'
    });
};

export const saveAnswer = async(submissionId, questionNumber, questionType,
    selectedOption, isCorrect, additionalData) => {
    try {
        const response = await axios.post('/save_answer/', {
            submission_id: submissionId,
            question_number: questionNumber,
            question_type: questionType,
            selected_option: selectedOption,
            is_correct: isCorrect,
            additional_data: additionalData
        });
        return response.data;
    } catch (error) {
        console.error('Error saving answer:', error);
    }
};


/**
 * Standardized function for rendering inline LaTeX.
 * @param {string} tex
 * @returns React.JSX.Element
 */
export const inlineKatex = function(tex) {
    return <Katex className="katex-inline" tex={tex}></Katex>;
};