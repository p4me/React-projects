import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { path: '/', label: 'Home', end: true },
  { path: '/dashboard', label: 'Dashboard', end: false },
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
