/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  const arr = items.slice()
  newOrder.forEach((newIndex, i) => items[newIndex] = arr[i])
}

// or:

/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  for (let i = 0; i < items.length; i++) {
    while (newOrder[i] !== i) {
      const to = newOrder[i]
      ;[items[i], items[to]] = [items[to], items[i]]
      ;[newOrder[i], newOrder[to]] = [newOrder[to], newOrder[i]]
    }
  }
}

// or:

/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]]

  for (let i = 0; i < items.length; i++) {
    while (newOrder[i] !== i) {
      const to = newOrder[i]
      swap(items, i, to)
      swap(newOrder, i, to)
    }
  }
}
