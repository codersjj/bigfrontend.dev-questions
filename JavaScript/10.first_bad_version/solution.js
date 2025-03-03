// This is a JavaScript coding problem from BFE.dev 

/**
 * @typedef {(version: number) => boolean} IsBad
 */

/**
 * @param {IsBad} isBad
 * @return {(v: number) => number}
 */
function firstBadVersion(isBad) {
	// firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  return (version) => {
    // write your code to return the first bad version
    // if none found, return -1
    let left = 0
    let right = version

    // o o x
    // o x x
    // x x x
    // o o o
    while (left <= right) {
      const mid = left + ((right - left) >> 1)
      if (isBad(mid)) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    return isBad(left) ? left : -1
  }
}
