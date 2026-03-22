import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  preferences: {
    favoriteNotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }],
    favoriteCategories: [{
      type: String
    }],
    pricePreference: {
      type: String,
      enum: ['budget', 'mid', 'luxury', 'any'],
      default: 'any'
    }
  },
  savedPerfumes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perfume'
  }]
}, {
  timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

const User = mongoose.model('User', userSchema)

export default User
