import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer, extractTextContent, getCoursePk } from './utils/utils';

export const QuizComponent = ({
    question, options, correctAnswerIndex, correctFeedback, incorrectFeedback,
    submissionId, questionNumber, setIsCorrect, isTextInput, isNumericInput,
    correctTextAnswer, selectedOption, setSelectedOption
}) => {
    const [textInputAnswer, setTextInputAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const coursePk = getCoursePk();

    const isCorrect = isTextInput
        ? (isNumericInput
            ? parseFloat(textInputAnswer.trim()) ===
                parseFloat(correctTextAnswer.trim())
            : textInputAnswer.toLowerCase().trim()
                === correctTextAnswer.toLowerCase().trim())
        : selectedOption === correctAnswerIndex;

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
        setFeedback('');
    };

    const handleTextInputChange = (e) => {
        setTextInputAnswer(e.target.value);
        setFeedback('');
    };

    useEffect(() => {
        if (textInputAnswer.length > 0) {
            setFeedback(incorrectFeedback);
        }
    }, [incorrectFeedback]);

    const handleSubmit = async() => {

        if (isTextInput) {
            if (textInputAnswer.trim() === '') {
                setFeedback('Please provide an answer before submitting.');
            } else {
                const isAnswerCorrect = isCorrect;
                if (isAnswerCorrect) {
                    setIsSubmitDisabled(true);
                    setFeedback(correctFeedback);
                } else {
                    setFeedback(incorrectFeedback);
                }
                setIsCorrect(isAnswerCorrect);

                const additionalData = {
                    question: extractTextContent(question),
                    correctAnswer: extractTextContent(correctTextAnswer)
                };
                await saveAnswer(submissionId, questionNumber, 'text',
                    textInputAnswer, isAnswerCorrect, additionalData, coursePk);
            }
        } else {
            if (selectedOption === null) {
                setFeedback('Please select an option before submitting.');
            } else {
                const isAnswerCorrect = selectedOption === correctAnswerIndex;
                if (isAnswerCorrect) {
                    setIsSubmitDisabled(true);
                    setFeedback(correctFeedback);
                } else {
                    const fb = typeof incorrectFeedback === 'object'
                        ? (incorrectFeedback[selectedOption]
                            || 'Incorrect.')
                        : incorrectFeedback;
                    setFeedback(fb);
                }
                setIsCorrect(isAnswerCorrect);
                const additionalData = {
                    question: extractTextContent(question),
                    correctAnswer: extractTextContent(
                        options[correctAnswerIndex])
                };
                await saveAnswer(submissionId, questionNumber, 'radio',
                    extractTextContent(options[selectedOption]),
                    isAnswerCorrect, additionalData, coursePk);
            }
        }
    };

    return (
        <div className="quiz-container">
            <p>{question}</p>
            {isTextInput ? (
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        value={textInputAnswer}
                        onChange={handleTextInputChange}
                        disabled={isSubmitDisabled}
                        placeholder="Type your answer here"
                    />
                </div>
            ) : (
                <div className="choice-list">
                    {options.map((option, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id={`option${questionNumber}-${index}`}
                                name={`option${questionNumber}`}
                                value={option}
                                disabled={isSubmitDisabled}
                                onChange={() => handleOptionSelect(index)}
                            />
                            <label className="form-check-label"
                                htmlFor={`option${questionNumber}-${index}`}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            )}
            {feedback && (
                <div className={`${isCorrect ? 'answer-correct-container'
                    : 'answer-incorrect-container'} sim_quiz__feedback`}>
                    {isCorrect ?
                        <div className={
                            'answer-correct status-checkmark ' +
                            'align-self-start me-3'}>
                            &#10003;
                        </div>
                        : <div className={
                            'answer-incorrect status-warning ' +
                            'align-self-start me-3'}>
                            !
                        </div>}
                    <div className={isCorrect
                        ? 'sim_quiz__feedback-text-correct'
                        : 'sim_quiz__feedback-text-incorrect'}>
                        {feedback}
                    </div>
                </div>
            )}
            <button
                className="btn btn-sm btn-success mt-3"
                id="submit-button"
                disabled={isSubmitDisabled}
                data-cy={`submit${questionNumber}`}
                onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

QuizComponent.propTypes = {
    question: PropTypes.node.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswerIndex: PropTypes.number.isRequired,
    correctFeedback: PropTypes.string.isRequired,
    incorrectFeedback: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.node)
    ]).isRequired,
    submissionId: PropTypes.number.isRequired,
    questionNumber: PropTypes.number.isRequired,
    setIsCorrect: PropTypes.func.isRequired,
    selectedOption: PropTypes.number,
    setSelectedOption: PropTypes.func,
    isTextInput: PropTypes.bool,
    isNumericInput: PropTypes.bool,
    correctTextAnswer: PropTypes.string
};
