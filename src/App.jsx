import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import TaskListPage from './pages/TaskListPage'
import PostsPage from './pages/PostsPage'
import PostDetailPage from './pages/PostDetailPage'
import TimerPage from './pages/TimerPage'
import ContactsPage from './pages/ContactsPage'
import LiveSearchPage from './pages/LiveSearchPage'
import StopwatchPage from './pages/StopwatchPage'
import StopwatchEasyPage from './pages/StopwatchEasyPage'
import DataTablePage from './pages/DataTablePage'

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
          <Route path="stopwatch" element={<StopwatchPage />} />
          <Route path="stopwatch-easy" element={<StopwatchEasyPage />} />
          <Route path="data-table" element={<DataTablePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="live-search" element={<LiveSearchPage />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
