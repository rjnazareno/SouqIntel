import express from 'express'
import Note from '../models/Note.js'

const router = express.Router()

// GET /api/notes - Get all notes
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const query = category ? { category } : {}

    const notes = await Note.find(query).sort({ name: 1 })

    res.json({ success: true, data: notes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/notes/:id - Get single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' })
    }

    res.json({ success: true, data: note })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/notes - Create new note
router.post('/', async (req, res) => {
  try {
    const note = new Note(req.body)
    await note.save()
    res.status(201).json({ success: true, data: note })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

export default router
