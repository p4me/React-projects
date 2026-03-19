export const initialTasks = [
  { id: 1, text: 'Buy groceries', done: false },
  { id: 2, text: 'Read a book', done: false },
  { id: 3, text: 'Write some code', done: false },
]

export function taskReducer(tasks, action) {
  switch (action.type) {
    case 'added':
      return [
        ...tasks,
        { id: action.id, text: action.text, done: false },
      ]
    case 'changed':
      return tasks.map(t =>
        t.id === action.task.id ? action.task : t
      )
    case 'deleted':
      return tasks.filter(t => t.id !== action.id)
    default:
      throw new Error('Unknown action type: ' + action.type)
  }
}
