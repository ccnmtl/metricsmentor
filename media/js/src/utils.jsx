import axios from 'axios';
import React from 'react';
import { Katex } from './katexComponent';

export const authedFetch = (url, method, data) => {
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

/**
 * Function to save an answer.
 * @param {number} submissionId - The ID of the submission.
 * @param {number} questionNumber - The number of the question.
 * @param {string} questionType - The type of the question.
 * @param {string} selectedOption - The selected option.
 * @param {boolean} isCorrect - Whether the answer is correct.
 * @param {object} additionalData - Any additional data.
 * @returns {Promise<object>} - The response data.
 */
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
 * Function to retrieve answers for a quiz submission
 * @param {number} submissionId - The ID of the submission.
 * @param {number} courseId - The course id.
 * @returns {Promise<object>} - The response data.
 */
export const fetchQuizData = async(courseId, simulationId) => {
    try {
        const response = await axios.get(`/course/${courseId}/get_quiz/`, {
            params: {
                simulation_id: simulationId,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching quiz data:', err);
        return {};
    }
};

/**
 * Function to delete an answer by question number.
 * @param {number} submissionId - The ID of the submission.
 * @param {number} questionNumber - The number of the question.
 * @returns {Promise<object>} - The response data.
 */
export const deleteAnswer = async(submissionId, questionNumber) => {
    try {
        const response = await axios.post('/delete_answer/', {
            submission_id: submissionId,
            question_number: questionNumber,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting answer:', error);
    }
};

/**
 * Function to delete a quiz submission by marking it and
 * its answers as inactive.
 * @param {number} submissionId - The ID of the quiz submission.
 * @returns {Promise<object>} - The response data.
 */
export const deleteQuiz = async(submissionId) => {
    try {
        const response = await axios.post('/delete_quiz/', {
            submission_id: submissionId,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting quiz submission:', error);
        return { status: 'error', message: 'Failed to delete quiz submission' };
    }
};


/**
 * Standardized function for rendering inline LaTeX.
 * @param {string} tex
 * @returns React.JSX.Element
 */
export const inlineKatex = (tex) =>
    <Katex className="katex-inline" tex={tex} />;


/**
 * Formatted output for the formula text.
 * @param {{title:any, body:any[]}} content
 * @returns React.JSX.Element
 */
export const formulaText = (content = { title: '', body: [] }, i) => (
    <li className={'list-group'} key={i}>
        {content.title && <h2 className="mt-4">{content.title}:</h2>}
        {content.body.map((eq, i) => (
            <Katex key={i} className={'ms-3' + (i === 0 ? '' : ' mt-3')}
                tex={eq} />
        ))}
    </li>
);
