import React, { useState, useEffect } from "react";
import {
	Card,
	CardBody,
	Col,
	ListGroup,
	ListGroupItem,
	Button,
	Row,
} from "reactstrap";
import localStorage from "../../utils/localStorage";
import { Link, useParams } from "react-router-dom";

const QuizVisitors = () => {
	const [quiz, setQuiz] = useState(null);
	const [visitors, setVisitors] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		localStorage.getDataItem("quizzes", id).then((res) => setQuiz(res));
		localStorage
			.getData(`quizVisitors-${id}`, id)
			.then((res) => setVisitors(res));
	}, [id]);

	if (!quiz)
		return (
			<Card>
				<CardBody className="text-center">Loading...</CardBody>
			</Card>
		);

	return (
		<Row className="justify-content-center">
			<Col lg={8}>
				<Card className="shadow mt-3 mb-3">
					<CardBody>
						<Button
							tag={Link}
							to={`/dashboard`}
							color=""
							className="text-primary p-0 fw-bold"
						>
							⇽ GO BACK
						</Button>
						<h5>{quiz.title}</h5>
					</CardBody>
				</Card>
				<Card className="shadow">
					<CardBody>
						<ListGroup>
							<ListGroupItem className="d-flex justify-content-between fw-bold">
								<span>Visitor ID</span> <span>Score</span>
							</ListGroupItem>
							{visitors.map((visitor, i) => (
								<ListGroupItem
									className="d-flex justify-content-between"
									key={i}
								>
									<span>{visitor.id}</span>
									<span>{visitor.finalScore}</span>
								</ListGroupItem>
							))}
						</ListGroup>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default QuizVisitors;
