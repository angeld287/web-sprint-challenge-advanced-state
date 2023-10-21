// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return {
        ...state,
        wheel: state.wheel + 1
      }

    case MOVE_COUNTERCLOCKWISE:  
      return {
        ...state,
        wheel: state.wheel - 1
      }
  
    default:
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.payload) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz: state.payload
      }
    default:
      return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.payload) {
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload
      }
    default:
      return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.payload) {
    case SET_INFO_MESSAGE:
      return {
        ...state,
        infoMessage: action.payload
      }
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        form: action.payload
      }

    case RESET_FORM:  
      return {
        ...state,
        form: initialFormState
      }
  
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
