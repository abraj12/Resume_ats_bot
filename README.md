# Resume Analyzer Monorepo

This repo is organized as a simple monorepo with two primary apps:

```text
project-root/
+-- backend/
+-- frontend/
```

## Apps

### Backend

Location: `backend/`

Includes:
- Express API
- Telegram bot
- Groq/OpenAI-compatible resume analysis
- Resume export generation

Useful commands:

```bash
cd backend
npm install
npm run check
npm run dev
npm start
```

Environment file:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
BOT_TOKEN=your_telegram_bot_token
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
GROQ_BASE_URL=https://api.groq.com/openai/v1
ENABLE_JPG_EXPORT=true
STORAGE_DIR=storage
```

### Frontend

Location: `frontend/`

Includes:
- React + Vite
- Tailwind CSS
- Axios API integration

Useful commands:

```bash
cd frontend
npm install
npm run dev
npm run build
```

Environment file:

```env
VITE_API_URL=http://localhost:5000
```

## API Contract

### `POST /analyze`

Multipart form-data fields:
- `jobDescription`
- `file`

### `POST /download/pdf`
- JSON body with `template`, `optimizedResume`, and optional `userId`

### `POST /download/image`
- Same body as PDF export

## Root Scripts

From the repo root:

```bash
npm run backend
npm run frontend
npm run backend:start
npm run frontend:build
```
