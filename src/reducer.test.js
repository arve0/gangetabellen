import reducer from './reducer.js'
import test from 'ava'

test('QUESTION', (t) => {
	let state = reducer()
	t.true(state.bins[0].length === 100)

	state = reducer(state, {
		type: 'QUESTION',
		question: state.bins[0][0]
	})

	t.true(state.question.x === 1)
	t.true(state.bins[0].length === 99)
})

test('INPUT', (t) => {
	let state = reducer()
	t.true(state.input === '')

	state = reducer(state, {
		type: 'INPUT',
		input: '1'
	})

	t.true(state.input === '1')
})

test('INPUT backspace', (t) => {
	let state = reducer()

	state = reducer(state, {
		type: 'INPUT',
		input: '1'
	})
	state = reducer(state, {
		type: 'INPUT',
		input: '1',
		key: { name: 'backspace' }
	})

	t.true(state.input === '')
})

test('Answers correct to all questions', (t) => {
	let state = reducer()
	const questions = state.bins[0]

	// move all to next bin
	questions.map(question => {
		state = reducer(state, {
			type: 'QUESTION',
			question
		})
		question.answer.split('').map(input => {
			state = reducer(state, {type: 'INPUT', input})
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
		state = reducer(state, {type: 'INPUT', input})
	})

	t.true(state.bins[0].length === 0)
	t.true(state.bins[1].length === 99)
	t.true(state.bins[2].length === 1)
})
