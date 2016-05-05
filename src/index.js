import { createStore } from 'redux'
import readline from 'readline'
import reducer from './reducer.js'

const store = createStore(reducer)

store.subscribe(() => {
	render(store.getState())
})

// set up console
const rl = readline.createInterface(process.stdin, process.stdout)
readline.emitKeypressEvents(process.stdin)

process.stdin.on('keypress', registerInput(store))
rl.on('close', () => {
	const state = store.getState()
	console.log(`\nGot ${state.bins[1].length} correct ones.`)
})

function registerInput (store) {
	return (str, key) => {
		store.dispatch({ type: 'INPUT', input: str, key })
		const { input, question } = store.getState()
		if (input === question.answer) {
			pickNextQuestion()
		}
	}
}

function render ({ input, question }) {
	readline.clearLine(process.stdout, 0)
	readline.cursorTo(process.stdout, 0)
	const correct = input === question.answer
	const output = question.text + input + (correct ? ' ✓\n' : '')
	process.stdout.write(output)
}

function pickNextQuestion () {
	const { bins } = store.getState()
	const randomQuestion = Math.floor(bins[0].length * Math.random())
	store.dispatch({
		type: 'PICK_QUESTION',
		question: bins[0][randomQuestion]
	})
}

// start next game
pickNextQuestion()
