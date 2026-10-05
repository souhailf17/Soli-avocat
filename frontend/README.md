# Frontend service

This directory contains the standalone React frontend service. It can be
developed and built independently from the future backend and database.

## Run for development

Requirements: Node.js 22 and npm.

```bash
cd frontend
npm ci
npm run dev
```

Vite normally serves the application at <http://localhost:5173>.

## Run as a production container

Build and start the frontend:

```bash
cd frontend
docker build -t solution-avocat-frontend .
docker run --rm -p 8080:80 solution-avocat-frontend
```

Open <http://localhost:8080>. The health endpoint is available at
<http://localhost:8080/health>.

You can also use Compose from the repository root:

```bash
cd ..
cp .env.example .env
docker compose up --build
```

Stop it with:

```bash
docker compose down
```

## Future backend connection

`VITE_API_URL` is reserved for the backend base URL. It is a build-time value
because Vite embeds frontend environment variables in the generated files.

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com/api \
  -t solution-avocat-frontend .
```

When backend and database services are introduced, add them to the root
`compose.yaml`.
Only the backend should connect to the database; the frontend should communicate
with the backend over HTTP.
