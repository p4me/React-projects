// CONCEPT: useRef
// Two flavors of useRef at work in the Stopwatch component:
//   1. Interval ref  — stores the setInterval ID so we can clearInterval on stop/reset
//      without that value causing re-renders (it's invisible to React's diffing).
//   2. DOM ref       — attached to the notes <input> so we can call .focus()
//      imperatively when the timer stops (auto-focus feature).
// Open Stopwatch.jsx to see both in action.

import Stopwatch from '../components/Stopwatch'
import './StopwatchPage.css'

function StopwatchPage() {
  return (
    <div className="stopwatch-page">
      <h2>Stopwatch</h2>
      <p className="stopwatch-concept">
        Concept: <code>useRef</code> — interval ID (mutable, no re-render) +
        DOM ref (imperative focus)
      </p>

      <Stopwatch />

      <div className="stopwatch-explanation">
        <h3>What is happening under the hood?</h3>
        <ul>
          <li>
            <strong>intervalRef</strong> (<code>useRef</code>) holds the interval ID.
            Updating a ref never re-renders the component — unlike <code>useState</code>.
          </li>
          <li>
            <strong>startTimeRef</strong> (<code>useRef</code>) stores a time origin so
            elapsed is always <code>Date.now() - startTimeRef.current</code>, keeping
            the clock accurate even if the 10ms interval fires late.
          </li>
          <li>
            <strong>notesRef</strong> (<code>useRef</code>) is a DOM ref attached to the
            notes <code>&lt;input&gt;</code>. When you click <strong>Stop</strong>,{' '}
            <code>notesRef.current.focus()</code> is called imperatively — no state
            change needed.
          </li>
          <li>
            <strong>Lap delta</strong> — each lap row shows the split time since the
            previous lap, computed inline from the <code>laps</code> state array.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default StopwatchPage
