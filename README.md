# Solution Avocat

This repository is prepared to host the complete application as separate
services.

```text
avocat_project/
├── frontend/       React and Nginx frontend service
├── compose.yaml  Local service orchestration
└── .env.example  Shared local configuration
```

The backend and database services will be added at the repository root later.
The frontend does not connect directly to a database; it will communicate with
the backend over HTTP.

## Start the frontend service

```bash
cp .env.example .env
docker compose up --build
```

Open <http://localhost:8080>. The health endpoint is available at
<http://localhost:8080/health>.

## Frontend development

```bash
cd frontend
npm ci
npm run dev
```

See [`frontend/README.md`](frontend/README.md) for frontend-specific commands.
