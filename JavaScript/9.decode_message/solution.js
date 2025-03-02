// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
  // your code here
  if (!message.length) return ''
  if (!message[0].length) return ''
  
  const ROWS = message.length
  const COLS = message[0].length
  
  let res = ''
  let row = 0
  let col = 0
  let directionY = 1

  while (col < COLS && row >= 0 && row < ROWS) {
    res += message[row][col]
    col++
    row += directionY

    if (row >= ROWS) {
      directionY = -1
      row -= 2
    } else if (row < 0) {
      directionY = 1
      row += 2
    }
  }

  return res
}
