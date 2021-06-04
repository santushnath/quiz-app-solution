import React from "react";
import { Input, CustomInput, Button, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

const Options = ({
	onUpdate,
	options,
	initialOptionData,
	answers,
	oUpdateAnswers,
}) => {
	const setFields = (e, option, i) => {
		const { name, type, checked, value } = e.target;

		onUpdate([
			...options.slice(0, i),
			{
				...option,
				[name]: type === "checkbox" ? checked : value,
			},
			...options.slice(i + 1),
		]);
	};

	const remove = (i) => {
		onUpdate(options.filter((option, qi) => qi !== i));
	};

	const add = () => {
		onUpdate([...options, { ...initialOptionData, id: uuid() }]);
	};

	return (
		<div className="ps-3">
			{!options.length && <div className="text-center border">No Option</div>}
			{options.map((option, i) => (
				<div className={classNames("pt-1 mb-1", { "border-top": i })} key={i}>
					<Row className="align-items-center">
						<Col xs="auto" className="pe-2">
							<CustomInput
								type="checkbox"
								name="answers"
								value={option.id}
								id={uuid()}
								label=""
								checked={answers.includes(option.id)}
								onChange={(e) => {
									const value = e.target.value;
									let uAns = [...answers];
									if (uAns.includes(value))
										uAns = uAns.filter((id) => id !== value);
									else uAns = [...uAns, value];

									oUpdateAnswers({
										target: { name: "answers", type: "answers", value: uAns },
									});
								}}
							/>
						</Col>
						<Col className="ps-0 pe-2">
							<Input
								type="text"
								name="text"
								bsSize="sm"
								placeholder={`Option ${i + 1} (Required)`}
								value={option.text || ""}
								onChange={(e) => setFields(e, option, i)}
								required
							/>
						</Col>
						<Col className="ps-0 pe-2">
							<Input
								type="url"
								name="imageUrl"
								bsSize="sm"
								placeholder={`Image URL`}
								value={option.imageUrl || ""}
								onChange={(e) => setFields(e, option, i)}
							/>
						</Col>
						<Col xs="auto" className="ps-0" style={{ width: "31px" }}>
							{i > 1 && (
								<Button
									color=""
									size="sm"
									type="button"
									className="p-0 border-0 text-danger fw-bold fs-3"
									onClick={() => remove(i)}
								>
									⤬
								</Button>
							)}
						</Col>
					</Row>
				</div>
			))}
			<div className="text-end">
				<Button
					color="outline-warning"
					size="sm"
					type="button"
					className="py-0"
					onClick={add}
				>
					Add Option
				</Button>
			</div>
		</div>
	);
};

Options.propTypes = {
	onUpdate: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	answers: PropTypes.array.isRequired,
	oUpdateAnswers: PropTypes.func.isRequired,
	initialOptionData: PropTypes.object.isRequired,
};

export default Options;
