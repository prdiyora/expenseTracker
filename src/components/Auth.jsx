import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { COLORS } from '../constants/theme';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setShowOtp(true);
      setMessage({ type: 'success', text: 'Check your email for the verification code!' });
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setMessage({ type: 'error', text: error.message });
    setLoading(false);
  };

  return (
    <div className="auth-wrapper" style={styles.container}>
      <div className="auth-card" style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: COLORS.accent, fontSize: '2.5rem', marginBottom: '0.5rem' }}>Spendly</h1>
          <p style={{ color: COLORS.textMuted }}>Manage your expenses with ease</p>
        </div>

        {message && (
          <div style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem', 
            backgroundColor: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 212, 170, 0.1)',
            color: message.type === 'error' ? COLORS.danger : COLORS.accent,
            border: `1px solid ${message.type === 'error' ? COLORS.danger : COLORS.accent}`,
            fontSize: '0.9rem'
          }}>
            {message.text}
          </div>
        )}

        {!showOtp ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Sending...' : 'Send Magic Link / OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Enter OTP</label>
              <input
                type="text"
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              type="button" 
              onClick={() => setShowOtp(false)} 
              style={{ ...styles.button, background: 'transparent', border: `1px solid ${COLORS.border}`, marginTop: '0.5rem' }}
            >
              Back to Email
            </button>
          </form>
        )}

        <div style={styles.divider}>
          <span style={styles.dividerText}>OR</span>
        </div>

        <button onClick={handleGoogleLogin} disabled={loading} style={styles.googleButton}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', marginRight: '10px' }} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    padding: '1rem',
  },
  card: {
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: COLORS.text,
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: `1px solid ${COLORS.border}`,
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: COLORS.text,
    outline: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: COLORS.accent,
    color: '#000',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem',
    borderRadius: '8px',
    border: `1px solid ${COLORS.border}`,
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  divider: {
    margin: '1.5rem 0',
    textAlign: 'center',
    borderBottom: `1px solid ${COLORS.border}`,
    lineHeight: '0.1em',
  },
  dividerText: {
    backgroundColor: COLORS.card,
    padding: '0 10px',
    color: COLORS.textMuted,
    fontSize: '0.8rem',
  }
};
