import React from 'react';
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
// import { Row, Col } from 'react-bootstrap';
import {Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import useScriptRef from '../../hooks/useScriptRef';
import { API_SERVER } from './../../config/constant';
//import { ACCOUNT_INITIALIZE } from './../../store/actions';
import { MathpixMarkdown } from 'mathpix-markdown-it';

import Card from '../../components/Card/MainCard';
import RadioButtonWithMathpixLabel from '../../components/views/RadioButtonWithMathPixLabel';

const WizardStep = ({ stepData, onNext, onPrevious, currentStep, handleAnswerChange, selectedAnswer }) => {
  
    const outMath = true; // Set to true if you want the equations to be rendered as MathML or LaTeX
    const accessibility = false; // Set to false to disable accessibility features
    //const [questionData, setQuestionData] = useState([]);
    if (!stepData) {
        return null; // Return null if question is undefined
      }
 
    // const handleAnswerChange = (event) => {
    // setSelectedAnswer(event.target.value);
    // };      
    const isAnswerSelected = selectedAnswer[currentStep] !== undefined;

    const renderQuestionAndAnswerChoices = (question, index) => {
        return (
          <Form.Group controlId={`Q${index}Answer`} key={index}>
            <Form.Label>
              <MathpixMarkdown text={question && question.question} />
            </Form.Label>
            <RadioButtonWithMathpixLabel
              choices={question && question.choices}
              handleAnswerChange={(selectedOption) => handleAnswerChange(currentStep, selectedOption)}
              selectedAnswer={selectedAnswer[currentStep]}
            />
            {isAnswerSelected ? (
              <Form.Control.Feedback type="valid">Thank you for selecting an answer.</Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">Please choose an answer.</Form.Control.Feedback>
            )}
          </Form.Group>
        );
      };
   
         
        return (
            <React.Fragment>
              <Row>
                <Col>
                  <h2>Question {currentStep + 1}</h2>
                  <Form noValidate>
                    {renderQuestionAndAnswerChoices(stepData, currentStep)}
                    <Button onClick={onPrevious} disabled={currentStep === 0}>
                      Previous
                    </Button>
                    <Button onClick={onNext} disabled={currentStep === stepData.length - 1}>
                      Next
                    </Button>
                  </Form>
                </Col>
              </Row>
            </React.Fragment>
          );
};

const ReviewPracticeTestPage = () => {
    //const dispatcher = useDispatch();    
    const scriptedRef = useScriptRef();
    const [currentStep, setCurrentStep] = useState(0);
    const [allQuestionData, setAllQuestionData] = useState([]);   
    const [validated, setValidated] = useState(false);
    const [validatedTooltip, setValidatedTooltip] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const {category, numberOfQuestions } = useParams();  



    const handleAnswerChange = (questionIndex, selectedOption) => {
        setSelectedAnswer((prevState) => ({
          ...prevState,
          [questionIndex]: selectedOption,
        }));
      };

    useEffect(() => {
        //getQuestionAnswers();
        getQuestions();
      }, []);

    const getQuestionAnswers = async () => {
        try {
        axios
            .post(API_SERVER + 'users/QuestionAnswers', {
                questionNumber: "3"
            })
            .then(function (response) {
                if (response.data.success) {
                    console.log(response.data);
                    const questionsData = JSON.parse(response.data.Questions);
                    const choicesArray = questionsData.choices.split(', ').map(choice => choice.trim());

                    // setQuestionData(({
                    //     question: questionsData.question,
                    //     choices: choicesArray}))
                    // dispatcher({
                    //     type: ACCOUNT_INITIALIZE,
                    //     payload: { isLoggedIn: true, user: response.data.user, token: response.data.token }
                    // });
                    //console.log(questionData)
                    //console.log(questionData.length)
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
        const LoadUserAnswers = async (question,selectedAnswer) => {
            try {
            console.log(selectedAnswer);
                
            axios
                .post(API_SERVER + 'users/UserAnswers', {
                    userId : "1",
                    questionNumber: question.questionNumber.toString(),
                    answerChoice: selectedAnswer
                })
                .then(function (response) {
                    if (response.data.success) {
                        console.log(response.data);
 
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
        const getQuestions = async () => {
            try {
            axios
                .get(API_SERVER + 'users/Questions', {

                })
                .then(function (response) {
                    if (response.data.success) {
                        console.log(response.data);
                        //Extract the JSON-encoded string from the "Questions" field
                        const _questionsData = response.data.Questions
                        setAllQuestionData(_questionsData);                       
                        //JSON.parse(response.data.Questions);
                        // try {
                        //      questionsData = JSON.parse(response.data.Questions);
                        //     console.log(questionsData); // Display the parsed JSON data
                        //   } catch (error) {
                        //     console.error('Error parsing JSON:', error);
                        //   }
                        // const choicesArray = _questionsData[currentStep].choices.split(', ').map(choice => choice.trim());
    
                        // setQuestionData(({
                        //     question: _questionsData[currentStep].question,
                        //     choices: choicesArray}))
                        // dispatcher({
                        //     type: ACCOUNT_INITIALIZE,
                        //     payload: { isLoggedIn: true, user: response.data.user, token: response.data.token }
                        // });
                        console.log(_questionsData)
                        console.log(_questionsData.length)
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


            const handleNext = () => {
                console.log("selectedAnswer:"+ selectedAnswer[currentStep])
                if (!selectedAnswer) {
                  // If no answer is selected, set validation to show
                  setValidated(true);
                  return;
                }
            
                // Move to the next question
                if (currentStep < allQuestionData.length - 1) {
                  setCurrentStep(currentStep + 1);
                  setSelectedAnswer(''); // Reset selected answer for the next question
                  setValidated(false); // Reset validation for the next question
                }
              };
        
        
          const handlePrevious = () => {
            console.log("currentStep:"+ currentStep)
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
            }
          };   
    

          return (
            <div>
              <WizardStep
                stepData={allQuestionData[currentStep]}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentStep={currentStep}
                handleAnswerChange={handleAnswerChange}
                selectedAnswer={selectedAnswer}
              />
            </div>
          );
        };
        
export default ReviewPracticeTestPage;
        
        
        
        
        
        
