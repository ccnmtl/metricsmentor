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

    return (<>
        <div className="simulation__step-container d-flex">
            <div className="simulation__step-num">
                &bull;
            </div>
            <div className="simulation__step-toggle--down">
            </div>
            <div className="simulation__step-body">
                <header className="simulation__step-header">
                    <h2 className="h2-primary">Takeaway</h2>
                </header>
                <div className="simulation__step-content">
                    <p>
                        You have conpleted all the hypothesis tests in this
                        section. Based on what you&rsquo;ve learned from this
                        exercise, which of the following is true?
                    </p>
                    {options.map((option, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input"
                                type='radio'
                                id={`option-${index}`}
                                name='options'
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleOptionSelect(option)}
                            />
                            <label className="form-check-label"
                                htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                    <button
                        disabled={isCorrect}
                        onClick={handleSubmit}>Submit</button>
                    {isSubmitted && (
                        <p className="mt-3">
                            {isCorrect ? 'Correct! ' : 'Incorrect! '}
                            The answer is {answer}.
                        </p>
                    )}
                </div>
            </div>
        </div> {/* div class=simulation__step-container */}
    </>);
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