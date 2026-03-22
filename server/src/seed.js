import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Brand from './models/Brand.js'
import Note from './models/Note.js'
import Perfume from './models/Perfume.js'
import DupeRelation from './models/DupeRelation.js'

dotenv.config()

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/souqintel')
    console.log('📦 MongoDB Connected for seeding')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

// Notes data
const notesData = [
  // Woody
  { name: 'Oud', category: 'woody', description: 'Rich, deep woody note from agarwood' },
  { name: 'Sandalwood', category: 'woody', description: 'Creamy, soft woody note' },
  { name: 'Cedar', category: 'woody', description: 'Dry, pencil-like woody note' },
  { name: 'Vetiver', category: 'woody', description: 'Earthy, smoky woody note' },
  { name: 'Patchouli', category: 'woody', description: 'Dark, earthy woody note' },
  { name: 'Guaiac Wood', category: 'woody', description: 'Smoky, sweet woody note' },

  // Floral
  { name: 'Rose', category: 'floral', description: 'Classic romantic floral' },
  { name: 'Jasmine', category: 'floral', description: 'Rich, intoxicating white floral' },
  { name: 'Iris', category: 'floral', description: 'Powdery, elegant floral' },
  { name: 'Orange Blossom', category: 'floral', description: 'Fresh, honeyed white floral' },
  { name: 'Tuberose', category: 'floral', description: 'Intense, creamy white floral' },
  { name: 'Ylang-Ylang', category: 'floral', description: 'Sweet, exotic tropical floral' },

  // Spicy
  { name: 'Saffron', category: 'spicy', description: 'Precious, leathery spice' },
  { name: 'Cinnamon', category: 'spicy', description: 'Warm, sweet spice' },
  { name: 'Cardamom', category: 'spicy', description: 'Aromatic, fresh spice' },
  { name: 'Pepper', category: 'spicy', description: 'Sharp, peppery spice' },
  { name: 'Nutmeg', category: 'spicy', description: 'Warm, sweet aromatic spice' },
  { name: 'Clove', category: 'spicy', description: 'Warm, medicinal spice' },
  { name: 'Ginger', category: 'spicy', description: 'Fresh, zesty spice' },

  // Citrus
  { name: 'Bergamot', category: 'citrus', description: 'Fresh, slightly bitter citrus' },
  { name: 'Lemon', category: 'citrus', description: 'Bright, zesty citrus' },
  { name: 'Orange', category: 'citrus', description: 'Sweet, juicy citrus' },
  { name: 'Grapefruit', category: 'citrus', description: 'Fresh, slightly bitter citrus' },
  { name: 'Lime', category: 'citrus', description: 'Sharp, green citrus' },
  { name: 'Mandarin', category: 'citrus', description: 'Sweet, tangy citrus' },

  // Oriental
  { name: 'Amber', category: 'oriental', description: 'Warm, resinous, sweet' },
  { name: 'Benzoin', category: 'oriental', description: 'Sweet, vanilla-like resin' },
  { name: 'Frankincense', category: 'oriental', description: 'Sacred, citrusy resin' },
  { name: 'Myrrh', category: 'oriental', description: 'Warm, slightly bitter resin' },
  { name: 'Labdanum', category: 'oriental', description: 'Leathery, ambery resin' },

  // Fresh
  { name: 'Lavender', category: 'fresh', description: 'Aromatic, herbal fresh note' },
  { name: 'Mint', category: 'fresh', description: 'Cool, refreshing green note' },
  { name: 'Marine Notes', category: 'fresh', description: 'Oceanic, aquatic freshness' },
  { name: 'Green Notes', category: 'fresh', description: 'Fresh cut grass, leaves' },

  // Gourmand
  { name: 'Vanilla', category: 'gourmand', description: 'Sweet, creamy bean' },
  { name: 'Caramel', category: 'gourmand', description: 'Sweet, buttery sugar' },
  { name: 'Chocolate', category: 'gourmand', description: 'Rich, sweet cocoa' },
  { name: 'Coffee', category: 'gourmand', description: 'Roasted, bitter bean' },
  { name: 'Honey', category: 'gourmand', description: 'Sweet, golden nectar' },
  { name: 'Praline', category: 'gourmand', description: 'Sweet, nutty confection' },

  // Animalic
  { name: 'Musk', category: 'animalic', description: 'Warm, skin-like sensuality' },
  { name: 'Leather', category: 'animalic', description: 'Rich, smoky animal hide' },
  { name: 'Castoreum', category: 'animalic', description: 'Leathery, animalic depth' },
  { name: 'Civet', category: 'animalic', description: 'Animalic, musky warmth' },
  { name: 'Ambergris', category: 'animalic', description: 'Marine, sweet, animalic' },

  // Additional notes
  { name: 'Orchid', category: 'floral', description: 'Exotic, tropical floral' },
  { name: 'Tobacco', category: 'oriental', description: 'Rich, aromatic dried leaves' },
  { name: 'Rum', category: 'gourmand', description: 'Sweet, boozy spirit' },
  { name: 'Sage', category: 'fresh', description: 'Herbal, aromatic green note' },
  { name: 'Peony', category: 'floral', description: 'Delicate, romantic floral' },
  { name: 'Coriander', category: 'spicy', description: 'Fresh, slightly citrusy spice' },
  { name: 'Tonka', category: 'gourmand', description: 'Sweet, almond-vanilla bean' },
  { name: 'Cocoa', category: 'gourmand', description: 'Rich, dark chocolate note' },
  { name: 'Violet', category: 'floral', description: 'Powdery, sweet floral' },
  { name: 'Cypress', category: 'woody', description: 'Fresh, evergreen woody note' },
  { name: 'Oregano', category: 'fresh', description: 'Aromatic, herbal Mediterranean note' }
]

// Brands data
const brandsData = [
  // Arabian Brands
  { name: 'Lattafa', origin: 'UAE', type: 'arabian', description: 'Popular UAE brand known for quality clones' },
  { name: 'Swiss Arabian', origin: 'UAE', type: 'arabian', description: 'Premium Arabian perfume house' },
  { name: 'Armaf', origin: 'UAE', type: 'arabian', description: 'Known for excellent designer dupes' },
  { name: 'Rasasi', origin: 'UAE', type: 'arabian', description: 'Established UAE fragrance house' },
  { name: 'Al Haramain', origin: 'UAE', type: 'arabian', description: 'Traditional Arabian perfumery' },
  { name: 'Arabian Oud', origin: 'Saudi Arabia', type: 'arabian', description: 'Luxury Arabian oud house' },
  { name: 'Ajmal', origin: 'UAE', type: 'arabian', description: 'Historic Arabian perfume brand' },
  { name: 'Afnan', origin: 'UAE', type: 'arabian', description: 'Modern Arabian fragrance house' },
  { name: 'Fragrance World', origin: 'UAE', type: 'arabian', description: 'Affordable Arabian clones' },
  { name: 'Paris Corner', origin: 'UAE', type: 'arabian', description: 'High-quality Arabian perfumes' },

  // Designer Brands
  { name: 'Dior', origin: 'France', type: 'designer', description: 'Iconic French fashion house' },
  { name: 'Chanel', origin: 'France', type: 'designer', description: 'Legendary French luxury brand' },
  { name: 'Tom Ford', origin: 'USA', type: 'designer', description: 'American luxury fashion brand' },
  { name: 'Yves Saint Laurent', origin: 'France', type: 'designer', description: 'French fashion house' },
  { name: 'Versace', origin: 'Italy', type: 'designer', description: 'Italian luxury fashion' },
  { name: 'Dolce & Gabbana', origin: 'Italy', type: 'designer', description: 'Italian fashion house' },
  { name: 'Giorgio Armani', origin: 'Italy', type: 'designer', description: 'Italian luxury brand' },
  { name: 'Prada', origin: 'Italy', type: 'designer', description: 'Italian luxury fashion' },
  { name: 'Gucci', origin: 'Italy', type: 'designer', description: 'Italian luxury fashion house' },
  { name: 'Burberry', origin: 'UK', type: 'designer', description: 'British luxury fashion' },
  { name: 'Lalique', origin: 'France', type: 'designer', description: 'French crystal and perfume house' },
  { name: 'Carolina Herrera', origin: 'USA', type: 'designer', description: 'Venezuelan-American fashion house' },

  // Niche Brands
  { name: 'Maison Francis Kurkdjian', origin: 'France', type: 'niche', description: 'French niche perfumery' },
  { name: 'Creed', origin: 'UK', type: 'niche', description: 'Historic British niche house' },
  { name: 'Amouage', origin: 'Oman', type: 'niche', description: 'Luxury Omani perfume house' },
  { name: 'Initio', origin: 'France', type: 'niche', description: 'French niche brand' },
  { name: 'Parfums de Marly', origin: 'France', type: 'niche', description: 'French equestrian-inspired niche' },
  { name: 'Xerjoff', origin: 'Italy', type: 'niche', description: 'Italian luxury niche house' },
  { name: 'Byredo', origin: 'Sweden', type: 'niche', description: 'Swedish modern niche brand' },
  { name: 'Le Labo', origin: 'USA', type: 'niche', description: 'New York artisanal niche' },
  { name: 'Memo Paris', origin: 'France', type: 'niche', description: 'Travel-inspired French niche' },
  { name: 'Nishane', origin: 'Turkey', type: 'niche', description: 'Turkish niche perfume house' },
  { name: 'Louis Vuitton', origin: 'France', type: 'niche', description: 'French luxury fashion house' }
]

// Main seed function
const seedDatabase = async () => {
  try {
    await connectDB()

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Promise.all([
      Brand.deleteMany({}),
      Note.deleteMany({}),
      Perfume.deleteMany({}),
      DupeRelation.deleteMany({})
    ])

    // Insert notes
    console.log('🌿 Seeding notes...')
    const notes = await Note.insertMany(notesData)
    const noteMap = notes.reduce((acc, note) => {
      acc[note.name] = note._id
      return acc
    }, {})

    // Insert brands
    console.log('🏷️  Seeding brands...')
    const brands = await Brand.insertMany(brandsData)
    const brandMap = brands.reduce((acc, brand) => {
      acc[brand.name] = brand._id
      return acc
    }, {})

    // Perfumes data with real fragrance information
    const perfumesData = [
      // Designer/Niche originals
      {
        name: 'Baccarat Rouge 540',
        brand: brandMap['Maison Francis Kurkdjian'],
        type: 'niche',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Jasmine']],
          middle: [noteMap['Ambergris'], noteMap['Cedar']],
          base: [noteMap['Amber'], noteMap['Musk']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'A luminous, sophisticated amber fragrance with saffron and cedar'
      },
      {
        name: 'Aventus',
        brand: brandMap['Creed'],
        type: 'niche',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Pepper'], noteMap['Ginger']],
          middle: [noteMap['Rose'], noteMap['Jasmine']],
          base: [noteMap['Musk'], noteMap['Sandalwood'], noteMap['Patchouli']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 8,
        description: 'Bold, masculine scent celebrating strength and success'
      },
      {
        name: 'Oud Wood',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cardamom'], noteMap['Pepper']],
          middle: [noteMap['Oud'], noteMap['Rose'], noteMap['Sandalwood']],
          base: [noteMap['Vetiver'], noteMap['Amber']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Rare, exotic oud blended with sandalwood and vetiver'
      },
      {
        name: 'Sauvage',
        brand: brandMap['Dior'],
        type: 'designer',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Pepper']],
          middle: [noteMap['Lavender'], noteMap['Vetiver']],
          base: [noteMap['Ambergris'], noteMap['Cedar']]
        },
        priceRange: 'mid',
        concentration: 'EDT',
        longevity: 8,
        sillage: 8,
        description: 'Fresh, raw masculinity inspired by wide-open spaces'
      },
      {
        name: 'La Nuit de L\'Homme',
        brand: brandMap['Yves Saint Laurent'],
        type: 'designer',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cardamom'], noteMap['Bergamot']],
          middle: [noteMap['Cedar'], noteMap['Lavender']],
          base: [noteMap['Vetiver'], noteMap['Vanilla']]
        },
        priceRange: 'mid',
        concentration: 'EDT',
        longevity: 6,
        sillage: 6,
        description: 'Seductive nighttime fragrance with cardamom and cedar'
      },
      {
        name: 'Interlude Man',
        brand: brandMap['Amouage'],
        type: 'niche',
        category: 'oud',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Oregano']],
          middle: [noteMap['Frankincense'], noteMap['Oud'], noteMap['Amber']],
          base: [noteMap['Sandalwood'], noteMap['Musk'], noteMap['Leather']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 10,
        sillage: 10,
        description: 'Powerful, smoky oud masterpiece'
      },
      {
        name: 'Side Effect',
        brand: brandMap['Initio'],
        type: 'niche',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Rum']],
          middle: [noteMap['Tobacco'], noteMap['Vanilla']],
          base: [noteMap['Musk'], noteMap['Benzoin']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'Addictive tobacco-vanilla creation'
      },
      {
        name: 'Layton',
        brand: brandMap['Parfums de Marly'],
        type: 'niche',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Mandarin']],
          middle: [noteMap['Lavender'], noteMap['Jasmine']],
          base: [noteMap['Vanilla'], noteMap['Sandalwood'], noteMap['Cardamom']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Noble, sophisticated apple and lavender fragrance'
      },
      {
        name: 'Tobacco Vanille',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Tobacco'], noteMap['Ginger']],
          middle: [noteMap['Vanilla'], noteMap['Cinnamon'], noteMap['Clove']],
          base: [noteMap['Benzoin'], noteMap['Honey']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Opulent blend of tobacco and vanilla'
      },
      {
        name: 'Noir de Noir',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'floral',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Rose']],
          middle: [noteMap['Oud'], noteMap['Vanilla']],
          base: [noteMap['Patchouli'], noteMap['Amber']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Dark, sexy rose and oud composition'
      },
      {
        name: 'Black Orchid',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'oriental',
        gender: 'feminine',
        notes: {
          top: [noteMap['Jasmine'], noteMap['Bergamot']],
          middle: [noteMap['Ylang-Ylang'], noteMap['Orchid']],
          base: [noteMap['Patchouli'], noteMap['Vanilla'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Luxurious, sensual dark floral'
      },
      {
        name: 'Eros',
        brand: brandMap['Versace'],
        type: 'designer',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Mint'], noteMap['Lemon'], noteMap['Green Notes']],
          middle: [noteMap['Ambergris'], noteMap['Vanilla']],
          base: [noteMap['Vetiver'], noteMap['Cedar'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDT',
        longevity: 7,
        sillage: 8,
        description: 'Fresh, invigorating scent of passion'
      },
      {
        name: 'Bleu de Chanel',
        brand: brandMap['Chanel'],
        type: 'designer',
        category: 'woody',
        gender: 'masculine',
        notes: {
          top: [noteMap['Lemon'], noteMap['Bergamot'], noteMap['Mint']],
          middle: [noteMap['Ginger'], noteMap['Jasmine'], noteMap['Nutmeg']],
          base: [noteMap['Sandalwood'], noteMap['Cedar'], noteMap['Vetiver']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Refined, woody aromatic fragrance'
      },
      {
        name: 'The One',
        brand: brandMap['Dolce & Gabbana'],
        type: 'designer',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Grapefruit'], noteMap['Coriander'], noteMap['Ginger']],
          middle: [noteMap['Cedar'], noteMap['Orange Blossom']],
          base: [noteMap['Tobacco'], noteMap['Amber'], noteMap['Labdanum']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 7,
        sillage: 6,
        description: 'Elegant, spicy tobacco fragrance'
      },
      {
        name: 'Acqua di Gio Profumo',
        brand: brandMap['Giorgio Armani'],
        type: 'designer',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Marine Notes']],
          middle: [noteMap['Amber'], noteMap['Jasmine']],
          base: [noteMap['Patchouli'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Modern aquatic fragrance with amber depth'
      },

      // Arabian Dupes
      {
        name: 'Raghba',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Bergamot']],
          middle: [noteMap['Jasmine'], noteMap['Cedar']],
          base: [noteMap['Amber'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 8,
        description: 'Luxurious amber-saffron composition, excellent BR540 alternative'
      },
      {
        name: 'Club de Nuit Intense Man',
        brand: brandMap['Armaf'],
        type: 'arabian',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Lemon'], noteMap['Bergamot'], noteMap['Pepper']],
          middle: [noteMap['Rose'], noteMap['Jasmine']],
          base: [noteMap['Musk'], noteMap['Patchouli'], noteMap['Sandalwood']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'Powerful Aventus alternative with exceptional performance'
      },
      {
        name: 'Khamrah',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Nutmeg']],
          middle: [noteMap['Praline'], noteMap['Vanilla']],
          base: [noteMap['Benzoin'], noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'Rich, boozy praline with cinnamon spice'
      },
      {
        name: 'Asad',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'woody',
        gender: 'masculine',
        notes: {
          top: [noteMap['Pepper'], noteMap['Tobacco']],
          middle: [noteMap['Amber'], noteMap['Coffee']],
          base: [noteMap['Vanilla'], noteMap['Sandalwood'], noteMap['Benzoin']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Beast mode tobacco-coffee-vanilla powerhouse'
      },
      {
        name: 'Oud for Glory',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cardamom'], noteMap['Pepper']],
          middle: [noteMap['Oud'], noteMap['Rose']],
          base: [noteMap['Sandalwood'], noteMap['Amber'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 8,
        description: 'Excellent Oud Wood alternative with great performance'
      },
      {
        name: 'Amber Oud Gold Edition',
        brand: brandMap['Al Haramain'],
        type: 'arabian',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Cardamom']],
          middle: [noteMap['Amber'], noteMap['Jasmine']],
          base: [noteMap['Oud'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'Luxurious amber-oud with golden warmth'
      },
      {
        name: 'L\'Aventure',
        brand: brandMap['Al Haramain'],
        type: 'arabian',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Pepper']],
          middle: [noteMap['Rose'], noteMap['Jasmine']],
          base: [noteMap['Musk'], noteMap['Patchouli'], noteMap['Vetiver']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Fresh, fruity Aventus-inspired creation'
      },
      {
        name: 'Shahrazade',
        brand: brandMap['Swiss Arabian'],
        type: 'arabian',
        category: 'oriental',
        gender: 'feminine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Saffron']],
          middle: [noteMap['Rose'], noteMap['Jasmine'], noteMap['Oud']],
          base: [noteMap['Amber'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Mysterious, enchanting oriental'
      },
      {
        name: 'Vurv Royce White',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Lemon']],
          middle: [noteMap['Lavender'], noteMap['Mint']],
          base: [noteMap['Musk'], noteMap['Cedar']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 7,
        sillage: 7,
        description: 'Fresh, clean aquatic scent'
      },
      {
        name: 'Fakhar',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cardamom'], noteMap['Bergamot']],
          middle: [noteMap['Cedar'], noteMap['Lavender']],
          base: [noteMap['Vetiver'], noteMap['Vanilla']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Elegant cardamom-lavender composition'
      },
      {
        name: 'Opulent Oud',
        brand: brandMap['Rasasi'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Cardamom']],
          middle: [noteMap['Oud'], noteMap['Rose']],
          base: [noteMap['Sandalwood'], noteMap['Amber']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Rich, opulent oud fragrance'
      },
      {
        name: 'Qasamat Morhaf',
        brand: brandMap['Rasasi'],
        type: 'arabian',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Orange']],
          middle: [noteMap['Rose'], noteMap['Jasmine']],
          base: [noteMap['Amber'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Elegant floral-oriental composition'
      },
      {
        name: 'Dumont Nitro Red',
        brand: brandMap['Paris Corner'],
        type: 'arabian',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Ginger']],
          middle: [noteMap['Cardamom'], noteMap['Lavender']],
          base: [noteMap['Amber'], noteMap['Vanilla']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'Layton-inspired spicy vanilla powerhouse'
      },
      {
        name: 'Afnan Supremacy Silver',
        brand: brandMap['Afnan'],
        type: 'arabian',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Lemon']],
          middle: [noteMap['Ginger'], noteMap['Jasmine']],
          base: [noteMap['Sandalwood'], noteMap['Cedar']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Fresh, invigorating Silver Mountain Water alternative'
      },
      {
        name: 'Oud Mood',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Rose'], noteMap['Saffron']],
          middle: [noteMap['Oud'], noteMap['Amber']],
          base: [noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Oud Rose alternative with great value'
      },
      {
        name: 'Velvet Oud',
        brand: brandMap['Ajmal'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Cardamom']],
          middle: [noteMap['Oud'], noteMap['Rose']],
          base: [noteMap['Sandalwood'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Smooth, velvety oud composition'
      },
      {
        name: 'Wisal',
        brand: brandMap['Ajmal'],
        type: 'arabian',
        category: 'floral',
        gender: 'feminine',
        notes: {
          top: [noteMap['Rose'], noteMap['Jasmine']],
          middle: [noteMap['Ylang-Ylang'], noteMap['Tuberose']],
          base: [noteMap['Sandalwood'], noteMap['Musk'], noteMap['Amber']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Beautiful white floral bouquet'
      },
      {
        name: 'Encre Noire',
        brand: brandMap['Lalique'],
        type: 'designer',
        category: 'woody',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cypress']],
          middle: [noteMap['Vetiver']],
          base: [noteMap['Musk'], noteMap['Castoreum']]
        },
        priceRange: 'budget',
        concentration: 'EDT',
        longevity: 8,
        sillage: 6,
        description: 'Dark, mysterious vetiver composition'
      },
      {
        name: 'Perfume de Marly Oajan',
        brand: brandMap['Parfums de Marly'],
        type: 'niche',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Honey']],
          middle: [noteMap['Rose'], noteMap['Vanilla']],
          base: [noteMap['Benzoin'], noteMap['Amber'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Warm, spicy honey oriental'
      },
      {
        name: 'Ombre Leather',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'woody',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cardamom'], noteMap['Violet']],
          middle: [noteMap['Leather'], noteMap['Jasmine']],
          base: [noteMap['Patchouli'], noteMap['Amber'], noteMap['Musk']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Bold, textured leather fragrance'
      },
      {
        name: 'Bad Boy',
        brand: brandMap['Carolina Herrera'],
        type: 'designer',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Pepper']],
          middle: [noteMap['Sage'], noteMap['Cedar']],
          base: [noteMap['Tonka'], noteMap['Cocoa'], noteMap['Amber']]
        },
        priceRange: 'mid',
        concentration: 'EDT',
        longevity: 7,
        sillage: 7,
        description: 'Edgy, rebellious aromatic fragrance'
      },
      {
        name: 'Supremacy In Oud',
        brand: brandMap['Afnan'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Cardamom']],
          middle: [noteMap['Oud'], noteMap['Saffron'], noteMap['Rose']],
          base: [noteMap['Sandalwood'], noteMap['Amber'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Luxurious oud blend at affordable price'
      },
      {
        name: 'Hayaati',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Bergamot']],
          middle: [noteMap['Jasmine'], noteMap['Rose']],
          base: [noteMap['Amber'], noteMap['Vanilla'], noteMap['Cedar']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 8,
        description: 'Opulent amber fragrance with Middle Eastern flair'
      },
      {
        name: 'Sheikh Al Shuyukh',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Cardamom']],
          middle: [noteMap['Oud'], noteMap['Saffron']],
          base: [noteMap['Sandalwood'], noteMap['Musk'], noteMap['Amber']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Royal oud composition fit for royalty'
      },
      {
        name: 'Ameer Al Oudh Intense',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Cardamom']],
          middle: [noteMap['Oud'], noteMap['Rose']],
          base: [noteMap['Amber'], noteMap['Sandalwood'], noteMap['Leather']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Intense, powerful oud experience'
      },
      {
        name: 'Oud Elite',
        brand: brandMap['Armaf'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Saffron']],
          middle: [noteMap['Oud'], noteMap['Rose'], noteMap['Jasmine']],
          base: [noteMap['Sandalwood'], noteMap['Amber'], noteMap['Vanilla']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Elegant, refined oud composition'
      },
      {
        name: 'Milestone',
        brand: brandMap['Armaf'],
        type: 'arabian',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Lemon']],
          middle: [noteMap['Jasmine'], noteMap['Mint']],
          base: [noteMap['Musk'], noteMap['Cedar'], noteMap['Ambergris']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Fresh, invigorating Green Irish Tweed alternative'
      },
      {
        name: 'Tres Nuit',
        brand: brandMap['Armaf'],
        type: 'arabian',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Lavender']],
          middle: [noteMap['Jasmine'], noteMap['Rose']],
          base: [noteMap['Musk'], noteMap['Sandalwood']]
        },
        priceRange: 'budget',
        concentration: 'EDT',
        longevity: 7,
        sillage: 6,
        description: 'Classic fresh aromatic, GIT alternative'
      },
      {
        name: 'Yara',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'floral',
        gender: 'feminine',
        notes: {
          top: [noteMap['Orange Blossom'], noteMap['Mandarin']],
          middle: [noteMap['Jasmine'], noteMap['Vanilla']],
          base: [noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Sweet, feminine floral gourmand'
      },
      {
        name: 'Yara Tous',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'floral',
        gender: 'feminine',
        notes: {
          top: [noteMap['Rose'], noteMap['Peony']],
          middle: [noteMap['Jasmine'], noteMap['Vanilla']],
          base: [noteMap['Sandalwood'], noteMap['Musk'], noteMap['Praline']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Romantic pink floral gourmand'
      },
      {
        name: 'Badee Al Oud Honor',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Orange']],
          middle: [noteMap['Oud'], noteMap['Rose']],
          base: [noteMap['Amber'], noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 8,
        description: 'Honorable oud composition with citrus opening'
      },
      {
        name: 'Oud Ispahan',
        brand: brandMap['Dior'],
        type: 'designer',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Rose'], noteMap['Saffron']],
          middle: [noteMap['Oud'], noteMap['Labdanum']],
          base: [noteMap['Sandalwood'], noteMap['Amber']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Exotic rose-oud journey to the Middle East'
      },
      // ========== NEW ADDITIONS ==========
      // More Designer/Niche Originals
      {
        name: 'Green Irish Tweed',
        brand: brandMap['Creed'],
        type: 'niche',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Lemon'], noteMap['Bergamot']],
          middle: [noteMap['Iris'], noteMap['Violet']],
          base: [noteMap['Sandalwood'], noteMap['Ambergris'], noteMap['Musk']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Fresh, green classic masculine fragrance'
      },
      {
        name: 'Silver Mountain Water',
        brand: brandMap['Creed'],
        type: 'niche',
        category: 'fresh',
        gender: 'unisex',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Mandarin']],
          middle: [noteMap['Green Notes'], noteMap['Ginger']],
          base: [noteMap['Musk'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 7,
        sillage: 6,
        description: 'Crisp, clean mountain air fragrance'
      },
      {
        name: 'Oud Rose',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Rose'], noteMap['Saffron']],
          middle: [noteMap['Oud'], noteMap['Amber']],
          base: [noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Luxurious rose and oud combination'
      },
      {
        name: 'Lost Cherry',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Ginger']],
          middle: [noteMap['Rose'], noteMap['Jasmine']],
          base: [noteMap['Vanilla'], noteMap['Tonka'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 8,
        sillage: 8,
        description: 'Decadent cherry-almond gourmand'
      },
      {
        name: 'Tuscan Leather',
        brand: brandMap['Tom Ford'],
        type: 'designer',
        category: 'woody',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Cardamom']],
          middle: [noteMap['Leather'], noteMap['Jasmine']],
          base: [noteMap['Amber'], noteMap['Musk'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Bold, smoky Italian leather'
      },
      {
        name: 'Herod',
        brand: brandMap['Parfums de Marly'],
        type: 'niche',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Pepper']],
          middle: [noteMap['Tobacco'], noteMap['Labdanum']],
          base: [noteMap['Vanilla'], noteMap['Musk'], noteMap['Vetiver']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Warm, spicy tobacco masterpiece'
      },
      {
        name: 'Pegasus',
        brand: brandMap['Parfums de Marly'],
        type: 'niche',
        category: 'amber',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Cardamom']],
          middle: [noteMap['Jasmine'], noteMap['Lavender']],
          base: [noteMap['Vanilla'], noteMap['Sandalwood'], noteMap['Amber']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Sweet almond-vanilla with bitter notes'
      },
      {
        name: 'Carlisle',
        brand: brandMap['Parfums de Marly'],
        type: 'niche',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Nutmeg'], noteMap['Cardamom']],
          middle: [noteMap['Rose'], noteMap['Oud']],
          base: [noteMap['Vanilla'], noteMap['Sandalwood'], noteMap['Patchouli']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Rich, spicy oriental with rose and oud'
      },
      {
        name: 'Reflection Man',
        brand: brandMap['Amouage'],
        type: 'niche',
        category: 'floral',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Pepper']],
          middle: [noteMap['Jasmine'], noteMap['Iris'], noteMap['Rose']],
          base: [noteMap['Sandalwood'], noteMap['Cedar'], noteMap['Musk']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 7,
        description: 'Elegant, refined floral for men'
      },
      {
        name: 'Jubilation XXV',
        brand: brandMap['Amouage'],
        type: 'niche',
        category: 'oriental',
        gender: 'masculine',
        notes: {
          top: [noteMap['Frankincense'], noteMap['Orange']],
          middle: [noteMap['Rose'], noteMap['Cinnamon']],
          base: [noteMap['Oud'], noteMap['Musk'], noteMap['Amber']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Majestic oriental with frankincense'
      },
      {
        name: 'Ombré Nomade',
        brand: brandMap['Louis Vuitton'],
        type: 'niche',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Rose']],
          middle: [noteMap['Oud'], noteMap['Benzoin']],
          base: [noteMap['Amber'], noteMap['Musk']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Intense, smoky oud masterpiece'
      },
      {
        name: 'Rehab',
        brand: brandMap['Initio'],
        type: 'niche',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Lavender'], noteMap['Bergamot']],
          middle: [noteMap['Tobacco'], noteMap['Musk']],
          base: [noteMap['Vanilla'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Addictive lavender-tobacco blend'
      },
      {
        name: 'Atomic Rose',
        brand: brandMap['Initio'],
        type: 'niche',
        category: 'floral',
        gender: 'unisex',
        notes: {
          top: [noteMap['Rose'], noteMap['Bergamot']],
          middle: [noteMap['Oud'], noteMap['Amber']],
          base: [noteMap['Musk'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Explosive rose with magnetic pull'
      },
      // More Arabian Dupes
      {
        name: 'Qaaed',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Bergamot']],
          middle: [noteMap['Jasmine'], noteMap['Rose']],
          base: [noteMap['Amber'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'Powerful amber fragrance, BR540-inspired'
      },
      {
        name: 'Ejaazi',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cardamom'], noteMap['Saffron']],
          middle: [noteMap['Oud'], noteMap['Rose']],
          base: [noteMap['Vanilla'], noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Intense spicy-oud composition'
      },
      {
        name: 'Oud Mood Elixir',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Rose'], noteMap['Saffron']],
          middle: [noteMap['Oud'], noteMap['Jasmine']],
          base: [noteMap['Amber'], noteMap['Musk'], noteMap['Sandalwood']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Enhanced oud-rose experience'
      },
      {
        name: 'Al Qiam Gold',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Saffron']],
          middle: [noteMap['Rose'], noteMap['Vanilla']],
          base: [noteMap['Amber'], noteMap['Benzoin'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Luxurious spicy-vanilla oriental'
      },
      {
        name: 'Perfume de Marly Clone',
        brand: brandMap['Paris Corner'],
        type: 'arabian',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Cardamom']],
          middle: [noteMap['Tobacco'], noteMap['Vanilla']],
          base: [noteMap['Musk'], noteMap['Benzoin']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Herod-inspired tobacco-spice blend'
      },
      {
        name: 'Zafeer Oud Vanille',
        brand: brandMap['Paris Corner'],
        type: 'arabian',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Cardamom']],
          middle: [noteMap['Oud'], noteMap['Rose']],
          base: [noteMap['Vanilla'], noteMap['Amber'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Rich oud-vanilla fusion'
      },
      {
        name: 'Teriaq',
        brand: brandMap['Afnan'],
        type: 'arabian',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Ginger']],
          middle: [noteMap['Rose'], noteMap['Tobacco']],
          base: [noteMap['Vanilla'], noteMap['Benzoin'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Pegasus alternative with spicy-vanilla'
      },
      {
        name: '9PM',
        brand: brandMap['Afnan'],
        type: 'arabian',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Bergamot']],
          middle: [noteMap['Lavender'], noteMap['Vanilla']],
          base: [noteMap['Amber'], noteMap['Tonka'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'JPG Ultra Male alternative, sweet spicy'
      },
      {
        name: 'Shumukh',
        brand: brandMap['Afnan'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Rose']],
          middle: [noteMap['Oud'], noteMap['Frankincense']],
          base: [noteMap['Sandalwood'], noteMap['Amber'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Prestigious oud with frankincense'
      },
      {
        name: 'Oud Satin Mood',
        brand: brandMap['Maison Francis Kurkdjian'],
        type: 'niche',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Violet'], noteMap['Rose']],
          middle: [noteMap['Oud'], noteMap['Benzoin']],
          base: [noteMap['Vanilla'], noteMap['Sandalwood']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Soft, feminine oud with violet'
      },
      {
        name: 'Grand Soir',
        brand: brandMap['Maison Francis Kurkdjian'],
        type: 'niche',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Lavender']],
          middle: [noteMap['Benzoin'], noteMap['Amber']],
          base: [noteMap['Vanilla'], noteMap['Tonka']]
        },
        priceRange: 'luxury',
        concentration: 'EDP',
        longevity: 10,
        sillage: 8,
        description: 'Warm amber-vanilla evening scent'
      },
      {
        name: 'Opulent Musk',
        brand: brandMap['Rasasi'],
        type: 'arabian',
        category: 'musk',
        gender: 'unisex',
        notes: {
          top: [noteMap['Rose'], noteMap['Jasmine']],
          middle: [noteMap['Musk'], noteMap['Amber']],
          base: [noteMap['Sandalwood'], noteMap['Vanilla']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Luxurious white musk composition'
      },
      {
        name: 'La Yuqawam',
        brand: brandMap['Rasasi'],
        type: 'arabian',
        category: 'woody',
        gender: 'masculine',
        notes: {
          top: [noteMap['Saffron'], noteMap['Cardamom']],
          middle: [noteMap['Leather'], noteMap['Jasmine']],
          base: [noteMap['Amber'], noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Tuscan Leather alternative, powerful leather'
      },
      {
        name: 'Ana Abiyedh Rouge',
        brand: brandMap['Lattafa'],
        type: 'arabian',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Jasmine']],
          middle: [noteMap['Ambergris'], noteMap['Cedar']],
          base: [noteMap['Amber'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'BR540 Extrait alternative, more intense'
      },
      {
        name: 'Sehr Al Khaleej',
        brand: brandMap['Swiss Arabian'],
        type: 'arabian',
        category: 'oriental',
        gender: 'unisex',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Saffron']],
          middle: [noteMap['Rose'], noteMap['Oud']],
          base: [noteMap['Amber'], noteMap['Musk'], noteMap['Vanilla']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Magic of the Gulf, rich oriental'
      },
      {
        name: 'Shaghaf Oud',
        brand: brandMap['Swiss Arabian'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Rose'], noteMap['Saffron']],
          middle: [noteMap['Oud'], noteMap['Amber']],
          base: [noteMap['Sandalwood'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Passionate oud with rose heart'
      },
      {
        name: 'Hunter Intense',
        brand: brandMap['Armaf'],
        type: 'arabian',
        category: 'fresh',
        gender: 'masculine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Lavender']],
          middle: [noteMap['Violet'], noteMap['Iris']],
          base: [noteMap['Sandalwood'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Green Irish Tweed alternative'
      },
      {
        name: 'Sillage',
        brand: brandMap['Armaf'],
        type: 'arabian',
        category: 'amber',
        gender: 'unisex',
        notes: {
          top: [noteMap['Saffron'], noteMap['Ginger']],
          middle: [noteMap['Jasmine'], noteMap['Cedar']],
          base: [noteMap['Amber'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 9,
        description: 'BR540-inspired with saffron and cedar'
      },
      {
        name: 'Oud Lavender',
        brand: brandMap['Al Haramain'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Lavender'], noteMap['Bergamot']],
          middle: [noteMap['Oud'], noteMap['Tobacco']],
          base: [noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Initio Rehab alternative'
      },
      {
        name: 'Detour Noir',
        brand: brandMap['Al Haramain'],
        type: 'arabian',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cardamom'], noteMap['Bergamot']],
          middle: [noteMap['Lavender'], noteMap['Cedar']],
          base: [noteMap['Vanilla'], noteMap['Tonka'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Sophisticated spicy-sweet evening scent'
      },
      {
        name: 'Red Tobacco',
        brand: brandMap['Fragrance World'],
        type: 'arabian',
        category: 'spicy',
        gender: 'masculine',
        notes: {
          top: [noteMap['Cinnamon'], noteMap['Pepper']],
          middle: [noteMap['Tobacco'], noteMap['Coffee']],
          base: [noteMap['Vanilla'], noteMap['Tonka'], noteMap['Musk']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 9,
        sillage: 8,
        description: 'Herod-inspired tobacco-spice'
      },
      {
        name: 'Tiziana Terenzi Kirke Clone',
        brand: brandMap['Fragrance World'],
        type: 'arabian',
        category: 'floral',
        gender: 'feminine',
        notes: {
          top: [noteMap['Bergamot'], noteMap['Orange']],
          middle: [noteMap['Rose'], noteMap['Jasmine']],
          base: [noteMap['Musk'], noteMap['Vanilla']]
        },
        priceRange: 'budget',
        concentration: 'EDP',
        longevity: 8,
        sillage: 7,
        description: 'Fruity-floral with passion fruit notes'
      },
      {
        name: 'Amber Oud Exclusif Bleu',
        brand: brandMap['Al Haramain'],
        type: 'arabian',
        category: 'oud',
        gender: 'unisex',
        notes: {
          top: [noteMap['Lavender'], noteMap['Mint']],
          middle: [noteMap['Oud'], noteMap['Amber']],
          base: [noteMap['Sandalwood'], noteMap['Vanilla'], noteMap['Musk']]
        },
        priceRange: 'mid',
        concentration: 'EDP',
        longevity: 10,
        sillage: 9,
        description: 'Fresh oud with aromatic opening'
      }
    ]

    // Filter out any perfumes with undefined note references
    const validPerfumes = perfumesData.filter(p => {
      const allNotes = [...(p.notes?.top || []), ...(p.notes?.middle || []), ...(p.notes?.base || [])]
      return allNotes.every(note => note !== undefined)
    })

    // Insert perfumes
    console.log('🌸 Seeding perfumes...')
    const perfumes = await Perfume.insertMany(validPerfumes)
    const perfumeMap = perfumes.reduce((acc, perfume) => {
      acc[perfume.name] = perfume._id
      return acc
    }, {})

    // Dupe relationships
    const dupeRelationsData = [
      {
        original: perfumeMap['Baccarat Rouge 540'],
        dupe: perfumeMap['Raghba'],
        similarityScore: 85,
        priceComparison: { originalPrice: 325, dupePrice: 25, savings: 92 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Aventus'],
        dupe: perfumeMap['Club de Nuit Intense Man'],
        similarityScore: 90,
        priceComparison: { originalPrice: 445, dupePrice: 35, savings: 92 },
        verifiedBy: 'expert'
      },
      {
        original: perfumeMap['Oud Wood'],
        dupe: perfumeMap['Oud for Glory'],
        similarityScore: 88,
        priceComparison: { originalPrice: 250, dupePrice: 25, savings: 90 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['La Nuit de L\'Homme'],
        dupe: perfumeMap['Fakhar'],
        similarityScore: 82,
        priceComparison: { originalPrice: 120, dupePrice: 20, savings: 83 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Layton'],
        dupe: perfumeMap['Dumont Nitro Red'],
        similarityScore: 85,
        priceComparison: { originalPrice: 315, dupePrice: 25, savings: 92 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Aventus'],
        dupe: perfumeMap['L\'Aventure'],
        similarityScore: 80,
        priceComparison: { originalPrice: 445, dupePrice: 40, savings: 91 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Tobacco Vanille'],
        dupe: perfumeMap['Khamrah'],
        similarityScore: 75,
        priceComparison: { originalPrice: 280, dupePrice: 25, savings: 91 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Baccarat Rouge 540'],
        dupe: perfumeMap['Hayaati'],
        similarityScore: 80,
        priceComparison: { originalPrice: 325, dupePrice: 20, savings: 94 },
        verifiedBy: 'community'
      },
      // ========== NEW DUPE RELATIONSHIPS ==========
      {
        original: perfumeMap['Baccarat Rouge 540'],
        dupe: perfumeMap['Qaaed'],
        similarityScore: 88,
        priceComparison: { originalPrice: 325, dupePrice: 22, savings: 93 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Baccarat Rouge 540'],
        dupe: perfumeMap['Ana Abiyedh Rouge'],
        similarityScore: 90,
        priceComparison: { originalPrice: 325, dupePrice: 25, savings: 92 },
        verifiedBy: 'expert'
      },
      {
        original: perfumeMap['Baccarat Rouge 540'],
        dupe: perfumeMap['Sillage'],
        similarityScore: 82,
        priceComparison: { originalPrice: 325, dupePrice: 30, savings: 91 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Green Irish Tweed'],
        dupe: perfumeMap['Milestone'],
        similarityScore: 85,
        priceComparison: { originalPrice: 435, dupePrice: 30, savings: 93 },
        verifiedBy: 'expert'
      },
      {
        original: perfumeMap['Green Irish Tweed'],
        dupe: perfumeMap['Tres Nuit'],
        similarityScore: 80,
        priceComparison: { originalPrice: 435, dupePrice: 25, savings: 94 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Green Irish Tweed'],
        dupe: perfumeMap['Hunter Intense'],
        similarityScore: 82,
        priceComparison: { originalPrice: 435, dupePrice: 28, savings: 94 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Silver Mountain Water'],
        dupe: perfumeMap['Afnan Supremacy Silver'],
        similarityScore: 85,
        priceComparison: { originalPrice: 395, dupePrice: 25, savings: 94 },
        verifiedBy: 'expert'
      },
      {
        original: perfumeMap['Tuscan Leather'],
        dupe: perfumeMap['La Yuqawam'],
        similarityScore: 90,
        priceComparison: { originalPrice: 280, dupePrice: 45, savings: 84 },
        verifiedBy: 'expert'
      },
      {
        original: perfumeMap['Oud Rose'],
        dupe: perfumeMap['Oud Mood'],
        similarityScore: 82,
        priceComparison: { originalPrice: 380, dupePrice: 25, savings: 93 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Oud Rose'],
        dupe: perfumeMap['Oud Mood Elixir'],
        similarityScore: 85,
        priceComparison: { originalPrice: 380, dupePrice: 30, savings: 92 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Herod'],
        dupe: perfumeMap['Red Tobacco'],
        similarityScore: 85,
        priceComparison: { originalPrice: 315, dupePrice: 20, savings: 94 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Herod'],
        dupe: perfumeMap['Perfume de Marly Clone'],
        similarityScore: 80,
        priceComparison: { originalPrice: 315, dupePrice: 25, savings: 92 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Pegasus'],
        dupe: perfumeMap['Teriaq'],
        similarityScore: 85,
        priceComparison: { originalPrice: 315, dupePrice: 30, savings: 90 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Interlude Man'],
        dupe: perfumeMap['Shumukh'],
        similarityScore: 75,
        priceComparison: { originalPrice: 400, dupePrice: 50, savings: 88 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Rehab'],
        dupe: perfumeMap['Oud Lavender'],
        similarityScore: 82,
        priceComparison: { originalPrice: 310, dupePrice: 45, savings: 85 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Tobacco Vanille'],
        dupe: perfumeMap['Asad'],
        similarityScore: 78,
        priceComparison: { originalPrice: 280, dupePrice: 25, savings: 91 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Side Effect'],
        dupe: perfumeMap['Khamrah'],
        similarityScore: 80,
        priceComparison: { originalPrice: 310, dupePrice: 25, savings: 92 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Grand Soir'],
        dupe: perfumeMap['Al Qiam Gold'],
        similarityScore: 78,
        priceComparison: { originalPrice: 315, dupePrice: 22, savings: 93 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Oud Satin Mood'],
        dupe: perfumeMap['Shaghaf Oud'],
        similarityScore: 75,
        priceComparison: { originalPrice: 325, dupePrice: 45, savings: 86 },
        verifiedBy: 'community'
      },
      {
        original: perfumeMap['Carlisle'],
        dupe: perfumeMap['Zafeer Oud Vanille'],
        similarityScore: 80,
        priceComparison: { originalPrice: 340, dupePrice: 28, savings: 92 },
        verifiedBy: 'community'
      }
    ]

    // Filter out dupes with undefined perfume references
    const validDupes = dupeRelationsData.filter(d => d.original && d.dupe)

    // Insert dupe relations
    console.log('🔗 Seeding dupe relationships...')
    await DupeRelation.insertMany(validDupes)

    console.log('✅ Database seeded successfully!')
    console.log(`   - ${notes.length} notes`)
    console.log(`   - ${brands.length} brands`)
    console.log(`   - ${perfumes.length} perfumes`)
    console.log(`   - ${validDupes.length} dupe relationships`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()
