import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/theme';

const AddTransactionModal = ({ isVisible, onClose, onSave, categories, defaultDate }) => {
  const initialDateStr = defaultDate.toISOString().split('T')[0];
  
  const [form, setForm] = useState({ 
    amount: '', 
    merchant: '', 
    type: 'expense', 
    category: 'food', 
    method: 'Cash',
    date: initialDateStr
  });

  // Get day name from selected date
  const getDayName = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  useEffect(() => {
    if (isVisible) {
      setForm(f => ({ ...f, date: initialDateStr }));
    }
  }, [isVisible, initialDateStr]);

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.merchant || !form.date) return;
    onSave(form);
    setForm({ amount: '', merchant: '', type: 'expense', category: 'food', method: 'Cash', date: initialDateStr });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: COLORS.textMuted }}>ADD TRANSACTION</h2>
          <div style={{ color: COLORS.accent, fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
             Selected: {getDayName(form.date)}
          </div>
        </div>

        <input 
          type="number" className="amount-input" value={form.amount} autoFocus min="0" 
          onChange={e => setForm({...form, amount: e.target.value})} placeholder="₹0" 
          style={{ color: form.type === 'income' ? COLORS.income : COLORS.accent }}
        />
        
        <div className="toggle-container">
          <button type="button" className={`toggle-btn ${form.type === 'expense' ? 'active expense' : ''}`} onClick={() => setForm({...form, type: 'expense'})}>Expense</button>
          <button type="button" className={`toggle-btn ${form.type === 'income' ? 'active income' : ''}`} onClick={() => setForm({...form, type: 'income', category: 'income'})}>Income</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
           <input className="input-field" style={{ marginBottom: 0 }} placeholder="Merchant" value={form.merchant} onChange={e => setForm({...form, merchant: e.target.value})} />
           <input className="input-field" style={{ marginBottom: 0 }} type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <select className="input-field" style={{ marginBottom: 0 }} value={form.category} onChange={e => setForm({...form, category: e.target.value})} disabled={form.type === 'income'}>
             {Object.keys(categories).filter(k => form.type === 'income' ? k === 'income' : k !== 'income').map(k => <option key={k} value={k}>{categories[k].label}</option>)}
          </select>
          <select className="input-field" style={{ marginBottom: 0 }} value={form.method} onChange={e => setForm({...form, method: e.target.value})}>
             <option value="Cash">💵 Cash</option>
             <option value="Online">💳 Online</option>
          </select>
        </div>

        <button className="btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}>Save Transaction</button>
        <center><button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: COLORS.textMuted, marginTop: '1rem', cursor: 'pointer' }}>Cancel</button></center>
      </form>
    </div>
  );
};

export default AddTransactionModal;
