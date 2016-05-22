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
		console.log(d);
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
 * These tests will run serially.
 * You can run them concurrently by using `test((t) => { ... })`.
 */
test.serial('gets a welcome message', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(t) {
		var _context, stdout;

		return regeneratorRuntime.wrap(function _callee$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context = context;
						stdout = _context.stdout;
						return _context2.abrupt('return', waitFor('Velkommen', stdout));

					case 3:
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
						return waitFor('x', stdout);

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

test.serial('test: if correct answer, gets a new question', function () {
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
						return waitFor('x', stdout);

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

test.serial('test: gets median time after ten questions', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(t) {
		var _context7, stdout, child, output, i, answer;

		return regeneratorRuntime.wrap(function _callee4$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context7 = context;
						stdout = _context7.stdout;
						child = _context7.child;
						output = void 0;
						// answer nine questions

						i = 0;

					case 5:
						if (!(i < 9)) {
							_context8.next = 14;
							break;
						}

						output = last(stdout);
						answer = getAnswer(output);

						child.stdin.write(answer);
						_context8.next = 11;
						return sleep(100);

					case 11:
						++i;
						_context8.next = 5;
						break;

					case 14:
						output = last(stdout);
						t.regex(output, /regnestykkene innen 0.1 sekunder/);
						child.stdin.write('k'); // press a key to continue

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

test.serial('game: played in rounds of 10 questions', function () {
	var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(t) {
		var _context9, stdout, child, output, i, answer;

		return regeneratorRuntime.wrap(function _callee5$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						_context9 = context;
						stdout = _context9.stdout;
						child = _context9.child;
						output = void 0;
						// answer ten questions

						i = 0;

					case 5:
						if (!(i < 10)) {
							_context10.next = 14;
							break;
						}

						output = last(stdout);
						answer = getAnswer(output);

						child.stdin.write(answer);
						_context10.next = 11;
						return sleep(101);

					case 11:
						++i;
						_context10.next = 5;
						break;

					case 14:
						output = last(stdout);
						//	t.regex(output, /Din mediantid er [0-9\.]+ sekunder/)

					case 15:
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
function waitFor() {
	var what = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	var where = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	var onlyNew = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	var timeout = arguments.length <= 3 || arguments[3] === undefined ? 1000 : arguments[3];

	return new Promise(function (resolve, reject) {
		var t = void 0,
		    i = void 0,
		    l = void 0;
		// check every 10 ms
		if (onlyNew) {
			l = what.length;
		}
		i = setInterval(function () {
			if (onlyNew && what.length === l) {
				return;
			}
			if (last(where) && last(where).indexOf(what) !== -1) {
				clearTimeout(t);
				clearInterval(i);
				resolve(last(where));
			}
		}, 10);
		// or time out
		t = setTimeout(function () {
			clearInterval(i);
			reject('timed out after ' + timeout + ' milliseconds, did not find "' + what + '" in "' + last(where) + '"');
		}, timeout);
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

function sleep() {
	var time = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}
//# sourceMappingURL=index.test.js.map