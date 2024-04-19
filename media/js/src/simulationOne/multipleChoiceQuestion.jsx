import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const MultipleChoiceQuestion = ({ question, options, answer }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        if (selectedOption === answer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
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
};