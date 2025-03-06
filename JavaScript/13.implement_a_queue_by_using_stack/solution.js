/* you can use this Class which is bundled together with your code

class Stack {
  push(element) { // add element to stack }
  peek() { // get the top element }
  pop() { // remove the top element}
  size() { // count of element }
}
*/

/* Array is disabled in your code */

// you need to complete the following Class
class Queue {
  constructor() {
    this.pushStack = new Stack()
    this.popStack = new Stack()
  }

  enqueue(element) { 
    // add new element to the rare
    this.pushStack.push(element)
  }
  peek() { 
    // get the head element
    if (!this.popStack.size()) {
      while (this.pushStack.size()) {
        this.popStack.push(this.pushStack.pop())
      }
    }
    return this.popStack.peek()
  }
  size() { 
    // return count of element
    return this.pushStack.size() + this.popStack.size()
  }
  dequeue() {
    // remove the head element
    if (!this.popStack.size()) {
      while (this.pushStack.size()) {
        this.popStack.push(this.pushStack.pop())
      }
    }
    return this.popStack.pop()
  }
}
