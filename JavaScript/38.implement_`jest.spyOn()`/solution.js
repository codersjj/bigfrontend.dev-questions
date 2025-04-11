
/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  // your code here
  const calls = []

  const originalMethod = obj[methodName]

  if (typeof originalMethod !== 'function') {
    throw new Error(`${methodName} is not a function`)
  }

  obj[methodName] = function(...args) {
    calls.push(args)
    return originalMethod.apply(this, args)
  }

  return {
    calls
  }
}

// or:


/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  // your code here
  const calls = []

  if (typeof obj[methodName] !== 'function') {
    throw new Error('not function')
  }

  const proxyObjMethod = new Proxy(obj[methodName], {
    apply(target, thisArg, argumentsList) {
      calls.push(argumentsList)
      return target.apply(thisArg, argumentsList)
    }
  })

  obj[methodName] = proxyObjMethod

  return { calls }
}


// test:

// const obj = {
//    data: 1, 
//    increment(num) {
//       this.data += num
//    }
// }
// const spy = spyOn(obj, 'increment2')
// obj.increment(1)
// console.log(obj.data) // 2
// obj.increment(2)
// console.log(obj.data) // 4
// console.log(spy.calls)
