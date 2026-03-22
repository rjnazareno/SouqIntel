import mongoose from 'mongoose'

const perfumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  type: {
    type: String,
    enum: ['designer', 'niche', 'arabian', 'clone'],
    required: true
  },
  category: {
    type: String,
    enum: ['oud', 'musk', 'floral', 'amber', 'spicy', 'fresh', 'woody', 'oriental'],
    required: true
  },
  gender: {
    type: String,
    enum: ['masculine', 'feminine', 'unisex'],
    default: 'unisex'
  },
  notes: {
    top: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }],
    middle: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }],
    base: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }]
  },
  priceRange: {
    type: String,
    enum: ['budget', 'mid', 'luxury'],
    required: true
  },
  concentration: {
    type: String,
    enum: ['EDT', 'EDP', 'Parfum', 'Oil', 'Extrait'],
    default: 'EDP'
  },
  longevity: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  sillage: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  imageUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

// Index for search
perfumeSchema.index({ name: 'text', description: 'text' })

const Perfume = mongoose.model('Perfume', perfumeSchema)

export default Perfume
