'use strict';

var _redux = require('redux');

var _initialState = require('./initialState.js');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numbers = (0, _initialState2.default)();

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? numbers : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'NUMBERS':
      return state;
    default:
      return state;
  }
}

var store = (0, _redux.createStore)(reducer);

store.subscribe(function () {
  console.log(store.getState());
});

// do not exit
setInterval(function () {}, 1000);