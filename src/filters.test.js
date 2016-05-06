import { between } from './filters.js'
import generateQuestions from './generateQuestions.js'
import test from 'ava'

test('between', (t) => {
	const questions = generateQuestions()
	const filtered = questions.filter(between(10, 30, 'answer'))

	t.true(filtered.length === 30)
})

