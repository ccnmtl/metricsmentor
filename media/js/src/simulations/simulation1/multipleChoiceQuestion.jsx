import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveAnswer, extractTextContent,
    getCoursePk } from './../../utils/utils';

export const MultipleChoiceQuestion = ({
    setIsSubmitted, submissionId, questionNumber,
    question, options, answer, header, questionStyle, optionStyle,
    answerStyle, correctFeedback, incorrectFeedbackMap, idkey
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    // const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const handleRetry = () => {
        setIsAnswered(false);
        setIsCorrect(null);
        setSelectedOption(null);
    };

    const handleSubmit = async() => {
        setIsAnswered(true);

        const selectedText = extractTextContent(options[selectedOption]);
        const correctText = extractTextContent(answer);

        const correct = selectedText === correctText;
        setIsCorrect(correct);

        await saveAnswer(submissionId, questionNumber, header,
            extractTextContent(selectedOption), correct, {}, getCoursePk());

        setIsSubmitted(correct);
    };

    const isQualifier = header === 'Qualifier';

    useEffect(() => {
        // setShuffledOptions(shuffleArray([...options]));
        document.getElementById(`multiple-${idkey}`).scrollIntoView(
            { behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (isAnswered) {
            document.getElementById('feedback')
                .scrollIntoView({ behavior: 'smooth' });
        }
    }, [isAnswered]);

    return (
        <>
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
                            {options.map((option, index) => (
                                <div key={index} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id={`option-${index}-${idkey}`}
                                        name={`options-${idkey}`}
                                        value={index}
                                        checked={selectedOption === index}
                                        onChange={
                                            () => handleOptionSelect(index)}
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
                            disabled={isAnswered || selectedOption === null}
                            onClick={handleSubmit}>Submit</button>
                        {isAnswered && (
                            <div className={
                                `form-check mt-3 mb-3
                                ${isCorrect ? 'text-success' : 'text-danger'}`}
                            id="feedback" role="alert">
                                {isCorrect ? correctFeedback
                                    : incorrectFeedbackMap[selectedOption]}
                            </div>
                        )}
                        {isAnswered && !isCorrect && isQualifier && (
                            <span className="fw-bold form-check mt-3 mb-3">
                                Let&apos;s scroll up and continue with case B,
                                a one-sided alternative!
                            </span>
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
            </div>
        </>
    );
};

MultipleChoiceQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    answer: PropTypes.object.isRequired,
    submissionId: PropTypes.number.isRequired,
    questionNumber: PropTypes.number.isRequired,
    setIsSubmitted: PropTypes.func.isRequired,
    header: PropTypes.string,
    questionStyle: PropTypes.object,
    optionStyle: PropTypes.object,
    answerStyle: PropTypes.object,
    correctFeedback: PropTypes.object,
    incorrectFeedbackMap: PropTypes.object.isRequired,
    idkey: PropTypes.string
};