import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter } from 'lucide-react'

function Cases() {
  const [cases, setCases] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Mock data - replace with API call
    setCases([
      {
        id: 1,
        caseNumber: 'CR/1234/2023',
        title: 'State vs. John Doe',
        client: 'John Doe',
        court: 'District Court #5',
        filingDate: '2023-01-15',
        nextHearing: '2024-01-15',
        status: 'active',
        priority: 'high'
      },
      {
        id: 2,
        caseNumber: 'CS/5678/2023',
        title: 'ABC Corp vs. XYZ Ltd',
        client: 'ABC Corporation',
        court: 'High Court',
        filingDate: '2023-02-20',
        nextHearing: '2024-01-20',
        status: 'pending',
        priority: 'medium'
      }
    ])
  }, [])

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.client.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || caseItem.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <div className="header">
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Case Management</h1>
        <Link to="/cases/new" className="btn btn-primary">
          <Plus size={16} />
          New Case
        </Link>
      </div>

      {/* Filters and Search */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '12px',
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={20} style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#64748b'
          }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '40px' }}
            placeholder="Search cases by number, title, or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="form-input"
          style={{ width: '200px' }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Cases Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Case Number</th>
              <th>Title</th>
              <th>Client</th>
              <th>Court</th>
              <th>Filing Date</th>
              <th>Next Hearing</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td style={{ fontWeight: '600' }}>{caseItem.caseNumber}</td>
                <td>{caseItem.title}</td>
                <td>{caseItem.client}</td>
                <td>{caseItem.court}</td>
                <td>{caseItem.filingDate}</td>
                <td style={{ color: '#ef4444', fontWeight: '600' }}>
                  {caseItem.nextHearing}
                </td>
                <td>
                  <span className={`status-badge status-${caseItem.status}`}>
                    {caseItem.status}
                  </span>
                </td>
                <td>
                  <Link 
                    to={`/cases/${caseItem.id}`}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCases.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            No cases found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}

export default Cases
