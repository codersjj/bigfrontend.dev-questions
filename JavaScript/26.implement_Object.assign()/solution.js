// 'use strict'

/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  // your code here
  if (target === undefined || target === null) throw new Error('Cannot convert undefined or null to object')
  
  const readOnlyProps = []
  Object.entries(Object.getOwnPropertyDescriptors(target)).map(([key, des]) => {
    if (!des.writable) {
      readOnlyProps.push(key)
    }
  })
  
  // if (typeof target === 'string') target = new String(target)
  // if (typeof target === 'number') target = new Number(target)
  // if (typeof target === 'boolean') target = new Boolean(target)

  if (['string', 'number', 'boolean'].includes(typeof target)) {
    target = Object(target)
  }

  for (const source of sources) {
    if (source === null || source === undefined) continue

    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source)
        .filter(sKey => Object.getOwnPropertyDescriptor(source, sKey).enumerable)
    ]

    keys.forEach(key => {
      if (readOnlyProps.includes(key)) throw new Error(`"${key}" is read-only`)
      target[key] = source[key]
    })
  }

  return target
}

// or:

/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  // your code here
  if (target === undefined || target === null) throw new Error('Cannot convert undefined or null to object')
  
  if (['string', 'number', 'boolean'].includes(typeof target)) {
    target = Object(target)
  }

  for (const source of sources) {
    if (source === null || source === undefined) continue

    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source)
        .filter(sKey => Object.getOwnPropertyDescriptor(source, sKey).enumerable)
    ]

    for (const key of keys) {
      if (!Reflect.set(target, key, source[key])) {
        throw new Error(`"${key}" is read-only`)
      }
    }
  }

  return target
}


// test

console.log(Object.assign(0, {a: 2342}))
console.log(objectAssign(0, {a: 2342}))
const sourceObj = {}
const s1 = Symbol('s1')
Object.defineProperty(sourceObj, s1, {
  value: 2333,
  enumerable: false
})
console.log(Object.assign({}, sourceObj))
console.log(objectAssign({}, sourceObj))

const target = Object.defineProperty({}, 'foo', {
  value: 1,
  writable: false
}); // target.foo is a read-only property
target.foo = 2333
