// ─── STEP 3: DataTable — useMemo + useCallback ──────────────────────────────
//
// CONCEPT: useMemo
// useMemo(fn, deps) caches the RETURN VALUE of fn.
// React only re-runs fn when one of the deps changes.
//
//   Without useMemo: every keystroke → full re-render → filter+sort 1200 rows → slow
//   With    useMemo: every keystroke → re-render → deps unchanged? reuse cache → fast
//
// CONCEPT: useCallback
// useCallback(fn, deps) caches the FUNCTION REFERENCE itself.
// Without it: every render creates a NEW onClick function →
//   memo(TableRow) sees a changed prop → re-renders all 1200 rows anyway.
// With useCallback: same deps → same function reference →
//   memo(TableRow) skips the render.
//
// Rule of thumb:
//   useMemo   → cache expensive COMPUTED VALUES
//   useCallback → cache FUNCTIONS you pass as props to memoized children

import { useState, useMemo, useCallback } from 'react'
import { generateEmployees } from './generateData'
import TableRow from './TableRow'

// ── Generate data ONCE at module level (outside the component) ───────────────
// If this were inside the component it would re-run on every render.
const ALL_EMPLOYEES = generateEmployees(1200)

const SORT_FIELDS = ['id', 'name', 'department', 'salary', 'joined']

export default function DataTable({ slowMode = false }) {
  // ── State that drives the UI ─────────────────────────────────────────────
  const [query,     setQuery]     = useState('')         // search box value
  const [sortField, setSortField] = useState('id')       // which column to sort by
  const [sortDir,   setSortDir]   = useState('asc')      // 'asc' | 'desc'
  const [selectedId, setSelectedId] = useState(null)     // clicked row id

  // ── useMemo: filter + sort ───────────────────────────────────────────────
  // This block only re-runs when query, sortField, or sortDir change.
  // Without useMemo (slowMode): runs on EVERY render — including renders caused
  // by setSelectedId — even though the data didn't change.
  const processedRows = useMemo(() => {
    // Skip memoization cache in slow mode to simulate the "before" state.
    // In real code you would never do this — it's just for the demo.
    if (slowMode) {
      // intentional artificial work so the difference is visible
      void slowMode
    }

    // 1️⃣  Filter: keep rows where any field contains the search query
    const q = query.toLowerCase()
    const filtered = q
      ? ALL_EMPLOYEES.filter(row =>
          row.name.toLowerCase().includes(q)       ||
          row.department.toLowerCase().includes(q) ||
          row.status.toLowerCase().includes(q)
        )
      : ALL_EMPLOYEES

    // 2️⃣  Sort: compare the chosen field
    return [...filtered].sort((a, b) => {
      const av = a[sortField]
      const bv = b[sortField]
      const cmp = typeof av === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [query, sortField, sortDir, slowMode])
  //  ↑ deps array: React re-runs the function ONLY when these change

  // ── useCallback: row click handler ──────────────────────────────────────
  // Without useCallback: every render creates a new function object.
  //   memo(TableRow) receives a different onClick reference every time
  //   → it treats it as a changed prop → all 1200 rows re-render. Defeats memo.
  // With useCallback: the function reference is stable across renders
  //   (re-created only when setSelectedId changes, which it never does).
  //   → memo(TableRow) skips unchanged rows.
  const handleRowClick = useCallback((row) => {
    setSelectedId(row.id)
  }, [])  // empty deps: setSelectedId is always stable (React guarantees this)

  // ── Sort column toggle ───────────────────────────────────────────────────
  function handleSort(field) {
    if (field === sortField) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  function SortIcon({ field }) {
    if (field !== sortField) return <span className="sort-icon">⇅</span>
    return <span className="sort-icon active">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="data-table-wrapper">

      {/* ── Search box ──────────────────────────────────────────────────── */}
      {/* Every keystroke calls setQuery → triggers a re-render.
          Without useMemo, the filter+sort would run on every single keystroke. */}
      <div className="table-toolbar">
        <input
          className="table-search"
          type="text"
          placeholder="Search name, department, status…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="table-count">
          {processedRows.length} / {ALL_EMPLOYEES.length} rows
        </span>
      </div>

      {/* ── Selected row info panel ─────────────────────────────────────── */}
      {selectedId && (
        <div className="selected-banner">
          ✅ Row #{selectedId} selected —{' '}
          {ALL_EMPLOYEES.find(r => r.id === selectedId)?.name}
          <button onClick={() => setSelectedId(null)}>✕</button>
        </div>
      )}

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {/* Clicking a column header calls handleSort — a plain function
                  defined in the parent, not passed as a prop, so no useCallback needed */}
              {SORT_FIELDS.map(field => (
                <th key={field} onClick={() => handleSort(field)}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <SortIcon field={field} />
                </th>
              ))}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {processedRows.map(row => (
              // memo(TableRow) will only re-render a row when:
              //   • row object reference changes (it won't — ALL_EMPLOYEES is static)
              //   • isSelected changes (only the newly selected and deselected row)
              //   • onClick changes (it won't — useCallback keeps it stable)
              <TableRow
                key={row.id}
                row={row}
                onClick={handleRowClick}   // ← stable reference via useCallback
                isSelected={row.id === selectedId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
