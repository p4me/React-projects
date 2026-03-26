// ─── STEP 2: memo-wrapped row component ─────────────────────────────────────
//
// CONCEPT: React.memo
// By default, every time the parent re-renders (e.g. user types one character),
// ALL child components re-render too — even if their props didn't change.
//
// React.memo wraps a component and does a shallow prop comparison before rendering:
//   • Props SAME  → skip render, reuse previous output  ✅
//   • Props CHANGED → render normally                   🔄
//
// With 1200 rows, skipping unchanged rows makes a huge visible difference.
//
// IMPORTANT: memo only helps if the props it receives are stable.
// If the parent creates a new function on every render (e.g. onClick={() => ...})
// that function reference changes every time → memo sees a "changed" prop → renders anyway.
// That's why the parent uses useCallback for onClick. See DataTable.jsx.

import { memo } from 'react'

const STATUS_COLORS = {
  'Active':     '#dcfce7',   // green tint
  'Inactive':   '#fee2e2',   // red tint
  'On Leave':   '#fef9c3',   // yellow tint
  'Contractor': '#e0f2fe',   // blue tint
}

// Wrap the component in memo() — React will bail out of re-rendering
// this row if id, name, department, status, salary, joined, and onClick
// are all shallowly equal to the previous render's values.
const TableRow = memo(function TableRow({ row, onClick, isSelected }) {

  // You can open React DevTools Profiler and see this component highlighted
  // only when its own data changes — not on every keystroke in the search box.

  return (
    <tr
      onClick={() => onClick(row)}
      className={isSelected ? 'row-selected' : ''}
      style={{ cursor: 'pointer' }}
    >
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.department}</td>
      <td>
        <span
          className="status-badge"
          style={{ background: STATUS_COLORS[row.status] ?? '#f3f4f6' }}
        >
          {row.status}
        </span>
      </td>
      <td>${row.salary.toLocaleString()}</td>
      <td>{row.joined}</td>
    </tr>
  )
})

export default TableRow
