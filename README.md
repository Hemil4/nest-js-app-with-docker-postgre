## Technologies Used

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON-web-tokens&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

# First NestJS App

## Description

`first-nest-js-app` is a NestJS-based backend application. This project serves as a foundational structure for building scalable and modular applications using the NestJS framework. The app integrates Prisma ORM for database interactions and includes various utilities for testing, linting, and debugging.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Database Management](#database-management)
- [Testing](#testing)
- [License](#license)

---

## Features

- **Modular architecture:** Organized and maintainable code structure.
- **Prisma ORM:** Easy-to-use database management.
- **Authentication:** JWT-based authentication using Passport.
- **Swagger Integration:** API documentation with Swagger.
- **Docker Support:** Development and testing database management using Docker.
- **E2E Testing:** End-to-end testing support with Jest.
- **Code Quality:** Prettier and ESLint integration for consistent coding standards.

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- Docker
- pnpm (Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd first-nest-js-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the environment variables (see [Environment Variables](#environment-variables)).

4. Start the development server:
   ```bash
   pnpm start:dev
   ```

---

## Usage

### Run the Development Server
Start the server in watch mode for development:
```bash
pnpm start:dev
```

### Build the Application
Build the application for production:
```bash
pnpm build
```

### Run the Production Server
Start the application in production mode:
```bash
pnpm start:prod
```

---

## Scripts

| Script                   | Description                                          |
|--------------------------|------------------------------------------------------|
| `pnpm prisma:dev:deploy` | Apply migrations for the development database.       |
| `pnpm db:dev:up`         | Start the development database using Docker.         |
| `pnpm db:dev:rm`         | Remove the development database container.           |
| `pnpm db:dev:restart`    | Restart the development database and apply migrations. |
| `pnpm build`             | Build the application for production.                |
| `pnpm start`             | Start the server in normal mode.                     |
| `pnpm start:dev`         | Start the server in watch mode for development.      |
| `pnpm lint`              | Run ESLint to check and fix linting errors.          |
| `pnpm test`              | Run unit tests using Jest.                           |
| `pnpm test:e2e`          | Run end-to-end tests using Jest.                     |

---

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

For testing, create a `.env.test` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/test_database_name
JWT_SECRET=test_jwt_secret
NODE_ENV=test
```

---

## Database Management

### Development Database
Start the development database:
```bash
pnpm db:dev:up
```

Apply migrations:
```bash
pnpm prisma:dev:deploy
```

Restart the development database:
```bash
pnpm db:dev:restart
```

### Testing Database
Start the testing database:
```bash
pnpm db:test:up
```

Apply migrations for the testing database:
```bash
pnpm prisma:test:deploy
```

Restart the testing database:
```bash
pnpm db:test:restart
```

---

## Testing

### Unit Tests
Run unit tests:
```bash
pnpm test
```

### End-to-End Tests
Restart the testing database and run E2E tests:
```bash
pnpm test:e2e
```

---

## License

This project is licensed under the `UNLICENSED` license. Ensure proper attribution before using any part of this codebase.

