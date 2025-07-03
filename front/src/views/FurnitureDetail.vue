<template>
  <div class="furniture-detail">
    <div class="container">
      <!-- Loading -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Chargement des détails...</p>
      </div>

      <!-- Error -->
      <div v-if="error" class="error">
        <p>❌ {{ error }}</p>
        <router-link to="/furniture" class="btn btn-primary">
          Retour aux meubles
        </router-link>
      </div>

      <!-- Furniture Details -->
      <div v-if="furniture && !loading && !error" class="furniture-content">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span>/</span>
          <router-link to="/furniture">Meubles</router-link>
          <span>/</span>
          <span>{{ furniture.name }}</span>
        </nav>

        <div class="furniture-layout">
          <!-- Image Section -->
          <div class="furniture-image">
            <div class="image-container">
              <img
                v-if="furniture.imageUrl"
                :src="furniture.imageUrl"
                :alt="furniture.name"
                class="main-image"
              />
              <div v-else class="no-image">
                <div class="no-image-icon">🪑</div>
                <p>Aucune image disponible</p>
              </div>
            </div>
          </div>

          <!-- Details Section -->
          <div class="furniture-details">
            <div class="furniture-header">
              <h1>{{ furniture.name }}</h1>
              <div class="furniture-meta">
                <span class="category">{{ furniture.category }}</span>
                <span class="stock-status" :class="{ 'in-stock': isAvailable, 'out-of-stock': !isAvailable }">
                  {{ getStockStatus() }}
                </span>
              </div>
            </div>

            <div class="price-section">
              <div class="price">{{ formatPrice(furniture.totalCost) }}</div>
            </div>

            <div class="description">
              <h3>Description</h3>
              <p>{{ furniture.description }}</p>
            </div>

            <div class="specifications">
              <h3>Spécifications</h3>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-label">Statut:</span>
                  <span class="spec-value">{{ furniture.status }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Coût total:</span>
                  <span class="spec-value">{{ formatPrice(furniture.totalCost) }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Date de création:</span>
                  <span class="spec-value">{{ formatDate(furniture.designDate) }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Catégorie:</span>
                  <span class="spec-value">{{ furniture.category }}</span>
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="btn btn-primary" :disabled="!isAvailable">
                {{ isAvailable ? '📞 Nous contacter' : 'Indisponible' }}
              </button>
              <router-link to="/contact" class="btn btn-secondary">
                💬 Demander un devis
              </router-link>
            </div>
          </div>
        </div>

        <!-- Materials Section -->
        <div v-if="furniture.materials && furniture.materials.length > 0" class="materials-section">
          <h3>Matériaux utilisés</h3>
          <div class="materials-grid">
            <div
              v-for="materialItem in furniture.materials"
              :key="materialItem.material._id"
              class="material-card"
              @click="viewMaterial(materialItem.material._id)"
            >
              <div class="material-info">
                <h4>{{ materialItem.material.name }}</h4>
                <p class="material-category">{{ materialItem.material.category }}</p>
                <p class="material-quantity">Quantité: {{ materialItem.quantity }}</p>
              </div>
              <div class="material-price">
                {{ formatPrice(materialItem.material.unitPrice) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Supplier Section -->
        <div v-if="furniture.supplier" class="supplier-section">
          <h3>Fournisseur</h3>
          <div class="supplier-card" @click="viewSupplier(furniture.supplier._id)">
            <div class="supplier-info">
              <h4>{{ furniture.supplier.name }}</h4>
              <p>{{ furniture.supplier.description }}</p>
              <div class="supplier-contact">
                <p><strong>📧</strong> {{ furniture.supplier.contactInfo.email }}</p>
                <p><strong>📞</strong> {{ furniture.supplier.contactInfo.phone }}</p>
                <p><strong>📍</strong> {{ furniture.supplier.contactInfo.address }}</p>
              </div>
            </div>
            <div class="supplier-rating">
              <div class="rating">
                <span class="stars">{{ '⭐'.repeat(Math.floor(furniture.supplier.rating)) }}</span>
                <span class="rating-value">{{ furniture.supplier.rating }}/5</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="back-section">
          <router-link to="/furniture" class="btn btn-secondary">
            ← Retour aux meubles
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { furnitureService, type Furniture } from '../services/api'

const route = useRoute()
const router = useRouter()

const furniture = ref<Furniture | null>(null)
const loading = ref(true)
const error = ref('')

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const viewMaterial = (id: string) => {
  router.push(`/materials/${id}`)
}

const viewSupplier = (id: string) => {
  router.push(`/suppliers/${id}`)
}

const isAvailable = computed(() => {
  if (!furniture.value) return false
  // Un meuble est disponible s'il est terminé ou livré
  return furniture.value.status === 'Terminé' || furniture.value.status === 'Livré'
})

const getStockStatus = () => {
  if (!furniture.value) return 'Indisponible'
  
  switch (furniture.value.status) {
    case 'Conception':
      return 'En conception'
    case 'En production':
      return 'En cours de production'
    case 'Terminé':
      return 'Disponible'
    case 'Livré':
      return 'Livré'
    default:
      return 'Indisponible'
  }
}

onMounted(async () => {
  try {
    const id = route.params.id as string
    if (!id) {
      error.value = 'ID du meuble manquant'
      return
    }

    furniture.value = await furnitureService.getById(id)
  } catch (err) {
    error.value = 'Erreur lors du chargement du meuble'
    console.error('Error loading furniture:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.furniture-detail {
  padding: 2rem 1rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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

.breadcrumb {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.breadcrumb a {
  color: #3498db;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span {
  color: #7f8c8d;
  margin: 0 0.5rem;
}

.furniture-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.furniture-image {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.image-container {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
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
  margin-bottom: 1rem;
}

.furniture-details {
  padding: 1rem 0;
}

.furniture-header {
  margin-bottom: 2rem;
}

.furniture-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.furniture-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.category {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.stock-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
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

.price-section {
  margin-bottom: 2rem;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  color: #27ae60;
}

.description {
  margin-bottom: 2rem;
}

.description h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.description p {
  color: #7f8c8d;
  line-height: 1.7;
}

.specifications {
  margin-bottom: 2rem;
}

.specifications h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.spec-label {
  font-weight: 500;
  color: #2c3e50;
}

.spec-value {
  color: #7f8c8d;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.materials-section,
.supplier-section {
  margin-bottom: 3rem;
}

.materials-section h3,
.supplier-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.material-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.material-card:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.material-info h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.material-category {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.material-quantity {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.material-price {
  font-weight: 600;
  color: #27ae60;
  text-align: right;
}

.supplier-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.supplier-card:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.supplier-info h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.supplier-info p {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.supplier-contact p {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.supplier-rating {
  text-align: center;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stars {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.rating-value {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.back-section {
  text-align: center;
  padding: 2rem 0;
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

.btn-primary:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .furniture-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .furniture-image {
    position: static;
  }
  
  .furniture-header h1 {
    font-size: 2rem;
  }
  
  .furniture-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .materials-grid {
    grid-template-columns: 1fr;
  }
  
  .supplier-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>
