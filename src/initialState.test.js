import test from 'ava'
import initialState from './initialState.js'

test('initial state', (t) => {
  const state = initialState()
  t.truthy(state, 'Did not get initial state.')
  t.is(state.length, 121, 'Did not get 121 questions.')
})
