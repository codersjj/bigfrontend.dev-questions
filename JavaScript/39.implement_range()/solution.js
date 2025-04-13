// Approach 1: for loop
/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  // your code here
  const res = []

  for (let i = from; i <= to; i++) {
    res.push(i)
  }

  return res
}

// or:

// Approach 2: Using an iterable object with Symbol.iterator
/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  // your code here
  const iterableObj = {
    [Symbol.iterator]() {
      let i = from

      return {
        next() {
          if (i <= to) {
            return { done: false, value: i++ }
          }
          return { done: true }
        }
      }
    }
  }

  return iterableObj
}

// or: 

/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  // your code here
  const iterableObj = {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: from > to, value: from++ }
        }
      }
    }
  }

  return iterableObj
}

// or:

// Approach 3: use generator
/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  // your code here
  const iterableObj = {
    *[Symbol.iterator]() {
      while (from <= to) {
        yield from++
      }
    }
  }

  return iterableObj
}

// or:

/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  // your code here
  return (function* () {
    while (from <= to) {
      yield from++
    }
  })(from, to)
}

// or:

/**
 * @param {integer} from
 * @param {integer} to
 */
function* range(from, to) {
  // your code here
  while (from <= to) {
    yield from++
  }
}
