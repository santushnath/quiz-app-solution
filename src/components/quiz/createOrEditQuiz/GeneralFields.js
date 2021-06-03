import React from "react";
import {
	Input,
	Card,
	CardBody,
	FormGroup,
	Label,
	CustomInput,
} from "reactstrap";
import PropTypes from "prop-types";
import quizLayout from "../../../utils/quizLayout";

const GeneralFields = ({ formData, setField }) => {
	return (
		<Card className="shadow mb-3">
			<CardBody>
				<FormGroup className="mb-3">
					<Label for="title">Quiz title (Required)</Label>
					<Input
						id="title"
						type="text"
						name="title"
						value={formData.title || ""}
						onChange={setField}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label>Question Layout</Label>
					<div>
						<CustomInput
							id="layout-1"
							type="radio"
							name="questionLayout"
							value={quizLayout.allQuestions}
							checked={formData.questionLayout === quizLayout.allQuestions}
							onChange={setField}
							label={
								<span className="ms-2">All questions on a single page</span>
							}
						/>
						<CustomInput
							id="layout-2"
							type="radio"
							name="questionLayout"
							value={quizLayout.oneQuestionPerPage}
							checked={
								formData.questionLayout === quizLayout.oneQuestionPerPage
							}
							onChange={setField}
							label={<span className="ms-2">One question per page</span>}
						/>
					</div>
				</FormGroup>
			</CardBody>
		</Card>
	);
};

GeneralFields.propTypes = {
	formData: PropTypes.object.isRequired,
	setField: PropTypes.func.isRequired,
};

export default GeneralFields;
