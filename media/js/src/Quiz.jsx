import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer, extractTextContent } from './utils/utils';

export const QuizComponent = ({
    question, options, correctAnswerIndex, correctFeedback, incorrectFeedback,
    submissionId, questionNumber, setIsCorrect, isTextInput, correctTextAnswer
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [textInputAnswer, setTextInputAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);


    const isCorrect = isTextInput
        ? textInputAnswer.toLowerCase().trim()
        === correctTextAnswer.toLowerCase().trim()
        : selectedOption === correctAnswerIndex;

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
        setFeedback('');
    };

    const handleTextInputChange = (e) => {
        setTextInputAnswer(e.target.value);
        setFeedback('');
    };

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
                    textInputAnswer, isAnswerCorrect, additionalData);
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
                    setFeedback(incorrectFeedback);
                }
                setIsCorrect(isAnswerCorrect);
                const additionalData = {
                    question: extractTextContent(question),
                    correctAnswer: extractTextContent(
                        options[correctAnswerIndex])
                };
                await saveAnswer(submissionId, questionNumber, 'radio',
                    extractTextContent(options[selectedOption]),
                    isAnswerCorrect, additionalData);
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
                <div className={isCorrect ? 'answer-correct-container'
                    : 'answer-incorrect-container'}>
                    {isCorrect ?
                        <div className="answer-correct">&#10003;</div>
                        : <div className="answer-incorrect">!</div>}
                    {feedback}
                </div>
            )}
            <button
                className="btn btn-sm btn-success mt-3"
                id="submit-button"
                disabled={isSubmitDisabled}
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
    incorrectFeedback: PropTypes.string.isRequired,
    submissionId: PropTypes.number.isRequired,
    questionNumber: PropTypes.number.isRequired,
    setIsCorrect: PropTypes.func.isRequired,
    isTextInput: PropTypes.bool,
    correctTextAnswer: PropTypes.string
};