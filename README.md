<div align="center">

# 💰 Financial Dashboard

**A modern, responsive financial dashboard built with React 19, TypeScript, and Tailwind CSS**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-000000?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Recharts](https://img.shields.io/badge/Recharts-3-8884D8?style=for-the-badge&logo=chart.js&logoColor=white)](https://recharts.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Interactive Dashboard** | Summary cards with trends, area charts, bar charts, and donut charts for financial visualization |
| 💰 **Transaction Management** | Full CRUD operations — view, add, edit, and delete transactions |
| 🔍 **Advanced Filtering** | Search by description, filter by category/type, date range picker, and multi-field sorting |
| 📈 **Financial Insights** | Spending breakdown by category, savings rate calculation, and personalized health tips |
| 🌙 **Dark/Light Mode** | System preference detection with manual toggle and anti-FOUC protection |
| 👤 **Role-Based Access** | Admin and Viewer modes with granular permission control |
| 📱 **Fully Responsive** | Optimized layouts for mobile, tablet, and desktop with collapsible sidebar |
| ✨ **Smooth Animations** | Framer Motion page transitions, hover effects, and micro-interactions |
| 💾 **Persistent State** | All data synced to localStorage via Zustand persist middleware |
| 📥 **Data Export** | Export transactions to CSV or JSON format |
| 🎨 **Design System** | Comprehensive CSS custom properties for theming consistency |
| ♿ **Accessible UI** | ARIA labels, keyboard navigation, and semantic HTML |
| 💀 **Loading States** | Skeleton loaders for smooth perceived performance |
| 🚫 **Error Handling** | Error boundaries and graceful empty states |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2 | UI framework with latest concurrent features |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Static type checking and developer experience |
| [Vite](https://vite.dev/) | 8.0 | Lightning-fast build tool with HMR |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2 | Utility-first CSS with CSS-first configuration |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0 | Lightweight state management with persistence |
| [Recharts](https://recharts.org/) | 3.8 | Composable React charting library |
| [Framer Motion](https://www.framer.com/motion/) | 12.38 | Production-ready animations |
| [React Router](https://reactrouter.com/) | 7.14 | Client-side routing |
| [Lucide React](https://lucide.dev/) | 1.7 | Beautiful, consistent icon set |
| [date-fns](https://date-fns.org/) | 4.1 | Modern date utility library |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd financial-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/           # Recharts wrappers (AreaChart, BarChart, DonutChart)
│   ├── layout/           # App shell (Sidebar, Header, MainLayout)
│   └── ui/               # Reusable primitives (Button, Card, Modal, Skeleton)
├── data/                 # Mock transaction data and category definitions
├── features/             # Feature-specific components (TransactionForm, FilterBar)
├── hooks/                # Custom React hooks (useMediaQuery, useDebounce)
├── lib/                  # Utility functions (cn for class merging)
├── pages/                # Route page components
│   ├── DashboardPage     # Overview with charts and summary cards
│   ├── TransactionsPage  # Transaction list with CRUD operations
│   ├── InsightsPage      # Financial analysis and recommendations
│   ├── SettingsPage      # Theme and role configuration
│   └── NotFoundPage      # 404 error page
├── stores/               # Zustand state stores
├── types/                # TypeScript type definitions
└── utils/                # Business logic utilities (calculations, exports)
```

---

## 🏗️ Architecture

### State Management

Five Zustand stores power the application:

| Store | Responsibility |
|-------|----------------|
| `transactionStore` | Transaction CRUD with localStorage persistence |
| `filterStore` | Search, filters, sorting, and date range state |
| `roleStore` | Admin/Viewer role management |
| `themeStore` | Dark/Light mode with system preference sync |
| `insightsStore` | Computed financial metrics and health tips |

### Routing

React Router v7 with nested layouts:

```
/                 → Dashboard (summary cards, charts)
/transactions     → Transaction list with filters
/insights         → Financial analysis
/settings         → App configuration
*                 → 404 Not Found
```

### Styling Architecture

- **Tailwind CSS v4** with CSS-first `@theme` configuration
- **Custom properties** for all design tokens (colors, spacing, shadows)
- **Class-based dark mode** using `@custom-variant dark`
- **Anti-FOUC script** prevents flash of unstyled content

### Animation System

Framer Motion handles:
- Page transitions with `AnimatePresence`
- Card hover effects and micro-interactions
- Loading skeleton animations
- Modal and dropdown enter/exit

---

## 🎨 Design System

### Color Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--color-background` | `#F8FAFC` | `#0F172A` |
| `--color-surface` | `#FFFFFF` | `#1E293B` |
| `--color-primary` | `#3B82F6` | `#60A5FA` |
| `--color-success` | `#10B981` | `#34D399` |
| `--color-danger` | `#EF4444` | `#F87171` |

### Typography

- **Sans-serif**: Inter (primary)
- **Monospace**: JetBrains Mono (data display)

### Spacing & Radius

```css
--radius-sm: 0.25rem    /* 4px */
--radius-md: 0.5rem     /* 8px */
--radius-lg: 0.75rem    /* 12px */
--radius-xl: 1rem       /* 16px */
```

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768px+ | Collapsible sidebar |
| Desktop | 1024px+ | Full sidebar, multi-column grids |

---

## 👥 Role-Based Access

| Feature | Admin | Viewer |
|---------|:-----:|:------:|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export data | ✅ | ❌ |
| Change settings | ✅ | ✅ |
| Toggle role | ✅ | ✅ |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using React 19 and modern web technologies**

</div>
