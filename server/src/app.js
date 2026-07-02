import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// Route imports
import perfumeRoutes from './routes/perfumes.js'
import brandRoutes from './routes/brands.js'
import noteRoutes from './routes/notes.js'
import dupeRoutes from './routes/dupes.js'
import authRoutes from './routes/auth.js'
import chatbotRoutes from './routes/chatbot.js'

// Load environment variables
dotenv.config()

// Initialize express
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
const corsOptions = process.env.CORS_ORIGIN
  ? { origin: process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()) }
  : {}

app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use('/api/perfumes', perfumeRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/dupes', dupeRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatbotRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SouqIntel API is running' })
})

app.get('/api/health/ai', async (req, res) => {
  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase()

  if (provider === 'openai') {
    return res.json({
      status: process.env.OPENAI_API_KEY ? 'configured' : 'missing_key',
      provider
    })
  }

  if (provider !== 'ollama') {
    return res.status(500).json({
      status: 'invalid_provider',
      provider,
      message: 'AI_PROVIDER must be either "openai" or "ollama".'
    })
  }

  const ollamaBaseUrl = (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/$/, '')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(`${ollamaBaseUrl}/api/tags`, { signal: controller.signal })
    const data = await response.json()
    const models = Array.isArray(data.models) ? data.models.map((model) => model.name) : []
    const configuredModel = process.env.OLLAMA_MODEL || 'qwen2.5:3b'
    const hasConfiguredModel = models.some((model) => model === configuredModel || model.startsWith(`${configuredModel}:`))

    res.status(response.ok && hasConfiguredModel ? 200 : 502).json({
      status: response.ok && hasConfiguredModel ? 'ok' : 'model_missing',
      provider,
      model: configuredModel,
      models
    })
  } catch (error) {
    res.status(502).json({
      status: 'unreachable',
      provider,
      model: process.env.OLLAMA_MODEL || 'qwen2.5:3b',
      message: 'Ollama is not reachable from the backend.'
    })
  } finally {
    clearTimeout(timeout)
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌿 Environment: ${process.env.NODE_ENV || 'development'}`)
})
