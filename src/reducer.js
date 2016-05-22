import generateQuestions from './generateQuestions.js'
import {
	INFO,
	TEST_START, TEST_CORRECT_ANSWER, TEST_DONE,
	ROUND_START,
	SET_QUESTION, QUESTION_INPUT } from './actions.js'

const initialState = {
	mode: '',
	info: { text: '' },
	test: { questions: [], answered: [] },
	timeGoal: 0,
	questions: generateQuestions(),
	currentQuestion: 0,
	input: ''
}

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case INFO:
			return { ...state,
				mode: 'info',
				info: action.info }

		case TEST_START:
			return { ...state,
				mode: 'test',
				test: {
					...state.test,
					// TODO: move Date.now() to action
					questions: action.questions.map((q, i) => (i === 0) ? { ...q, startTime: Date.now() } : q)
				}
			}

		case TEST_CORRECT_ANSWER:
			let questions = state.test.questions.map((q, i) => {
				if (i === 1) {
					// TODO: move Date.now() to action
					return { ...q, startTime: Date.now() }
				}
				return q
			})
			return {
				...state,
				input: '',
				test: {
					answered: [...state.test.answered, getAnsweredQuestion(state.test.questions)],
					questions: questions.slice(1)
				}
			}

		case TEST_DONE:
		  // in seconds, example 3.5
		  let time = median(state.test.answered.map((q) => q.time))
			return {
				...state,
				mode: 'info',
				timeGoal: time,
				info: {
					text: action.text.replace(/__time__/g, (time/1000).toFixed(1)),
					nextState: 'round'
				}
			}

		case ROUND_START:
		  return { ...state,
				mode: 'round'
			}

		case SET_QUESTION:
			return { ...state,
				currentQuestion: action.question,
				input: '' }

		case QUESTION_INPUT:
			var numbers = '0 1 2 3 4 5 6 7 8 9'.split(' ')
			let input = state.input
			if (action.key && action.key.name === 'backspace') {
				input = state.input.slice(0, state.input.length - 1)
			} else if (numbers.indexOf(action.input) !== -1) {
				input = state.input + action.input
			}
			return { ...state, input }
		default:
			return state
	}
}

function getAnsweredQuestion (questions) {
	let answered = {...questions[0]}  // copy
	// TODO: move Date.now() to action
	answered.time = Math.abs(Date.now() - answered.startTime)  // absolute, in case of jump in time
	delete answered.startTime
  return answered
}

function median (numbers = []) {
	let n = [...numbers].sort()
	let middle = Math.floor(n.length / 2)
	// odd -> return middle, even -> return average of middle
	return middle !== (n.length / 2) ? n[middle] : (n[middle - 1] + n[middle]) / 2
}