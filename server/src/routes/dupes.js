import express from 'express'
import mongoose from 'mongoose'
import DupeRelation from '../models/DupeRelation.js'
import Perfume from '../models/Perfume.js'
import { getFallbackDupes, getPopularFallbackDupes } from '../data/fallbackData.js'

const router = express.Router()
const isMongoConnected = () => mongoose.connection.readyState === 1

// GET /api/dupes/popular - Get popular dupe pairs
router.get('/popular', async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.json({ success: true, data: getPopularFallbackDupes(), source: 'fallback' })
    }

    const dupes = await DupeRelation.find()
      .populate({
        path: 'original',
        populate: { path: 'brand', select: 'name' }
      })
      .populate({
        path: 'dupe',
        populate: { path: 'brand', select: 'name' }
      })
      .sort({ 'userVotes.upvotes': -1 })
      .limit(10)

    res.json({ success: true, data: dupes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/dupes/:perfumeId - Get dupes for a specific perfume
router.get('/:perfumeId', async (req, res) => {
  try {
    const { perfumeId } = req.params

    if (!isMongoConnected()) {
      return res.json({ success: true, data: getFallbackDupes(perfumeId), source: 'fallback' })
    }

    const dupes = await DupeRelation.find({
      $or: [
        { original: perfumeId },
        { dupe: perfumeId }
      ]
    })
      .populate({
        path: 'original',
        populate: [
          { path: 'brand', select: 'name origin type' },
          { path: 'notes.top notes.middle notes.base', select: 'name category' }
        ]
      })
      .populate({
        path: 'dupe',
        populate: [
          { path: 'brand', select: 'name origin type' },
          { path: 'notes.top notes.middle notes.base', select: 'name category' }
        ]
      })
      .sort({ similarityScore: -1 })

    res.json({ success: true, data: dupes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/dupes - Create new dupe relationship
router.post('/', async (req, res) => {
  try {
    const { original, dupe, similarityScore, priceComparison } = req.body

    // Verify both perfumes exist
    const [originalPerfume, dupePerfume] = await Promise.all([
      Perfume.findById(original),
      Perfume.findById(dupe)
    ])

    if (!originalPerfume || !dupePerfume) {
      return res.status(404).json({
        success: false,
        message: 'One or both perfumes not found'
      })
    }

    const dupeRelation = new DupeRelation({
      original,
      dupe,
      similarityScore,
      priceComparison
    })

    await dupeRelation.save()
    res.status(201).json({ success: true, data: dupeRelation })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This dupe relationship already exists'
      })
    }
    res.status(400).json({ success: false, message: error.message })
  }
})

// POST /api/dupes/:id/vote - Vote on a dupe
router.post('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params
    const { vote } = req.body // 'up' or 'down'

    if (!['up', 'down'].includes(vote)) {
      return res.status(400).json({
        success: false,
        message: 'Vote must be "up" or "down"'
      })
    }

    const update = vote === 'up'
      ? { $inc: { 'userVotes.upvotes': 1 } }
      : { $inc: { 'userVotes.downvotes': 1 } }

    const dupeRelation = await DupeRelation.findByIdAndUpdate(
      id,
      update,
      { new: true }
    )

    if (!dupeRelation) {
      return res.status(404).json({
        success: false,
        message: 'Dupe relation not found'
      })
    }

    res.json({ success: true, data: dupeRelation })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
