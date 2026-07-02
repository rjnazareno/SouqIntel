# Deploy SouqIntel With Vercel + Ollama

This setup avoids OpenAI API billing by running the chatbot against an Ollama model on your own backend host.

## Architecture

```text
User browser
  -> Vercel React frontend
  -> Express backend API
  -> Ollama local model on the backend host
```

Vercel should host the frontend only. Ollama should run on the same machine/container network as the Express backend, or on a private internal URL. Do not expose the raw Ollama port publicly unless you put authentication and network controls in front of it.

## Local Development

1. Install Ollama from https://ollama.com.

2. Pull a model:

```powershell
ollama pull qwen2.5:3b
```

3. Start the backend:

```powershell
npm --prefix server run dev
```

4. Start the frontend:

```powershell
npm --prefix client run dev
```

5. Local env values:

```env
# server/.env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:3b

# client/.env
VITE_API_URL=http://localhost:5000/api
```

## Backend Host

Use a host that can run a long-lived Node server and Ollama. Good fit:

- VPS
- Fly.io machine
- Railway/Render service with enough RAM, if they support your chosen Ollama setup
- Your own always-on computer or home server

Backend environment variables:

```env
NODE_ENV=production
PORT=5000
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:3b
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

If MongoDB is not fixed yet, the backend can still serve the local fallback perfume catalog.

Your backend should be reachable over HTTPS before connecting it to Vercel. A Vercel site is served over HTTPS, and browsers can block calls from an HTTPS page to a plain HTTP API.

For a VPS, point a domain such as `api.yourdomain.com` to the VPS, then use a reverse proxy such as Caddy or Nginx to forward HTTPS traffic to the Node API on port `5000`. See `deploy/Caddyfile.example`.

## Docker Backend + Ollama

The repo includes a Docker setup for hosts that support Docker:

```powershell
docker compose -f docker-compose.ollama.yml up -d --build
```

Pull the model into the Ollama container:

```powershell
docker compose -f docker-compose.ollama.yml exec ollama ollama pull qwen2.5:3b
```

Then test the backend:

```powershell
Invoke-RestMethod http://localhost:5000/api/health
Invoke-RestMethod http://localhost:5000/api/health/ai
```

For production, edit `docker-compose.ollama.yml` and replace:

```env
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

with your actual Vercel domain.

## Vercel Frontend

In Vercel project settings, set:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Then redeploy the frontend. Deploy the backend first so you already know the exact backend URL to put in Vercel.

## Production Test

After both services are deployed:

```powershell
$body = @{
  message = "Suggest a Middle Eastern dupe for Sauvage Elixir"
  conversationHistory = @()
} | ConvertTo-Json

Invoke-RestMethod https://your-backend-domain.com/api/chat -Method Post -ContentType "application/json" -Body $body
```

Expected result: a JSON response with a perfume recommendation from the local Ollama model.

You can also check AI connectivity without sending a chat message:

```powershell
Invoke-RestMethod https://your-backend-domain.com/api/health/ai
```

## Notes

- Smaller models are cheaper to host and faster. Start with `qwen2.5:3b` for the MVP.
- If your host has enough RAM/CPU/GPU and responses are fast, upgrade to `llama3.1:8b` or `qwen2.5:7b`.
- If the backend returns `Ollama is not reachable`, check that Ollama is running and that `OLLAMA_BASE_URL` is correct.
- If responses are too slow, use a smaller model or a backend host with more CPU/RAM/GPU.
