// ─── STEP 4: Page wrapper ────────────────────────────────────────────────────
// Owns the slowMode toggle so you can flip between "before" and "after"
// without leaving the page. Everything else lives in DataTable.jsx.

import { useState } from 'react'
import DataTable from '../components/DataTable/DataTable'
import './DataTablePage.css'

export default function DataTablePage() {
  // Toggle this ON to disable memoization and feel the sluggishness.
  // Toggle OFF to re-enable useMemo + useCallback and feel the smoothness.
  const [slowMode, setSlowMode] = useState(false)

  return (
    <div className="datatable-page">

      <h2>Filterable Sortable Table</h2>
      <p className="page-concept">
        Concepts: <code>useMemo</code> · <code>useCallback</code> · <code>React.memo</code>
      </p>

      {/* ── Slow-mode toggle ────────────────────────────────────────────── */}
      {/* Flip this and then rapidly type in the search box.
          With slowMode ON  → filter+sort runs every render (no cache).
          With slowMode OFF → filter+sort only re-runs when query/sort changes. */}
      <div className={`mode-banner ${slowMode ? 'mode-slow' : 'mode-fast'}`}>
        <div className="mode-info">
          <strong>{slowMode ? '🐢 Slow Mode (no memo)' : '⚡ Fast Mode (memo ON)'}</strong>
          <span>
            {slowMode
              ? 'useMemo & useCallback are bypassed. Type quickly and feel the lag.'
              : 'useMemo caches filter+sort. useCallback keeps onClick stable for React.memo.'}
          </span>
        </div>
        <button
          className={`toggle-btn ${slowMode ? 'btn-enable' : 'btn-disable'}`}
          onClick={() => setSlowMode(m => !m)}
        >
          {slowMode ? 'Enable Memoization' : 'Disable Memoization'}
        </button>
      </div>

      {/* ── Data table ──────────────────────────────────────────────────── */}
      <DataTable slowMode={slowMode} />

      {/* ── Explanation ─────────────────────────────────────────────────── */}
      <div className="explanation">
        <h3>What is happening under the hood?</h3>
        <ul>
          <li>
            <strong>useMemo</strong> — wraps the filter + sort logic.
            React caches the result and only re-runs it when <code>query</code>,{' '}
            <code>sortField</code>, or <code>sortDir</code> change.
            Clicking a row (setSelectedId) does NOT re-run it.
          </li>
          <li>
            <strong>useCallback</strong> — wraps <code>handleRowClick</code>.
            Without it, a new function is created every render → React.memo sees
            a changed <code>onClick</code> prop → all 1200 rows re-render anyway.
            useCallback keeps the reference stable.
          </li>
          <li>
            <strong>React.memo</strong> — wraps <code>TableRow</code>.
            Skips re-rendering rows whose props haven't changed.
            Only the newly-selected / deselected row re-renders on click.
          </li>
          <li>
            <strong>How to verify</strong> — open React DevTools → Profiler tab →
            click Record → type in the search box → stop recording.
            In slow mode you'll see all 1200 TableRow bars lit up.
            In fast mode most bars disappear (grey = skipped).
          </li>
        </ul>
      </div>
    </div>
  )
}
