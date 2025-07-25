# TelOne Messaging Portal

## Overview

This is a full-stack messaging portal application built for TelOne telecommunications. The application is designed as a dashboard for managing SMS messaging services with provider statistics, charts, and user management functionality. It features a modern React frontend with a Node.js/Express backend and PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom TelOne brand colors
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Charts**: Recharts for data visualization



### Design System
- **Component Library**: Custom components following shadcn/ui patterns
- **Theme**: TelOne brand colors with light/dark mode support
- **Responsive**: Mobile-first design with breakpoint-based layouts
- **Accessibility**: Radix UI primitives ensure ARIA compliance

## Key Components

### Frontend Structure
- `/client/src/pages/` - Main application pages (login, dashboard, not-found)
- `/client/src/components/ui/` - Reusable UI components
- `/client/src/components/charts/` - Data visualization components
- `/client/src/lib/` - Utility functions and configuration
- `/client/src/hooks/` - Custom React hooks

### Backend Structure
- `/server/index.ts` - Express application setup and middleware
- `/server/routes.ts` - API route definitions
- `/server/storage.ts` - Data access layer with memory and database implementations
- `/server/vite.ts` - Development server integration

### Shared Structure
- `/shared/schema.ts` - Database schema definitions and validation

## Data Flow

### Authentication Flow
1. User enters credentials on login page
2. Frontend validates input client-side
3. Credentials sent to backend API
4. Backend validates against user database
5. Session created and stored in PostgreSQL
6. User redirected to dashboard

### Dashboard Data Flow
1. Dashboard loads with mock data initially
2. TanStack Query manages API calls for real-time data
3. Charts update automatically based on data changes
4. Provider statistics displayed in interactive charts
5. Real-time updates through query refetching

### Database Operations
- Drizzle ORM handles type-safe database queries
- Memory storage implementation for development
- PostgreSQL schema migrations managed via Drizzle Kit
- User management with secure password handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless** - PostgreSQL database connection
- **drizzle-orm** - Type-safe database ORM
- **@tanstack/react-query** - Server state management
- **express** - Web application framework
- **wouter** - Lightweight React router

### UI Dependencies
- **@radix-ui/** - Accessible UI primitives
- **tailwindcss** - Utility-first CSS framework
- **recharts** - React charting library
- **lucide-react** - Icon library

### Development Dependencies
- **vite** - Build tool and development server
- **typescript** - Type safety
- **tsx** - TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. `npm run build` compiles both frontend and backend
2. Frontend builds to `/dist/public` via Vite
3. Backend bundles to `/dist/index.js` via esbuild
4. Static assets served by Express in production

### Production Setup
- Node.js application serves both API and static files
- PostgreSQL database connection via environment variables
- Session persistence using connect-pg-simple
- Environment-based configuration for development/production

### Development Workflow
- `npm run dev` starts development server with hot reload
- Vite handles frontend development with HMR
- tsx provides backend hot reload
- Database schema changes managed with `npm run db:push`

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- `NODE_ENV` determines development/production behavior
- Replit-specific plugins for development environment
- Session secrets and database credentials via environment variables