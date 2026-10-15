# Madhuri Portfolio

This project is a full-stack portfolio website for Madhuri, built with React + TypeScript on the frontend and an Express + MySQL backend.

## Local development

1. Copy `.env.example` to `.env` and fill in your MySQL credentials.
2. Create the MySQL database and import the schema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
3. Start the backend and frontend together:
   ```bash
   npm run dev
   ```
4. The frontend runs on `http://localhost:5173` and the API on `http://localhost:5000`.

## Production deployment

- Build the frontend: `npm run build`
- Serve the backend with `npm start`
- Set `VITE_API_URL` to the deployed backend URL when building for production
- Configure CORS using the deployed frontend origin in the backend environment

## Database setup

See `database/schema.sql` and `database/seed.sql` for schema and sample data.

## Notes

- If MySQL is not running or credentials are missing, the backend falls back to curated seed data for the public portfolio API.
- Contact form messages are still saved when the database is available; email delivery is enabled only when SMTP variables are configured.
