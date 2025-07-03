<template>
  <div class="detail-page">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Chargement...</p>
      </div>

      <div v-if="error" class="error">
        <p>❌ {{ error }}</p>
        <router-link :to="backLink" class="btn btn-primary">Retour</router-link>
      </div>

      <div v-if="item && !loading && !error" class="detail-content">
        <nav class="breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span>/</span>
          <router-link :to="backLink">{{ backText }}</router-link>
          <span>/</span>
          <span>{{ item.name }}</span>
        </nav>

        <div class="detail-layout">
          <div class="detail-info">
            <h1>{{ item.name }}</h1>
            <p class="description">{{ item.description }}</p>
            
            <div class="properties">
              <div class="property" v-if="item.category">
                <strong>Catégorie:</strong> {{ item.category }}
              </div>
              <div class="property" v-if="'type' in item && item.type">
                <strong>Type:</strong> {{ item.type }}
              </div>
              <div class="property" v-if="'unit' in item && item.unit">
                <strong>Unité:</strong> {{ item.unit }}
              </div>
              <div class="property" v-if="'unitPrice' in item && item.unitPrice">
                <strong>Prix:</strong> {{ formatPrice(item.unitPrice) }}{{ 'unit' in item && item.unit ? '/' + item.unit : '' }}
              </div>
              <div class="property" v-if="'contact' in item && item.contact">
                <strong>Email:</strong> {{ item.contact.email }}
              </div>
              <div class="property" v-if="'contact' in item && item.contact">
                <strong>Téléphone:</strong> {{ item.contact.phone }}
              </div>
              <div class="property" v-if="'contact' in item && item.contact">
                <strong>Adresse:</strong> {{ item.contact.address }}
              </div>
            </div>

            <div class="actions">
              <router-link to="/contact" class="btn btn-primary">
                📞 Nous contacter
              </router-link>
              <router-link :to="backLink" class="btn btn-secondary">
                ← Retour
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { materialService, supplierService, type Material, type Supplier } from '../services/api'

const route = useRoute()

const item = ref<Material | Supplier | null>(null)
const loading = ref(true)
const error = ref('')

const backLink = computed(() => {
  return route.path.includes('materials') ? '/materials' : '/suppliers'
})

const backText = computed(() => {
  return route.path.includes('materials') ? 'Matériaux' : 'Fournisseurs'
})

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

onMounted(async () => {
  try {
    const id = route.params.id as string
    if (!id) {
      error.value = 'ID manquant'
      return
    }

    if (route.path.includes('materials')) {
      item.value = await materialService.getById(id)
    } else {
      item.value = await supplierService.getById(id)
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement'
    console.error('Error loading item:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.detail-page {
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

.detail-info h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.description {
  color: #7f8c8d;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.properties {
  margin-bottom: 2rem;
}

.property {
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.property strong {
  color: #2c3e50;
}

.actions {
  display: flex;
  gap: 1rem;
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

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .detail-info h1 {
    font-size: 2rem;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
