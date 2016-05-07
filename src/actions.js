import { correct } from './sounds.js'

export function questionInput (store) {
	return (str, key) => {
		const { mode } = store.getState()
		if (mode === 'info') {
			pickNextQuestion(store)
		} else {
			store.dispatch({ type: 'QUESTION_INPUT', input: str, key })
			const { input, question } = store.getState()
			if (input === question.answer) {
				correct()
				pickNextQuestion(store)
			}
		}
	}
}

function pickNextQuestion (store) {
	const { bins } = store.getState()
	const randomQuestion = Math.floor(bins[0].length * Math.random())
	store.dispatch({
		type: 'QUESTION',
		question: bins[0][randomQuestion]
	})
}

export function exit (store) {
	return () => {
		const l = store.getState().bins[1].length
		console.log(`\nGot ${l} correct${(l > 1) ? ' ones':''}.`)
		process.exit()
	}
}

function getRandomQuestionAnswer (above, below) {
	
}