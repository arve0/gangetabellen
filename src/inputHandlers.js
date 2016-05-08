import { correct } from './sounds.js'
import { testMode, questionInput, setQuestion } from './actions.js'

export function inputHandler (store) {
	return (str, key) => {
		const { mode } = store.getState()
		if (mode === 'info') {
			store.dispatch(testMode())
			const { bins } = store.getState()
			const newQuestion = pickRandomQuestion(bins[0])
			store.dispatch(setQuestion(newQuestion))
		} else {
			store.dispatch(questionInput(str, key))
			const { input, question, bins } = store.getState()
			if (input === question.answer) {
				correct()
				const newQuestion = pickRandomQuestion(bins[0])
				store.dispatch(setQuestion(newQuestion))
			}
		}
	}
}

function pickRandomQuestion (bin) {
	const randomQuestion = Math.floor(bin.length * Math.random())
	return bin[randomQuestion]
}

export function listenForCtrlC (_, key) {
	if (key.ctrl && key.name === 'c') {
		process.kill(process.pid, 'SIGINT')
	}
}
