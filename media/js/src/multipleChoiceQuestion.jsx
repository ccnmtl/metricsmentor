import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer } from './utils';

export const MultipleChoiceQuestion = ({
    isSubmitted, setIsSubmitted, submissionId, questionNumber,
    question, options, answer }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = async() => {
        setIsSubmitted(true);
        const correct = selectedOption === answer;
        setIsCorrect(correct);

        const questionType = 'multiple-choice';

        await saveAnswer(submissionId, questionNumber, questionType,
            selectedOption, correct, {});

    };

    useEffect(() => {
        setShuffledOptions(shuffleArray([...options]));
    }, [options]);

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
                        {question}
                    </p>
                    {shuffledOptions.map((option, index) => (
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
                        className="btn btn-primary mt-3"
                        disabled={isSubmitted}
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