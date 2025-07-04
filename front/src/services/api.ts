import axios from 'axios'

const API_BASE_URL = 'http://localhost:3004'

// Configuration axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Types TypeScript
export interface Furniture {
  _id: string
  name: string
  description: string
  category: string
  materials: Array<{
    material: Material
    quantity: number
    unit: string
    _id: string
  }>
  totalCost: number
  status: string
  keywords: string[]
  notes?: string
  designDate: string
  createdAt: string
  updatedAt: string
}

export interface Material {
  _id: string
  name: string
  description: string
  category: string
  type: string
  supplier: string
  unitPrice: number
  unit: string
  keywords: string[]
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  _id: string
  name: string
  description: string
  contact: {
    email: string
    phone: string
    address: string
  }
  createdAt: string
  updatedAt: string
}

// Services API
export const furnitureService = {
  // Récupérer tous les meubles
  getAll: async (): Promise<Furniture[]> => {
    const response = await apiClient.get('/api/furniture')
    return response.data
  },

  // Récupérer un meuble par ID
  getById: async (id: string): Promise<Furniture> => {
    const response = await apiClient.get(`/api/furniture/${id}`)
    return response.data
  },

  // Rechercher des meubles
  search: async (query: string): Promise<Furniture[]> => {
    const response = await apiClient.get(`/api/search?q=${encodeURIComponent(query)}`)
    return response.data.furniture
  },

  // Filtrer par catégorie
  getByCategory: async (category: string): Promise<Furniture[]> => {
    const response = await apiClient.get(`/api/furniture?category=${encodeURIComponent(category)}`)
    return response.data
  }
}

export const materialService = {
  // Récupérer tous les matériaux
  getAll: async (): Promise<Material[]> => {
    const response = await apiClient.get('/api/materials')
    return response.data
  },

  // Récupérer un matériau par ID
  getById: async (id: string): Promise<Material> => {
    const response = await apiClient.get(`/api/materials/${id}`)
    return response.data
  },

  // Rechercher des matériaux
  search: async (query: string): Promise<Material[]> => {
    const response = await apiClient.get(`/api/search?q=${encodeURIComponent(query)}`)
    return response.data.materials
  },

  // Filtrer par catégorie
  getByCategory: async (category: string): Promise<Material[]> => {
    const response = await apiClient.get(`/api/materials?category=${encodeURIComponent(category)}`)
    return response.data
  }
}

export const supplierService = {
  // Récupérer tous les fournisseurs
  getAll: async (): Promise<Supplier[]> => {
    const response = await apiClient.get('/api/suppliers')
    return response.data
  },

  // Récupérer un fournisseur par ID
  getById: async (id: string): Promise<Supplier> => {
    const response = await apiClient.get(`/api/suppliers/${id}`)
    return response.data
  },

  // Rechercher des fournisseurs
  search: async (query: string): Promise<Supplier[]> => {
    const response = await apiClient.get(`/api/search?q=${encodeURIComponent(query)}`)
    return response.data.suppliers
  }
}

export default apiClient
