# Expense Tracker UI/UX Prompt

This reference contains a high-fidelity prompt for building a functional, aesthetically pleasing Expense Tracker in React.

## The Prompt

You are an expert frontend developer and UI/UX designer. Build me a complete, fully functional, single-file Expense Tracker web application in React (JSX) with the following specifications:

---

### AESTHETIC & DESIGN
- Dark mode only. Background: #0d1117. Cards: #161b22. Borders: #30363d
- Accent color: #00d4aa (teal). Income color: #f59e0b (amber). Expense/danger: #ef4444
- Typography: Import "DM Sans" and "Sora" from Google Fonts. Use Sora for headings, DM Sans for body
- Rounded corners (12px). Subtle shadows. No harsh outlines
- Smooth transitions on all interactive elements (0.2s ease)
- Do NOT use Inter, Roboto, or Arial

---

### LAYOUT
- Left sidebar (240px wide) with: App logo + name "Spendly", navigation links (Dashboard, Transactions, Budget), user avatar at bottom
- Main content area fills the rest
- On mobile (< 768px): hide sidebar, show bottom tab bar instead
- Use CSS Grid and Flexbox — no external CSS frameworks

---

### DASHBOARD PAGE (default view)
1. **Top bar**: Greeting ("Good morning, Alex 👋"), current month selector (prev/next arrows), "+ Add" button (teal, prominent)
2. **Summary Cards Row** (3 cards):
   - Total Balance (sum of all income - expenses, large number, teal)
   - This Month Income (green/amber)
   - This Month Expenses (red)
   - Each card has: icon, label, big animated number, % change vs last month
3. **Charts Row** (side by side on desktop, stacked on mobile):
   - Left: Bar chart — last 6 months income vs expenses (use inline SVG bars, no library)
   - Right: Donut chart — expense breakdown by category (inline SVG, animated draw)
4. **Budget Progress Section**: For each category, show a labeled progress bar (spent / limit). Turn red when > 80%
5. **Recent Transactions**: Last 5 transactions as a clean list with category icon, merchant name, date, and colored amount

---

### TRANSACTIONS PAGE
- Full scrollable list of all transactions
- Filter bar: text search, category dropdown, type (income/expense) toggle
- Each row: category emoji, merchant, note (muted), date, amount (colored by type)
- Click a row to open an edit modal
- Empty state illustration when no transactions match filters

---

### ADD / EDIT TRANSACTION MODAL
- Slide-up overlay with backdrop blur
- Large centered amount input (type=number, auto-focus, big font)
- Toggle between "Expense" and "Income" (pill toggle, changes accent color)
- Category selector: icon grid (3 columns) — tap to select, selected glows
- Merchant/note text input
- Date picker (default today)
- "Save" button (full width, teal) and "Cancel" link
- Validate: amount required, category required

---

### STATE & DATA
- Use React useState and useReducer for all state
- Seed with 15 realistic sample transactions (mix of categories, last 30 days, amounts in INR)
- Budget limits: Food ₹5000, Transport ₹3000, Entertainment ₹2000, Shopping ₹4000, Bills ₹3500
- All data in-memory (no localStorage, no API)
- Calculate totals, monthly groupings, and category breakdowns from raw transaction array

---

### ANIMATIONS
- Number countup animation when dashboard loads (0 → final value over 800ms)
- Bar chart bars grow from 0 height on mount
- Donut chart arc draws clockwise on mount
- Modal slides up from bottom with fade-in backdrop
- Cards have a subtle scale(1.02) on hover

---

### CODE REQUIREMENTS
- Single .jsx file, default export
- Use only: React (useState, useReducer, useEffect, useMemo), inline styles or a <style> tag at top
- No Tailwind, no external CSS files, no component libraries
- No localStorage, no API calls
- Fully working — clicking all nav links should show different views
- Mobile responsive

---

### SAMPLE DATA (use exactly this seed):
```js
const SEED_TRANSACTIONS = [
  { id:1, type:"expense", amount:320,  category:"food",          merchant:"Zomato",        note:"Dinner",        date:"2026-05-06" },
  { id:2, type:"expense", amount:1200, category:"shopping",      merchant:"Amazon",         note:"Phone case",    date:"2026-05-05" },
  { id:3, type:"income",  amount:45000,category:"income",        merchant:"Salary",         note:"May salary",    date:"2026-05-01" },
  { id:4, type:"expense", amount:499,  category:"entertainment", merchant:"Netflix",        note:"Subscription",  date:"2026-05-01" },
  { id:5, type:"expense", amount:850,  category:"transport",     merchant:"Uber",           note:"Airport ride",  date:"2026-04-30" },
  { id:6, type:"expense", amount:2100, category:"bills",         merchant:"Electricity",    note:"April bill",    date:"2026-04-28" },
  { id:7, type:"expense", amount:540,  category:"food",          merchant:"Swiggy",         note:"Lunch",         date:"2026-04-27" },
  { id:8, type:"expense", amount:3200, category:"shopping",      merchant:"Myntra",         note:"Clothes",       date:"2026-04-25" },
  { id:9, type:"income",  amount:8000, category:"income",        merchant:"Freelance",      note:"UI project",    date:"2026-04-20" },
  {id:10, type:"expense", amount:300,  category:"health",        merchant:"Apollo Pharmacy",note:"Medicines",     date:"2026-04-18" },
  {id:11, type:"expense", amount:1500, category:"transport",     merchant:"IRCTC",          note:"Train ticket",  date:"2026-04-15" },
  {id:12, type:"expense", amount:750,  category:"food",          merchant:"Starbucks",      note:"Team coffee",   date:"2026-04-12" },
  {id:13, type:"expense", amount:999,  category:"entertainment", merchant:"Spotify",        note:"Annual plan",   date:"2026-04-10" },
  {id:14, type:"expense", amount:4500, category:"bills",         merchant:"Rent",           note:"April rent",    date:"2026-04-01" },
  {id:15, type:"income",  amount:2500, category:"income",        merchant:"Interest",       note:"FD interest",   date:"2026-04-01" }
];
```
