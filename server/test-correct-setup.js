import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

async function testCorrectSetup() {
  console.log('🔑 Testing Gemini API with correct setup...')

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    // Try the most basic model name without version specifiers
    const modelsToTry = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'models/gemini-pro',
      'models/gemini-1.5-pro'
    ]

    for (const modelName of modelsToTry) {
      try {
        console.log(`🚀 Testing: ${modelName}`)

        const model = genAI.getGenerativeModel({
          model: modelName,
        })

        const result = await model.generateContent("What is oud in perfumery?")
        const response = result.response
        const text = response.text()

        console.log(`✅ SUCCESS with ${modelName}!`)
        console.log('Response:', text.substring(0, 150) + '...')

        return modelName
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message.substring(0, 80)}...`)
      }
    }

    console.log('\n🔧 Trying different approach...')

    // Try without specifying model version
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const prompt = "Hello, are you working?"

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    console.log('✅ Basic test SUCCESS!')
    console.log('Response:', text)

    return 'gemini-pro'

  } catch (error) {
    console.log('❌ All tests failed:', error.message)
    return null
  }
}

testCorrectSetup().then(workingModel => {
  if (workingModel) {
    console.log(`\n🎉 WORKING MODEL: ${workingModel}`)
    console.log('Will update chatbot to use this model...')
  } else {
    console.log('\n💡 Suggestion: Try OpenAI instead - it\'s more reliable')
  }
})