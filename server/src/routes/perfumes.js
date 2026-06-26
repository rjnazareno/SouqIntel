import express from 'express'
import mongoose from 'mongoose'
import Perfume from '../models/Perfume.js'
import {
  fallbackPagination,
  filterFallbackPerfumes,
  getFallbackPerfume,
  searchFallbackPerfumes
} from '../data/fallbackData.js'

const router = express.Router()
const isMongoConnected = () => mongoose.connection.readyState === 1

// GET /api/perfumes - Get all perfumes with filters
router.get('/', async (req, res) => {
  try {
    const { category, type, brand, priceRange, gender, limit = 150, page = 1 } = req.query
    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)

    const query = {}
    if (category) query.category = category
    if (type) query.type = type
    if (brand) query.brand = brand
    if (priceRange) query.priceRange = priceRange
    if (gender) query.gender = gender

    if (!isMongoConnected()) {
      const allPerfumes = filterFallbackPerfumes(query)
      const skip = (pageNumber - 1) * limitNumber
      const perfumes = allPerfumes.slice(skip, skip + limitNumber)

      return res.json({
        success: true,
        data: perfumes,
        source: 'fallback',
        pagination: fallbackPagination({ page: pageNumber, limit: limitNumber, total: allPerfumes.length })
      })
    }

    const skip = (pageNumber - 1) * limitNumber

    const perfumes = await Perfume.find(query)
      .populate('brand', 'name origin type')
      .populate('notes.top notes.middle notes.base', 'name category')
      .limit(limitNumber)
      .skip(skip)
      .sort({ createdAt: -1 })

    const total = await Perfume.countDocuments(query)

    res.json({
      success: true,
      data: perfumes,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: Math.ceil(total / limitNumber)
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/perfumes/search - Search perfumes
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query required' })
    }

    if (!isMongoConnected()) {
      return res.json({ success: true, data: searchFallbackPerfumes(q), source: 'fallback' })
    }

    // Search by name (case-insensitive)
    const perfumes = await Perfume.find({
      name: { $regex: q, $options: 'i' }
    })
      .populate('brand', 'name origin type')
      .populate('notes.top notes.middle notes.base', 'name category')
      .limit(20)

    res.json({ success: true, data: perfumes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/perfumes/:id - Get single perfume
router.get('/:id', async (req, res) => {
  try {
    if (!isMongoConnected()) {
      const perfume = getFallbackPerfume(req.params.id)

      if (!perfume) {
        return res.status(404).json({ success: false, message: 'Perfume not found' })
      }

      return res.json({ success: true, data: perfume, source: 'fallback' })
    }

    const perfume = await Perfume.findById(req.params.id)
      .populate('brand', 'name origin type website description')
      .populate('notes.top notes.middle notes.base', 'name category description')

    if (!perfume) {
      return res.status(404).json({ success: false, message: 'Perfume not found' })
    }

    res.json({ success: true, data: perfume })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/perfumes - Create new perfume (admin)
router.post('/', async (req, res) => {
  try {
    const perfume = new Perfume(req.body)
    await perfume.save()
    res.status(201).json({ success: true, data: perfume })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

export default router
