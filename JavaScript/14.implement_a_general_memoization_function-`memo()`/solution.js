/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // your code here
  const cache = new Map()

  return function(...args) {
    const key = resolver ? resolver(...args) : args.join('_')
    if (cache.has(key)) {
      return cache.get(key)
    } else {
      const res = func.apply(this, args)
      cache.set(key, res)
      return res
    }
  }
}

/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // your code here
  // Map<key, Map<this, result>>
  const cache = new Map()

  return function(...args) {
    const key = resolver ? resolver(...args) : args.join('_')

    const cachedResults = cache.get(key)
    if (cachedResults?.has(this)) {
      return cachedResults.get(this)
    }
    const res = func.apply(this, args)
    if (cachedResults) {
      cachedResults.set(this, res)
    } else {
      cache.set(key, new Map([[this, res]]))
    }

    return res
  }
}
