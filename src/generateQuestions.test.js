import test from 'ava'
import generateQuestions from './generateQuestions.js'

test('initial state', (t) => {
  const state = generateQuestions()
  t.truthy(state, 'Did not get initial state.')
  t.is(state.length, 121, 'Did not get 121 questions.')
})