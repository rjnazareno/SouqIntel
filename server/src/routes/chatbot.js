import express from 'express'
import mongoose from 'mongoose'
import OpenAI from 'openai'
import Perfume from '../models/Perfume.js'
import Brand from '../models/Brand.js'
import Note from '../models/Note.js'
import { fallbackDupeRelations, fallbackPerfumes } from '../../../client/src/data/fallbackPerfumes.js'

const router = express.Router()
const isMongoConnected = () => mongoose.connection.readyState === 1
const getAIProvider = () => (process.env.AI_PROVIDER || 'openai').toLowerCase()
const isOpenAIKeyConfigured = () => {
  const key = process.env.OPENAI_API_KEY || ''
  return key.startsWith('sk-') && key.length > 40 && key !== 'your-openai-api-key-here'
}
const getOllamaBaseUrl = () => (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/$/, '')
const getOllamaModel = () => process.env.OLLAMA_MODEL || 'qwen2.5:3b'
const getAIRequestTimeoutMs = () => Number(process.env.AI_TIMEOUT_MS || 90000)

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

const getFallbackCatalogContext = (message) => {
  const normalizedMessage = message.toLowerCase()
  const byId = new Map(fallbackPerfumes.map((perfume) => [perfume._id, perfume]))

  const relevantRelations = fallbackDupeRelations
    .map((relation) => ({
      ...relation,
      original: byId.get(relation.originalId),
      dupe: byId.get(relation.dupeId)
    }))
    .filter((relation) => relation.original && relation.dupe)
    .filter((relation) => {
      const haystack = `${relation.original.name} ${relation.original.brand?.name || ''} ${relation.dupe.name} ${relation.dupe.brand?.name || ''}`.toLowerCase()
      return normalizedMessage.split(/\W+/).some((token) => token.length > 2 && haystack.includes(token))
    })
    .slice(0, 12)

  const fallbackRelations = relevantRelations.length > 0
    ? relevantRelations
    : fallbackDupeRelations.slice(0, 12).map((relation) => ({
      ...relation,
      original: byId.get(relation.originalId),
      dupe: byId.get(relation.dupeId)
    })).filter((relation) => relation.original && relation.dupe)

  const relationLines = fallbackRelations.map((relation) => {
    return `- ${relation.original.name} (${relation.original.brand?.name}) -> ${relation.dupe.name} (${relation.dupe.brand?.name}), ${relation.similarityScore}% match, ${relation.priceComparison?.savings || 0}% savings`
  })

  return [
    `Current fallback catalog: ${fallbackPerfumes.length} perfumes and ${fallbackDupeRelations.length} designer/niche-to-Middle-Eastern dupe relationships.`,
    'Relevant known dupe relationships:',
    ...relationLines
  ].join('\n')
}

const getDatabaseContext = async (message) => {
  if (!isMongoConnected()) {
    return getFallbackCatalogContext(message)
  }

  const [perfumeCount, brandCount, noteCount] = await Promise.all([
    Perfume.countDocuments(),
    Brand.countDocuments(),
    Note.countDocuments()
  ])

  return `Current Database: ${perfumeCount} perfumes, ${brandCount} brands, ${noteCount} notes.`
}

const getOpenAIResponse = async (messages) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    max_tokens: 300,
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'
}

const getOllamaResponse = async (messages) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), getAIRequestTimeoutMs())

  try {
    const response = await fetch(`${getOllamaBaseUrl()}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: getOllamaModel(),
        messages,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: Number(process.env.OLLAMA_NUM_PREDICT || 220)
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Ollama request failed with ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return data.message?.content || 'Sorry, I could not generate a response.'
  } finally {
    clearTimeout(timeout)
  }
}

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

    const aiProvider = getAIProvider()

    if (!['openai', 'ollama'].includes(aiProvider)) {
      return res.status(500).json({
        success: false,
        error: 'AI_PROVIDER must be either "openai" or "ollama".'
      })
    }

    if (aiProvider === 'openai' && !isOpenAIKeyConfigured()) {
      return res.status(503).json({
        success: false,
        error: 'AI chatbot is not configured. Add a valid OpenAI API key to server/.env as OPENAI_API_KEY, then restart the server.'
      })
    }

    console.log(`🤖 AI provider: ${aiProvider}`)
    if (aiProvider === 'openai') console.log('🔑 OpenAI API key configured: Yes')
    if (aiProvider === 'ollama') console.log(`🦙 Ollama model: ${getOllamaModel()} at ${getOllamaBaseUrl()}`)
    console.log('💬 Message:', message)
    console.log('📝 Conversation history length:', conversationHistory.length)

    const contextInfo = await getDatabaseContext(message)

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

    const response = aiProvider === 'ollama'
      ? await getOllamaResponse(messages)
      : await getOpenAIResponse(messages)

    res.json({
      success: true,
      data: {
        response,
        timestamp: new Date()
      }
    })

  } catch (error) {
    console.error('Chatbot error:', error)

    if (error.code === 'insufficient_quota' || error.type === 'insufficient_quota') {
      return res.status(429).json({
        success: false,
        error: 'OpenAI quota is exhausted for this API key. Add billing/credits in your OpenAI platform account or use a key from a project with available quota, then try again.'
      })
    }

    if (error.status === 401 || error.code === 'invalid_api_key') {
      return res.status(401).json({
        success: false,
        error: 'OpenAI rejected this API key. Check OPENAI_API_KEY in server/.env, save it, and restart the backend.'
      })
    }

    if (error.message?.includes('Ollama request failed') || error.cause?.code === 'ECONNREFUSED') {
      return res.status(502).json({
        success: false,
        error: `Ollama is not reachable. Start Ollama and pull ${getOllamaModel()}, or check OLLAMA_BASE_URL in your backend environment.`
      })
    }

    if (error.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        error: `The AI model took too long to respond. Try a smaller Ollama model such as qwen2.5:3b, or increase AI_TIMEOUT_MS on a stronger server.`
      })
    }

    res.status(error.status || 500).json({
      success: false,
      error: 'Failed to get AI response. Check the backend terminal for the AI provider error details.'
    })
  }
})

export default router
