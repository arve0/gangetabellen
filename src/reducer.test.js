import reducer from './reducer.js'
import test from 'ava'
import {
	setInfo, startTest, testCorrectAnswer, testDone,
	startRound,
	setQuestion, questionInput
} from './actions.js'

test(setInfo().type, (t) => {
	let state = reducer()
	t.truthy(state.info)

	state = reducer(state, setInfo({ text: 'asdf', nextState: 'fff' }))

	t.true(state.mode === 'info')
	t.true(state.info.text === 'asdf')
	t.true(state.info.nextState === 'fff')
})

test(startTest().type, (t) => {
	let state = reducer()
	t.truthy(state.test)

	state = reducer(state, startTest([{x: 1, y: 2}]))

	t.true(state.mode === 'test')
	t.true(state.test.questions.length === 1)
	t.true(state.test.questions[0].x === 1)
	t.truthy(state.test.questions[0].startTime)
	t.true(state.test.questions[0].startTime <= Date.now())
})

test(testCorrectAnswer().type, async (t) => {
	let state = reducer()
	state = reducer(state, startTest([{ x: 1, y: 2, answer: '2' }, { x: 2, y: 2, answer: '4' }]))
	state = reducer(state, questionInput(state.test.questions[0].answer))
	await sleep()
	let startTime = Date.now()
	state = reducer(state, testCorrectAnswer())

	t.deepEqual(state.test.questions[0], { x: 2, y: 2, answer: '4', startTime })
	t.true(state.test.answered.length === 1)
	t.truthy(state.test.answered[0].time)
	t.true(state.input === '')

	await sleep()
	state = reducer(state, testCorrectAnswer())
	t.truthy(state.test.answered[1].time)
})

test(testDone().type, (t) => {
	let state = reducer()
	state = reducer(state, startTest([{ x: 1, y: 2, answer: '2' }, { x: 2, y: 2, answer: '4' }]))
	state = reducer(state, testCorrectAnswer())
	state = reducer(state, testCorrectAnswer())
	state = reducer(state, testDone())

  t.regex(state.info.text, /Testen er ferdig./)
})

test(setQuestion().type, (t) => {
	let state = reducer()
	t.true(state.questions.length === 100)

	state = reducer(state, setQuestion(10))

	t.true(state.currentQuestion === 10)
})

test(questionInput().type, (t) => {
	let state = reducer()
	t.true(state.input === '')

	state = reducer(state, questionInput('1'))

	t.true(state.input === '1')
})

test(questionInput().type + ': backspace', (t) => {
	let state = reducer()

	state = reducer(state, questionInput('1'))
	t.true(state.input === '1')
	state = reducer(state, questionInput('1', { name: 'backspace' }))

	t.true(state.input === '')
})

test(startRound().type, (t) => {
	let state = reducer()
	state = reducer(state, startRound())

	t.true(state.mode === 'round')
})

// test('Moves questions upon correct answer', (t) => {
// 	let state = reducer()
// 	const questions = state.questions

// 	// move all to next bin
// 	questions.map(question => {
// 		state = reducer(state, {
// 			type: 'QUESTION',
// 			question
// 		})
// 		question.answer.split('').map(input => {
// 			state = reducer(state, {type: 'QUESTION_INPUT', input})
// 		})
// 	})

// 	t.true(state.bins[0].length === 0)

// 	// move one to next bin
// 	state = reducer(state, {
// 		type: 'QUESTION',
// 		question: state.bins[1][10]
// 	})
// 	state.question.answer.split('').map(input => {
// 		state = reducer(state, {type: 'QUESTION_INPUT', input})
// 	})

// 	t.true(state.bins[0].length === 0)
// 	t.true(state.bins[1].length === 99)
// 	t.true(state.bins[2].length === 1)
// })

function sleep (time = 1) {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}