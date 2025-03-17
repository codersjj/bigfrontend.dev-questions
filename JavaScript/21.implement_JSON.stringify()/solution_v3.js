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

  // 6. Number/String/Boolean
  if (
    Object.prototype.toString.call(data) === '[object Number]' ||
    Object.prototype.toString.call(data) === '[object String]' ||
    Object.prototype.toString.call(data) === '[object Boolean]'
  ) {
    return `${stringify(data.valueOf())}`
  }

  // 7. Date
  if (Object.prototype.toString.call(data) === '[object Date]') {
    return `"${data.toISOString()}"`
  }

  // 8. Map/Set
  if (
    Object.prototype.toString.call(data) === '[object Map]' ||
    Object.prototype.toString.call(data) === '[object Set]'
  ) {
    if (!Reflect.ownKeys(data).length) {
      return '{}'
    }
  }

  // 9. Array
  if (Array.isArray(data)) {
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

  // 10. Object
  if (typeof data === 'object') {
    if (typeof data.toJSON === 'function') {
      return stringify(data.toJSON())
    }

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

// test

const numObj = new Number(12)
console.log(stringify(numObj))
console.log(JSON.stringify(numObj))
const strObj = new String('hhh')
console.log(stringify(strObj))
console.log(JSON.stringify(strObj))
const booleanObj = new Boolean()
console.log(stringify(booleanObj))
console.log(JSON.stringify(booleanObj))

console.log(stringify([NaN, null, undefined, Infinity]))
console.log(JSON.stringify([NaN, null, undefined, Infinity]))
console.log(stringify([, undefined, ,]))
console.log(JSON.stringify([, undefined, ,]))

const objWithToJSON = { 
  year: 2025,
  toJSON() {
    return 'from toJSON'
  }
}
console.log(stringify(objWithToJSON))
console.log(JSON.stringify(objWithToJSON))

const objWithToJSON2 = { 
  year: 2025,
  toJSON() {
    return { a: 'from toJSON' }
  }
}
console.log(stringify(objWithToJSON2))
console.log(JSON.stringify(objWithToJSON2))

const map = new Map([[1, '111']])
console.log(stringify(map))
console.log(JSON.stringify(map))

const objWithSpecificValue = {
  a: 1,
  b: undefined,
  c: () => {},
  d: Symbol()
}
console.log(stringify(objWithSpecificValue))
console.log(JSON.stringify(objWithSpecificValue))