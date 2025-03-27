# PostgreSQL Setup Guide for Ariesview

This guide provides information about the PostgreSQL database setup for the Ariesview application.

## Docker-Based PostgreSQL (Recommended)

The simplest way to use PostgreSQL with Ariesview is through the provided Docker setup. There are two options:

### Option 1: Using the Full Docker Deployment

With this approach, both PostgreSQL and the Next.js application run in Docker containers:

1. Simply run `start-ariesview-docker.bat`
2. Everything is automatically configured

### Option 2: Using Local Next.js with Docker PostgreSQL

With this approach, PostgreSQL runs in Docker while the Next.js application runs locally:

1. Run `start-ariesview-local.bat`
2. The script will:
   - Start a PostgreSQL container
   - Configure the database
   - Create a `.env.local` file with connection settings
   - Start the Next.js application locally

## Database Details

The default configuration uses the following settings:

- **Database Name**: ariesview
- **Username**: ariesview
- **Password**: your_secure_password 
- **Port**: 5432
- **Host**: 
  - When using Docker deployment: postgres (container name)
  - When using local Next.js: localhost

## Customizing Database Settings

### For Full Docker Deployment

Edit `docker-compose.yml` and update both the PostgreSQL and Next.js service environment variables:

```yml
# PostgreSQL service
environment:
  POSTGRES_USER: your_custom_username
  POSTGRES_PASSWORD: your_secure_password
  POSTGRES_DB: your_database_name

# Next.js service
environment:
  DB_USER: your_custom_username
  DB_PASSWORD: your_secure_password
  DB_NAME: your_database_name
```

### For Local Next.js with Docker PostgreSQL

1. Edit `start-ariesview-local.bat` to update the PostgreSQL container settings
2. Edit `.env.local` to match those settings:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_custom_username
DB_PASSWORD=your_secure_password
DB_NAME=your_database_name
```

## Database Schema

The application uses the following tables:

1. `organizations` - Stores organization information
2. `users` - Stores user accounts and authentication details

The schema is automatically created when the database is initialized.

## Troubleshooting

### Container Issues

If you encounter issues with the PostgreSQL container:

1. Check if the container is running:
   ```
   docker ps | findstr ariesview-postgres
   ```

2. View container logs:
   ```
   docker logs ariesview-postgres
   ```

3. Restart the container:
   ```
   docker restart ariesview-postgres
   ```

4. Remove and recreate the container:
   ```
   docker rm -f ariesview-postgres
   ```
   Then run the appropriate start script again.

### Connection Issues

If the application can't connect to the database:

1. Verify the container is running
2. Check that the port mapping is correct: `docker ps`
3. Ensure the connection settings in `.env.local` match the Docker container
4. Try connecting manually:
   ```
   docker exec -it ariesview-postgres psql -U ariesview -d ariesview
   ```

## Alternative: Local PostgreSQL Installation

If you prefer to use a locally installed PostgreSQL server instead of Docker:

1. Install PostgreSQL from [the official website](https://www.postgresql.org/download/)
2. Create a database named `ariesview`
3. Create a user named `ariesview` with password `your_secure_password`
4. Grant all privileges on the database to the user
5. Update `.env.local` with your connection details
6. Run the application with `npx next dev` 