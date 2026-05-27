import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../client/public/images/perfumes')
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// Read the perfume image URLs JSON
const perfumeUrls = JSON.parse(fs.readFileSync('./perfume-image-urls.json', 'utf8'))

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)

    const protocol = url.startsWith('https') ? https : require('http')

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject)
      }

      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(filepath)
        })
      } else {
        file.close()
        fs.unlinkSync(filepath)
        reject(new Error(`Failed to download: ${response.statusCode}`))
      }
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
      }
      reject(err)
    })
  })
}

// Function to get file extension from URL
function getFileExtension(url) {
  const urlPath = new URL(url).pathname
  const ext = path.extname(urlPath).toLowerCase()
  // Default to .jpg if no extension or if it's a query string
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg'
}

// Main function
async function main() {
  console.log('🖼️  Starting image download...\n')

  let downloadedCount = 0
  let skippedCount = 0
  let failedCount = 0
  const imageMapping = {}

  for (const [perfumeName, imageUrl] of Object.entries(perfumeUrls)) {
    // Skip if no URL provided
    if (!imageUrl || imageUrl.trim() === '') {
      skippedCount++
      continue
    }

    // Generate filename from perfume name
    const baseFilename = perfumeName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const extension = getFileExtension(imageUrl)
    const filename = `${baseFilename}${extension}`
    const filepath = path.join(imagesDir, filename)

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${perfumeName} - already exists`)
      imageMapping[perfumeName] = `/images/perfumes/${filename}`
      downloadedCount++
      continue
    }

    try {
      await downloadImage(imageUrl, filepath)
      console.log(`✓ ${perfumeName} - downloaded successfully`)
      imageMapping[perfumeName] = `/images/perfumes/${filename}`
      downloadedCount++

      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.log(`✗ ${perfumeName} - failed: ${error.message}`)
      failedCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:')
  console.log(`   ✅ Downloaded: ${downloadedCount}`)
  console.log(`   ⏭️  Skipped (no URL): ${skippedCount}`)
  console.log(`   ❌ Failed: ${failedCount}`)
  console.log('='.repeat(50))

  if (downloadedCount > 0) {
    // Save mapping to JSON
    fs.writeFileSync(
      './image-mapping.json',
      JSON.stringify(imageMapping, null, 2)
    )
    console.log('\n✅ Image mapping saved to image-mapping.json')
    console.log('\n📝 Next steps:')
    console.log('   1. Run: node update-seed-with-images.js')
    console.log('   2. Run: npm run seed')
  } else {
    console.log('\n⚠️  No images were downloaded. Add URLs to perfume-image-urls.json first.')
  }
}

main().catch(console.error)
