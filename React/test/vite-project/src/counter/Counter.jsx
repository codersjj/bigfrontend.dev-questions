import React, { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  const handleDecrement = () => {
    // setCount(count - 1)
    // setCount(count - 1)
    // setCount(count - 1)
    setCount(count => count - 1)
    setCount(count => count - 1)
    setCount(count => count - 1)
    console.log(count)
  }
  const handleIncrement = () => setCount(count + 1)

  return (
    <div>
      <button data-testid="decrement-button" onClick={handleDecrement}>-</button>
      <button data-testid="increment-button" onClick={handleIncrement}>+</button>
      <p>clicked: {count}</p>
    </div>
  )
}
