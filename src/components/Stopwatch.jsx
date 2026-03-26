// CONCEPT: useRef (interval ID + DOM ref)
// useRef stores a mutable value that persists across renders WITHOUT causing re-renders.
// — intervalRef holds the setInterval ID so we can clear it on stop/reset.
//   Changing it doesn't need to trigger UI updates, making useRef the right tool.
// — notesRef is a DOM ref: it gives us direct access to the <input> node so we can
//   call .focus() imperatively after the timer stops (the auto-focus feature).
// — startTimeRef stores a "time origin" so elapsed = Date.now() - startTimeRef,
//   giving us accurate timing independent of how often the interval fires.

import { useState, useRef } from 'react'

function formatTime(ms) {
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')  // centiseconds
  const secs = String(Math.floor((ms / 1000) % 60)).padStart(2, '0')
  const mins = String(Math.floor(ms / 60000)).padStart(2, '0')
  return `${mins}:${secs}.${cs}`
}

function Stopwatch() {
  // useState: these values drive the UI — every change triggers a re-render
  const [elapsed, setElapsed] = useState(0)
  const [laps, setLaps] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  // useRef: interval ID — we need to clear it later, but storing it in state
  // would cause an unnecessary re-render every time it's set
  const intervalRef = useRef(null)

  // useRef: DOM ref — lets us call notesRef.current.focus() imperatively
  // when the timer stops, without any state change
  const notesRef = useRef(null)

  // useRef: "time origin" — tracks what Date.now() was at elapsed=0 for the
  // current run, so elapsed is always Date.now() - startTimeRef (stays accurate
  // even if the interval fires slightly late)
  const startTimeRef = useRef(0)

  function start() {
    if (isRunning) return
    // Subtract current elapsed so the clock continues from where it left off
    startTimeRef.current = Date.now() - elapsed
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current)
    }, 10)
    setIsRunning(true)
  }

  function stop() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setIsRunning(false)
    // Auto-focus: imperatively focus the notes input via DOM ref
    notesRef.current?.focus()
  }

  function reset() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setIsRunning(false)
    setElapsed(0)
    setLaps([])
  }

  function lap() {
    if (!isRunning) return
    setLaps(prev => [...prev, elapsed])
  }

  return (
    <div className="stopwatch">
      <div className="stopwatch-display">{formatTime(elapsed)}</div>

      <div className="stopwatch-controls">
        <button className="btn-start" onClick={start} disabled={isRunning}>
          Start
        </button>
        <button className="btn-pause" onClick={stop} disabled={!isRunning}>
          Stop
        </button>
        <button className="btn-lap" onClick={lap} disabled={!isRunning}>
          Lap
        </button>
        <button className="btn-reset" onClick={reset}>
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="stopwatch-laps">
          <h3>Laps</h3>
          <ol>
            {laps.map((lapTime, i) => (
              <li key={i}>
                <span className="lap-number">Lap {i + 1}</span>
                <span className="lap-time">{formatTime(lapTime)}</span>
                {i > 0 && (
                  <span className="lap-delta">
                    +{formatTime(lapTime - laps[i - 1])}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="stopwatch-notes">
        <label htmlFor="sw-notes">
          Notes <span className="notes-hint">(auto-focused when you stop)</span>
        </label>
        <input
          id="sw-notes"
          ref={notesRef}
          type="text"
          placeholder="Add a note about this session..."
        />
      </div>
    </div>
  )
}

export default Stopwatch
