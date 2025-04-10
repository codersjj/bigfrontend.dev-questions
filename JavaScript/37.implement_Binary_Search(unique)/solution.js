
/**
 * @param {number[]} arr - ascending unique array
 * @param {number} target
 * @return {number}
 */
function binarySearch(arr, target){
  // your code here
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (target < arr[mid]) {
      right = mid - 1
    } else if (target > arr[mid]) {
      left = mid + 1
    } else {
      return mid
    }
  }

  return -1
}
