import React from 'react';
import { COLORS } from '../constants/theme';
import { supabase } from '../lib/supabaseClient';

const Sidebar = ({ currentView, setView }) => {
  const tabs = [
    { id: 'Dashboard', icon: '📊' },
    { id: 'Transactions', icon: '📑' },
    { id: 'Budget', icon: '🎯' },
    { id: 'Settings', icon: '⚙️' }
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="sidebar">
      <div className="logo"><span>💳</span> Spendly</div>
      <nav className="nav-group">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`nav-link ${currentView === tab.id ? 'active' : ''}`} 
            onClick={() => setView(tab.id)}
          >
            <span>{tab.icon}</span> {tab.id}
          </div>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>AD</div>
          <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Alex Doe</div><div style={{ fontSize: '0.75rem', color: COLORS.textMuted }}>Premium</div></div>
        </div>
        <button 
          onClick={handleSignOut}
          style={{ 
            width: '100%', 
            padding: '0.6rem', 
            borderRadius: '8px', 
            border: `1px solid ${COLORS.border}`, 
            background: 'transparent', 
            color: COLORS.danger,
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
