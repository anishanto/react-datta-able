import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MathpixMarkdown } from 'mathpix-markdown-it';

const RadioButtonWithMathpixLabel = ({ choices,handleAnswerChange  }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  console.log(choices);
  if (!choices) {
    //setSelectedAnswer('');
    return null; // Return null if choices are undefined
  }
  const onRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
    handleAnswerChange(event.target.value); // Pass the selected answer to the parent component
  };

  return (
    <Form.Group>
      {choices.split(', ').map((choice, index) => (
        <Form.Check key={index} type="radio">
          <Form.Check.Input
            type="radio"
            name="answer"
            value={choice}
            checked={selectedAnswer === choice}
            onChange={onRadioChange}
          />
          <Form.Check.Label>
            <MathpixMarkdown text={choice} />
          </Form.Check.Label>
        </Form.Check>
      ))}    
    </Form.Group>
  );
};

export default RadioButtonWithMathpixLabel;
