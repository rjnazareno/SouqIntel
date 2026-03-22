import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['woody', 'floral', 'spicy', 'citrus', 'oriental', 'fresh', 'gourmand', 'animalic'],
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

const Note = mongoose.model('Note', noteSchema)

export default Note
