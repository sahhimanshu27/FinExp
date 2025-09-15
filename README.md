# FinEx - Personal Finance Tracker

A comprehensive personal finance tracker that helps users manage their income, expenses, and budgets with detailed insights and reporting.

## Features

- 💰 **Income & Expense Tracking**: Record and categorize all financial transactions
- 📊 **Budget Management**: Set and monitor budgets for different categories
- 📈 **Visual Insights**: Charts and graphs for spending patterns and trends
- 📱 **Modern UI**: Clean, intuitive interface for easy navigation
- 🔐 **Secure Authentication**: JWT-based user authentication
- 📤 **Export Reports**: Export data to CSV, Excel, and PDF formats
- 🏷️ **Smart Categorization**: Automatic transaction categorization

## Technology Stack

- **Frontend**: React 18, TypeScript, Material-UI, Chart.js
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Charts**: Chart.js and Recharts

## Quick Start

1. **Install dependencies**:

   ```bash
   npm run install-all
   ```

2. **Set up environment variables**:

   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your database and JWT configuration
   ```

3. **Set up the database**:

   ```bash
   cd server
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the development servers**:
   ```bash
   npm run dev
   ```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
FinExp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   ├── prisma/           # Database schema and migrations
└── docs/                 # Documentation
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Transactions

- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Budgets

- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget

### Reports

- `GET /api/reports/spending` - Get spending reports
- `GET /api/reports/budget` - Get budget vs actual reports
- `GET /api/reports/export` - Export reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
