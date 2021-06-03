import React, { useEffect, useState, useContext } from "react";
import localStorage from "../../utils/localStorage";
import { Button, Row, Col, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import QuizCard from "../quiz/QuizCard";

const Dashboard = () => {
	const { user } = useContext(UserContext);
	const [quizzes, setQuizzes] = useState([]);

	const deleteQuiz = (id) => {
		localStorage.deleteDataItem("quizzes", id).then((res) => {
			console.log(res);
			setQuizzes(res);
		});
	};

	useEffect(() => {
		localStorage.getData("quizzes").then((res) => setQuizzes(res));
	}, []);

	return (
		<div>
			<Card className="shadow">
				<CardBody className="d-flex justify-content-between align-items-center">
					<h1>Quizzes</h1>
					<div>
						<Button
							size="sm"
							color="outline-primary"
							className="me-2"
							tag={Link}
							to={`/dashboard`}
						>
							All Quizzes
						</Button>
						{user && (
							<Button
								size="sm"
								color="outline-primary"
								tag={Link}
								to={`/create`}
							>
								Create Quiz
							</Button>
						)}
					</div>
				</CardBody>
			</Card>
			<Row className="mt-4">
				{!quizzes.length && (
					<Col md={12}>
						<Card className="shadow">
							<CardBody className="fs-1 fw-bold text-black-50 text-center">
								No Quiz
							</CardBody>
						</Card>
					</Col>
				)}
				{quizzes.map((quiz, i) => (
					<Col md="4" className="mb-4" key={i}>
						<QuizCard
							quiz={quiz}
							deleteQuiz={deleteQuiz}
							viewType="controller"
						/>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Dashboard;
