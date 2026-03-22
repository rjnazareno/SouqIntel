import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  origin: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['arabian', 'designer', 'niche'],
    required: true
  },
  website: {
    type: String,
    default: ''
  },
  logoUrl: {
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

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
