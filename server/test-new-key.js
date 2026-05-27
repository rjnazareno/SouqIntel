import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

async function testNewKey() {
  console.log('🔑 Testing NEW Gemini API Key...')
  console.log('Key present:', !!process.env.GEMINI_API_KEY)

  const modelsToTry = [
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-pro',
    'gemini-1.0-pro-latest'
  ]

  for (const modelName of modelsToTry) {
    try {
      console.log(`🚀 Testing model: ${modelName}`)

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: modelName })

      const result = await model.generateContent('What is oud in perfumes?')
      const response = await result.response
      const text = response.text()

      console.log(`✅ SUCCESS with ${modelName}!`)
      console.log('AI Response:', text.substring(0, 100) + '...')
      console.log(`\n🎉 WORKING MODEL FOUND: ${modelName}`)
      return modelName
    } catch (error) {
      console.log(`❌ ${modelName} failed:`, error.message.split('\n')[0])
    }
  }

  console.log('\n❌ No working models found')
  return null
}

testNewKey().then(workingModel => {
  if (workingModel) {
    console.log(`\n📝 Update chatbot.js to use: ${workingModel}`)
  }
})