import { useState, useRef, useEffect } from 'react'

function formatTime(ms) {
  const mins = String(Math.floor(ms / 60)).padStart(2, '0')
  const secs = String(ms % 60).padStart(2, '0')
  return (mins + ':' + secs);
}

function StopwatchEasy() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalIdRef = useRef(null);

  function start() {
    if(intervalIdRef.current) return;
    intervalIdRef.current = setInterval(() => {
      setTime((prev => prev + 1));
    }, 1000)
  }

  function stop() {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }

  function reset() {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    setTime(0);
  }
// Cleanup: Ensures the timer stops if the user leaves the page
  useEffect(() => {
    return () => clearInterval(intervalIdRef.current);
  }, []);


  function lap() {
    setLaps(prev => [...prev, time])
  }
  
console.log(laps);

  return (
    <div className="stopwatch">
      <div className="stopwatch-display">{formatTime(time)}</div>

      <div className="stopwatch-controls">
        <button className="btn-start" onClick={start} >
          Start
        </button>
        <button className="btn-pause" onClick={stop} >
          Stop
        </button>
        <button className="btn-lap" onClick={lap} >
          Lap
        </button>
        <button className="btn-reset" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="laps-div">
        <h3>Laps</h3>
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index}>
              lap : `${formatTime(lapTime - laps[index - 1])}`
              Lap {index + 1}: {formatTime(lapTime)} 
              {/* Optional: Show difference from previous lap */}
              {index > 0 && ` (+${formatTime(lapTime - laps[index - 1])})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StopwatchEasy
