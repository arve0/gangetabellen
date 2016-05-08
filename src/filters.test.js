import test from 'ava'
import generateQuestions from './generateQuestions.js'
import { getTestQuestions } from './filters.js'

test('picks test questions', (t) => {
	let questions = generateQuestions()
	questions = questions.filter(getTestQuestions)
	t.true(questions.length === 38)
})
