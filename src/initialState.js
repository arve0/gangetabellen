'use strict'

module.exports = () => {
  let arr = []
  for (let i = 0; i <= 10; ++i) {
    for (let j = 0; j <= 10; ++j) {
      arr.push({
        x: i,
        y: j
      })
    }
  }
  return arr
}
