/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout() {
  // your code here
  timers.forEach(clearTimeout)
}

const originalSetTimeout = window.setTimeout
const originalClearTimeout = window.clearTimeout

const timers = new Set()

window.setTimeout = (...args) => {
  const timer = originalSetTimeout(...args)
  timers.add(timer)
  return timer
}

window.clearTimeout = timer => {
  originalClearTimeout(timer)
  timers.delete(timer)
}
