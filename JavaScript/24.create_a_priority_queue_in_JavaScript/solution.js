const topIndex = 0
const getLeftChildIndex = parentIndex => parentIndex * 2 + 1
// const getLeftChildIndex = parentIndex => (parentIndex << 1) + 1
const getRightChildIndex = parentIndex => parentIndex * 2 + 2
// const getRightChildIndex = parentIndex => (parentIndex + 1) << 1
const getParentIndex = childIndex => Math.floor((childIndex - 1) / 2)

// complete the implementation
class PriorityQueue {  
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare - 
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare) {
    this.compare = compare;
    this.heap = []
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.heap.length
  }

  /**
   * returns the head element
   */
  peek() {
    return this.heap[topIndex]
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    this.heap.push(element)
    this.heapifyUp(this.heap.length - 1)
    console.log('add item', element, this.heap.join())
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    const top = this.peek()
    const last = this.heap.pop()
    if (this.size()) {
      this.heap[topIndex] = last
      this.heapifyDown(topIndex)
    }
    console.log('poll root', top, this.heap.join())
    return top
  }


  heapifyUp(index) {
    while (index > topIndex) {
      const parentIndex = getParentIndex(index)
      if (this.isSmaller(parentIndex, index)) break
      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  heapifyDown(index) {
    while (this.hasLeftChild(index)) {
      const leftChildIndex = getLeftChildIndex(index)
      const rightChildIndex = getRightChildIndex(index)
      let smallerChildIndex = leftChildIndex
      if (this.hasRightChild(index) && this.isSmaller(rightChildIndex, leftChildIndex)) {
        smallerChildIndex = rightChildIndex
      }
      if (this.isSmaller(index, smallerChildIndex)) {
        break
      }
      this.swap(index, smallerChildIndex)
      index = smallerChildIndex
    }
  }


  isSmaller(i, j) {
    return this.compare(this.heap[i], this.heap[j]) < 0
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
  }
  
  hasLeftChild(index) {
    return getLeftChildIndex(index) < this.size()
  }

  hasRightChild(index) {
    return getRightChildIndex(index) < this.size()
  } 
}

// const pq = new PriorityQueue((a, b) => a - b)
const pq = new PriorityQueue((a, b) => b - a)
pq.add(1)
pq.add(2)
pq.add(3)
pq.add(4)
pq.add(5)
pq.add(6)
console.log(pq.heap)
pq.poll()
pq.poll()
pq.poll()
pq.poll()
pq.poll()
pq.poll()
pq.poll()
pq.poll()
