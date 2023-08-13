import React from 'react';
import { useState,useEffect } from 'react'
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

const WizardStep = ({ stepData, onNext, onPrevious, currentStep }) => {
    const outMath = true; // Set to true if you want the equations to be rendered as MathML or LaTeX
    const accessibility = false; // Set to false to disable accessibility features
    //const [questionData, setQuestionData] = useState([]);
    if (!stepData) {
        return null; // Return null if question is undefined
      }
    
    const renderQuestionAndAnswerChoices = (question, index) => {    
        
        console.log(question);             
        return (         
          <Form.Group controlId={`Q${index}Answer`}>
          <Form.Label>
          <MathpixMarkdown
            text={question && question.question}
            outMath={outMath}
            accessibility={accessibility}
            />
            </Form.Label>
           <p>Select the right answer from below</p>
            
            {/* //const choicesArray = question.choices.split(', ').map(choice => choice.trim()); */}
            <RadioButtonWithMathpixLabel choices={question && question.choices}  />

        </Form.Group>   
        )}
   
         
        return (
        <React.Fragment>
            <Row>
            <Col>
                <h2>Question {currentStep + 1}</h2>
                <Form>
                    {renderQuestionAndAnswerChoices(stepData,currentStep)}                          
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

const PracticeTestPage = () => {
    //const dispatcher = useDispatch();    
    const scriptedRef = useScriptRef();
    const [currentStep, setCurrentStep] = useState(0);
    const [allQuestionData, setAllQuestionData] = useState([]);   
   

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
            console.log("currentStep:"+ currentStep )
            if (currentStep < allQuestionData.length - 1) {
              setCurrentStep(currentStep + 1);
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
        />
        </div>
        // <React.Fragment>
        //     <Row>
        //         <Col>
        //             <Card title={questionData.question} isOption>                       
        //                 {/* <MathpixLoader>
        //                     <MathpixMarkdown
        //                     text={questionData && questionData.question}
        //                     outMath={outMath}
        //                     accessibility={accessibility}
        //                     />
        //                 </MathpixLoader> */}
        //                 <Row>
        //                         <Col md={6}>                        
        //                         <Form>
        //                         {renderQuestionAndAnswerChoices(allQuestionData[currentStep],currentStep)}
        //                             {/* {renderQuestionStep(allQuestionData[currentStep] && allQuestionData[currentStep], currentStep)} */}
        //                             <Button onClick={handlePrevious} disabled={currentStep === 0}>
        //                                 Previous
        //                             </Button>
        //                             <Button onClick={handleNext} disabled={currentStep === allQuestionData.length - 1}>
        //                                 Next
        //                             </Button>

        //                             <Button variant="primary">Submit</Button>
        //                         </Form>
        //                         </Col>
        //                 </Row>
        //                     {/* Other card content */}
        //             {/* </CardContent> */}
                  
        //             </Card>
        //         </Col>
        //     </Row>
        // </React.Fragment>
    );
};

export default PracticeTestPage;
