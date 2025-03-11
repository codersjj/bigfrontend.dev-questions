
/**
 * @param {object[]} items
 * @excludes { Array< {k: string, v: any} >} excludes
 */

// /**
//  * @param {object[]} items
//  * @param { Array< {k: string, v: any} >} excludes
//  * @return {object[]}
//  */
// function excludeItems(items, excludes) {
//   excludes.forEach(pair => {
//     items = items.filter(item => item[pair.k] !== pair.v)
//   })

//   return items
// }

// /**
//  * @param {object[]} items
//  * @param { Array< {k: string, v: any} >} excludes
//  * @return {object[]}
//  */
// function excludeItems(items, excludes) {
//   return items.filter(item => {
//     return !excludes.some(pair => item[pair.k] === pair.v)
//   })
// }

// /**
//  * @param {object[]} items
//  * @param { Array< {k: string, v: any} >} excludes
//  * @return {object[]}
//  */
// function excludeItems(items, excludes) {
//   // Map<key, Set<value>>
//   const excludeMap = new Map()

//   excludes.forEach(({ k, v }) => {
//     if (!excludeMap.has(k)) {
//       excludeMap.set(k, new Set([v]))
//     } else {
//       excludeMap.get(k).add(v)
//     }
//   })

//   return items.filter(item => {
//     return Object.keys(item).every(key => !(excludeMap.has(key) && excludeMap.get(key).has(item[key])))
//   })
// }

/**
 * @param {object[]} items
 * @param { Array< {k: string, v: any} >} excludes
 * @return {object[]}
 */
function excludeItems(items, excludes) {
  // Map<key, Set<value>>
  const excludeMap = new Map()

  for (const { k, v } of excludes) {
    if (!excludeMap.has(k)) {
      excludeMap.set(k, new Set())
    }
    excludeMap.get(k).add(v)
  }

  return items.filter(item => {
    for (const [key, excludedValues] of excludeMap) {
      if (excludedValues.has(item[key])) {
        return false
      }
    }

    return true
  })
}

/* 
原算法 Time Complexity:
items loop: O(n)
excludes loop: O(m)

total: O(n * m)

优化后的算法 Time Complexity：
items: n
item properties: k
excludes: m

Time Complexity: 
excludes loop: O(m)
Map 和 Set 的插入操作均摊时间复杂度为 O(1)
items loop: O(n)
excludeMap loop: O(k)
Set.has() 的时间复杂度为 O(1)

total: O(m + n * k)
且 k 通常远小于 m

*/
