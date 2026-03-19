// CONCEPT: useEffect (via custom hook useTimer)
// Open useTimer.js to see how useEffect and cleanup work under the hood.

import { useTimer } from '../hooks/useTimer'
import './TimerPage.css'

function formatTime(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const secs = String(totalSeconds % 60).padStart(2, '0')
  return `${mins}:${secs}`
}

function TimerPage() {
  const { seconds, isRunning, setIsRunning, reset } = useTimer()

  return (
    <div className="timer-page">
      <h2>Timer</h2>
      <p className="timer-concept">
        Concept: <code>useEffect</code> with cleanup + custom hook
      </p>

      <div className="timer-display">{formatTime(seconds)}</div>

      <div className="timer-controls">
        <button
          className={isRunning ? 'btn-pause' : 'btn-start'}
          onClick={() => setIsRunning(prev => !prev)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn-reset" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="timer-explanation">
        <h3>What is happening under the hood?</h3>
        <ul>
          <li>When you click <strong>Start</strong>, <code>isRunning</code> becomes <code>true</code>.</li>
          <li><code>useEffect</code> re-runs because <code>isRunning</code> is in its dependency array.</li>
          <li>It starts a <code>setInterval</code> that increments seconds every 1s.</li>
          <li>When you click <strong>Pause</strong>, the cleanup function runs and clears the interval.</li>
          <li>Without cleanup, intervals would keep piling up causing bugs!</li>
        </ul>
      </div>
    </div>
  )
}

export default TimerPage
