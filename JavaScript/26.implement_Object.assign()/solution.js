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

  // if (['string', 'number', 'boolean'].includes(typeof target)) {
  //   target = Object(target)
  // }
  
  if (typeof target !== 'object') target = Object(target)

  for (const source of sources) {
    if (source === null || source === undefined) continue

    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source)
        .filter(sKey => Object.getOwnPropertyDescriptor(source, sKey).enumerable)
    ]

    keys.forEach(key => {
      if (readOnlyProps.includes(key)) throw new Error(`Cannot assign to read only property '${key}' of object`)
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

  /*
    1. copy `enumerable` `own property` key from sources to target
      (1). string keys
      (2). symbol keys
    2. exceptions
      (1). if target is nullish(null/undefined), throw an error(Cannot convert null or undefined to object)
      (2). if assignment of a property on the target fails(such as the property is non-writable on the target), throw an error()
        using Reflect.set()
    3. if target is primitive value, convert target to an object
    4. if source is null or undefined, it will be ignored.
  */
 
  if (target === undefined || target === null) throw new Error('Cannot convert undefined or null to object')
  
  // if (['string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof target)) {
  //   target = Object(target)
  // }
  if (typeof target !== 'object') target = Object(target)

  for (const source of sources) {
    if (source === null || source === undefined) continue

    const keys = [
      ...Object.keys(source), // own enumerable string-keyed property
      ...Object.getOwnPropertySymbols(source)
        .filter(sKey => Object.getOwnPropertyDescriptor(source, sKey).enumerable)
    ]

    for (const key of keys) {
      if (!Reflect.set(target, key, source[key])) {
        throw new Error(`Cannot assign to read only property '${key}' of object`)
      }
    }
  }

  return target
}


// test

console.log(Object.assign(0, {a: 2342}))
console.log(objectAssign(0, {a: 2342}))

console.log(Object.assign({}, 'abc'))
console.log(objectAssign({}, 'abc'))

console.log(Object.assign(Symbol('a'), { height: 20 }))
console.log(objectAssign(Symbol('a'), { height: 20 }))
console.log(Object.assign(2n, { height: 20 }))
console.log(objectAssign(2n, { height: 20 }))

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
// console.log(Object.assign(target, { bar: 666, foo: 999 }))
// console.log(objectAssign(target, { bar: 666, foo: 999 }))

const target2 = Object.defineProperty({}, 'foo', {
  set(val) {
    console.log('set foo~')
    throw new Error('Setting foo was rejected')
  }
})
// target2.foo = '233'
// console.log(Object.assign(target2, { bar: 666, foo: 999 }))
// console.log(objectAssign(target2, { bar: 666, foo: 999 }))
