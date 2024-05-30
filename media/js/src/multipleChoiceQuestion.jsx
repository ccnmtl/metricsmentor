import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from './utils';

export const MultipleChoiceQuestion = ({
    isSubmitted, setIsSubmitted, submissionId, questionNumber,
    question, options, answer }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = async() => {
        setIsSubmitted(true);
        const correct = selectedOption === answer;
        setIsCorrect(correct);

        const questionType = 'multiple-choice';

        try {
            await saveAnswer(submissionId, questionNumber, questionType,
                selectedOption, correct, {});
            console.log('Answer saved successfully');
        } catch (error) {
            console.error('Error saving answer:', error);
        }
    };

    return (
        <div>
            <h3>{question}</h3>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type='radio'
                        id={`option-${index}`}
                        name='options'
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionSelect(option)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))}
            <button
                disabled={isCorrect}
                onClick={handleSubmit}>Submit</button>
            {isSubmitted && (
                <p>
                    {isCorrect ? 'Correct! ' : 'Incorrect! '}
                    The answer is {answer}.
                </p>
            )}
        </div>
    );
};

MultipleChoiceQuestion.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
    submissionId: PropTypes.number.isRequired,
    questionNumber: PropTypes.number.isRequired,
    setIsSubmitted: PropTypes.func.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
};