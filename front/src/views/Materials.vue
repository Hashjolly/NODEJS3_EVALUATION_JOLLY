<template>
  <div class="materials-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <h1>🧱 Nos Matériaux</h1>
        <p>Découvrez notre sélection de matériaux de qualité pour vos projets</p>
      </div>

      <!-- Search and Filters -->
      <SearchBar
        placeholder="Rechercher des matériaux..."
        :filters="true"
        :categories="categories"
        @search="handleSearch"
        @category-change="handleCategoryChange"
      />

      <!-- Loading -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Chargement des matériaux...</p>
      </div>

      <!-- Error -->
      <div v-if="error" class="error">
        <p>❌ {{ error }}</p>
        <button @click="loadMaterials" class="btn btn-primary">
          Réessayer
        </button>
      </div>

      <!-- Results -->
      <div v-if="!loading && !error" class="results">
        <div class="results-header">
          <p>{{ filteredMaterials.length }} matériau(x) trouvé(s)</p>
          <div class="sort-options">
            <label for="sort">Trier par:</label>
            <select id="sort" v-model="sortBy" @change="handleSort">
              <option value="name">Nom</option>
              <option value="price">Prix</option>
              <option value="category">Catégorie</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>

        <!-- Materials Grid -->
        <div class="materials-grid">
          <div
            v-for="material in paginatedMaterials"
            :key="material._id"
            class="material-card"
            @click="viewMaterial(material._id)"
          >
            <div class="material-image">
              <img v-if="material.imageUrl" :src="material.imageUrl" :alt="material.name" />
              <div v-else class="no-image">
                <div class="no-image-icon">🧱</div>
              </div>
            </div>
            <div class="material-content">
              <h3>{{ material.name }}</h3>
              <p class="material-description">{{ material.description }}</p>
              <div class="material-properties">
                <span class="property-tag">{{ material.category }}</span>
                <span class="property-tag type-tag">
                  {{ material.type }}
                </span>
                <span class="property-tag">{{ material.texture }}</span>
              </div>
              <div class="material-footer">
                <div class="price">{{ formatPrice(material.unitPrice) }}/{{ material.unit }}</div>
                <div class="stock-status" :class="{ 'in-stock': material.inStock, 'out-of-stock': !material.inStock }">
                  {{ material.inStock ? '✅ En stock' : '❌ Rupture' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="btn btn-secondary"
          >
            ← Précédent
          </button>
          
          <div class="page-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="['btn', 'btn-page', { active: page === currentPage }]"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="btn btn-secondary"
          >
            Suivant →
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && filteredMaterials.length === 0" class="empty-state">
        <div class="empty-icon">🧱</div>
        <h3>Aucun matériau trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
        <button @click="clearFilters" class="btn btn-primary">
          Effacer les filtres
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import { materialService, type Material } from '../services/api'

const router = useRouter()

const materials = ref<Material[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = 12

const categories = ref<string[]>([])

const filteredMaterials = computed(() => {
  let filtered = materials.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.texture.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }

  filtered = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.unitPrice - b.unitPrice
      case 'category':
        return a.category.localeCompare(b.category)
      case 'type':
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredMaterials.value.length / itemsPerPage)
})

const paginatedMaterials = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredMaterials.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (current > 4) pages.push('...')
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 3) pages.push('...')
    pages.push(total)
  }

  return pages
})

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const loadMaterials = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const data = await materialService.getAll()
    materials.value = data
    
    const uniqueCategories = [...new Set(data.map(item => item.category))]
    categories.value = uniqueCategories.sort()
    
  } catch (err) {
    error.value = 'Erreur lors du chargement des matériaux'
    console.error('Error loading materials:', err)
  } finally {
    loading.value = false
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const handleCategoryChange = (category: string) => {
  selectedCategory.value = category
  currentPage.value = 1
}

const handleSort = () => {
  currentPage.value = 1
}

const viewMaterial = (id: string) => {
  router.push(`/materials/${id}`)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number | string) => {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}

onMounted(() => {
  loadMaterials()
})
</script>

<style scoped>
.materials-page {
  padding: 2rem 1rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-options label {
  font-weight: 500;
  color: #2c3e50;
}

.sort-options select {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: white;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.material-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.material-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.material-image {
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.material-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  text-align: center;
  color: #7f8c8d;
}

.no-image-icon {
  font-size: 4rem;
}

.material-content {
  padding: 1.5rem;
}

.material-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
}

.material-description {
  margin: 0 0 1rem 0;
  color: #7f8c8d;
  line-height: 1.6;
  height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.material-properties {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.property-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background: #ecf0f1;
  color: #2c3e50;
}

.type-tag {
  background-color: #3498db;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.material-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #27ae60;
}

.stock-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.stock-status.in-stock {
  background: #d5f4e6;
  color: #27ae60;
}

.stock-status.out-of-stock {
  background: #fadbd8;
  color: #e74c3c;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-page {
  background: #ecf0f1;
  color: #2c3e50;
  min-width: 40px;
}

.btn-page:hover {
  background: #d5dbdb;
}

.btn-page.active {
  background: #3498db;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .materials-page {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .results-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .materials-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
