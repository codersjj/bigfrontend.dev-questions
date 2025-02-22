// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function throttle(func, wait, option = {leading: true, trailing: true}) {
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

  // return function(...args) {
  //   if (timer) {
  //     if (option.trailing) {
  //       stashed = [this, args]
  //     }
  //   } else {
  //     if (option.leading) {
  //       func.apply(this, args)
  //       startCooling()
  //     } else {
  //       if (option.trailing) {
  //         stashed = [this, args]
  //         startCooling()
  //       }
  //     }
  //   }
  // }
  // refactor:
  return function(...args) {
    if (timer) {
      if (option.trailing) {
        stashed = [this, args]
      }
      return
    }
    
    if (option.leading) {
      func.apply(this, args)
      startCooling()
      return
    }
    
    if (option.trailing) {
      stashed = [this, args]
      startCooling()
    }
  }
}



