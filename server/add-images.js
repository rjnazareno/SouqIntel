import fs from 'fs'

// Array of Unsplash perfume bottle images
const perfumeImages = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80',
  'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&q=80',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80',
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&q=80',
  'https://images.unsplash.com/photo-1541108564493-a35eaa7bb6e1?w=500&q=80',
  'https://images.unsplash.com/photo-1610965225925-41ee0cb0241f?w=500&q=80',
  'https://images.unsplash.com/photo-1595425970377-c9703cf48b6e?w=500&q=80',
  'https://images.unsplash.com/photo-1594035910155-9664d03d6082?w=500&q=80',
  'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=500&q=80',
  'https://images.unsplash.com/photo-1615634759707-0d2338acba97?w=500&q=80',
  'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
  'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&q=80',
  'https://images.unsplash.com/photo-1596542679888-30f8e00c905f?w=500&q=80',
  'https://images.unsplash.com/photo-1623044964438-50332dd3e493?w=500&q=80',
  'https://images.unsplash.com/photo-1581362072978-14998d01fdaa?w=500&q=80',
  'https://images.unsplash.com/photo-1619994121345-b81a6f6e6e1d?w=500&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80',
  'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=500&q=80',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500&q=80',
  'https://images.unsplash.com/photo-1610965225925-41ee0cb0241f?w=500&q=80',
  'https://images.unsplash.com/photo-1547887538-047f814bfb64?w=500&q=80',
  'https://images.unsplash.com/photo-1582274528667-1e8a10ded835?w=500&q=80',
  'https://images.unsplash.com/photo-1549112206-2e852a5ad238?w=500&q=80',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80',
  'https://images.unsplash.com/photo-1541693309450-c2b16c27ad2c?w=500&q=80',
  'https://images.unsplash.com/photo-1592274544796-e6ae9feeba4c?w=500&q=80',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80',
  'https://images.unsplash.com/photo-1615634759692-945f42ade5e3?w=500&q=80',
]

// Read the seed file
let content = fs.readFileSync('./src/seed.js', 'utf8')

// Pattern to match perfume objects without imageUrl
const perfumePattern = /({\s*name:\s*'[^']+',[\s\S]*?description:\s*'[^']*')\s*\n(\s*)}/g

let imageIndex = 0
content = content.replace(perfumePattern, (match, perfumeData, indentation) => {
  // Skip if already has imageUrl
  if (match.includes('imageUrl:')) {
    return match
  }

  // Add imageUrl before the closing brace
  const imageUrl = perfumeImages[imageIndex % perfumeImages.length]
  imageIndex++

  return `${perfumeData},\n${indentation}imageUrl: '${imageUrl}'\n${indentation}}`
})

// Write back to file
fs.writeFileSync('./src/seed.js', content)

console.log(`✅ Added image URLs to perfumes (used ${Math.min(imageIndex, perfumeImages.length)} unique images)`)
