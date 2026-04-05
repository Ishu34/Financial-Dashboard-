# Product Requirements Document (PRD)

## 1. Document Control

| Field | Value |
|---|---|
| Product | Financial Dashboard Web Application |
| Type | Frontend-only assignment |
| Platform | Responsive web application |
| Target Delivery Window | ~30 hours |
| Primary Goal | Deliver a polished, interactive finance dashboard using mock/static data |

---

## 2. Product Overview

### 2.1 Purpose
The Financial Dashboard is a frontend-only web application designed to help users track and understand their financial activity through a clean, modern, and interactive interface. The application will present key financial metrics, a searchable and filterable transaction history, and useful insights derived from mock data.

### 2.2 Problem Statement
Users need a fast and intuitive way to:
- View their overall financial health at a glance
- Explore recent and historical transactions
- Understand spending patterns over time and by category
- Identify useful trends and observations from financial data

### 2.3 Product Vision
Create a high-quality dashboard experience that feels production-ready, even without a backend, by emphasizing strong design, usability, responsiveness, thoughtful state management, and attention to detail.

### 2.4 Scope
This assignment is **frontend-only**:
- No backend
- No authentication service
- No database
- Data will be served from static/mock sources, optionally simulated via async loading

---

## 3. Goals and Objectives

### 3.1 Primary Goals
- Present a financial summary in a clear and visually engaging way
- Enable users to browse, search, sort, and filter transactions efficiently
- Simulate role-based UI behavior for Viewer and Admin users
- Surface financial insights through derived metrics and charts
- Deliver a responsive and polished experience across device sizes

### 3.2 Secondary Goals
- Showcase strong frontend engineering practices
- Demonstrate effective Zustand-based global state management
- Include thoughtful enhancements that improve the submission quality

### 3.3 Non-Goals
- Real-time bank integrations
- Multi-user authentication
- Server-side RBAC
- Payment processing
- True analytics or forecasting powered by external services

---

## 4. Users and Personas

### 4.1 Persona 1: Viewer
**Description:** A user who wants to monitor finances but cannot modify records.

**Needs:**
- Read-only access to dashboard information
- Ability to explore transactions and insights
- Clear filters and understandable charts

**Permissions:**
- View summary cards
- View charts and insights
- Search, sort, and filter transactions
- Cannot add or edit transactions

### 4.2 Persona 2: Admin
**Description:** A user responsible for maintaining transaction records.

**Needs:**
- Everything the Viewer can do
- Ability to add new transactions
- Ability to edit existing transactions

**Permissions:**
- All Viewer permissions
- Add transaction
- Edit transaction

---

## 5. User Roles and Role Simulation

Since the app is frontend-only, role-based behavior will be simulated in the UI.

### 5.1 Role Handling
- A role switcher (dropdown or toggle) will allow switching between **Viewer** and **Admin**
- Selected role will be stored in Zustand and optionally persisted to `localStorage`

### 5.2 Expected UI Behavior

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard summary | Yes | Yes |
| View charts | Yes | Yes |
| Filter/search/sort transactions | Yes | Yes |
| Add transaction | No | Yes |
| Edit transaction | No | Yes |
| Read-only transaction list | Yes | Yes |

### 5.3 UI Safeguards
- Viewer mode must hide or disable edit/add actions
- Admin actions should be obvious and accessible
- Role change should update the UI immediately without reload

---

## 6. Core Functional Requirements

## 6.1 Dashboard Overview

The landing dashboard must provide a clear snapshot of financial health.

### Mandatory Components
1. **Summary Cards**
   - Total Balance
   - Total Income
   - Total Expenses

2. **Time-based Visualization**
   - Example: line chart showing balance trend over time
   - Must communicate change across dates/months clearly

3. **Categorical Visualization**
   - Example: donut/pie chart showing spending distribution by category
   - Must focus on expense categories for clarity

### Requirements
- Values must be computed from transaction data
- Cards and charts should update when filters affect the displayed dataset, where appropriate
- Empty states must be handled cleanly when data is unavailable

## 6.2 Transactions Section

The transactions module must allow users to inspect financial records efficiently.

### Transaction List Requirements
Each transaction row/card must display:
- Date
- Amount
- Category
- Type (`income` or `expense`)
- Description

### Filtering Requirements
Support the following filters:
- By transaction type
- By category
- By date range

### Search / Sorting Requirements
At minimum, include one of:
- Search by description/category
- Sorting by date or amount

**Preferred:** include both search and sorting.

### Admin Actions
- Admin can add a transaction
- Admin can edit an existing transaction
- Form validation must prevent invalid or incomplete entries

## 6.3 Insights Section

The app must provide a lightweight insights area that helps users interpret data.

### Required Insights
- Highest spending category
- Monthly comparison
- At least one useful additional observation, such as:
  - Biggest single expense
  - Month with highest savings
  - Income vs expense ratio
  - Most frequent spending category

### Behavior
- Insights should derive from available transaction data
- If there is insufficient data, display a graceful fallback message

## 6.4 State Management

Global state must be implemented with **Zustand**.

### State Domains
- Transactions data
- Active filters
- Selected role
- UI preferences (recommended: dark mode)
- Loading state for mock async fetching

### Expectations
- State should be organized modularly and scalably
- Derived selectors/computations should be used where appropriate
- Persistent preferences should be stored using `localStorage`

## 6.5 UI/UX Requirements

### Design Requirements
- Clean, readable, modern interface
- Consistent spacing, typography, and hierarchy
- Financial information should be easy to scan quickly

### Responsiveness
- Must work well on mobile, tablet, laptop, and desktop
- Layout should adapt without breaking charts, filters, or tables

### Empty / No Data Handling
- Meaningful empty states for:
  - No transactions
  - No results after filtering
  - Missing chart data

### Interaction Quality
- Clear affordances for actions
- Smooth transitions
- No confusing or blocked interaction flows

---

## 7. Optional Enhancements (Required to Include in This Submission Plan)

These enhancements should be included because they materially strengthen the assignment quality.

### 7.1 Dark Mode
- Toggle between light and dark themes
- Persist preference in `localStorage`

### 7.2 Data Persistence
- Persist transactions, selected role, and preferences in `localStorage`
- On reload, restore the last known session state

### 7.3 Mock API Integration
- Simulate asynchronous data fetching using static JSON/mock services
- Include loading and error/empty handling UI

### 7.4 Animations and Transitions
- Use **Framer Motion** for:
  - Card entrance animations
  - Panel transitions
  - Modal or drawer animations
  - Micro-interactions where tasteful

### 7.5 Export Functionality
- Export visible or full transaction dataset as:
  - CSV
  - JSON

### 7.6 Advanced Filtering / Grouping
- Enhance filters with:
  - Multi-select categories
  - Month-based grouping
  - Group by category or time period

---

## 8. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 4 |
| State Management | Zustand |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |

### 8.1 Rationale
- **React 19 + TypeScript + Vite:** fast modern setup, type safety, rapid development
- **Tailwind CSS 4:** efficient styling, responsive utility-driven design
- **Zustand:** lightweight and scalable state management
- **Recharts:** quick implementation of polished charts
- **Framer Motion:** smooth, expressive UI interactions
- **Lucide React:** consistent iconography with minimal overhead

---

## 9. Functional Specification

## 9.1 Information Architecture

### Primary Sections
1. Header / Top Bar
2. Summary Cards
3. Charts Area
4. Insights Section
5. Transactions Section
6. Admin Transaction Form / Modal

### Proposed Navigation Structure
- Single-page dashboard with clearly separated sections
- Sticky or static top controls for:
  - Role switch
  - Theme toggle
  - Export actions
  - Global search/filter entry points

## 9.2 Key User Flows

### Flow A: Viewer explores finances
1. Open dashboard
2. Review balance, income, and expense cards
3. Inspect charts
4. Use filters to narrow transactions
5. Review insights and trends

### Flow B: Admin adds a transaction
1. Switch role to Admin
2. Open add transaction form
3. Fill required fields
4. Save transaction
5. Dashboard summary, charts, and insights update immediately

### Flow C: Admin edits a transaction
1. Switch role to Admin
2. Locate transaction from list
3. Select edit action
4. Update fields
5. Save changes and reflect updates across UI

### Flow D: User changes theme and returns later
1. Toggle dark mode
2. Preference saved locally
3. Reload app
4. Previous theme remains active

---

## 10. Data Model and Mock Data Specification

## 10.1 Transaction Shape

```ts
type Transaction = {
  id: string;
  date: string; // ISO date string
  amount: number;
  category:
    | "Salary"
    | "Freelance"
    | "Food"
    | "Transport"
    | "Shopping"
    | "Bills"
    | "Entertainment"
    | "Health"
    | "Education"
    | "Investment";
  type: "income" | "expense";
  description: string;
};
```

## 10.2 Category List
- Salary
- Freelance
- Food
- Transport
- Shopping
- Bills
- Entertainment
- Health
- Education
- Investment

## 10.3 Mock Data Requirements
- Minimum **50 transactions**
- Data must span at least **6 months**
- Must include both income and expense transactions
- Descriptions should feel realistic and varied
- Data should support meaningful charts and insights

## 10.4 Mock Data Strategy
- Seed initial transactions from a static dataset
- Optionally simulate fetching via Promise timeout
- Persist modifications locally after add/edit actions

---

## 11. Detailed Feature Requirements

## 11.1 Summary Cards

### Inputs
- Transaction dataset
- Applied filters (if cards are intended to reflect filtered state)

### Outputs
- Total Balance = Total Income - Total Expenses
- Total Income
- Total Expenses

### UX Notes
- Use concise labels and readable number formatting
- Show positive/negative indicators where useful
- Ensure high contrast and quick scannability

## 11.2 Time-Based Chart

### Example Options
- Balance trend line chart
- Monthly net flow chart
- Income vs expenses by month

### Requirements
- X-axis should represent time clearly
- Tooltips should be readable
- Works responsively on small screens

## 11.3 Categorical Chart

### Example Options
- Donut chart of expense categories
- Bar chart of category totals

### Requirements
- Clearly distinguish categories
- Include legend or labels
- Handle large/small values gracefully

## 11.4 Filters

### Minimum Controls
- Type selector
- Category selector
- Date range input

### Optional Improved Controls
- Reset filters button
- Multiple category selection
- Saved quick presets like “This month” or “Last 30 days”

## 11.5 Search

Search should support matching against:
- Description
- Category

## 11.6 Sorting

Recommended sort options:
- Date: newest to oldest / oldest to newest
- Amount: highest to lowest / lowest to highest

## 11.7 Add/Edit Transaction Form

### Fields
- Date
- Amount
- Category
- Type
- Description

### Validation Rules
- Date is required
- Amount must be greater than 0
- Category is required
- Type is required
- Description should not be empty

### UX Behavior
- Form available only to Admin
- Use modal, drawer, or inline form
- Show success feedback after save
- Cancel action should be easy and safe

## 11.8 Insights Cards / Panel

### Required Outputs
- Highest spending category
- Monthly comparison summary
- One additional useful insight

### Presentation
- Short, readable text summaries
- Optional supporting mini visual cues/icons

---

## 12. State Management Requirements

## 12.1 Zustand Store Domains

Suggested slices/modules:
- `transactions`
- `filters`
- `role`
- `theme`
- `ui`

## 12.2 Expected Actions
- Load mock transactions
- Add transaction
- Edit transaction
- Set role
- Set filters
- Reset filters
- Toggle theme
- Export data

## 12.3 Derived Selectors
Recommended derived values:
- Filtered transactions
- Total income
- Total expenses
- Total balance
- Spending by category
- Monthly aggregates
- Insights metrics

## 12.4 Persistence
Persist the following with `localStorage`:
- Transactions
- Selected role
- Theme
- Possibly filter preferences

---

## 13. UX, Visual, and Interaction Requirements

## 13.1 Visual Design Principles
- Minimal but expressive layout
- Strong typography hierarchy
- Clear spacing and alignment
- Effective use of color to distinguish income vs expenses

## 13.2 Responsiveness Strategy
- Mobile-first or adaptive responsive layout
- Cards should stack gracefully
- Charts should resize without clipping
- Transaction table may convert to cards on small screens if needed

## 13.3 Accessibility
- ARIA labels for interactive controls
- Keyboard navigation for filters, forms, modals, and toggles
- Sufficient color contrast
- Focus states visible across interactive elements

## 13.4 Empty and Error States
- No transactions available
- No filtered results
- Mock API loading state
- Mock API failure fallback (if simulated error state included)

## 13.5 Micro-interactions
- Hover states
- Button feedback
- Animated chart/container entrances
- Smooth theme switching

---

## 14. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Performance | First load under 2 seconds |
| Animation Smoothness | ~60fps transitions where possible |
| Accessibility | ARIA labels, keyboard navigation, contrast-conscious design |
| Reliability | No backend dependency required for app usage |
| Maintainability | Modular component and state structure |
| Scalability | Easy to extend with more roles/features later |

### Additional Expectations
- Avoid unnecessary re-renders
- Keep bundle and dependencies reasonable
- Maintain a clean component architecture

---

## 15. Success Metrics and Acceptance Criteria

The submission will be evaluated against the following criteria.

## 15.1 Design and Creativity
**Acceptance Criteria**
- Dashboard looks polished and cohesive
- Information hierarchy is clear
- Visualizations add value, not clutter
- UI reflects thoughtful design choices

## 15.2 Responsiveness
**Acceptance Criteria**
- App remains usable across mobile, tablet, and desktop
- No overflow or broken layouts in key sections
- Charts and tables adapt appropriately

## 15.3 Functionality
**Acceptance Criteria**
- Summary cards display correct values
- Transactions list works correctly
- Filters operate correctly
- Search and/or sorting works correctly
- Admin can add/edit transactions
- Viewer cannot access edit/add behavior

## 15.4 User Experience
**Acceptance Criteria**
- Navigation is simple and intuitive
- Common tasks require minimal effort
- Empty and loading states are clear
- Interactions feel responsive and understandable

## 15.5 Technical Quality
**Acceptance Criteria**
- Codebase is modular and maintainable
- TypeScript is used effectively
- Components are reusable where appropriate
- Project structure supports future growth

## 15.6 State Management
**Acceptance Criteria**
- Zustand is used effectively for shared state
- Data, filters, and role changes propagate correctly
- Persisted state restores reliably after refresh

## 15.7 Documentation
**Acceptance Criteria**
- README explains setup clearly
- Features and trade-offs are documented
- Approach and architecture are summarized clearly

## 15.8 Attention to Detail
**Acceptance Criteria**
- UI is polished
- Formatting is consistent
- Edge cases are handled
- Loading, empty, and restricted-role states are thoughtfully implemented

---

## 16. Edge Cases

The application should account for:
- No transactions in dataset
- All transactions filtered out
- Only income or only expense data available
- Very large transaction amounts
- Transactions with same date/category
- Admin edits causing charts/insights to change instantly
- Persisted local data being absent or malformed

---

## 17. Assumptions and Constraints

### Assumptions
- All data is mock/static
- Role switching is purely UI-driven
- No authentication is required
- Only add/edit is needed; delete is optional unless implemented as enhancement

### Constraints
- Tight deadline (~30 hours)
- Frontend-only implementation
- Must maximize perceived product quality within limited time

---

## 18. Delivery Prioritization

## 18.1 Must-Have
- Summary cards
- Time-based chart
- Categorical chart
- Transactions list
- Filters
- Search or sorting
- Role switcher
- Admin add/edit flow
- Insights section
- Zustand store
- Responsive layout
- Graceful empty states

## 18.2 Should-Have
- Dark mode
- `localStorage` persistence
- Mock async loading
- Framer Motion transitions
- Export CSV/JSON

## 18.3 Nice-to-Have
- Advanced grouping
- Filter presets
- Richer insights
- More refined motion and micro-interactions

---

## 19. Recommended Implementation Approach

### Suggested Build Order
1. Project setup and design system foundation
2. Mock data model and Zustand store
3. Summary cards and calculations
4. Charts
5. Transactions list with filters/search/sort
6. Role switch and Admin-only actions
7. Insights section
8. Persistence and mock async loading
9. Dark mode and export features
10. Polish, accessibility, responsiveness, and documentation

### Suggested Architecture
- `components/` for reusable UI
- `features/dashboard/`
- `features/transactions/`
- `features/insights/`
- `store/`
- `data/`
- `utils/`

---

## 20. Final Product Definition

The final product should feel like a compact, polished finance dashboard that demonstrates strong frontend execution under time constraints. It must combine clear financial storytelling, responsive design, correct interactive behavior, clean state management with Zustand, and thoughtful UX details. Even with mock data and no backend, the experience should appear complete, reliable, and presentation-ready.

