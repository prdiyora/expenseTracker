import React from 'react';
import { COLORS } from '../constants/theme';

const Sidebar = ({ currentView, setView, isOpen, onClose }) => {
  const tabs = [
    { id: 'Dashboard', icon: '📊' },
    { id: 'Transactions', icon: '📑' },
    { id: 'Budget', icon: '🎯' },
    { id: 'Settings', icon: '⚙️' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
          <div className="logo" style={{ marginBottom: 0 }}><span>💳</span> Spendly</div>
          <button className="close-sidebar" onClick={onClose}>✕</button>
        </div>

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>AD</div>
            <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Alex Doe</div><div style={{ fontSize: '0.75rem', color: COLORS.textMuted }}>Premium</div></div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
