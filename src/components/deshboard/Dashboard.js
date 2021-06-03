import React, { useEffect, useState, useContext } from "react";
import localStorage from "../../utils/localStorage";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import QuizCard from "../quiz/QuizCard";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [quizs, setQuizs] = useState([]);

  const deleteQuiz = (id) => {
    localStorage.deleteDataItem("quizs", id).then((res) => {
      console.log(res);
      setQuizs(res);
    });
  };

  useEffect(() => {
    localStorage.getData("quizs").then((res) => setQuizs(res));
  }, []);

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Quizs</h1>
        <div>
          <Button
            size="sm"
            color="outline-primary"
            className="me-2"
            tag={Link}
            to={`/dashboard`}
          >
            All Quizs
          </Button>
          {user && (
            <Button size="sm" color="outline-primary" tag={Link} to={`/create`}>
              Create Quiz
            </Button>
          )}
        </div>
      </div>
      <Row className="mt-4">
        {quizs.map((quiz, i) => (
          <Col md="4" key={i}>
            <QuizCard quiz={quiz} deleteQuiz={deleteQuiz} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
