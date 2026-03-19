import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import TaskListPage from './pages/TaskListPage'
import PostsPage from './pages/PostsPage'
import PostDetailPage from './pages/PostDetailPage'
import TimerPage from './pages/TimerPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<TaskListPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
          <Route path="timer" element={<TimerPage />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
