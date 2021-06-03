import React, { Fragment, useContext } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import PropTypes from "prop-types";

const QuizCard = ({ quiz, deleteQuiz, viewType }) => {
  const { user } = useContext(UserContext);
  console.log(viewType);

  return (
    <Card className="shadow-sm mb-2">
      <CardBody>
        <h4>{quiz.title}</h4>
        <div>
          <Button
            tag={Link}
            to={`/view/${quiz.id}`}
            color="primary"
            size="sm"
            className="me-2"
          >
            View
          </Button>
          {user && viewType === "controller" && (
            <Fragment>
              <Button
                tag={Link}
                to={`/edit/${quiz.id}`}
                color="primary"
                size="sm"
                className="me-2"
              >
                Edit
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => deleteQuiz(quiz.id)}
              >
                Delete
              </Button>
            </Fragment>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

QuizCard.propTypes = {
  quiz: PropTypes.object.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  viewType: PropTypes.oneOf(["user", "controller"])
};

QuizCard.defaultTypes = {
  viewType: "controller"
};

export default QuizCard;
