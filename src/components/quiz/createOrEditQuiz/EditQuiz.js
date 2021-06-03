import React, { useState, useEffect, useCallback } from "react";
import { Form, Card, CardBody, Button, Col } from "reactstrap";
import GeneralFields from "./GeneralFields";
import Questions from "./Questions";
import quizLayout from "../../../utils/quizLayout";
import localStorage from "../../../utils/localStorage";
import { v4 as uuid } from "uuid";
import { useParams, Link } from "react-router-dom";
import Row from "reactstrap/lib/Row";
import { toast } from "react-toastify";

const initialOptionData = {
	id: null,
	text: "",
	imageUrl: "",
};

const initialQuestionData = {
	id: null,
	title: "",
	points: null,
	answers: [],
	options: [
		{ ...initialOptionData, id: uuid() },
		{ ...initialOptionData, id: uuid() },
	],
};

const initialFormData = {
	id: null,
	title: "",
	questionLayout: quizLayout.allQuestions,
	questions: [{ ...initialQuestionData }],
};

const EditQuiz = () => {
	const [formData, setFormData] = useState({ ...initialFormData, id: uuid() });
	const { id } = useParams();

	const loadQuiz = useCallback(() => {
		localStorage.getDataItem("quizzes", id).then((res) => setFormData(res));
	}, [id]);

	const setField = (e) => {
		const { name, type, checked, value } = e.target;

		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const onUpdateQuestions = (questions) => {
		setFormData({
			...formData,
			questions,
		});
	};

	const storeQuiz = (e) => {
		e.preventDefault();

		localStorage.setData("quizzes", formData, id).then(() => {
			toast.success("Quiz Updated");
		});
	};

	useEffect(() => {
		loadQuiz();
	}, [id, loadQuiz]);

	return (
		<Row className="justify-content-center">
			<Col lg={8}>
				<Form onSubmit={storeQuiz}>
					<Card className="shadow mt-3 mb-3">
						<CardBody className="d-flex justify-content-between align-items-center">
							<h5>Edit Quiz</h5>
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

					<Card className="shadow mt-3 mb-3">
						<CardBody className="text-end">
							<Button color="primary">Update Quiz</Button>
						</CardBody>
					</Card>
				</Form>
			</Col>
		</Row>
	);
};

export default EditQuiz;
