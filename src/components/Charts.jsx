import React, { useState } from 'react';

export const DonutChart = ({ data, cardColor, borderColor }) => {
  const [hovered, setHovered] = useState(null);
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;

  if (total === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 100" width="160" height="160">
          <circle cx="50" cy="50" r="40" fill="none" stroke={borderColor} strokeWidth="8" />
          <text x="50" y="55" textAnchor="middle" fill="#8b949e" fontSize="8">No Data</text>
        </svg>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <svg viewBox="0 0 100 100" width="160" height="160">
        {data.map((item, i) => {
          const sliceAngle = (item.value / total) * 360;
          const x1 = 50 + 40 * Math.cos((Math.PI * (currentAngle - 90)) / 180);
          const y1 = 50 + 40 * Math.sin((Math.PI * (currentAngle - 90)) / 180);
          currentAngle += sliceAngle;
          const x2 = 50 + 40 * Math.cos((Math.PI * (currentAngle - 90)) / 180);
          const y2 = 50 + 40 * Math.sin((Math.PI * (currentAngle - 90)) / 180);
          const largeArcFlag = sliceAngle > 180 ? 1 : 0;
          
          if (sliceAngle >= 359.9) return <circle key={i} cx="50" cy="50" r="40" fill={item.color} onMouseEnter={() => setHovered(item)} onMouseLeave={() => setHovered(null)} />;
          
          return (
            <path key={i} d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`} fill={item.color}
              onMouseEnter={() => setHovered(item)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer', transition: '0.2s', opacity: hovered && hovered.name !== item.name ? 0.4 : 1 }}
            />
          );
        })}
        <circle cx="50" cy="50" r="28" fill={cardColor} />
        {hovered && <text x="50" y="52" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">{hovered.label}: ₹{hovered.value.toLocaleString()}</text>}
      </svg>
    </div>
  );
};

export const BarChart = ({ income, expense, incomeColor, dangerColor, textMutedColor }) => {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(income, expense, 100);
  const incH = Math.max((income / max) * 100, 2);
  const expH = Math.max((expense / max) * 100, 2);
  return (
    <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '2rem', padding: '0 2rem', position: 'relative' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end', cursor: 'pointer' }}
        onMouseEnter={() => setHovered({ label: 'Total Income', value: income })} onMouseLeave={() => setHovered(null)}>
        <div style={{ width: '40px', background: incomeColor, height: `${incH}%`, borderRadius: '6px 6px 0 0', transition: '0.3s' }} />
        <span style={{ fontSize: '0.75rem', color: textMutedColor }}>Income</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end', cursor: 'pointer' }}
        onMouseEnter={() => setHovered({ label: 'Total Expense', value: expense })} onMouseLeave={() => setHovered(null)}>
        <div style={{ width: '40px', background: dangerColor, height: `${expH}%`, borderRadius: '6px 6px 0 0', transition: '0.3s' }} />
        <span style={{ fontSize: '0.75rem', color: textMutedColor }}>Expense</span>
      </div>
      {hovered && <div className="professional-tooltip">{hovered.label}: ₹{hovered.value.toLocaleString()}</div>}
    </div>
  );
};

export const AreaTrendChart = ({ history, color }) => {
  const [hovered, setHovered] = useState(null);
  if (!history || history.length < 2) return <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontSize: '0.8rem' }}>Awaiting more days...</div>;
  const max = Math.max(...history.map(d => d.value), 100);
  const points = history.map((d, i) => `${(i / (history.length - 1)) * 100},${100 - (d.value / max) * 100}`).join(' ');
  return (
    <div style={{ height: '160px', width: '100%', position: 'relative' }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
        <defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{ stopColor: color, stopOpacity: 0.4 }} /><stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} /></linearGradient></defs>
        <polyline points={`0,100 ${points} 100,100`} fill="url(#grad)" />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {history.map((d, i) => (<circle key={i} cx={(i / (history.length - 1)) * 100} cy={100 - (d.value / max) * 100} r="2" fill={color} onMouseEnter={() => setHovered(d)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }} />))}
      </svg>
      {hovered && <div className="professional-tooltip">Balance: ₹{hovered.value.toLocaleString()}</div>}
    </div>
  );
};

export const TransactionHistoryChart = ({ txs, color, textMutedColor }) => {
  const [hovered, setHovered] = useState(null);
  if (!txs || txs.length === 0) return <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontSize: '0.8rem' }}>No data for this month.</div>;
  const max = Math.max(...txs.map(t => t.amount), 100);
  return (
    <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '8px', position: 'relative' }}>
      {txs.map((t, i) => (
        <div key={t.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end', cursor: 'pointer' }}
          onMouseEnter={() => setHovered(t)} onMouseLeave={() => setHovered(null)}>
          <div style={{ width: '100%', background: color, height: `${Math.max((t.amount / max) * 100, 4)}%`, borderRadius: '4px 4px 0 0', opacity: hovered && hovered.id === t.id ? 1 : 0.7 }} />
          <span style={{ fontSize: '0.6rem', color: textMutedColor }}>#{txs.length - i}</span>
        </div>
      ))}
      {hovered && <div className="professional-tooltip">{hovered.merchant}: ₹{hovered.amount.toLocaleString()}</div>}
    </div>
  );
};

export const ChartLegend = ({ data }) => {
  return (
    <div className="chart-legend">
      {data.map(item => (
        <div key={item.name} className="legend-item">
          <div className="legend-color" style={{ background: item.color }} />
          <span className="legend-label">{item.icon} {item.label}</span>
          <span className="legend-value">₹{item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};
