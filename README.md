# Planner Frontend

This is the frontend for the Planner application, built with React and TypeScript. It provides a user-friendly interface
for managing tasks and schedules.

## Features

- User authentication with JWT
- Task management (create, update, delete, mark as completed)
- Category-based task organization
- Deadline reminders
- Responsive UI
- API integration with the backend

## Tech Stack

- **React** (with TypeScript)
- **Vite** (for fast builds and development)
- **React Query** (for data fetching and caching)
- **Tailwind CSS** (for styling)
- **React Router** (for navigation)
- **Axios** (for API requests)

## API Integration

The frontend interacts with the backend API to perform user authentication and task management. Ensure the backend is
running and accessible at the configured API URL.

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Application Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Main application pages
- `src/api/` - API service functions
- `src/context/` - Global state management
- `src/hooks/` - Custom hooks
- `src/utils/` - Helper functions

## Key Screens

- **Login / Signup** - User authentication
- **Dashboard** - Overview of tasks
- **Task Management** - Create, edit, and delete tasks
- **Settings** - User preferences

## Notes

- Ensure you have the correct API URL in the `.env` file.
- Swagger documentation is available for the backend API at `http://localhost:8080/swagger-ui.html`.
- The frontend is designed to be responsive and works across devices.