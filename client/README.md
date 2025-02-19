# Earthquake Monitoring System

A full-stack application for monitoring and analyzing earthquake sensor data. The system processes raw sensor data and provides a web interface for visualization and analysis.

## Features

- File upload for sensor data processing
- Daily and monthly statistical views
- Maximum, minimum, and count statistics for earthquake frequencies
- Interactive data visualization
- Responsive web interface

## Tech Stack

### Frontend

- React with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- Recharts for data visualization
- Tailwind CSS for styling

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone git@github.com:mahatoHariom/earhquake_monitor.git
cd earthquake-monitoring-system
cd client
```

2. Install dependencies:

```bash
# Install frontend dependencies
npm install
```

## Running the Application

1. Start the frontend development server:

```bash
# In the client directory
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173

## Environment Variables

Create a `.env` file in the root of the project and add the following:

```bash
VITE_API_BASE_URL=http://localhost:9797/api
```


## License

This project is licensed under the MIT License - see the LICENSE file for details.

