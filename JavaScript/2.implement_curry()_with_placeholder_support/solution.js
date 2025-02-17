// This is a JavaScript coding problem from BFE.dev 

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  // your code here
  return function curried(...args) {
    if (isArgsMet(args, fn, curry.placeholder)) {
      return fn.apply(this, args)
    } else {
      return function(...nextArgs) {
        const mergedArgs = mergeArgs(args, nextArgs, curry.placeholder)
        return curried.call(this, ...mergedArgs)
      }
    }
  }

  function isArgsMet(args, fn, placeholder) {
    if (args.length < fn.length) return false
    return args.slice(0, fn.length).every(item => item !== placeholder)
  }

  function mergeArgs(argsTo, argsFrom, placeholder) {
    const res = []
    let indexTo = 0
    let indexFrom = 0

    while (indexTo < argsTo.length && indexFrom < argsFrom.length) {
      if (argsTo[indexTo] === placeholder) {
        res.push(argsFrom[indexFrom])
        indexFrom++
      } else {
        res[indexTo] = argsTo[indexTo]
      }
      indexTo++
    }

    while (indexTo < argsTo.length) {
      res.push(argsTo[indexTo])
      indexTo++
    }

    while (indexFrom < argsFrom.length) {
      res.push(argsFrom[indexFrom])
      indexFrom++
    }

    return res
  }
}


curry.placeholder = Symbol()



