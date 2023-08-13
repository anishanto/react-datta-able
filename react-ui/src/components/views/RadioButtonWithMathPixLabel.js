import React from 'react';
import { Form } from 'react-bootstrap';
import { MathpixMarkdown } from 'mathpix-markdown-it';

const RadioButtonWithMathpixLabel = ({ choices }) => {
  console.log(choices);
  if (!choices) {
    return null; // Return null if choices are undefined
  }
  return (
    <Form.Group>
      {choices.split(', ').map((choice, index) => (
        <Form.Check key={index} type="radio">
          <Form.Check.Input type="radio" name="answer" value={choice} />
          <Form.Check.Label>
            <MathpixMarkdown text={choice} />
          </Form.Check.Label>
        </Form.Check>
      ))}
    </Form.Group>
  );
};

export default RadioButtonWithMathpixLabel;
