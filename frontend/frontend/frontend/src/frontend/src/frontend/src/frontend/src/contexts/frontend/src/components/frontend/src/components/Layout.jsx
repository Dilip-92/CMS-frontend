import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  LayoutDashboard, 
  FolderOpen, 
  Calendar, 
  FileText, 
  LogOut,
  User
} from 'lucide-react'

function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/cases', icon: FolderOpen, label: 'Cases' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/documents', icon: FileText, label: 'Documents' },
  ]

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Case Manager</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Legal Practice Suite
          </p>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '1rem 1.5rem', marginTop: 'auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            background: '#334155',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <User size={20} />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                {user?.name || 'User'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Advocate
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="nav-item"
            style={{ width: '100%', background: 'none', border: 'none', color: 'inherit' }}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
