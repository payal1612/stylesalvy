# StyleSense - AI Personal Stylist & Makeup Recommender

## Overview

StyleSense is a web-based AI-powered personal styling platform that analyzes users' physical features (skin tone, undertone, face shape, hair color, eye color) through image uploads and provides personalized recommendations for makeup shades, color palettes, and outfit suggestions. The application uses Google's Gemini AI for image analysis and style advice, offering an interactive chat interface for personalized styling consultations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**: React with Vite for fast development and optimized production builds.

**UI Component System**: Radix UI primitives with shadcn/ui components styled using Tailwind CSS v4. The design system follows a "New York" style variant with custom theming for both light and dark modes.

**Design Philosophy**: The application emphasizes a beauty-industry aesthetic inspired by Sephora, Pinterest, and Fenty Beauty, with a color-forward experience that celebrates diversity. The UI uses sparing primary brand colors (deep rose/berry tones) to let user-generated color palettes and analysis results take center stage. Typography combines Inter (sans-serif) for body text with Playfair Display (serif) for elegant headlines.

**State Management**: TanStack Query (React Query) for server state management, providing caching, background updates, and optimistic UI patterns. No global state management library (Redux/Context) is heavily used beyond React Query.

**Routing**: Wouter for lightweight client-side routing with support for dynamic route parameters (e.g., `/results/:id`, `/makeup/:id`, `/outfits/:id`).

**Key Pages**:
- Home: Hero section with feature overview
- Upload: Image upload interface with drag-and-drop support
- Results: Displays analysis results with skin tone, undertone, face shape, and personalized color palette
- Makeup: Category-based makeup shade recommendations (foundation, lipstick, blush, eyeshadow)
- Outfits: Occasion-based outfit recommendations with color coordination
- Chat: AI stylist chatbot for personalized advice
- Profile: User analysis history and saved palettes

### Backend Architecture

**Runtime & Framework**: Node.js with Express.js serving a REST API.

**API Design**: RESTful endpoints with clear resource-based routing:
- `/api/analyze` - POST endpoint for image analysis
- `/api/chat` - POST endpoint for AI styling advice
- `/api/makeup/:analysisId` - GET makeup recommendations
- `/api/outfits/:analysisId` - GET outfit recommendations
- `/api/profile` - GET user profile and history

**Business Logic Separation**: The backend separates concerns into:
- `routes.ts`: HTTP request handling and routing
- `gemini.ts`: AI integration layer for image analysis and chat
- `analysis.ts`: Domain logic for generating makeup and outfit recommendations based on analysis results
- `storage.ts`: Data access abstraction layer

**Development Environment**: Custom Vite integration in development mode for HMR (Hot Module Replacement) and seamless frontend-backend integration. Production builds serve static assets from Express.

### Data Storage

**Current Implementation**: In-memory storage using TypeScript Maps (`MemStorage` class) for rapid prototyping and development. The storage interface (`IStorage`) abstracts data operations, making it easy to swap implementations.

**Database Schema Design**: Drizzle ORM schema defined in `shared/schema.ts` with PostgreSQL as the target dialect. The schema includes:
- `users`: User authentication (username, password)
- Analysis results: Skin tone, undertone, face shape, hair/eye color, confidence scores, color palettes
- Makeup recommendations: Categorized by type (foundation, lipstick, blush, eyeshadow) with shade details
- Outfit recommendations: Categorized by occasion with styling suggestions
- Chat messages: Conversation history with role-based structure

**Data Model Rationale**: The schema separates analysis results from recommendations to enable flexible recommendation algorithms. Each analysis can have multiple makeup and outfit recommendation sets, supporting future features like seasonal variations or brand-specific recommendations.

**Migration Strategy**: Drizzle Kit configured for schema migrations with `db:push` script for database synchronization. The `IStorage` interface pattern allows switching from in-memory to database-backed storage without changing business logic.

### Authentication & Authorization

**Planned Authentication**: JWT-based authentication with optional Google OAuth integration. The user schema includes username/password fields, but authentication routes are not yet fully implemented.

**Security Considerations**: Passwords would be hashed using industry-standard algorithms (bcrypt/argon2). Sessions would use secure HTTP-only cookies with JWT tokens.

## External Dependencies

### AI & Machine Learning

**Google Gemini AI**: Primary AI service using the `@google/genai` SDK (model: `gemini-2.5-flash`).
- **Image Analysis**: Analyzes uploaded selfies to determine skin tone, undertone, face shape, hair color, eye color, and confidence scores
- **Style Chat**: Provides conversational styling advice with context awareness of user's analyzed features
- **API Key**: Required via `GEMINI_API_KEY` environment variable

**Rationale**: Gemini provides multimodal capabilities (text + vision) in a single API, reducing integration complexity compared to combining separate CV and NLP services.

### Database

**Neon Serverless PostgreSQL**: Cloud database using `@neondatabase/serverless` for connection pooling and serverless-optimized queries.
- **Connection**: Via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM for type-safe database operations and migrations

**Alternatives Considered**: MongoDB (NoSQL) was mentioned in initial design docs but PostgreSQL was chosen for relational integrity between analyses, recommendations, and users.

### UI Component Library

**Radix UI**: Unstyled, accessible component primitives (@radix-ui/* packages) for dialogs, dropdowns, menus, tooltips, and form controls.

**shadcn/ui**: Pre-styled component layer built on Radix UI with Tailwind CSS integration.

**Rationale**: This combination provides accessibility compliance, customizable styling, and rapid development without vendor lock-in to a heavy UI framework.

### Styling & Design

**Tailwind CSS v4**: Utility-first CSS framework with custom design tokens defined in CSS variables (HSL color system).

**Google Fonts**: Inter (body text) and Playfair Display (headings) loaded via CDN for typography.

**Custom Theme System**: Dual-mode (light/dark) theme with beauty-industry color palette. Theme switching persists to localStorage and toggles via `.dark` class on document root.

### Build & Development Tools

**Vite**: Frontend build tool with React plugin for fast HMR and optimized production builds.

**TypeScript**: Strict type checking across client, server, and shared code with path aliases for clean imports.

**ESBuild**: Used for server-side bundling in production builds.

**Replit Plugins**: Development environment includes Replit-specific Vite plugins for error overlay, code cartography, and dev banners (conditionally loaded in development).

### Form & Validation

**React Hook Form**: Form state management with `@hookform/resolvers` for schema validation.

**Zod**: Runtime type validation for API inputs/outputs, integrated with Drizzle ORM via `drizzle-zod` for automatic schema generation.

### Session Management

**connect-pg-simple**: PostgreSQL session store for Express sessions (configured but not yet fully implemented in current codebase).

### Utilities

**date-fns**: Date manipulation and formatting library.

**class-variance-authority (CVA)**: Type-safe component variant styling.

**clsx & tailwind-merge**: Utility for conditional class name composition with Tailwind CSS conflict resolution.

**cmdk**: Command palette component (imported but usage not visible in provided code).

**wouter**: Lightweight routing library (~1KB) as alternative to React Router.