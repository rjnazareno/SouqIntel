import axios from 'axios'
import { fallbackDupeRelations, fallbackPerfumes } from '../data/fallbackPerfumes'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Extract data from the API response wrapper
    if (response.data && response.data.success !== undefined) {
      return { ...response, data: response.data.data }
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

const fallbackResponse = (data) => Promise.resolve({ data })

const getFallbackPerfume = (id) => fallbackPerfumes.find((perfume) => perfume._id === id)

const filterFallbackPerfumes = (filters = {}) => {
  return fallbackPerfumes.filter((perfume) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      return String(perfume[key] || '').toLowerCase() === String(value).toLowerCase()
    })
  })
}

const searchFallbackPerfumes = (query) => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return []

  return fallbackPerfumes.filter((perfume) => {
    const brandName = perfume.brand?.name || ''
    return `${perfume.name} ${brandName}`.toLowerCase().includes(normalizedQuery)
  })
}

const hydrateDupeRelation = (relation, perfumeId) => {
  const original = getFallbackPerfume(relation.originalId)
  const dupe = getFallbackPerfume(relation.dupeId)

  return {
    ...relation,
    original,
    dupe,
    perfume: perfumeId === relation.originalId ? dupe : original
  }
}

const getFallbackDupes = (perfumeId) => {
  return fallbackDupeRelations
    .filter((relation) => relation.originalId === perfumeId || relation.dupeId === perfumeId)
    .map((relation) => hydrateDupeRelation(relation, perfumeId))
}

const getFallbackBrands = () => {
  const brands = new Map()
  fallbackPerfumes.forEach((perfume) => {
    if (perfume.brand) brands.set(perfume.brand._id, perfume.brand)
  })
  return [...brands.values()].sort((a, b) => a.name.localeCompare(b.name))
}

const getFallbackNotes = () => {
  const notes = new Map()
  fallbackPerfumes.forEach((perfume) => {
    Object.values(perfume.notes || {}).flat().forEach((note) => {
      notes.set(note.name, note)
    })
  })
  return [...notes.values()].sort((a, b) => a.name.localeCompare(b.name))
}

const withFallback = async (request, getFallbackData) => {
  try {
    return await request()
  } catch (error) {
    console.warn('API unavailable; using local fallback data.', error)
    return fallbackResponse(getFallbackData())
  }
}

const api = {
  // Perfumes
  getPerfumes: (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    return withFallback(
      () => apiClient.get(`/perfumes?${params}`),
      () => filterFallbackPerfumes(filters)
    )
  },

  getPerfume: (id) => withFallback(
    () => apiClient.get(`/perfumes/${id}`),
    () => getFallbackPerfume(id) || null
  ),

  searchPerfumes: (query) => withFallback(
    () => apiClient.get(`/perfumes/search?q=${encodeURIComponent(query)}`),
    () => searchFallbackPerfumes(query)
  ),

  // Dupes
  getDupes: (perfumeId) => withFallback(
    () => apiClient.get(`/dupes/${perfumeId}`),
    () => getFallbackDupes(perfumeId)
  ),

  getPopularDupes: () => withFallback(
    () => apiClient.get('/dupes/popular'),
    () => fallbackDupeRelations.map((relation) => hydrateDupeRelation(relation, relation.originalId))
  ),

  // Brands
  getBrands: () => withFallback(
    () => apiClient.get('/brands'),
    getFallbackBrands
  ),

  // Notes
  getNotes: () => withFallback(
    () => apiClient.get('/notes'),
    getFallbackNotes
  ),

  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),

  register: (userData) => apiClient.post('/auth/register', userData),

  getMe: () => apiClient.get('/auth/me'),
}

export default api
