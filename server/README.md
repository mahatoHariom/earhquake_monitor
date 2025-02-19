

# Earthquake Reading API

A RESTful API service for managing and analyzing earthquake sensor readings.

## 🚀 Features

- Load earthquake sensor readings from file
- Get monthly statistics
- Get daily statistics
- Input validation
- Error handling
- TypeScript support

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Prisma ORM

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/mahatoHariom/earthquake-api.git
cd earthquake-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:

```
DATABASE_URL="postgresql://username:password@localhost:5432/earthquake_db"
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```

## 🧪 Running Tests

```bash
npm test
```

## 📝 API Documentation

### Load Data

```
POST /api/load-data
Content-Type: application/json



### Get Monthly Readings

```
GET /api/readings/monthly?year=2024&month=2
```

### Get Daily Readings

```
GET /api/readings/daily?year=2024&month=2&day=15
```

## 🛠️ Development

1. Run in development mode:

```bash
npm run dev
```

2. Build for production:

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── routes/         # Route definitions
├── services/       # Business logic
├── utils/         # Helper functions
└── app.ts         # Application entry point
```
