import express from 'express'
import Perfume from '../models/Perfume.js'

const router = express.Router()

// GET /api/perfumes - Get all perfumes with filters
router.get('/', async (req, res) => {
  try {
    const { category, type, brand, priceRange, gender, limit = 50, page = 1 } = req.query

    const query = {}
    if (category) query.category = category
    if (type) query.type = type
    if (brand) query.brand = brand
    if (priceRange) query.priceRange = priceRange
    if (gender) query.gender = gender

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const perfumes = await Perfume.find(query)
      .populate('brand', 'name origin type')
      .populate('notes.top notes.middle notes.base', 'name category')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 })

    const total = await Perfume.countDocuments(query)

    res.json({
      success: true,
      data: perfumes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
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
