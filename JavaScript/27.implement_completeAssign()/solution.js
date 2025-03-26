function completeAssign(target, ...sources) {
  // your code here
  if (target === undefined || target === null) throw new Error('Cannot convert undefined or null to object')
  
  if (typeof target !== 'object') target = Object(target)

  for (const source of sources) {
    if (source === null || source === undefined) continue

    const keys = [
      // ...Object.keys(source), // own enumerable string-keyed properties
      ...Object.getOwnPropertyNames(source), // own string-keyed properties
      ...Object.getOwnPropertySymbols(source)
    ]

    for (const key of keys) {
      // if (!Reflect.set(target, key, source[key])) {
      //   throw new Error(`Cannot assign to read only property '${key}' of object`)
      // }
      
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
    }
  }

  return target
}

// or:

function completeAssign(target, ...sources) {
  // your code here
  if (target === undefined || target === null) throw new Error('Cannot convert undefined or null to object')
  
  if (typeof target !== 'object') target = Object(target)

  for (const source of sources) {
    if (source === null || source === undefined) continue

    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
  }

  return target
}

// test:

console.log(Object.assign(0, {a: 2342}))
console.log(completeAssign(0, {a: 2342}))

console.log(Object.assign({}, 'abc'))
console.log(completeAssign({}, 'abc'))

console.log(Object.assign(Symbol('a'), { height: 20 }))
console.log(completeAssign(Symbol('a'), { height: 20 }))
console.log(Object.assign(2n, { height: 20 }))
console.log(completeAssign(2n, { height: 20 }))

const sourceObj = {}
const s1 = Symbol('s1')
Object.defineProperty(sourceObj, s1, {
  value: 2333,
  enumerable: false
})
console.log(Object.assign({}, sourceObj))
console.log(completeAssign({}, sourceObj))

const target = Object.defineProperty({}, 'foo', {
  configurable: true,
  value: 1,
  writable: true
  // writable: false
}); // target.foo is a read-only property
target.foo = 2333
// console.log(Object.assign(target, { bar: 666, foo: 999 }))
console.log(completeAssign(target, { bar: 666, foo: 999 }))

const target2 = Object.defineProperty({}, 'foo', {
  set(val) {
    console.log('set foo~')
    throw new Error('Setting foo was rejected')
  }
})
// target2.foo = '233'
// console.log(Object.assign(target2, { bar: 666, foo: 999 }))
// console.log(completeAssign(target2, { bar: 666, foo: 999 }))

const res = completeAssign({}, 'abc')
console.log(res)
console.log(res.length)
