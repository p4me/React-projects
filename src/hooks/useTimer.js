// CONCEPT: Custom Hook
// A custom hook is just a function that starts with "use" and calls other hooks inside.
// It lets you extract and reuse stateful logic across components.

// CONCEPT: useEffect
// useEffect runs side effects (things outside React's render cycle).
// Here we use it to start/stop a setInterval.
// The cleanup function (return () => ...) runs when the effect re-runs or the component unmounts.
// The dependency array [isRunning] means: re-run this effect whenever isRunning changes.

import { useState, useEffect } from 'react'

export function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return  // don't start an interval if paused

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // cleanup: React calls this before the next effect run or on unmount
    // Without this, multiple intervals would stack up and cause bugs
    return () => clearInterval(interval)
  }, [isRunning]) // re-runs only when isRunning changes

  function reset() {
    setIsRunning(false)
    setSeconds(0)
  }

  return { seconds, isRunning, setIsRunning, reset }
}
