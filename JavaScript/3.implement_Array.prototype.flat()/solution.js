// This is a JavaScript coding problem from BFE.dev 
// /**
//  * @param { Array } arr
//  * @param { number } depth
//  * @returns { Array }
//  */
// function flat(arr, depth = 1) {
//   // recursive solution:
//   const res = []

//   for (let i = 0; i < arr.length; i++) {
//     if (!Object.hasOwn(arr, i)) {
//       continue
//     }

//     const item = arr[i]
//     if (Array.isArray(item) && depth > 0) {
//       res.push(...flat(item, depth - 1))
//     } else {
//       res.push(item)
//     }
//   }

//   return res
// }

/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flat(arr, depth = 1) {
  // recursive solution 2:
  // callbackFn is invoked only for array indexes which have assigned values.
  // It is not invoked for empty slots in sparse arrays.
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#description
  return arr.reduce((res, item) => {
    if (Array.isArray(item) && depth > 0) {
      res.push(...flat(item, depth - 1))
    } else {
      res.push(item)
    }

    return res
  }, [])
}

console.log(flat([1,[2],[3,[4]]]))
console.log(flat([1,[2],[3,[4]]], 1))
console.log(flat([1,[2],[3,[4]]], 2))
console.log(flat([1,2,[3,4,[5,6,[7,8,[9,10]]]]], Infinity))
console.log(flat([1,2,,,undefined,[3,4,[5,6,[7,8,[9,10]]]]], Infinity))

