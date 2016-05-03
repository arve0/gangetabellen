import { createStore } from 'redux'
import generateQuestions from './generateQuestions.js'
import readline from 'readline'

const initialState = {
  questions: generateQuestions(),
  currentQuestion: null
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'PICK_QUESTION':
      return {...state, currentQuestion: action.question}
    default:
      return state
  }
}

const store = createStore(reducer)

function pickNextQuestion () {
  const { questions } = store.getState()
  store.dispatch({
    type: 'PICK_QUESTION',
    question: Math.floor(questions.length * Math.random())
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askQuestion () {
  pickNextQuestion()
  const state = store.getState()
  const question = state.questions[state.currentQuestion]
  rl.question('What is ' + question.text + '? ', (answer) => {
    answer = parseInt(answer, 10)
    if (answer === question.answer) {
      console.log('Correct!')
    } else {
      console.log('Wrong :-(')
      console.log('Correct is ' + question.answer)
    }
    askQuestion()
  })
}

askQuestion()
