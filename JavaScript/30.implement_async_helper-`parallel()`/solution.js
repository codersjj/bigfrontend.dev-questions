
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
function parallel(funcs){
  // your code here
  return function(callback, data) {
    funcs = funcs.map(promisify)
    const promises = []
    for (const func of funcs) {
      promises.push(func(data))
    }
    return Promise.all(promises)
      .then(res => callback(undefined, res))
      .catch(error => callback(error, undefined))
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
function parallel(funcs){
  // your code here
  return function(callback, data) {
    if (!funcs || funcs.length === 0) {
      callback(undefined, data)
      return
    }

    const results = []
    let completed = 0
    let hasError = false

    funcs.forEach((func, index) => {
      func((error, data) => {
        if (hasError) return

        if (error) {
          hasError = true
          callback(error, undefined)
          return
        }

        results[index] = data
        completed++

        if (completed === funcs.length) {
          callback(undefined, results)
        }
      })
    })
  }
}
