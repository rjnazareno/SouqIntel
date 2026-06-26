import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Brand from './models/Brand.js'
import Note from './models/Note.js'
import Perfume from './models/Perfume.js'
import DupeRelation from './models/DupeRelation.js'
import { fallbackDupeRelations, fallbackPerfumes } from '../../client/src/data/fallbackPerfumes.js'

dotenv.config()

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/souqintel'

const upsertBrand = async (brand) => {
  return Brand.findOneAndUpdate(
    { name: brand.name },
    {
      name: brand.name,
      origin: brand.origin || '',
      type: brand.type,
      description: `${brand.name} fragrance house`
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
}

const upsertNote = async (note) => {
  return Note.findOneAndUpdate(
    { name: note.name },
    {
      name: note.name,
      category: note.category || 'fresh',
      description: `${note.name} fragrance note`
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
}

const mapNotes = async (noteGroups) => {
  const mapped = { top: [], middle: [], base: [] }

  for (const layer of Object.keys(mapped)) {
    for (const note of noteGroups?.[layer] || []) {
      const doc = await upsertNote(note)
      mapped[layer].push(doc._id)
    }
  }

  return mapped
}

const seedFallbackCatalog = async () => {
  await mongoose.connect(mongoUri)
  console.log('MongoDB connected')

  const perfumeByFallbackId = new Map()

  for (const perfume of fallbackPerfumes) {
    const brand = await upsertBrand(perfume.brand)
    const notes = await mapNotes(perfume.notes)

    const doc = await Perfume.findOneAndUpdate(
      { name: perfume.name },
      {
        name: perfume.name,
        brand: brand._id,
        type: perfume.type,
        category: perfume.category,
        gender: perfume.gender,
        notes,
        priceRange: perfume.priceRange,
        concentration: perfume.concentration,
        longevity: perfume.longevity,
        sillage: perfume.sillage,
        imageUrl: perfume.imageUrl || '',
        description: perfume.description || ''
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    perfumeByFallbackId.set(perfume._id, doc)
  }

  let relationCount = 0

  for (const relation of fallbackDupeRelations) {
    const original = perfumeByFallbackId.get(relation.originalId)
    const dupe = perfumeByFallbackId.get(relation.dupeId)

    if (!original || !dupe) {
      console.warn(`Skipping relation with missing perfume: ${relation._id}`)
      continue
    }

    await DupeRelation.findOneAndUpdate(
      { original: original._id, dupe: dupe._id },
      {
        original: original._id,
        dupe: dupe._id,
        similarityScore: relation.similarityScore,
        priceComparison: {
          originalPrice: relation.priceComparison?.originalPrice || 0,
          dupePrice: relation.priceComparison?.dupePrice || 0,
          savings: relation.priceComparison?.savings || 0
        },
        verifiedBy: relation.verifiedBy || 'community'
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    relationCount += 1
  }

  console.log(`Seeded ${fallbackPerfumes.length} perfumes`)
  console.log(`Seeded ${relationCount} dupe relationships`)
}

seedFallbackCatalog()
  .then(() => mongoose.disconnect())
  .catch(async (error) => {
    console.error('Catalog seed failed:', error.message)
    await mongoose.disconnect()
    process.exit(1)
  })
