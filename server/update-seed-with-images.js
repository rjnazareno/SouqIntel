import fs from 'fs'

// Read the image mapping
const imageMap = JSON.parse(fs.readFileSync('./image-mapping.json', 'utf8'))

// Read the seed file
let seedContent = fs.readFileSync('./src/seed.js', 'utf8')

// Function to escape regex special characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Add imageUrl to each perfume
let updatedCount = 0
for (const [perfumeName, imagePath] of Object.entries(imageMap)) {
  const escapedName = escapeRegex(perfumeName)

  // Pattern to match the perfume object and add imageUrl before closing brace
  const pattern = new RegExp(
    `(name:\\s*'${escapedName}',[\\s\\S]*?description:\\s*'[^']*')\\s*\\n(\\s*)}`,
    'g'
  )

  const replacement = `$1,\n$2imageUrl: '${imagePath}'\n$2}`

  const newContent = seedContent.replace(pattern, replacement)

  if (newContent !== seedContent) {
    seedContent = newContent
    updatedCount++
    console.log(`✓ Added image for: ${perfumeName}`)
  }
}

// Write back to seed file
fs.writeFileSync('./src/seed.js', seedContent)

console.log(`\n✅ Updated ${updatedCount} perfumes with image paths in seed.js`)
console.log('\nRun "npm run seed" to update the database')
