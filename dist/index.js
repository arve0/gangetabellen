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
  currentQuestion: null
};

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'PICK_QUESTION':
      return _extends({}, state, { currentQuestion: action.question });
    default:
      return state;
  }
}

var store = (0, _redux.createStore)(reducer);

function pickNextQuestion() {
  var _store$getState = store.getState();

  var questions = _store$getState.questions;

  store.dispatch({
    type: 'PICK_QUESTION',
    question: Math.floor(questions.length * Math.random())
  });
}

var rl = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  pickNextQuestion();
  var state = store.getState();
  var question = state.questions[state.currentQuestion];
  rl.question('What is ' + question.text + '? ', function (answer) {
    answer = parseInt(answer, 10);
    if (answer === question.answer) {
      console.log('Correct!');
    } else {
      console.log('Wrong :-(');
      console.log('Correct is ' + question.answer);
    }
    askQuestion();
  });
}

askQuestion();