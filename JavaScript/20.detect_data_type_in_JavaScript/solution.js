
/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  // your code here
  const tag = Object.prototype.toString.call(data) // '[object Undefined]'
  const matches = tag.match(/\[object (\w+)\]/)

  if (matches) {
    return matches[1].toLowerCase()
  }
  throw new Error('unexpected data type')
}

// or:

/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  // your code here
  return Object.prototype.toString.call(data).slice(1, -1).split(' ')[1].toLowerCase()
}
