import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer, extractTextContent } from './../../utils/utils';

export const MultipleChoiceQuestion = ({
    isSubmitted, setIsSubmitted, submissionId, questionNumber,
    question, options, answer, header, questionStyle, optionStyle,
    answerStyle, correctFeedback, incorrectFeedback, idkey }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

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

    const handleRetry = () => {
        setIsAnswered(false);
        setIsCorrect(null);
        setSelectedOption(null);
    };

    const handleSubmit = async() => {
        setIsAnswered(true);
        // eslint-disable-next-line max-len
        const correct = extractTextContent(selectedOption) === extractTextContent(answer);
        setIsCorrect(correct);

        await saveAnswer(submissionId, questionNumber, header,
            extractTextContent(selectedOption), correct, {});

        if (correct) {
            setIsSubmitted(true);
        } else {
            setIsSubmitted(false); // Allow retry for incorrect answers
        }
    };

    const isQualifier = header === 'Qualifier';

    useEffect(() => {
        setShuffledOptions(shuffleArray([...options]));
        document.getElementById(`multiple-${idkey}`).scrollIntoView(
            { behavior: 'smooth'});
    }, []);

    useEffect(() => {
        if (isAnswered) {
            document.getElementById('feedback')
                .scrollIntoView({ behavior: 'smooth'});
        }
    }, [isAnswered]);

    return (<>
        <div className="simulation__step-container d-flex">
            <div className="simulation__step-num">
                &bull;
            </div>
            <div className="simulation__step-toggle--down">
            </div>
            <div className="simulation__step-body">
                <header className="simulation__step-header">
                    <h2 className="h2-primary">{header}</h2>
                </header>
                <div className="simulation__step-content">
                    <p className="mb-2" style={questionStyle}>
                        {question}
                    </p>
                    <div className="choice-list">
                        {shuffledOptions.map((option, index) => (
                            <div key={index} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id={`option-${index}-${idkey}`}
                                    name={`options-${idkey}-${index}`}
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={() => handleOptionSelect(option)}
                                    disabled={isAnswered}
                                />
                                <label className="form-check-label"
                                    htmlFor={`option-${index}-${idkey}`}
                                    style={optionStyle}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn btn-sm btn-success mt-3"
                        id={`multiple-${idkey}`}
                        disabled={isAnswered || !selectedOption}
                        onClick={handleSubmit}>Submit</button>
                    {isAnswered && (
                        <div className="mt-3" style={answerStyle} id="feedback">
                            {isCorrect ? correctFeedback : incorrectFeedback}
                        </div>
                    )}
                    {isAnswered && !isCorrect && !isQualifier && (
                        <div className="mt-3">
                            <button
                                className="btn btn-sm btn-warning"
                                onClick={handleRetry}>
                                Retry
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div> {/* div class=simulation__step-container */}
    </>);
};

MultipleChoiceQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    answer: PropTypes.object.isRequired,
    submissionId: PropTypes.number.isRequired,
    questionNumber: PropTypes.number.isRequired,
    setIsSubmitted: PropTypes.func.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    header: PropTypes.string,
    questionStyle: PropTypes.object,
    optionStyle: PropTypes.object,
    answerStyle: PropTypes.object,
    correctFeedback: PropTypes.object,
    incorrectFeedback: PropTypes.object,
    idkey: PropTypes.string
};