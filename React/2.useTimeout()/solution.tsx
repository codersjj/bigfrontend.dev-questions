import React, { useEffect, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number) {
  // your code here
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  // useEffect(() => {
  //   callbackRef.current = callback
  // }, [callback])

  useEffect(() => {
    const timeoutId = setTimeout(() => callbackRef.current(), delay)

    return () => clearTimeout(timeoutId)
  }, [delay])
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  return <div>your app</div>
}




