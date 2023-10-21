import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(wheel) {
  return {
    type: MOVE_CLOCKWISE,
    payload: wheel
  }
 }

export function moveCounterClockwise(wheel) { 
  return {
    type: MOVE_COUNTERCLOCKWISE,
    payload: wheel
  }
}

export function selectAnswer(selectAnswer) { 
  return {
    type: SET_SELECTED_ANSWER,
    payload: selectAnswer
  }
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message
  }
 }

export function setQuiz(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz
  }
 }

export function inputChange(form) { 
  return {
    type: INPUT_CHANGE,
    payload: form
  }
}

export function resetForm() { 
  return {
    type: RESET_FORM,
    payload: {
      newQuestion: '',
      newTrueAnswer: '',
      newFalseAnswer: '',
    }
  }
}

// ❗ Async action creators
export function fetchQuiz() {
  return async function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null));

    // On successful GET:
    const result = await fetch("http://localhost:9000/api/quiz/next", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz((await result.json())))
  }
}

export function postAnswer(quizId, answerId) {
  return async function (dispatch) {
    // On successful POST:
    const result = await fetch("http://localhost:9000/api/quiz/answer", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quiz_id: quizId, answer_id: answerId })
    });

    // - Dispatch an action to reset the selected answer state
    dispatch(selectAnswer(null))
    // - Dispatch an action to set the server message to state
    dispatch(setMessage((await result.json()).message))


    // - Dispatch the fetching of the next quiz
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)

    dispatch(setQuiz(null));

    // On successful GET:
    const fetchResult = await fetch("http://localhost:9000/api/quiz/next", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz((await fetchResult.json())))
  }
}

export function postQuiz(questionText, trueAnswerText, falseAnswerText) {
  return async function (dispatch) {
    // On successful POST:
    await fetch("http://localhost:9000/api/quiz/new", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question_text: questionText, true_answer_text: trueAnswerText, false_answer_text: falseAnswerText })
    });

    // - Dispatch the correct message to the the appropriate state
    dispatch(setMessage(`Congrats: "${questionText}" is a great question!`))
    // - Dispatch the resetting of the form
    dispatch(resetForm())
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
