import express from 'express'
import mongoose from 'mongoose'
import Brand from '../models/Brand.js'
import { getFallbackBrands } from '../data/fallbackData.js'

const router = express.Router()
const isMongoConnected = () => mongoose.connection.readyState === 1

// GET /api/brands - Get all brands
router.get('/', async (req, res) => {
  try {
    const { type } = req.query
    const query = type ? { type } : {}

    if (!isMongoConnected()) {
      return res.json({ success: true, data: getFallbackBrands(type), source: 'fallback' })
    }

    const brands = await Brand.find(query).sort({ name: 1 })

    res.json({ success: true, data: brands })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/brands/:id - Get single brand
router.get('/:id', async (req, res) => {
  try {
    if (!isMongoConnected()) {
      const brand = getFallbackBrands().find((item) => item._id === req.params.id)

      if (!brand) {
        return res.status(404).json({ success: false, message: 'Brand not found' })
      }

      return res.json({ success: true, data: brand, source: 'fallback' })
    }

    const brand = await Brand.findById(req.params.id)

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' })
    }

    res.json({ success: true, data: brand })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/brands - Create new brand
router.post('/', async (req, res) => {
  try {
    const brand = new Brand(req.body)
    await brand.save()
    res.status(201).json({ success: true, data: brand })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

export default router
