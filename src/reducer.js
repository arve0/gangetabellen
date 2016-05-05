import generateQuestions from './generateQuestions.js'

const initialState = {
  // five bins with questions
  bins: [generateQuestions(), [], [], [], []],
  question: {},
  input: '',
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case 'PICK_QUESTION':
      const bins = removeItemFromBins(state.bins, action.question)
      return { ...state,
        question: action.question,
        input: '',
        bins }
    case 'INPUT':
      var numbers = '0 1 2 3 4 5 6 7 8 9'.split(' ')
      let input
      if (action.key && action.key.name === 'backspace') {
        input = state.input.slice(0, state.input.length - 1)
      } else if (numbers.indexOf(action.input) !== -1) {
        input = state.input + action.input
        // if correct, inc counter and add back to bin
        if (input === state.question.answer) {
          const correctAnswers = state.question.correctAnswers + 1
          state.question = {...state.question, correctAnswers }
          // add back to one of the bins
          state.bins = [
            ...state.bins.slice(0, correctAnswers),
            [...state.bins[correctAnswers], state.question],
            ...state.bins.slice(correctAnswers + 1)
          ]
        }
      } else {
        input = state.input
      }
      return { ...state, input }
    default:
      return state
  }
}

function removeItemFromBins (bins, item) {
  return bins.map(innerArr => innerArr.filter(i => i !== item))
}