import React, { useState, useReducer, useMemo, useEffect } from 'react';
import './styles/App.css';
import { COLORS, INITIAL_TRANSACTIONS, INITIAL_CATEGORIES } from './constants/theme';
import Sidebar from './components/Sidebar';
import { BarChart, DonutChart, AreaTrendChart, TransactionHistoryChart, ChartLegend } from './components/Charts';
import AddTransactionModal from './components/AddTransactionModal';

// --- HELPERS ---
const formatFullDate = (dateObj) => {
  const d = new Date(dateObj);
  const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${dayName} ${day}/${month}/${year}`;
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'SET': return action.payload;
    case 'ADD': {
      const newState = [action.payload, ...state];
      localStorage.setItem('spendly_transactions', JSON.stringify(newState));
      return newState;
    }
    case 'DELETE': {
      const newState = state.filter(t => t.id !== action.payload);
      localStorage.setItem('spendly_transactions', JSON.stringify(newState));
      return newState;
    }
    default: return state;
  }
}

export default function App() {
  const [view, setView] = useState('Dashboard');
  const [transactions, dispatch] = useReducer(transactionReducer, []);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const savedTxs = localStorage.getItem('spendly_transactions');
    const savedCats = localStorage.getItem('spendly_categories');
    if (savedTxs) dispatch({ type: 'SET', payload: JSON.parse(savedTxs) });
    else dispatch({ type: 'SET', payload: INITIAL_TRANSACTIONS });
    if (savedCats) setCategories(JSON.parse(savedCats));
  }, []);

  const handleSetCategories = (newCats) => {
    setCategories(newCats);
    localStorage.setItem('spendly_categories', JSON.stringify(newCats));
  };

  const [viewDate, setViewDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const changeMonth = (offset) => {
    const next = new Date(viewDate);
    next.setMonth(viewDate.getMonth() + offset);
    setViewDate(next);
    setCurrentPage(1);
  };

  const currentMonthName = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const viewMonth = viewDate.getMonth();
  const viewYear = viewDate.getFullYear();

  const monthlyTransactions = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
    });
  }, [transactions, viewMonth, viewYear]);

  const stats = useMemo(() => {
    const income = monthlyTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = monthlyTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    
    const sortedThisMonth = [...monthlyTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    const last7Incomes = sortedThisMonth.filter(t => t.type === 'income').slice(-7).reverse();
    const last7Expenses = sortedThisMonth.filter(t => t.type === 'expense').slice(-7).reverse();

    const catData = Object.keys(categories).filter(k => k !== 'income').map(k => ({
      name: k,
      label: categories[k].label,
      value: monthlyTransactions.filter(t => t.category === k).reduce((acc, t) => acc + t.amount, 0),
      color: categories[k].color
    })).filter(d => d.value > 0);

    const trendData = sortedThisMonth.reduce((acc, t) => {
      const last = acc[acc.length - 1];
      const val = t.type === 'income' ? t.amount : -t.amount;
      if (last && last.date === t.date) { last.value += val; } 
      else { acc.push({ date: t.date, value: (last ? last.value : 0) + val }); }
      return acc;
    }, []);

    return { income, expense, balance: income - expense, last7Incomes, last7Expenses, catData, trendData };
  }, [monthlyTransactions, categories]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return monthlyTransactions.slice(startIndex, startIndex + rowsPerPage);
  }, [monthlyTransactions, currentPage]);

  const totalPages = Math.ceil(monthlyTransactions.length / rowsPerPage);

  const handleAdd = (formData) => {
    dispatch({ type: 'ADD', payload: { ...formData, amount: parseFloat(formData.amount), id: Date.now() } });
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar currentView={view} setView={setView} />

      <main className="main-content">
        <header className="top-header">
          <div>
            <h1>{view}</h1>
            <div className="month-selector">
               <button onClick={() => changeMonth(-1)}>←</button>
               <span>{currentMonthName}</span>
               <button onClick={() => changeMonth(1)}>→</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="btn-primary" style={{ background: 'transparent', border: `1px solid ${COLORS.border}`, color: COLORS.text }} onClick={() => {}}>📥 Report</button>
             <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add</button>
          </div>
        </header>

        {view === 'Dashboard' && (
          <>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-label">Net Balance ({currentMonthName})</div><div className="stat-value">₹{stats.balance.toLocaleString()}</div></div>
              <div className="stat-card"><div className="stat-label">Monthly Income</div><div className="stat-value" style={{ color: COLORS.income }}>₹{stats.income.toLocaleString()}</div></div>
              <div className="stat-card"><div className="stat-label">Monthly Expense</div><div className="stat-value" style={{ color: COLORS.danger }}>₹{stats.expense.toLocaleString()}</div></div>
            </div>
            
            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '2rem' }}>
               <div className="card"><h3>Last 7 Expenses (₹)</h3><TransactionHistoryChart txs={stats.last7Expenses} color={COLORS.danger} textMutedColor={COLORS.textMuted} /></div>
               <div className="card"><h3>Last 7 Incomes (₹)</h3><TransactionHistoryChart txs={stats.last7Incomes} color={COLORS.income} textMutedColor={COLORS.textMuted} /></div>
            </div>

            <div className="dashboard-grid full-width">
               <div className="card">
                 <h3>{currentMonthName} Balance Trend</h3>
                 <div className="chart-container">
                    <AreaTrendChart history={stats.trendData} color={COLORS.accent} />
                 </div>
               </div>
               <div className="card">
                 <h3>{currentMonthName} Income vs Expense</h3>
                 <div className="chart-container">
                    <BarChart income={stats.income} expense={stats.expense} incomeColor={COLORS.income} dangerColor={COLORS.danger} textMutedColor={COLORS.textMuted} />
                 </div>
               </div>
               <div className="card">
                 <h3>Category Breakdown</h3>
                 <div className="chart-container donut-mode">
                    <DonutChart data={stats.catData} cardColor={COLORS.card} borderColor={COLORS.border} />
                    <ChartLegend data={stats.catData.map(d => ({ ...d, icon: categories[d.name]?.icon, label: categories[d.name]?.label }))} />
                 </div>
               </div>
            </div>
          </>
        )}

        {view === 'Transactions' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
             <div style={{ padding: '1.5rem', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{currentMonthName} Activity</h3>
                <div className="pagination-controls">
                   <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
                   <span>Page {currentPage} of {totalPages || 1}</span>
                   <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                </div>
             </div>
             <div className="table-container">
                <table className="tx-table">
                  <thead><tr><th>Merchant</th><th>Category</th><th>Date (Day DD/MM/YY)</th><th>Method</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
                  <tbody>
                    {paginatedTransactions.map(tx => (
                      <tr key={tx.id}>
                        <td style={{ fontWeight: 600 }}>{tx.merchant}</td>
                        <td><span className="cat-badge">{categories[tx.category]?.icon} {categories[tx.category]?.label}</span></td>
                        <td style={{ color: COLORS.textMuted, fontSize: '0.9rem' }}>{formatFullDate(tx.date)}</td>
                        <td style={{ color: COLORS.textMuted }}>{tx.method}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: tx.type === 'income' ? COLORS.income : COLORS.danger }}>{tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {paginatedTransactions.length === 0 && <div style={{ padding: '4rem', textAlign: 'center', color: COLORS.textMuted }}>No transactions found for this month.</div>}
             </div>
          </div>
        )}

        {view === 'Budget' && (
          <div className="card">
            <h2 style={{ marginBottom: '2rem' }}>Budget Status ({currentMonthName})</h2>
            {Object.entries(categories).filter(([k]) => k !== 'income').map(([key, cat]) => {
              const spent = monthlyTransactions.filter(t => t.category === key).reduce((acc, t) => acc + t.amount, 0);
              const perc = Math.min((spent / cat.limit) * 100, 100);
              return (
                <div key={key} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>{cat.icon} {cat.label}</span>
                    <span>₹{spent} / ₹{cat.limit}</span>
                  </div>
                  <div className="progress-bg"><div className="progress-fill" style={{ width: `${perc}%`, background: perc > 85 ? COLORS.danger : COLORS.accent }} /></div>
                </div>
              );
            })}
          </div>
        )}

        {view === 'Settings' && (
          <div className="card">
            <h2 style={{ marginBottom: '2rem' }}>Budget Configuration</h2>
            {Object.entries(categories).filter(([k]) => k !== 'income').map(([key, cat]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem 0', borderBottom: `1px solid ${COLORS.border}` }}>
                <span>{cat.icon} {cat.label}</span>
                <input type="number" className="input-field" style={{ width: '120px', textAlign: 'right', marginBottom: 0 }} value={cat.limit} onChange={(e) => handleSetCategories({...categories, [key]: {...cat, limit: parseFloat(e.target.value) || 0}})} />
              </div>
            ))}
          </div>
        )}
      </main>

      <AddTransactionModal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAdd} categories={categories} defaultDate={viewDate} />
    </div>
  );
}
