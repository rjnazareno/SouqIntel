import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/souqintel')

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    console.warn('⚠️  API will continue with local fallback data until MongoDB is available.')
  }
}

export default connectDB
