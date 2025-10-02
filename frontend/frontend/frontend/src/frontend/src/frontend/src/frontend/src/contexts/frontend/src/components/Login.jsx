import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Phone, Lock, ArrowRight } from 'lucide-react'

function Login() {
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [pin, setPin] = useState('')
  const [step, setStep] = useState('mobile') // mobile -> otp -> pin
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { sendOTP, loginWithOTP, loginWithPIN } = useAuth()

  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    setError('')
    
    const result = await sendOTP(mobile)
    if (result.success) {
      setStep('otp')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleOTPVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    setError('')
    
    const result = await loginWithOTP(mobile, otp)
    if (result.success) {
      setStep('pin')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handlePINLogin = async () => {
    if (!pin || pin.length !== 4) {
      setError('Please enter a valid 4-digit PIN')
      return
    }

    setLoading(true)
    setError('')
    
    const result = await loginWithPIN(pin)
    if (!result.success) {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const renderMobileStep = () => (
    <div className="login-card">
      <h1 className="login-title">Case Management System</h1>
      <div className="form-group">
        <label className="form-label">Mobile Number</label>
        <div style={{ position: 'relative' }}>
          <Phone size={20} style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#64748b'
          }} />
          <input
            type="tel"
            className="form-input"
            style={{ paddingLeft: '40px' }}
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
          />
        </div>
      </div>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
      <button 
        className="btn btn-primary"
        onClick={handleSendOTP}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send OTP'}
        <ArrowRight size={16} />
      </button>
    </div>
  )

  const renderOTPStep = () => (
    <div className="login-card">
      <h1 className="login-title">Enter OTP</h1>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#64748b' }}>
        OTP sent to +91 {mobile}
      </p>
      <div className="form-group">
        <div className="otp-inputs">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="otp-input"
              maxLength="1"
              value={otp[index] || ''}
              onChange={(e) => {
                const newOtp = otp.split('')
                newOtp[index] = e.target.value
                setOtp(newOtp.join('').slice(0, 6))
                
                // Auto-focus next input
                if (e.target.value && index < 5) {
                  document.getElementById(`otp-${index + 1}`)?.focus()
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !otp[index] && index > 0) {
                  document.getElementById(`otp-${index - 1}`)?.focus()
                }
              }}
              id={`otp-${index}`}
            />
          ))}
        </div>
      </div>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
      <button 
        className="btn btn-primary"
        onClick={handleOTPVerify}
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
        <ArrowRight size={16} />
      </button>
      <button 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#64748b', 
          marginTop: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => setStep('mobile')}
      >
        Change Mobile Number
      </button>
    </div>
  )

  const renderPINStep = () => (
    <div className="login-card">
      <h1 className="login-title">Enter PIN</h1>
      <div className="form-group">
        <label className="form-label">4-digit PIN</label>
        <div style={{ position: 'relative' }}>
          <Lock size={20} style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#64748b'
          }} />
          <input
            type="password"
            className="form-input"
            style={{ paddingLeft: '40px', textAlign: 'center', letterSpacing: '8px' }}
            placeholder="****"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength="4"
          />
        </div>
      </div>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
      <button 
        className="btn btn-primary"
        onClick={handlePINLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
        <ArrowRight size={16} />
      </button>
    </div>
  )

  return (
    <div className="login-container">
      {step === 'mobile' && renderMobileStep()}
      {step === 'otp' && renderOTPStep()}
      {step === 'pin' && renderPINStep()}
    </div>
  )
}

export default Login
