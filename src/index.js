import { createStore } from 'redux'
import initialState from './initialState.js'

const numbers = initialState()

function reducer (state = numbers, action) {
  switch (action.type) {
    case 'NUMBERS':
      return state
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

// do not exit
setInterval(() => {}, 1000)
