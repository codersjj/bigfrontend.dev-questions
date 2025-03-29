import React, { useReducer } from 'react'

export function App() {
  function reducer(state: { count: number }, action: { type: 'increment' | 'decrement' }) {
    switch (action.type) {
      case 'increment':
        return {
          count: state.count + 1
        }
      case 'decrement':
        return {
          count: state.count - 1
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <button
        data-testid="decrement-button"
        onClick={() => dispatch({ type: 'decrement' })}
      >
        -
      </button>
      <button
        data-testid="increment-button"
        onClick={() => dispatch({ type: 'increment' })}
      >
        +
      </button>
      <p>clicked: {state.count}</p>
    </div>
  )
}
