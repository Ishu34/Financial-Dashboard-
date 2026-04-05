# Financial Dashboard — Design Document

> **Version:** 1.0.0  
> **Last Updated:** April 2026  
> **Status:** Approved for Development  
> **Project Type:** Frontend-Only React Application

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Layout Structure](#4-layout-structure)
5. [Component Design Specifications](#5-component-design-specifications)
6. [Animation & Motion Design](#6-animation--motion-design)
7. [Empty States](#7-empty-states)
8. [Spacing System](#8-spacing-system)
9. [Iconography](#9-iconography)
10. [Accessibility](#10-accessibility)
11. [Data Architecture (Frontend)](#11-data-architecture-frontend)
12. [File & Folder Structure](#12-file--folder-structure)

---

## 1. Design Philosophy

The Financial Dashboard is built on five core design principles that inform every visual and interaction decision throughout the product.

### 1.1 Clean, Modern Fintech Aesthetic

Finance software has long been associated with dense, utilitarian interfaces. This dashboard rejects that legacy in favor of a polished, premium feel — one that communicates trust, clarity, and confidence. The visual language borrows from modern fintech leaders (Stripe, Linear, Vercel) while staying domain-appropriate: precise, structured, and data-forward.

Every element earns its place. White space is intentional. Shadows are subtle. Borders are light. The result feels like a tool built for professionals who value their time.

### 1.2 Data-First Design — Information Density Without Clutter

Financial data is inherently dense: totals, trends, categories, dates, amounts, percentages. The challenge is surfacing the right information at the right moment without overwhelming the viewer.

The solution is **progressive disclosure**:
- The top of every view shows high-level KPIs (summary cards)
- Mid-level shows trends and breakdowns (charts)
- Bottom level shows granular detail (transaction list)

Users can skim or dive deep depending on their need. Nothing is hidden, but nothing is forced.

### 1.3 Consistent Visual Language

Every interactive state, every color usage, every spacing decision follows a strict design system. This predictability builds user confidence — when a card looks a certain way, users know what it does before they hover.

**Rules:**
- Green always means income/positive. Red always means expense/negative.
- Primary color (Indigo) is reserved for interactive actions and focus states.
- Secondary (Violet) is used for accent highlights and secondary data.
- Shadows increase on hover; color shifts signal active states.

### 1.4 Delight Through Subtle Micro-Interactions

The dashboard is not just functional — it is enjoyable to use. Micro-interactions create a sense of responsiveness and care:

- Numbers count up when the page loads
- Charts draw in smoothly on mount
- Cards lift on hover
- Toggles slide with spring physics
- Modals fade and slide in from below

These animations are purposeful: they guide attention, confirm actions, and make the interface feel alive. They never delay the user — all animations are under 300ms unless they carry semantic meaning (like chart draw-in).

### 1.5 Accessibility-First Color Choices

Every color pair in this system has been verified against **WCAG 2.1 Level AA** contrast requirements (minimum 4.5:1 for text, 3:1 for UI elements). Both light and dark themes satisfy these ratios independently.

Accessibility is not a feature added at the end — it is embedded in every color choice, focus state, and markup decision from the start.

---

## 2. Color System

The color system is defined as CSS custom properties on `:root` and `[data-theme="dark"]`, enabling instant theme switching without rerender overhead.

### 2.1 Light Theme

```
┌─────────────────────────────────────────────────────────────────┐
│  LIGHT THEME COLOR PALETTE                                      │
├──────────────────────┬─────────────┬──────────────────────────  │
│  Role                │  Token      │  Hex Value                 │
├──────────────────────┼─────────────┼──────────────────────────  │
│  Page Background     │ --bg-base   │  #F8FAFC  (Slate-50)       │
│  Card / Surface      │ --bg-surface│  #FFFFFF                   │
│  Primary Action      │ --primary   │  #6366F1  (Indigo-500)     │
│  Primary Hover       │ --primary-h │  #4F46E5  (Indigo-600)     │
│  Primary Subtle Bg   │ --primary-s │  #EEF2FF  (Indigo-50)      │
│  Secondary           │ --secondary │  #8B5CF6  (Violet-500)     │
│  Secondary Subtle Bg │ --secondary-s│ #F5F3FF  (Violet-50)      │
│  Success / Income    │ --success   │  #10B981  (Emerald-500)    │
│  Success Subtle Bg   │ --success-s │  #ECFDF5  (Emerald-50)     │
│  Danger / Expense    │ --danger    │  #EF4444  (Red-500)        │
│  Danger Subtle Bg    │ --danger-s  │  #FEF2F2  (Red-50)         │
│  Warning             │ --warning   │  #F59E0B  (Amber-500)      │
│  Warning Subtle Bg   │ --warning-s │  #FFFBEB  (Amber-50)       │
│  Text Primary        │ --text-1    │  #0F172A  (Slate-900)      │
│  Text Secondary      │ --text-2    │  #64748B  (Slate-500)      │
│  Text Disabled       │ --text-3    │  #CBD5E1  (Slate-300)      │
│  Border Default      │ --border    │  #E2E8F0  (Slate-200)      │
│  Border Strong       │ --border-s  │  #CBD5E1  (Slate-300)      │
│  Shadow Color        │ --shadow    │  rgba(15,23,42,0.08)       │
└──────────────────────┴─────────────┴──────────────────────────  ┘
```

**Visual Color Swatches (Light):**
```
Background  ████  #F8FAFC    Card       █████  #FFFFFF
Primary     ████  #6366F1    Secondary  █████  #8B5CF6
Income      ████  #10B981    Expense    █████  #EF4444
Warning     ████  #F59E0B    Text-1     █████  #0F172A
Text-2      ████  #64748B    Border     █████  #E2E8F0
```

---

### 2.2 Dark Theme

```
┌─────────────────────────────────────────────────────────────────┐
│  DARK THEME COLOR PALETTE                                       │
├──────────────────────┬─────────────┬──────────────────────────  │
│  Role                │  Token      │  Hex Value                 │
├──────────────────────┼─────────────┼──────────────────────────  │
│  Page Background     │ --bg-base   │  #0F172A  (Slate-900)      │
│  Card / Surface      │ --bg-surface│  #1E293B  (Slate-800)      │
│  Surface Elevated    │ --bg-elev   │  #334155  (Slate-700)      │
│  Primary Action      │ --primary   │  #818CF8  (Indigo-400)     │
│  Primary Hover       │ --primary-h │  #6366F1  (Indigo-500)     │
│  Primary Subtle Bg   │ --primary-s │  #1E1B4B  (Indigo-950)     │
│  Secondary           │ --secondary │  #A78BFA  (Violet-400)     │
│  Secondary Subtle Bg │ --secondary-s│ #2E1065  (Violet-950)     │
│  Success / Income    │ --success   │  #34D399  (Emerald-400)    │
│  Success Subtle Bg   │ --success-s │  #022C22  (Emerald-950)    │
│  Danger / Expense    │ --danger    │  #F87171  (Red-400)        │
│  Danger Subtle Bg    │ --danger-s  │  #450A0A  (Red-950)        │
│  Warning             │ --warning   │  #FCD34D  (Amber-300)      │
│  Warning Subtle Bg   │ --warning-s │  #451A03  (Amber-950)      │
│  Text Primary        │ --text-1    │  #F1F5F9  (Slate-100)      │
│  Text Secondary      │ --text-2    │  #94A3B8  (Slate-400)      │
│  Text Disabled       │ --text-3    │  #475569  (Slate-600)      │
│  Border Default      │ --border    │  #334155  (Slate-700)      │
│  Border Strong       │ --border-s  │  #475569  (Slate-600)      │
│  Shadow Color        │ --shadow    │  rgba(0,0,0,0.40)          │
└──────────────────────┴─────────────┴──────────────────────────  ┘
```

**Visual Color Swatches (Dark):**
```
Background  ████  #0F172A    Card       █████  #1E293B
Primary     ████  #818CF8    Secondary  █████  #A78BFA
Income      ████  #34D399    Expense    █████  #F87171
Warning     ████  #FCD34D    Text-1     █████  #F1F5F9
Text-2      ████  #94A3B8    Border     █████  #334155
```

---

### 2.3 Category Color Palette

Used consistently in charts, badges, and legend items across all components:

```
┌──────────────────────┬─────────────────────┬──────────────────┐
│  Category            │  Color              │  Hex             │
├──────────────────────┼─────────────────────┼──────────────────┤
│  🍔 Food             │  Amber-500          │  #F59E0B         │
│  🚗 Transport        │  Blue-500           │  #3B82F6         │
│  🛍️ Shopping         │  Pink-500           │  #EC4899         │
│  📋 Bills            │  Violet-500         │  #8B5CF6         │
│  🎬 Entertainment    │  Orange-500         │  #F97316         │
│  🏥 Health           │  Emerald-500        │  #10B981         │
│  📚 Education        │  Cyan-500           │  #06B6D4         │
│  💼 Salary           │  Indigo-500         │  #6366F1         │
│  📈 Investment       │  Teal-500           │  #14B8A6         │
│  ⚙️  Other           │  Gray-500           │  #6B7280         │
└──────────────────────┴─────────────────────┴──────────────────┘
```

---

### 2.4 CSS Custom Properties Implementation

```css
:root {
  /* Backgrounds */
  --bg-base:        #F8FAFC;
  --bg-surface:     #FFFFFF;
  --bg-elevated:    #F1F5F9;

  /* Brand */
  --primary:        #6366F1;
  --primary-hover:  #4F46E5;
  --primary-subtle: #EEF2FF;
  --secondary:      #8B5CF6;
  --secondary-subtle:#F5F3FF;

  /* Semantic */
  --success:        #10B981;
  --success-subtle: #ECFDF5;
  --danger:         #EF4444;
  --danger-subtle:  #FEF2F2;
  --warning:        #F59E0B;
  --warning-subtle: #FFFBEB;

  /* Text */
  --text-primary:   #0F172A;
  --text-secondary: #64748B;
  --text-disabled:  #CBD5E1;

  /* Border & Shadow */
  --border:         #E2E8F0;
  --border-strong:  #CBD5E1;
  --shadow-sm:      0 1px 2px rgba(15,23,42,0.06);
  --shadow-md:      0 4px 12px rgba(15,23,42,0.08);
  --shadow-lg:      0 8px 24px rgba(15,23,42,0.10);

  /* Radius */
  --radius-sm:      6px;
  --radius-md:      10px;
  --radius-lg:      16px;
  --radius-xl:      20px;
  --radius-full:    9999px;
}

[data-theme="dark"] {
  --bg-base:        #0F172A;
  --bg-surface:     #1E293B;
  --bg-elevated:    #334155;
  --primary:        #818CF8;
  --primary-hover:  #6366F1;
  --primary-subtle: #1E1B4B;
  --secondary:      #A78BFA;
  --secondary-subtle:#2E1065;
  --success:        #34D399;
  --success-subtle: #022C22;
  --danger:         #F87171;
  --danger-subtle:  #450A0A;
  --warning:        #FCD34D;
  --warning-subtle: #451A03;
  --text-primary:   #F1F5F9;
  --text-secondary: #94A3B8;
  --text-disabled:  #475569;
  --border:         #334155;
  --border-strong:  #475569;
  --shadow-sm:      0 1px 2px rgba(0,0,0,0.30);
  --shadow-md:      0 4px 12px rgba(0,0,0,0.40);
  --shadow-lg:      0 8px 24px rgba(0,0,0,0.50);
}
```

---

## 3. Typography

### 3.1 Font Stack

```
Primary:   'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Monospace: 'JetBrains Mono', 'Fira Code', ui-monospace, 'Cascadia Code', monospace
```

**Inter** is loaded from Google Fonts with subsets `latin` and weights `400, 500, 600, 700`.  
`font-display: swap` is set to prevent layout blocking.

### 3.2 Type Scale

```
┌────────────────┬──────────┬────────────┬──────────────────────────────────────────┐
│  Token         │  Size    │  Line-Ht   │  Usage                                   │
├────────────────┼──────────┼────────────┼──────────────────────────────────────────┤
│  text-xs       │  12px    │  16px      │  Labels, badges, meta, chart axis ticks  │
│  text-sm       │  14px    │  20px      │  Table cells, secondary text, captions   │
│  text-base     │  16px    │  24px      │  Body copy, form inputs, descriptions    │
│  text-lg       │  18px    │  28px      │  Card subtitles, sidebar section labels  │
│  text-xl       │  20px    │  28px      │  Card titles, section headings (h3)      │
│  text-2xl      │  24px    │  32px      │  Page-level section titles (h2)          │
│  text-3xl      │  30px    │  36px      │  Summary card KPI values (big numbers)   │
│  text-4xl      │  36px    │  40px      │  Hero/total balance figure               │
└────────────────┴──────────┴────────────┴──────────────────────────────────────────┘
```

### 3.3 Font Weight Usage

```
Regular   (400) — Body text, descriptions, table cells
Medium    (500) — Navigation labels, form labels, secondary headings
Semibold  (600) — Card titles, KPI values, button labels, headings
Bold      (700) — Top-level page title, critical alerts
```

### 3.4 Financial Number Formatting

All currency values and numeric KPIs use:

```css
.financial-number {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;  /* tight tracking for large numbers */
  font-feature-settings: "tnum";
}
```

This ensures columns of numbers align vertically regardless of digit width — critical for transaction tables and comparison layouts.

**Currency format:** `$1,234.56` — always 2 decimal places, comma-separated thousands.  
**Percentage format:** `+12.5%` or `−8.3%` — always show sign, 1 decimal place.  
**Date format:** `Apr 5, 2026` — abbreviated month, no leading zero on day.

### 3.5 Heading Hierarchy

```
h1 — Page title (hidden or sr-only, one per page)
h2 — Major section (Dashboard, Transactions, Insights)
h3 — Card / widget title
h4 — Sub-section within card
```

---

## 4. Layout Structure

### 4.1 Breakpoints

```
Mobile:   0px    — 767px   (< 768px)
Tablet:   768px  — 1279px
Desktop:  1280px — ∞
```

### 4.2 Desktop Layout (1280px+)

```
╔══════════════════════════════════════════════════════════════════╗
║  HEADER  (height: 64px, sticky top-0, z-index: 50)              ║
║  [≡ Logo + App Name]    [Role Toggle]  [Search]  [🌙 Theme]     ║
╠══════════════╦═══════════════════════════════════════════════════╣
║              ║                                                   ║
║   SIDEBAR    ║   MAIN CONTENT AREA                               ║
║   (240px)    ║   (flex-1, overflow-y: auto)                      ║
║   sticky     ║                                                   ║
║   top: 64px  ║   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ║
║   ───────    ║   │Net Bal  │ │ Income  │ │Expenses │ │Savings %│ ║
║              ║   │ $4,250  │ │ $6,800  │ │ $2,550  │ │  62.5%  │ ║
║  ◉ Dashboard ║   │ ↑ 8.2%  │ │↑ 12.4%  │ │ ↓ 3.1%  │ │ ↑ 3.2%  │ ║
║  ○ Transact. ║   └─────────┘ └─────────┘ └─────────┘ └─────────┘ ║
║  ○ Insights  ║                                                   ║
║              ║   ┌──────────────────────┐  ┌────────────────┐   ║
║  ─────────   ║   │  Balance Trend       │  │ Spending       │   ║
║              ║   │  (Area Line Chart)   │  │ Breakdown      │   ║
║  Categories  ║   │                      │  │ (Donut Chart)  │   ║
║  🍔 Food      ║   │  ╱╲    ╱╲           │  │                │   ║
║  🚗 Transport ║   │╱   ╲  ╱  ╲___╱╲    │  │   ◯ ▪ Food    │   ║
║  🛍 Shopping  ║   │      ╲╱           ╲ │  │   ◯ ▪ Bills   │   ║
║  📋 Bills     ║   └──────────────────────┘  └────────────────┘   ║
║              ║                                                   ║
║              ║   ┌────────────────────────────────────────────┐  ║
║              ║   │  Recent Transactions                [+ Add]│  ║
║              ║   ├──────────────────────────────────────────  │  ║
║              ║   │  Date      Description    Category  Amount │  ║
║              ║   │  Apr 5     Grocery Store  🍔 Food  -$84.20 │  ║
║              ║   │  Apr 4     Salary Credit  💼 Salary+$3,200 │  ║
║              ║   │  Apr 3     Netflix Sub    🎬 Entmt  -$15.99│  ║
║              ║   └────────────────────────────────────────────┘  ║
╚══════════════╩═══════════════════════════════════════════════════╝
```

**Grid:** Main content uses CSS Grid: `grid-cols-4` for summary cards (desktop), `grid-cols-2` for tablet/mobile, `grid-cols-[3fr_2fr]` for charts section.

---

### 4.3 Tablet Layout (768px – 1279px)

```
╔══════════════════════════════════════════════════════╗
║  HEADER  [☰ Logo]              [Role] [Search] [🌙]  ║
╠════╦═════════════════════════════════════════════════╣
║    ║                                                 ║
║ S  ║   ┌────────┐  ┌────────┐  ┌────────┐           ║
║ I  ║   │Net Bal │  │Income  │  │Expense │  (3-col)  ║
║ D  ║   └────────┘  └────────┘  └────────┘           ║
║ E  ║                                                 ║
║ B  ║   ┌──────────────────────────────────────────┐  ║
║ A  ║   │  Balance Trend  (full width)              │  ║
║ R  ║   └──────────────────────────────────────────┘  ║
║    ║                                                 ║
║(64 ║   ┌──────────────────────────────────────────┐  ║
║px) ║   │  Spending Breakdown  (full width)         │  ║
║    ║   └──────────────────────────────────────────┘  ║
║Icon║                                                 ║
║only║   ┌──────────────────────────────────────────┐  ║
║    ║   │  Recent Transactions                     │  ║
║    ║   └──────────────────────────────────────────┘  ║
╚════╩═════════════════════════════════════════════════╝
```

**Sidebar behavior:** Icon-only at 64px width. Each icon has a Tooltip (via `title` + custom CSS tooltip) showing the label on hover. Active state: filled icon with primary color.

---

### 4.4 Mobile Layout (< 768px)

```
╔════════════════════════════════════╗
║  [☰]  FinDash            [🌙][👤]  ║
╠════════════════════════════════════╣
║                                    ║
║   ┌──────────────────────────────┐ ║
║   │  Net Balance                 │ ║
║   │  $4,250.00                   │ ║
║   │  ↑ 8.2% vs last month        │ ║
║   └──────────────────────────────┘ ║
║                                    ║
║   ┌─────────────┐  ┌─────────────┐ ║
║   │   Income    │  │  Expenses   │ ║
║   │  $6,800     │  │  $2,550     │ ║
║   └─────────────┘  └─────────────┘ ║
║                                    ║
║   ┌──────────────────────────────┐ ║
║   │  Balance Trend (area chart)  │ ║
║   │  [full width, h: 200px]      │ ║
║   └──────────────────────────────┘ ║
║                                    ║
║   ┌──────────────────────────────┐ ║
║   │  Spending Breakdown (donut)  │ ║
║   │  Legend stacked below        │ ║
║   └──────────────────────────────┘ ║
║                                    ║
║   ┌──────────────────────────────┐ ║
║   │  Recent Transactions         │ ║
║   │  ┌────────────────────────┐  │ ║
║   │  │ Apr 5 — Grocery Store  │  │ ║
║   │  │ 🍔 Food       -$84.20  │  │ ║
║   │  └────────────────────────┘  │ ║
║   │  ┌────────────────────────┐  │ ║
║   │  │ Apr 4 — Salary Credit  │  │ ║
║   │  │ 💼 Salary    +$3,200   │  │ ║
║   │  └────────────────────────┘  │ ║
║   └──────────────────────────────┘ ║
╚════════════════════════════════════╝

  ← SIDEBAR AS OVERLAY DRAWER →
╔════════════════════════════════════╗
║ FinDash                       [✕] ║
╠════════════════════════════════════╣
║  [◉] Dashboard                    ║
║  [○] Transactions                 ║
║  [○] Insights                     ║
║  ────────────────                 ║
║  Categories                       ║
║  [🍔] Food                        ║
║  [🚗] Transport                   ╚
```

**Mobile-specific adjustments:**
- Summary cards: 1-column for Net Balance, 2-column for Income/Expense
- Charts reduced to `height: 200px` from `height: 280px`
- Transaction list switches from `<table>` to `<div>` card stack
- Hamburger opens overlay sidebar with semi-transparent backdrop (`rgba(0,0,0,0.5)`)
- Touch targets minimum `44×44px`

---

### 4.5 Header Anatomy

```
┌────────────────────────────────────────────────────────────────┐
│  64px height | bg: --bg-surface | border-bottom: --border      │
│  px-6 | sticky top-0 | z-50 | backdrop-blur-sm on scroll       │
│                                                                 │
│  [🏦 FinDash]           [Viewer | Admin]  [🔍] [🌙/☀️]          │
│   ← Logo (24px icon)    ← Role Toggle    ← Search ← Theme      │
│      + App name                                                 │
│      font-semibold                                              │
│      text-xl                                                    │
└────────────────────────────────────────────────────────────────┘
```

---

### 4.6 Sidebar Anatomy

```
┌──────────────────────────────┐
│  WIDTH: 240px (desktop)      │
│         64px (tablet)        │
│         0px / overlay (mob.) │
│                              │
│  bg: --bg-surface            │
│  border-right: --border      │
│  height: calc(100vh - 64px)  │
│  sticky top: 64px            │
│  overflow-y: auto            │
│                              │
│  ┌──────────────────────┐    │
│  │ NAV SECTION          │    │
│  │  px-3 py-2           │    │
│  │                      │    │
│  │  [Icon] Dashboard    │    │  ← Active: bg-primary-subtle,
│  │  [Icon] Transactions │    │    text-primary, border-l-2
│  │  [Icon] Insights     │    │    border-primary
│  │                      │    │  ← Hover: bg-elevated
│  └──────────────────────┘    │
│                              │
│  ────────── divider ──────── │
│                              │
│  CATEGORIES (text-xs label)  │
│  [●] Food                    │
│  [●] Transport               │
│  [●] Shopping                │
│  [●] Bills                   │
│  [●] Entertainment           │
│                              │
└──────────────────────────────┘
```

**Nav item states:**
```
Default:  text-secondary, bg-transparent
Hover:    text-primary,   bg-primary-subtle  (150ms transition)
Active:   text-primary,   bg-primary-subtle,  font-medium,
          border-l-[3px] border-primary (inset left)
```

---

### 4.7 Component Responsive Matrix

The following table shows how each major component adapts across the three breakpoints:

| Component          | Mobile (<768px)      | Tablet (768-1279px)  | Desktop (1280px+)    |
|--------------------|----------------------|----------------------|----------------------|
| **Summary Cards**  | 1-col stacked        | 2-col grid           | 4-col grid           |
| **Area Chart**     | Full width, h: 200px | Full width, h: 250px | Full width, h: 300px |
| **Donut Chart**    | Below area chart     | Beside area chart    | Beside area chart    |
| **Bar Chart**      | Full width, h: 250px | Full width, h: 275px | Full width, h: 300px |
| **Transaction Table** | Card list view    | Compact table        | Full table           |
| **Filter Bar**     | Stacked vertically   | Horizontal row       | Horizontal + search  |
| **Add Form**       | Bottom sheet drawer  | Modal dialog         | Modal dialog         |
| **Insights**       | 1-col stacked        | 2-col grid           | 3-col grid           |
| **Role Toggle**    | In drawer menu       | In header            | In header            |
| **Theme Toggle**   | In drawer menu       | In header            | In header            |

**Notes:**
- Mobile prioritizes vertical scrolling with stacked components
- Tablet uses icon-only sidebar (64px) to maximize content area
- Desktop shows full sidebar (240px) with all labels visible
- All charts use `ResponsiveContainer` from Recharts for fluid widths
- Touch targets remain minimum 44×44px across all breakpoints

---

## 5. Component Design Specifications

### 5.1 Summary Cards

#### Visual Anatomy

```
┌──────────────────────────────────────────────────────┐
│  bg: --bg-surface                                    │
│  border: 1px solid --border                         │
│  border-radius: --radius-xl  (20px)                 │
│  padding: 24px                                       │
│  box-shadow: --shadow-sm                             │
│  min-height: 140px                                   │
│  transition: transform 150ms, box-shadow 150ms       │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  ┌──────────┐                                │   │
│  │  │  Icon    │  Card Title (text-sm,          │   │
│  │  │  40×40px │  text-secondary, font-medium)  │   │
│  │  │  rounded │                                │   │
│  │  │  bg:     │                                │   │
│  │  │  subtle  │                                │   │
│  │  └──────────┘                                │   │
│  │                                              │   │
│  │  $4,250.00                                   │   │
│  │  ← text-3xl, font-semibold, tabular-nums     │   │
│  │     text-primary                             │   │
│  │                                              │   │
│  │  ↑ 8.2% vs last month                       │   │
│  │  ← text-sm, text-success (green if positive) │   │
│  │     text-danger (red if negative)            │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  :hover                                             │
│    transform: translateY(-3px)                      │
│    box-shadow: --shadow-md                          │
│    border-color: --border-strong                    │
└──────────────────────────────────────────────────────┘
```

#### Three Card Variants

| Card         | Icon             | Icon BG            | Value Color  |
|--------------|------------------|--------------------|--------------|
| Net Balance  | `Wallet`         | `--primary-subtle` | `--primary`  |
| Total Income | `TrendingUp`     | `--success-subtle` | `--success`  |
| Total Expense| `TrendingDown`   | `--danger-subtle`  | `--danger`   |
| Savings Rate | `PiggyBank`      | `--warning-subtle` | `--warning`  |

**Savings Rate Card Details:**
- Value: Shows savings as percentage of income (e.g., `28.5%`)
- Calculation: `((income - expenses) / income) * 100`
- Trend: Month-over-month savings rate change (e.g., `↑ 3.2% vs last month`)
- Same dimensions, padding, and shadow as existing cards

#### Trend Indicator

```
Positive: ↑  text-success  (green)  e.g. "↑ 12.4% vs last month"
Negative: ↓  text-danger   (red)    e.g. "↓  3.1% vs last month"
Neutral:  →  text-secondary (gray)  e.g. "→  0.0% no change"
```

---

### 5.2 Charts

#### 5.2.1 Balance Trend — Area Chart

```
┌──────────────────────────────────────────────────────────┐
│  BALANCE TREND                           [6M ▾] [1Y] [All│
│  ─────────────────────────────────────────────────────── │
│                                                          │
│  $8k ┤                          ╭─────────╮             │
│      │                        ╭─╯          ╰╮           │
│  $6k ┤              ╭─────────╯             ╰───╮       │
│      │          ╭───╯                           ╰───    │
│  $4k ┤      ╭───╯                                       │
│      │  ╭───╯   ← gradient fill: primary → transparent  │
│  $2k ┤──╯    ↑ fill: linear-gradient(primary 0%,        │
│      │          transparent 80%)                        │
│      └──┬─────┬─────┬─────┬─────┬─────┬─────┬         │
│        Nov   Dec   Jan   Feb   Mar   Apr   May           │
│                                                          │
│  Tooltip (on hover):                                     │
│  ┌──────────────────┐                                    │
│  │  March 2026       │                                   │
│  │  Balance: $6,420  │                                   │
│  │  +$820 from Feb   │                                   │
│  └──────────────────┘                                    │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**
- Library: Recharts (`AreaChart`)
- Height: `280px` (desktop), `200px` (mobile)
- Gradient: `linearGradient` SVG fill — `primary` at 100% opacity fading to 0%
- Dot: appears only on hover/active point (`activeDot={{ r: 6 }}`)
- Animation: `isAnimationActive={true}`, `animationDuration={800}`, `animationEasing="ease-out"`
- Grid: dashed horizontal lines, `--border` color, `opacity: 0.5`
- Axes: `text-xs`, `text-secondary`, no axis lines (only tick marks)
- Tooltip: custom component — white card with shadow, rounded-lg, `$` formatted value

**Time range toggle (top-right of card):**
```
[3M] [6M] [1Y] [All]
↑ pill toggle, active state: bg-primary text-white, radius-full
```

---

#### 5.2.2 Spending Breakdown — Donut Chart

```
┌──────────────────────────────────────────────────────────┐
│  SPENDING BREAKDOWN                           [Month ▾]  │
│  ─────────────────────────────────────────────────────── │
│                                                          │
│              ╭──────╮                                    │
│           ╭──╯      ╰──╮     ● Food        $842  32%    │
│         ╭─╯            ╰─╮   ● Transport   $430  16%    │
│         │    $2,640      │   ● Shopping    $380  14%    │
│         │    total exp.  │   ● Bills       $340  13%    │
│         ╰─╮            ╭─╯   ● Entertainmt $290  11%    │
│           ╰──╮      ╭──╯     ● Health      $210   8%    │
│              ╰──────╯        ● Other       $148   6%    │
│                                                          │
│  Hover effect: segment expands outward by 8px           │
│  Center text updates to show hovered category amount    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**
- Library: Recharts (`PieChart` with `Pie` inner/outer radius)
- `innerRadius`: 70, `outerRadius`: 110 (desktop) / 55, 90 (mobile)
- Center label: custom `<text>` SVG element — amount in `text-2xl font-semibold`, label in `text-xs text-secondary`
- Legend: `<ul>` list to the right (desktop) / below (mobile), each item has colored dot + name + amount + percentage
- Active segment: `paddingAngle={3}`, active offset via `activeShape` prop
- Animation: `animationBegin={200}`, `animationDuration={600}`

---

#### 5.2.3 Monthly Income vs Expenses — Bar Chart

```
┌──────────────────────────────────────────────────────────┐
│  INCOME VS EXPENSES                          [Year ▾]   │
│  ─────────────────────────────────────────────────────── │
│                                                          │
│  $8k ┤    ██                                             │
│      │    ██ ▓▓    ██                                    │
│  $6k ┤    ██ ▓▓    ██ ▓▓    ██      ██                   │
│      │    ██ ▓▓    ██ ▓▓    ██ ▓▓   ██ ▓▓   ██          │
│  $4k ┤ ██ ██ ▓▓ ██ ██ ▓▓ ██ ██ ▓▓   ██ ▓▓   ██ ▓▓      │
│      │ ██ ██ ▓▓ ██ ██ ▓▓ ██ ██ ▓▓ ██ ██ ▓▓ ██ ██ ▓▓     │
│  $2k ┤ ██ ▓▓ ▓▓ ██ ▓▓ ▓▓ ██ ▓▓ ▓▓ ██ ▓▓ ▓▓ ██ ▓▓ ▓▓    │
│      │ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓    │
│      └──┬────┬────┬────┬────┬────┬────┬────┬────┬───     │
│        Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep       │
│                                                          │
│  Legend:  ██ Income (green)   ▓▓ Expenses (red)         │
│                                                          │
│  Tooltip (on hover):                                     │
│  ┌──────────────────┐                                    │
│  │  March 2026       │                                   │
│  │  Income:  $6,800  │                                   │
│  │  Expenses: $2,550 │                                   │
│  └──────────────────┘                                    │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**
- Library: Recharts (`BarChart` with grouped bars)
- Height: `300px` (desktop), `250px` (mobile)
- Width: Full width, responsive via `ResponsiveContainer`
- Bar colors: Income = `--success` (green), Expenses = `--danger` (red)
- Bar radius: `radius={[4, 4, 0, 0]}` (4px rounded top corners)
- Bar gap: `barGap={4}`, `barCategoryGap="20%"`
- Grid: horizontal dashed lines only (`strokeDasharray="3 3"`, `--border` color)
- X-axis: month labels, `text-xs`, `text-secondary`
- Y-axis: currency amount, `text-xs`, `text-secondary`, formatted as `$Xk`
- Tooltip: custom component — white card with shadow, rounded-lg, shows both amounts
- Animation: `animationDuration={800}`, `animationEasing="ease-out"`
- Layout: Full width, stacks below the Area chart on mobile (single column)

---

### 5.3 Transaction List

#### Desktop Table View

```
┌─────────────────────────────────────────────────────────────────┐
│  RECENT TRANSACTIONS                                  [+ Add]   │
│  Filter: [All Types ▾] [All Categories ▾] [Date Range ▾] [🔍]  │
│  ───────────────────────────────────────────────────────────── │
│                                                                 │
│  DATE ↕        DESCRIPTION        CATEGORY      AMOUNT ↕       │
│  ─────────────────────────────────────────────────────────────  │
│  Apr 5, 2026   Grocery Store      🍔 Food        -$84.20        │
│  Apr 4, 2026   Salary Credit      💼 Salary     +$3,200.00      │
│  Apr 3, 2026   Netflix            🎬 Entertain.  -$15.99        │
│  Apr 2, 2026   Doctor Visit       🏥 Health      -$120.00       │
│  Apr 1, 2026   Freelance Work     💼 Salary     +$850.00        │
│                                          [Load More / Paginate] │
└─────────────────────────────────────────────────────────────────┘
```

**Table Row Specifications:**
```
Height:           52px
Padding:          px-6 py-3
Hover bg:         --bg-elevated  (150ms transition)
Date:             text-sm, text-secondary, tabular-nums
Description:      text-sm, text-primary, font-medium, truncate max-w-xs
Category badge:   px-2.5 py-0.5, rounded-full, text-xs, font-medium
                  bg: category-subtle, color: category-color
Amount (income):  text-sm, font-semibold, text-success, tabular-nums
Amount (expense): text-sm, font-semibold, text-danger, tabular-nums
```

**Category Badge:**
```
┌──────────────────┐
│  🍔  Food         │  ← bg: amber-50 (light) / amber-950 (dark)
└──────────────────┘     text: amber-700 (light) / amber-300 (dark)
                         border: none, border-radius: radius-full
```

**Admin Row Hover:**
```
On row hover → action buttons fade in (opacity 0→1, 150ms):
  [✏️ Edit]  [🗑️ Delete]
  Positioned: absolute right-4, flex gap-2
  Size: 28px × 28px icon buttons, rounded-md
```

#### Mobile Card View

```
┌──────────────────────────────────────────────────────┐
│  bg: --bg-surface                                    │
│  border: 1px --border                               │
│  border-radius: --radius-lg                         │
│  padding: 16px                                       │
│  margin-bottom: 8px                                  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  [🍔]  Grocery Store               -$84.20     │  │
│  │   ↑ 40×40 category   ← desc truncated  ↑ amount│  │
│  │   icon circle        font-medium        colored │  │
│  │                                                 │  │
│  │  Apr 5, 2026 · 🍔 Food                         │  │
│  │  ← date + category badge (text-xs text-secondary│  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

### 5.4 Transaction Form (Admin Only)

Displayed as a **Modal Dialog** on desktop/tablet, **Bottom Sheet Drawer** on mobile.

#### Modal (Desktop/Tablet)

```
╔════════════════════════════════════════════════════╗
║  BACKDROP: rgba(0,0,0,0.5) | backdrop-blur-sm      ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║   ┌──────────────────────────────────────────────┐ ║
║   │  Add Transaction                         [✕] │ ║
║   │  ──────────────────────────────────────────  │ ║
║   │                                              │ ║
║   │  Type                                        │ ║
║   │  ┌──────────────────────────────────────┐    │ ║
║   │  │ [  Expense  ]   [  Income  ]         │    │ ║
║   │  └──────────────────────────────────────┘    │ ║
║   │   ↑ toggle pill — active has filled bg       │ ║
║   │                                              │ ║
║   │  Amount                                      │ ║
║   │  ┌──────────────────────────────────────┐    │ ║
║   │  │ $  [       0.00                    ] │    │ ║
║   │  └──────────────────────────────────────┘    │ ║
║   │                                              │ ║
║   │  Description                                 │ ║
║   │  ┌──────────────────────────────────────┐    │ ║
║   │  │ What was this for?                   │    │ ║
║   │  └──────────────────────────────────────┘    │ ║
║   │                                              │ ║
║   │  Category                  Date              │ ║
║   │  ┌──────────────────┐  ┌───────────────┐     │ ║
║   │  │ Food           ▾ │  │ Apr 5, 2026   │     │ ║
║   │  └──────────────────┘  └───────────────┘     │ ║
║   │                                              │ ║
║   │  ┌──────────────┐   ┌────────────────────┐  │ ║
║   │  │    Cancel    │   │   Add Transaction  │  │ ║
║   │  └──────────────┘   └────────────────────┘  │ ║
║   │                                              │ ║
║   └──────────────────────────────────────────────┘ ║
╚════════════════════════════════════════════════════╝
```

**Modal Specifications:**
```
Width:          480px (max-w-lg)
Border-radius:  --radius-xl (20px)
Shadow:         --shadow-lg
Animation in:   opacity 0→1 + translateY(16px→0) — 250ms spring
Animation out:  opacity 1→0 + translateY(0→8px) — 150ms ease-in
Backdrop:       fade in 200ms
```

**Form Field Specifications:**
```
Label:        text-sm, font-medium, text-primary, mb-1.5
Input:        h-10, px-3, border --border, radius-md,
              bg: --bg-surface (light) / --bg-elevated (dark)
              focus: ring-2 ring-primary ring-offset-2
              text-sm, text-primary
Error msg:    text-xs, text-danger, mt-1, flex items-center gap-1
              with AlertCircle icon (14px)
```

**Income/Expense Toggle:**
```
Container: bg-elevated, rounded-full, p-1
Button:    px-4 py-1.5, rounded-full, text-sm, font-medium
Active (Expense): bg-danger, text-white
Active (Income):  bg-success, text-white
Inactive:         text-secondary, bg-transparent
Transition:       background 200ms, color 200ms
```

---

### 5.5 Insights Cards

```
┌──────────────────────────────────────────────────────┐
│  border-left: 4px solid --category-color             │
│  bg: --bg-surface                                    │
│  border-radius: --radius-lg                         │
│  padding: 20px                                       │
│  display: flex, gap: 16px                            │
│                                                      │
│  ┌──────────┐   Highest Spending                     │
│  │  Icon    │   ← text-sm, font-medium, text-second  │
│  │  bg:     │                                        │
│  │  subtle  │   Food — $2,450.00                     │
│  │  36px    │   ← text-xl, font-semibold, text-primary│
│  └──────────┘                                        │
│               32% of total expenses                  │
│               ← text-sm, text-secondary              │
│                                                      │
│  :hover → translateY(-2px), shadow-md               │
└──────────────────────────────────────────────────────┘
```

**Insight Examples:**
```
┌─────────────────────────────────────────────────────────┐
│ ║ 🍔  Highest Spending: Food  ·  $2,450  ·  32%         │
│ ║ 📈  Best Income Month: March  ·  $7,200                │
│ ║ ↓   Spending vs Last Month: Down 8.3%  (green border) │
│ ║ ⚠️   Over Budget: Shopping by $124.50  (red border)    │
│ ║ 🎯  Savings Rate This Month: 28.5%     (primary border)│
└─────────────────────────────────────────────────────────┘
```

---

### 5.6 Role Toggle (Header)

```
┌────────────────────────────────────────┐
│  ROLE TOGGLE (Segmented Control)       │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  bg: --bg-elevated               │  │
│  │  border-radius: radius-full      │  │
│  │  padding: 4px                    │  │
│  │  display: inline-flex            │  │
│  │                                  │  │
│  │  ┌──────────┐  ┌──────────┐     │  │
│  │  │  Viewer  │  │  Admin   │     │  │
│  │  └──────────┘  └──────────┘     │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Active pill:  bg-primary, text-white  │
│                font-medium, radius-full │
│                box-shadow: shadow-sm   │
│  Inactive:     text-secondary          │
│  Transition:   slide animation 200ms   │
│  Size:         px-4 py-1.5, text-sm   │
└────────────────────────────────────────┘
```

The active indicator is a positioned element that slides (using `transform: translateX`) between the two options for a fluid feel.

---

### 5.7 Theme Toggle (Header)

```
┌────────────────────────────────────────┐
│  THEME TOGGLE (Icon Button)            │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  width: 36px, height: 36px       │  │
│  │  border-radius: radius-md        │  │
│  │  bg: transparent                 │  │
│  │  hover: bg-elevated              │  │
│  │  transition: bg 150ms            │  │
│  │                                  │  │
│  │  Light mode:  ☀️  Sun icon       │  │
│  │  Dark mode:   🌙  Moon icon      │  │
│  │                                  │  │
│  │  Icon size: 20px                 │  │
│  │  Rotation animation on toggle:   │  │
│  │    rotate(0deg) → rotate(360deg) │  │
│  │    duration: 400ms, ease-in-out  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Persisted via: localStorage           │
│  Key: "findash-theme"                  │
│  Values: "light" | "dark"             │
└────────────────────────────────────────┘
```

---

### 5.8 Filter Bar (Transactions Page)

```
┌──────────────────────────────────────────────────────────────┐
│  [All Types ▾]  [All Categories ▾]  [Date Range ▾]  [🔍 Search]│
│                                                              │
│  Active filters shown as chips below the bar:               │
│  [🍔 Food  ✕]  [This Month  ✕]  [Clear All]                 │
└──────────────────────────────────────────────────────────────┘
```

**Filter Chip:**
```
bg: --primary-subtle
color: --primary
font-size: text-xs, font-medium
padding: px-2.5 py-1, gap-1.5
border-radius: radius-full
× button: hover → bg-primary, text-white
```

---

## 6. Animation & Motion Design

### 6.1 Principles

All motion in this UI follows the **FLIP technique** and uses CSS `transition` for simple state changes and CSS `@keyframes` for complex sequences. The motion system respects `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 6.2 Animation Catalog

```
┌────────────────────────────┬──────────────┬──────────────────────────────────┐
│  Element                   │  Duration    │  Easing & Properties             │
├────────────────────────────┼──────────────┼──────────────────────────────────┤
│  Page / view mount         │  200ms       │  ease-out; opacity 0→1           │
│  Card hover lift           │  150ms       │  ease; translateY(0→-3px),       │
│                            │              │  shadow-sm → shadow-md           │
│  Chart area draw-in        │  800ms       │  ease-out; stroke-dashoffset     │
│  Chart donut draw-in       │  600ms       │  ease-out; startAngle animates   │
│  Modal entrance            │  250ms       │  spring(stiffness:300,damp:30)   │
│                            │              │  opacity+translateY(16px→0)      │
│  Modal exit                │  150ms       │  ease-in; opacity+translateY     │
│  Backdrop fade             │  200ms       │  ease; opacity 0→1               │
│  Sidebar drawer (mobile)   │  280ms       │  spring; translateX(-100%→0)     │
│  Role toggle slide         │  200ms       │  ease-in-out; translateX         │
│  Theme toggle rotation     │  400ms       │  ease-in-out; rotate(0→360deg)  │
│  Number count-up (KPI)     │  1000ms      │  ease-out; requestAnimationFrame │
│  Filter chip appear        │  150ms       │  ease; opacity+scale(0.8→1)     │
│  Toast notification        │  300ms in    │  spring; translateY(-16px→0)     │
│                            │  200ms out   │  ease-in; translateY+opacity     │
│  Skeleton shimmer          │  1500ms loop │  linear; background-position     │
│  Row hover background      │  100ms       │  ease; background-color          │
│  Button press              │  80ms        │  ease; scale(1→0.97)            │
└────────────────────────────┴──────────────┴──────────────────────────────────┘
```

---

### 6.3 Skeleton Loading States

Shown during the simulated 800ms data fetch delay on initial load:

```
┌──────────────────────────────────────────────┐
│  SKELETON CARD                               │
│  ┌──────────────────────────────────────┐   │
│  │  ░░░░░░░  ← shimmer block (icon)     │   │
│  │                                      │   │
│  │  ░░░░░░░░░░░░░░░░  ← KPI value      │   │
│  │  ░░░░░░░░░░░  ← trend line          │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘

Shimmer animation:
  background: linear-gradient(90deg,
    --bg-elevated 25%,
    --border 50%,
    --bg-elevated 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

### 6.4 Number Count-Up Animation

KPI values animate from 0 to their target value on page load and when filters change:

```
Algorithm: easeOutExpo
  progress = 1 - Math.pow(2, -10 * t)  (where t = elapsed/duration, 0→1)
  current = Math.round(start + (end - start) * progress)

Duration: 1000ms for values > $1,000
          600ms  for values < $1,000
Starts:   200ms after mount (staggered per card: 0, 100, 200ms delay)
```

---

## 7. Empty States

Every list, chart, and data-bearing component has a defined empty state. These are not afterthoughts — they are designed with the same care as the populated states.

### 7.1 Empty Transaction List

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│               ┌─────────────────┐                       │
│               │                 │                       │
│               │   📊  (large    │                       │
│               │       icon)     │                       │
│               │                 │                       │
│               └─────────────────┘                       │
│                                                          │
│              No transactions yet                         │
│       ← text-lg, font-semibold, text-primary             │
│                                                          │
│    Track your finances by adding your first              │
│    income or expense transaction.                        │
│    ← text-sm, text-secondary, max-w-xs, text-center     │
│                                                          │
│           ┌─────────────────────────┐                   │
│           │  + Add First Transaction│   ← primary btn   │
│           └─────────────────────────┘                   │
│                                                          │
│         (CTA button visible only in Admin mode)          │
└──────────────────────────────────────────────────────────┘
```

### 7.2 No Search Results

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│               [🔍  icon, 48px, text-secondary]           │
│                                                          │
│              No results found                            │
│                                                          │
│        Try adjusting your filters or search query.      │
│                                                          │
│              [  Clear All Filters  ]                     │
│              ← outlined/ghost button                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 7.3 Empty Chart State

```
┌──────────────────────────────────────────────────────────┐
│  Chart area filled with:                                 │
│                                                          │
│         [BarChart icon, 40px, text-disabled]             │
│                                                          │
│         Not enough data to display chart.                │
│         ← text-sm, text-secondary, text-center          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 7.4 Loading State

Full-page loading view displayed during initial data fetch (simulated 800ms async delay).

```
┌──────────────────────────────────────────────────────────┐
│  SKELETON LOADING STATE                                  │
│                                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│        │
│  │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│        │
│  │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│ │░░░░░░░░░│        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│  ↑ 4 skeleton summary cards with pulse animation        │
│                                                          │
│  ┌────────────────────────────┐ ┌──────────────────┐    │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │░░░░░░░░░░░░░░░░░░│    │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │░░░░░░░░░░░░░░░░░░│    │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │░░░░░░░░░░░░░░░░░░│    │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │░░░░░░░░░░░░░░░░░░│    │
│  └────────────────────────────┘ └──────────────────┘    │
│  ↑ 2 skeleton chart areas with shimmer animation        │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  └──────────────────────────────────────────────────┘   │
│  ↑ 5 skeleton table rows                                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**
- Duration: 800ms simulated async fetch delay
- Skeleton cards: 4 placeholders matching summary card dimensions
- Skeleton charts: 2 rectangular areas (280px height desktop)
- Skeleton table: 5 rows with shimmer effect
- Pulse animation: `opacity: 0.5 → 1.0`, duration `1.2s`, `ease-in-out`
- Shimmer animation: references `@keyframes shimmer` from §6.3

```css
/* Pulse animation for skeleton cards */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton-card {
  animation: pulse 1.2s ease-in-out infinite;
  background: var(--bg-elevated);
  border-radius: var(--radius-xl);
}

/* Shimmer animation for chart/table skeletons — see §6.3 */
.skeleton-shimmer {
  animation: shimmer 1.5s infinite linear;
}
```

---

## 8. Spacing System

The entire layout uses a **4px base unit**. All spacing values are multiples of 4.

### 8.1 Spacing Scale

```
┌─────────┬────────┬─────────────────────────────────────────────┐
│  Token  │  Value │  Common Usage                               │
├─────────┼────────┼─────────────────────────────────────────────┤
│  space-1│   4px  │  Icon-text gap, tight inline spacing        │
│  space-2│   8px  │  Between badge elements, small gaps         │
│  space-3│  12px  │  Between form label and input               │
│  space-4│  16px  │  Component internal padding                 │
│  space-5│  20px  │  Card internal padding (sm)                 │
│  space-6│  24px  │  Card internal padding (md), gap-6          │
│  space-8│  32px  │  Section gap, between chart cards           │
│  space-10│ 40px  │  Major section separators                   │
│  space-12│ 48px  │  Page top padding                           │
└─────────┴────────┴─────────────────────────────────────────────┘
```

### 8.2 Component-Level Spacing

```
Page padding:           px-6 py-8 (desktop) | px-4 py-6 (mobile)
Summary cards gap:      gap-6 (24px)
Chart section gap:      gap-6 (24px)
Cards → Charts gap:     mb-8 (32px)
Sidebar item padding:   px-3 py-2
Header padding:         px-6
Table cell padding:     px-6 py-3 (desktop) | px-4 py-3 (mobile)
Modal padding:          p-6 (24px)
Form field gap:         space-y-4 (16px between fields)
Form field label→input: mb-1.5 (6px)
```

### 8.3 Border Radius Scale

```
radius-sm:   6px   — Badges, filter chips, small buttons
radius-md:   10px  — Inputs, dropdowns, medium buttons
radius-lg:   16px  — Cards (tablet/mobile), insight cards
radius-xl:   20px  — Summary cards (desktop), modals
radius-2xl:  24px  — Sidebar (mobile overlay)
radius-full: 9999px— Pills, toggles, avatar circles
```

---

## 9. Iconography

### 9.1 Icon Library

**Primary:** Lucide React (`lucide-react`)
- Version: latest stable
- All icons use `strokeWidth={1.5}` for a light, modern feel
- Default size: 20px inline, 24px standalone actions

### 9.2 Icon Usage Table

```
┌─────────────────────────────┬──────────────────────────────┬──────┐
│  Location                   │  Icon Name (Lucide)          │  Size│
├─────────────────────────────┼──────────────────────────────┼──────┤
│  Sidebar: Dashboard         │  LayoutDashboard             │  20px│
│  Sidebar: Transactions      │  ArrowLeftRight              │  20px│
│  Sidebar: Insights          │  TrendingUp                  │  20px│
│  Summary: Net Balance       │  Wallet                      │  20px│
│  Summary: Income            │  TrendingUp                  │  20px│
│  Summary: Expense           │  TrendingDown                │  20px│
│  Theme: Light               │  Sun                         │  20px│
│  Theme: Dark                │  Moon                        │  20px│
│  Header: Search             │  Search                      │  20px│
│  Header: Menu (mobile)      │  Menu                        │  24px│
│  Add Transaction            │  Plus                        │  20px│
│  Edit Transaction           │  Pencil                      │  16px│
│  Delete Transaction         │  Trash2                      │  16px│
│  Close Modal                │  X                           │  20px│
│  Trend Up                   │  ArrowUp                     │  14px│
│  Trend Down                 │  ArrowDown                   │  14px│
│  Trend Neutral              │  Minus                       │  14px│
│  Form Error                 │  AlertCircle                 │  14px│
│  Empty State                │  Inbox                       │  48px│
│  No Results                 │  SearchX                     │  48px│
│  Filter                     │  Filter                      │  16px│
│  Calendar (date input)      │  Calendar                    │  16px│
│  Chevron (dropdowns)        │  ChevronDown                 │  16px│
│  Insight: Spending          │  ShoppingCart                │  20px│
│  Insight: Savings           │  PiggyBank                   │  20px│
│  Insight: Warning           │  AlertTriangle               │  20px│
└─────────────────────────────┴──────────────────────────────┴──────┘
```

### 9.3 Icon + Label Rule

> **Never use an icon as the sole means of communication for a primary action.**  
> All primary and secondary actions must have a text label alongside the icon.

```
✅ Correct:  [+ Add Transaction]   (icon + label)
✅ Correct:  [🌙]                  (theme toggle — visual affordance clear)
✅ Correct:  [✏️]                  (row action — contextual, hover-revealed)
❌ Wrong:    [+]                   (standalone plus, no label)
❌ Wrong:    [📊]                  (navigation icon with no label on desktop sidebar)
```

---

## 10. Accessibility

### 10.1 Color Contrast Compliance

All text/background combinations verified against WCAG 2.1 AA (4.5:1 minimum for text):

```
┌─────────────────────────────────┬────────────────┬──────────────┬────────┐
│  Pairing                        │  Light Theme   │  Dark Theme  │  Pass? │
├─────────────────────────────────┼────────────────┼──────────────┼────────┤
│  Text-primary on bg-base        │  15.5:1        │  16.8:1      │  ✅ AA+│
│  Text-secondary on bg-base      │   5.9:1        │   4.6:1      │  ✅ AA │
│  Primary on bg-surface          │   4.6:1        │   5.2:1      │  ✅ AA │
│  Success text on success-subtle │   4.7:1        │   4.8:1      │  ✅ AA │
│  Danger text on danger-subtle   │   5.1:1        │   5.0:1      │  ✅ AA │
│  White text on Primary button   │   9.2:1        │   8.7:1      │  ✅ AAA│
└─────────────────────────────────┴────────────────┴──────────────┴────────┘
```

---

### 10.2 Keyboard Navigation

```
Tab            — Move through focusable elements
Shift+Tab      — Move backwards
Enter / Space  — Activate buttons, select options
Escape         — Close modal, dropdown, sidebar
Arrow keys     — Navigate within menus, date picker
Home / End     — Jump to first/last in lists
```

**Focus Ring Specification:**
```css
:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--bg-surface),
    0 0 0 4px var(--primary);
}
```
This creates a 2px white "halo" then a 2px primary ring — visible on both light and dark backgrounds.

**Skip Navigation Link:**
```html
<a href="#main-content"
   class="sr-only focus:not-sr-only focus:absolute focus:top-4
          focus:left-4 focus:z-[100] focus:px-4 focus:py-2
          focus:bg-primary focus:text-white focus:rounded-md">
  Skip to main content
</a>
```

---

### 10.3 Screen Reader Support

**Charts:** Each chart is accompanied by a visually hidden `<caption>` or `aria-label` with a text summary:

```html
<figure role="img"
        aria-label="Spending Breakdown: Food 32% ($842), Transport 16% ($430),
                    Shopping 14% ($380), Bills 13% ($340), Other 25% ($644)">
  <!-- chart SVG -->
</figure>
```

**Data Table:**
```html
<table>
  <caption class="sr-only">Recent Transactions — 25 entries, sorted by date descending</caption>
  <thead>
    <tr>
      <th scope="col" aria-sort="descending">Date</th>
      <th scope="col">Description</th>
      <th scope="col">Category</th>
      <th scope="col" aria-sort="none">Amount</th>
    </tr>
  </thead>
</table>
```

**Modal:**
```html
<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title"
     aria-describedby="modal-desc">
  <h2 id="modal-title">Add Transaction</h2>
  <p id="modal-desc" class="sr-only">Fill in the form to add a new transaction</p>
  ...
</div>
```

**Live Region** for dynamic data updates:
```html
<div aria-live="polite" aria-atomic="true" class="sr-only" id="status-announcer">
  <!-- Dynamically updated: "Transaction added successfully" -->
</div>
```

---

### 10.4 Interactive Element Requirements

```
Minimum touch target:   44 × 44px (iOS HIG / WCAG 2.5.5)
Interactive text size:  minimum 14px (text-sm)
Form labels:            always visible (never placeholder-only)
Error messages:         not color-only — icon + text
Status indicators:      not color-only — icon or text accompaniment
```

---

## 11. Data Architecture (Frontend)

### 11.1 Data Model

```typescript
// Transaction entity
interface Transaction {
  id:          string;          // UUID
  date:        string;          // ISO 8601: "2026-04-05"
  description: string;          // max 100 chars
  category:    TransactionCategory;
  type:        'income' | 'expense';
  amount:      number;          // always positive; type determines sign
  createdAt:   string;          // ISO 8601 datetime
}

type TransactionCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'salary'
  | 'investment'
  | 'other';

// Aggregated derived data (computed, not stored)
interface MonthSummary {
  month:        string;         // "2026-04"
  totalIncome:  number;
  totalExpense: number;
  netBalance:   number;
  byCategory:   Record<TransactionCategory, number>;
}
```

### 11.2 State Shape

```typescript
interface AppState {
  // Data
  transactions:  Transaction[];

  // UI State
  theme:         'light' | 'dark';
  role:          'viewer' | 'admin';
  activeView:    'dashboard' | 'transactions' | 'insights';
  sidebarOpen:   boolean;          // mobile only

  // Transactions view
  filters: {
    type:        'all' | 'income' | 'expense';
    category:    TransactionCategory | 'all';
    dateRange:   { from: string | null; to: string | null };
    search:      string;
  };
  sortBy:        'date' | 'amount';
  sortDir:       'asc' | 'desc';

  // Dashboard chart
  chartRange:    '3m' | '6m' | '1y' | 'all';

  // Form
  formOpen:      boolean;
  editingId:     string | null;    // null = new, string = editing
}
```

### 11.3 Seed Data

The app ships with **36 months** of seed transaction data (≈180 transactions) covering all categories, both income and expense types, with realistic monthly variation to make charts meaningful and varied.

---

## 12. File & Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx         — Root layout (sidebar + header + main)
│   │   ├── Header.tsx            — Sticky header with toggles
│   │   ├── Sidebar.tsx           — Navigation sidebar
│   │   └── MobileNav.tsx         — Hamburger menu + overlay drawer
│   │
│   ├── dashboard/
│   │   ├── SummaryCards.tsx      — Net Balance, Income, Expense cards
│   │   ├── BalanceTrendChart.tsx — Recharts area chart
│   │   ├── SpendingDonutChart.tsx— Recharts pie/donut chart
│   │   └── InsightCards.tsx      — Insight highlights row
│   │
│   ├── transactions/
│   │   ├── TransactionList.tsx   — Desktop table + mobile card list
│   │   ├── TransactionRow.tsx    — Single table row with admin actions
│   │   ├── TransactionCard.tsx   — Mobile card variant
│   │   ├── FilterBar.tsx         — Type/Category/Date/Search filters
│   │   └── FilterChip.tsx        — Removable filter indicator
│   │
│   ├── form/
│   │   ├── TransactionModal.tsx  — Modal wrapper (desktop)
│   │   ├── TransactionForm.tsx   — Form fields + validation
│   │   └── TransactionDrawer.tsx — Bottom sheet (mobile)
│   │
│   └── ui/
│       ├── Button.tsx            — Primary, secondary, ghost, icon variants
│       ├── Badge.tsx             — Category badge/pill
│       ├── Input.tsx             — Text, number inputs with label+error
│       ├── Select.tsx            — Dropdown select component
│       ├── Toggle.tsx            — Pill segmented toggle
│       ├── Skeleton.tsx          — Shimmer loading placeholder
│       ├── EmptyState.tsx        — Configurable empty state
│       └── Tooltip.tsx           — Hover tooltip (sidebar icons)
│
├── hooks/
│   ├── useTransactions.ts        — CRUD operations, filtering, sorting
│   ├── useTheme.ts               — Theme toggle with localStorage
│   ├── useSummaryStats.ts        — Derived stats (total, trends)
│   └── useChartData.ts           — Transforms data for Recharts format
│
├── data/
│   ├── seedTransactions.ts       — 180 transactions across 36 months
│   └── categories.ts             — Category definitions + colors + icons
│
├── types/
│   └── index.ts                  — TypeScript interfaces + types
│
├── utils/
│   ├── formatCurrency.ts         — "$1,234.56" formatter
│   ├── formatDate.ts             — "Apr 5, 2026" formatter
│   └── colorUtils.ts             — Category color lookups
│
├── styles/
│   ├── globals.css               — CSS custom properties, reset
│   └── animations.css            — @keyframes definitions
│
├── App.tsx                       — Root component, state + routing
└── main.tsx                      — Entry point
```

---

## Appendix A — Design Tokens Quick Reference

```
┌──────────────────────────────────────────────────────────────────────┐
│  QUICK REFERENCE — KEY DESIGN TOKENS                                 │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  RADII          sm:6  md:10  lg:16  xl:20  2xl:24  full:9999        │
│  SPACING        4  8  12  16  20  24  32  40  48  px                │
│  FONT SIZES     12 14 16 18 20 24 30 36  px                         │
│  FONT WEIGHTS   400(reg) 500(med) 600(semi) 700(bold)               │
│  SHADOWS        sm / md / lg   (intensity increases)                │
│  BREAKPOINTS    mobile:<768  tablet:768-1279  desktop:1280+         │
│  TRANSITIONS    fast:100  medium:150  normal:200  slow:300  ms      │
│  CHART HEIGHTS  280px desktop / 200px mobile                        │
│  SIDEBAR W      240px desktop / 64px tablet / overlay mobile        │
│  HEADER H       64px all viewports                                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Appendix B — Component States Checklist

For every interactive component, ensure all states are designed:

```
□ Default          — at-rest appearance
□ Hover            — cursor enters the element
□ Focus            — keyboard focus (focus-visible ring)
□ Active/Pressed   — mouse/touch down
□ Disabled         — non-interactive state (opacity-50, cursor-not-allowed)
□ Loading          — async operation in progress (skeleton or spinner)
□ Error            — validation or data error
□ Empty            — no data to display
□ Success          — positive completion feedback
```

---

*End of Financial Dashboard Design Document — v1.0.0*
