import express from 'express'
import OpenAI from 'openai'
import Perfume from '../models/Perfume.js'
import Brand from '../models/Brand.js'
import Note from '../models/Note.js'

const router = express.Router()

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// System prompt with perfume knowledge
const SYSTEM_PROMPT = `You are SouqIntel AI, an expert perfume consultant specializing in Middle Eastern fragrances and affordable alternatives (dupes) to luxury perfumes.

Your expertise includes:
- Designer and niche fragrances (Tom Ford, Creed, Dior, MFK, Amouage, etc.)
- Arabian perfume houses (Lattafa, Armaf, Rasasi, Swiss Arabian, etc.)
- Fragrance notes and compositions
- Finding affordable Arabian dupes for expensive perfumes
- Recommendations based on preferences, occasions, and budgets

Guidelines:
- Be enthusiastic and knowledgeable about fragrances
- Use emojis occasionally (🌸 for floral, 🪵 for woody, 🍋 for citrus, etc.)
- Keep responses concise but informative (2-4 sentences max)
- Focus on helping users find great scents within their budget
- When asked about dupes, mention specific Arabian brands that make good alternatives
- If you don't know something specific about a perfume in the database, say so honestly

The app has a database of designer/niche perfumes and their Arabian dupes. Users can browse perfumes, use the Dupe Finder, and chat with you for personalized advice.`

// POST /api/chat - Send message to AI chatbot
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      })
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      return res.status(503).json({
        success: false,
        error: 'AI chatbot is not configured. Please add your OpenAI API key to the .env file.'
      })
    }

    console.log('🔑 API Key configured:', process.env.OPENAI_API_KEY ? 'Yes' : 'No')
    console.log('💬 Message:', message)
    console.log('📝 Conversation history length:', conversationHistory.length)

    // Get context from database
    const [perfumeCount, brandCount, noteCount] = await Promise.all([
      Perfume.countDocuments(),
      Brand.countDocuments(),
      Note.countDocuments()
    ])

    const contextInfo = `Current Database: ${perfumeCount} perfumes, ${brandCount} brands, ${noteCount} notes.`

    // Build conversation history for OpenAI (different format than Gemini)
    const filteredHistory = conversationHistory.filter((msg, index) => {
      // Skip initial assistant messages (welcome message)
      if (index === 0 && msg.role === 'assistant') return false
      return true
    })

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + '\n\n' + contextInfo },
      ...filteredHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast and affordable model
      messages: messages,
      max_tokens: 300,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    res.json({
      success: true,
      data: {
        response,
        timestamp: new Date()
      }
    })

  } catch (error) {
    console.error('Chatbot error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get AI response'
    })
  }
})

export default router
