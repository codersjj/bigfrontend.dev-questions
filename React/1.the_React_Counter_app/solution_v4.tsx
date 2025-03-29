import React, { useCallback, useState } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  const update = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const change = Number.parseInt(e.currentTarget.dataset.change ?? '0')
    setCount(count => count + change)
  }, [])

  return (
    <div>
      <button data-testid="decrement-button" data-change="-1" onClick={update}>-</button>
      <button data-testid="increment-button" data-change="1" onClick={update}>+</button>
      <p>clicked: {count}</p>
    </div>
  )
}
