import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';



const SelectCategoryPage = () => {

    const history = useHistory();

    const GeneratePracticeTest = () => {
      // Get the selected category and number of questions
      const selectedCategory = 'selectedCategory'; // Replace with actual selected category
      const numberOfQuestions = 10; // Replace with actual number of questions
  
      // Navigate to the PracticeTestPage with route parameters
      history.push(`/practicetest-page/${selectedCategory}/${numberOfQuestions}`);
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="Select Category" >
                    <Card.Header>
                            <Card.Title as="h5">Select Category</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <Form>
                            <Row>
                                <Col md={12}>
                                    <h6 className="text-muted">Math Categories</h6>
                                    <hr />
                                    <Form.Group>
                                        <Form.Check custom type="checkbox" id="checkbox1" label="Problem Solving and Data Analysis" />
                                        <Form.Check custom type="checkbox" id="checkbox2" label="Exponential vs Linear Growth" />
                                        <Form.Check custom type="checkbox" id="checkbox3" label="Data Interpretation" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <h6 className="mt-4 text-muted">Number of Questions</h6>
                                    <hr />
                                    <Form.Label htmlFor="customRange2">Number of Questions</Form.Label>
                                    <input type="range" className="custom-range" min="1" defaultValue="10" max="25" id="customRange2" />
                                </Col>
                            </Row>
                            <Row>
                            <Col md={6}>
                            <Button onClick={GeneratePracticeTest} >
                                 GenerateQuestions
                            </Button>
                            </Col>
                            </Row>
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SelectCategoryPage;
