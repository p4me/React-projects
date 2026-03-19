// CONCEPT: useContext (consuming context)
// useTheme() internally calls useContext(ThemeContext).
// This component can read and change the global theme without receiving any props.

import { useTheme } from '../../context/ThemeContext'
import './Header.css'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-logo">MyApp</div>
      <div className="header-title">React Projects</div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  )
}

export default Header
