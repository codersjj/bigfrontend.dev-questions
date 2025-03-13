
// /**
//  * @param {HTMLElement} rootA
//  * @param {HTMLElement} rootB - rootA and rootB are clone of each other
//  * @param {HTMLElement} nodeA
//  */
// const findCorrespondingNode = (rootA, rootB, target) => {
//   // your code here
//   // Approach 1: Recursion
//   if (rootA === target) return rootB
//   for (let i = 0; i < rootA.children.length; i++) {
//     const res = findCorrespondingNode(rootA.children[i], rootB.children[i], target)
//     if (res) return res
//   }
// }

// or:

// /**
//  * @param {HTMLElement} rootA
//  * @param {HTMLElement} rootB - rootA and rootB are clone of each other
//  * @param {HTMLElement} nodeA
//  */
// const findCorrespondingNode = (rootA, rootB, target) => {
//   // your code here
//   // Approach 2: Iteration (stack, DFS)
//   const stack = [[rootA, rootB]]

//   while (stack.length) {
//     const [nodeA, nodeB] = stack.pop()
//     if (nodeA === target) {
//       return nodeB
//     }

//     for (let i = 0; i < nodeA.children.length; i++) {
//       stack.push([nodeA.children[i], nodeB.children[i]])
//     }
//   }
// }

// or:

// /**
//  * @param {HTMLElement} rootA
//  * @param {HTMLElement} rootB - rootA and rootB are clone of each other
//  * @param {HTMLElement} nodeA
//  */
// const findCorrespondingNode = (rootA, rootB, target) => {
//   // your code here
//   // Approach 3: Iteration (queue, BFS)
//   const queue = [[rootA, rootB]]

//   while (queue.length) {
//     const [nodeA, nodeB] = queue.shift()
//     if (nodeA === target) {
//       return nodeB
//     }

//     for (let i = 0; i < nodeA.children.length; i++) {
//       queue.push([nodeA.children[i], nodeB.children[i]])
//     }
//   }
// }

// or:

/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const findCorrespondingNode = (rootA, rootB, target) => {
  // your code here
  // Approach 4: TreeWalker
  const rootAWalker = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT)
  const rootBWalker = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT)

  let curNodes = [rootAWalker.currentNode, rootBWalker.currentNode]

  while (curNodes[0] !== target) {
    curNodes = [rootAWalker.nextNode(), rootBWalker.nextNode()]
  }

  return curNodes[1]
}
