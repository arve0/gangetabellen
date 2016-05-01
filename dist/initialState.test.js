'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _initialState = require('./initialState.js');

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('initial state', function (t) {
  var state = (0, _initialState2.default)();
  t.truthy(state, 'Did not get initial state.');
  t.is(state.length, 121, 'Did not get 121 questions.');
});