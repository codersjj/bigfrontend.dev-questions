// please complete the implementation
// class EventEmitter {
//   constructor() {
//     // Map<eventName, handlersWithRelease[[handler, release]]>
//     this.eventToHandlers = new Map()
//   }

//   subscribe(eventName, callback) {
//     let release = null
//     let handlers = null
    
//     if (this.eventToHandlers.has(eventName)) {
//       handlers = this.eventToHandlers.get(eventName)
//       const curHandlerIndex = handlers.length
//       release = () => {
//         handlers.splice(curHandlerIndex, 1)
//       }
//       handlers.push([callback, release])
//     } else {
//       release = () => handlers.shift()
//       handlers = [[callback, release]]
//       this.eventToHandlers.set(eventName, handlers)
//     }

//     return { release }
//   }
  
//   emit(eventName, ...args) {
//   	const handlers = this.eventToHandlers.get(eventName)
//     if (handlers) {
//       handlers.forEach(([func]) => func.apply(this, args))
//     }
//   }
// }

// please complete the implementation
class EventEmitter {
  // constructor() {
  //   this.subscriptions = {}
  // }
  subscriptions = {}

  subscribe(eventName, callback) {
    let handlers = this.subscriptions[eventName]
    if (!handlers) {
      handlers = []
      this.subscriptions[eventName] = handlers
    }
    handlers.push(callback)

    return {
      release: () => {
        if (!handlers) return
        const index = handlers.indexOf(callback)
        if (index === -1) return
        handlers.splice(index, 1)
        if (!handlers.length) {
          delete this.subscriptions[eventName]
        }
      }
    }
  }

  emit(eventName, ...args) {
    const handlers = this.subscriptions[eventName]
    if (!handlers) return
    handlers.forEach(handler => {
      handler(...args)
    })
  }
}
