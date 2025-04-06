
/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    let isSettled = false

    promises.forEach(p => {
      p
        .then(res => {
          if (isSettled) return
          isSettled = true
          resolve(res)
        })
        .catch(err => {
          if (isSettled) return
          isSettled = true
          reject(err)
        })
    })
  })
}
