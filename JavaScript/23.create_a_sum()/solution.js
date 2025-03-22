/**
 * @param {number} num
 */
function sum(num) {
  // your code here
  const fn = num2 => sum(num + num2)
  // const fn = num2 => {
  //   return num2 ? sum(num + num2) : num
  // }

  // fn[Symbol.toPrimitive] = () => num

  // fn.valueOf = () => {
  //   console.log('valueOf invoked~')
  //   return num
  // }
  fn.valueOf = () => num

  return fn
}

// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_coercion


console.log(sum(2) == 2)
console.log(sum(2)() == 2)
console.log(sum(1)(2) == 3)
console.log(sum(1)(2)() == 3)
console.log(sum(1)(2)(3) == 6)