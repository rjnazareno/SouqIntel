import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '30d' }
  )
}

// Auth middleware
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')

    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }

    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    })
  }
}

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }

    // Create user
    const user = new User({ email, password, name })
    await user.save()

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/auth/me - Get current user
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, data: req.user })
})

export default router
