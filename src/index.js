import { createStore } from 'redux'
import readline from 'readline'
import reducer from './reducer.js'
import { inputHandler } from './inputHandlers.js'
import { setInfo } from './actions.js'

const store = createStore(reducer)

store.subscribe(() => {
	render(store.getState())
})

// set up console
if (process.stdin.isTTY) {
	// not TTY if spawn from another node process
	process.stdin.setRawMode(true)
}
readline.emitKeypressEvents(process.stdin)

process.stdin.on('keypress', inputHandler(store))
process.on('SIGINT', exit(store))

// start game
store.dispatch(setInfo({
	text: 'Velkommen!\nFør vi starter, skal vi ta en test for å se hvor rask du er.\nTrykk på en knapp for å fortsette.',
	nextState: 'test'
}))

function render ({ mode, input, question, info, test }) {
	readline.clearLine(process.stdout, 0)
	readline.cursorTo(process.stdout, 0)
	// console.log(store.getState())
	let output
	if (mode === 'info') {
		output = info.text
	} else if (mode === 'test' && test.questions[0]) {
		const q = test.questions[0]
		const correct = (input === q.answer) ? ' ✓\n' : ''
		output = q.text + input + correct
	} else if (mode === 'question') {
		const correct = (input === question.answer) ? ' ✓\n' : ''
		output = question.text + input + correct
	} else {
		output = ''
	}
	process.stdout.write(output)
}

function exit (store) {
	return () => {
		const c = store.getState().questions.reduce((sum, q) => q.correctAnswers, 0)
		console.log(`\nGot ${c} correct${(c > 1) ? ' ones' : ''}.`)
		process.exit()
	}
}
