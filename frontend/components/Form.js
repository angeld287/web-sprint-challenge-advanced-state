import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import {inputChange, postQuiz} from '../state/action-creators'

export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

  const onChange = evt => {
    evt.preventDefault();
    const newForm = props.form;
    newForm[evt.target.id] = evt.target.value
    props.inputChange({newQuestion: newForm.newQuestion, newTrueAnswer: newForm.newTrueAnswer, newFalseAnswer: newForm.newFalseAnswer})
  }

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz(newQuestion, newTrueAnswer, newFalseAnswer);
  }

  const buttonDisabled = useMemo(() => {
    return newQuestion.trim() === '' || newTrueAnswer.trim() === '' || newFalseAnswer.trim() === ''
  }, [newQuestion, newTrueAnswer, newFalseAnswer])

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" type="submit" disabled={buttonDisabled}>Submit new quiz</button>
    </form>
  )
}

export default connect(state => state, {inputChange, postQuiz})(Form)
