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
    <div key={i}>
        {content.title && <h2>{content.title}:</h2>}
        <div className="sub-content">
            {content.body.map((eq, i) => (
                <div className="katex-block" key={i}>
                    <Katex key={i} tex={eq} />
                </div>
            ))}
        </div>
    </div>
);

/**
 * Utility function to extract plain text from JSX or strings.
 * @param {React.ReactNode} element - The JSX element or string.
 * @returns {string} - The extracted plain text content.
 */
export const extractTextContent = (element) => {
    if (!element) return ''; // Handle null/undefined
    if (typeof element === 'string') return element;

    return React.Children.toArray(element)
        .map(child => {
            if (typeof child === 'string') {
                return child; // Directly return text nodes
            }
            if (React.isValidElement(child)) {
                return extractTextContent(child.props.children);
            }
            return ''; // Ignore non-text elements like numbers, booleans, etc.
        })
        .join(' ')
        .trim(); // Ensure spacing between words
};

/**
 * Generates a seeded random number generator function.
 * @param {number} seed - The seed value for the random number generator.
 * @returns {function} - A function that generates a random number between
 * 0 and 1 based on the seed.
 */
export const seededRandom = (seed) => {
    let m = 0x80000000; // 2**31;
    let a = 1103515245;
    let c = 12345;
    let state = seed ? seed : Math.floor(Math.random() * (m - 1));

    return () => {
        state = (a * state + c) % m;
        return state / (m - 1);
    };
};

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


export const computeRobustSE = (dataPoints, slope, intercept) => {
    // Calculate mean of x values
    const x_values = dataPoints.map(d => d.x);
    const meanX = x_values.reduce((sum, x) => sum + x, 0) / x_values.length;

    // Calculate the denominator: sum of squared deviations of x from the mean
    const sxx = x_values.reduce((acc, x) => acc + Math.pow(x - meanX, 2), 0);

    // Calculate the numerator: weighted sum of squared residuals
    const numerator = dataPoints.reduce((acc, point) => {
        const residual = point.y - (slope * point.x + intercept);
        return acc + Math.pow(point.x - meanX, 2) * Math.pow(residual, 2);
    }, 0);

    // The robust variance of the slope is numerator divided by sxx squared
    const robustVar = numerator / Math.pow(sxx, 2);

    // Return the robust standard error (the square root of the variance)
    return Math.sqrt(robustVar);
};
