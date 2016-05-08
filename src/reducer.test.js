import reducer from './reducer.js'
import test from 'ava'

test('INFO', (t) => {
	let state = reducer()
	t.truthy(state.info)

	state = reducer(state, {
		type: 'INFO',
		info: {
			text: 'asdf'
		}
	})

	t.true(state.mode === 'info')
	t.true(state.info.text === 'asdf')
})

test('MODE', (t) => {
	let state = reducer()
	t.true(state.mode === '')

	state = reducer(state, {
		type: 'MODE',
		mode: 'test'
	})

	t.true(state.mode === 'test')
})

test('TEST', (t) => {
	let state = reducer()
	t.truthy(state.test)

	state = reducer(state, {
		type: 'TEST',
		test: {
			answerAbove: 2,
			answerBelow: 20
		}
	})

	t.true(state.mode === 'test')
	t.true(state.test.answerAbove === 2)
	t.true(state.test.answerBelow === 20)
})

test('QUESTION', (t) => {
	let state = reducer()
	t.true(state.bins[0].length === 100)

	const question = state.bins[0][0]
	state = reducer(state, {
		type: 'QUESTION',
		question
	})

	t.true(state.question.x === question.x)
	t.true(state.bins[0].length === 99)
})

test('QUESTION_INPUT', (t) => {
	let state = reducer()
	t.true(state.input === '')

	state = reducer(state, {
		type: 'QUESTION_INPUT',
		input: '1'
	})

	t.true(state.input === '1')
})

test('QUESTION_INPUT: backspace', (t) => {
	let state = reducer()

	state = reducer(state, {
		type: 'QUESTION_INPUT',
		input: '1'
	})
	t.true(state.input === '1')
	state = reducer(state, {
		type: 'QUESTION_INPUT',
		input: '1',
		key: { name: 'backspace' }
	})

	t.true(state.input === '')
})

test('Moves questions upon correct answer', (t) => {
	let state = reducer()
	const questions = state.bins[0]

	// move all to next bin
	questions.map(question => {
		state = reducer(state, {
			type: 'QUESTION',
			question
		})
		question.answer.split('').map(input => {
			state = reducer(state, {type: 'QUESTION_INPUT', input})
		})
	})

	t.true(state.bins[0].length === 0)
	t.true(state.bins[1].length === 100)

	// move one to next bin
	state = reducer(state, {
		type: 'QUESTION',
		question: state.bins[1][10]
	})
	state.question.answer.split('').map(input => {
		state = reducer(state, {type: 'QUESTION_INPUT', input})
	})

	t.true(state.bins[0].length === 0)
	t.true(state.bins[1].length === 99)
	t.true(state.bins[2].length === 1)
})
