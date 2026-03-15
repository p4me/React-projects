import { useState } from 'react'
import './TaskItem.css'

function TaskItem({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  function handleSave() {
    if (!draft.trim()) return
    onChange({ ...task, text: draft.trim() })
    setIsEditing(false)
  }

  function handleCancel() {
    setDraft(task.text)
    setIsEditing(false)
  }

  function handleToggleDone() {
    onChange({ ...task, done: !task.done })
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggleDone}
        className="task-checkbox"
      />

      {isEditing ? (
        <>
          <input
            className="task-edit-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            autoFocus
          />
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span className={`task-text ${task.done ? 'done' : ''}`}>
            {task.text}
          </span>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </li>
  )
}

export default TaskItem
