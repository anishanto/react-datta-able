import React from 'react';
import { useState,useEffect } from 'react'
//import { useDispatch } from 'react-redux';
// import { Row, Col } from 'react-bootstrap';
import {Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import useScriptRef from '../../hooks/useScriptRef';
import { API_SERVER } from './../../config/constant';
//import { ACCOUNT_INITIALIZE } from './../../store/actions';

import Card from '../../components/Card/MainCard';

const PracticeTestPage = () => {
    //const dispatcher = useDispatch();    
    const scriptedRef = useScriptRef();
    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        getQuestionAnswers();
      }, []);

    const getQuestionAnswers = async () => {
        try {
        axios
            .post(API_SERVER + 'users/QuestionAnswers', {
                questionNumber: "1"
            })
            .then(function (response) {
                if (response.data.success) {
                    console.log(response.data);
                    const questionsData = JSON.parse(response.data.Questions);
                    const choicesArray = questionsData.choices.split(', ').map(choice => choice.trim());

                    setQuestionData(({
                        question: questionsData.question,
                        choices: choicesArray}))
                    // dispatcher({
                    //     type: ACCOUNT_INITIALIZE,
                    //     payload: { isLoggedIn: true, user: response.data.user, token: response.data.token }
                    // });
                    console.log(questionData)
                    if (scriptedRef.current) {
                        // setStatus({ success: true });
                    }
                } else {
                    // setStatus({ success: false });
                    // setErrors({ submit: response.data.msg });
                }
            })
            .catch(function (error) {
                console.log(error);
                // setStatus({ success: false });
                // setErrors({ submit: error.response.data.msg });
            });
            } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
                // setStatus({ success: false });
                // setErrors({ submit: err.message });
            }
        }
        };


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title={questionData.question} isOption>
                            <Row>
                                <Col md={6}>                        
                                <Form>
                                    <Form.Group controlId="Q1Answer">
                                        <Form.Label>Select the right answer from below</Form.Label>
                                        {questionData.choices && questionData.choices.map((choice, index) => (
                                            <Form.Check
                                                key={index}
                                                type="radio"
                                                name="Q1Answer"
                                                label={choice}
                                                value={choice}
                                            />
                                        ))}
                                    </Form.Group> 
                                    <Button variant="primary">Submit</Button>
                                </Form>
                                </Col>
                            </Row>
                        
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PracticeTestPage;
