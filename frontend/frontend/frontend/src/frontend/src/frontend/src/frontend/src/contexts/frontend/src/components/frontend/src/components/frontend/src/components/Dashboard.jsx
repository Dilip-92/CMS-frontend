import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react'

function Dashboard() {
  const [stats, setStats] = useState({
    totalCases: 0,
    pendingCases: 0,
    closedCases: 0,
    urgentCases: 0
  })
  const [recentCases, setRecentCases] = useState([])
  const [upcomingHearings, setUpcomingHearings] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // In a real app, you'd make API calls here
      // For demo, we'll use mock data
      setStats({
        totalCases: 124,
        pendingCases: 45,
        closedCases: 67,
        urgentCases: 12
      })

      setRecentCases([
        {
          id: 1,
          caseNumber: 'CR/1234/2023',
          title: 'State vs. John Doe',
          client: 'John Doe',
          nextHearing: '2024-01-15',
          status: 'active'
        },
        {
          id: 2,
          caseNumber: 'CS/5678/2023',
          title: 'ABC Corp vs. XYZ Ltd',
          client: 'ABC Corporation',
          nextHearing: '2024-01-20',
          status: 'pending'
        }
      ])

      setUpcomingHearings([
        {
          id: 1,
          caseNumber: 'CR/1234/2023',
          title: 'State vs. John Doe',
          date: '2024-01-15',
          time: '10:30 AM',
          court: 'District Court #5'
        },
        {
          id: 2,
          caseNumber: 'CS/5678/2023',
          title: 'ABC Corp vs. XYZ Ltd',
          date: '2024-01-20',
          time: '02:15 PM',
          court: 'High Court'
        }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
        <Icon size={32} color={color} />
      </div>
    </div>
  )

  return (
    <div>
      <div className="header">
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary">
            <Calendar size={16} />
            New Case
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          icon={FolderOpen} 
          value={stats.totalCases} 
          label="Total Cases" 
          color="#2563eb"
        />
        <StatCard 
          icon={Clock} 
          value={stats.pendingCases} 
          label="Pending Cases" 
          color="#f59e0b"
        />
        <StatCard 
          icon={CheckCircle} 
          value={stats.closedCases} 
          label="Closed Cases" 
          color="#10b981"
        />
        <StatCard 
          icon={AlertTriangle} 
          value={stats.urgentCases} 
          label="Urgent Cases" 
          color="#ef4444"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Recent Cases */}
        <div className="table-container">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontWeight: '600' }}>Recent Cases</h3>
          </div>
          <div style={{ padding: '1rem' }}>
            {recentCases.map((caseItem) => (
              <div key={caseItem.id} style={{ 
                padding: '1rem', 
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '600' }}>{caseItem.caseNumber}</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    {caseItem.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Next: {caseItem.nextHearing}
                  </div>
                </div>
                <span className={`status-badge status-${caseItem.status}`}>
                  {caseItem.status}
                </span>
              </div>
            ))}
            <Link to="/cases" style={{ 
              display: 'block', 
              textAlign: 'center', 
              padding: '1rem',
              color: '#2563eb',
              textDecoration: 'none'
            }}>
              View All Cases
            </Link>
          </div>
        </div>

        {/* Upcoming Hearings */}
        <div className="table-container">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontWeight: '600' }}>Upcoming Hearings</h3>
          </div>
          <div style={{ padding: '1rem' }}>
            {upcomingHearings.map((hearing) => (
              <div key={hearing.id} style={{ 
                padding: '1rem', 
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: '600' }}>{hearing.caseNumber}</div>
                  <div style={{ color: '#ef4444', fontWeight: '600' }}>
                    {hearing.date} • {hearing.time}
                  </div>
                </div>
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  {hearing.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {hearing.court}
                </div>
              </div>
            ))}
            <Link to="/calendar" style={{ 
              display: 'block', 
              textAlign: 'center', 
              padding: '1rem',
              color: '#2563eb',
              textDecoration: 'none'
            }}>
              View Calendar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
