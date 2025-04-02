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
function race(funcs){
  // your code here
  return function(callback, data) {
    const promises = funcs.map(func => promisify(func)(data))
    Promise.race(promises)
      .then(res => callback(undefined, res))
      .catch(error => callback(error, undefined))
  }
}

function promisify(func) {
  return function(data) {
    return new Promise((resolve, reject) => {
      func((error, data) => {
        if (error) reject(error)
        else resolve(data)
      }, data)
    })
  }
}

// or:

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function race(funcs){
  // your code here
  return function(callback, data) {
    let isSettled = false

    for (const func of funcs) {
      func((error, data) => {
        if (isSettled) return

        isSettled = true
        // if (error) {
        //   callback(error, undefined)
        // } else {
        //   callback(undefined, data)
        // }
        callback(error, data)
      }, data)
    }
  }
}
