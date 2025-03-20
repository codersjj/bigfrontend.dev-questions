/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
  // your code here
  let i = 0

  function parseValue(str) {
    const res = (
      parseString(str) ??
      parseNumber(str) ??
      parseObject(str) ??
      parseArray(str) ??
      parseKeyword('true', true) ??
      parseKeyword('false', false) ??
      parseKeyword('null', null)
    )

    if (res === undefined) {
      throw new Error('Invalid value')
    }

    return res
  }

  const parseString = str => {
    if (str[i] !== '"') return

    let s = ''

    i++
    while (i < str.length && str[i] !== '"') {
      s += str[i]
      i++
    }
    i++
    
    return s
  }

  const parseNumber = str => {
    let start = i

    while (i < str.length && isDigit(str[i])) {
      i++
    }

    if (start < i) {
      return +str.slice(start, i)
    }
  }

  const isDigit = s => {
    return /^\d$/.test(s)
  }

  const parseObject = str => {
    if (str[i] !== '{') return

    i++

    let obj = {}
    let init = true

    while (i < str.length && str[i] !== '}') {
      if (!init) eatComma(str)

      const key = parseString(str)
      eatColon(str)
      const value = parseValue(str)
      obj[key] = value

      init = false
    }

    i++

    return obj
  }

  const eatComma = str => {
    if (str[i] !== ',') throw new Error('Expected ","')
    i++
  }

  const eatColon = str => {
    if (str[i] !== ':') throw new Error('Expected ":"')
    i++
  }

  const parseArray = str => {
    if (str[i] !== '[') return

    i++

    const arr = []
    let init = true

    while (i < str.length && str[i] !== ']') {
      if (!init) eatComma(str)

      const value = parseValue(str)
      arr.push(value)

      init = false
    }

    i++

    return arr
  }

  const parseKeyword = (s, value) => {
    if (str.slice(i, i + s.length) === s) {
      i += s.length
      return value
    }
  }

  return parseValue(str)
}

// test

console.log(parse('{}'))
console.log(JSON.parse('{}'))

console.log(parse('{"a":3}'))
console.log(JSON.parse('{"a":3}'))
// console.log(parse('{"a":3,}'))
// console.log(JSON.parse('{"a":3,}'))

console.log(parse('true'))
console.log(JSON.parse('true'))

console.log(parse('false'))
console.log(JSON.parse('false'))

console.log(parse('123'))
console.log(JSON.parse('123'))

// console.log(parse('"123"'))
// console.log(JSON.parse('"123"'))

console.log(parse('null'))
console.log(JSON.parse('null'))

console.log(parse('[{"a":{"b":{"c":[1]}}},null,"str"]'))
console.log(JSON.parse('[{"a":{"b":{"c":[1]}}},null,"str"]'))

console.log(parse('[{"a":{"b":{"c":[1],"d":"BFE,dev"}}},null,"str"]'))
console.log(JSON.parse('[{"a":{"b":{"c":[1],"d":"BFE,dev"}}},null,"str"]'))

console.log(parse('{"a":"✌️"}'))
console.log(JSON.parse('{"a":"✌️"}'))

// console.log(parse('[1,2,]'))
// console.log(JSON.parse('[1,2,]'))

// console.log(parse('{\'a\':3}'))
// console.log(JSON.parse('{\'a\':3}'))

// console.log(parse('{"a":}'))
// console.log(JSON.parse('{"a":}'))
