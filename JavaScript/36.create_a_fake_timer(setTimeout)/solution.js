class FakeTimer {
  constructor() {
    this.original = {
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      dataNow: Date.now
    }
    this.queue = []
    this.currentTime = 0
    this.timeoutID = 1
  }

  install() {
    // replace window.setTimeout, window.clearTimeout, Date.now
    // with your implementation
    window.setTimeout = (callback, delay, ...args) => {
      const timeoutID = this.timeoutID++

      this.queue.push({
        timeoutID,
        callback,
        time: this.currentTime + delay,
        args
      })
      this.queue.sort((a, b) => a.time - b.time)

      return timeoutID
    }

    window.clearTimeout = timeoutID => {
      // this.queue.splice(this.queue.findIndex(item => item.timeoutID === timeoutID), 1)
      this.queue = this.queue.filter(item => item.timeoutID !== timeoutID)
    }

    Date.now = () => this.currentTime
  }
  
  uninstall() {
    // restore the original implementation of
    // window.setTimeout, window.clearTimeout, Date.now
    window.setTimeout = this.original.setTimeout
    window.clearTimeout = this.original.clearTimeout
    Date.now = this.original.dataNow
  }
  
  tick() {
    // run the scheduled functions without waiting
    while (this.queue.length) {
      const { callback, time, args } = this.queue.shift()
      this.currentTime = time
      callback(...args)
    }
  }
}

// or:
// The key difference between these two implementations is the queue sorting order:
// - First implementation sorts queue in ascending order (a.time - b.time) and uses shift()
// - Second implementation sorts queue in descending order (b.time - a.time) and uses pop()
// The second implementation is more optimal because:
// - pop() is O(1) while shift() is O(n) due to array reindexing
// - Both need to sort, but the second one's sorting order enables more efficient element removal
class FakeTimer {
  constructor() {
    this.original = {
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      dataNow: Date.now
    }
    this.queue = []
    this.currentTime = 0
    this.timeoutID = 1
  }

  install() {
    // replace window.setTimeout, window.clearTimeout, Date.now
    // with your implementation
    window.setTimeout = (callback, delay, ...args) => {
      const timeoutID = this.timeoutID++

      this.queue.push({
        timeoutID,
        callback,
        time: this.currentTime + delay,
        args
      })
      this.queue.sort((a, b) => b.time - a.time)

      return timeoutID
    }

    window.clearTimeout = timeoutID => {
      // this.queue.splice(this.queue.findIndex(item => item.timeoutID === timeoutID), 1)
      this.queue = this.queue.filter(item => item.timeoutID !== timeoutID)
    }

    Date.now = () => this.currentTime
  }
  
  uninstall() {
    // restore the original implementation of
    // window.setTimeout, window.clearTimeout, Date.now
    window.setTimeout = this.original.setTimeout
    window.clearTimeout = this.original.clearTimeout
    Date.now = this.original.dataNow
  }
  
  tick() {
    // run the scheduled functions without waiting
    while (this.queue.length) {
      const { callback, time, args } = this.queue.pop()
      this.currentTime = time
      callback(...args)
    }
  }
}


// test:

const fakeTimer = new FakeTimer()
fakeTimer.install()
const logs = []
const log = (arg) => {
   logs.push([Date.now(), arg])
}
setTimeout(() => {
  setTimeout(() => {
    setTimeout(() => {
      log('A')
      console.log('A', fakeTimer.currentTime)
    }, 1000)
  }, 1000)
}, 1000)
const b = setTimeout(() => {
  log('B')
  console.log('B')
}, 3000)
setTimeout(() => {
  setTimeout(() => {
    clearTimeout(b)
  }, 400)
}, 2500)
fakeTimer.tick()
fakeTimer.uninstall()
// expect(logs).toEqual([[300, 'A']])
