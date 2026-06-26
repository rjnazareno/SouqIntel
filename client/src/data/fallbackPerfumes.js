import { expandedDupeRelations, expandedPerfumes } from './expandedDupeCatalog.js'

const note = (name, category = '') => ({ name, category })

export const fallbackPerfumes = [
  {
    _id: 'baccarat-rouge-540',
    name: 'Baccarat Rouge 540',
    brand: { _id: 'maison-francis-kurkdjian', name: 'Maison Francis Kurkdjian', origin: 'France', type: 'niche' },
    type: 'niche',
    category: 'amber',
    gender: 'unisex',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 9,
    sillage: 9,
    imageUrl: '/images/perfumes/baccarat-rouge-540.jpg',
    description: 'A luminous amber fragrance with saffron, jasmine, cedar, and musky warmth.',
    notes: {
      top: [note('Saffron', 'spicy'), note('Jasmine', 'floral')],
      middle: [note('Ambergris', 'animalic'), note('Cedar', 'woody')],
      base: [note('Amber', 'oriental'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'ana-abiyedh-rouge',
    name: 'Ana Abiyedh Rouge',
    brand: { _id: 'lattafa', name: 'Lattafa', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'amber',
    gender: 'unisex',
    priceRange: 'budget',
    concentration: 'EDP',
    longevity: 8,
    sillage: 8,
    imageUrl: '/images/perfumes/ana-abiyedh-rouge.jpg',
    description: 'A sweet, airy amber scent with saffron brightness and a musky drydown.',
    notes: {
      top: [note('Saffron', 'spicy'), note('Bitter Almond', 'gourmand')],
      middle: [note('Jasmine', 'floral'), note('Cedar', 'woody')],
      base: [note('Ambergris', 'animalic'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'qaaed',
    name: 'Qaaed',
    brand: { _id: 'lattafa', name: 'Lattafa', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'amber',
    gender: 'unisex',
    priceRange: 'budget',
    concentration: 'EDP',
    longevity: 9,
    sillage: 9,
    imageUrl: '/images/perfumes/qaaed.jpg',
    description: 'A powerful saffron, jasmine, amber, and vanilla profile inspired by Baccarat Rouge 540.',
    notes: {
      top: [note('Saffron', 'spicy'), note('Bergamot', 'citrus')],
      middle: [note('Jasmine', 'floral'), note('Rose', 'floral')],
      base: [note('Amber', 'oriental'), note('Vanilla', 'gourmand'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'sillage',
    name: 'Sillage',
    brand: { _id: 'armaf', name: 'Armaf', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'amber',
    gender: 'unisex',
    priceRange: 'budget',
    concentration: 'EDP',
    longevity: 9,
    sillage: 9,
    imageUrl: '/images/perfumes/sillage.jpg',
    description: 'A saffron, ginger, jasmine, cedar, and amber fragrance with a BR540-like trail.',
    notes: {
      top: [note('Saffron', 'spicy'), note('Ginger', 'spicy')],
      middle: [note('Jasmine', 'floral'), note('Cedar', 'woody')],
      base: [note('Amber', 'oriental'), note('Vanilla', 'gourmand'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'aventus',
    name: 'Aventus',
    brand: { _id: 'creed', name: 'Creed', origin: 'UK', type: 'niche' },
    type: 'niche',
    category: 'fresh',
    gender: 'masculine',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 8,
    sillage: 8,
    imageUrl: '/images/perfumes/aventus.jpg',
    description: 'A crisp fruity-woody scent built around bergamot, spice, florals, musk, and patchouli.',
    notes: {
      top: [note('Bergamot', 'citrus'), note('Pepper', 'spicy'), note('Ginger', 'spicy')],
      middle: [note('Rose', 'floral'), note('Jasmine', 'floral')],
      base: [note('Musk', 'animalic'), note('Sandalwood', 'woody'), note('Patchouli', 'woody')]
    }
  },
  {
    _id: 'club-de-nuit-intense-man',
    name: 'Club de Nuit Intense Man',
    brand: { _id: 'armaf', name: 'Armaf', origin: 'UAE', type: 'arabian' },
    type: 'clone',
    category: 'fresh',
    gender: 'masculine',
    priceRange: 'budget',
    concentration: 'EDT',
    longevity: 8,
    sillage: 8,
    imageUrl: '/images/perfumes/hunter-intense.jpg',
    description: 'A bold citrus, smoky woods, and musk profile with strong performance.',
    notes: {
      top: [note('Lemon', 'citrus'), note('Bergamot', 'citrus')],
      middle: [note('Rose', 'floral'), note('Jasmine', 'floral')],
      base: [note('Musk', 'animalic'), note('Patchouli', 'woody'), note('Ambergris', 'animalic')]
    }
  },
  {
    _id: 'oud-wood',
    name: 'Oud Wood',
    brand: { _id: 'tom-ford', name: 'Tom Ford', origin: 'USA', type: 'designer' },
    type: 'designer',
    category: 'oud',
    gender: 'unisex',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 7,
    sillage: 6,
    imageUrl: '/images/perfumes/oud-wood.jpg',
    description: 'Smooth oud and sandalwood with cardamom spice and a polished amber base.',
    notes: {
      top: [note('Cardamom', 'spicy'), note('Pepper', 'spicy')],
      middle: [note('Oud', 'woody'), note('Sandalwood', 'woody')],
      base: [note('Amber', 'oriental'), note('Vanilla', 'gourmand')]
    }
  },
  {
    _id: 'oud-lavender',
    name: 'Oud Lavender',
    brand: { _id: 'ahmed-al-maghribi', name: 'Ahmed Al Maghribi', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'oud',
    gender: 'unisex',
    priceRange: 'mid',
    concentration: 'EDP',
    longevity: 8,
    sillage: 7,
    imageUrl: '/images/perfumes/oud-lavender.jpg',
    description: 'A clean aromatic oud with lavender freshness and creamy woods.',
    notes: {
      top: [note('Lavender', 'fresh'), note('Bergamot', 'citrus')],
      middle: [note('Oud', 'woody'), note('Sage', 'fresh')],
      base: [note('Sandalwood', 'woody'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'tobacco-vanille',
    name: 'Tobacco Vanille',
    brand: { _id: 'tom-ford', name: 'Tom Ford', origin: 'USA', type: 'designer' },
    type: 'designer',
    category: 'spicy',
    gender: 'unisex',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 9,
    sillage: 8,
    imageUrl: '/images/perfumes/tobacco-vanille.jpeg',
    description: 'A rich tobacco and vanilla fragrance with warm spice, cocoa, and dried fruits.',
    notes: {
      top: [note('Tobacco', 'oriental'), note('Spices', 'spicy')],
      middle: [note('Vanilla', 'gourmand'), note('Cocoa', 'gourmand')],
      base: [note('Tonka', 'gourmand'), note('Dried Fruits', 'gourmand')]
    }
  },
  {
    _id: 'interlude-man',
    name: 'Interlude Man',
    brand: { _id: 'amouage', name: 'Amouage', origin: 'Oman', type: 'niche' },
    type: 'niche',
    category: 'oud',
    gender: 'masculine',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 10,
    sillage: 10,
    imageUrl: '/images/perfumes/interlude-man.jpg',
    description: 'A dense smoky oud and incense fragrance with oregano, frankincense, amber, and leather.',
    notes: {
      top: [note('Bergamot', 'citrus'), note('Oregano', 'fresh')],
      middle: [note('Frankincense', 'oriental'), note('Oud', 'woody'), note('Amber', 'oriental')],
      base: [note('Sandalwood', 'woody'), note('Musk', 'animalic'), note('Leather', 'animalic')]
    }
  },
  {
    _id: 'shumukh',
    name: 'Shumukh',
    brand: { _id: 'afnan', name: 'Afnan', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'oud',
    gender: 'unisex',
    priceRange: 'mid',
    concentration: 'EDP',
    longevity: 10,
    sillage: 9,
    imageUrl: '/images/perfumes/shumukh.jpg',
    description: 'A prestigious oud fragrance with saffron, rose, frankincense, amber, and musk.',
    notes: {
      top: [note('Saffron', 'spicy'), note('Rose', 'floral')],
      middle: [note('Oud', 'woody'), note('Frankincense', 'oriental')],
      base: [note('Sandalwood', 'woody'), note('Amber', 'oriental'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'grand-soir',
    name: 'Grand Soir',
    brand: { _id: 'maison-francis-kurkdjian', name: 'Maison Francis Kurkdjian', origin: 'France', type: 'niche' },
    type: 'niche',
    category: 'amber',
    gender: 'unisex',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 10,
    sillage: 8,
    imageUrl: '/images/perfumes/grand-soir.jpg',
    description: 'A warm amber and vanilla evening scent with benzoin, tonka, and soft aromatic lift.',
    notes: {
      top: [note('Bergamot', 'citrus'), note('Lavender', 'fresh')],
      middle: [note('Benzoin', 'oriental'), note('Amber', 'oriental')],
      base: [note('Vanilla', 'gourmand'), note('Tonka', 'gourmand')]
    }
  },
  {
    _id: 'al-qiam-gold',
    name: 'Al Qiam Gold',
    brand: { _id: 'lattafa', name: 'Lattafa', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'oriental',
    gender: 'unisex',
    priceRange: 'budget',
    concentration: 'EDP',
    longevity: 10,
    sillage: 9,
    imageUrl: '/images/perfumes/al-qiam-gold.jpg',
    description: 'A spicy vanilla oriental fragrance with cinnamon, saffron, rose, benzoin, amber, and musk.',
    notes: {
      top: [note('Cinnamon', 'spicy'), note('Saffron', 'spicy')],
      middle: [note('Rose', 'floral'), note('Vanilla', 'gourmand')],
      base: [note('Amber', 'oriental'), note('Benzoin', 'oriental'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'zafeer-oud-vanille',
    name: 'Zafeer Oud Vanille',
    brand: { _id: 'paris-corner', name: 'Paris Corner', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'oriental',
    gender: 'unisex',
    priceRange: 'budget',
    concentration: 'EDP',
    longevity: 10,
    sillage: 9,
    imageUrl: '/images/perfumes/zafeer-oud-vanille.jpg',
    description: 'A rich oud and vanilla fusion with saffron, cardamom, rose, amber, and musk.',
    notes: {
      top: [note('Saffron', 'spicy'), note('Cardamom', 'spicy')],
      middle: [note('Oud', 'woody'), note('Rose', 'floral')],
      base: [note('Vanilla', 'gourmand'), note('Amber', 'oriental'), note('Musk', 'animalic')]
    }
  },
  {
    _id: 'oud-satin-mood',
    name: 'Oud Satin Mood',
    brand: { _id: 'maison-francis-kurkdjian', name: 'Maison Francis Kurkdjian', origin: 'France', type: 'niche' },
    type: 'niche',
    category: 'oud',
    gender: 'unisex',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 9,
    sillage: 8,
    imageUrl: '/images/perfumes/oud-satin-mood.jpg',
    description: 'A soft rose, violet, oud, benzoin, and vanilla fragrance with a satin-like warmth.',
    notes: {
      top: [note('Violet', 'floral'), note('Rose', 'floral')],
      middle: [note('Oud', 'woody'), note('Benzoin', 'oriental')],
      base: [note('Vanilla', 'gourmand'), note('Sandalwood', 'woody')]
    }
  },
  {
    _id: 'shaghaf-oud',
    name: 'Shaghaf Oud',
    brand: { _id: 'swiss-arabian', name: 'Swiss Arabian', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'oud',
    gender: 'unisex',
    priceRange: 'budget',
    concentration: 'EDP',
    longevity: 9,
    sillage: 9,
    imageUrl: '/images/perfumes/shaghaf-oud.jpg',
    description: 'A sweet oud and praline fragrance with rose, saffron, and vanilla warmth.',
    notes: {
      top: [note('Saffron', 'spicy'), note('Oud', 'woody')],
      middle: [note('Rose', 'floral'), note('Praline', 'gourmand')],
      base: [note('Vanilla', 'gourmand'), note('Oud', 'woody')]
    }
  },
  {
    _id: 'black-orchid',
    name: 'Black Orchid',
    brand: { _id: 'tom-ford', name: 'Tom Ford', origin: 'USA', type: 'designer' },
    type: 'designer',
    category: 'floral',
    gender: 'unisex',
    priceRange: 'luxury',
    concentration: 'EDP',
    longevity: 9,
    sillage: 8,
    imageUrl: '/images/perfumes/black-orchid.jpg',
    description: 'Dark florals, truffle, patchouli, and chocolate in a dramatic evening profile.',
    notes: {
      top: [note('Truffle', 'gourmand'), note('Bergamot', 'citrus')],
      middle: [note('Orchid', 'floral'), note('Jasmine', 'floral')],
      base: [note('Patchouli', 'woody'), note('Chocolate', 'gourmand')]
    }
  },
  {
    _id: 'sauvage',
    name: 'Sauvage',
    brand: { _id: 'dior', name: 'Dior', origin: 'France', type: 'designer' },
    type: 'designer',
    category: 'fresh',
    gender: 'masculine',
    priceRange: 'luxury',
    concentration: 'EDT',
    longevity: 8,
    sillage: 8,
    imageUrl: '/images/perfumes/sauvage.jpg',
    description: 'Fresh bergamot and pepper over clean ambroxan and musky woods.',
    notes: {
      top: [note('Bergamot', 'citrus'), note('Pepper', 'spicy')],
      middle: [note('Lavender', 'fresh'), note('Geranium', 'floral')],
      base: [note('Ambergris', 'animalic'), note('Cedar', 'woody')]
    }
  },
  {
    _id: '9pm',
    name: '9PM',
    brand: { _id: 'afnan', name: 'Afnan', origin: 'UAE', type: 'arabian' },
    type: 'arabian',
    category: 'fresh',
    gender: 'masculine',
    priceRange: 'budget',
    concentration: 'EDP',
    longevity: 8,
    sillage: 8,
    imageUrl: '/images/perfumes/9pm.jpg',
    description: 'A sweet fresh aromatic scent with apple, vanilla, and tonka warmth.',
    notes: {
      top: [note('Apple', 'fresh'), note('Bergamot', 'citrus')],
      middle: [note('Lavender', 'fresh'), note('Orange Blossom', 'floral')],
      base: [note('Vanilla', 'gourmand'), note('Tonka', 'gourmand')]
    }
  },
  ...expandedPerfumes
]

export const fallbackDupeRelations = [
  {
    _id: 'dupe-br540-ana-abiyedh-rouge',
    originalId: 'baccarat-rouge-540',
    dupeId: 'ana-abiyedh-rouge',
    similarityScore: 90,
    priceComparison: { savings: 92 }
  },
  {
    _id: 'dupe-br540-qaaed',
    originalId: 'baccarat-rouge-540',
    dupeId: 'qaaed',
    similarityScore: 88,
    priceComparison: { savings: 93 }
  },
  {
    _id: 'dupe-br540-sillage',
    originalId: 'baccarat-rouge-540',
    dupeId: 'sillage',
    similarityScore: 82,
    priceComparison: { savings: 91 }
  },
  {
    _id: 'dupe-aventus-club-de-nuit',
    originalId: 'aventus',
    dupeId: 'club-de-nuit-intense-man',
    similarityScore: 84,
    priceComparison: { savings: 90 }
  },
  {
    _id: 'dupe-oud-wood-oud-lavender',
    originalId: 'oud-wood',
    dupeId: 'oud-lavender',
    similarityScore: 78,
    priceComparison: { savings: 74 }
  },
  {
    _id: 'dupe-tobacco-vanille-zafeer',
    originalId: 'tobacco-vanille',
    dupeId: 'zafeer-oud-vanille',
    similarityScore: 76,
    priceComparison: { savings: 68 }
  },
  {
    _id: 'dupe-interlude-man-shumukh',
    originalId: 'interlude-man',
    dupeId: 'shumukh',
    similarityScore: 75,
    priceComparison: { savings: 88 }
  },
  {
    _id: 'dupe-grand-soir-al-qiam-gold',
    originalId: 'grand-soir',
    dupeId: 'al-qiam-gold',
    similarityScore: 78,
    priceComparison: { savings: 93 }
  },
  {
    _id: 'dupe-oud-satin-mood-shaghaf-oud',
    originalId: 'oud-satin-mood',
    dupeId: 'shaghaf-oud',
    similarityScore: 75,
    priceComparison: { savings: 86 }
  },
  {
    _id: 'dupe-sauvage-9pm',
    originalId: 'sauvage',
    dupeId: 'afnan-modest-une',
    similarityScore: 82,
    priceComparison: { savings: 82 }
  },
  ...expandedDupeRelations
]
