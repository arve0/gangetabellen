import test from 'ava'
import generateQuestions from './generateQuestions.js'

test('initial state', (t) => {
  const state = generateQuestions()
  t.truthy(state, 'Did not get initial state.')
  t.is(state.length, 100, 'Did not get 100 questions.')
})
