# Earthquake Monitoring System

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd earthquake-monitor
```

### 2. Server Setup

```bash
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Update .env with your database credentials
# Example .env content:
# DATABASE_URL="postgresql://username:password@localhost:5432/earthquake_db"
# PORT=9797

# Run database migrations
npx prisma generate
npx prisma migrate dev

# Start the development server
npm run dev
```

### 3. Client Setup

```bash
cd client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Update .env with your API URL
# Example .env content:
# VITE_API_URL="http://localhost:9797/api"

# Start the development server
npm run dev
```

## Database Setup

1. Create PostgreSQL database:

```sql
CREATE DATABASE earthquake_db;
```

2. The Prisma migration will handle table creation automatically.

## Running Tests

```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test
```

## API Endpoints

1. `POST /api/earthquakes/load-data`

   - Loads earthquake data from a file
   - Body: `{ "filePath": "path/to/file.txt" }`

2. `GET /api/earthquakes/daily/:date`

   - Get readings summary for a specific date
   - Format: YYYYMMDD

3. `GET /api/earthquakes/monthly/:year/:month`

   - Get readings summary for a specific month
   - Format: year (YYYY), month (1-12)

4. `GET /api/earthquakes/yearly-trends/:year`
   - Get monthly averages for a specific year
   - Format: YYYY

## Environment Variables

### Server (.env)

```
DATABASE_URL="postgresql://username:password@localhost:5432/earthquake_db"
PORT=9797
NODE_ENV=development
DEFAULT_DATA_FILE="path/to/default/data.txt"
```

### Client (.env)

```
VITE_API_URL="http://localhost:9797/api"
```
