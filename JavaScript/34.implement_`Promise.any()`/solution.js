
/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    if (!promises.length) {
      throw new AggregateError(
        'No Promise in Promise.any was resolved'
      )
    }

    let isResolved = false
    let rejectedCount = 0
    const errors = []

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(res => {
          if (isResolved) return
          isResolved = true
          resolve(res)
        })
        .catch(err => {
          if (isResolved) return
          errors[i] = err
          rejectedCount++
          if (rejectedCount === promises.length) {
            reject(new AggregateError('No Promise in Promise.any was resolved', errors))
          }
        })
    }
  })
}


// test:

// Promise.any([]).catch(console.log)
// any([]).catch(console.log)
Promise.any([Promise.reject(1),,,,Promise.reject(3)])
  .then(res => {
    console.log('res:', res)
  })
  .catch(console.log)
any([Promise.reject(1),,,,Promise.reject(3)])
  .then(res => {
    console.log('res:', res)
  })
  .catch(console.log)
