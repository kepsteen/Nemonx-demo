# Nemonx Demo

This Demo is a full-stack application for managing student diplomas and student data. This application allows users to view, add, and modify diploma records and their corresponding student information.



https://github.com/user-attachments/assets/d6fa5f52-35a6-43d4-9792-e00d49c50789



## Project Overview

This application was built as a take-home assignment to demonstrate full-stack development skills using:

- **Frontend**: React with TypeScript, Vite, and TanStack Table
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM

The application provides a user interface to:

- View a table of diplomas with student information
- Add new diploma records
- Edit existing diploma and student data
- Filter and search through records

## Features

- **Data Management**: CRUD operations for diploma and student records
- **Data Validation**: Form validation using Zod schema
- **Responsive UI**: Modern UI built with Tailwind CSS and Radix UI components
- **Type Safety**: End-to-end type safety with TypeScript and Zod

## Project Structure

The project is organized into two main directories:

### Backend (NestJS)

```
backend/
├── prisma/                # Prisma schema and migrations
├── src/
│   ├── diplomas/          # Diploma module (controller, service)
│   ├── students/          # Student module (controller, service)
│   ├── prisma/            # Prisma service
│   └── main.ts            # Application entry point
└── package.json           # Backend dependencies
```

### Frontend (React + TypeScript)

```
frontend/
├── src/
│   ├── components/           # React components
│   │   ├── DiplomaTable/     # Table components for diplomas
│   │   ├── AddDiplomaModal/  # Modal for adding a diploma
│   │   └── ui/               # UI components
│   ├── lib/                  # Utility functions and API client
│   ├── types.ts              # TypeScript type definitions
│   └── App.tsx               # Main application component
└── package.json              # Frontend dependencies
```

## Data Models

### Student

- `id`: UUID
- `name`: String
- `ssn`: String (4 characters)
- `email`: String (email format)
- `phone`: String (10 characters)
- `created_at`: DateTime
- `updated_at`: DateTime

### Diploma

- `id`: Integer
- `student_id`: UUID (foreign key to Student)
- `degree`: String
- `status`: Enum ('pending', 'processing', 'success', 'failed')
- `created_at`: DateTime
- `updated_at`: DateTime

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or pnpm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/kepsteen/Nemonx-demo
   cd nemonx-demo
   ```

2. Set up the backend:

   ```
   cd backend
   npm install
   ```

3. Configure the database:

   - Create a PostgreSQL database (I'm using Neon)
   - Update the `.env` file with your database connection string
   - Run Prisma migrations:
     ```
     npx prisma migrate dev
     ```

4. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend and frontend servers:

   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Diplomas

- `GET /api/diplomas` - Get all diplomas
- `GET /api/diplomas/:id` - Get a specific diploma
- `POST /api/diplomas` - Create a new diploma
- `PATCH /api/diplomas/:id` - Update a diploma
- `PATCH /api/diplomas/:id/with-student` - Update a diploma with student data
- `DELETE /api/diplomas/:id` - Delete a diploma

### Students

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student by ID
- `GET /api/students/ssn/:ssn` - Get a student by SSN
- `POST /api/students` - Create a new student
- `PATCH /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Technologies Used

### Backend

- NestJS
- Prisma ORM
- PostgreSQL (Neon)
- TypeScript

### Frontend

- React 19
- TypeScript
- Vite
- TanStack Table
- React Hook Form
- Zod
- Tailwind CSS
- Shadcn UI components
