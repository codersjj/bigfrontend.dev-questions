/**
 * @param {any} data
 * @return {string}
 */
function stringify(data) {
  // your code here
  // 1. BigInt
  if (typeof data === 'bigint') {
    throw new Error('Do not know how to serialize a BigInt')
  }

  // 2. undefined/function/Symbol
  if (
    typeof data === 'undefined' ||
    typeof data === 'function' ||
    typeof data === 'symbol'
  ) {
    return undefined
  }

  // 3. Infinity/NaN/null
  if (
    data === Infinity ||
    data === -Infinity ||
    Number.isNaN(data) ||
    data === null
  ) {
    return 'null'
  }

  // 4. string
  if (typeof data === 'string') {
    return `"${data}"`
  }

  // 5. number/boolean
  if (typeof data === 'number' || typeof data === 'boolean') {
    return `${data}`
  }

  // 6. Date
  if (Object.prototype.toString.call(data) === '[object Date]') {
    return `"${data.toISOString()}"`
  }

  // 7. Map/Set
  if (
    Object.prototype.toString.call(data) === '[object Map]' ||
    Object.prototype.toString.call(data) === '[object Set]'
  ) {
    if (!Reflect.ownKeys(data).length) {
      return '{}'
    }
  }

  // 8. Array
  if (Array.isArray(data)) {
    // Array.prototype.map() is not invoked for empty slots in sparse arrays.
    // meaning [, undefined, ,] => [, 'null', ,]
    // `[${arr.join(',')}]` => [,null,]
    // const arr = data.map((item) => {
    //   if (
    //     typeof item === 'undefined' ||
    //     typeof item === 'function' ||
    //     typeof item === 'symbol'
    //   ) {
    //     return 'null'
    //   }
    //   return _stringify(item)
    // })
    // return `[${arr.join(',')}]`

    const newArr = []

    for (const item of data) {
      if (
        typeof item === 'undefined' ||
        typeof item === 'function' ||
        typeof item === 'symbol'
      ) {
        newArr.push('null')
      } else {
        newArr.push(stringify(item))
      }
    }

    return `[${newArr.join()}]`
  }

  // 9. Object
  if (typeof data === 'object') {
    const res = Object.entries(data).reduce((acc, [key, value]) => {
      if (stringify(value) === undefined) {
        return acc
      }
      acc.push(`"${key}":${stringify(value)}`)
      return acc
    }, [])
    
    return `{${res.join()}}`
  }
}
