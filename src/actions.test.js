import test from 'ava'
import { testMode, questionInput, setQuestion } from './actions.js'

test('testMode', (t) => {
	let action = testMode()
	t.true(action.type === 'MODE')
	t.true(action.mode === 'test')
})

test('questionInput', (t) => {
	let key = {}
	let action = questionInput('a', key)
	t.true(action.type === 'QUESTION_INPUT')
	t.true(action.input === 'a')
	t.true(action.key === key)
})

test('setQuestion', (t) => {
	let question = {}
	let action = setQuestion(question)
	t.true(action.type === 'QUESTION')
	t.true(action.question === question)
})
