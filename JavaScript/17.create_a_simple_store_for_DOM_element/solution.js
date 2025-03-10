class NodeStore {
  constructor() {
    this.store = []
  }

   /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    const item = this.store.find(([n]) => n === node)
    if (item) {
      item[1] = value
    } else {
      this.store.push([node, value])
    }
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    const item = this.store.find(([n]) => n === node)
    return item ? item[1] : null
  }
  
  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return !!this.store.find(([n]) => n === node)
  }
}

// or:

class NodeStore {
  constructor() {
    this.store = []
  }

   /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    const item = this.store[node.index]
    if (item) {
      item[1] = value
    } else {
      node.index = this.store.length
      this.store.push([node, value])
    }
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    const item = this.store[node.index]
    return item ? item[1] : null
  }
  
  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return node.index >= 0
  }
}

// or:

class NodeStore {
  constructor() {
    this.store = []
  }

  static NODE_KEY = '__index'

   /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    const item = this.store[node[this.NODE_KEY]]
    if (item) {
      item[1] = value
    } else {
      node[this.NODE_KEY] = this.store.length
      this.store.push([node, value])
    }
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    const item = this.store[node[this.NODE_KEY]]
    return item ? item[1] : null
  }
  
  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return node[this.NODE_KEY] >= 0
  }
}
