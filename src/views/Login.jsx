import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin({ 
        role: user.role, 
        email: user.email,
        assignedLocationId: user.assignedLocationId
      });
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex-center relative overflow-hidden" style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '2rem'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%)',
        opacity: 0.5,
        filter: 'blur(60px)'
      }}></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative"
        style={{
          width: '100%',
          maxWidth: '450px',
          padding: '3rem',
          zIndex: 1
        }}
      >
        <div className="text-center mb-25">
          <div style={{
            width: 80,
            height: 80,
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 30px rgba(74, 222, 128, 0.3)',
            borderRadius: '1.25rem',
            overflow: 'hidden'
          }}>
            <img src={logo} alt="TAP Green Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>TAP Green</h1>
          <p className="text-secondary">NetZero Intelligence Gateway</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              padding: '1rem', 
              borderRadius: '0.75rem', 
              color: 'var(--color-danger)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex-col gap-15">
          <div className="flex-col gap-05">
            <label className="text-sm font-semibold text-secondary" style={{ marginLeft: '0.25rem' }}>Corporate Email</label>
            <div className="relative">
              <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                placeholder="Enter email..."
                required
                className="search-input"
                style={{ padding: '1rem 1rem 1rem 3.25rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-col gap-05">
            <label className="text-sm font-semibold text-secondary" style={{ marginLeft: '0.25rem' }}>Secret Password</label>
            <div className="relative">
              <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                placeholder="••••••••"
                required
                className="search-input"
                style={{ padding: '1rem 1rem 1rem 3.25rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary flex-center mt-1" style={{ width: '100%', height: '54px', fontSize: '1.1rem' }}>
            Secure Sign In <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
