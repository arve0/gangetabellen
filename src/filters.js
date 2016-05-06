
export function between (a, b, prop) {
	return (item) => {
		if (prop) {
			item = item[prop]
		}
		return item > a && item < b
	}
}
