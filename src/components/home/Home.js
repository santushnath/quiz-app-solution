import React, { useEffect, useState } from "react";
import localStorage from "../../utils/localStorage";
import { Card, CardBody, Col, Row } from "reactstrap";
import QuizCard from "../quiz/QuizCard";

const Home = () => {
	const [quizzes, setQuizzes] = useState([]);

	const loadQuizzes = () => {
		localStorage.getData("quizzes").then((res) => setQuizzes(res));
	};

	useEffect(() => {
		loadQuizzes();
	}, []);

	return (
		<div>
			<Card className="shadow">
				<CardBody>
					<h1>Quizzes</h1>
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
						<QuizCard quiz={quiz} viewType="visitor" />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Home;
