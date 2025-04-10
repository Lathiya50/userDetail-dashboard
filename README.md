# User Detail Dashboard

A modern React dashboard for managing user details built with Next.js and Tailwind CSS. This application provides an interface to view, sort, filter, and manage user records with various status indicators and statistics.

![Dashboard Preview](https://github.com/user-attachments/assets/2f25c24e-755b-4abb-a6e7-2d456f734ff7)

## Live Demo

Check out the live demo: [User Detail Dashboard](https://user-detail-dashboard.vercel.app/)

## Features

- 📊 Dashboard with user statistics
- 🔍 Advanced filtering and search
- 📅 Date range selection
- 🔄 Status updates for users (Active, Invited, Blocked)
- ⚡ Responsive design for all device sizes
- 📱 Mobile-friendly interface
- 🎯 Optimized performance with React hooks
- 🧩 Component-based architecture
- 📈 Pagination for large datasets

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Lathiya50/userDetail-dashboard.git
cd userDetail-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
mitigata/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global CSS styles
│   │   ├── layout.js           # Root layout
│   │   └── page.js             # Main page component
│   ├── components/
│   │   ├── dashboard/          # Dashboard specific components
│   │   │   ├── DateRangePicker.jsx
│   │   │   ├── FilterSection.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchInput.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── StatusFilter.jsx
│   │   │   ├── TableHeader.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── UsersTable.jsx
│   │   │   └── UserRow.jsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── button.jsx
│   │       ├── calendar.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── popover.jsx
│   │       ├── select.jsx
│   │       └── skeleton.jsx
│   ├── constants/              # Application constants
│   │   └── index.js
│   ├── hooks/                  # Custom React hooks
│   │   ├── usePagination.js
│   │   └── useUserData.js
│   └── lib/                    # Utility functions
│       └── utils.js
└── package.json
```

## Technologies Used

### Core
- **Next.js 15.2.5** - React framework
- **React 19.0.0** - JavaScript library for building user interfaces
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components
- **Radix UI** - Unstyled, accessible components
  - `@radix-ui/react-popover`
  - `@radix-ui/react-select`
  - `@radix-ui/react-slot`
- **Lucide React** - Icon library
- **React Day Picker** - Calendar component

### Utilities
- **class-variance-authority** - For component variants
- **clsx** & **tailwind-merge** - For conditional class names
- **date-fns** - Date manipulation
- **react-intersection-observer** - Intersection observer hook

## Key Features Implementation

### Data Management
The application uses custom hooks for data management:
- `useUserData` - Handles user records, filtering, and status updates
- `usePagination` - Handles pagination and infinite scrolling

### Responsive Design
The UI is fully responsive using Tailwind's responsive modifiers:
- Mobile-first approach
- Adaptive layouts for different screen sizes

### Performance Optimizations
- Memoization with `useMemo` and `memo`
- Debounced filters
- Lazy loading with infinite scroll
