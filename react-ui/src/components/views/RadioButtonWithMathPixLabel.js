import React from 'react';
import Form from 'react-bootstrap/Form'; // Assuming you're using Bootstrap Form components
import { MathpixMarkdown } from 'mathpix-markdown-it';


const RadioButtonWithMathpixLabel = ({ choice }) => {
  return (
    <Form.Check type="radio">
      <Form.Check.Input type="radio" name="Q1Answer" value={choice} />
      <Form.Check.Label>
        <MathpixMarkdown text={choice} />
      </Form.Check.Label>
    </Form.Check>
  );
};

export default RadioButtonWithMathpixLabel;
