
/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  // your code here
  // handle sparse array by Array.from()
  promises = Array.from(promises).map(p => Promise.resolve(p))

  return new Promise((resolve) => {
    if (!promises.length) {
      resolve([])
      return
    }

    const results = []
    let settledCount = 0

    promises.forEach((promise, index) => {
      promise
        .then(res => {
          results[index] = { status: 'fulfilled', value: res }
          settledCount++
          if (settledCount === promises.length) {
            resolve(results)
          }
        })
        .catch(error => {
          results[index] = { status: 'rejected', reason: error }
          settledCount++
          if (settledCount === promises.length) {
            resolve(results)
          }
        })
    })
  })
}

// or:

/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  // your code here
  return new Promise((resolve) => {
    if (!promises.length) {
      resolve([])
      return
    }

    const results = []
    let settledCount = 0

    for (let i = 0; i < promises.length; i++) {
      const promise = Promise.resolve(promises[i])
      promise
        .then(res => {
          results[i] = { status: 'fulfilled', value: res }
        })
        .catch(error => {
          results[i] = { status: 'rejected', reason: error }
        })
        .finally(() => {
          settledCount++
          if (settledCount === promises.length) {
            resolve(results)
          }
        })
    }
  })
}

// test:

const arr = [null, 2333]
arr[10] = 2
console.log(arr.length)
allSettled(arr).then(res => {
  console.log(res)
})
