# Earthquake Monitoring System

A full-stack application for monitoring and analyzing earthquake sensor data. The system processes raw sensor data, stores it in a PostgreSQL database, and provides a web interface for visualization and analysis.

## Features

- File upload for sensor data processing
- Daily and monthly statistical views
- Maximum, minimum, and count statistics for earthquake frequencies
- Interactive data visualization
- Responsive web interface
- RESTful API backend

## Tech Stack

### Frontend

- React with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- Recharts for data visualization
- Tailwind CSS for styling

### Backend

- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL database
- Jest for testing

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone git@github.com:mahatoHariom/earhquake_monitor.git
cd earthquake-monitoring-system
```

2. Install dependencies:

```bash

# Install frontend dependencies
npm install
```

## Running the Application

1. Start the backend server:

```bash
# In the server directory
npm run dev
```

2. Start the frontend development server:

```bash
# In the client directory
npm run dev

```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:9797

## Testing


Run tests for the frontend:

```bash
# In the client directory
npm test
```

- `POST /api/load-data`: Upload and process sensor data
- `GET /api/monthly-readings`: Get statistics for a specific month
- `GET /api/daily-readings`: Get statistics for a specific day


## License

This project is licensed under the MIT License - see the LICENSE file for details.
