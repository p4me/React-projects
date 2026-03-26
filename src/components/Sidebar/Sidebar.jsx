import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { path: '/', label: 'Home', end: true },
  { path: '/dashboard', label: 'Dashboard', end: false },
  { path: '/tasks', label: 'Tasks', end: false },
  { path: '/posts', label: 'Posts', end: false },
  { path: '/timer', label: 'Timer', end: false },
  { path: '/stopwatch', label: 'Stopwatch', end: false },
  { path: '/stopwatch-easy', label: 'StopwatchEasy', end: false },
  { path: '/data-table', label: 'Data Table', end: false },
  { path: '/contacts', label: 'Contacts', end: false },
  { path: '/live-search', label: 'Live Search', end: false },
  { path: '/about', label: 'About', end: false },
];

function Sidebar() {
  const getClassName = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';
  return (
    <nav className="sidebar">
      {navItems.map((item) => (
        <NavLink key={item.path} className={getClassName} to={item.path} end={item.end}>
          {item.label}
        </NavLink>
      ))
      }
    </nav>
  )
}

export default Sidebar
