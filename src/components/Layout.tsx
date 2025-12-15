import { Outlet, Link } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/animation-1">Animation1</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout