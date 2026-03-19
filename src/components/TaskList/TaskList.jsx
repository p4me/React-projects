import { useReducer, useRef } from 'react'
import { taskReducer, initialTasks } from './taskReducer'
import AddTask from './AddTask'
import TaskItem from './TaskItem'
import './TaskList.css'

function TaskList() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
  const nextId = useRef(initialTasks.length + 1)

  function handleAdd(text) {
    dispatch({ type: 'added', id: nextId.current++, text })
  }

  function handleChange(task) {
    dispatch({ type: 'changed', task })
  }

  function handleDelete(id) {
    dispatch({ type: 'deleted', id })
  }

  const pending = tasks.filter(t => !t.done).length

  return (
    <div className="task-list-wrapper">
      <div className="task-list-header">
        <h2>Task List</h2>
        <span className="task-count">{pending} remaining</span>
      </div>

      <AddTask onAdd={handleAdd} />

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
