import React, { Fragment, useCallback, useRef } from "react";
import { Input, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import Options from "./Options";
import update from "immutability-helper";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

const DragHandeler = styled.span`
  cursor: move;
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
`;

const QuestionItem = ({
  remove,
  question,
  index,
  setFields,
  initialOptionData,
  moveCard
}) => {
  const ref = useRef(null);
  const [collection, drop] = useDrop({
    accept: "question",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "question",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 1 : 1;
  preview(drop(ref));
  return (
    <div ref={ref} style={{ opacity }}>
      <CardBody className="border-bottom">
        <FormGroup className="mb-2">
          <Label
            for="title"
            className="d-flex align-items-cente justify-content-between"
          >
            <span className="d-flex align-items-center">
              <DragHandeler ref={drag}>☰</DragHandeler>
              <span>
                {/* {index + 1}.  */}
                Question title
              </span>
            </span>
            <button
              type="button"
              className="btn p-0 border-0 text-danger"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
            value={question.title || ""}
            onChange={(e) => setFields(e, question, index)}
          />
        </FormGroup>
        <Options
          options={question.options}
          onUpdate={(options) =>
            setFields(
              {
                target: { value: options, name: "options", type: "option" }
              },
              question,
              index
            )
          }
          answers={question.answers}
          oUpdateAnswers={(e) => setFields(e, question, index)}
          initialOptionData={initialOptionData}
        />
      </CardBody>
    </div>
  );
};
QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  initialOptionData: PropTypes.object.isRequired,
  index: PropTypes.any,
  setFields: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired
};

const Questions = ({
  onUpdate,
  questions,
  initialQuestionData,
  initialOptionData
}) => {
  const setFields = (e, question, i) => {
    const { name, type, checked, value } = e.target;

    onUpdate([
      ...questions.slice(0, i),
      {
        ...question,
        [name]: type === "checkbox" ? checked : value
      },
      ...questions.slice(i + 1)
    ]);
  };

  const remove = (i) => {
    onUpdate(questions.filter((question, qi) => qi !== i));
  };

  const add = () => {
    onUpdate([...questions, { ...initialQuestionData, id: uuid() }]);
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = questions[dragIndex];
      const updatedQuestion = update(questions, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      });
      console.log(dragIndex, hoverIndex, updatedQuestion);
      onUpdate(updatedQuestion);
    },
    [questions, onUpdate]
  );

  return (
    <Fragment>
      <Card className="shadow-sm mb-3">
        {!questions.length && (
          <CardBody className="text-center border-bottom">No Question</CardBody>
        )}
        {questions.map((question, i) => (
          <QuestionItem
            question={question}
            index={i}
            setFields={setFields}
            remove={remove}
            add={add}
            initialOptionData={initialOptionData}
            key={i}
            moveCard={moveCard}
          />
        ))}
        <CardBody className="text-end">
          <Button
            color="outline-primary"
            size="sm"
            type="button"
            className="py-1"
            onClick={add}
          >
            Add Question
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

Questions.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  initialQuestionData: PropTypes.object.isRequired,
  initialOptionData: PropTypes.object.isRequired
};

export default Questions;
