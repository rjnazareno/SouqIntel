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
app.use(cors())
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
