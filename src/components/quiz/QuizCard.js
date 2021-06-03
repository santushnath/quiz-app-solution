import React, { Fragment } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const QuizCard = ({ quiz, deleteQuiz, viewType }) => {
	return (
		<Card className="shadow h-100">
			<CardBody className="h-100 d-flex justify-content-between flex-column">
				<h4>{quiz.title}</h4>
				<div className="mt-2">
					{viewType === "visitor" && (
						<Button
							tag={Link}
							to={`/view/${quiz.id}`}
							color="primary"
							size="sm"
							className="me-2"
						>
							View Quiz
						</Button>
					)}
					{viewType === "controller" && (
						<Fragment>
							<Button
								tag={Link}
								to={`/visitors/${quiz.id}`}
								color="primary"
								size="sm"
								className="me-2"
							>
								Visitor List
							</Button>
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
								onClick={() => deleteQuiz && deleteQuiz(quiz.id)}
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
	deleteQuiz: PropTypes.func,
	viewType: PropTypes.oneOf(["visitor", "controller"]),
};

QuizCard.defaultProps = {
	viewType: "controller",
};

export default QuizCard;
