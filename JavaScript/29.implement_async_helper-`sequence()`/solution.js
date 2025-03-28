
/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs){
  // your code here
  // Approach 1: without Promise
  return function(callback, data) {
    // recursion
    const callNextFunc = (nextFuncIndex, data) => {
      if (nextFuncIndex === funcs.length) {
        callback(undefined, data)
        return
      }

      const nextFunc = funcs[nextFuncIndex]
      nextFunc((error, newData) => {
        if (error) {
          callback(error)
          return
        }
        callNextFunc(nextFuncIndex + 1, newData)
      }, data)
    }

    callNextFunc(0, data)
  }
}

// or:

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs){
  // your code here
  // Approach 2: with Promise
  const promiseFuncs = funcs.map(promisify)

  return function(callback, data) {
    let chain = Promise.resolve(data)

    for (const func of promiseFuncs) {
      chain = chain.then(res => func(res))
    }

    chain.then(res => callback(undefined, res))
      .catch(callback)
  }
}

function promisify(func) {
  return function(data) {
    return new Promise((resolve, reject) => {
      func((error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      }, data)
    })
  }
}

// or:

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs){
  // your code here
  // Approach 3: with Promise + async/await
  const promiseFuncs = funcs.map(promisify)

  return async function(callback, data) {
    try {
      for (const func of promiseFuncs) {
        data = await func(data)
      }
      callback(undefined, data)
    } catch (error) {
      callback(error)
    }
  }
}
