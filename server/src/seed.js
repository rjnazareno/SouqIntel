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
        description: 'A luminous, sophisticated amber fragrance with saffron and cedar',
        imageUrl: '/images/perfumes/baccarat-rouge-540.jpg',
        reviews: [
          { source: 'fragrantica', author: 'ScentExplorer', rating: 5, text: 'This is liquid gold. The saffron opening is intoxicating, and it dries down to this ethereal amber cloud that lasts forever. Worth every penny.', date: '2024' },
          { source: 'reddit', author: 'u/fragranceenthusiast', rating: 5, text: 'BR540 lives up to the hype. Compliment magnet, beast mode projection. People will ask what you\'re wearing.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'OudLover', rating: 4, text: 'Unique DNA that\'s instantly recognizable. The ambergris and saffron combo is masterful. Only downside is how common it\'s becoming.', date: '2023' }
        ]
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
        description: 'Bold, masculine scent celebrating strength and success',
        imageUrl: '/images/perfumes/aventus.jpg',
        reviews: [
          { source: 'fragrantica', author: 'CreedCollector', rating: 5, text: 'The king of fragrances. That pineapple-birch combo is legendary. Every man should own a bottle.', date: '2024' },
          { source: 'reddit', author: 'u/aventus_addict', rating: 5, text: 'Batch variations aside, this is still the GOAT for office and date nights. Smoky, fruity perfection.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Jeremy Fragrance', rating: 5, text: 'POWER! Aventus is the fragrance that started the whole clone industry. Original is always the best.', date: '2023' }
        ]
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
        description: 'Rare, exotic oud blended with sandalwood and vetiver',
        imageUrl: '/images/perfumes/oud-wood.jpg',
        reviews: [
          { source: 'fragrantica', author: 'WoodyNotes', rating: 5, text: 'The oud that made oud mainstream in the West. Smooth, sophisticated, office-appropriate. A modern classic.', date: '2024' },
          { source: 'reddit', author: 'u/tomford_fan', rating: 4, text: 'Great gateway into oud fragrances. Not overwhelming, very refined. Longevity could be better for the price.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'OudExpert', rating: 4, text: 'Western interpretation of oud done right. The rosewood and cardamom balance is perfect. Versatile year-round.', date: '2023' }
        ]
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
        description: 'Fresh, raw masculinity inspired by wide-open spaces',
        imageUrl: '/images/perfumes/sauvage.jpg',
        reviews: [
          { source: 'fragrantica', author: 'FreshScenter', rating: 5, text: 'The most complimented fragrance I own. Ambroxan magic at its finest. Works everywhere, anytime.', date: '2024' },
          { source: 'reddit', author: 'u/dior_daily', rating: 4, text: 'Ubiquitous for a reason. Clean, fresh, masculine. Might smell it on others but who cares, it works.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Gent Scents', rating: 5, text: 'If you need one fragrance for your collection, Sauvage covers 90% of situations. Mass-appealing done right.', date: '2023' }
        ]
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
        description: 'Seductive nighttime fragrance with cardamom and cedar',
        reviews: [
          { source: 'fragrantica', author: 'NightOwl', rating: 5, text: 'The ultimate seduction scent. That cardamom opening is intoxicating. Perfect for romantic evenings.', date: '2024' },
          { source: 'reddit', author: 'u/ysl_fan', rating: 4, text: 'Beautiful scent but longevity has been reformulated. Still my go-to date night fragrance though.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'ScentCritic', rating: 4, text: 'Spicy, sweet, mysterious. One of the best designer releases. Just wish it lasted longer.', date: '2023' }
        ]
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
        description: 'Powerful, smoky oud masterpiece',
        imageUrl: '/images/perfumes/interlude-man.jpg',
        reviews: [
          { source: 'fragrantica', author: 'OudMaster', rating: 5, text: 'This is what oud should smell like. Smoky, incense-heavy, absolutely stunning. Not for the faint of heart.', date: '2024' },
          { source: 'reddit', author: 'u/amouage_collector', rating: 5, text: 'The most complex fragrance I own. Layers upon layers of smoke, oud, and amber. A true masterpiece.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'IncenseLover', rating: 5, text: 'Interlude Man is an experience. The oregano-frankincense opening is unlike anything else. Nuclear performance.', date: '2023' }
        ]
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
        description: 'Addictive tobacco-vanilla creation',
        imageUrl: '/images/perfumes/side-effect.jpg',
        reviews: [
          { source: 'fragrantica', author: 'VanillaAddict', rating: 5, text: 'Dangerously addictive. The rum-tobacco-vanilla combo is pure hedonism in a bottle. Compliment beast.', date: '2024' },
          { source: 'reddit', author: 'u/initio_fan', rating: 5, text: 'Side Effect lives up to its name. People get addicted to this scent. My wife won\'t let me wear anything else.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Curly Scents', rating: 5, text: 'If you want a gourmand that doesn\'t smell like dessert, Side Effect is it. Sophisticated boozy warmth.', date: '2023' }
        ]
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
        description: 'Noble, sophisticated apple and lavender fragrance',
        imageUrl: '/images/perfumes/layton.jpg',
        reviews: [
          { source: 'fragrantica', author: 'PDMCollector', rating: 5, text: 'Layton is versatile perfection. Works in any setting, any season. The apple-vanilla dry down is heavenly.', date: '2024' },
          { source: 'reddit', author: 'u/pdm_addict', rating: 5, text: 'Best blind buy I ever made. Professional enough for work, sexy enough for dates. Mass-appealing niche.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'LaytonLover', rating: 5, text: 'A crowd-pleaser that doesn\'t sacrifice quality. The menthol note gives it freshness others lack.', date: '2023' }
        ]
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
        description: 'Opulent blend of tobacco and vanilla',
        imageUrl: '/images/perfumes/tobacco-vanille.jpeg',
        reviews: [
          { source: 'fragrantica', author: 'TobaccoHead', rating: 5, text: 'The perfect winter fragrance. Rich, warm, inviting. Smells like a cozy evening by the fireplace.', date: '2024' },
          { source: 'reddit', author: 'u/tf_collector', rating: 5, text: 'TV is the fragrance that got me into niche. Honey and tobacco leaf done to perfection. Timeless.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'The Fragrance Apprentice', rating: 5, text: 'Nothing beats Tobacco Vanille in cold weather. It\'s a warm hug in a bottle. Expensive but worth it.', date: '2023' }
        ]
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
        description: 'Dark, sexy rose and oud composition',
        imageUrl: '/images/perfumes/noir-de-noir.jpg',
        reviews: [
          { source: 'fragrantica', author: 'RoseEnthusiast', rating: 5, text: 'The darkest rose you\'ll ever smell. Earthy, chocolatey, sensual. Not your grandmother\'s rose perfume.', date: '2024' },
          { source: 'reddit', author: 'u/darkscents', rating: 5, text: 'NdN is underrated in the TF lineup. The saffron-rose-oud combo creates something truly special.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'NicheReviewer', rating: 4, text: 'Sophisticated and unisex despite being marketed to women initially. Works beautifully on everyone.', date: '2023' }
        ]
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
        description: 'Luxurious, sensual dark floral',
        imageUrl: '/images/perfumes/black-orchid.jpg',
        reviews: [
          { source: 'fragrantica', author: 'OrchidLover', rating: 5, text: 'Black Orchid is a statement piece. Dark chocolate, black truffle, exotic florals. Unforgettable.', date: '2024' },
          { source: 'reddit', author: 'u/tomford_girl', rating: 5, text: 'This was my gateway into luxury fragrance. Still in my top 5 after all these years. Iconic.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'LuxuryScents', rating: 4, text: 'Divisive but brilliant. You either love it or hate it. I happen to think it\'s genius.', date: '2023' }
        ]
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
        description: 'Fresh, invigorating scent of passion',
        reviews: [
          { source: 'fragrantica', author: 'ClubKing', rating: 5, text: 'Eros is the king of clubbing fragrances. Sweet, fresh, projects like crazy. Always gets compliments.', date: '2024' },
          { source: 'reddit', author: 'u/versace_boi', rating: 4, text: 'Great value for a designer. The mint-vanilla combo is addictive. Just be careful not to overspray.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Fragrance One', rating: 5, text: 'Eros changed the game for designer fragrances. Sweet masculinity done right. Still a top seller.', date: '2023' }
        ]
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
        description: 'Refined, woody aromatic fragrance',
        reviews: [
          { source: 'fragrantica', author: 'BleuLover', rating: 5, text: 'The definition of clean masculinity. Perfect for any occasion. My signature scent for years.', date: '2024' },
          { source: 'reddit', author: 'u/chanel_daily', rating: 5, text: 'BdC is what luxury smells like. Worth every penny. The EDP is the best flanker IMO.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'ClassicGent', rating: 5, text: 'Timeless elegance. Incense, woods, citrus - all perfectly balanced. A true gentleman\'s fragrance.', date: '2023' }
        ]
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
        description: 'Elegant, spicy tobacco fragrance',
        reviews: [
          { source: 'fragrantica', author: 'DGFan', rating: 5, text: 'Sophisticated and seductive. The tobacco-amber base is incredible. Perfect date night scent.', date: '2024' },
          { source: 'reddit', author: 'u/theone_daily', rating: 4, text: 'Underrated gem. The ginger opening is unique, and the dry down is gorgeous. Just wish it lasted longer.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Fragrance Bros', rating: 5, text: 'The One EDP is a significant upgrade over EDT. Tobacco-heavy, romantic, super classy.', date: '2023' }
        ]
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
        description: 'Modern aquatic fragrance with amber depth',
        reviews: [
          { source: 'fragrantica', author: 'AquaticFan', rating: 5, text: 'This took the original AdG and made it sophisticated. The amber adds depth without losing freshness.', date: '2024' },
          { source: 'reddit', author: 'u/armani_scents', rating: 5, text: 'Profumo is the mature version of AdG. Works year-round, office appropriate, compliment getter.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'FreshExpert', rating: 4, text: 'A modern classic. The patchouli gives it that distinctive earthy quality. Very versatile.', date: '2023' }
        ]
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
        description: 'Luxurious amber-saffron composition, excellent BR540 alternative',
        reviews: [
          { source: 'fragrantica', author: 'BudgetKing', rating: 5, text: 'Don\'t sleep on Raghba. For the price, this is incredible. Performs like a $300 fragrance.', date: '2024' },
          { source: 'reddit', author: 'u/lattafa_fan', rating: 5, text: 'Raghba got me into Middle Eastern perfumery. Sweet, warm, long-lasting. BR540 vibes at 10% of the cost.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Demi Rawling', rating: 5, text: 'Best value in the fragrance world. Smells expensive, projects well, lasts all day. What more do you want?', date: '2023' }
        ]
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
        description: 'Powerful Aventus alternative with exceptional performance',
        reviews: [
          { source: 'fragrantica', author: 'CloneKing', rating: 5, text: 'CDNIM is the clone that started a revolution. Recent batches smell even closer to Aventus. Unbeatable value.', date: '2024' },
          { source: 'reddit', author: 'u/cdnim_daily', rating: 5, text: 'Forget spending $400 on Aventus. CDNIM does 90% of the work for $30. Nuclear performance too.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Chaos Fragrances', rating: 5, text: 'The OG clone. It\'s been reformulated and improved. Must-have for any collection.', date: '2023' }
        ]
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
        description: 'Rich, boozy praline with cinnamon spice',
        reviews: [
          { source: 'fragrantica', author: 'GourmandLover', rating: 5, text: 'Khamrah took TikTok by storm for a reason. Boozy cinnamon praline that lasts forever. Absolute gem.', date: '2024' },
          { source: 'reddit', author: 'u/khamrah_fan', rating: 5, text: 'My wife bought 3 backups. The drydown is like Angels Share but sweeter. Winter must-have.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Sandra Pereira', rating: 5, text: 'If you love sweet fragrances, Khamrah is mandatory. The hype is real. 10+ hours easy.', date: '2023' }
        ]
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
        description: 'Beast mode tobacco-coffee-vanilla powerhouse',
        reviews: [
          { source: 'fragrantica', author: 'BeastMode', rating: 5, text: 'Asad is ridiculously good. Coffee, tobacco, vanilla in perfect harmony. Projects like a monster.', date: '2024' },
          { source: 'reddit', author: 'u/asad_addict', rating: 5, text: 'This punches WAY above its price. Smells similar to Stronger With You Intensely. Compliment magnet.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'CoffeeScents', rating: 5, text: 'If you like coffee notes, Asad delivers. The tobacco gives it sophistication. Winter beast.', date: '2023' }
        ]
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
        description: 'Excellent Oud Wood alternative with great performance',
        reviews: [
          { source: 'fragrantica', author: 'OudSeeker', rating: 5, text: 'Oud for Glory outperforms Oud Wood in every way. Smoother, longer-lasting, and fraction of the price.', date: '2024' },
          { source: 'reddit', author: 'u/lattafa_daily', rating: 5, text: 'Sold my Oud Wood bottle after getting this. Virtually identical but better longevity. No regrets.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Big Beard Business', rating: 5, text: 'Best Oud Wood clone period. The cardamom opening is even better than the original.', date: '2023' }
        ]
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
        description: 'Luxurious amber-oud with golden warmth',
        reviews: [
          { source: 'fragrantica', author: 'AmberEnthusiast', rating: 5, text: 'This is liquid gold in a bottle. The saffron-amber combo is gorgeous. Smells way more expensive than it is.', date: '2024' },
          { source: 'reddit', author: 'u/alharamain_fan', rating: 5, text: 'Amber Oud Gold is an experience. It evolves beautifully over hours. My non-fraghead friends love it.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'OudConnoisseur', rating: 4, text: 'Great Middle Eastern amber-oud hybrid. Not a clone of anything specific, just a beautiful original.', date: '2023' }
        ]
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
        description: 'Fresh, fruity Aventus-inspired creation',
        reviews: [
          { source: 'fragrantica', author: 'FreshFanatic', rating: 4, text: 'L\'Aventure leans more fruity than CDNIM. Different take on Aventus DNA. More citrus-forward.', date: '2024' },
          { source: 'reddit', author: 'u/aventure_daily', rating: 4, text: 'If you want a cleaner, less smoky Aventus clone, this is it. Great for hot weather.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'CloneReviewer', rating: 4, text: 'Solid Aventus alternative. Not as complex as CDNIM but more wearable in professional settings.', date: '2023' }
        ]
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
        description: 'Mysterious, enchanting oriental',
        reviews: [
          { source: 'fragrantica', author: 'OrientalLover', rating: 4, text: 'Shahrazade tells a story. The saffron-rose-oud journey is captivating. Great for special occasions.', date: '2024' },
          { source: 'reddit', author: 'u/swissarabian_fan', rating: 4, text: 'Underrated gem from Swiss Arabian. Complex and evolving. Definitely date-worthy.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'FlowerChild', rating: 4, text: 'Beautiful feminine oriental. The dry down is where this truly shines.', date: '2023' }
        ]
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
        description: 'Fresh, clean aquatic scent',
        reviews: [
          { source: 'fragrantica', author: 'FreshAir', rating: 4, text: 'Clean, fresh, office-safe. Silver Mountain Water vibes at fraction of price. Great daily driver.', date: '2024' },
          { source: 'reddit', author: 'u/fresh_daily', rating: 4, text: 'This is my hot weather go-to. Light, clean, pleasant. Not groundbreaking but reliable.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'BudgetCollector', rating: 4, text: 'Solid fresh scent for the price. Projects well for what it is. Nice bottle too.', date: '2023' }
        ]
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
        description: 'Elegant cardamom-lavender composition',
        reviews: [
          { source: 'fragrantica', author: 'SpiceLover', rating: 5, text: 'Fakhar = LNDL on steroids. More cardamom, more projection, more longevity. Clone that beats original.', date: '2024' },
          { source: 'reddit', author: 'u/fakhar_fan', rating: 5, text: 'If you love La Nuit de L\'Homme, Fakhar is a must-try. Better performance, similar DNA.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Redolessence', rating: 4, text: 'Great LNDL alternative. The cardamom is more prominent, which I prefer. Amazing value.', date: '2023' }
        ]
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
        description: 'Rich, opulent oud fragrance',
        reviews: [
          { source: 'fragrantica', author: 'OudObsessed', rating: 4, text: 'Beautiful traditional oud fragrance. Not a clone - its own thing. Rich, warm, long-lasting.', date: '2024' },
          { source: 'reddit', author: 'u/rasasi_collector', rating: 4, text: 'Rasasi quality never disappoints. This is oud done right - accessible but not dumbed down.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'OudScholar', rating: 4, text: 'A well-made oud-rose composition. Traditional Middle Eastern perfumery at its finest.', date: '2023' }
        ]
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
        description: 'Elegant floral-oriental composition',
        reviews: [
          { source: 'fragrantica', author: 'FloralFan', rating: 4, text: 'Qasamat Morhaf is elegant and refined. The rose-jasmine heart is beautiful. Great gift option.', date: '2024' },
          { source: 'reddit', author: 'u/rasasi_daily', rating: 4, text: 'Underrated from Rasasi. Very classy, not too sweet. Works well year-round.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'RoseEnthusiast', rating: 4, text: 'If you appreciate florals done well, give this a try. Sophisticated and long-lasting.', date: '2023' }
        ]
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
        description: 'Layton-inspired spicy vanilla powerhouse',
        reviews: [
          { source: 'fragrantica', author: 'LaytonClone', rating: 5, text: 'Nitro Red is scary close to Layton. The apple-vanilla DNA is spot on. Insane value.', date: '2024' },
          { source: 'reddit', author: 'u/nitro_fan', rating: 5, text: 'If you want Layton vibes without the $300 price, Nitro Red is the answer. Beast mode too.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Gent Scents', rating: 5, text: 'Paris Corner knocked it out the park with this one. Layton lovers will be impressed.', date: '2023' }
        ]
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
        description: 'Fresh, invigorating Silver Mountain Water alternative',
        reviews: [
          { source: 'fragrantica', author: 'SilverFan', rating: 4, text: 'Supremacy Silver captures the SMW vibe well. Fresh, clean, longer-lasting than expected.', date: '2024' },
          { source: 'reddit', author: 'u/afnan_daily', rating: 4, text: 'Great Creed alternative at budget price. Not identical but same fresh tea vibe.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'FreshCollector', rating: 4, text: 'Afnan quality at budget pricing. This is great for casual summer wear.', date: '2023' }
        ]
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
        description: 'Oud Rose alternative with great value',
        reviews: [
          { source: 'fragrantica', author: 'MoodSetter', rating: 4, text: 'Oud Mood hits that rose-oud combo perfectly. Reminds me of Oud Ispahan. Great gateway oud.', date: '2024' },
          { source: 'reddit', author: 'u/oud_mood_daily', rating: 4, text: 'Lattafa consistency is impressive. Oud Mood is smooth, wearable, and smells expensive.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'RoseOudLover', rating: 4, text: 'Entry-level oud that doesn\'t smell cheap. The rose keeps it balanced and wearable.', date: '2023' }
        ]
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
        description: 'Smooth, velvety oud composition',
        reviews: [
          { source: 'fragrantica', author: 'VelvetTouch', rating: 5, text: 'Ajmal Velvet Oud is aptly named. Smooth, luxurious, not harsh at all. Perfect intro to real oud.', date: '2024' },
          { source: 'reddit', author: 'u/ajmal_fan', rating: 5, text: 'This was my first Ajmal purchase. Now I own 6. The quality to price ratio is unmatched.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'OudPurist', rating: 4, text: 'Ajmal knows oud. This is Western-friendly but still authentic. Beautiful composition.', date: '2023' }
        ]
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
        description: 'Beautiful white floral bouquet',
        reviews: [
          { source: 'fragrantica', author: 'WhiteFloral', rating: 4, text: 'Wisal is feminine elegance in a bottle. The tuberose-jasmine combo is intoxicating but not overpowering.', date: '2024' },
          { source: 'reddit', author: 'u/ajmal_girl', rating: 4, text: 'Finally a Middle Eastern brand that does white florals well. Fresh, clean, romantic.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'FloralQueen', rating: 4, text: 'Beautiful for spring/summer. The dry down is creamy and comfortable. Great longevity.', date: '2023' }
        ]
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
        description: 'Dark, mysterious vetiver composition',
        reviews: [
          { source: 'fragrantica', author: 'VetiverLord', rating: 5, text: 'Encre Noire is the best vetiver fragrance at any price. Dark, inky, mysterious. An absolute classic.', date: '2024' },
          { source: 'reddit', author: 'u/encre_noire_daily', rating: 5, text: 'The best $25 you can spend in fragrance. Cold, wet forest in a bottle. Artistic masterpiece.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'DarkScents', rating: 5, text: 'If you appreciate unconventional fragrances, Encre Noire is essential. Wet earth and cypress perfection.', date: '2023' }
        ]
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
        description: 'Warm, spicy honey oriental',
        reviews: [
          { source: 'fragrantica', author: 'HoneyLover', rating: 5, text: 'Oajan is pure indulgence. Honey, cinnamon, vanilla - like being wrapped in a warm cashmere blanket.', date: '2024' },
          { source: 'reddit', author: 'u/pdm_collector', rating: 5, text: 'This is the PDM that got me hooked. The honey note is done perfectly. Winter signature material.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Fragrance Bro', rating: 5, text: 'Oajan is addictive. The dry down is pure bliss. If you like sweet fragrances, this is it.', date: '2023' }
        ]
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
        description: 'Bold, textured leather fragrance',
        reviews: [
          { source: 'fragrantica', author: 'LeatherLover', rating: 5, text: 'Ombre Leather is the definitive modern leather. Cardamom and violet give it sophistication. Masterpiece.', date: '2024' },
          { source: 'reddit', author: 'u/tf_leather', rating: 5, text: 'Replaced Tuscan Leather in my collection. More wearable, just as impressive. The dry down is incredible.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'LeatherExpert', rating: 4, text: 'Tom Ford does leather better than anyone. This is their most balanced leather offering.', date: '2023' }
        ]
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
        description: 'Edgy, rebellious aromatic fragrance',
        reviews: [
          { source: 'fragrantica', author: 'BadBoyFan', rating: 4, text: 'Great everyday scent. The tonka-cocoa base is addictive. Not as edgy as marketed but very pleasant.', date: '2024' },
          { source: 'reddit', author: 'u/herrera_daily', rating: 4, text: 'Solid designer. Nothing groundbreaking but reliable. Gets compliments at the office.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Chaos Fragrances', rating: 4, text: 'Bad Boy is a safe blind buy. Crowd-pleasing DNA with decent performance. Good bottle design too.', date: '2023' }
        ]
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
        description: 'Luxurious oud blend at affordable price',
        reviews: [
          { source: 'fragrantica', author: 'OudValue', rating: 5, text: 'Afnan does oud right. Supremacy In Oud is rich, complex, and smells like it costs 5x the price.', date: '2024' },
          { source: 'reddit', author: 'u/afnan_oud', rating: 5, text: 'Budget oud that doesn\'t smell budget. The saffron-rose-oud trio is gorgeous. Crazy longevity.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'OudHunter', rating: 4, text: 'One of the best Middle Eastern oud compositions under $50. Projects well without being overwhelming.', date: '2023' }
        ]
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
        description: 'Opulent amber fragrance with Middle Eastern flair',
        reviews: [
          { source: 'fragrantica', author: 'AmberDreams', rating: 4, text: 'Hayaati is a beautiful amber. Sweet but not cloying. The saffron adds that Middle Eastern touch.', date: '2024' },
          { source: 'reddit', author: 'u/hayaati_fan', rating: 4, text: 'Great everyday Middle Eastern fragrance. Not too heavy, projects nicely. Compliment worthy.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'SaffronLover', rating: 4, text: 'If you like BR540 DNA but want something more unique, Hayaati is worth a try.', date: '2023' }
        ]
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
        description: 'Royal oud composition fit for royalty',
        reviews: [
          { source: 'fragrantica', author: 'RoyalScents', rating: 5, text: 'Sheikh Al Shuyukh is what royalty smells like. Regal, commanding, long-lasting. My holy grail cheapie.', date: '2024' },
          { source: 'reddit', author: 'u/sheikh_daily', rating: 5, text: 'The name translates to Chief of Chiefs. It lives up to it. Oud done right for Western noses.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Demi Rawling', rating: 5, text: 'Best bang for buck oud on the market. Nuclear performance. You\'ll smell this a mile away.', date: '2023' }
        ]
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
        description: 'Intense, powerful oud experience',
        reviews: [
          { source: 'fragrantica', author: 'IntenseOud', rating: 5, text: 'When they say intense, they mean it. This fills a room. Leather-oud combo is absolutely stunning.', date: '2024' },
          { source: 'reddit', author: 'u/ameer_fan', rating: 5, text: 'Be careful with sprays. 2 max. This is nuclear. But the smell is gorgeous - deep, rich, royal.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'OudPowerhouse', rating: 5, text: 'Not for the faint of heart. If you want to make a statement, Ameer Al Oudh delivers.', date: '2023' }
        ]
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
        description: 'Elegant, refined oud composition',
        reviews: [
          { source: 'fragrantica', author: 'EliteScenter', rating: 4, text: 'Oud Elite is more subtle than other Armaf ouds. Elegant and refined. Good for oud beginners.', date: '2024' },
          { source: 'reddit', author: 'u/armaf_oud', rating: 4, text: 'This is my office oud. Not too strong, not too weak. Professional and sophisticated.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'SubtleOud', rating: 4, text: 'For those who want oud without overwhelming the room. Well-balanced and elegant.', date: '2023' }
        ]
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
        description: 'Fresh, invigorating Green Irish Tweed alternative',
        reviews: [
          { source: 'fragrantica', author: 'GITClone', rating: 5, text: 'Milestone is the best GIT clone period. 90% there at 10% of the price. Fresh, green, versatile.', date: '2024' },
          { source: 'reddit', author: 'u/milestone_daily', rating: 5, text: 'Sold my GIT bottle. Milestone does everything it does but lasts longer. No regrets.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Curly Scents', rating: 5, text: 'Armaf nailed the GIT DNA. Fresh, green, masculine. One of my favorite clones.', date: '2023' }
        ]
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
        description: 'Classic fresh aromatic, GIT alternative',
        reviews: [
          { source: 'fragrantica', author: 'FreshFan', rating: 4, text: 'Tres Nuit is more floral than Milestone. Different take on GIT. Both are good, just different.', date: '2024' },
          { source: 'reddit', author: 'u/tresnuit_fan', rating: 4, text: 'Clean, fresh, inoffensive. Great for work or casual outings. Very approachable.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'ClassicScents', rating: 4, text: 'If you want a subtle fresh fragrance, Tres Nuit delivers. Not as loud as other Armaf offerings.', date: '2023' }
        ]
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
        description: 'Sweet, feminine floral gourmand',
        reviews: [
          { source: 'fragrantica', author: 'YaraFan', rating: 5, text: 'Yara took TikTok by storm and deserves the hype. Sweet, creamy, long-lasting. Compliment magnet.', date: '2024' },
          { source: 'reddit', author: 'u/yara_daily', rating: 5, text: 'My signature scent now. Everyone asks what I\'m wearing. The marshmallow note is addictive.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Sandra Pereira', rating: 5, text: 'If you love sweet fragrances, Yara is non-negotiable. BR540 vibes with its own twist.', date: '2023' }
        ]
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
        description: 'Romantic pink floral gourmand',
        reviews: [
          { source: 'fragrantica', author: 'PinkDreams', rating: 5, text: 'Yara Tous is like a pink dream. The rose-praline combo is heavenly. Perfect for spring.', date: '2024' },
          { source: 'reddit', author: 'u/yara_tous', rating: 5, text: 'More floral than original Yara. The peony note adds freshness. Different but equally good.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'RomanticScents', rating: 4, text: 'Beautiful romantic fragrance. Sweet but not juvenile. Sophisticated sweetness.', date: '2023' }
        ]
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
        description: 'Honorable oud composition with citrus opening',
        reviews: [
          { source: 'fragrantica', author: 'BadeeHonor', rating: 4, text: 'Badee Al Oud Honor is a pleasant surprise. The citrus-oud combo is unique. Very wearable.', date: '2024' },
          { source: 'reddit', author: 'u/badee_fan', rating: 4, text: 'Fresh opening that settles into rich oud. Different from typical heavy oud fragrances.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'LightOud', rating: 4, text: 'For those who find oud too heavy, this is the answer. Light, fresh, but still sophisticated.', date: '2023' }
        ]
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
        description: 'Exotic rose-oud journey to the Middle East',
        reviews: [
          { source: 'fragrantica', author: 'DiorOud', rating: 5, text: 'Oud Ispahan is Dior\'s oud masterpiece. The Turkish rose and oud combo is intoxicating. Pure luxury.', date: '2024' },
          { source: 'reddit', author: 'u/dior_collector', rating: 5, text: 'This is what $350 smells like. Rich, complex, unforgettable. Worth every penny.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'OudRose', rating: 5, text: 'Oud Ispahan set the standard for Western rose-oud fragrances. A modern classic.', date: '2023' }
        ]
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
        description: 'Fresh, green classic masculine fragrance',
        reviews: [
          { source: 'fragrantica', author: 'GreenLegend', rating: 5, text: 'GIT is the original green fragrance. Violet leaf and iris are beautiful together. True gentleman scent.', date: '2024' },
          { source: 'reddit', author: 'u/creed_collector', rating: 5, text: 'The fougere that launched a thousand clones. Nothing quite matches the original\'s depth.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'ClassicGreen', rating: 5, text: 'Timeless elegance. GIT works everywhere - office, dates, weddings. A true masterpiece.', date: '2023' }
        ]
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
        description: 'Crisp, clean mountain air fragrance',
        reviews: [
          { source: 'fragrantica', author: 'MountainAir', rating: 4, text: 'SMW is like breathing crisp mountain air. Clean, fresh, sophisticated. Great for summer.', date: '2024' },
          { source: 'reddit', author: 'u/smw_fan', rating: 4, text: 'Beautiful tea-like freshness. Only downside is longevity - you\'ll need to reapply.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'FreshCreed', rating: 4, text: 'Unique in the Creed lineup. Light, effervescent, perfect for hot days.', date: '2023' }
        ]
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
        description: 'Luxurious rose and oud combination',
        reviews: [
          { source: 'fragrantica', author: 'TFRose', rating: 4, text: 'Tom Ford\'s take on rose-oud. Less intense than Oud Wood but equally sophisticated.', date: '2024' },
          { source: 'reddit', author: 'u/tf_rose', rating: 4, text: 'Beautiful rose-forward oud. The saffron adds warmth. Very romantic.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'RoseOud', rating: 4, text: 'A softer option in the Private Blend line. The rose dominates but oud provides structure.', date: '2023' }
        ]
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
        description: 'Decadent cherry-almond gourmand',
        reviews: [
          { source: 'fragrantica', author: 'CherryLover', rating: 5, text: 'Lost Cherry is pure decadence. Black cherry liqueur with almond and vanilla. Addictive.', date: '2024' },
          { source: 'reddit', author: 'u/lost_cherry', rating: 5, text: 'Smells like Dr. Pepper in the best way. Sweet, boozy, unique. Compliment beast.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Jeremy Fragrance', rating: 5, text: 'Lost Cherry broke the internet. The cherry-almond combo is iconic. Sweet tooth paradise.', date: '2023' }
        ]
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
        description: 'Bold, smoky Italian leather',
        reviews: [
          { source: 'fragrantica', author: 'LeatherKing', rating: 5, text: 'Tuscan Leather is a full-bodied leather experience. Raspberry-leather opening is iconic. Not for the timid.', date: '2024' },
          { source: 'reddit', author: 'u/tf_leather_fan', rating: 5, text: 'TL punches you in the face with leather and you\'ll thank it. Raw, powerful, unforgettable.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'LeatherPurist', rating: 5, text: 'The leather fragrance all others are measured against. Saffron and raspberry top notes are genius.', date: '2023' }
        ]
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
        description: 'Warm, spicy tobacco masterpiece',
        reviews: [
          { source: 'fragrantica', author: 'HeroFan', rating: 5, text: 'Herod is the tobacco king. Cinnamon, tobacco, vanilla in perfect harmony. Winter essential.', date: '2024' },
          { source: 'reddit', author: 'u/pdm_herod', rating: 5, text: 'If you want to smell rich and successful, Herod does it. Compliment machine in cold weather.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Big Beard Business', rating: 5, text: 'Herod is PDM\'s best masculine offering. Pipe tobacco and vanilla. Pure sophistication.', date: '2023' }
        ]
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
        description: 'Sweet almond-vanilla with bitter notes',
        reviews: [
          { source: 'fragrantica', author: 'PegasusFan', rating: 5, text: 'Pegasus is PDM done right. Almond, vanilla, bitter almond - absolutely divine. Works year-round.', date: '2024' },
          { source: 'reddit', author: 'u/pdm_pegasus', rating: 5, text: 'My most complimented fragrance. The almond note is unique. Sophisticated yet approachable.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Gent Scents', rating: 5, text: 'Pegasus is a crowd-pleaser that doesn\'t sacrifice quality. Sweet but not cloying.', date: '2023' }
        ]
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
        description: 'Rich, spicy oriental with rose and oud',
        reviews: [
          { source: 'fragrantica', author: 'CarlisleFan', rating: 5, text: 'Carlisle is PDM\'s hidden gem. Spicy, rosy, oudy - complex and rewarding. Nuclear performance.', date: '2024' },
          { source: 'reddit', author: 'u/pdm_carlisle', rating: 5, text: 'This should be more popular. The vanilla-patchouli base is incredible. Beast mode.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'OrientalExpert', rating: 5, text: 'Carlisle is underrated in the PDM lineup. Rich, complex, long-lasting. Masterpiece.', date: '2023' }
        ]
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
        description: 'Elegant, refined floral for men',
        reviews: [
          { source: 'fragrantica', author: 'ReflectionFan', rating: 5, text: 'Reflection Man proves florals can be masculine. Jasmine and neroli done to perfection. Classy.', date: '2024' },
          { source: 'reddit', author: 'u/amouage_reflection', rating: 5, text: 'The most elegant masculine I own. Perfect for formal occasions. Refined and sophisticated.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'FloralMasc', rating: 5, text: 'Amouage quality at its finest. This is what a gentleman smells like. Timeless.', date: '2023' }
        ]
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
        description: 'Majestic oriental with frankincense',
        reviews: [
          { source: 'fragrantica', author: 'JubilationKing', rating: 5, text: 'Jubilation XXV is a masterpiece. Frankincense and fruits create something magical. Royal scent.', date: '2024' },
          { source: 'reddit', author: 'u/amouage_xxv', rating: 5, text: 'This is what luxury smells like. Complex, evolving, unforgettable. Worth every penny.', url: 'r/fragrance', date: '2024' },
          { source: 'basenotes', author: 'NicheCollector', rating: 5, text: 'Amouage\'s crown jewel. The frankincense note is divine. A true celebration in a bottle.', date: '2023' }
        ]
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
        description: 'Intense, smoky oud masterpiece',
        imageUrl: '/images/perfumes/ombr-nomade.jpg',
        reviews: [
          { source: 'fragrantica', author: 'LVFan', rating: 5, text: 'Ombré Nomade is LV\'s crown jewel. The raspberry-oud combo is genius. Nuclear beast mode.', date: '2024' },
          { source: 'reddit', author: 'u/lv_fragrance', rating: 5, text: 'Worth the hype and price. Deep, rich, smoky oud that evolves beautifully. Statement piece.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Jeremy Fragrance', rating: 5, text: 'Ombré Nomade is the oud fragrance of the decade. Dense, powerful, unforgettable.', date: '2023' }
        ]
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
        description: 'Addictive lavender-tobacco blend',
        reviews: [
          { source: 'fragrantica', author: 'RehabAddict', rating: 5, text: 'Rehab lives up to its name - you\'ll get addicted. Lavender and tobacco never smelled so good.', date: '2024' },
          { source: 'reddit', author: 'u/initio_rehab', rating: 5, text: 'Better than Side Effect IMO. The lavender keeps it fresh while tobacco adds depth. Perfect balance.', url: 'r/fragrance', date: '2024' },
          { source: 'community', author: 'LavanderLover', rating: 5, text: 'Sophisticated lavender with addictive qualities. Not your typical lavender fragrance.', date: '2023' }
        ]
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
        description: 'Explosive rose with magnetic pull',
        imageUrl: '/images/perfumes/atomic-rose.jpg',
        reviews: [
          { source: 'fragrantica', author: 'AtomicFan', rating: 5, text: 'Atomic Rose is a rose bomb in the best way. The oud backbone gives it depth. Magnetic indeed.', date: '2024' },
          { source: 'reddit', author: 'u/atomic_rose', rating: 5, text: 'This makes you want to smell yourself all day. The rose-oud combo is intoxicating.', url: 'r/fragrance', date: '2024' },
          { source: 'youtube', author: 'Curly Scents', rating: 5, text: 'Initio does rose differently. Atomic Rose is bold, confident, unforgettable.', date: '2023' }
        ]
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
        description: 'Powerful amber fragrance, BR540-inspired',
      imageUrl: '/images/perfumes/qaaed.jpg'
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
        description: 'Intense spicy-oud composition',
      imageUrl: '/images/perfumes/ejaazi.jpg'
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
        description: 'Enhanced oud-rose experience',
      imageUrl: '/images/perfumes/oud-mood-elixir.jpg'
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
        description: 'Luxurious spicy-vanilla oriental',
      imageUrl: '/images/perfumes/al-qiam-gold.jpg'
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
        description: 'Rich oud-vanilla fusion',
      imageUrl: '/images/perfumes/zafeer-oud-vanille.jpg'
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
        description: 'Pegasus alternative with spicy-vanilla',
      imageUrl: '/images/perfumes/teriaq.jpg'
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
        description: 'JPG Ultra Male alternative, sweet spicy',
      imageUrl: '/images/perfumes/9pm.jpg'
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
        description: 'Prestigious oud with frankincense',
      imageUrl: '/images/perfumes/shumukh.jpg'
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
        description: 'Soft, feminine oud with violet',
      imageUrl: '/images/perfumes/oud-satin-mood.jpg'
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
        description: 'Warm amber-vanilla evening scent',
      imageUrl: '/images/perfumes/grand-soir.jpg'
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
        description: 'Luxurious white musk composition',
      imageUrl: '/images/perfumes/opulent-musk.jpg'
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
        description: 'Tuscan Leather alternative, powerful leather',
      imageUrl: '/images/perfumes/la-yuqawam.jpg'
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
        description: 'BR540 Extrait alternative, more intense',
      imageUrl: '/images/perfumes/ana-abiyedh-rouge.jpg'
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
        description: 'Magic of the Gulf, rich oriental',
      imageUrl: '/images/perfumes/sehr-al-khaleej.jpg'
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
        description: 'Passionate oud with rose heart',
      imageUrl: '/images/perfumes/shaghaf-oud.jpg'
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
        description: 'Green Irish Tweed alternative',
      imageUrl: '/images/perfumes/hunter-intense.jpg'
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
        description: 'BR540-inspired with saffron and cedar',
      imageUrl: '/images/perfumes/sillage.jpg'
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
        description: 'Initio Rehab alternative',
      imageUrl: '/images/perfumes/oud-lavender.jpg'
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
        description: 'Sophisticated spicy-sweet evening scent',
      imageUrl: '/images/perfumes/detour-noir.jpg'
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
        description: 'Herod-inspired tobacco-spice',
      imageUrl: '/images/perfumes/red-tobacco.jpg'
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
        description: 'Fresh oud with aromatic opening',
      imageUrl: '/images/perfumes/amber-oud-exclusif-bleu.jpg'
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
