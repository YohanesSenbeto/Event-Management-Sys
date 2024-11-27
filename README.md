# Event Management System

-   This Event Management System is a web application that allows users to create, edit, and delete events efficiently. The application is built using modern technologies including Next.js for routing, React Query for managing event data, React Table for displaying event listings, Tailwind CSS for styling, Prisma for database operations, TypeScript for type definitions, and Zod for form validation. MongoDB Atlas is used as the database provider.

## Features

-   **User Authentication**: Secure user registration and login.
-   **Event Management**: Create, edit, delete, and view events.
-   **Responsive Design**: Fully responsive and user-friendly interface.
-   **Data Management**: Efficient handling of event data using React Query.
-   **Tabular Data Representation**: Display event listings with sorting and filtering using React Table.
-   **Schema Validation**: Robust form validation using Zod.

## Technology Stack

-   **Frontend**:

    -   Next.js (Routing and SSR)
    -   React Query (State Management)
    -   React Table (Data Table)
    -   Tailwind CSS (Styling)
    -   TypeScript (Type Definitions)
    -   Zod (Form Validation)

-   **Backend**:
    -   Prisma (ORM)
    -   MongoDB Atlas (Database)

## Prerequisites

Before running the project, ensure you have the following installed:

-   Node.js (v14 or above)
-   npm or yarn
-   MongoDB Atlas account

### Clone the Repository

```bash
- git clone https://github.com/YohanesSenbeto/Event-Management-System.git
- cd Event-Management-System


# Install  Dependencies

-   npm install
# This will install all necessary dependencies, including:

# 1. Next.js:
- npm install next react react-dom

# 2. React Query:
- npm install @tanstack/react-query
# 3. React Table:
- npm install @tanstack/react-table

# 4. Tailwind CSS:
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

# 5. Prisma:
- npm install @prisma/client
- npx prisma init

# 6. Zod:
- npm install zod

# 7. MongoDB Driver:
- npm install mongodb

# 8. Additional Setup for TypeScript (if not already installed)
- npm install typescript @types/react @types/node
- npx tsc --init

# Set Up Environment Variables

- Create a .env file in the root directory and add your MongoDB Atlas connection string:

- DATABASE_URL="your-mongodb-atlas-connection-string"
- NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Prisma Setup
- Initialize Prisma and generate the client:

-   npx prisma init
-   npx prisma migrate dev --name init
-   npx prisma generate

# Run the Development Server

-   npm run dev

# Key Achievements:

-   Next.js Routing: Dynamic routing and server-side rendering for fast and efficient navigation.

-   React Query: Optimized data fetching and state management.

-   React Table: Comprehensive event listing with built-in sorting and filtering.

-   Tailwind CSS: Clean and responsive UI with minimal effort.

-   TypeScript & Zod: Strongly typed codebase with robust validation.

# Project Structure

-   Here’s a quick overview of the project structure:

-   Event-Management-System/
    ├── .next/
    ├── app/
    │ ├── Actions/
    │ │ └── todoActions.tsx
    │ ├── api/
    │ │ ├── todos/
    │ │ │ └── route.ts
    │ │ ├── users/
    │ │ │ └── create.ts
    │ │ └── events.ts
    │ ├── events/
    │ │ └── page.tsx
    │ ├── signin/
    │ │ └── page.tsx
    │ ├── signup/
    │ │ └── page.tsx
    │ ├── todos/
    │ │ └── page.tsx
    │ ├── globals.css
    │ ├── layout.tsx
    │ ├── page.tsx
    │ └── react-query-client.ts
    ├── components/
    │ ├── forms/
    │ │ ├── SignInForm.tsx
    │ │ └── SignUpForm.tsx
    │ ├── shared/
    │ │ ├── AddTodo.tsx
    │ │ ├── ChangeTodo.tsx
    │ │ ├── DeleteTodo.tsx
    │ │ ├── EditTodo.tsx
    │ │ ├── EventTable.tsx
    │ │ ├── Todo.tsx
    │ │ └── TodoTable.tsx
    │ ├── ui/
    │ │ ├── Button.tsx
    │ │ ├── Form.tsx
    │ │ └── Input.tsx
    │ ├── HomePage.tsx
    │ └── TodoTable.tsx
    ├── lib/
    │ └── api.ts
    ├── public/
    │ ├── next.svg
    │ └── vercel.svg
    ├── types/
    │ └── todoType.ts
    ├── utils/
    │ ├── prisma/
    │ │ └── schema.prisma
    │ ├── next.config.mjs
    │ ├── prisma.ts
    │ ├── Provider.tsx
    │ ├── schemas.ts
    │ └── tailwind.config.ts
    ├── .env
    ├── .gitignore
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    └── tsconfig.json
```
