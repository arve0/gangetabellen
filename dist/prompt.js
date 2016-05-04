'use strict';

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var input = '';
var question = 'What is the meaning of life? ';

var rl = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});
_readline2.default.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', registerInput);

function registerInput(str, key) {
  if (key.name === 'backspace') {
    input = input.slice(0, input.length - 1);
  } else {
    var numbers = '1 2 3 4 5 6 7 8 9 0'.split(' ');
    if (numbers.indexOf(str) !== -1) {
      input += str;
    }
  }
  if (input === '42') {
    console.log(' ✓');
    input = '';
  }
  render(question, input);
}

function render(question, input) {
  _readline2.default.clearLine(process.stdout, 0);
  _readline2.default.cursorTo(process.stdout, 0);
  process.stdout.write(question + input);
}

render(question, input);