<template>
  <div class="furniture-page">
    <div class="container-fluid">
      <!-- Header -->
      <div class="page-header">
        <h1>🪑 Nos Meubles</h1>
        <p>Découvrez notre collection de meubles design et fonctionnels</p>
      </div>

      <!-- Search and Filters -->
      <SearchBar
        placeholder="Rechercher des meubles..."
        :filters="true"
        :categories="categories"
        @search="handleSearch"
        @category-change="handleCategoryChange"
      />

      <!-- Loading -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Chargement des meubles...</p>
      </div>

      <!-- Error -->
      <div v-if="error" class="error">
        <p>❌ {{ error }}</p>
        <button @click="loadFurniture" class="btn btn-primary">
          Réessayer
        </button>
      </div>

      <!-- Results -->
      <div v-if="!loading && !error" class="results">
        <div class="results-header">
          <p>{{ filteredFurniture.length }} meuble(s) trouvé(s)</p>
          <div class="sort-options">
            <label for="sort">Trier par:</label>
            <select id="sort" v-model="sortBy" @change="handleSort">
              <option value="name">Nom</option>
              <option value="price">Prix</option>
              <option value="category">Catégorie</option>
              <option value="createdAt">Date</option>
            </select>
          </div>
        </div>

        <!-- Furniture Grid -->
        <div class="furniture-grid">
          <Card
            v-for="item in paginatedFurniture"
            :key="item._id"
            :title="item.name"
            :description="item.description"
            :price="item.totalCost"
            :category="item.category"
            @click="viewFurniture(item._id)"
          />
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
      <div v-if="!loading && !error && filteredFurniture.length === 0" class="empty-state">
        <div class="empty-icon">🪑</div>
        <h3>Aucun meuble trouvé</h3>
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
import Card from '../components/Card.vue'
import { furnitureService, type Furniture } from '../services/api'

const router = useRouter()

const furniture = ref<Furniture[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = 12

const categories = ref<string[]>([])

const filteredFurniture = computed(() => {
  let filtered = furniture.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.totalCost - b.totalCost
      case 'category':
        return a.category.localeCompare(b.category)
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredFurniture.value.length / itemsPerPage)
})

const paginatedFurniture = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredFurniture.value.slice(start, end)
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

const loadFurniture = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const data = await furnitureService.getAll()
    furniture.value = data
    
    // Extract unique categories
    const uniqueCategories = [...new Set(data.map(item => item.category))]
    categories.value = uniqueCategories.sort()
    
  } catch (err) {
    error.value = 'Erreur lors du chargement des meubles'
    console.error('Error loading furniture:', err)
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

const viewFurniture = (id: string) => {
  router.push(`/furniture/${id}`)
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
  loadFurniture()
})
</script>

<style scoped>
.furniture-page {
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

.furniture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
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
  .furniture-page {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .results-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .furniture-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
