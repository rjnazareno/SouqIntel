import { fallbackDupeRelations, fallbackPerfumes } from '../../../client/src/data/fallbackPerfumes.js'

export const getFallbackPerfume = (id) => fallbackPerfumes.find((perfume) => perfume._id === id)

export const filterFallbackPerfumes = (filters = {}) => {
  return fallbackPerfumes.filter((perfume) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      return String(perfume[key] || '').toLowerCase() === String(value).toLowerCase()
    })
  })
}

export const searchFallbackPerfumes = (query) => {
  const normalizedQuery = String(query || '').trim().toLowerCase()
  if (!normalizedQuery) return []

  return fallbackPerfumes.filter((perfume) => {
    const brandName = perfume.brand?.name || ''
    return `${perfume.name} ${brandName}`.toLowerCase().includes(normalizedQuery)
  })
}

export const getFallbackBrands = (type) => {
  const brands = new Map()
  fallbackPerfumes.forEach((perfume) => {
    if (perfume.brand && (!type || perfume.brand.type === type)) {
      brands.set(perfume.brand._id, perfume.brand)
    }
  })
  return [...brands.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export const getFallbackNotes = (category) => {
  const notes = new Map()
  fallbackPerfumes.forEach((perfume) => {
    Object.values(perfume.notes || {}).flat().forEach((note) => {
      if (!category || note.category === category) notes.set(note.name, note)
    })
  })
  return [...notes.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export const hydrateFallbackDupeRelation = (relation, perfumeId = relation.originalId) => {
  const original = getFallbackPerfume(relation.originalId)
  const dupe = getFallbackPerfume(relation.dupeId)

  return {
    ...relation,
    original,
    dupe,
    perfume: perfumeId === relation.originalId ? dupe : original
  }
}

export const getFallbackDupes = (perfumeId) => {
  return fallbackDupeRelations
    .filter((relation) => relation.originalId === perfumeId || relation.dupeId === perfumeId)
    .map((relation) => hydrateFallbackDupeRelation(relation, perfumeId))
}

export const getPopularFallbackDupes = () => {
  return fallbackDupeRelations.map((relation) => hydrateFallbackDupeRelation(relation))
}

export const fallbackPagination = ({ page, limit, total }) => ({
  page,
  limit,
  total,
  pages: Math.ceil(total / limit)
})
