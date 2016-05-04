'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _generateQuestions = require('./generateQuestions.js');

var _generateQuestions2 = _interopRequireDefault(_generateQuestions);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  questions: (0, _generateQuestions2.default)(),
  currentQuestion: null,
  question: {},
  input: ''
};

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'PICK_QUESTION':
      return _extends({}, state, {
        currentQuestion: action.question,
        question: state.questions[action.question] });
    case 'INPUT':
      var numbers = '0 1 2 3 4 5 6 7 8 9'.split(' ');
      var input = state.input;
      if (action.key.name === 'backspace') {
        input = input.slice(0, input.length - 1);
      } else if (numbers.indexOf(action.input) !== -1) {
        input += action.input;
      }
      return _extends({}, state, { input: input });
    case 'RESET_INPUT':
      return _extends({}, state, { input: '' });
    default:
      return state;
  }
}

var store = (0, _redux.createStore)(reducer);

store.subscribe(function () {
  var state = store.getState();
  var question = state.questions[state.currentQuestion];
  if (question && question.answer === state.input) {
    console.log(' ✓');
    pickNextQuestion();
    // TODO: keep score
    return;
  }
  render(state);
});

var rl = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('close', function () {
  console.log('bye!');
  // TODO: show score result
});

function pickNextQuestion() {
  var _store$getState = store.getState();

  var questions = _store$getState.questions;

  var randomQuestion = Math.floor(questions.length * Math.random());
  store.dispatch({ type: 'RESET_INPUT' });
  store.dispatch({
    type: 'PICK_QUESTION',
    question: randomQuestion
  });
}

pickNextQuestion();

_readline2.default.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', registerInput);

function registerInput(input, key) {
  store.dispatch({
    type: 'INPUT',
    input: input,
    key: key
  });
}

function render(_ref) {
  var input = _ref.input;
  var question = _ref.question;

  if (question) {
    _readline2.default.clearLine(process.stdout, 0);
    _readline2.default.cursorTo(process.stdout, 0);
    process.stdout.write(question.text + input);
  }
}