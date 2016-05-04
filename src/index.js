import { createStore } from 'redux'
import generateQuestions from './generateQuestions.js'
import readline from 'readline'

const initialState = {
  questions: generateQuestions(),
  currentQuestion: null,
  question: {},
  input: ''
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'PICK_QUESTION':
      return { ...state,
        currentQuestion: action.question,
        question: state.questions[action.question] }
    case 'INPUT':
      var numbers = '0 1 2 3 4 5 6 7 8 9'.split(' ')
      let input = state.input
      if (action.key.name === 'backspace') {
        input = input.slice(0, input.length - 1)
      } else if (numbers.indexOf(action.input) !== -1) {
        input += action.input
      }
      return { ...state, input }
    case 'RESET_INPUT':
      return { ...state, input: '' }
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  const state = store.getState()
  const question = state.questions[state.currentQuestion]
  if (question && question.answer === state.input) {
    console.log(' ✓')
    pickNextQuestion()
    // TODO: keep score
    return
  }
  render(state)
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('close', () => {
  console.log('bye!')
  // TODO: show score result
})

function pickNextQuestion () {
  const { questions } = store.getState()
  const randomQuestion = Math.floor(questions.length * Math.random())
  store.dispatch({ type: 'RESET_INPUT' })
  store.dispatch({
    type: 'PICK_QUESTION',
    question: randomQuestion
  })
}

pickNextQuestion()

readline.emitKeypressEvents(process.stdin)
process.stdin.on('keypress', registerInput)

function registerInput (input, key) {
  store.dispatch({
    type: 'INPUT',
    input,
    key
  })
}

function render ({ input, question }) {
  if (question) {
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(question.text + input)
  }
}
