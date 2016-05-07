import { createStore } from 'redux'
import readline from 'readline'
import reducer from './reducer.js'
import { questionInput, exit } from './actions.js'

const store = createStore(reducer)

store.subscribe(() => {
	render(store.getState())
})

// set up console
process.stdin.setRawMode(true)
readline.emitKeypressEvents(process.stdin)

process.stdin.on('keypress', questionInput(store))
process.stdin.on('keypress', listenForCtrlC)
process.on('SIGINT', exit(store))

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

function listenForCtrlC (_, key) {
	if (key.ctrl && key.name === 'c') {
		process.kill(process.pid, 'SIGINT')
	}
}