import mongoose from 'mongoose'

const dupeRelationSchema = new mongoose.Schema({
  original: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perfume',
    required: true
  },
  dupe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perfume',
    required: true
  },
  similarityScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  priceComparison: {
    originalPrice: {
      type: Number,
      default: 0
    },
    dupePrice: {
      type: Number,
      default: 0
    },
    savings: {
      type: Number,
      default: 0
    }
  },
  userVotes: {
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    }
  },
  verifiedBy: {
    type: String,
    enum: ['community', 'expert', 'ai'],
    default: 'community'
  }
}, {
  timestamps: true
})

// Ensure no duplicate relationships
dupeRelationSchema.index({ original: 1, dupe: 1 }, { unique: true })

const DupeRelation = mongoose.model('DupeRelation', dupeRelationSchema)

export default DupeRelation
