import axios from 'axios';
import React from 'react';
import { Katex } from './katexComponent';

export const STATIC_URL = window.MetricsMentor.staticUrl;

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

/**
 * Creates or updates a submission for a course.
 *
 * @param {number} coursePk - The primary key (ID) of the course.
 * @param {number|null} [submissionId=null] - The ID of an existing submission.
 * @param {number} [simulation=3] - The simulation ID to use.
 * @returns {Promise<number>} - Resolves to the submission_id.
 * @throws {Error} - If the request fails.
 */
export const createSubmission = async(
    coursePk, submissionId = null, simulation) => {
    const data = {};

    const payload = {
        simulation: simulation,
        data: data,
    };

    const url = `/course/${coursePk}/api/create-sub/`;
    const method = submissionId ? 'PUT' : 'POST';

    try {
        const response = await authedFetch(url, method, payload);
        if (response.status === 201 || response.status === 200) {
            const responseData = await response.json();
            return responseData.submission_id;
        } else {
            throw new Error(`Error (${response.status})
                ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error creating submission', error);
        throw error;
    }
};

/**
 * Retrieves the primary key (ID) of the current course from the DOM.
 *
 * Searches for the `#react-root` element and extracts the `data-course`
 * attribute. Returns the course ID as a number if found, or an empty string
 * if not.
 *
 * @returns {number|string} - The course primary key or an empty string if
 *  unavailable.
 *
 * @example
 * const coursePk = getCoursePk();
 * console.log(coursePk); // Output: 123 or ''
 */
export const getCoursePk = () => {
    const simContainer = document.querySelector('#react-root');
    return simContainer ? Number(simContainer.dataset.course) : '';
};