export const COLORS = {
  bg: '#0d1117',
  card: '#161b22',
  border: '#30363d',
  accent: '#00d4aa',
  income: '#f59e0b',
  danger: '#ef4444',
  text: '#e6edf3',
  textMuted: '#8b949e',
};

// Rich Dummy Data for 1-week view
const today = new Date();
const d = (days) => {
  const date = new Date();
  date.setDate(today.getDate() - days);
  return date.toLocaleDateString();
};

export const INITIAL_TRANSACTIONS = [
  { id: 1, type: "income", amount: 50000, category: "income", merchant: "Monthly Salary", note: "May Salary", date: d(7), method: 'Online' },
  { id: 2, type: "expense", amount: 1200, category: "food", merchant: "Zomato", note: "Dinner", date: d(6), method: 'Online' },
  { id: 3, type: "expense", amount: 4500, category: "shopping", merchant: "Amazon", note: "Electronics", date: d(6), method: 'Online' },
  { id: 4, type: "expense", amount: 800, category: "transport", merchant: "Uber", note: "Office ride", date: d(5), method: 'Cash' },
  { id: 5, type: "expense", amount: 2100, category: "bills", merchant: "Airtel", note: "Wifi Bill", date: d(5), method: 'Online' },
  { id: 6, type: "expense", amount: 1500, category: "entertainment", merchant: "Netflix", note: "Yearly", date: d(4), method: 'Online' },
  { id: 7, type: "expense", amount: 500, category: "food", merchant: "Starbucks", note: "Coffee", date: d(4), method: 'Cash' },
  { id: 8, type: "income", amount: 8000, category: "income", merchant: "Freelance", note: "Logo Design", date: d(3), method: 'Online' },
  { id: 9, type: "expense", amount: 3200, category: "shopping", merchant: "Myntra", note: "Clothes", date: d(3), method: 'Online' },
  { id: 10, type: "expense", amount: 400, category: "food", merchant: "Swiggy", note: "Lunch", date: d(2), method: 'Cash' },
  { id: 11, type: "expense", amount: 1500, category: "bills", merchant: "Electricity", note: "April Bill", date: d(2), method: 'Online' },
  { id: 12, type: "expense", amount: 900, category: "transport", merchant: "Petrol", note: "Full tank", date: d(1), method: 'Cash' },
  { id: 13, type: "expense", amount: 2500, category: "health", merchant: "Apollo", note: "Checkup", date: d(1), method: 'Online' },
  { id: 14, type: "expense", amount: 600, category: "food", merchant: "Pizza Hut", note: "Party", date: d(0), method: 'Online' },
  { id: 15, type: "income", amount: 2000, category: "income", merchant: "Cash Gift", note: "From friend", date: d(0), method: 'Cash' }
];

export const INITIAL_CATEGORIES = {
  food: { label: 'Food', icon: '🍔', limit: 8000, color: '#ff6b6b' },
  shopping: { label: 'Shopping', icon: '🛍️', limit: 10000, color: '#4dadf7' },
  entertainment: { label: 'Entertainment', icon: '🎬', limit: 5000, color: '#cc5de8' },
  transport: { label: 'Transport', icon: '🚗', limit: 4000, color: '#ff922b' },
  bills: { label: 'Bills', icon: '📄', limit: 15000, color: '#51cf66' },
  health: { label: 'Health', icon: '🏥', limit: 3000, color: '#f06595' },
  income: { label: 'Income', icon: '💰', limit: 0, color: '#f59e0b' },
};
