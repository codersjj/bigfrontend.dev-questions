
/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // your code here
  promises = promises.map(p => Promise.resolve(p))

  return new Promise((resolve, reject) => {
    if (!promises.length) {
      resolve([])
      return
    }

    const results = []
    let resolvedCount = 0
    let isRejected = false
    
    for (let i = 0; i < promises.length; i++) {
      // handle sparse array
      if (!Object.hasOwn(promises, i)) {
        results[i] = undefined
        resolvedCount++
        continue
      }

      promises[i]
        .then(res => {
          if (isRejected) return

          results[i] = res
          resolvedCount++
          if (resolvedCount === promises.length) {
            resolve(results)
          }
        })
        .catch(error => {
          if (isRejected) return
          
          isRejected = true
          reject(error)
        })
    }
  })
}

// or:

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // your code here
  // handle sparse array by Array.from()
  // [empty X 3, 'aaa']: Array.from([,,, 'aaa']) => [undefined, undefined, undefined, 'aaa']
  promises = Array.from(promises).map(p => Promise.resolve(p))

  return new Promise((resolve, reject) => {
    if (!promises.length) {
      resolve([])
      return
    }

    const results = []
    let resolvedCount = 0
    let isRejected = false
    
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(res => {
          if (isRejected) return

          results[i] = res
          resolvedCount++
          if (resolvedCount === promises.length) {
            resolve(results)
          }
        })
        .catch(error => {
          if (isRejected) return
          
          isRejected = true
          reject(error)
        })
    }
  })
}


// test

const arr = [null, 2333]
arr[10] = 2
console.log(arr.length)
all(arr).then(res => {
  console.log(res)
}).catch(error => {
  console.log(error.message)
})
