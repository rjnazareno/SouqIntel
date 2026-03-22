import axios from 'axios'

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

const api = {
  // Perfumes
  getPerfumes: (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    return apiClient.get(`/perfumes?${params}`)
  },

  getPerfume: (id) => apiClient.get(`/perfumes/${id}`),

  searchPerfumes: (query) => apiClient.get(`/perfumes/search?q=${encodeURIComponent(query)}`),

  // Dupes
  getDupes: (perfumeId) => apiClient.get(`/dupes/${perfumeId}`),

  getPopularDupes: () => apiClient.get('/dupes/popular'),

  // Brands
  getBrands: () => apiClient.get('/brands'),

  // Notes
  getNotes: () => apiClient.get('/notes'),

  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),

  register: (userData) => apiClient.post('/auth/register', userData),

  getMe: () => apiClient.get('/auth/me'),
}

export default api
