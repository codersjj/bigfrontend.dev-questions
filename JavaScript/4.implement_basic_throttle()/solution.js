// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  // your code here
  let timer = null
  let stashed = null

  const startCooling = () => {
    timer = setTimeout(() => {
      timer = null
      if (stashed) {
        func.apply(stashed[0], stashed[1])
        stashed = null
        startCooling()
      }
    }, wait)
  }

  return function(...args) {
    if (!timer) {
      func.apply(this, args)
      startCooling()
    } else {
      stashed = [this, args]
    }
  }
}
