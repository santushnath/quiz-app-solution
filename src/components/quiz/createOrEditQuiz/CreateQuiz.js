import React, { useState } from "react";
import { Form, Card, CardBody, Button } from "reactstrap";
import { v4 as uuid } from "uuid";
import GeneralFields from "./GeneralFields";
import Questions from "./Questions";
import quizLayout from "../../../utils/quizLayout";
import localStorage from "../../../utils/localStorage";
import { useHistory, Link } from "react-router-dom";

const initialOptionData = {
  id: null,
  text: "",
  imageUrl: ""
};

const initialQuestionData = {
  id: null,
  title: "",
  answers: [],
  options: [
    { ...initialOptionData, id: uuid() },
    { ...initialOptionData, id: uuid() }
  ]
};

const initialFormData = {
  id: null,
  title: "",
  questionLayout: quizLayout.allQuestions,
  questions: [{ ...initialQuestionData }]
};

const CreateQuiz = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormData, id: uuid() });

  const setField = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const onUpdateQuestions = (questions) => {
    setFormData({
      ...formData,
      questions
    });
  };

  const storeQuiz = () => {
    localStorage.setData("quizs", formData).then(() => {
      setFormData({ ...initialFormData, id: uuid() });
      history.push("/dashboard");
    });
  };

  return (
    <Form>
      <Card className="shadow-sm mt-3 mb-3">
        <CardBody className="d-flex justify-content-between align-items-center">
          <h5>Create Quiz</h5>
          <Button
            size="sm"
            color="outline-primary"
            className="me-2"
            tag={Link}
            to={`/dashboard`}
          >
            Cancel
          </Button>
        </CardBody>
      </Card>

      <GeneralFields setField={setField} formData={formData} />
      <Questions
        onUpdate={onUpdateQuestions}
        questions={formData.questions}
        initialQuestionData={initialQuestionData}
        initialOptionData={initialOptionData}
      />

      <Card className="shadow-sm mt-3 mb-3">
        <CardBody className="text-end">
          <Button color="primary" type="button" onClick={storeQuiz}>
            Create Quiz
          </Button>
        </CardBody>
      </Card>
    </Form>
  );
};

export default CreateQuiz;
