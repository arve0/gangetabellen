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
		const { mode } = store.getState()
		if (mode === 'info') {
			pickNextQuestion()
		} else {
			store.dispatch({ type: 'INPUT', input: str, key })
			const { input, question } = store.getState()
			if (input === question.answer) {
				pickNextQuestion()
			}
		}
	}
}

function pickNextQuestion () {
	const { bins } = store.getState()
	const randomQuestion = Math.floor(bins[0].length * Math.random())
	store.dispatch({
		type: 'QUESTION',
		question: bins[0][randomQuestion]
	})
}

// start game
store.dispatch({
	type: 'INFO',
	info: {
		text: 'Velkommen. Før vi starter, skal vi ta en test for å se hvor rask du er. Trykk på en knapp for å fortsette.'
	}
})

function render ({ mode, input, question, info }) {
	readline.clearLine(process.stdout, 0)
	readline.cursorTo(process.stdout, 0)
	// console.log(store.getState())
	let output
	if (mode === 'question') {
		const correct = (input === question.answer) ? ' ✓\n' : ''
		output = question.text + input + correct
	} else {
		output = info.text
	}
	process.stdout.write(output)
}
