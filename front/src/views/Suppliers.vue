<template>
  <div class="suppliers-page">
    <div class="container">
      <div class="page-header">
        <h1>🏭 Nos Fournisseurs</h1>
        <p>Découvrez nos partenaires de confiance</p>
      </div>

      <SearchBar
        placeholder="Rechercher des fournisseurs..."
        @search="handleSearch"
      />

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Chargement des fournisseurs...</p>
      </div>

      <div v-if="error" class="error">
        <p>❌ {{ error }}</p>
        <button @click="loadSuppliers" class="btn btn-primary">Réessayer</button>
      </div>

      <div v-if="!loading && !error" class="suppliers-grid">
        <div
          v-for="supplier in filteredSuppliers"
          :key="supplier._id"
          class="supplier-card"
          @click="viewSupplier(supplier._id)"
        >
          <div class="supplier-header">
            <h3>{{ supplier.name }}</h3>
          </div>
          <p class="supplier-description">{{ supplier.description }}</p>
          <div class="supplier-contact">
            <p>📧 {{ supplier.contact.email }}</p>
            <p>📞 {{ supplier.contact.phone }}</p>
            <p>📍 {{ supplier.contact.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import { supplierService, type Supplier } from '../services/api'

const router = useRouter()
const suppliers = ref<Supplier[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')

const filteredSuppliers = computed(() => {
  if (!searchQuery.value) return suppliers.value
  
  const query = searchQuery.value.toLowerCase()
  return suppliers.value.filter(supplier =>
    supplier.name.toLowerCase().includes(query) ||
    supplier.description.toLowerCase().includes(query) ||
    supplier.contact.email.toLowerCase().includes(query) ||
    supplier.contact.address.toLowerCase().includes(query)
  )
})

const loadSuppliers = async () => {
  try {
    loading.value = true
    error.value = ''
    suppliers.value = await supplierService.getAll()
  } catch (err) {
    error.value = 'Erreur lors du chargement des fournisseurs'
    console.error('Error loading suppliers:', err)
  } finally {
    loading.value = false
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const viewSupplier = (id: string) => {
  router.push(`/suppliers/${id}`)
}

onMounted(() => {
  loadSuppliers()
})
</script>

<style scoped>
.suppliers-page {
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

.suppliers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.supplier-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.supplier-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.supplier-header h3 {
  color: #2c3e50;
  margin: 0;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stars {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.rating-value {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.supplier-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.supplier-contact {
  margin-bottom: 1rem;
}

.supplier-contact p {
  margin: 0.25rem 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.supplier-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.specialty-tag {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-weight: 500;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

@media (max-width: 768px) {
  .suppliers-page {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .suppliers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
