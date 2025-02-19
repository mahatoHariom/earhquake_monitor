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
- Testing with Vitest and React Testing Library

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
git clone [repository-url]
cd earthquake-monitoring-system
```

2. Install dependencies:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up the database:

```bash
# In the server directory
npx prisma migrate dev
```

4. Create a `.env` file in the server directory:

```
DATABASE_URL="postgresql://username:password@localhost:5432/earthquake_db"
PORT=9797
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

Run tests for the backend:

```bash
# In the server directory
npm test
```

Run tests for the frontend:

```bash
# In the client directory
npm test
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── App.tsx
│   ├── tests/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── middleware/
│   ├── prisma/
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/load-data`: Upload and process sensor data
- `GET /api/monthly-readings`: Get statistics for a specific month
- `GET /api/daily-readings`: Get statistics for a specific day

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
