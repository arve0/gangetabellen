"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.between = between;
function between(a, b, prop) {
	return function (item) {
		if (prop) {
			item = item[prop];
		}
		return item > a && item < b;
	};
}
//# sourceMappingURL=filters.js.map