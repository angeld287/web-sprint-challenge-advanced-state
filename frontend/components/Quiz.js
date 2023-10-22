import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'

function Quiz(props) {
  useEffect(() => {
    if(props.quiz === null) props.fetchQuiz();
  }, []);

  const selectAnswer = (e, answerId) => {
    e.preventDefault();
    props.selectAnswer(answerId);
  }

  const submitAnswer = (e, quizId) => {
    e.preventDefault();
    if(props.selectedAnswer) props.postAnswer(quizId, props.selectedAnswer);
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz !== null ? (
          <>
            <h2>{props.quiz.question}</h2>
            <div id="quizAnswers">
              {props.quiz.answers.map(answer => <div key={answer.answer_id} className={`answer ${props.selectedAnswer === answer.answer_id ? 'selected' : ''}`}>
                {answer.text}
                <button onClick={e => selectAnswer(e, answer.answer_id)}>
                  {props.selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>)}
            </div>

            <button id="submitAnswerBtn" disabled={props.selectedAnswer === null} onClick={e => submitAnswer(e, props.quiz.quiz_id)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, {fetchQuiz, selectAnswer, postAnswer})(Quiz)