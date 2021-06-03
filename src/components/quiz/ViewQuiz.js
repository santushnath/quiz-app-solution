import React, { useState, useEffect, useCallback, Fragment } from "react";
import {
	Form,
	Card,
	CardBody,
	Button,
	Col,
	CustomInput,
	Input,
} from "reactstrap";
import quizLayout from "../../utils/quizLayout";
import localStorage from "../../utils/localStorage";
import { v4 as uuid } from "uuid";
import { useParams, Link } from "react-router-dom";
import Row from "reactstrap/lib/Row";
import classNames from "classnames";
import PropTypes from "prop-types";
import _ from "lodash";

const QuizItem = ({ question, onAnswered, score }) => {
	return (
		<CardBody className={classNames("border-bottom")}>
			<h6>{question.title}</h6>
			{question.options.map((option, oi) => (
				<div key={oi}>
					<CustomInput
						type="checkbox"
						name="answers"
						value={option.id}
						id={uuid()}
						label={
							<span>
								<span className="ms-2 d-flex">{option.text}</span>
								{option.imageUrl && (
									<img
										src={option.imageUrl}
										alt={question.title}
										className="img-fluid border rounded"
									/>
								)}
							</span>
						}
						checked={score.includes(option.id)}
						onChange={() => {
							const value = option.id;
							let uAns = [...score];
							if (uAns.includes(value))
								uAns = uAns.filter((id) => id !== value);
							else uAns = [...uAns, value];

							onAnswered(question.id, uAns);
						}}
					/>
				</div>
			))}
		</CardBody>
	);
};
QuizItem.propTypes = {
	question: PropTypes.object.isRequired,
	score: PropTypes.array.isRequired,
	onAnswered: PropTypes.func.isRequired,
};

const ViewQuiz = () => {
	const [visitorId, setVisitorId] = useState(uuid());
	const [cQuestion, setCurrentQuestion] = useState(0);
	const [quiz, setQuiz] = useState(null);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState({});
	const [finalScore, setFinalScore] = useState(0);
	const { id } = useParams();

	const handleQuestionSubmission = () => {
		const nQuestion = cQuestion + 1;
		if (
			quiz.questionLayout === quizLayout.oneQuestionPerPage &&
			nQuestion < quiz.questions.length
		) {
			setCurrentQuestion(nQuestion);
		} else {
			const questionAnswers = _.map(quiz.questions, (e) => {
				let ids = e.answers;
				ids.sort();
				return { ...e, answers: ids };
			});

			let result = 0;
			_.forEach(score, (value, key) => {
				const qa = questionAnswers.find((e) => e.id === key);

				if (JSON.stringify(value) === JSON.stringify(_.get(qa, "answers"))) {
					result += parseInt(_.get(qa, "points"));
				}
			});
			setFinalScore(result);
			setShowScore(true);
			localStorage.setData(`quizVisitors-${id}`, {
				id: visitorId,
				score,
				finalScore: result,
			});
		}
	};

	const onAnswered = (questionId, value) => {
		const updatedScore = { ...score };
		value.sort();
		_.set(updatedScore, questionId, value);
		setScore(updatedScore);
	};

	const reset = () => {
		setVisitorId(uuid());
		setCurrentQuestion(0);
		setShowScore(false);
		setScore({});
		setFinalScore(0);
	};

	useEffect(() => {
		localStorage.getDataItem("quizzes", id).then((res) => setQuiz(res));
	}, [id]);

	if (!quiz)
		return (
			<Card>
				<CardBody className="text-center">Loading...</CardBody>
			</Card>
		);

	const _renderAllQuestions = () => {
		return (
			<Fragment>
				{quiz.questions.map((question, i) => (
					<QuizItem
						key={i}
						question={question}
						onAnswered={onAnswered}
						score={_.get(score, question.id, [])}
					/>
				))}
			</Fragment>
		);
	};

	const _renderPerPageQuestion = () => {
		return (
			<Fragment>
				<QuizItem
					question={quiz.questions[cQuestion]}
					onAnswered={onAnswered}
					score={_.get(score, quiz.questions[cQuestion].id, [])}
				/>
			</Fragment>
		);
	};

	return (
		<Row className="justify-content-center">
			<Col lg={8}>
				<Form>
					<Card className="shadow mt-3 mb-3">
						<CardBody className="border-bottom">
							<p className="mb-0">VISITOR ID: {visitorId}</p>
						</CardBody>
						<CardBody className="d-flex justify-content-between align-items-center">
							<h5>{quiz.title}</h5>
							{quiz.questionLayout === quizLayout.oneQuestionPerPage && (
								<h5 className="ps-3 text-nowrap text-primary">
									Question {cQuestion + 1}/{quiz.questions.length}
								</h5>
							)}
						</CardBody>
					</Card>
					{showScore ? (
						<Card className="shadow">
							<CardBody className="text-center">
								<h2 className="fw-normal">Your Points: {finalScore}</h2>
								<Button color="warning" onClick={reset} className="mt-3">
									Try Again
								</Button>
							</CardBody>
						</Card>
					) : (
						<Fragment>
							<Card className="shadow mt-3 mb-3">
								{quiz.questionLayout === quizLayout.allQuestions ? (
									<Fragment>{_renderAllQuestions()}</Fragment>
								) : (
									<Fragment>{_renderPerPageQuestion()}</Fragment>
								)}
							</Card>

							<Card className="shadow mt-3 mb-3">
								<CardBody className="text-end">
									<Button
										color="primary"
										type="button"
										onClick={handleQuestionSubmission}
									>
										Submit
									</Button>
								</CardBody>
							</Card>
						</Fragment>
					)}
				</Form>
			</Col>
		</Row>
	);
};

export default ViewQuiz;
