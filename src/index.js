import { createStore } from 'redux'
import readline from 'readline'
import reducer from './reducer.js'
import { inputHandler, listenForCtrlC } from './inputHandlers.js'

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
process.stdin.on('keypress', listenForCtrlC)
process.on('SIGINT', exit(store))

// start game
store.dispatch({
	type: 'INFO',
	info: {
		text: 'Velkommen!\nFør vi starter, skal vi ta en test for å se hvor rask du er.\nTrykk på en knapp for å fortsette.'
	}
})

function render ({ mode, input, question, info, test }) {
	readline.clearLine(process.stdout, 0)
	readline.cursorTo(process.stdout, 0)
	// console.log(store.getState())
	let output
	switch (mode) {
		case 'info':
			output = info.text
			break
		case 'test':  // same as question
		case 'question':
			const correct = (input === question.answer) ? ' ✓\n' : ''
			output = question.text + input + correct
			break
		default:
			output = ''
	}
	process.stdout.write(output)
}

function exit (store) {
	return () => {
		const l = store.getState().bins[1].length
		console.log(`\nGot ${l} correct${(l > 1) ? ' ones' : ''}.`)
		process.exit()
	}
}
