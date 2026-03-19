import { Outlet } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

function Layout() {
  const { theme } = useTheme()

  return (
    <>
    <div className='layout'>
      <Header />
      <div className='layout-body'>
        <Sidebar />
        {/* data-theme is read by CSS to switch color variables */}
        <main className='main-content' data-theme={theme}>
          <Outlet/>
        </main>
      </div>
    </div>
    </>
  )
}

export default Layout
