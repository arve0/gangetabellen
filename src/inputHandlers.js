import { correct } from './sounds.js'
import {
	startTest, testCorrectAnswer, testDone,
	startRound,
	questionInput, setQuestion
} from './actions.js'

export function inputHandler (store) {
	return (str, key) => {
		// Ctrl + C
		if (key.ctrl && key.name === 'c') {
			process.kill(process.pid, 'SIGINT')
		}
		const { mode, info } = store.getState()
		if (mode === 'info' && info.nextState === 'test') {
			// start test
			const testQuestions = getTestQuestions(store.getState().questions)
			store.dispatch(startTest(testQuestions))
		} else if (mode === 'test') {
			// test answer
			store.dispatch(questionInput(str, key))
			const { input, test } = store.getState()
			if (input === test.questions[0].answer) {
				// correct test answer
				correct()
				store.dispatch(testCorrectAnswer())
			}
			if (store.getState().test.questions.length === 0) {
				// test done
				store.dispatch(testDone())
			}
		} else if (mode === 'info' && info.nextState === 'round') {
			// start round
			store.dispatch(startRound())
		}	else if (mode === 'round') {
			// round answer
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

function getTestQuestions (bin) {
	let pool = bin.filter((q) => q.x > 1 && q.x < 6 && q.answer < 40)
	let questions = []
	for (let i = 0; i < 10; ++i) {
		// copy question into array
		let q = pickRandomQuestion(pool)
		pool = pool.filter((qq) => qq !== q)
		questions.push({ ...q })
	}
	return questions
}
