'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var test = require('ava');
var ttyTestHelper = require('tty-test-helper');

var context = void 0;
test.before(function (t) {
	var CMD = 'index.js';
	context = ttyTestHelper(__dirname + '/' + CMD, {
		debug: false
	});
});

test.after(function (t) {
	// terminate child
	if (context.child.connected) {
		context.child.disconnect();
	}
});

/**
 * These tests will run serially.
 * You can run them concurrently by using `test((t) => { ... })`.
 */
test.serial('gets a welcome message', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(t) {
		var _context, stdout, waitFor;

		return regeneratorRuntime.wrap(function _callee$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context = context;
						stdout = _context.stdout;
						waitFor = _context.waitFor;
						return _context2.abrupt('return', waitFor('Velkommen', stdout));

					case 4:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return ref.apply(this, arguments);
	};
}());

test.serial('gets a question after the welcome message', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(t) {
		var _context3, stdout, stdin, waitFor, output;

		return regeneratorRuntime.wrap(function _callee2$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context3 = context;
						stdout = _context3.stdout;
						stdin = _context3.stdin;
						waitFor = _context3.waitFor;
						// press any key

						stdin.write('n');
						// expected: num x num =
						_context4.next = 7;
						return waitFor('x');

					case 7:
						output = _context4.sent;

						t.notThrows(function () {
							return matchQuestion(output);
						});

					case 9:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x2) {
		return ref.apply(this, arguments);
	};
}());

test.serial('test: if correct answer, gets a new question', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(t) {
		var _context5, stdout, stdin, waitFor, last, firstQuestion, answer, nextQuestion;

		return regeneratorRuntime.wrap(function _callee3$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context5 = context;
						stdout = _context5.stdout;
						stdin = _context5.stdin;
						waitFor = _context5.waitFor;
						last = _context5.last;
						// answer first question

						firstQuestion = last(stdout);
						answer = getAnswer(firstQuestion);

						stdin.write(answer);

						// get next question
						_context6.next = 10;
						return waitFor('x', stdout);

					case 10:
						nextQuestion = _context6.sent;


						t.notThrows(function () {
							return matchQuestion(nextQuestion);
						});
						t.true(firstQuestion != nextQuestion);

					case 13:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x3) {
		return ref.apply(this, arguments);
	};
}());

test.serial('test: gets median time after ten questions', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(t) {
		var _context7, stdout, stdin, last, wait, output, i, answer;

		return regeneratorRuntime.wrap(function _callee4$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context7 = context;
						stdout = _context7.stdout;
						stdin = _context7.stdin;
						last = _context7.last;
						wait = _context7.wait;
						output = void 0;
						// answer nine questions

						i = 0;

					case 7:
						if (!(i < 9)) {
							_context8.next = 16;
							break;
						}

						output = last(stdout);
						answer = getAnswer(output);

						stdin.write(answer);
						_context8.next = 13;
						return wait(100);

					case 13:
						++i;
						_context8.next = 7;
						break;

					case 16:
						output = last(stdout);
						t.regex(output, /regnestykkene innen 0.1 sekunder/);
						stdin.write('k'); // press a key to continue

					case 19:
					case 'end':
						return _context8.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x4) {
		return ref.apply(this, arguments);
	};
}());

test.serial('game: played in rounds of 10 questions', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(t) {
		var _context9, stdout, stdin, last, wait, output, i, answer;

		return regeneratorRuntime.wrap(function _callee5$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						_context9 = context;
						stdout = _context9.stdout;
						stdin = _context9.stdin;
						last = _context9.last;
						wait = _context9.wait;
						output = void 0;
						// answer ten questions

						i = 0;

					case 7:
						if (!(i < 10)) {
							_context10.next = 16;
							break;
						}

						output = last(stdout);
						answer = getAnswer(output);

						stdin.write(answer);
						_context10.next = 13;
						return wait(101);

					case 13:
						++i;
						_context10.next = 7;
						break;

					case 16:
						output = last(stdout);
						//	t.regex(output, /Din mediantid er [0-9\.]+ sekunder/)

					case 17:
					case 'end':
						return _context10.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function (_x5) {
		return ref.apply(this, arguments);
	};
}());

/**
 * Helper functions.
 */
function matchQuestion(q) {
	var r = new RegExp('([0-9]+) x ([0-9]+) \=');
	var m = q.match(r);
	if (!m || m.length !== 3) {
		throw new Error(q + ' not an question of the form `3 x 3 =`');
	}
	return m;
}

function getAnswer(q) {
	var m = matchQuestion(q);
	return '' + m[1] * m[2];
}
//# sourceMappingURL=index.test.js.map