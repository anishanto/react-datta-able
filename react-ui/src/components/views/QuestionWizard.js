import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_SERVER } from './config/constant';

const QuestionWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await axios.post(API_SERVER + 'users/Questions');

      if (response.data.success) {
        const questionsData = JSON.parse(response.data.Questions);
        setQuestions(questionsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestionStep = (question, index) => {
    return (
      <div key={index}>
        <h2>Question {index + 1}</h2>
        <p>{question.question}</p>
        <Form.Group controlId={`Q${index}Answer`}>
          {question.choices && question.choices.map((choice, choiceIndex) => (
            <Form.Check
              key={choiceIndex}
              type="radio"
              name={`Q${index}Answer`}
              label={choice}
              value={choice}
            />
          ))}
        </Form.Group>
      </div>
    );
  };

  return (
    <div>
      <h1>Question Wizard</h1>
      {questions.length > 0 && (
        <div>
          {renderQuestionStep(questions[currentStep], currentStep)}
          <Button onClick={handlePrevious} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === questions.length - 1}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionWizard;
