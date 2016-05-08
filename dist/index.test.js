'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var test = require('ava');
var fork = require('child_process').fork;

var context = void 0;
test.before(function (t) {
	var CMD = 'index.js';
	// silent: true -> do not pipe child.stdout to process.stdout
	var child = fork(CMD, [], { silent: true });

	// keep output history in an array
	var stdout = [];
	child.stdout.setEncoding('utf8');
	child.stdout.on('data', function (d) {
		stdout.push(d);
	});

	child.stderr.on('data', function (d) {
		throw new Error(d);
	});

	// access child and stdout array from tests
	context = { child: child, stdout: stdout };
});

test.after(function (t) {
	// terminate child
	if (context.child.connected) {
		context.child.disconnect();
	}
});

/**
 * plan:
 * 1. keep history of data
 * 2. test length of data array
 * 3. test contents of data array
 * 4. send response
 * 5. expect new data in array
 * 6. continue
 */

/**
 * These tests will run serially.
 * You can run them concurrently by using `test((t) => { ... })`.
 */
test.serial('gets a welcome message', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(t) {
		var _context, stdout, output;

		return regeneratorRuntime.wrap(function _callee$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context = context;
						stdout = _context.stdout;
						_context2.next = 4;
						return waitFor(stdout);

					case 4:
						output = _context2.sent;

						// console.log(output)
						t.regex(output, 'Velkommen', 'Did not get welcome message.');

					case 6:
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
		var _context3, stdout, child, output;

		return regeneratorRuntime.wrap(function _callee2$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context3 = context;
						stdout = _context3.stdout;
						child = _context3.child;
						// press any key

						child.stdin.write('n');
						// expected: num x num =
						_context4.next = 6;
						return waitFor(stdout);

					case 6:
						output = _context4.sent;

						t.notThrows(function () {
							return matchQuestion(output);
						});

					case 8:
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

test.serial('if correct answer, gets a new question', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(t) {
		var _context5, stdout, child, firstQuestion, answer, nextQuestion;

		return regeneratorRuntime.wrap(function _callee3$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context5 = context;
						stdout = _context5.stdout;
						child = _context5.child;
						// answer first question

						firstQuestion = last(stdout);
						answer = getAnswer(firstQuestion);

						child.stdin.write(answer);

						// get next question
						_context6.next = 8;
						return waitFor(stdout);

					case 8:
						nextQuestion = _context6.sent;


						t.notThrows(function () {
							return matchQuestion(nextQuestion);
						});
						t.true(firstQuestion != nextQuestion);

					case 11:
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

test.serial('initially get no more than ten questions', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(t) {
		var _context7, stdout, child, i, answer;

		return regeneratorRuntime.wrap(function _callee4$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context7 = context;
						stdout = _context7.stdout;
						child = _context7.child;
						// answer nine questions

						i = 0;

					case 4:
						if (!(i < 9)) {
							_context8.next = 13;
							break;
						}

						_context8.next = 7;
						return waitFor(stdout);

					case 7:
						output = _context8.sent;
						answer = getAnswer(output);

						child.stdin.write(answer);

					case 10:
						++i;
						_context8.next = 4;
						break;

					case 13:
						_context8.next = 15;
						return waitFor(stdout);

					case 15:
						output = _context8.sent;

						t.notThrows(function () {
							return matchQuestion(output);
						});

					case 17:
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

/**
 * Helper functions.
 */
function waitFor(what, timeout) {
	timeout = timeout || 1000;
	var initial = what.length;
	return new Promise(function (resolve, reject) {
		var interval = setInterval(function () {
			if (initial !== what.length) {
				resolve(last(what));
			}
		}, 10); // check every 10 ms
		setTimeout(reject, timeout);
	});
}

function last(arr) {
	return arr.slice(arr.length - 1)[0];
}

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